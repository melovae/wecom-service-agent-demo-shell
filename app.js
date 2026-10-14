(function () {
  const data = window.SIDEBAR_SHELL_DEMO;
  if (!data) return;

  const els = {
    convList: document.getElementById("conv-list"),
    chatName: document.getElementById("chat-name"),
    chatDay: document.getElementById("chat-day"),
    msgAv: document.getElementById("msg-av"),
    msgWhen: document.getElementById("msg-when"),
    msgText: document.getElementById("msg-text"),
    draft: document.getElementById("draft"),
    sendBtn: document.getElementById("send-btn"),
    sidebar: document.getElementById("sidebar"),
    useBtn: document.getElementById("use-btn"),
    assistantSub: document.getElementById("assistant-sub")
  };

  let activeId = data.cases[0].id;

  function esc(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function tableHtml(table) {
    if (!table) return "";
    const head = `<tr>${table.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>`;
    const body = table.rows
      .map((row) => `<tr>${row.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
      .join("");
    return `<div class="table-wrap"><p class="cand-label">${esc(table.title)}</p><table class="demo">${head}${body}</table></div>`;
  }

  function renderCheck(p) {
    const parts = [];

    if (p.heard?.length) {
      parts.push(
        `<p class="heard">客户问了 ${p.heard.length} 点：${p.heard
          .map((q, i) => `<b>${i + 1}．${esc(q)}</b>`)
          .join(" ")}</p>`
      );
    }
    if (p.verdict) {
      parts.push(`<div class="verdict"><span>本题结论</span><b>${esc(p.verdict)}</b></div>`);
    }
    if (p.metrics?.length) {
      parts.push(
        `<div class="metrics">${p.metrics
          .map((m) => `<div class="metric"><span>${esc(m.label)}</span><b>${esc(m.value)}</b></div>`)
          .join("")}</div>`
      );
      const nature = p.metrics.find((m) => m.nature)?.nature;
      if (nature) {
        const est = /预估|尚未/.test(nature);
        parts.push(
          `<span class="nature${est ? " is-estimate" : ""}">${esc(nature)}</span>`
        );
      }
    }
    if (p.ruleLine) parts.push(`<p class="rule">规则：${esc(p.ruleLine)}</p>`);
    if (p.contrasts?.length) {
      parts.push(
        `<ul class="contrasts">${p.contrasts
          .map((c) => `<li>不能混为一谈 · ${esc(c)}</li>`)
          .join("")}</ul>`
      );
    }
    if (p.candidates?.length) {
      parts.push(`<p class="cand-label">还没选定哪一笔 · 当前可撤</p>`);
      parts.push(
        p.candidates
          .map((c) => {
            const flag = c.cancelable
              ? `<span class="flag-ok">可撤销</span>`
              : `<span class="flag-no">不可撤销</span>`;
            return `<div class="cand"><div><b>${esc(c.name)}</b><small>${esc(c.code)} · ${esc(
              c.amount
            )} · ${esc(c.confirm)}</small></div>${flag}</div>`;
          })
          .join("")
      );
    }
    if (p.gaps?.length) {
      parts.push(
        `<dl class="gaps"><p class="cand-label">还没查到</p>${p.gaps
          .map(
            (g) =>
              `<div class="row"><dt>${esc(g.label)}</dt><dd>${esc(g.value)}</dd></div>`
          )
          .join("")}</dl>`
      );
    }
    if (p.checklist?.length) {
      parts.push(
        `<ul class="checklist"><p class="cand-label">条件核对</p>${p.checklist
          .map((row) => {
            const ok = row.status === "ok";
            return `<li class="${ok ? "is-ok" : "is-gap"}"><span>${esc(
              row.label
            )}</span><b>${ok ? "已核" : "未核"}</b></li>`;
          })
          .join("")}</ul>`
      );
    }
    if (p.cardFields?.length) {
      parts.push(
        `<dl class="facts card"><p class="cand-label">资料摘要</p>${p.cardFields
          .map(
            (f) =>
              `<div class="row"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`
          )
          .join("")}</dl>`
      );
    }
    if (p.checks?.length) {
      parts.push(
        `<ul class="checklist"><p class="cand-label">发出前我要核</p>${p.checks
          .map(
            (c) =>
              `<li class="is-gap"><span>${esc(c)}</span><b>未核</b></li>`
          )
          .join("")}</ul>`
      );
    }
    if (p.attribution?.length) {
      parts.push(
        `<ul class="attr">${p.attribution
          .map((a) => `<li><span>${esc(a.lot)}</span><b>${esc(a.amount)}</b></li>`)
          .join("")}</ul>`
      );
    }
    if (p.reasonSections?.length) {
      parts.push(
        p.reasonSections
          .map((s) => `<div class="sec"><h4>${esc(s.title)}</h4><p>${esc(s.summary)}</p></div>`)
          .join("")
      );
    }
    if (p.facts?.length) {
      parts.push(
        `<dl class="facts">${p.facts
          .map(
            (f) =>
              `<div class="row"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`
          )
          .join("")}</dl>`
      );
    }
    if (p.tables && Object.keys(p.tables).length) {
      const inner = Object.values(p.tables).map(tableHtml).join("");
      parts.push(
        `<details class="fold"><summary>▸ 演算明细（默认折叠）</summary>${inner}</details>`
      );
    }
    return parts.join("") || `<p class="rule">暂无核对块</p>`;
  }

  function renderSidebar(item) {
    const p = item.payload;
    const tone = p.statusTone === "ask" ? "ask" : p.statusTone === "ok" ? "ok" : "";
    const process = (p.process || [])
      .map(
        (ev) =>
          `<div class="ev"><span>${esc(ev.kind)}</span><div><b>${esc(ev.title)}</b><p>${esc(
            ev.text
          )}</p></div></div>`
      )
      .join("");

    els.sidebar.innerHTML = `
      <div class="item-title">
        <h2>${esc(p.title)}</h2>
        <span class="badge ${tone}">${esc(p.statusBadge)}</span>
      </div>
      <section class="zone check" aria-label="查清">
        <div class="zone-h"><h3>① 查清</h3><span class="tag">给顾问核对</span></div>
        ${renderCheck(p)}
      </section>
      <section class="zone reply" aria-label="答复">
        <div class="zone-h"><h3>② 答复</h3><span class="tag">给客户这样说</span></div>
        <div class="reply-box"><label>唯一可发送稿</label>${esc(p.reply)}</div>
        ${p.nextStepText ? `<p class="next"><b>下一步</b> ${esc(p.nextStepText)}</p>` : ""}
      </section>
      <div class="process">
        <details><summary>▸ 核对过程（默认折）</summary>${process}</details>
      </div>
    `;

    els.useBtn.textContent = p.primaryAction || "使用话术";
    els.useBtn.disabled = !p.actionEnabled;
    els.useBtn.onclick = () => {
      els.draft.value = p.reply;
      els.sendBtn.disabled = false;
      els.draft.focus();
    };
  }

  function renderConvs() {
    els.convList.innerHTML = data.cases
      .map((c) => {
        const selected = c.id === activeId;
        return `<button type="button" class="conv" data-id="${esc(c.id)}" aria-selected="${
          selected ? "true" : "false"
        }">
          <div class="av">${esc(c.initials)}</div>
          <div class="meta">
            <b>${esc(c.customer)} <time>${esc(c.date)}</time></b>
            <span>${esc(c.preview)}</span>
          </div>
        </button>`;
      })
      .join("");

    els.convList.querySelectorAll(".conv").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeId = btn.dataset.id;
        paint();
      });
    });
  }

  function paint() {
    const item = data.cases.find((c) => c.id === activeId) || data.cases[0];
    activeId = item.id;
    renderConvs();
    els.chatName.textContent = item.customer;
    els.chatDay.textContent = `2026-${item.date.replace("/", "-")}`;
    els.msgAv.textContent = item.initials;
    els.msgWhen.textContent = `${item.customer} · ${item.time}`;
    els.msgText.textContent = item.message;
    els.assistantSub.textContent = `${item.customer} · 静态演示`;
    els.draft.value = "";
    els.sendBtn.disabled = true;
    renderSidebar(item);
  }

  els.sendBtn.addEventListener("click", () => {
    if (!els.draft.value.trim()) return;
    alert("演示：仅模拟顾问发送，未接企微、无真实发送。");
  });

  paint();
})();
