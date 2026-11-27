/* كرونوس — shared app logic: theme, catalog, cart, filters, forms */
(function () {
  /* ---------- theme ---------- */
  const root = document.documentElement;
  const qTheme = new URLSearchParams(location.search).get("theme");
  const saved = qTheme || localStorage.getItem("kronos-theme");
  if (saved) root.setAttribute("data-theme", saved);
  function paintToggle() {
    document.querySelectorAll(".theme-toggle").forEach(b => {
      b.textContent = root.getAttribute("data-theme") === "dark" ? "☀" : "☾";
      b.setAttribute("aria-label", "تبديل الوضع الليلي");
    });
  }
  document.addEventListener("click", e => {
    const t = e.target.closest(".theme-toggle");
    if (!t) return;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("kronos-theme", next);
    paintToggle();
  });
  document.addEventListener("DOMContentLoaded", paintToggle);

  /* ---------- catalog ---------- */
  const STEEL = { case: "#D8DBE0", case2: "#8F959E", strapType: "bracelet" };
  const GOLD = { case: "#E4C87F", case2: "#A8873F" };
  window.CATALOG = [
    { id: "omega-seamaster", brand: "OMEGA", brandAr: "أوميغا", model: "سيماستر دايفر 300M", ref: "210.30.42.20.03.001", price: 385000, old: 420000,
      dial: "#1F3A5F", dialEdge: "#122540", strapType: "bracelet", movement: "أوتوماتيك", size: 42, year: 2023, cond: "مستعمل — بحالة ممتازة",
      story: "الساعة الغواصة الأشهر من أوميغا: قرص أزرق سيراميك بنقشة الموج، مقاومة ماء 300 متر، وكاليبر 8800 بشهادة ماستر كرونوميتر." },
    { id: "rolex-datejust", brand: "ROLEX", brandAr: "رولكس", model: "ديت جاست 36", ref: "126234", price: 720000,
      dial: "#C9CDD4", dialEdge: "#9BA1AB", num: "#2A2A2A", strapType: "bracelet", movement: "أوتوماتيك", size: 36, year: 2022, cond: "مستعمل — بحالة ممتازة" },
    { id: "tissot-prx", brand: "TISSOT", brandAr: "تيسو", model: "بي آر إكس باورماتيك 80", ref: "T137.407.11.051.00", price: 78500,
      dial: "#20242B", dialEdge: "#12151A", strapType: "bracelet", movement: "أوتوماتيك", size: 40, year: 2024, cond: "جديد" },
    { id: "longines-spirit", brand: "LONGINES", brandAr: "لونجين", model: "سبيريت زولو تايم", ref: "L3.812.4.63.2", price: 165000,
      dial: "#2E4B3F", dialEdge: "#1B3229", strap: "#4A3223", strap2: "#332216", strapType: "leather", movement: "أوتوماتيك GMT", size: 42, year: 2023, cond: "جديد" },
    { id: "cartier-tank", brand: "CARTIER", brandAr: "كارتييه", model: "تانك موست", ref: "WSTA0041", price: 210000,
      dial: "#F1ECE0", dialEdge: "#DDD5C2", num: "#1E1E1E", strap: "#1C1A18", strap2: "#0F0E0D", strapType: "leather", movement: "كوارتز", size: 33, year: 2023, cond: "جديد" },
    { id: "seiko-presage", brand: "SEIKO", brandAr: "سيكو", model: "بريساج كوكتيل تايم", ref: "SRPE15J1", price: 42000,
      dial: "#D8C79B", dialEdge: "#B09C68", num: "#3B3122", ...GOLD, strap: "#4A3223", strap2: "#332216", strapType: "leather", movement: "أوتوماتيك", size: 40, year: 2024, cond: "جديد" },
    { id: "omega-speedmaster", brand: "OMEGA", brandAr: "أوميغا", model: "سبيد ماستر بروفيشنال", ref: "310.30.42.50.01.001", price: 460000, reserved: true,
      dial: "#1D1D1F", dialEdge: "#0C0C0E", strapType: "bracelet", movement: "يدوي — كرونوغراف", size: 42, year: 2021, cond: "مستعمل — بحالة ممتازة" },
    { id: "tudor-bb58", brand: "TUDOR", brandAr: "تيودور", model: "بلاك باي 58", ref: "M79030N-0001", price: 240000,
      dial: "#211D1B", dialEdge: "#100E0D", num: "#D9C79A", strapType: "bracelet", movement: "أوتوماتيك", size: 39, year: 2022, cond: "مستعمل — بحالة ممتازة" },
    { id: "iwc-markxx", brand: "IWC", brandAr: "آي دبليو سي", model: "مارك XX", ref: "IW328201", price: 295000,
      dial: "#1E3A66", dialEdge: "#122645", strap: "#22201D", strap2: "#151311", strapType: "leather", movement: "أوتوماتيك", size: 40, year: 2024, cond: "جديد" },
    { id: "grand-seiko", brand: "GRAND SEIKO", brandAr: "جراند سيكو", model: "سنو فليك", ref: "SBGA211", price: 330000,
      dial: "#EDF0F4", dialEdge: "#C9D2DE", num: "#2B3038", strapType: "bracelet", movement: "سبرينج درايف — أوتوماتيك", size: 41, year: 2023, cond: "مستعمل — بحالة ممتازة", sec: "#3E6FB5" },
    { id: "tag-carrera", brand: "TAG HEUER", brandAr: "تاغ هوير", model: "كاريرا كرونوغراف", ref: "CBN2A1A.BA0643", price: 285000,
      dial: "#31518C", dialEdge: "#1E3560", strapType: "bracelet", movement: "أوتوماتيك — كرونوغراف", size: 44, year: 2023, cond: "جديد" },
    { id: "longines-master", brand: "LONGINES", brandAr: "لونجين", model: "ماستر كولكشن مون فيز", ref: "L2.909.4.78.3", price: 190000,
      dial: "#E8E3D4", dialEdge: "#CFC7B2", num: "#2B2B2B", strap: "#3E2E22", strap2: "#2B1F16", strapType: "leather", movement: "أوتوماتيك — مون فيز", size: 40, year: 2024, cond: "جديد" }
  ];

  window.fmt = n => n.toLocaleString("ar-EG") + " جنيه";

  window.cardHTML = function (p) {
    const strapAttrs = p.strapType === "leather"
      ? `data-strap="${p.strap || "#3A2C20"}" data-strap2="${p.strap2 || "#2A2017"}" data-straptype="leather"`
      : `data-straptype="bracelet"`;
    const caseAttrs = p.case ? `data-case="${p.case}" data-case2="${p.case2}"` : "";
    return `<a class="card" href="product.html?watch=${p.id}">
      <span class="watch-slot" data-watch data-dial="${p.dial}" data-dialedge="${p.dialEdge}" ${p.num ? `data-num="${p.num}"` : ""} ${caseAttrs} ${strapAttrs} data-brand="${p.brand}" data-sub="${p.movement}" ${p.sec ? `data-sec="${p.sec}"` : ""}></span>
      <span class="body">
        ${p.reserved ? '<span class="tag">محجوزة</span>' : ""}
        <span class="brand">${p.brandAr}</span>
        <span class="model">${p.model}</span>
        <span class="ref">رقم المرجع: ${p.ref}</span>
        <span class="price">${window.fmt(p.price)}</span>
      </span>
    </a>`;
  };

  window.renderCards = function (sel, list) {
    const el = document.querySelector(sel);
    if (!el) return;
    el.innerHTML = list.length
      ? list.map(window.cardHTML).join("")
      : '<div class="empty-msg">لا توجد ساعات مطابقة للفلاتر الحالية.</div>';
    window.paintWatches(el);
  };

  /* ---------- cart ---------- */
  function cartCount() { return parseInt(localStorage.getItem("kronos-cart") || "0", 10); }
  function paintCart() {
    document.querySelectorAll(".cart-count").forEach(el => {
      const c = cartCount();
      el.textContent = c;
      el.style.display = c ? "flex" : "none";
    });
  }
  window.addToCart = function () {
    localStorage.setItem("kronos-cart", String(cartCount() + 1));
    paintCart();
  };
  document.addEventListener("DOMContentLoaded", paintCart);

  /* ---------- collection filters ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".coll-grid");
    if (!grid) return;
    const state = { brand: "الكل", movements: new Set(), maxPrice: null, sizes: new Set() };

    function apply() {
      const list = window.CATALOG.filter(p => {
        if (state.brand !== "الكل" && p.brandAr !== state.brand) return false;
        if (state.movements.size) {
          const m = (p.movement.includes("أوتوماتيك") || p.movement.includes("سبرينج")) ? "أوتوماتيك" : p.movement.includes("يدوي") ? "يدوي" : "كوارتز";
          if (!state.movements.has(m)) return false;
        }
        if (state.maxPrice && p.price > state.maxPrice) return false;
        if (state.sizes.size) {
          const s = p.size <= 36 ? "حتى 36 مم" : p.size <= 40 ? "37 – 40 مم" : "أكبر من 40 مم";
          if (!state.sizes.has(s)) return false;
        }
        return true;
      });
      window.renderCards(".coll-grid", list);
      const cnt = document.querySelector(".coll-count");
      if (cnt) cnt.textContent = list.length + " ساعة";
    }

    document.querySelectorAll(".chip").forEach(ch => {
      ch.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("on"));
        ch.classList.add("on");
        state.brand = ch.dataset.brand;
        apply();
      });
    });
    document.querySelectorAll('[data-filter="movement"]').forEach(cb => {
      cb.addEventListener("change", () => { cb.checked ? state.movements.add(cb.value) : state.movements.delete(cb.value); apply(); });
    });
    document.querySelectorAll('[data-filter="size"]').forEach(cb => {
      cb.addEventListener("change", () => { cb.checked ? state.sizes.add(cb.value) : state.sizes.delete(cb.value); apply(); });
    });
    document.querySelectorAll('[data-filter="price"]').forEach(cb => {
      cb.addEventListener("change", () => { state.maxPrice = cb.checked ? parseInt(cb.value, 10) : null;
        document.querySelectorAll('[data-filter="price"]').forEach(o => { if (o !== cb) o.checked = false; });
        apply(); });
    });
    apply();
  });

  /* ---------- product page ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const holder = document.querySelector("[data-product-page]");
    if (!holder) return;
    const id = new URLSearchParams(location.search).get("watch") || "omega-seamaster";
    const p = window.CATALOG.find(x => x.id === id) || window.CATALOG[0];
    document.title = `${p.brandAr} ${p.model} — كرونوس`;
    holder.querySelector("[data-p-brand]").textContent = p.brandAr + " — " + p.brand;
    holder.querySelector("[data-p-model]").textContent = p.model;
    holder.querySelector("[data-p-ref]").textContent = "رقم المرجع: " + p.ref;
    holder.querySelector("[data-p-price]").innerHTML = window.fmt(p.price) + (p.old ? ` <s>${window.fmt(p.old)}</s>` : "");
    holder.querySelector("[data-p-cond]").textContent = p.cond + " · سنة الصنع " + p.year;
    const spec = holder.querySelector(".spec");
    const rows = [["الحركة", p.movement], ["مقاس العلبة", p.size + " مم"], ["المادة", p.strapType === "bracelet" ? "ستانلس ستيل" : "علبة ستيل وحزام جلد"], ["الزجاج", "ياقوتي مضاد للخدش"], ["مقاومة الماء", p.size >= 42 ? "300 متر" : "100 متر"], ["سنة الصنع", p.year], ["الحالة", p.cond]];
    spec.innerHTML = rows.map(r => `<div><span>${r[0]}</span><span>${r[1]}</span></div>`).join("");
    if (p.story) holder.querySelector("[data-p-story]").textContent = p.story;
    else holder.querySelector("[data-p-story]").textContent = "قطعة مختارة بعناية من مجموعتنا، مفحوصة بالكامل ومرفقة بأوراقها.";
    if (p.reserved) {
      const b = holder.querySelector(".add-cart");
      b.textContent = "محجوزة حاليًا"; b.disabled = true; b.style.opacity = ".55";
    }
    const strapAttrs = p.strapType === "leather"
      ? `data-strap="${p.strap || "#3A2C20"}" data-strap2="${p.strap2 || "#2A2017"}" data-straptype="leather"` : `data-straptype="bracelet"`;
    const caseAttrs = p.case ? `data-case="${p.case}" data-case2="${p.case2}"` : "";
    holder.querySelectorAll("[data-p-photo]").forEach((el, i) => {
      el.setAttribute("data-watch", "");
      el.setAttribute("data-dial", p.dial); el.setAttribute("data-dialedge", p.dialEdge);
      if (p.num) el.setAttribute("data-num", p.num);
      if (p.sec) el.setAttribute("data-sec", p.sec);
      strapAttrs.split(" ").filter(Boolean).forEach(a => { const [k, v] = a.split("="); el.setAttribute(k, v.replace(/"/g, "")); });
      caseAttrs.split(" ").filter(Boolean).forEach(a => { const [k, v] = a.split("="); el.setAttribute(k, v.replace(/"/g, "")); });
      el.setAttribute("data-brand", p.brand);
      el.setAttribute("data-sub", i === 0 ? p.movement : "");
    });
    window.paintWatches(holder);
    const add = holder.querySelector(".add-cart");
    add && add.addEventListener("click", () => {
      window.addToCart();
      add.textContent = "أُضيفت إلى السلة ✓";
      setTimeout(() => { if (!p.reserved) add.textContent = "أضف إلى السلة"; }, 1600);
    });
  });

  /* ---------- forms (demo) ---------- */
  document.addEventListener("submit", e => {
    const f = e.target;
    if (f.matches(".appt-form")) {
      e.preventDefault();
      f.querySelector(".form-msg").textContent = "تم استلام طلب الحجز. هنتواصل معاك على واتساب لتأكيد المعاد.";
      f.reset();
    }
    if (f.matches(".login-form-el")) {
      e.preventDefault();
      const box = f.closest(".login-box");
      box.querySelector(".form-msg").textContent = "أهلًا بيك في كرونوس. (نسخة أولى — تسجيل الدخول تجريبي)";
    }
  });
})();
