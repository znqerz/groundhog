# Overview

HPA 可以基于 CPU/MEM 利用率自动扩缩 Deployment, StatefulSet 中的 Pod 数量, 同时也可以基于其他应用程序提供的自定义度量指标来执行自动扩缩。


## HPA 使用率计算

[获取 Pod resource request](https://github.com/kubernetes/kubernetes/blob/master/pkg/controller/podautoscaler/replica_calculator.go#L423)
```go
func calculatePodRequests(pods []*v1.Pod, container string, resource v1.ResourceName) (map[string]int64, error) {
	requests := make(map[string]int64, len(pods))
	for _, pod := range pods {
		podSum := int64(0)
		for _, c := range pod.Spec.Containers {
			if container == "" || container == c.Name {
				if containerRequest, ok := c.Resources.Requests[resource]; ok {
					podSum += containerRequest.MilliValue()
				} else {
					return nil, fmt.Errorf("missing request for %s", resource)
				}
			}
		}
		requests[pod.Name] = podSum
	}
	return requests, nil
}

```

[计算使用率](https://github.com/kubernetes/kubernetes/blob/e6136c0303028d68cac67290d94a60cec167ccdf/pkg/controller/podautoscaler/metrics/utilization.go#L26)
```go
// GetResourceUtilizationRatio takes in a set of metrics, a set of matching requests,
// and a target utilization percentage, and calculates the ratio of
// desired to actual utilization (returning that, the actual utilization, and the raw average value)
func GetResourceUtilizationRatio(metrics PodMetricsInfo, requests map[string]int64, targetUtilization int32) (utilizationRatio float64, currentUtilization int32, rawAverageValue int64, err error) {
	metricsTotal := int64(0)
	requestsTotal := int64(0)
	numEntries := 0

	for podName, metric := range metrics {
		request, hasRequest := requests[podName]
		if !hasRequest {
			// we check for missing requests elsewhere, so assuming missing requests == extraneous metrics
			continue
		}

		metricsTotal += metric.Value
		requestsTotal += request
		numEntries++
	}

	// if the set of requests is completely disjoint from the set of metrics,
	// then we could have an issue where the requests total is zero
	if requestsTotal == 0 {
		return 0, 0, 0, fmt.Errorf("no metrics returned matched known pods")
	}

	currentUtilization = int32((metricsTotal * 100) / requestsTotal)

	return float64(currentUtilization) / float64(targetUtilization), currentUtilization, metricsTotal / int64(numEntries), nil
}
```

## 调用链路：

`scaleForResourceMappings -> computeReplicasForMetrics -> Scales().Update 更新副本数`

## 计算规则:

`期望副本数 = ceil[当前副本数 * (当前指标 / 期望指标)]` 

## 不足

1. 平台资源超配导致按照request来计算使用率会超出资源总量。
2. 只能根据 Pod 的资源使用率进行扩展，对于多容器 Pod 不友好。
3. 单线程实现的性能问题, [HPA Source code](https://github.com/kubernetes/kubernetes/blob/ea0764452222146c47ec826977f49d7001b0ea8c/pkg/controller/podautoscaler/horizontal.go)
    ```go
    // Run begins watching and syncing.
    func (a *HorizontalController) Run(stopCh <-chan struct{}) {
        defer utilruntime.HandleCrash()
        defer a.queue.ShutDown()

        klog.Infof("Starting HPA controller")
        defer klog.Infof("Shutting down HPA controller")

        if !cache.WaitForNamedCacheSync("HPA", stopCh, a.hpaListerSynced, a.podListerSynced) {
            return
        }

        // start a single worker (we may wish to start more in the future)
        go wait.Until(a.worker, time.Second, stopCh)

        <-stopCh
    }
    ```