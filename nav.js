/* =================================================================
   VK&S nav.js — injects topbar, navbar, mobile drawer, footer,
   floating WA+ScrollTop, cookie bar, page loader, progress bar,
   page transition. All contact details pulled from window.VKS.
   One selector system: [data-vks="..."] on all elements.
   ================================================================= */
(function () {

  var P = {
    home: 'index.html', about: 'about.html', services: 'services.html',
    audit: 'audit.html', direct: 'direct-tax.html', indirect: 'indirect-tax.html',
    legal: 'legal.html', debt: 'debt.html', insolvency: 'insolvency.html',
    psi: 'psi-maharashtra.html', telangana: 'telangana.html', setup: 'setup.html',
    team: 'team.html', careers: 'careers.html', contact: 'contact.html',
    publications: 'publications.html'
  };

  /* ── HTML STRINGS ─────────────────────────────────────────── */

  var LOADER = '<div id="vksLoader" style="position:fixed;inset:0;z-index:9999;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;transition:opacity .5s ease">'
    + '<img src="ca-logo.jpg" alt="VK&S" style="width:76px;height:auto;animation:lp .8s ease-in-out infinite alternate">'
    + '<div style="width:150px;height:2px;background:#e2e8f0;border-radius:1px;overflow:hidden"><div style="height:100%;background:linear-gradient(90deg,#c0392b,#1a3a5c);animation:lb .9s ease forwards"></div></div>'
    + '<style>@keyframes lp{0%{opacity:.5;transform:scale(.95)}100%{opacity:1;transform:scale(1)}}'
    + '@keyframes lb{0%{width:0}100%{width:100%}}</style></div>';

  var PROGRESS = '<div id="vksProgress" style="position:fixed;top:0;left:0;width:0;height:3px;background:linear-gradient(90deg,#c0392b,#1a3a5c);z-index:1001;transition:width .1s linear;border-radius:0 2px 2px 0"></div>';

  var TRANSITION = '<div id="vksTrans" style="position:fixed;inset:0;z-index:9998;background:#fff;pointer-events:none;opacity:0;transition:opacity .3s ease"></div>';

  var TOPBAR = '<div class="topbar"><div class="wrap topbar-in">'
    + '<div class="tb-g">'
    + '<div class="tb-i"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:11px;height:11px;opacity:.55"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 7 7l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z"/></svg>'
    + '<a href="tel:07122522020" data-vks="phone">0712-2522020</a></div>'
    + '<div class="tb-i"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:11px;height:11px;opacity:.55"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
    + '<a href="mailto:info@cavks.in" data-vks="email">info@cavks.in</a></div>'
    + '<div class="tb-i"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:11px;height:11px;opacity:.55"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Mon\u2013Sat&nbsp;09:00am \u2013 6:00pm</div>'
    + '</div>'
    + '<div class="tb-g"><div class="tb-i"><a href="tel:+910000000000" data-vks="mobile">+91 0000000000</a></div></div>'
    + '</div></div>';

  var NAVBAR = '<nav class="navbar" id="navbar"><div class="wrap"><div class="nav-in">'
    + '<a href="' + P.home + '" class="logo"><img src="ca-logo.jpg" alt="CA India" class="logo-img"><div class="logo-txt"><div class="l1">Vijaywargi Khabiya &amp; Saoji</div><div class="l2">Chartered Accountants &middot; Est. 2014</div></div></a>'
    + '<ul class="nav-links">'
    + '<li class="ni"><a href="' + P.about + '" class="na">About Us</a></li>'
    + '<li class="ni"><span class="na">Services <span class="chev">&#9660;</span></span><div class="dd">'
    + '<a href="' + P.audit + '">Audit &amp; Assurance</a>'
    + '<div class="sub-w"><span class="dd-item">Taxation <span style="opacity:.4;float:right">&#8250;</span></span><div class="sub-dd"><a href="' + P.direct + '">Direct Tax</a><a href="' + P.indirect + '">Indirect Tax / GST</a></div></div>'
    + '<a href="' + P.legal + '">Legal Services</a>'
    + '<a href="' + P.debt + '">Debt Syndication</a>'
    + '<a href="' + P.insolvency + '">Insolvency &amp; Bankruptcy</a>'
    + '<div class="dd-sep"></div><div class="dd-lbl">State Incentives</div>'
    + '<a href="' + P.psi + '">PSI in Maharashtra</a>'
    + '<a href="' + P.telangana + '">Scheme of Telangana</a>'
    + '<div class="dd-sep"></div>'
    + '<a href="' + P.setup + '">Setting-up in India</a>'
    + '<a href="' + P.services + '" style="font-weight:700;color:var(--red)">All Services &rarr;</a>'
    + '</div></li>'
    + '<li class="ni"><a href="' + P.team + '" class="na">Our Team</a></li>'
    + '<li class="ni"><span class="na">Contribution <span class="chev">&#9660;</span></span><div class="dd">'
    + '<div class="dd-lbl">Publications</div>'
    + '<a href="' + P.publications + '#y2020">Year 2020</a>'
    + '<a href="' + P.publications + '#y2019">Year 2019</a>'
    + '<a href="' + P.publications + '#y2018">Year 2018</a>'
    + '<div class="dd-sep"></div><a href="' + P.publications + '">All Publications &rarr;</a>'
    + '</div></li>'
    + '<li class="ni"><a href="' + P.careers + '" class="na">Careers</a></li>'
    + '<li class="ni"><a href="' + P.contact + '" class="na">Contact</a></li>'
    + '</ul>'
    + '<div class="nav-right"><a href="' + P.contact + '" class="btn btn-red btn-sm nav-cta">Get In Touch</a>'
    + '<button class="ham" id="vksHam" aria-label="Menu"><span></span><span></span><span></span></button>'
    + '</div></div></div></nav>';

  var MOB = '<div class="mob-ov" id="vksMobOv"></div>'
    + '<div class="mob-drawer" id="vksMobDrawer"><div class="mob-drawer-inner">'
    + '<a href="' + P.about + '" class="mob-a">About Us</a>'
    + '<div class="mob-a" data-mobtog="vksMS">Services <span>&#9660;</span></div>'
    + '<div class="mob-sub" id="vksMS">'
    + '<a href="' + P.audit + '" class="mob-sub-a">Audit &amp; Assurance</a>'
    + '<a href="' + P.direct + '" class="mob-sub-a">Direct Tax</a>'
    + '<a href="' + P.indirect + '" class="mob-sub-a">Indirect Tax / GST</a>'
    + '<a href="' + P.legal + '" class="mob-sub-a">Legal Services</a>'
    + '<a href="' + P.debt + '" class="mob-sub-a">Debt Syndication</a>'
    + '<a href="' + P.insolvency + '" class="mob-sub-a">Insolvency &amp; IBC</a>'
    + '<a href="' + P.psi + '" class="mob-sub-a">PSI Maharashtra</a>'
    + '<a href="' + P.telangana + '" class="mob-sub-a">Scheme of Telangana</a>'
    + '<a href="' + P.setup + '" class="mob-sub-a">Setting-up in India</a>'
    + '</div>'
    + '<a href="' + P.team + '" class="mob-a">Our Team</a>'
    + '<div class="mob-a" data-mobtog="vksMP">Contribution <span>&#9660;</span></div>'
    + '<div class="mob-sub" id="vksMP">'
    + '<a href="' + P.publications + '#y2020" class="mob-sub-a">Publications 2020</a>'
    + '<a href="' + P.publications + '#y2019" class="mob-sub-a">Publications 2019</a>'
    + '<a href="' + P.publications + '#y2018" class="mob-sub-a">Publications 2018</a>'
    + '</div>'
    + '<a href="' + P.careers + '" class="mob-a">Careers</a>'
    + '<a href="' + P.contact + '" class="mob-a">Contact Us</a>'
    + '</div>'
    + '<div class="mob-footer"><a href="' + P.contact + '" class="mob-cta-btn">Get In Touch &rarr;</a></div>'
    + '</div>';

  var FOOTER = '<footer><div class="wrap">'
    + '<div class="ft-grid">'
    /* col 1 */
    + '<div><div class="ft-logo-row"><img src="ca-logo.jpg" alt="CA India" class="ft-logo-img"><div><div class="ft-brand-ttl">Vijaywargi Khabiya &amp; Saoji</div><div class="ft-brand-sub">Chartered Accountants &middot; Est. 2014</div></div></div>'
    + '<p class="ft-about">A multi-disciplinary CA firm providing single-window professional services across India \u2014 Audit, Taxation, Legal, Debt Syndication and Insolvency.</p>'
    + '<address class="ft-addr">3rd Floor, MG House, Ravindranath Tagore Marg, Civil Lines, Nagpur \u2013 440001</address>'
    + '<div class="ft-newsletter"><p>Get Tax Alerts in your inbox</p>'
    + '<div class="nl-row"><input type="email" placeholder="your@email.com" id="vksNLInput"><button onclick="vksNLSubmit()">Subscribe</button></div></div>'
    + '</div>'
    /* col 2 */
    + '<div><h5>Services</h5><div class="ft-links">'
    + '<a href="' + P.audit + '">Audit &amp; Assurance</a>'
    + '<a href="' + P.direct + '">Direct Taxation</a>'
    + '<a href="' + P.indirect + '">Indirect Tax / GST</a>'
    + '<a href="' + P.legal + '">Legal Services</a>'
    + '<a href="' + P.debt + '">Debt Syndication</a>'
    + '<a href="' + P.insolvency + '">Insolvency &amp; IBC</a>'
    + '<a href="' + P.psi + '">PSI Maharashtra</a>'
    + '<a href="' + P.setup + '">Setting-up in India</a>'
    + '</div></div>'
    /* col 3 */
    + '<div><h5>Company</h5><div class="ft-links">'
    + '<a href="' + P.about + '">About Us</a>'
    + '<a href="' + P.team + '">Our Partners</a>'
    + '<a href="' + P.publications + '">Publications</a>'
    + '<a href="' + P.careers + '">Careers</a>'
    + '<a href="' + P.contact + '">Contact Us</a>'
    + '</div></div>'
    /* col 4 */
    + '<div><h5>Contact</h5>'
    + '<div class="ft-ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:11px;height:11px;flex-shrink:0;margin-top:2px;opacity:.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 7 7l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z"/></svg><a href="tel:07122522020" data-vks="phone">0712-2522020</a></div>'
    + '<div class="ft-ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:11px;height:11px;flex-shrink:0;margin-top:2px;opacity:.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:info@cavks.in" data-vks="email">info@cavks.in</a></div>'
    + '<div class="ft-ci" style="font-size:.72rem;color:rgba(255,255,255,.35)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:11px;height:11px;flex-shrink:0;margin-top:2px;opacity:.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Mon\u2013Sat: 09:00am \u2013 6:00pm</div>'
    + '<div style="margin-top:14px"><a href="' + P.contact + '" class="btn btn-red btn-sm" style="width:100%;justify-content:center;display:flex">Write to Us &rarr;</a></div>'
    + '</div>'
    + '</div>' /* ft-grid */
    + '<div class="ft-bot"><span>&copy; 2026 VK&amp;S \u2014 All rights reserved.</span>'
    + '<div class="ft-bot-links"><a href="' + P.about + '">About</a><a href="' + P.services + '">Services</a><a href="' + P.publications + '">Publications</a><a href="' + P.careers + '">Careers</a><a href="' + P.contact + '">Contact</a></div>'
    + '</div></div></footer>';

  var FLOATS = '<div class="float-group" id="vksFloat">'
    /* WhatsApp button */
    + '<a href="#" id="vksWA" class="wa-btn" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">'
    + '<span class="wa-tooltip">WhatsApp</span>'
    + '<svg viewBox="0 0 24 24" width="26" height="26" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.552 4.103 1.518 5.829L.057 23.57a.75.75 0 0 0 .92.92l5.741-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.803 9.803 0 0 1-4.998-1.362l-.358-.213-3.714.946.978-3.607-.233-.37A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>'
    + '</a>'
    /* Scroll to top — hidden until user scrolls */
    + '<button id="vksStt" class="scroll-top" aria-label="Back to top" title="Back to top">'
    + '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>'
    + '</button></div>';

  var COOKIE = '<div class="cookie-bar" id="vksCookie">'
    + '<p>We use cookies to improve your experience. By continuing to browse, you agree to our <a href="#">Privacy Policy</a>. No advertisements are displayed on this site.</p>'
    + '<div class="cookie-btns">'
    + '<button class="btn btn-sm btn-ghost" onclick="vksCookieDismiss()">Decline</button>'
    + '<button class="btn btn-sm btn-red" onclick="vksCookieAccept()">Accept</button>'
    + '</div></div>';

  /* ── INJECT on DOMContentLoaded ─────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {

    /* 1. Prepend loader + progress + transition overlay */
    var top = document.createElement('div');
    top.innerHTML = LOADER + PROGRESS + TRANSITION;
    document.body.insertBefore(top, document.body.firstChild);

    /* 2. Prepend topbar + navbar + mobile drawer */
    var nav = document.createElement('div');
    nav.innerHTML = TOPBAR + NAVBAR + MOB;
    document.body.insertBefore(nav, document.body.children[1]);

    /* 3. Append footer + floats + cookie */
    var bot = document.createElement('div');
    bot.innerHTML = FOOTER + FLOATS + COOKIE;
    document.body.appendChild(bot);

    /* 4. Apply config (from window.VKS) */
    applyConfig();

    /* 5. Active nav link */
    var cur = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (el) {
      if ((el.getAttribute('href') || '') === cur) {
        el.style.color = 'var(--red)';
        el.style.fontWeight = '700';
      }
    });

    /* 6. Scroll events */
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* 7. Hamburger */
    var ham = document.getElementById('vksHam');
    var drawer = document.getElementById('vksMobDrawer');
    var ov = document.getElementById('vksMobOv');
    function closeMob() {
      ham && ham.classList.remove('open');
      drawer && drawer.classList.remove('open');
      ov && ov.classList.remove('show');
      document.body.style.overflow = '';
    }
    if (ham) ham.addEventListener('click', function () {
      var o = drawer.classList.toggle('open');
      ham.classList.toggle('open', o);
      ov.classList.toggle('show', o);
      document.body.style.overflow = o ? 'hidden' : '';
    });
    if (ov) ov.addEventListener('click', closeMob);
    document.querySelectorAll('.mob-sub-a, .mob-a[href]').forEach(function (a) {
      a.addEventListener('click', closeMob);
    });

    /* 8. Mobile accordion sub-menus */
    document.querySelectorAll('[data-mobtog]').forEach(function (el) {
      el.addEventListener('click', function () {
        var sub = document.getElementById(el.getAttribute('data-mobtog'));
        if (sub) sub.classList.toggle('open');
      });
    });

    /* 9. Scroll-to-top */
    var stt = document.getElementById('vksStt');
    if (stt) stt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* 10. Page load animation — hide loader after 900ms */
    var loader = document.getElementById('vksLoader');
    if (loader) setTimeout(function () {
      loader.style.opacity = '0';
      setTimeout(function () { loader.style.display = 'none'; }, 500);
    }, 900);

    /* 11. Page transition — fade in on arrival only (no intercept on click = no white-screen-on-back) */
    var trans = document.getElementById('vksTrans');
    /* Fade in after arrival */
    if (trans) {
      trans.style.opacity = '1';
      trans.style.transition = 'none';
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          trans.style.transition = 'opacity .4s ease';
          trans.style.opacity = '0';
        });
      });
    }
    /* pageshow handles bfcache (back/forward) */
    window.addEventListener('pageshow', function(e) {
      var t = document.getElementById('vksTrans');
      if (t) { t.style.transition = 'none'; t.style.opacity = '0'; }
    });

    /* 12. Cookie bar */
    if (!localStorage.getItem('vks_ck')) {
      setTimeout(function () {
        var ck = document.getElementById('vksCookie');
        if (ck) ck.classList.add('show');
      }, 1400);
    }
  });

  /* ── onScroll ─────────────────────────────────────────────── */
  function onScroll() {
    var s = window.scrollY;
    /* Navbar shadow */
    var nb = document.getElementById('navbar');
    if (nb) nb.classList.toggle('scrolled', s > 50);
    /* Progress bar */
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var prog = document.getElementById('vksProgress');
    if (prog) prog.style.width = (total > 0 ? (s / total * 100) : 0) + '%';
    /* Scroll-to-top visibility */
    var stt = document.getElementById('vksStt');
    var fg = document.getElementById('vksFloat');
    if (stt) {
      var show = s > 300;
      stt.classList.toggle('visible', show);
      if (fg) fg.classList.toggle('top-visible', show);
    }
  }

  /* ── applyConfig — fills data-vks="..." elements ────────── */
  function applyConfig() {
    var C = window.VKS;
    if (!C) return;
    document.querySelectorAll('[data-vks]').forEach(function (el) {
      var key = el.getAttribute('data-vks');
      if (key === 'phone') {
        el.textContent = C.phone;
        if (el.tagName === 'A') el.href = C.phoneTel;
      } else if (key === 'mobile') {
        el.textContent = C.mobile;
        if (el.tagName === 'A') el.href = C.mobileTel;
      } else if (key === 'email') {
        el.textContent = C.email;
        if (el.tagName === 'A') el.href = C.emailHref;
      } else if (key === 'whatsapp') {
        if (el.tagName === 'A') el.href = C.whatsapp;
      } else if (key === 'address') {
        el.textContent = C.address;
      }
    });
    /* WhatsApp floating button */
    var wa = document.getElementById('vksWA');
    if (wa) wa.href = C.whatsapp;
  }

  /* ── Global helpers ─────────────────────────────────────── */
  window.vksCookieAccept = function () {
    localStorage.setItem('vks_ck', '1');
    var ck = document.getElementById('vksCookie');
    if (ck) ck.classList.remove('show');
  };
  window.vksCookieDismiss = function () {
    var ck = document.getElementById('vksCookie');
    if (ck) ck.classList.remove('show');
  };
  window.vksNLSubmit = function () {
    var inp = document.getElementById('vksNLInput');
    var btn = inp && inp.nextElementSibling;
    if (inp && inp.value.includes('@')) {
      inp.value = '';
      if (btn) { btn.textContent = '\u2713 Done'; btn.style.background = '#27ae60'; }
    }
  };

})();
