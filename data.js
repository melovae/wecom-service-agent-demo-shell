/** 静态演示夹具 · Mock only。v1.8：戊按管户促成口径改写。 */
window.SIDEBAR_SHELL_DEMO = {
  version: "sidebar-shell-v1.8",
  cases: [
    {
      id: "confirmation",
      customer: "客户甲",
      advisorName: "演示顾问",
      initials: "甲",
      date: "01/23",
      preview: "之前那笔150万，申购成了没",
      message: "之前那笔150万，申购成了没？",
      time: "10:03",
      payload: {
        itemId: "ISSUE-DEMO-01",
        title: "那笔150万申购成了吗？",
        statusBadge: "可回复",
        statusTone: "ok",
        primaryAction: "使用话术",
        actionEnabled: true,
        verdict: "已锁定 SG202601200091 · 近窗仅此一笔 · 确认成功",
        facts: [
          { label: "申请编号", value: "SG202601200091" },
          { label: "产品", value: "广发景明中短债A" },
          { label: "确认金额", value: "150万元" },
          { label: "确认日", value: "2026-01-21" }
        ],
        reply:
          "成了。1月21号确认成功，金额还是150万。单号 SG202601200091，就是这笔。",
        nextStepText: "",
        process: [
          {
            kind: "系统",
            title: "按金额线索定位",
            text: "授权账户近窗仅一笔150万申购，申请编号 SG202601200091，确认成功。"
          }
        ]
      }
    },
    {
      id: "supplement",
      customer: "客户乙",
      advisorName: "演示顾问",
      initials: "乙",
      date: "08/06",
      preview: "今天两笔申购好像都没确认，能撤吗",
      message: "今天两笔申购好像都没确认，能撤吗？",
      time: "15:22",
      payload: {
        itemId: "ISSUE-DEMO-02",
        title: "未确认的申购能撤吗？",
        statusBadge: "待补问",
        statusTone: "ask",
        primaryAction: "使用话术",
        actionEnabled: true,
        verdict: "查出两笔未确认 · 可否撤不同 · 还没选定是哪一笔",
        candidates: [
          {
            applyNo: "SG202608060012",
            name: "广发景明中短债A",
            code: "006591",
            amount: "10万元",
            confirm: "未确认",
            cancelable: false
          },
          {
            applyNo: "SG202608060027",
            name: "广发小盘成长A",
            code: "162703",
            amount: "10万元",
            confirm: "未确认",
            cancelable: true
          }
        ],
        contrasts: ["未确认 ≠ 可撤"],
        reply:
          "两笔都还没确认。景明中短债A，单号 SG202608060012，现在撤不了；小盘成长A，单号 SG202608060027，可以撤。您说的是哪一笔？",
        nextStepText: "先发出补问，等客户指明产品或单号后再续接。",
        process: [
          {
            kind: "系统",
            title: "同日两笔候选",
            text: "金额都是10万、产品不同；可否撤也不一样，不能默认第一笔。"
          }
        ]
      }
    },
    {
      id: "human",
      customer: "客户丙",
      advisorName: "演示顾问",
      initials: "丙",
      date: "04/02",
      preview: "钱袋子有钱，定投怎么失败了",
      message: "奇怪了，我钱袋子里明明有钱，定投怎么还失败了？",
      time: "09:41",
      payload: {
        itemId: "ISSUE-DEMO-03",
        title: "定投扣款失败原因",
        statusBadge: "待核对",
        statusTone: "ask",
        primaryAction: "使用话术",
        actionEnabled: true,
        verdict: "已锁定 DT202604010018（4/1）· 近窗仅一笔失败 · 原因未核清",
        facts: [
          { label: "申请编号", value: "DT202604010018" },
          { label: "扣款日", value: "2026-04-01" },
          { label: "定投产品", value: "景明中短债A" },
          { label: "申请金额", value: "1000元" },
          { label: "确认状态", value: "确认失败" }
        ],
        contrasts: ["现在钱袋子有钱 ≠ 扣款当时可用余额充足"],
        gaps: [
          { label: "失败原因", value: "尚未核实" },
          { label: "扣款时可用余额", value: "尚未核实" }
        ],
        reply:
          "4月1号那期定投失败了，景明中短债A、1000块，单号 DT202604010018。失败原因和扣款当时钱袋子里有多少可用，我还在查，查到了马上跟您说，现在先不定论。",
        nextStepText: "按已锁定申请编号登记协同，核清原因与扣款时余额后再续接。",
        process: [
          {
            kind: "系统",
            title: "先定位失败单",
            text: "客户没点名哪一期；近窗仅一笔确认失败定投，已用申请编号+扣款日锁定。"
          }
        ]
      }
    },
    {
      id: "threshold",
      customer: "客户丁",
      advisorName: "演示顾问",
      initials: "丁",
      date: "06/29",
      preview: "30万我凑齐了，今天一定能买上吗",
      message: "30万我凑齐了，今天一定能买上吗？",
      time: "11:08",
      payload: {
        itemId: "ISSUE-DEMO-04B",
        title: "凑够30万今天一定能买吗？",
        statusBadge: "待核对",
        statusTone: "ask",
        primaryAction: "使用话术",
        actionEnabled: true,
        /* 合格投资者：管户已知。真缺口：当时可用 + 预约码条件是否满足（非「系统能不能下」） */
        verdict: "会话已对准 006591 · 开放期／门槛／合格投资者已齐 · 当时可用与预约码条件未核",
        checklist: [
          { label: "开放期 6/29–7/3", status: "ok" },
          { label: "首次门槛 30万元", status: "ok" },
          { label: "合格投资者（管户已知）", status: "ok" },
          { label: "当时可用资金", status: "gap" },
          { label: "预约码条件是否满足", status: "gap" }
        ],
        facts: [
          { label: "产品", value: "广发景明中短债A（006591）" },
          { label: "合格投资者", value: "是（顾问侧已知）" }
        ],
        reply:
          "开放期是6月29日到7月3日，30万门槛也够；您这边合格投资者身份没问题。今天能不能一定买上，我还不能打包票——还要看账户里当时可用够不够，以及您是否满足预约码的办理条件。这两项我帮您核一下，有结果马上跟您说。",
        nextStepText: "核当时可用资金与预约码条件；勿提前承诺「一定能买」。",
        process: [
          {
            kind: "系统",
            title: "资格已知、预约码待核",
            text: "开放期、门槛来自接口；合格投资者为管户已知。当时可用资金、预约码条件是否满足仍缺。"
          }
        ]
      }
    },
    {
      id: "active-open",
      customer: "客户戊",
      advisorName: "演示顾问",
      initials: "戊",
      date: "06/16",
      preview: "寰宇19号是不是今天就募完了",
      message: "寰宇19号是不是今天就募完了？还来得及吗？",
      time: "09:31",
      payload: {
        itemId: "OPPORTUNITY-DEMO-05",
        title: "寰宇19号募集是不是今天结束",
        statusBadge: "待核对",
        statusTone: "ask",
        primaryAction: "使用话术",
        actionEnabled: true,
        /* 管户立场：确认最后一天后，主动帮核条件、推动今日办成 */
        heard: ["是不是今天募完", "还来得及吗"],
        verdict: "今天确是本期最后一天 · 正在帮您核对条件，争取今天办成",
        timeline: ["2026-06-04 开始 → 2026-06-16 结束（今天）"],
        facts: [
          { label: "产品", value: "广发寰宇全球精选19号（QDII）· 276210" },
          { label: "本期结束日", value: "2026-06-16（今天）" }
        ],
        checklist: [
          { label: "募集窗今日截止", status: "ok" },
          { label: "合格投资者（管户已知）", status: "ok" },
          { label: "当时可用资金", status: "gap" },
          { label: "预约码／办理条件", status: "gap" }
        ],
        reply:
          "对，寰宇19号这期今天就是最后一天。您要是想赶上，我现在就帮您核账户可用和办理条件，能办的话咱们今天一起推进。资料和规则我也可以先发您，您先看着。",
        nextStepText: "立即核可用资金与预约码／办理条件，协助客户今日提交。",
        process: [
          {
            kind: "系统",
            title: "窗已确认 · 转促成核对",
            text: "日历确认今日截止。顾问侧主动核可用与办理条件，目标是帮客户赶上本期，不泼冷水。"
          }
        ]
      }
    },
    {
      id: "fee-redeem",
      customer: "客户庚",
      advisorName: "龙经理",
      initials: "庚",
      date: "01/13",
      preview: "还剩多少份额？业绩报酬怎么扣这么多",
      message:
        "龙经理，我昨天赎回的那笔今天确认了。还剩多少份额？业绩报酬怎么扣这么多，我有点懵",
      time: "10:18",
      payload: {
        itemId: "ISSUE-PF-R01",
        title: "赎回后还剩多少、业绩报酬为什么这么多",
        statusBadge: "可回复",
        statusTone: "ok",
        primaryAction: "使用话术",
        actionEnabled: true,
        heard: ["还剩多少份额", "为什么扣这么多"],
        verdict: "已锁定 SH202601120044 · 赎回已确认 · 余额与已扣费用已对齐",
        metrics: [
          { label: "还剩", value: "160,080.53份" },
          { label: "业绩报酬", value: "12,449.49元", nature: "已计提" }
        ],
        facts: [
          { label: "申请编号", value: "SH202601120044" },
          { label: "产品", value: "景明优选混合A" },
          { label: "确认日", value: "2026-01-13" },
          { label: "赎回份额", value: "600,000.00份" }
        ],
        ruleLine: "4%内免提；4%–8%提20%；超过8%提30%（本组演示口径）。",
        attribution: [
          { lot: "2025-02-11批", amount: "10,966.21元" },
          { lot: "2025-07-15批", amount: "1,483.28元" }
        ],
        reasonSections: [
          {
            title: "为什么偏高",
            summary:
              "两批年化约13%出头，收益不错才进超8%的30%档；先买先扣下早批份额大，费用多在这批（10,966.21／1,483.28）。"
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
          "赎回确认了。还剩 160,080.53 份，业绩报酬 12,449.49 元已经从赎回款里扣了。您觉得扣得多，其实是这两批这段时间年化都到 13% 出头——收益不错，超过 8% 的部分才按 30% 提。按先买先扣：2月那批这次扣光，扣了 10,966.21 元；7月那批扣了一部分，扣了 1,483.28 元。",
        nextStepText: "",
        process: [
          {
            kind: "系统",
            title: "定位赎回确认",
            text: "按昨日赎回申请匹配今日确认；申请编号 SH202601120044。"
          },
          {
            kind: "核算",
            title: "分档合计",
            text: "数字来自核算夹具；话术不改表内金额。"
          }
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
      message: "龙经理，分红怎么还扣业绩报酬啊？我看份额怎么没变？",
      time: "14:26",
      payload: {
        itemId: "ISSUE-PF-R03",
        title: "分红扣费与份额为什么没变",
        statusBadge: "可回复",
        statusTone: "ok",
        primaryAction: "使用话术",
        actionEnabled: true,
        heard: ["为什么还扣业绩报酬", "份额怎么没变"],
        verdict: "已锁定 景明优选混合A · 2025-12-31 现金分红 · 份额不变费用从现金扣",
        metrics: [
          { label: "仍持有", value: "760,080.53份" },
          { label: "业绩报酬", value: "17,440.75元", nature: "已计提" }
        ],
        facts: [
          { label: "权益登记日", value: "2025-12-31" },
          { label: "产品", value: "景明优选混合A" },
          { label: "分红方式", value: "现金分红" }
        ],
        ruleLine: "4%内免提；4%–8%提20%；超过8%提30%（本组演示口径）。",
        reasonSections: [
          {
            title: "份额为什么没变",
            summary: "现金分红从分红款扣费，不减持仓份额。"
          },
          {
            title: "为什么还扣费",
            summary: "两批年化约15%～16%，落在较高提取档；扣后计费起点重置到分红日（顾问注，默认不进话术）。"
          }
        ],
        tables: {
          feeTable: {
            title: "费用计算明细",
            headers: ["批次", "年化", "本批费用"],
            rows: [
              ["2025-02-11", "15.0022%", "12,834.37"],
              ["2025-07-15", "16.3874%", "4,606.38"],
              ["合计", "—", "17,440.75"]
            ]
          }
        },
        reply:
          "您仍持有 760,080.53 份，现金分红不减份额，所以份数没变是正常的。17,440.75 元是从这次分红现金里扣的。费用偏高，是两批年化都在 15%～16% 左右，已经超过 8%，按这一档的 30% 提。",
        nextStepText: "",
        process: [
          {
            kind: "核算",
            title: "分红回溯",
            text: "份额不变、费用从分红现金扣；登记日 2025-12-31。"
          }
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
      message: "龙经理，我买过好几次也赎过，现在手里还剩哪些？大概还会收多少业绩报酬？",
      time: "09:42",
      payload: {
        itemId: "ISSUE-PF-R16",
        title: "当前剩余批次与预估业绩报酬",
        statusBadge: "可回复",
        statusTone: "ok",
        primaryAction: "使用话术",
        actionEnabled: true,
        heard: ["还剩哪些批次", "大概还会收多少"],
        verdict: "景明优选混合A · 估值日 2/10 · 三批预估 1,881.26 元尚未收取",
        metrics: [
          { label: "还剩", value: "177,688.76份" },
          { label: "预估业绩报酬", value: "1,881.26元", nature: "预估（尚未收取）" }
        ],
        facts: [
          { label: "产品", value: "景明优选混合A" },
          { label: "估值日", value: "2026-02-10" }
        ],
        ruleLine: "满30天才计费；4%内免提；4%–8%提20%；超过8%提30%（本组演示口径）。",
        contrasts: ["预估 ≠ 已计提／已从赎回款扣除"],
        attribution: [
          { lot: "2025-06-17批 · 58,139.53份", amount: "1,048.45元" },
          { lot: "2025-09-16批 · 74,906.37份", amount: "832.81元" },
          { lot: "2026-02-03批 · 44,642.86份", amount: "0元（持有7天未满30天）" }
        ],
        reasonSections: [
          {
            title: "预估怎么来",
            summary: "前两批已满30天且年化超8%计入预估；最新一批持有7天未满30天为0。"
          }
        ],
        tables: {
          shareTable: {
            title: "剩余批次",
            headers: ["确认日", "剩余份额", "预估费用"],
            rows: [
              ["2025-06-17", "58,139.53", "1,048.45"],
              ["2025-09-16", "74,906.37", "832.81"],
              ["2026-02-03", "44,642.86", "0.00"],
              ["合计", "177,688.76", "1,881.26"]
            ]
          }
        },
        reply:
          "您前后买过几次也赎过，按先买先扣下来，现在手里还剩三批，共 177,688.76 份——分别是 6月17日、9月16日和 2月3日确认留下的。按现在净值粗估大概 1,881.26 元，还没真正收：6月那批约 1,048.45 元、9月那批约 832.81 元；2月3日那批才 7 天，这次按 0。以后赎回或分红才扣，净值变了数字也会变。",
        nextStepText: "",
        process: [
          {
            kind: "核算",
            title: "日预估",
            text: "估值日 2026-02-10；强调尚未收取、随净值变动。"
          }
        ]
      }
    },
    {
      id: "active-product",
      customer: "客户己",
      advisorName: "演示顾问",
      initials: "己",
      date: "06/11",
      preview: "苍穹创裕3号的资料，能先发我看看吗",
      message: "苍穹创裕3号的资料，能先发我看看吗？",
      time: "16:05",
      payload: {
        itemId: "OPPORTUNITY-DEMO-06",
        title: "产品资料说明与需求了解",
        statusBadge: "待确认",
        statusTone: "ask",
        primaryAction: "使用话术",
        actionEnabled: true,
        verdict: "可先发摘要要点 · 全文／推荐前三项未核",
        checks: ["客户需求（全文推荐前）", "适当性边界", "触达频控"],
        cardFields: [
          { label: "代码", value: "276209" },
          { label: "类型／风险", value: "境内混合 · R3" },
          { label: "发售日期", value: "6月4日–6月16日" },
          { label: "首次门槛", value: "40万元（追加1万起）" }
        ],
        reply:
          "可以。苍穹创裕3号，代码 276209，6月4日到16日发售，第一次 40 万起，风险是 R3。您先看这几个点；想聊适不适合的话，再说说能放多久、钱大概啥时候要用。",
        nextStepText: "可先发摘要；全文或推荐购买前再核需求、适当性与频控。",
        process: [
          {
            kind: "机会",
            title: "摘要可先发",
            text: "客户要「先看看」；摘要事实可发，推荐与全文前三项仍未核。"
          }
        ]
      }
    }
  ]
};
