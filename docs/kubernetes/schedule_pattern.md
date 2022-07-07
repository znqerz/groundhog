## 节点调度规则
1. Worker Node 添加标签
2. 通过 nodeSelector 和 nodeAffinity 设置调度策略：
   - NodeSelector: 保证应用只调度到对应的节点上
   - NodeAffinity: 调度策略
     |策略|解释|
     |---|---|
     |requiredDuringSchedulingIgnoredDuringExecution  | 若Pod已部署即使节点标签发生变化不再满足指定条件也会继续运行.｜
     |requiredDuringSchedulingRequiredDuringExecution | 若Pod已部署即使节点标签发生变化不再满足指定条件则重新算则符合要求的节点.|
     |preferredDuringSchedulingIgnoredDuringExecution | `优先`部署到满足条件的节点上，如果不满足则忽略条件按正常逻辑继续部署.|
