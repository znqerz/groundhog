# 生成 Go 程序UML

## 准备
* 本地安装项目: [goplantuml](https://github.com/jfeliu007/goplantuml)
* 安装vscode
* JDK
* vscode [plantuml 插件](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

## 命令生成 puml
```bash
goplantuml -recursive ./ > diagram_file_name.puml
```

## 生成图片
* 在 `workspace` 下找到 `*.puml` 文件
* 选中文件 --> 菜单中选择 `Export workspace diagram` --> png; 稍等片刻等待图片渲染成功提示。

!!! note
    * 修改 vscode settings.json,最后一行添加plantuml参数
    ```json
    "plantuml.commandArgs": [
        "-DPLANTUML_LIMIT_SIZE=20000"
    ],
    ```
    当生成的uml尺寸很大的时候通过修改该参数可以避免生成图片被截断的问题。


