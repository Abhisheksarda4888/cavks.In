/* shared.js — scroll reveal, counters, flip cards, forms, careers modal, photo fix */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Scroll reveal ── */
  var revObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('.rv,.rl,.rr').forEach(function (el) { revObs.observe(el); });

  /* ── Partner photo fix ──
     Image loads → hide fallback initials.
     Image errors → hide broken img, show initials. */
  document.querySelectorAll('.partner-photo img, .side-p-av img').forEach(function (img) {
    var fb = img.nextElementSibling; /* the .partner-av / .side-p-avfb */
    function onLoad() {
      img.classList.add('loaded');
      if (fb) fb.style.display = 'none';
    }
    function onErr() {
      img.style.display = 'none';
      if (fb) { fb.style.display = 'flex'; fb.style.opacity = '1'; }
    }
    if (img.complete) {
      if (img.naturalWidth > 0) onLoad(); else onErr();
    } else {
      img.addEventListener('load', onLoad);
      img.addEventListener('error', onErr);
    }
  });

  /* ── Animated counter ── */
  var cntObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var sfx = el.getAttribute('data-sfx') || '';
      var cur = 0;
      var step = Math.max(1, Math.ceil(target / 50));
      var iv = setInterval(function () {
        cur = Math.min(cur + step, target);
        el.textContent = cur + sfx;
        if (cur >= target) clearInterval(iv);
      }, 28);
      cntObs.unobserve(el);
    });
  }, { threshold: 0.8 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cntObs.observe(el); });

  /* ── Hero slide title rotation ── */
  var heroTitles = [
    'Audit &amp; Assurance Services',
    'Taxation &amp; GST Advisory',
    'Legal &amp; Insolvency Services'
  ];
  var heroTitleEl = document.getElementById('heroSlideTitle');
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDots = document.querySelectorAll('.h-dot');
  var heroIdx = 0;
  if (heroSlides.length > 1) {
    setInterval(function () {
      heroSlides[heroIdx].classList.remove('active');
      heroDots[heroIdx] && heroDots[heroIdx].classList.remove('active');
      heroIdx = (heroIdx + 1) % heroSlides.length;
      heroSlides[heroIdx].classList.add('active');
      heroDots[heroIdx] && heroDots[heroIdx].classList.add('active');
      if (heroTitleEl) {
        heroTitleEl.style.opacity = '0';
        heroTitleEl.style.transform = 'translateY(8px)';
        setTimeout(function () {
          heroTitleEl.innerHTML = heroTitles[heroIdx % heroTitles.length];
          heroTitleEl.style.transition = 'opacity .45s,transform .45s';
          heroTitleEl.style.opacity = '1';
          heroTitleEl.style.transform = 'none';
        }, 380);
      }
    }, 5000);
    /* Hero dot click */
    heroDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        heroSlides[heroIdx].classList.remove('active');
        heroDots[heroIdx] && heroDots[heroIdx].classList.remove('active');
        heroIdx = i;
        heroSlides[heroIdx].classList.add('active');
        heroDots[heroIdx] && heroDots[heroIdx].classList.add('active');
      });
    });
  }

  /* ── Flip card navigate on click ── */
  document.querySelectorAll('[data-href]').forEach(function (el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () {
      var href = el.getAttribute('data-href');
      if (href) window.location.href = href;
    });
  });

  /* ── Form submit with success state ── */
  document.querySelectorAll('form[data-ok]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      if (btn) { btn.textContent = 'Sending\u2026'; btn.disabled = true; }
      setTimeout(function () {
        form.style.display = 'none';
        var ok = document.getElementById(form.getAttribute('data-ok'));
        if (ok) ok.classList.add('show');
      }, 1100);
    });
  });

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var t = document.getElementById(id);
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  /* ── Careers modal ── */
  document.querySelectorAll('[data-apply]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var modal = document.getElementById('applyModal');
      var roleInput = document.getElementById('applyRole');
      if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
      if (roleInput) roleInput.value = btn.getAttribute('data-apply');
    });
  });
  var closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  var modal = document.getElementById('applyModal');
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  function closeModal() {
    var m = document.getElementById('applyModal');
    if (m) { m.style.display = 'none'; document.body.style.overflow = ''; }
  }
});
