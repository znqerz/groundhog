# Github Action 开发

## 自定义 Action 的方法

### 基于 ts/javascript 创建自定义 Action
  
* 登入 Github
* 访问 [typescript-action](https://github.com/actions/typescript-action) 并点击 `Use this template`

    项目主要目录功能描述
    ```bash
    .
    ├── __test__    # 测试入口
    ├── dist        # 编译文件   
    ├── action.yml  # Action 本身的配置文件，包含入口参数描述
    ├── src         # Action 逻辑 ts 代码
    ```
    >
    - [actions/toolkit](https://github.com/actions/toolkit) 工具核心库介绍
    - [@actions/core](https://github.com/actions/toolkit/tree/main/packages/core)  用于配置返回值，日志，密钥注册和跨 action 导出变量
    - [@actions/exec](https://github.com/actions/toolkit/tree/main/packages/exec) 用于执行命令
    - [@actions/io](https://github.com/actions/toolkit/tree/main/packages/io) 用于 文件操作
    - [@actions/github](https://github.com/actions/toolkit/tree/main/packages/github) GitHub基本操作

    安装 npm 依赖
    ```bash
    npm i <库>
    ``` 
    !!! note
        如果想使用 js-action 可以访问 https://github.com/actions/javascript-action 的 template 生成.

    
* 示例

    [buildversion-action](https://github.com/znqerz/buildversion-action)

    主要函数逻辑
    ```bash
    ./src
    ├── context.ts        # 函数入口参数 mapping
    ├── fs-helper.ts      # 文件操作函数
    ├── main.ts           # 入口函数
    ├── state-helper.ts   # 状态管理
    ```

    workflow 中包含对应 `action` 的测试 job
    ```yaml
    test: # make sure the action works on a clean machine without building
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - uses: ./
          id: BUILD_VERSION_NUMBER
          with:
            file-path: ${{ github.workspace }}/__tests__/version.properties
            run-number: ${{ github.run_number }}
        - run: echo ${{ steps.BUILD_VERSION_NUMBER.outputs.build_number }}
    ```

    其它参考：[setup-go](https://github.com/actions/setup-go)

    !!! note
        - 修改 `scripts` -> `test`: npm run-script build && jest
        - prettier 和 vscode ts format 冲突，提交前可以通过 `npm run format` 或者修改 eslint 相关配置解决，否则 在build阶段运行 `npm run all` 会报 lint 错误

### 基于 Docker 穿件自定义 Action

* 登入 GitHub
* 访问 [hello-world-docker-action](https://github.com/actions/hello-world-docker-action) 并点击 `Use this template`s

* 示例

    [buildversion-docker-action](https://github.com/znqerz/buildversion-docker-action)

    主要函数逻辑
    ```bash
    .
    ├── Dockerfile
    ├── LICENSE
    ├── README.md
    ├── action.yml          # 参数声明
    ├── entrypoint.sh       # 入口函数
    ```

    workflow 中包含对应 `action` 的测试 job
    ```yaml
    test: # make sure the action works on a clean machine without building
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - uses: ./
          id: BUILD_VERSION_NUMBER
          with:
            file-path: ./version.properties
            run-number: ${{ github.run_number }}
        - run: echo ${{ steps.BUILD_VERSION_NUMBER.outputs.build_number }}
    ```
    !!! note
        基于 Docker 的实现要注意的是 workspace 的 mount 路径。