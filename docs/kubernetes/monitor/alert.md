# 报警相关

主流的监控平台都提供webhook的方式以扩展报警模块，这种方式灵活也易于扩展。

### 报警系统应该包含功能:
* 报警源管理，即对接多平台
* 报警渠道管理，即根据用户要求对接多渠道: Dingtalk, Slack, WeChat, EMail, Phone Call等
* 值班管理，根据时段或一定规则安排值班人员，我的理解是主要以时间为主线的排班管理。
* 用户管理，包括：联系方式，时区，语言等。
* 报警抑制，分组，静默功能


### 商业选型：
* [Pagerduty](https://www.pagerduty.com/)
* [Opsgien](https://www.atlassian.com/software/opsgenie)
* [ILert](https://www.ilert.com/)

### 开源选型:
* [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/)
* [Zabbix](https://www.zabbix.com/)

### 我的观点:
在选择的道路上没有对错。

#### 商业方案里：
* 外企Pagerduty用的比较多。
* OPsgien怎么说呢Jira confluence 一家的产品优缺点自己品吧。
* ILert 和 Pagerduty 类似，个人挺喜欢

#### 开源方案里： 
* Zabbix: 中小型公司在报警和页面展示方面我个人蛮喜欢的，开发成本低，易用性较好，不过以服务器为中心的概念真的需要你自己看是否能够理解和妥协，未来我也会分享一个基于Zabbix API简化的运维脚本。

* Alertmanager 方面还有一些功能上需要其它组件配合，可以考虑整合到自己的项目中。
