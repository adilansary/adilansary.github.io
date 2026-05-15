(function () {
  'use strict';

  var D = window.PortfolioData;
  if (!D) { console.warn('[render] PortfolioData not found — load data.js first'); return; }

  /* Escape HTML entities in every data value inserted into innerHTML */
  function esc(val) {
    return String(val == null ? '' : val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ================================================================
     Navigation — navbar links + footer nav from data.nav.links
     ================================================================ */
  function renderNav() {
    var links = (D.nav && D.nav.links) || [];
    if (!links.length) return;

    var navLinksEl  = document.getElementById('nav-links');
    var footerNavEl = document.querySelector('.footer-nav');

    var navHtml = links.map(function (l) {
      return '<a href="' + esc(l.href) + '" class="nav-link">' + esc(l.label) + '</a>';
    }).join('');

    var footerHtml = links.map(function (l) {
      return '<a href="' + esc(l.href) + '">' + esc(l.label) + '</a>';
    }).join('');

    if (navLinksEl)  navLinksEl.innerHTML  = navHtml;
    if (footerNavEl) footerNavEl.innerHTML = footerHtml;
  }

  /* ================================================================
     Hero — badge, name, role prefix, bio, stats, social links
     ================================================================ */
  function renderHero() {
    var h = D.hero || {};
    var m = D.meta || {};

    // Availability badge
    var badge = document.querySelector('.hero-badge');
    if (badge) {
      badge.style.display = h.available === false ? 'none' : '';
      badge.innerHTML = '<span class="status-dot" aria-hidden="true"></span>' + esc(h.badge);
    }

    // Full name with accent on last name(s)
    var nameEl = document.querySelector('.hero-name');
    if (nameEl) {
      var parts = (m.name || '').split(' ');
      var first = esc(parts[0] || '');
      var rest  = esc(parts.slice(1).join(' '));
      nameEl.innerHTML = first + ' <span class="name-accent">' + rest + '</span>';
    }

    // Typed-role prefix ("I build ")
    var roleStatic = document.querySelector('.role-static');
    if (roleStatic) roleStatic.textContent = h.rolePrefix || 'I build ';

    // Bio paragraph
    var bio = document.querySelector('.hero-bio');
    if (bio) bio.textContent = h.bio || '';

    // Stats bar
    var statsBar = document.querySelector('.stats-bar');
    if (statsBar && Array.isArray(h.stats) && h.stats.length) {
      statsBar.innerHTML = h.stats.map(function (s, i) {
        return (i > 0 ? '<div class="stat-divider" aria-hidden="true"></div>' : '') +
          '<div class="stat" role="listitem">' +
            '<span class="stat-num" data-count="' + esc(s.count) + '">0</span>' +
            '<span class="stat-sfx">' + esc(s.suffix) + '</span>' +
            '<span class="stat-lbl">' + esc(s.label) + '</span>' +
          '</div>';
      }).join('');
    }

    // Hero social links
    var socials = document.querySelector('.hero-socials');
    if (socials) socials.innerHTML = buildSocialLinks(m, 'social-link');
  }

  function buildSocialLinks(m, className) {
    var cls = className ? ' class="' + className + '"' : '';
    return [
      m.github   && '<a href="' + esc(m.github)   + '" target="_blank" rel="noopener noreferrer"' + cls + ' aria-label="GitHub"><i class="fab fa-github"></i></a>',
      m.linkedin && '<a href="' + esc(m.linkedin)  + '" target="_blank" rel="noopener noreferrer"' + cls + ' aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>',
      m.email    && '<a href="mailto:' + esc(m.email) + '"' + cls + ' aria-label="Email"><i class="fas fa-envelope"></i></a>',
    ].filter(Boolean).join('');
  }

  /* ================================================================
     About — lead, paragraphs, highlight cards, resume link
     ================================================================ */
  function renderAbout() {
    var a = D.about || {};
    var m = D.meta  || {};
    var container = document.querySelector('.about-text');
    if (!container) return;

    var paragraphs = (a.paragraphs || []).map(function (p) {
      return '<p>' + esc(p) + '</p>';
    }).join('');

    var highlights = (a.highlights || []).map(function (h) {
      return '<div class="highlight">' +
               '<i class="' + esc(h.icon) + '"></i>' +
               '<div><strong>' + esc(h.title) + '</strong><span>' + esc(h.detail) + '</span></div>' +
             '</div>';
    }).join('');

    container.innerHTML =
      '<p class="about-lead">' + esc(a.lead) + '</p>' +
      paragraphs +
      (highlights ? '<div class="about-highlights">' + highlights + '</div>' : '') +
      '<a href="' + esc(m.resumeUrl || '#') + '" download class="btn btn-primary">' +
        '<i class="fas fa-download"></i> Download Resume' +
      '</a>';
  }

  /* ================================================================
     Experience — timeline, sorted by item.order ascending
     ================================================================ */
  function renderExperience() {
    var exp   = D.experience || {};
    var items = (exp.items || []).slice().sort(byOrder);
    var container = document.querySelector('.timeline');
    if (!container) return;

    updateSectionDesc('#experience', exp.sectionDesc);

    container.innerHTML = items.map(function (e, i) {
      var isLast = i === items.length - 1;
      return '<div class="tl-item reveal">' +
               '<div class="tl-marker">' +
                 '<div class="tl-dot"></div>' +
                 (!isLast ? '<div class="tl-line"></div>' : '') +
               '</div>' +
               '<div class="tl-card">' +
                 '<div class="tl-top">' +
                   '<div>' +
                     '<h3 class="tl-role">' + esc(e.role) + '</h3>' +
                     '<p class="tl-company"><i class="fas fa-building"></i> ' + esc(e.company) + '</p>' +
                   '</div>' +
                   '<div class="tl-right">' +
                     '<span class="tl-date"><i class="fas fa-calendar-alt"></i> ' + esc(e.period) + '</span>' +
                     (e.current ? '<span class="badge-current">Current</span>' : '') +
                   '</div>' +
                 '</div>' +
                 '<p class="tl-location"><i class="fas fa-map-marker-alt"></i> ' + esc(e.location) + '</p>' +
               '</div>' +
             '</div>';
    }).join('');
  }

  /* ================================================================
     Skills — groups sorted by group.order ascending
     ================================================================ */
  function renderSkills() {
    var groups = (D.skills || []).slice().sort(byOrder);
    var container = document.querySelector('.skills-grid');
    if (!container) return;

    container.innerHTML = groups.map(function (g) {
      var tags = (g.items || []).map(function (item) {
        return '<span class="tag' + (item.accent ? ' tag-accent' : '') + '">' + esc(item.label) + '</span>';
      }).join('');

      return '<div class="skill-group reveal">' +
               '<div class="skill-group-hd">' +
                 '<i class="' + esc(g.icon) + '"></i>' +
                 '<h3>' + esc(g.group) + '</h3>' +
               '</div>' +
               '<div class="skill-tags">' + tags + '</div>' +
             '</div>';
    }).join('');
  }

  /* ================================================================
     Projects — cards sorted by item.order ascending
     ================================================================ */
  function renderProjects() {
    var proj  = D.projects || {};
    var items = (proj.items || []).slice().sort(byOrder);
    var container = document.querySelector('.projects-grid');
    if (!container) return;

    updateSectionDesc('#projects', proj.sectionDesc);

    // Update "View All on GitHub" CTA href from meta
    var cta = document.querySelector('.projects-cta a');
    if (cta && D.meta && D.meta.github) cta.href = D.meta.github;

    container.innerHTML = items.map(function (p) {
      var stack = (p.stack || []).map(function (s) {
        return '<span>' + esc(s) + '</span>';
      }).join('');

      var ghBtn   = p.githubUrl
        ? '<a href="' + esc(p.githubUrl) + '" target="_blank" rel="noopener noreferrer" class="proj-gh" aria-label="View on GitHub"><i class="fab fa-github"></i></a>'
        : '';
      var liveBtn = p.liveUrl
        ? '<a href="' + esc(p.liveUrl) + '" target="_blank" rel="noopener noreferrer" class="proj-live" aria-label="View live"><i class="fas fa-external-link-alt"></i></a>'
        : '';

      return '<article class="project-card reveal">' +
               '<div class="proj-top">' +
                 '<div class="proj-icon"><i class="' + esc(p.icon || 'fas fa-code') + '"></i></div>' +
                 ghBtn + liveBtn +
               '</div>' +
               '<h3 class="proj-title">' + esc(p.title) + '</h3>' +
               '<p class="proj-desc">' + esc(p.desc) + '</p>' +
               '<div class="proj-stack">' + stack + '</div>' +
             '</article>';
    }).join('');
  }

  /* ================================================================
     Education — cards sorted by item.order ascending
     ================================================================ */
  function renderEducation() {
    var items = (D.education || []).slice().sort(byOrder);
    var container = document.querySelector('.edu-grid');
    if (!container) return;

    container.innerHTML = items.map(function (e) {
      return '<div class="edu-card reveal">' +
               '<div class="edu-icon"><i class="' + esc(e.icon || 'fas fa-graduation-cap') + '"></i></div>' +
               '<div class="edu-body">' +
                 '<span class="edu-year">' + esc(e.years) + '</span>' +
                 '<h3>' + esc(e.degree) + '</h3>' +
                 '<p class="edu-school">' + esc(e.school) + '</p>' +
                 (e.cgpa  ? '<span class="edu-cgpa">CGPA: ' + esc(e.cgpa) + '</span>' : '') +
                 (e.thesis ? '<p class="edu-thesis"><strong>Thesis:</strong> ' + esc(e.thesis) + '</p>' : '') +
               '</div>' +
             '</div>';
    }).join('');
  }

  /* ================================================================
     Contact cards — from data.contact.cards
     ================================================================ */
  function renderContact() {
    var c = D.contact || {};
    var container = document.querySelector('.contact-cards');
    if (!container) return;

    updateSectionDesc('#contact', c.sectionDesc);

    container.innerHTML = (c.cards || []).map(function (card) {
      var ext = card.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<a href="' + esc(card.href) + '" class="contact-card"' + ext + '>' +
               '<div class="cc-icon"><i class="' + esc(card.icon) + '"></i></div>' +
               '<div class="cc-detail">' +
                 '<span class="cc-label">' + esc(card.label) + '</span>' +
                 '<span class="cc-value">' + esc(card.value) + '</span>' +
               '</div>' +
               '<i class="fas fa-arrow-right cc-arrow"></i>' +
             '</a>';
    }).join('');
  }

  /* ================================================================
     Footer — social links and tagline from meta
     ================================================================ */
  function renderFooter() {
    var m = D.meta || {};

    var footerSocials = document.querySelector('.footer-socials');
    if (footerSocials) footerSocials.innerHTML = buildSocialLinks(m, '');

    var footerTagline = document.querySelector('.footer-brand p');
    if (footerTagline && m.subtitle) footerTagline.textContent = m.subtitle;
  }

  /* ================================================================
     Helpers
     ================================================================ */
  function byOrder(a, b) {
    return (a.order == null ? 999 : a.order) - (b.order == null ? 999 : b.order);
  }

  function updateSectionDesc(sectionSelector, text) {
    if (!text) return;
    var el = document.querySelector(sectionSelector + ' .section-desc');
    if (el) el.textContent = text;
  }

  /* ================================================================
     Run — each renderer is isolated so one failure cannot block others
     ================================================================ */
  [renderNav, renderHero, renderAbout, renderExperience, renderSkills,
   renderProjects, renderEducation, renderContact, renderFooter]
    .forEach(function (fn) {
      try { fn(); } catch (err) { console.error('[render] ' + fn.name + ':', err); }
    });

})();
