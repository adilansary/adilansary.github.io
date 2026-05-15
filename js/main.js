(function () {
  'use strict';

  /* ================================================================
     Theme
     ================================================================ */
  const STORAGE_KEY = 'portfolio-theme';
  const root        = document.documentElement;
  const themeBtn    = document.getElementById('theme-btn');
  const metaTheme   = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      const icon = themeBtn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
      }
      themeBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#080b14' : '#f8faff');
    }
  }

  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  applyTheme(getInitialTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ================================================================
     Navbar — scroll + mobile toggle
     ================================================================ */
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navLinkEls = document.querySelectorAll('.nav-link');

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open', !expanded);
    });

    // Close on link click
    navLinkEls.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
  }

  /* ================================================================
     Smooth Scroll + Active Nav Link
     ================================================================ */
  navLinkEls.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const offset = (navbar ? navbar.offsetHeight : 64) + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  function updateActiveLink() {
    const scrollY     = window.scrollY;
    const winH        = window.innerHeight;
    const docH        = document.documentElement.scrollHeight;
    const atBottom    = scrollY + winH >= docH - 50;

    if (atBottom) {
      navLinkEls.forEach(l => l.classList.remove('active'));
      const last = document.querySelector('.nav-link[href="#contact"]');
      if (last) last.classList.add('active');
      return;
    }

    let best = null;
    let bestArea = 0;

    document.querySelectorAll('section[id], header[id]').forEach(sec => {
      const top    = sec.offsetTop - 80;
      const bottom = top + sec.offsetHeight;
      const visible = Math.max(0, Math.min(bottom, scrollY + winH) - Math.max(top, scrollY));
      if (visible > bestArea) { bestArea = visible; best = sec.id; }
    });

    navLinkEls.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${best}`);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ================================================================
     Scroll Reveal (Intersection Observer)
     ================================================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ================================================================
     Stats Counter
     ================================================================ */
  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1600;
    const step     = 16;
    const increments = Math.ceil(duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const value = Math.round(easeOut(current / increments) * target);
      el.textContent = value;
      if (current >= increments) {
        el.textContent = target;
        clearInterval(timer);
      }
    }, step);
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num[data-count]').forEach(animateCounter);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);

  /* ================================================================
     Typing Animation
     ================================================================ */
  const typedEl = document.getElementById('typed-role');
  const phrases = [
    'automation frameworks',
    'E2E test pipelines',
    'API test suites',
    'quality systems',
    'CI/CD workflows',
  ];

  if (typedEl) {
    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    let paused    = false;

    function tick() {
      const current = phrases[phraseIdx];

      if (paused) {
        paused = false;
        setTimeout(tick, 1400);
        return;
      }

      if (!deleting) {
        typedEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          paused   = true;
        }
        setTimeout(tick, 80);
      } else {
        typedEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting  = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
        setTimeout(tick, 45);
      }
    }
    setTimeout(tick, 800);
  }

  /* ================================================================
     Contact Form Validation
     ================================================================ */
  const form       = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  function validateField(input) {
    const err = input.closest('.form-group')?.querySelector('.field-err');
    let msg = '';
    if (input.required && !input.value.trim()) {
      msg = 'This field is required.';
    } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      msg = 'Please enter a valid email address.';
    }
    if (err) err.textContent = msg;
    input.classList.toggle('invalid', !!msg);
    return !msg;
  }

  if (form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      inputs.forEach(input => { if (!validateField(input)) valid = false; });
      if (!valid) return;

      /* --- Static site: compose mailto fallback --- */
      const name    = form.querySelector('#cf-name')?.value.trim() || '';
      const email   = form.querySelector('#cf-email')?.value.trim() || '';
      const subject = form.querySelector('#cf-subject')?.value.trim() || 'Portfolio Contact';
      const message = form.querySelector('#cf-message')?.value.trim() || '';

      const body    = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
      const mailto  = `mailto:ansaryhere@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailto;

      if (formStatus) {
        formStatus.textContent = "Opening your email client...";
        formStatus.className   = 'form-status success';
      }
      form.reset();
    });
  }

  /* ================================================================
     Footer Year
     ================================================================ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
