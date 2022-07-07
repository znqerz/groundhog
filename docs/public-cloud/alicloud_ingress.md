# Ingress 部署规划

## 基本概念
### Kubernetes中Service, Ingress, Ingress Controller的关系
* Service: 后端服务的抽象。
* Ingress: 反向代理规则。
* Ingress Controller: 反响代理程序，负责解析Ingress的反向代理规则，当Ingress变动时 Ingress Controller 会及时更新相应的转发规则。

### Ingress Controller工作原理
通过API Server获取Ingress资源变化动态生成反向代理程序所需的配置文件然后重新加载生成新的路由转发规则。 [[参考阿里云文档]](https://help.aliyun.com/document_detail/198892.html?spm=a2c4g.11186623.6.768.1a541675ZtH01E)

## 免费HTTPS证书管理
云原声证书管理开源工具 cert-manager，用于在kubernetes集群中提供HTTPS证书并自动续期，通过以下方式部署：[[参考阿里云文档]](https://help.aliyun.com/document_detail/86533.html?spm=a2c4g.11186623.6.770.596d3169JS4xSq#title-v89-nee-iuh)

* 部署cert-manager
    ```bash
    kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.3.0/cert-manager.yaml
    ```

* 创建ClusterIssuer
```bash
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod-http01
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your_email_name@gmail.com  #替换为您的邮箱名。
    privateKeySecretRef:
      name: letsencrypt-http01
    solvers:
    - http01: 
        ingress:
          class: nginx
EOF
```

* 创建Ingress资源对象
```bash
cat <<EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-tls
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod-http01"
spec:
  tls:
  - hosts:
    - your_domain_name        # 替换为您的域名。
    secretName: ingress-tls   
  rules:
  - host: your_domain_name    # 替换为您的域名。
    http:
      paths:
      - path: /
        backend:
          serviceName: your_service_name  # 替换为您的后端服务名。
          servicePort: your_service_port  # 替换为您的服务端口。
EOF
```

## 高可靠部署
即一个Ingress服务独占一个Ingress节点的方式，避免业务应用和Ingress服务发生资源抢占

通过绩点标签指定Ingress controller仅运行在一些高配节点上

* Node 添加 Label
```bash
kubectl label nodes <NODE_NAME> node-role.kubernetes.io/ingress="true"
```
!!! note
    * 添加标签的节点数量要大于等于集群Pod副本数，从而避免多个Pod运行在同一个节点上。
    * 查询结果中，若ROLES的值显示为none，则表示为Worker节点。
    * Ingress服务部署尽量选择到Worker节点添加标签。

* Deployment 增加 NodeSelector 配置：
```bash
kubectl -n kube-system patch deployment nginx-ingress-controller -p '{"spec": {"template": {"spec": {"nodeSelector": {"node-role.kubernetes.io/ingress": "true"}}}}}'
```

另外一种通过HPA的方式扩展Pod副本数的方式不再详述

## 高负载部署

### 硬件选型
高兵法场景秀安泽赠前行ECS实例：
* 计算型实例: ecs.c6e.9xlarge
* 网络型实例: ecs.g6e.8xlarge

### Kubernetes 配置
* 添加taint 和 label，设置Ingress Pod独占节点资源
    ```bash
    kubectl label nodes $node_name ingress-pod="yes"
    kubectl taint nodes $node_name ingress-pod="yes":NoExecute
    ```
* 设置CPU Policy 为static
!!! note
    [CPU管理策略](https://kubernetes.io/zh/docs/tasks/administer-cluster/cpu-management-policies/)

* 推荐调整ingress-controller service对应的SLB规格为超强型（slb.s3.large
* 推荐集群使用Terway网络插件及配置独占ENI。

### Ingress 配置
* Ingress Pod QOS 为 Guaranteed 类型。
  * 设置nginx-ingress-controller container的资源限制requests和limits: 15 Core 20 GiB。
  * 设置initContainer init-sysctl的资源限制requests和limits: 100 m 70 MiB。
* 删除Ingress Pod中的podAntiAffinity，使一个节点上可调度两个Pod。
* 调整Deployment Replicas数为新增节点数的2倍。
* 设置ConfigMap的worker-processes数为15（预留部分给系统使用）。
* 调整ConfigMap的keepalive链接最大请求数。

[[参考阿里云文档]](https://help.aliyun.com/document_detail/202125.html?spm=a2c4g.11186623.6.775.62c71675q28pU9)

##其它:

[[Nginx Ingress 高并发实践]](https://www.jianshu.com/p/b085ca2807a6)
