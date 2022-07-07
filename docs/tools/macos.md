# MacOS 本地环境

## 工具安装

* IDE：

    [vscode](https://code.visualstudio.com/download#), [vscode cli](https://code.visualstudio.com/docs/setup/mac), [sublime](https://www.sublimetext.com/download)

* 效率工具:

    [Alfred](https://www.alfredapp.com/), [Iterm2](https://iterm2.com/index.html) 

    oh-my-zsh
    ```shell
    # install
    sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    ```

    brew
    ```shell
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    [替换中科大 brew 数据源](https://mirrors.ustc.edu.cn/help/brew.git.html)

    !!! note
        ```bash
        $ brew install go
        ==> Searching for similarly named formulae...
        Error: No similarly named formulae found.
        Error: No available formula or cask with the name "go".
        It was migrated from homebrew/cask to homebrew/core.
        ```
        解决方法：
        ```bash
        BREW_HOME_DIR=$(brew --repo)
        [ -d $BREW_HOME_DIR/Library/Taps/homebrew/homebrew-core ] && rm -rf $BREW_HOME_DIR/Library/Taps/homebrew/homebrew-core
        ```

* 本地开发环境安装

    [Docker](https://docs.docker.com/docker-for-mac/install/), [JDK](https://www.oracle.com/hk/java/technologies/javase-downloads.html)

    ```bash
    mkdir -p $HOME/pconf
    cat <<EOF >>$HOME/pconf/.brew.packages.txt
    socat
    htop
    git
    go
    node
    minikube
    python
    pwgen
    kubectl
    gnupg
    EOF

    brew install $(<$HOME/pconf/.brew.packages.txt)

    sudo pip3 install mkdocs-material
    ```

    ZSH 配置
    ```bash
    # 创建 ZSH 本地配置文件
    mkdir -p $HOME/pconf

    touch $HOME/pconf/.zsh.local.secret $HOME/pconf/.zsh.local.env $HOME/pconf/.zsh.local.func
    
    cat <<EOF >>$HOME/pconf/.zsh.local.alias
    alias gst="git status"
    alias gsm="git summary"
    alias gadd='git add'
    alias gdiff='git diff'
    alias gfetch='git fetch'
    alias gremote='git remote -v'
    alias grebase='git rebase'
    alias gbranch='git branch'
    alias gpull="git pull origin"
    alias gpush="git push origin"
    alias gcheckout="git checkout"
    alias glog="git log"
    alias gcommit="git commit --verbose -m"
    alias gmerge="git merge"
    alias gpg_restart='gpgconf --kill gpg-agent'

    alias open_ssh_configs='subl $HOME/.ssh/configs'
    alias open_zshrc='subl $HOME/.zshrc'
    alias open_zsh_secret='subl $HOME/pconf/.zsh.local.secret'
    alias open_zsh_env='subl $HOME/pconf/.zsh.local.env'
    alias open_zsh_alias='subl $HOME/pconf/.zsh.local.alias'
    alias open_zsh_func='subl $HOME/pconf/.zsh.local.func'
    EOF


    cat <<EOF >>$HOME/.zprofile
    export PATH="/Applications/Sublime Text.app/Contents/SharedSupport/bin:$PATH"

    export PATH="$PATH:/opt/homebrew/bin"
    export GOPATH=$(go env GOPATH)
    export GOPROXY=https://goproxy.cn
    export PATH="$GOPATH/bin:/usr/local/bin/python3:$PATH"


    GPG_TTY=$(tty)
    export GPG_TTY

    source $HOME/pconf/.zsh.local.secret
    source $HOME/pconf/.zsh.local.env
    source $HOME/pconf/.zsh.local.alias
    source $HOME/pconf/.zsh.local.func
    EOF
    ```

## 其它

* 字体依赖：
   Jetbrains Mono
   ```text
   # 下载
   https://www.jetbrains.com/lp/mono/
   
   # 安装
   https://zhuanlan.zhihu.com/p/143057320
   ```
