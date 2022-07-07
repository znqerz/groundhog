# AliCloud Managed Kubernetes

## 网络规划：
https://help.aliyun.com/document_detail/86500.html

###  专有网络 VPC 网络规划：

包括 VPC 网段规划和 VSwitch 网段规划:

VPC 网段只能从 10.0.0.0/8、172.16.0.0/12、192.168.0.0/16 三者当中选择.

VPC VSwitch 主要用于节点通讯，其网段注意事项：
1. 只能是当前 VPC 网段的子集（可以和 VPC 网段一样但不能超过）。
2. 一个 VPC 下可以创建多个 VSwitch 但 VSwitch之间的网段不能重合。
3. VSwitch 必须 和 Pod VSwitch 在同一可用区下。

### Kuberentes 网段规划：
包括 Pod CIDR 和 Service CIDR
Pod CIDR 用于 Pod 通讯：
Terway 注意事项：
  1. Pod 虚拟交换机 == VPC Switch。
  2. Pod IP 是从 VPC Switch 里获取的。
  3. 该网段不能与 VSwitch 和 Service CIDR 重叠。
  4. VSwitch 和 Pod CIDR 需在同一可用区下。
  ![](https://aliware-images.oss-cn-hangzhou.aliyuncs.com/ACK/image/Kubernetes%E9%9B%86%E7%BE%A4%E7%BD%91%E7%BB%9C%E8%A7%84%E5%88%92%E6%96%87%E6%A1%A3%E4%BD%BF%E7%94%A8%E5%9B%BE%E7%89%87/Terway.png)
Flannel 注意事项：
  1. 非VPC交换机，为虚拟网段。
  2. 不能与 VSwitch 网段重叠。
  3. 不能与 Service CIDR网段重叠。
  例如，VPC网段用的是172.16.0.0/12，Kubernetes的Pod地址段就不能使用172.16.0.0/16、172.17.0.0/16等，因为这些地址都包含在172.16.0.0/12里。
  ![](https://aliware-images.oss-cn-hangzhou.aliyuncs.com/ACK/image/Kubernetes%E9%9B%86%E7%BE%A4%E7%BD%91%E7%BB%9C%E8%A7%84%E5%88%92%E6%96%87%E6%A1%A3%E4%BD%BF%E7%94%A8%E5%9B%BE%E7%89%87/Flannel.png)

Service CIDR 对应微 ClusterIP，每个 Service 都有自己的 IP，注意事项：
1. 只能在 kubernetes 集群内部使用，不能在集群外部使用。
2. 是不能与VSwitch 地址段重叠
3. 不能和 Pod CIDR 重叠。

## 节点池选型

[托管节点池适用场景](https://help.aliyun.com/document_detail/190616.html?spm=a2c4g.11186623.6.758.778c761bAQSk9s)：
1. 只关注上层应用开发，不希望主动运维worker节点。
2. 需要快速响应CVE安全漏洞。当新的CVE发布后，能够迅速升级，从而修补漏洞。
3. 对底层节点的变更不敏感，`业务Pod对迁移有较高的容忍度`，更加关注业务的弹性而非不可变性。
4. 需要升级节点上的Docker版本及OS镜像版本。




