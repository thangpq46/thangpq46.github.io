/* ============================================================================
   Shura Studios — shared behaviour. Vanilla, no dependencies.
   Everything here is progressive enhancement: with JS off the pages still read.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Reveal elements as they scroll into view ───────────────────────── */
  var revealables = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // Stagger siblings so a grid animates in as a wave rather than a slab.
        var delay = parseFloat(el.dataset.delay || 0);
        setTimeout(function () { el.classList.add('in'); }, delay * 1000);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ── Sticky header state + scroll progress bar ──────────────────────── */
  var header = document.querySelector('header');
  var bar = document.querySelector('.progress i');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle('stuck', y > 12);
      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Cursor-tracked glow inside cards ───────────────────────────────── */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    /* Subtle 3D tilt on app cards. Kept small — it should read as depth,
       not as a carnival ride. */
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          'perspective(900px) rotateX(' + (-py * 7).toFixed(2) + 'deg) rotateY(' +
          (px * 7).toFixed(2) + 'deg) translateY(-6px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  /* ── Count-up numbers ───────────────────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = el.dataset.count + (el.dataset.suffix || ''); });
    } else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          co.unobserve(el);
          var target = parseFloat(el.dataset.count);
          var suffix = el.dataset.suffix || '';
          var start = performance.now();
          (function step(now) {
            var t = Math.min((now - start) / 1400, 1);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(step);
          })(start);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  /* ── Starfield ──────────────────────────────────────────────────────── */
  var canvas = document.getElementById('stars');
  if (canvas && !reduced) {
    var ctx = canvas.getContext('2d');
    var stars = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pointer = { x: 0, y: 0 };

    function size() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Density scaled to viewport area, capped so phones stay cheap.
      var count = Math.min(Math.round((window.innerWidth * window.innerHeight) / 9000), 190);
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.25 + 0.25,
          d: Math.random() * 0.7 + 0.3,          // depth → parallax + brightness
          tw: Math.random() * Math.PI * 2,       // twinkle phase
          sp: Math.random() * 0.02 + 0.006
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.tw += s.sp;
        var alpha = (0.25 + Math.abs(Math.sin(s.tw)) * 0.6) * s.d;
        ctx.beginPath();
        ctx.arc(s.x + pointer.x * s.d * 22, s.y + pointer.y * s.d * 22, s.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 11 === 0
          ? 'rgba(255,138,61,' + alpha + ')'
          : (i % 7 === 0 ? 'rgba(255,61,99,' + alpha + ')' : 'rgba(255,255,255,' + alpha + ')');
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', size);
    window.addEventListener('pointermove', function (e) {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
    size();
    draw();
  }

  /* ── Stamp the current year into footers ────────────────────────────── */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
