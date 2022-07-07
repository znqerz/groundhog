## Kubernetes Reboot Daemon
https://github.com/weaveworks/kured

## Alarm web from tal-tech
https://github.com/weaveworks/kuredhttps://github.com/tal-tech/alarm-dog

## Admission hook solution
https://github.com/open-policy-agent/gatekeeper

## OPA Gatekeeper

OPA(Open Policy Agent)[https://www.openpolicyagent.org/docs/latest/]: 开放策略代理，其使用不仅限于 Kubernetes.

OPA 使用 (Rego)[https://www.openpolicyagent.org/docs/latest/policy-language/#what-is-rego] 作为特定于域的语言 

OPA vs Gatekeeper (differents)[https://github.com/open-policy-agent/gatekeeper#how-is-gatekeeper-different-from-opa]

Gatekeeper: 由 OPA 提供的一个可自定义的 Kubernetes Admission Webhook, 使用 OPA 约束框架来描述和实施策略。

参考：

(限制条件框架)[https://github.com/open-policy-agent/frameworks/tree/master/constraint]

https://cloud.google.com/kubernetes-engine/docs/how-to/pod-security-policies-with-gatekeeper?hl=zh-cn

steps:

1. 定义 ConstraintTemplate (约束模版)， 允许用户声明新的约束，是可重复使用的语句（使用 Rego 编写），可根据限制条件中定义的要求应用逻辑以评估 Kubernetes 对象中的特定字段。
```yaml
apiVersion: gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: foosystemrequiredlabels
spec:
  crd:
    spec:
      names:
        kind: FooSystemRequiredLabel
      validation:
        # Schema for the `parameters` field
        openAPIV3Schema:
          properties:
            labels:
              type: array
              items: string
  targets:
    - target: admission.k8s.gatekeeper.sh
      libs:
      # which is a list of all library functions that will be available to the rego package. Note that all packages in libs must have lib as a prefix (e.g. package lib.<something>)
        - |
          package lib.helpers
          
          make_message(missing) = msg {
            msg := sprintf("you must provide labels: %v", [missing])
          }
          
      rego: |
        package foosystemrequiredlabels
        
        import data.lib.helpers
      
        violation[{"msg": msg, "details": {"missing_labels": missing}}] {
           provided := {label | input.request.object.metadata.labels[label]}
           required := {label | label := input.parameters.labels[_]}
           missing := required - provided
           count(missing) > 0
           msg := helpers.make_message(missing)
        }
```
2. 定义 Constraint (限制条件) 约束一组满足要求的声明，是安全政策的表示形式，它们定义要求和强制执行范围。
```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: FooSystemRequiredLabel
metadata:
  name: require-billing-label
spec:
  match:
    namespace: ["expensive"]
  parameters:
    labels: ["billing"]
```

## Admission webhook

API HTTP handler --> Authentication --> Mutating admission controllers --> Object schema validation --> Validating admission controllers --> Persisted to ETCD
																							
## Labels Best Practices
https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/
https://www.replex.io/blog/9-additional-best-practices-for-working-with-kubernetes-labels-and-label-selectors

## SpenSSl SAN Certificate

https://liaoph.com/openssl-san/
https://zhuanlan.zhihu.com/p/26646377

## CrossPlane Usage (AWS)

https://aws.amazon.com/cn/blogs/china/connecting-aws-managed-services-to-your-argo-cd-pipeline-with-open-source-crossplane/

## TCP/IP 详解

https://coolshell.cn/articles/11609.html

## TCP UDP

https://mp.weixin.qq.com/s?__biz=MzI0ODk2NDIyMQ==&mid=2247487108&idx=1&sn=7b47f421bb1dee4edb357a10399b7fec&chksm=e999fb96deee7280a17bfff44c27ef11a60e93e48f9da738670a779ecf6accb5a6a4ebd3cbcc&token=933742694&lang=zh_CN#rd  

## GCP Deployment Manaer 详解
https://cloud.google.com/deployment-manager/docs
https://github.com/open-policy-agent/gatekeeper
