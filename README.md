# 财富服务智能体 · 侧栏壳静态演示

公开静态页：左对话框、右服务助手（企微工作台形态）。  
**Mock only**：无模型、无公司接口、无真实账户、无真实发送。

- 在线：https://melovae.github.io/wecom-service-agent-demo-shell/
- 仓库：https://github.com/melovae/wecom-service-agent-demo-shell
- 展示规则：`docs/superpowers/plans/2026-10-14-sidebar-display-rules-v1.md`

## 演示案例（8）

| 类型 | 案例 | 查清要点 |
| --- | --- | --- |
| 已能答 | 申购是否成功 | 结论 + 对照（到账边界在查清，不进话术） |
| 补问 | 能否撤单 | 候选对比 · 待补问 |
| 缺口 | 定投失败 | 还没查到 · 待核对 |
| 条件核对 | 凑够30万 | checklist 已核／未核 |
| 有表·已计提 | 业绩报酬赎回 | 大数字 + ▸演算明细 |
| 有表·分红 | 分红扣费 | 仍持有 + 对照「扣费≠减份额」 |
| 有表·预估 | 剩余批次与预估 | 尚未收取 · 预估≠已计提 |
| 主动 | 产品资料 | 资料摘要 + 发出前要核 · 待确认 |

话术只答客户所问；顾问核对用的对照／缺口放在「① 查清」。

## 本地预览

```bash
cd docs/superpowers/demos/sidebar-shell-v1
python3 -m http.server 8777 --bind 127.0.0.1
```

打开 <http://127.0.0.1:8777/>
