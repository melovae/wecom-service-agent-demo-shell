/** 静态演示夹具 · Mock only。话术只答客户所问，不塞未问边界句。 */
window.SIDEBAR_SHELL_DEMO = {
  version: "sidebar-shell-v1",
  cases: [
    {
      id: "fee-redeem",
      customer: "客户庚",
      advisorName: "龙经理",
      initials: "庚",
      date: "01/13",
      preview: "还剩多少份额啊？另外业绩报酬怎么扣了这么多",
      message:
        "龙经理，我昨天申请的那笔赎回今天确认了。还剩多少份额啊？另外业绩报酬怎么扣了这么多，我有点懵",
      time: "10:18",
      payload: {
        itemId: "ISSUE-PF-R01",
        title: "这笔赎回还剩多少、业绩报酬为什么这么多",
        statusBadge: "可回复",
        statusTone: "ok",
        primaryAction: "使用话术",
        actionEnabled: true,
        heard: ["还剩多少份额", "业绩报酬为什么这么多"],
        metrics: [
          { label: "还剩", value: "160,080.53份" },
          { label: "业绩报酬", value: "12,449.49元", nature: "已计提" }
        ],
        ruleLine:
          "满30天计费；年化4%内免提；4%–8%提20%；超过8%提30%（本组Mock，非全产品统一）。",
        attribution: [
          { lot: "2025-02-11批", amount: "10,966.21元" },
          { lot: "2025-07-15批", amount: "1,483.28元" }
        ],
        reasonSections: [
          {
            title: "份额怎么变",
            summary: "按先买先扣：早批扣光，后批扣了一部分。"
          },
          {
            title: "为什么偏高",
            summary: "两批年化约13%，超8%按30%；早批份额大，费用占大头。"
          }
        ],
        tables: {
          shareTable: {
            title: "买入/赎回明细（节选）",
            headers: ["确认日", "交易", "份额变化", "总份额"],
            rows: [
              ["2025-02-11", "申购", "+484,167.72", "484,167.72"],
              ["2025-07-15", "申购", "+275,912.81", "760,080.53"],
              ["2026-01-13", "赎回", "-600,000.00", "160,080.53"]
            ]
          },
          feeTable: {
            title: "费用计算明细",
            headers: ["批次", "参与份额", "年化", "本批费用"],
            rows: [
              ["2025-02-11", "484,167.72", "13.2751%", "10,966.21"],
              ["2025-07-15", "115,832.28", "13.2064%", "1,483.28"]
            ]
          }
        },
        /* 与 domains/performance-fee 验收短答一致：只答还剩+为何偏高+分批 */
        reply:
          "庚先生，这笔赎回已经确认。还剩 160,080.53 份，业绩报酬 12,449.49 元已经从赎回款里扣了。您觉得扣得多，主要是这两笔买入这段时间年化收益都到 13% 出头——收益不错，超过 8% 的部分才按 30% 提取。按先买先扣：\n2025-02-11 买的那批这次扣光，从那天起年化 13.2751%，扣了 10,966.21 元。\n2025-07-15 买的那批扣了一部分，从那天起年化 13.2064%，扣了 1,483.28 元。",
        nextStepText: "",
        process: [
          { kind: "系统", title: "查询赎回确认", text: "模拟业绩报酬回溯，取回扣批与原确认批次。" },
          { kind: "核算", title: "分档合计", text: "数字来自核算夹具；话术不改表内金额。" }
        ]
      }
    },
    {
      id: "supplement",
      customer: "客户乙",
      advisorName: "演示顾问",
      initials: "乙",
      date: "08/06",
      preview: "未确认的申购能撤吗",
      message: "未确认的申购能撤吗？我记得好像有两笔。",
      time: "10:00",
      payload: {
        itemId: "ISSUE-DEMO-02",
        title: "未确认的申购能撤吗？",
        statusBadge: "待补问",
        statusTone: "ask",
        primaryAction: "使用话术",
        actionEnabled: true,
        verdict: "尚未选定是哪一笔 · 只能先发补问",
        contrasts: ["未确认 ≠ 可撤", "可查当前可撤 ≠ 已办理撤单"],
        candidates: [
          {
            name: "广发景明中短债A",
            code: "006591",
            amount: "10万元",
            confirm: "未确认",
            cancelable: false
          },
          {
            name: "广发小盘成长A",
            code: "162703",
            amount: "10万元",
            confirm: "未确认",
            cancelable: true
          }
        ],
        /* 只答：两笔分别能否撤 + 问清哪一笔 */
        reply:
          "查到两笔当日申购，都是10万元：景明A目前不可撤，小盘成长A目前可撤。您问的是哪一笔？",
        nextStepText: "先发出补问，等客户指明目标后再续接。",
        process: [
          { kind: "系统", title: "查出两笔候选", text: "同日两笔、产品不同，不能取第一笔代替选择。" }
        ]
      }
    },
    {
      id: "human",
      customer: "客户丙",
      advisorName: "演示顾问",
      initials: "丙",
      date: "04/02",
      preview: "钱袋子里有钱，为什么定投扣款失败",
      message: "钱袋子里有钱，为什么定投扣款失败？",
      time: "10:00",
      payload: {
        itemId: "ISSUE-DEMO-03",
        title: "核实定投失败原因",
        statusBadge: "待核对",
        statusTone: "ask",
        primaryAction: "使用话术",
        actionEnabled: true,
        verdict: "原因未明 · 不可发「已查清」结论",
        contrasts: ["现在钱袋子有钱 ≠ 扣款当时可用余额充足"],
        gaps: [
          { label: "失败原因", value: "尚未核实" },
          { label: "扣款时可用余额", value: "尚未核实" }
        ],
        facts: [
          { label: "交易类型", value: "定投 · 景明中短债A" },
          { label: "申请金额", value: "0.1万元" },
          { label: "确认状态", value: "确认失败" }
        ],
        /* 只答：目前查到失败，还缺两项才能说清原因 */
        reply:
          "这笔定投显示确认失败。失败原因和扣款当时的可用余额还没核实到，这两项对上之前，还不能判断具体原因。",
        nextStepText: "登记协同，核实缺口后再续接本题。",
        process: [
          { kind: "系统", title: "已见失败状态", text: "接口仅返回确认失败；原因与扣款时余额仍缺。" }
        ]
      }
    }
  ]
};
