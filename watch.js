/* Draws a believable wristwatch (front view) as SVG.
   Options: dial, dialEdge, num (index color), case/case2 (metal), strap/strap2,
   strapType: 'leather'|'bracelet', brand, sub (dial text), sec (seconds hand), uid */
(function () {
  let n = 0;
  const rad = d => (d * Math.PI) / 180;
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  window.watchSVG = function (o) {
    o = o || {};
    const uid = "w" + (++n) + Math.floor(Math.random() * 1e6);
    const CX = 130, CY = 190;
    const dial = o.dial || "#22354E";
    const dialEdge = o.dialEdge || "#16233A";
    const num = o.num || "#E9E3D3";
    const c1 = o.case || "#D8DBE0";
    const c2 = o.case2 || "#8F959E";
    const strap = o.strap || "#3A2C20";
    const strap2 = o.strap2 || "#2A2017";
    const type = o.strapType || "leather";
    const brand = o.brand || "";
    const sub = o.sub || "";
    const sec = o.sec || "#C0392B";

    let ticks = "";
    for (let i = 0; i < 60; i++) {
      const a = i * 6, hr = i % 5 === 0;
      const r1 = hr ? 62 : 68, r2 = 74;
      ticks += `<line x1="${(CX + r1 * Math.sin(rad(a))).toFixed(1)}" y1="${(CY - r1 * Math.cos(rad(a))).toFixed(1)}" x2="${(CX + r2 * Math.sin(rad(a))).toFixed(1)}" y2="${(CY - r2 * Math.cos(rad(a))).toFixed(1)}" stroke="${num}" stroke-width="${hr ? 3.4 : 1.1}" opacity="${hr ? 1 : 0.55}" stroke-linecap="round"/>`;
    }
    // applied hour markers (small trapezoids over the 12/3/6/9 feel)
    let hands = "";
    function hand(angle, len, w, color, tail) {
      const x = CX + len * Math.sin(rad(angle)), y = CY - len * Math.cos(rad(angle));
      const tx = CX - (tail || 0) * Math.sin(rad(angle)), ty = CY + (tail || 0) * Math.cos(rad(angle));
      return `<line x1="${tx.toFixed(1)}" y1="${ty.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    }
    hands += hand(305, 40, 6, num);            // hour ~10:10
    hands += hand(62, 60, 4, num);             // minute
    hands += hand(160, 68, 1.4, sec, 18);      // seconds

    const strapSvg = type === "bracelet" ? `
      <g>
        <rect x="96" y="0" width="68" height="106" rx="6" fill="url(#bg${uid})"/>
        <rect x="96" y="274" width="68" height="106" rx="6" fill="url(#bg${uid})"/>
        ${[14, 30, 46, 62, 78, 94].map(y => `<line x1="96" y1="${y}" x2="164" y2="${y}" stroke="${c2}" stroke-width="1.6" opacity=".8"/>`).join("")}
        ${[288, 304, 320, 336, 352, 368].map(y => `<line x1="96" y1="${y}" x2="164" y2="${y}" stroke="${c2}" stroke-width="1.6" opacity=".8"/>`).join("")}
        <line x1="113" y1="0" x2="113" y2="106" stroke="${c2}" stroke-width="1.2" opacity=".55"/>
        <line x1="147" y1="0" x2="147" y2="106" stroke="${c2}" stroke-width="1.2" opacity=".55"/>
        <line x1="113" y1="274" x2="113" y2="380" stroke="${c2}" stroke-width="1.2" opacity=".55"/>
        <line x1="147" y1="274" x2="147" y2="380" stroke="${c2}" stroke-width="1.2" opacity=".55"/>
      </g>` : `
      <g>
        <polygon points="100,0 160,0 154,104 106,104" fill="url(#sg${uid})"/>
        <polygon points="106,276 154,276 160,380 100,380" fill="url(#sg${uid})"/>
        <line x1="107" y1="4" x2="113" y2="100" stroke="${strap2}" stroke-width="1.4" stroke-dasharray="4 4" opacity=".9"/>
        <line x1="153" y1="4" x2="147" y2="100" stroke="${strap2}" stroke-width="1.4" stroke-dasharray="4 4" opacity=".9"/>
        <line x1="113" y1="280" x2="107" y2="376" stroke="${strap2}" stroke-width="1.4" stroke-dasharray="4 4" opacity=".9"/>
        <line x1="147" y1="280" x2="153" y2="376" stroke="${strap2}" stroke-width="1.4" stroke-dasharray="4 4" opacity=".9"/>
      </g>`;

    return `<svg viewBox="0 0 260 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(brand)} watch">
      <defs>
        <linearGradient id="cg${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${c1}"/><stop offset=".5" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/>
        </linearGradient>
        <linearGradient id="bg${uid}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="${c1}"/><stop offset=".5" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/>
        </linearGradient>
        <linearGradient id="sg${uid}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="${strap}"/><stop offset="1" stop-color="${strap2}"/>
        </linearGradient>
        <radialGradient id="dg${uid}" cx=".38" cy=".34" r=".9">
          <stop offset="0" stop-color="${dial}"/><stop offset="1" stop-color="${dialEdge}"/>
        </radialGradient>
      </defs>
      ${strapSvg}
      <rect x="222" y="182" width="14" height="16" rx="3" fill="url(#cg${uid})"/>
      <circle cx="${CX}" cy="${CY}" r="96" fill="url(#cg${uid})"/>
      <circle cx="${CX}" cy="${CY}" r="96" fill="none" stroke="${c2}" stroke-width="1.4" opacity=".7"/>
      <circle cx="${CX}" cy="${CY}" r="84" fill="${dialEdge}"/>
      <circle cx="${CX}" cy="${CY}" r="79" fill="url(#dg${uid})"/>
      ${ticks}
      <rect x="181" y="181" width="24" height="19" rx="2" fill="#F2EEE2" stroke="${dialEdge}" stroke-width="1"/>
      <text x="193" y="195" font-family="Arial" font-size="12" fill="#222" text-anchor="middle">27</text>
      <text x="${CX}" y="152" font-family="Georgia,serif" font-size="15" letter-spacing="2.5" fill="${num}" text-anchor="middle">${esc(brand)}</text>
      <text x="${CX}" y="232" font-family="Arial" font-size="8.5" letter-spacing="1.6" fill="${num}" opacity=".85" text-anchor="middle">${esc(sub)}</text>
      ${hands}
      <circle cx="${CX}" cy="${CY}" r="5" fill="${num}"/>
      <circle cx="${CX}" cy="${CY}" r="2.2" fill="${sec}"/>
      <ellipse cx="${CX - 30}" cy="${CY - 38}" rx="46" ry="26" fill="#ffffff" opacity=".06" transform="rotate(-24 ${CX - 30} ${CY - 38})"/>
    </svg>`;
  };

  // Auto-fill any element carrying data-watch with an SVG
  window.paintWatches = function (root) {
    (root || document).querySelectorAll("[data-watch]").forEach(el => {
      if (el.dataset.painted) return;
      el.dataset.painted = "1";
      const d = el.dataset;
      el.innerHTML = window.watchSVG({
        dial: d.dial, dialEdge: d.dialedge, num: d.num,
        case: d.case, case2: d.case2,
        strap: d.strap, strap2: d.strap2, strapType: d.straptype,
        brand: d.brand, sub: d.sub, sec: d.sec
      });
    });
  };
  document.addEventListener("DOMContentLoaded", () => window.paintWatches());
})();
