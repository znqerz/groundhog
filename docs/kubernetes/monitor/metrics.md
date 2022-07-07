# 总结

## Node 指标

|Metrics                                     | Description                           | More           |
|--------------------------------------------|---------------------------------------|----------------|
|node_cpu_seconds_total                      | Seconds the cpus spent in each mode   |[understanding-machine-cpu-usage](https://www.robustperception.io/understanding-machine-cpu-usage)|
|node_boot_time_seconds                      | Node boot seconds                     |                |
|node_netstat_Tcp_CurrEstab                  | The number of TCP connections whose current status is ESTABLISHED or CLOSE-WAIT |
|node_filesystem_free_bytes                  | Represents the free space ignoring the reserved blocks | [filesystem-metrics-from-the-node-exporter](https://www.robustperception.io/filesystem-metrics-from-the-node-exporter) |
|node_load1                                  | Node persecond                        | [Load_(computing)](https://en.wikipedia.org/wiki/Load_(computing))|
|node_load5                                  | Node per 5 seconds                    | [Load_(computing)](https://en.wikipedia.org/wiki/Load_(computing))|
|node_load15                                 | Node per 15 seconds                   | [Load_(computing)](https://en.wikipedia.org/wiki/Load_(computing))|
|node_filefd_allocated                       | File descriptor statistics: allocated | [file-descriptor-metrics](https://www.robustperception.io/kernel-file-descriptor-metrics-from-the-node-exporter)|
|node_memory_MemTotal_bytes                  | Total memory                          |                |
|node_memory_MemAvailable_bytes              | Available memory (After kernel 3.14)  |                |
|node_uname_info                             | Same as use command `uname`           |                |
|node_timex_offset_seconds                   | Time offset in between local system and reference clock |                |
|node_sockstat_TCP_tw                        | The number of something was up in relation to TCP sockets in the TIME_WAIT state | [analyse-a-metric-by-kernel-version](https://www.robustperception.io/analyse-a-metric-by-kernel-version) |
|node_sockstat_TCP_alloc                     | The number of allocated (established, applied to sk_buff) TCP sockets| |
|node_sockstat_TCP_inuse                     | The number of TCP sockets in use (listening) | |
|node_network_transmit_bytes_total           | Bandwidth usage which comes from the netdev module | [network-interface-metrics](https://www.robustperception.io/network-interface-metrics-from-the-node-exporter)|
|node_netstat_Tcp_PassiveOpens               | The number of TCP connections that have directly transitioned from the LISTEN state to the SYN-RCVD state ||
|node_netstat_Tcp_ActiveOpens                | Statistic TcpActiveOpens, the number of TCP connections that have directly transitioned from the CLOSED state to the SYN-SENT state |  |
|node_disk_io_now                            | The number of IOs in progress         |[node_disk](https://www.robustperception.io/mapping-iostat-to-the-node-exporters-node_disk_-metrics)|
|node_disk_read_time_seconds_total          | The total number of milliseconds spent by all reads |[node_disk](https://www.robustperception.io/mapping-iostat-to-the-node-exporters-node_disk_-metrics)|
|node_disk_io_time_seconds_total            |  Total seconds spent doing I/Os |[node_disk](https://www.robustperception.io/mapping-iostat-to-the-node-exporters-node_disk_-metrics)|
|node_disk_written_bytes_total              | The total number of bytes written successfully |[node_disk](https://www.robustperception.io/mapping-iostat-to-the-node-exporters-node_disk_-metrics)|
|node_disk_write_time_seconds_total         | This is the total number of seconds spent by all writes |[node_disk](https://www.robustperception.io/mapping-iostat-to-the-node-exporters-node_disk_-metrics)|
|node_disk_writes_completed_total           | The total number of writes completed successfully |[node_disk](https://www.robustperception.io/mapping-iostat-to-the-node-exporters-node_disk_-metrics)|
|node_disk_io_time_weighted_seconds_total   | The weighted number of seconds spent doing I/Os. |[iostats](https://www.kernel.org/doc/Documentation/iostats.txt)|
|node_disk_reads_completed_total    |  The iostat r/s is the number of reads per second calculated from the previous measurement iostat made (or since boot for the first one) |[node_disk](https://www.robustperception.io/mapping-iostat-to-the-node-exporters-node_disk_-metrics)|
|node_disk_read_bytes_total                  | The total number of bytes read successfully |[node_disk](https://www.robustperception.io/mapping-iostat-to-the-node-exporters-node_disk_-metrics)|
|node_filesystem_readonly                    | Indicates if the filesystem is readonly| [filesystem-metrics-from-the-node-exporter](https://www.robustperception.io/filesystem-metrics-from-the-node-exporter)|
|node_filesystem_size_bytes                  | Total filesystem size                  |[filesystem-metrics-from-the-node-exporter](https://www.robustperception.io/filesystem-metrics-from-the-node-exporter)|
|node_filesystem_avail_bytes                 | How many bytes are free for use by normal users.|[filesystem-metrics-from-the-node-exporter](https://www.robustperception.io/filesystem-metrics-from-the-node-exporter)|
|node_network_receive_bytes_total  | Bytes are the base unit |



## Kube Metrics
[kube-state-metrics-github-docs](https://github.com/kubernetes/kube-state-metrics/tree/master/docs)

| Metrics| Description |
| ---------- | ----------- |
| kube_daemonset_created | Unix creation timestamp |
| kube_daemonset_status_current_number_scheduled | The number of nodes running at least one daemon pod and are supposed to |
| kube_daemonset_status_desired_number_scheduled | The number of nodes that should be running the daemon pod |
| kube_daemonset_status_number_available | The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and available |
| kube_daemonset_status_number_misscheduled | The number of nodes running a daemon pod but are not supposed to |
| kube_daemonset_status_number_ready | The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and ready |
| kube_daemonset_updated_number_scheduled | The total number of nodes that are running updated daemon pod |
| kube_deployment_created | Unix creation timestamp |
| kube_deployment_metadata_generation |  Sequence number representing a specific generation of the desired state. |
| kube_deployment_spec_replicas | Number of desired pods for a deployment. |
| kube_deployment_spec_strategy_rollingupdate_max_unavailable | Maximum number of unavailable replicas during a rolling update of a deployment |
| kube_deployment_status_observed_generation | The generation observed by the deployment controller |
| kube_deployment_status_replicas | The number of updated replicas per deployment. |
| kube_deployment_status_replicas_available | The number of available replicas per deployment. |
| kube_deployment_status_replicas_unavailable | The number of unavailable replicas per deployment. |
| kube_deployment_status_replicas_updated | The number of updated replicas per deployment. |
| kube_hpa_spec_max_replicas | The max value of HPA |
| kube_hpa_spec_min_replicas | The min value of HPA |
| kube_hpa_status_condition  | The condition of HPA|
| kube_hpa_status_current_replicas | The status of current replicas |
| kube_hpa_status_desired_replicas | The status of desired replicas |
| kube_job_failed | The job has failed its execution. |
| kube_job_spec_completions | The desired number of successfully finished pods the job should be run with |
| kube_job_status_active | The number of actively running pods. |
| kube_job_status_failed | The number of pods which reached Phase Failed and the reason for failure. |
| kube_job_status_succeeded | The number of pods which reached Phase Succeeded. |
| kube_node_info | Information about a cluster node |
| kube_node_spec_taint | The taint of a cluster node. |
| kube_node_spec_unschedulable | Whether a node can schedule new pods |
| kube_node_status_allocatable_cpu_cores | The allocatable cpu cores of a node that are available for scheduling  |
| kube_node_status_allocatable_memory_bytes | The allocatable memory of a node that are available for scheduling  |
| kube_node_status_allocatable_pods | The allocatable pods of a node that are available for scheduling  |
| kube_node_status_capacity_cpu_cores | The cpu cores capacity of a node |
| kube_node_status_capacity_memory_bytes | The memory capacity of a node |
| kube_node_status_capacity_pods | The pods capacity of a node |
| kube_node_status_condition | The condition of a cluster node |
| kube_persistentvolume_status_phase | The phase indicates if a volume is available, bound to a claim, or released by a claim. |
| kube_pod_container_info | Information about a container in a pod. |
| kube_pod_container_resource_limits_cpu_cores | The number of cpu cores requested limit resource by a container. |
| kube_pod_container_resource_limits_memory_bytes | The number of memory requested limit resource by a container. |
| kube_pod_container_resource_requests_cpu_cores | The number of cpu requested resource by a container. |
| kube_pod_container_resource_requests_memory_bytes | The number of memory requested resource by a container. |
| kube_pod_container_status_last_terminated_reason | Describes the last reason the container was in terminated state |
| kube_pod_container_status_restarts_total | The number of container restarts per container |
| kube_pod_container_status_running | Describes whether the container is currently in running state |
| kube_pod_container_status_terminated | Describes whether the container is currently in terminated state |
| kube_pod_container_status_terminated_reason | Describes the reason the container is currently in terminated state |
| kube_pod_container_status_waiting | Describes whether the container is currently in waiting state |
| kube_pod_container_status_waiting_reason | Describes the reason the container is currently in waiting state |
| kube_pod_info | Information about pod |
| kube_pod_labels | Kubernetes labels converted to Prometheus labels |
| kube_pod_owner | Information about the Pod's owner |
| kube_pod_status_phase | The pods current phase |
| kube_pod_status_ready | Describes whether the pod is ready to serve requests |
| kube_service_info | Information about service |

<br/>

## Promtheus 函数使用

| Function | Description | Example|
|--------------------|-------------|--------|
| predict_linear     | 预测Gauge指标变化趋势, 可以预测时间序列v在t秒后的值。它基于简单线性回归的方式，对时间窗口内的样本数据进行统计，从而可以对时间序列的变化趋势做出预测|  [reduce-noise-from-disk-space-alerts](https://www.robustperception.io/reduce-noise-from-disk-space-alerts)|
| increase           | 获取区间向量中的第一个后最后一个样本并返回其增长量 | increase(node_cpu[2m]) / 120 通过node_cpu[2m]获取时间序列最近两分钟的所有样本，increase计算出最近两分钟的增长量，最后除以时间120秒得到node_cpu样本在最近两分钟的平均增长率|
| rate               | 可以直接计算区间向量v在时间窗口内平均增长速率|  rate(node_cpu[2m]) 和increase 计算的平均增长率相同|
| irate              | 相比于rate函数提供了更高的灵敏度, 当需要分析长期趋势或者在告警规则中，irate的这种灵敏度反而容易造成干扰。 | irate(node_cpu[2m])|
| histogram_quantile | 用于评判当前监控指标的服务水平，产生Histogram值 | histogram_quantile(0.5, http_request_duration_seconds_bucket)|


!!! note
    rate 和 increase 函数不能反应在时间窗口内的平均增长率