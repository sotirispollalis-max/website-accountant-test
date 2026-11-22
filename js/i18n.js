/* ==========================================================
   Διπλή γλώσσα GR / EN.
   - Τα ελληνικά κείμενα ζουν στο HTML (καλύτερο SEO, λειτουργούν και χωρίς JS)
     και αποθηκεύονται αυτόματα ως "original" κατά την πρώτη εναλλαγή.
   - Τα αγγλικά είναι χειρόγραφα (όχι αυτόματη μετάφραση) και βρίσκονται παρακάτω.
   Χρήση στο HTML:
     data-i18n="key"                 → textContent
     data-i18n-html="key"            → innerHTML (για <em>, <a> κ.λπ.)
     data-i18n-attr="attr:key;…"     → attributes (aria-label, alt, …)
   ========================================================== */
(function () {
  "use strict";

  var EN = {
    "meta.title": "A&A TAX EXPERTS — Accounting & Tax Advisory Firm in Athens",
    "meta.desc": "Comprehensive accounting and tax services in Athens for individuals, freelancers and businesses. Consistency, transparency and personal care.",
    "skip": "Skip to content",
    "logo.label": "A&A TAX EXPERTS — Home",
    "nav.label": "Main navigation",
    "nav.home": "Home",
    "nav.office": "The Firm",
    "nav.services": "Services",
    "nav.business": "For Businesses",
    "nav.articles": "Articles",
    "nav.contact": "Contact",
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "cta.book": "Book an Appointment",
    "cta.contact": "Contact Us",

    "hero.eyebrow": "Accounting & Tax Advisory · Athens",
    "hero.h1a": "Your financial journey.",
    "hero.h1b": "Our <em>expertise.</em>",
    "hero.lede": "At A&A TAX EXPERTS we provide comprehensive accounting and tax services for individuals, freelancers and businesses — with consistency, transparency and personal care.",
    "hero.principles": "Core principles",
    "hero.p1": "Consistency",
    "hero.p2": "Transparency",
    "hero.p3": "Personal care",
    "hero.scroll": "Discover more",

    "about.eyebrow": "The Firm",
    "about.h2": "More than accounting support.",
    "about.p1": "Sound financial management is the foundation of every successful professional and personal journey.",
    "about.p2": "At A&A TAX EXPERTS we approach every engagement with consistency, responsibility and personal care, offering solutions tailored to the real needs of each client.",
    "about.k1": "Consistency",
    "about.k2": "Responsibility",
    "about.k3": "Personal care",
    "about.alt": "A modern meeting room with large windows and natural light",
    "about.tag": "Athens",

    "services.eyebrow": "Services",
    "services.h2": "Comprehensive services for every financial need.",
    "more": "Learn more",
    "s1.t": "Accounting Services",
    "s1.d": "Bookkeeping, accounting records and ongoing accounting support.",
    "s2.t": "Tax Services",
    "s2.d": "Tax returns, tax obligations and support with tax compliance.",
    "s3.t": "Payroll & Employment",
    "s3.d": "Payroll administration and accounting support for employment-related matters.",
    "s4.t": "Business Support",
    "s4.d": "Accounting and administrative support for businesses of every size.",
    "s5.t": "Business Start-up & Organisation",
    "s5.d": "Support with starting your business and organising its accounting.",
    "s6.t": "Tax Advisory",
    "s6.d": "Personalised tax and financial guidance within the applicable regulations.",

    "biz.eyebrow": "For Businesses",
    "biz.h2": "Your business deserves <em>solid financial and administrative organisation.</em>",
    "biz.sub": "Professional accounting support helps organise your financial obligations and administrative processes, so you can devote your time to growing your business.",
    "biz.cta": "Talk to us",
    "biz.a1t": "Small & medium-sized businesses",
    "biz.a1d": "Organised accounting cover for your day-to-day operations.",
    "biz.a2t": "Freelancers",
    "biz.a2d": "A clear picture of your tax and social-security obligations.",
    "biz.a3t": "Self-employed professionals",
    "biz.a3d": "Support shaped around your own professional reality.",
    "biz.a4t": "Startups",
    "biz.a4d": "Guidance through the first steps and sound financial organisation from day one.",
    "biz.a5t": "Companies",
    "biz.a5d": "Consistent accounting and tax support for corporate structures.",

    "why.eyebrow": "Why A&A TAX EXPERTS",
    "why.h2": "A relationship of trust, built on everyday consistency.",
    "why.1t": "Personal Approach",
    "why.1d": "Every client has different needs. We listen first and recommend afterwards.",
    "why.2t": "Professionalism",
    "why.2d": "A consistent and responsible approach to every collaboration.",
    "why.3t": "Transparency",
    "why.3d": "Clear communication and transparent processes at every stage.",
    "why.4t": "Modern Approach",
    "why.4d": "Modern tools and well-organised accounting processes.",

    "proc.eyebrow": "Our Process",
    "proc.h2": "A collaboration with clear steps.",
    "proc.1t": "Contact",
    "proc.1d": "You get in touch and describe your needs.",
    "proc.2t": "Assessment",
    "proc.2d": "We understand your requirements and discuss the right solutions.",
    "proc.3t": "Collaboration",
    "proc.3d": "We organise your support with consistency and professionalism.",

    "art.eyebrow": "Articles",
    "art.h2": "Insight and useful information.",
    "art.sub": "Articles and updates on tax, accounting and business topics will be published here soon.",
    "art.c1": "Tax",
    "art.c2": "Business",
    "art.c3": "Payroll",
    "art.t": "[Article title]",
    "art.d": "A short summary of the article will appear here.",
    "art.soon": "Coming soon",

    "faq.eyebrow": "FAQ",
    "faq.h2": "The answers you need.",
    "faq.sub": "Can’t find what you’re looking for?",
    "faq.link": "Send us your question.",
    "faq.1q": "What accounting services do you offer?",
    "faq.1a": "We offer accounting and tax services, payroll and employment support, business support, help with starting and organising a business, and tax advisory. The exact scope of each engagement is defined in our first conversation, according to your needs.",
    "faq.2q": "Do you work with both individuals and businesses?",
    "faq.2a": "We serve both individuals and businesses. If you would like us to confirm that we can cover your particular case, get in touch and we will give you a clear answer.",
    "faq.3q": "Do you support freelancers?",
    "faq.3a": "Yes — freelancers and self-employed professionals are part of the audience we serve. You can describe your professional activity to us and we will discuss how we can support you.",
    "faq.4q": "How can I start working with you?",
    "faq.4a": "The first step is to get in touch: through the form, by phone or by email. We will listen, understand your needs and discuss the right solutions and the terms of our collaboration.",
    "faq.5q": "How can I book an appointment?",
    "faq.5a": "You can request an appointment through the contact form by selecting “Book an appointment”, or contact the office directly. We will agree together on a day and time that suits you.",

    "ct.eyebrow": "Contact",
    "ct.h2": "Let’s talk about your finances.",
    "ct.sub": "Fill in the form or contact us directly. We will reply as soon as possible.",
    "ct.addr": "Address",
    "ct.phone": "Phone",
    "ct.hours": "Opening hours",
    "ct.wa": "Message us on WhatsApp",
    "map.note": "The map is loaded from Google and may use cookies. It loads only if you choose to.",
    "map.btn": "Show map",
    "f.title": "Send us a message",
    "f.name": "Full name",
    "f.phone": "Phone",
    "f.subject": "Subject",
    "f.choose": "Select…",
    "f.o.appt": "Book an appointment",
    "f.o.other": "Other",
    "f.message": "Message",
    "f.consent": "I agree to my details being processed in order to reply to my request, in accordance with the <a class=\"text-link\" href=\"legal.html#privacy\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
    "f.send": "Send message",

    "foot.desc": "An accounting and tax advisory firm in Athens, focused on consistency, transparency and a personal relationship with every client.",
    "foot.nav": "Navigation",
    "foot.nav.label": "Page links",
    "foot.svc.label": "Services",
    "foot.rights": "All rights reserved.",
    "foot.privacy": "Privacy Policy",
    "foot.cookies": "Cookie Policy",
    "foot.gdpr": "GDPR Information",
    "wa.label": "Contact us on WhatsApp",

    "match.eyebrow": "Find your solution",
    "match.h2": "Who are you? We’ll show you where to start.",
    "match.sub": "Choose your profile to see which of our services usually apply to you.",
    "match.group": "Profile",
    "match.ind": "Individual",
    "match.free": "Freelancer",
    "match.biz": "Business",
    "match.start": "Startup",
    "match.ind.d": "Support with your tax obligations and guidance on your personal financial affairs.",
    "match.free.d": "Clear bookkeeping and a clear view of your tax obligations, shaped around your professional activity.",
    "match.biz.d": "Ongoing accounting, tax, payroll and administrative support for your business.",
    "match.start.d": "Help with starting up, organising your accounting from day one and understanding your first obligations.",
    "match.cta": "Request an appointment",

    "rev.eyebrow": "Client Reviews",
    "rev.h2": "What our clients say.",
    "rev.note": "Reviews are published only from real clients. No reviews have been added yet.",
    "rev.sample": "Client reviews will appear here once the firm has collected genuine feedback.",
    "rev.name": "[Client name]",
    "rev.prev": "Previous",
    "rev.next": "Next",
    "rev.count1": "based on 1 review",
    "rev.countN": "based on {n} reviews",
    "rev.noteLive": "Reviews are published only from real clients, with their consent.",
    "rate.title": "Rate your experience",
    "rate.lead": "Are you a client? Your opinion helps us improve. Your review is published after moderation.",
    "rate.label": "Rating",
    "rate.stars": "stars",
    "rate.name": "Name (optional)",
    "rate.text": "Comment (optional)",
    "rate.consent": "I agree to my review being published and my details being processed by the firm, in accordance with the <a class=\"text-link\" href=\"legal.html#privacy\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.",
    "rate.send": "Submit review",
    "rate.h1": "Poor", "rate.h2": "Fair", "rate.h3": "Good", "rate.h4": "Very good", "rate.h5": "Excellent",
    "totop": "Back to top",

    /* ---- legal.html ---- */
    "legal.meta.title": "Privacy, Cookies & GDPR — A&A TAX EXPERTS",
    "legal.meta.desc": "Privacy policy, cookie policy and personal data protection (GDPR) information.",
    "legal.back": "← Back to home",
    "legal.eyebrow": "Legal information",
    "legal.h1": "Privacy, Cookies & GDPR",
    "legal.notice": "<strong>Template text.</strong> The content of this page is indicative. It must be completed with the firm’s actual details and reviewed by a legal adviser before publication.",
    "legal.priv.h": "Privacy Policy",
    "legal.priv.p1": "<strong>[Firm name]</strong> (VAT no.: [VAT no.], Tax office: [Tax office], Address: [Address]) is the controller of the personal data collected through this website.",
    "legal.priv.h3a": "What data we collect",
    "legal.priv.p2": "Through the contact form: full name, email, phone number (optional) and the content of your message.",
    "legal.priv.h3b": "Purpose and legal basis",
    "legal.priv.p3": "We use this data solely to reply to your request or to prepare a possible collaboration (Article 6(1)(a) and (b) GDPR).",
    "legal.priv.h3c": "Retention",
    "legal.priv.p4": "Data is kept for as long as needed to handle your request and, if a collaboration follows, for the period required by tax and accounting legislation.",
    "legal.priv.h3d": "Form submission",
    "legal.priv.p5": "[To be completed: the service or backend that receives the form submissions, and where the data is stored.]",
    "legal.cook.h": "Cookie Policy",
    "legal.cook.p1": "This website <strong>does not use tracking, advertising or analytics cookies</strong>. Fonts and images are hosted on the same server, with no requests to third parties.",
    "legal.cook.p2": "The only third-party content is the Google map in the contact section. It is <strong>not loaded</strong> until you click “Show map”; once loaded, Google may set cookies in accordance with its own policy.",
    "legal.cook.p3": "Your language choice is remembered in your browser’s local storage (not a cookie) and is never sent to a server.",
    "legal.cook.p4": "If tools such as Google Analytics are added in future, a consent mechanism must be added and this text updated.",
    "legal.gdpr.h": "GDPR Information — Your rights",
    "legal.gdpr.p1": "Under the General Data Protection Regulation (EU 2016/679) you have the right to:",
    "legal.gdpr.l1": "access your data and obtain a copy;",
    "legal.gdpr.l2": "rectify inaccurate data;",
    "legal.gdpr.l3": "erasure (“right to be forgotten”), where applicable;",
    "legal.gdpr.l4": "restrict or object to processing;",
    "legal.gdpr.l5": "data portability;",
    "legal.gdpr.l6": "withdraw your consent at any time.",
    "legal.gdpr.p2": "To exercise your rights please contact <strong>[firm email]</strong>. You also have the right to lodge a complaint with the <strong>Hellenic Data Protection Authority</strong> (<a class=\"text-link\" href=\"https://www.dpa.gr\" rel=\"noopener\">www.dpa.gr</a>).",

    /* ---- μηνύματα JS ---- */
    "js.err.name": "Please enter your full name.",
    "js.err.email": "Please enter a valid email address.",
    "js.err.phone": "Please enter a valid phone number (e.g. 210 000 0000 or +30 690 000 0000).",
    "js.err.subject": "Please choose a subject.",
    "js.err.message": "Please write your message (at least 10 characters).",
    "js.err.consent": "We need your consent in order to reply.",
    "js.fix": "Please correct the highlighted fields.",
    "js.sending": "Sending…",
    "js.sent": "Thank you! Your message has been sent and we will get back to you shortly.",
    "js.fail": "We couldn’t send your message. Please try again or contact us directly.",
    "js.mailto": "We are opening your email app with your message ready to send. If nothing opened, please write to us directly.",
    "js.demo": "Demo mode: your details were validated, but nothing was sent — the form is not yet connected to a sending service.",
    "js.slow": "Please take a moment to review your message and submit again.",
    "js.err.rating": "Please choose a star rating.",
    "js.err.rconsent": "We need your consent to publish your review.",
    "js.rsent": "Thank you for your review! It will be published after moderation."
  };

  var EL_JS = {
    "js.err.name": "Παρακαλούμε εισάγετε το ονοματεπώνυμό σας.",
    "js.err.email": "Παρακαλούμε εισάγετε μια έγκυρη διεύθυνση email.",
    "js.err.phone": "Εισάγετε έγκυρο τηλέφωνο (π.χ. 210 000 0000 ή +30 690 000 0000).",
    "js.err.subject": "Παρακαλούμε επιλέξτε θέμα.",
    "js.err.message": "Παρακαλούμε γράψτε το μήνυμά σας (τουλάχιστον 10 χαρακτήρες).",
    "js.err.consent": "Χρειαζόμαστε τη συγκατάθεσή σας για να απαντήσουμε.",
    "js.fix": "Παρακαλούμε διορθώστε τα πεδία που επισημαίνονται.",
    "js.sending": "Αποστολή…",
    "js.sent": "Ευχαριστούμε! Το μήνυμά σας εστάλη και θα επικοινωνήσουμε σύντομα μαζί σας.",
    "js.fail": "Δεν ήταν δυνατή η αποστολή. Δοκιμάστε ξανά ή επικοινωνήστε απευθείας μαζί μας.",
    "js.mailto": "Ανοίγουμε το email σας με το μήνυμα έτοιμο προς αποστολή. Αν δεν άνοιξε, γράψτε μας απευθείας.",
    "js.demo": "Λειτουργία επίδειξης: τα στοιχεία σας επικυρώθηκαν, αλλά δεν στάλθηκε τίποτα — η φόρμα δεν είναι ακόμη συνδεδεμένη με υπηρεσία αποστολής.",
    "js.slow": "Παρακαλούμε ελέγξτε το μήνυμά σας και πατήστε ξανά αποστολή.",
    "js.err.rating": "Παρακαλούμε επιλέξτε βαθμολογία.",
    "js.err.rconsent": "Χρειαζόμαστε τη συγκατάθεσή σας για τη δημοσίευση της αξιολόγησης.",
    "js.rsent": "Ευχαριστούμε για την αξιολόγησή σας! Θα δημοσιευτεί μετά από έλεγχο.",
    "match.ind.d": "Υποστήριξη στις φορολογικές σας υποχρεώσεις και καθοδήγηση για τις προσωπικές σας οικονομικές υποθέσεις.",
    "match.free.d": "Σαφής τήρηση βιβλίων και καθαρή εικόνα των φορολογικών σας υποχρεώσεων, προσαρμοσμένη στην επαγγελματική σας δραστηριότητα.",
    "match.biz.d": "Διαρκής λογιστική, φορολογική, μισθοδοτική και διοικητική υποστήριξη για την επιχείρησή σας.",
    "match.start.d": "Βοήθεια στην έναρξη, οργάνωση της λογιστικής σας από την πρώτη ημέρα και κατανόηση των πρώτων υποχρεώσεων.",
    "rev.count1": "βάσει 1 αξιολόγησης",
    "rev.countN": "βάσει {n} αξιολογήσεων",
    "rev.noteLive": "Οι αξιολογήσεις δημοσιεύονται μόνο από πραγματικούς πελάτες, με τη συναίνεσή τους.",
    "rate.h1": "Κακή", "rate.h2": "Μέτρια", "rate.h3": "Καλή", "rate.h4": "Πολύ καλή", "rate.h5": "Εξαιρετική",
    "menu.open": "Άνοιγμα μενού",
    "menu.close": "Κλείσιμο μενού"
  };

  var LS = "aa-lang", orig = null, lang = "el", listeners = [];
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  function store(get) { try { return get(); } catch (e) { return null; } }

  function capture() {
    if (orig) return;
    orig = { text: [], html: [], attr: [], title: document.title, desc: "" };
    var m = document.querySelector('meta[name="description"]');
    orig.desc = m ? m.getAttribute("content") : "";
    $$("[data-i18n]").forEach(function (el) { orig.text.push([el, el.textContent]); });
    $$("[data-i18n-html]").forEach(function (el) { orig.html.push([el, el.innerHTML]); });
    $$("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"); if (p.length < 2) return;
        orig.attr.push([el, p[0].trim(), p[1].trim(), el.getAttribute(p[0].trim())]);
      });
    });
  }

  function t(key) {
    if (lang === "en") return EN[key] != null ? EN[key] : (EL_JS[key] || key);
    return EL_JS[key] != null ? EL_JS[key] : key;
  }

  function set(next) {
    capture();
    lang = next === "en" ? "en" : "el";
    var en = lang === "en";
    document.documentElement.lang = lang;

    orig.text.forEach(function (r) {
      var k = r[0].getAttribute("data-i18n");
      r[0].textContent = en && EN[k] != null ? EN[k] : (EL_JS[k] != null ? EL_JS[k] : r[1]);
    });
    orig.html.forEach(function (r) {
      var k = r[0].getAttribute("data-i18n-html");
      r[0].innerHTML = en && EN[k] != null ? EN[k] : (EL_JS[k] != null ? EL_JS[k] : r[1]);
    });
    orig.attr.forEach(function (r) {
      r[0].setAttribute(r[1], en && EN[r[2]] != null ? EN[r[2]] : r[3]);
    });

    var legal = !!document.querySelector("[data-legal]");
    document.title = en ? EN[legal ? "legal.meta.title" : "meta.title"] : orig.title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", en ? EN[legal ? "legal.meta.desc" : "meta.desc"] : orig.desc);

    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    store(function () { localStorage.setItem(LS, lang); });
    listeners.forEach(function (fn) { fn(lang); });
  }

  function init() {
    $$("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { set(b.getAttribute("data-lang")); });
    });
    var q = /[?&]lang=(en|el)/.exec(location.search);
    var saved = q ? q[1] : store(function () { return localStorage.getItem(LS); });
    if (saved === "en") set("en");
  }

  window.AAI18N = {
    t: t,
    get lang() { return lang; },
    onChange: function (fn) { listeners.push(fn); },
    init: init
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
