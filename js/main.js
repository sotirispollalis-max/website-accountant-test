(function () {
  "use strict";
  var S = window.SITE || {};
  var I = window.AAI18N || { t: function (k) { return k; }, lang: "el", onChange: function () {} };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Στοιχεία επιχείρησης από config.js ---------- */
  function applySite() {
    var en = I.lang === "en";
    $$("[data-site]").forEach(function (el) {
      var k = el.getAttribute("data-site");
      var v = en && S[k + "En"] != null ? S[k + "En"] : S[k];
      if (v == null) return;
      el.textContent = v;
      el.classList.toggle("is-ph", /^\[/.test(v));
      var h = el.getAttribute("data-href");
      if (h === "tel") { if (S.phoneHref) el.href = "tel:" + S.phoneHref; else el.removeAttribute("href"); }
      if (h === "mailto") { if (S.emailHref) el.href = "mailto:" + S.emailHref; else el.removeAttribute("href"); }
    });
  }
  applySite();
  I.onChange(applySite);

  var wa = /^\d{8,15}$/.test(S.whatsapp || "");
  $$("[data-site-wa]").forEach(function (a) { if (wa) { a.href = "https://wa.me/" + S.whatsapp; a.hidden = false; } });
  var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Header & μενού κινητού ---------- */
  var header = $(".site-header"), burger = $(".burger"), nav = $("#menu");
  var bar = $(".progress span"), topBtn = $("#to-top");
  var lastY = window.scrollY, lockHide = 0;
  document.addEventListener("click", function (e) { if (e.target.closest('a[href^="#"]')) lockHide = Date.now() + 1100; });
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 24 || header.hasAttribute("data-solid"));
    /* το header κρύβεται προς τα κάτω, επανεμφανίζεται προς τα πάνω */
    if (!reduce && !header.hasAttribute("data-solid") && !document.body.classList.contains("menu-open")) {
      if (y < 320 || Date.now() < lockHide) header.classList.remove("hide");
      else if (y > lastY + 6) header.classList.add("hide");
      else if (y < lastY - 6) header.classList.remove("hide");
    }
    lastY = y;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty("--p", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    if (topBtn) { var show = window.scrollY > 900; topBtn.hidden = false; topBtn.classList.toggle("show", show); topBtn.tabIndex = show ? 0 : -1; }
  }
  if (topBtn) topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  /* Όλοι οι χειριστές scroll τρέχουν το πολύ μία φορά ανά καρέ (rAF) — αποφεύγει το κόμπιασμα */
  function onScrollRaf(fn) {
    var t = false;
    return function () { if (t) return; t = true; requestAnimationFrame(function () { t = false; fn(); }); };
  }
  onScroll(); window.addEventListener("scroll", onScrollRaf(onScroll), { passive: true });

  function menuLabel() { burger.setAttribute("aria-label", I.t(nav.classList.contains("open") ? "menu.close" : "menu.open")); }
  function setMenu(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    menuLabel();
  }
  if (burger && nav) {
    burger.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); burger.focus(); } });
    window.matchMedia("(min-width: 981px)").addEventListener("change", function () { setMenu(false); });
    I.onChange(menuLabel);
  }

  /* ---------- Ενεργός σύνδεσμος κατά το scroll ---------- */
  var links = $$("[data-spy]");
  if (links.length) {
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute("data-spy")); });
    var spy = function () {
      var y = window.scrollY + header.offsetHeight + 140, cur = 0;
      targets.forEach(function (t, i) { if (t && (i === 0 ? 0 : t.getBoundingClientRect().top + window.scrollY) <= y) cur = i; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = links.length - 1;
      links.forEach(function (a, i) {
        a.classList.toggle("active", i === cur);
        if (i === cur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    };
    spy(); window.addEventListener("scroll", onScrollRaf(spy), { passive: true });
  }

  /* ---------- Ήπιο parallax στο hero ---------- */
  /* ---------- Scroll engine: hero fade/parallax + data-parallax στοιχεία ---------- */
  var heroBg = $(".hero-bg"), heroEl = $(".hero"), pEls = $$("[data-parallax]");
  if (!reduce && (heroBg || pEls.length)) {
    var ticking = false;
    var frame = function () {
      var y = window.scrollY, vh = window.innerHeight;
      if (heroBg && y < vh * 1.3) {
        heroBg.style.setProperty("--py", (y * 0.18).toFixed(1) + "px");
        heroEl.style.setProperty("--hp", Math.min(1, y / (heroEl.offsetHeight * 0.65)).toFixed(3));
      }
      pEls.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var off = (r.top + r.height / 2 - vh / 2) * -parseFloat(el.getAttribute("data-parallax"));
        off = Math.max(-36, Math.min(36, off)); /* ποτέ δεν ξεφεύγει από την ενότητά του */
        el.style.setProperty("--ty", off.toFixed(1) + "px");
      });
      ticking = false;
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
    window.addEventListener("resize", frame);
    frame();
  }

  /* ---------- Πλευρική πλοήγηση με τελείες ---------- */
  var secs = ["about", "services", "match", "business", "why", "process", "reviews", "articles", "faq", "contact"]
    .map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if (secs.length && $("#top")) {
    var dots = document.createElement("nav"); dots.className = "dots";
    var dl = secs.map(function (sec) {
      var a = document.createElement("a"); a.href = "#" + sec.id;
      var sp = document.createElement("span"); a.appendChild(sp); dots.appendChild(a); return a;
    });
    document.body.appendChild(dots);
    var labelDots = function () {
      dots.setAttribute("aria-label", I.lang === "en" ? "Page sections" : "Ενότητες σελίδας");
      secs.forEach(function (sec, i) { var e = $(".eyebrow", sec); dl[i].firstChild.textContent = e ? e.textContent.trim() : sec.id; dl[i].setAttribute("aria-label", dl[i].firstChild.textContent); });
    };
    labelDots(); I.onChange(labelDots);
    var dotSpy = function () {
      var mid = window.innerHeight * 0.45, cur = -1;
      secs.forEach(function (sec, i) { var r = sec.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) cur = i; });
      dl.forEach(function (a, i) { a.classList.toggle("on", i === cur); });
      dots.style.visibility = cur < 0 ? "hidden" : "visible";
      var dark = cur >= 0 && /business|reviews/.test(secs[cur].id);
      dots.classList.toggle("on-dark", dark);
    };
    dotSpy(); window.addEventListener("scroll", onScrollRaf(dotSpy), { passive: true }); window.addEventListener("resize", dotSpy);
  }

  /* ---------- Reveal on scroll ---------- */
  var rv = $$(".reveal");
  $$(".services, .why, .steps, .articles, .audience").forEach(function (g) {
    $$(".reveal", g).forEach(function (el, i) { el.style.setProperty("--d", (i % 3) * 0.09 + "s"); });
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- «Φόρτωση» ενότητας: γραμμή προόδου + εικόνες που ξεθολώνουν ---------- */
  var reduceM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceM && "IntersectionObserver" in window) {
    var bars = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var b = e.target.querySelector(".sec-bar");
        if (b) b.classList.add("run");
        bars.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -18% 0px", threshold: 0.02 });
    $$("main > section:not(.hero)").forEach(function (sec) {
      var b = document.createElement("span"); b.className = "sec-bar"; b.setAttribute("aria-hidden", "true");
      sec.insertBefore(b, sec.firstChild); bars.observe(sec);
    });
    $$("main section:not(.hero) img").forEach(function (im) {
      if (im.complete && im.naturalWidth) return;
      im.classList.add("lz");
      var ok = function () { im.classList.add("ok"); };
      im.addEventListener("load", ok); im.addEventListener("error", ok);
    });
  }

  /* ---------- Προεπιλογή θέματος από κουμπιά (Μάθετε περισσότερα / Κλείστε ραντεβού) ---------- */
  var form = $("#contact-form"), subject = $("#f-subject");
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-subject]");
    if (a && subject) { subject.value = a.getAttribute("data-subject"); subject.dispatchEvent(new Event("change")); }
  });

  /* ---------- Χάρτης (φορτώνει μόνο με συγκατάθεση) ---------- */
  var mapBtn = $("#map-load");
  if (mapBtn) mapBtn.addEventListener("click", function () {
    var box = $("#map"), f = document.createElement("iframe");
    f.src = "https://www.google.com/maps?q=" + encodeURIComponent(S.mapQuery || "Athens, Greece") + "&output=embed";
    f.title = I.lang === "en" ? "Office location on Google Maps" : "Τοποθεσία γραφείου στο Google Maps";
    f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade";
    box.innerHTML = ""; box.appendChild(f);
  });

  /* ---------- Spotlight στις κάρτες υπηρεσιών ---------- */
  $$(".service").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ---------- Επιλογέας προφίλ ---------- */
  var mTabs = $$("[data-profile]"), mPanel = $(".match-panel");
  function setProfile(p, anim) {
    mTabs.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-profile") === p)); });
    var txt = $("#match-text"); txt.setAttribute("data-i18n", "match." + p + ".d"); txt.textContent = I.t("match." + p + ".d");
    $$("#match-chips li").forEach(function (li) { li.hidden = (" " + li.getAttribute("data-p") + " ").indexOf(" " + p + " ") < 0; });
    mPanel.setAttribute("data-p", p);
    if (anim && !reduce) { mPanel.classList.remove("swap"); void mPanel.offsetWidth; mPanel.classList.add("swap"); }
  }
  if (mTabs.length) {
    mTabs.forEach(function (b) { b.addEventListener("click", function () { setProfile(b.getAttribute("data-profile"), true); }); });
    setProfile("ind", false);
    I.onChange(function () { setProfile(mPanel.getAttribute("data-p") || "ind", false); });
  }

  /* ---------- Αξιολογήσεις πελατών (μόνο πραγματικά δεδομένα από config.js) ---------- */
  var track = $("#rev-track");
  var STAR = '<svg aria-hidden="true"><use href="#i-star"/></svg>';
  function starsHtml(n) { var h = ""; for (var i = 1; i <= 5; i++) h += STAR.replace("<svg ", i <= n ? "<svg " : '<svg class="off" '); return h; }
  var revs = (S.reviews || []).filter(function (r) { return r && r.rating >= 1 && r.rating <= 5 && r.text; });
  var prev = $("#rev-prev"), next = $("#rev-next");
  function updateArrows() {
    if (!track) return;
    prev.disabled = track.scrollLeft < 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  }
  function renderReviews() {
    if (!track || !revs.length) return;
    var en = I.lang === "en";
    track.innerHTML = "";
    revs.forEach(function (r) {
      var li = document.createElement("li"); li.className = "review";
      var st = document.createElement("span"); st.className = "stars"; st.setAttribute("role", "img"); st.setAttribute("aria-label", r.rating + "/5"); st.innerHTML = starsHtml(Math.round(r.rating));
      var p = document.createElement("p"); p.className = "rev-text"; p.textContent = "“" + (en && r.textEn ? r.textEn : r.text) + "”";
      var by = document.createElement("p"); by.className = "rev-by"; by.textContent = r.name || "";
      if (r.date) { var sm = document.createElement("small"); sm.textContent = r.date; by.appendChild(sm); }
      li.appendChild(st); li.appendChild(p); li.appendChild(by); track.appendChild(li);
    });
    var avg = revs.reduce(function (a, r) { return a + r.rating; }, 0) / revs.length;
    $("#rev-summary").hidden = false;
    $("#rev-score").textContent = avg.toFixed(1);
    $("#rev-avg-stars").innerHTML = starsHtml(Math.round(avg));
    $("#rev-count").textContent = revs.length === 1 ? I.t("rev.count1") : I.t("rev.countN").replace("{n}", revs.length);
    var note = $("#rev-note"); note.setAttribute("data-i18n", "rev.noteLive"); note.textContent = I.t("rev.noteLive");
    updateArrows();
  }
  if (track) {
    var step = function () { var c = track.firstElementChild; return c ? c.getBoundingClientRect().width + 24 : track.clientWidth; };
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" }); });
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    renderReviews(); updateArrows();
    I.onChange(renderReviews);
  }

  /* ---------- Φόρμα αξιολόγησης ---------- */
  var rform = $("#rate-form");
  if (rform) {
    var rstatus = $("#rate-status"), hint = $("#rate-hint"), rTouched = 0;
    rform.addEventListener("focusin", function () { if (!rTouched) rTouched = Date.now(); });
    var rating = function () { var c = $("input[name=rating]:checked", rform); return c ? +c.value : 0; };
    var showHint = function () { var v = rating(); hint.textContent = v ? I.t("rate.h" + v) : ""; };
    $$("input[name=rating]", rform).forEach(function (r) { r.addEventListener("change", function () { $("#e-rating").textContent = ""; showHint(); }); });
    I.onChange(function () { showHint(); rstatus.innerHTML = ""; $("#e-rating").textContent = ""; $("#e-rconsent").textContent = ""; });
    var rsay = function (key, cls) {
      rstatus.className = "form-status " + (cls || ""); rstatus.innerHTML = "";
      if (!key) return; var p = document.createElement("p"); p.textContent = I.t(key); rstatus.appendChild(p);
    };
    rform.addEventListener("submit", function (e) {
      e.preventDefault();
      var okR = rating() > 0, okC = rform.rconsent.checked;
      $("#e-rating").textContent = okR ? "" : I.t("js.err.rating");
      $("#e-rconsent").textContent = okC ? "" : I.t("js.err.rconsent");
      if (!okR || !okC) { (okR ? rform.rconsent : $("input[name=rating]", rform)).focus(); return; }
      if (rform.website.value) return;
      if (rTouched && Date.now() - rTouched < 2000) { rTouched = Date.now() - 1200; rsay("js.slow", ""); return; }
      var data = { type: "review", rating: rating(), name: rform.rname.value.trim(), text: rform.rtext.value.trim(), language: I.lang };
      var btn = $("button[type=submit]", rform);
      if (S.formEndpoint) {
        btn.disabled = true; rsay("js.sending", "");
        fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); rform.reset(); hint.textContent = ""; rTouched = 0; rsay("js.rsent", "ok"); })
          .catch(function () { rsay("js.fail", "err"); })
          .then(function () { btn.disabled = false; });
      } else { rsay("js.demo", ""); } // δεν προσποιούμαστε ότι στάλθηκε
    });
  }

  /* ---------- Φόρμα επικοινωνίας ---------- */
  if (!form) return;
  var status = $("#form-status");
  var fields = $$("input[name],select,textarea", form).filter(function (e) { return e.name !== "website"; });
  var touched = 0; // χρονική στιγμή πρώτης αλληλεπίδρασης (spam: υπερβολικά γρήγορη υποβολή)
  form.addEventListener("focusin", function () { if (!touched) touched = Date.now(); });

  function check(el) {
    var n = el.name, v = (el.type === "checkbox" ? el.checked : el.value.trim()), ok = true;
    if (n === "name") ok = v.length >= 3;
    else if (n === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    else if (n === "phone") ok = v === "" || (/^[+\d\s().-]{7,20}$/.test(v) && v.replace(/\D/g, "").length >= 10);
    else if (n === "subject") ok = v !== "";
    else if (n === "message") ok = v.length >= 10;
    else if (n === "consent") ok = v === true;
    else return true;
    var f = el.closest(".field"), err = $("#e-" + n);
    f.classList.toggle("invalid", !ok);
    f.classList.toggle("valid", ok && v !== "" && v !== false);
    el.setAttribute("aria-invalid", String(!ok));
    if (err) { err.textContent = ok ? "" : I.t("js.err." + n); el.setAttribute("aria-describedby", "e-" + n); }
    return ok;
  }
  fields.forEach(function (el) {
    el.addEventListener("blur", function () { if (el.value || el.type === "checkbox") check(el); });
    el.addEventListener("input", function () { if (el.closest(".field").classList.contains("invalid")) check(el); });
    el.addEventListener("change", function () { check(el); });
  });
  I.onChange(function () { fields.forEach(function (el) { if (el.closest(".field").classList.contains("invalid")) check(el); }); status.innerHTML = ""; });

  function say(key, cls) {
    status.className = "form-status " + (cls || "");
    status.innerHTML = "";
    if (!key) return;
    var p = document.createElement("p"); p.textContent = I.t(key); status.appendChild(p);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = fields.filter(function (el) { return !check(el); });
    if (bad.length) { bad[0].focus(); say("js.fix", "err"); return; }
    if (form.website.value) return;                                   // honeypot: bots συμπληρώνουν το κρυφό πεδίο
    if (touched && Date.now() - touched < 2500) { touched = Date.now() - 1500; say("js.slow", ""); return; } // υπερβολικά γρήγορη υποβολή

    var data = { name: form.name.value.trim(), email: form.email.value.trim(), phone: form.phone.value.trim(), subject: form.subject.value, message: form.message.value.trim(), language: I.lang };
    var btn = $("button[type=submit]", form);
    var reset = function () { form.reset(); fields.forEach(function (f) { f.removeAttribute("aria-invalid"); f.closest(".field").classList.remove("valid", "invalid"); }); touched = 0; };

    if (S.formEndpoint) {
      btn.disabled = true; say("js.sending", "");
      fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); reset(); say("js.sent", "ok"); })
        .catch(function () { say("js.fail", "err"); })
        .then(function () { btn.disabled = false; });
    } else if (S.emailHref) {
      var label = subject.options[subject.selectedIndex].textContent.trim();
      var body = data.name + "\n" + data.email + "\n" + (data.phone || "-") + "\n\n" + data.message;
      window.location.href = "mailto:" + S.emailHref + "?subject=" + encodeURIComponent(label + " — " + data.name) + "&body=" + encodeURIComponent(body);
      say("js.mailto", "ok");
    } else {
      say("js.demo", ""); // ΔΕΝ προσποιούμαστε ότι στάλθηκε μήνυμα
    }
  });
})();
