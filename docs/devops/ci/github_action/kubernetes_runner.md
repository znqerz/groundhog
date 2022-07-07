# GitHub Action Kubernetes Runner

GitHub Action 官方目前直接基于 kubernetes 资源整合的文档，但是社区提供了丰富的解决方案，本文目前采用的开源方案: [actions-runner-controller](https://github.com/actions-runner-controller/actions-runner-controller)

## 以下步骤用来创建基于 kubernetes self-host runner

### 准备工作

- 创建 Organization 级别的 Runner Group

    Runner Group 可用于在 Organizaton 级别限制 Repo 使用哪些 GitHub Runner。

    [参考文档](https://docs.github.com/en/actions/hosting-your-own-runners/managing-access-to-self-hosted-runners-using-groups)


-  创建 PAT(Personal Access Token)

    Organization PAT Page
    ```
    https://<GITHUB_ENTERPRISE_URL>/settings/tokens
    ```
    Organization Runners 需要的权限如下:

    >- repo (Full control)
    * admin:org (Full control)
    * admin:public_key (read:public_key)
    * admin:repo_hook (read:repo_hook)
    * admin:org_hook (Full control)
    * notifications (Full control)
    * workflow (Full control)

    !!! note
        创建 PAT 后记得保存，如有遗忘可以通过 `Regenerate` 重新生成


3. PAT 测试

    运行一下命令:
    ```bash
    curl --header "Authorization: token <GTIHUB_TOKEN>" \
    -X GET \
    -H "Accept: application/vnd.github.v3+json" \
    https://<GITHUB_DOMAIN>/api/v3/orgs/<GITHUB_ORG>/actions/runners/registration-token
    ```

### 安装 Action Runner Controller

- 确保集群已部署了 cert-manager

    actions-runner-controller 使用 [cert-manager](https://cert-manager.io/docs/installation/kubernetes/) 管理 Admission Webhook 的证书. 安装文档请访问:

    - [Installing cert-manager on Kubernetes](https://cert-manager.io/docs/installation/kubernetes/)

- 安装 action-runner-controller
    ```bash
    # 版本号 "v0.18.2" 根据实际需求替换
    kubectl apply -f https://github.com/actions-runner-controller/actions-runner-controller/releases/download/v0.18.2/actions-runner-controller.yaml
    ```

- 配置 GitHub Enterprise 的链接地址
    ```bash
    kubectl set env deploy controller-manager -c manager GITHUB_ENTERPRISE_URL=<GITHUB_ENTERPRISE_URL> --namespace actions-runner-system
    ```

- 生成 Controller Manager 相关的 Secret
    ```bash
    kubectl create secret generic controller-manager -n actions-runner-system --from-literal=github_token={PAT}
    ```

- 通过 CRD 创建 Runner
    ```yaml
    apiVersion: actions.summerwind.dev/v1alpha1
    kind: RunnerDeployment
    metadata:
    name: <GitHub_Org_Name>-runner
    namespace: <Namespace_Name>
    spec:
    replicas: 2
    template:
        metadata:
        annotations:
            cluster-autoscaler.kubernetes.io/safe-to-evict: "true"
        spec:
        organization: <GitHub_Org_Name>
        env: []
        group: <GitHub_Group_Name>
        labels:
            - <GitHub_Org_Name>-runner
    ```
