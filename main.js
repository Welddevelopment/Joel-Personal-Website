(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll reveal — sections only get hidden once the observer is attached,
  //    so content is never lost if JS fails.
  if (!reduced && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('reveal-armed');
      obs.observe(el);
    });
  }

  // 2. Scroll-driven work timeline: one item visible at a time.
  var sec = document.querySelector('[data-work-scroll]');
  var wrap = document.querySelector('[data-work-items]');
  if (sec && wrap && !reduced) {
    wrap.classList.add('work-armed');
    var updateWork = function () {
      var rect = sec.getBoundingClientRect();
      var total = Math.max(1, sec.offsetHeight - window.innerHeight);
      var p = Math.min(1, Math.max(0, -rect.top / total));
      var idx = Math.min(2, Math.floor(p * 3));
      document.querySelectorAll('[data-work-item]').forEach(function (el) {
        el.classList.toggle('work-on', +el.getAttribute('data-work-item') === idx);
      });
      document.querySelectorAll('[data-work-dot]').forEach(function (el) {
        el.classList.toggle('work-on', +el.getAttribute('data-work-dot') <= idx);
      });
    };
    window.addEventListener('scroll', updateWork, { passive: true });
    window.addEventListener('resize', updateWork);
    updateWork();
  }

  // 3. Copy email
  var btn = document.getElementById('copy-email');
  var emailEl = document.getElementById('email');
  if (btn && emailEl) {
    var t;
    btn.addEventListener('click', function () {
      var email = emailEl.textContent.trim();
      var done = function () {
        btn.textContent = 'Copied ✓';
        clearTimeout(t);
        t = setTimeout(function () { btn.textContent = 'Copy email'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }
})();
