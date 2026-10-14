/** 静态演示夹具 · Mock only。话术只答客户所问，不塞未问边界句。 */
window.SIDEBAR_SHELL_DEMO = {
  version: "sidebar-shell-v1.1",
  cases: [
    {
      id: "confirmation",
      customer: "客户甲",
      advisorName: "演示顾问",
      initials: "甲",
      date: "01/23",
      preview: "这笔150万元申购成功了吗",
      message: "我想核实一下，之前那笔150万元申购成功了吗？",
      time: "10:00",
      payload: {
        itemId: "ISSUE-DEMO-01",
        title: "这笔150万元申购成功了吗？",
        statusBadge: "可回复",
        statusTone: "ok",
        primaryAction: "使用话术",
        actionEnabled: true,
        verdict: "已确认成功 · 景明A · 150万元",
        contrasts: [
          "确认成功 ≠ 资金到账",
          "申请额 150万元 = 确认额 150万元 · 确认日 2026-01-21"
        ],
        facts: [
          { label: "确认状态", value: "确认成功" },
          { label: "确认金额", value: "150万元" },
          { label: "确认日", value: "2026-01-21" }
        ],
        reply:
          "这笔150万元申购已确认成功。确认金额150万元，确认日2026年1月21日。",
        nextStepText: "",
        process: [
          { kind: "系统", title: "定位同笔", text: "按授权账户与150万元线索匹配确认记录（Mock）。" }
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
        reply:
          "这笔定投显示确认失败。失败原因和扣款当时的可用余额还没核实到，这两项对上之前，还不能判断具体原因。",
        nextStepText: "登记协同，核实缺口后再续接本题。",
        process: [
          { kind: "系统", title: "已见失败状态", text: "接口仅返回确认失败；原因与扣款时余额仍缺。" }
        ]
      }
    },
    {
      id: "threshold",
      customer: "客户丁",
      advisorName: "演示顾问",
      initials: "丁",
      date: "06/29",
      preview: "凑够30万今天一定能买吗",
      message: "我凑够30万了，今天一定能买吗？",
      time: "10:00",
      payload: {
        itemId: "ISSUE-DEMO-04B",
        title: "凑够30万今天一定能买吗？",
        statusBadge: "待核对",
        statusTone: "ask",
        primaryAction: "使用话术",
        actionEnabled: true,
        verdict: "不能回答「今天一定能买」· 规则可先说",
        contrasts: ["凑够门槛 ≠ 今天一定能提交成功"],
        checklist: [
          { label: "开放期 6/29–7/3", status: "ok" },
          { label: "首次门槛 30万元", status: "ok" },
          { label: "本人资格", status: "gap" },
          { label: "可用资金", status: "gap" },
          { label: "页面校验", status: "gap" }
        ],
        facts: [
          { label: "申购日期", value: "2026-06-29 至 07-03" },
          { label: "首次门槛", value: "30万元" }
        ],
        reply:
          "开放期是6月29日到7月3日，首次参与门槛30万元。今天能不能提交，还要核您的账户资格、可用资金和页面校验，这几项目前还没核实完。",
        nextStepText: "核实未核项后再判断能否提交。",
        process: [
          { kind: "系统", title: "规则已核", text: "开放期与门槛来自接口；账户侧三项仍缺。" }
        ]
      }
    },
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
      id: "fee-dividend",
      customer: "客户辛",
      advisorName: "龙经理",
      initials: "辛",
      date: "12/31",
      preview: "分红怎么还扣业绩报酬？份额怎么没变？",
      message: "分红怎么还扣业绩报酬？份额怎么没变？",
      time: "14:26",
      payload: {
        itemId: "ISSUE-PF-R03",
        title: "分红扣费与份额为什么没变",
        statusBadge: "可回复",
        statusTone: "ok",
        primaryAction: "使用话术",
        actionEnabled: true,
        heard: ["为什么还扣业绩报酬", "份额怎么没变"],
        metrics: [
          { label: "仍持有", value: "760,080.53份" },
          { label: "业绩报酬", value: "17,440.75元", nature: "已计提" }
        ],
        ruleLine:
          "满30天计费；年化4%内免提；4%–8%提20%；超过8%提30%（本组Mock，非全产品统一）。",
        contrasts: [
          "现金分红扣费 ≠ 份额减少",
          "登记日全部权益参与计费"
        ],
        reasonSections: [
          {
            title: "份额为什么没变",
            summary: "现金分红从分红款扣费，不减持仓份额。"
          },
          {
            title: "为什么还扣费",
            summary: "两批年化约15%～16%，超8%按30%；扣后计费起点重置到分红日。"
          }
        ],
        tables: {
          feeTable: {
            title: "费用计算明细（节选）",
            headers: ["批次", "年化", "本批费用"],
            rows: [
              ["2025-02-11", "约15%～16%", "（见核算）"],
              ["2025-07-15", "约15%～16%", "（见核算）"],
              ["合计", "—", "17,440.75"]
            ]
          }
        },
        reply:
          "您仍持有 760,080.53 份，份额没有因分红减少；已计提业绩报酬 17,440.75 元从分红现金扣除。现金分红不减份额，登记日全部权益参与计费，所以份数看着没变、费用却会扣。费用偏高，是因为两批年化都到约 15%～16%，远超 8% 上档线，超线部分按 30% 提取。扣费后计费起点已重置到分红日，之前这段不会在下次再提一遍。",
        nextStepText: "",
        process: [
          { kind: "核算", title: "分红回溯", text: "Mock：份额不变、费用从分红现金扣。" }
        ]
      }
    },
    {
      id: "fee-estimate",
      customer: "客户壬",
      advisorName: "龙经理",
      initials: "壬",
      date: "02/10",
      preview: "现在还剩哪些？大概还会收多少业绩报酬？",
      message: "买过好几次也赎过，现在还剩哪些？大概还会收多少业绩报酬？",
      time: "09:42",
      payload: {
        itemId: "ISSUE-PF-R16",
        title: "当前剩余批次与预估业绩报酬",
        statusBadge: "可回复",
        statusTone: "ok",
        primaryAction: "使用话术",
        actionEnabled: true,
        heard: ["还剩哪些批次", "大概还会收多少"],
        metrics: [
          { label: "还剩", value: "177,688.76份" },
          { label: "预估业绩报酬", value: "1,881.26元", nature: "预估（尚未收取）" }
        ],
        ruleLine:
          "满30天计费；年化4%内免提；4%–8%提20%；超过8%提30%（本组Mock，非全产品统一）。",
        contrasts: ["预估 ≠ 已计提／已从赎回款扣除"],
        attribution: [
          { lot: "2025-06-17批", amount: "计入预估" },
          { lot: "2025-09-16批", amount: "计入预估" },
          { lot: "2026-02-03批", amount: "未满30天 · 本次为0" }
        ],
        reasonSections: [
          {
            title: "还剩哪些",
            summary: "三批：2025-06-17、2025-09-16、2026-02-03（先买先扣后结果）。"
          },
          {
            title: "预估怎么来",
            summary: "前两批已满30天且年化超8%；最新一批持有7天未满30天为0。"
          }
        ],
        tables: {
          shareTable: {
            title: "剩余批次（摘要）",
            headers: ["确认日", "说明", "份额"],
            rows: [
              ["2025-06-17", "剩余批", "（见核算）"],
              ["2025-09-16", "剩余批", "（见核算）"],
              ["2026-02-03", "剩余批 · 未满30天", "（见核算）"],
              ["合计", "—", "177,688.76"]
            ]
          }
        },
        reply:
          "现在还剩三批共 177,688.76 份：2025-06-17、2025-09-16 与 2026-02-03 留下的，是多次买入、两次赎回按先买入先扣后的结果。当前预估业绩报酬约 1,881.26 元：前两批已满 30 天且年化都超 8%，按分档计入预估；最新一批只持有 7 天未满 30 天，本次费用为 0。这笔费用尚未收取，实际赎回或分红时才会扣，预估会随净值变化。",
        nextStepText: "",
        process: [
          { kind: "核算", title: "日预估", text: "Mock：profit_fee_daily_estimate；强调尚未收取。" }
        ]
      }
    },
    {
      id: "active-product",
      customer: "客户己",
      advisorName: "演示顾问",
      initials: "己",
      date: "06/11",
      preview: "产品资料说明与需求了解",
      message: "能先发一下苍穹创裕3号的资料吗？我想看看。",
      time: "10:00",
      payload: {
        itemId: "OPPORTUNITY-DEMO-06",
        title: "产品资料说明与需求了解",
        statusBadge: "待确认",
        statusTone: "ask",
        primaryAction: "使用话术",
        actionEnabled: true,
        verdict: "资料可备发 · 需求未确认 · 不判断是否合适",
        cardFields: [
          { label: "代码", value: "276209" },
          { label: "类型／风险", value: "境内混合 · R3" },
          { label: "发售窗", value: "6月4日–6月16日" },
          { label: "首次门槛", value: "40万元（追加1万起）" },
          { label: "开放／锁定", value: "每季多次开放；成立后前6个月不接受退出" },
          { label: "业绩报酬要点", value: "超年化6%提取20%" }
        ],
        checks: ["客户需求", "适当性边界", "触达频控"],
        reply:
          "苍穹创裕3号资料里，门槛、开放和业绩报酬要点见侧栏。您更关注持有期限，还是资金使用安排？",
        nextStepText: "确认服务条件后再判断是否合适发送。",
        process: [
          { kind: "机会", title: "资料摘要", text: "Mock 产品字段；不替代适当性判断。" }
        ]
      }
    }
  ]
};
