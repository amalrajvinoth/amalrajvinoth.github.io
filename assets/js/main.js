/**
 * Amal James — Portfolio
 * Vanilla JS: theme toggle, nav, scroll animations, mobile menu, back-to-top
 */

(function () {
  'use strict';

  // ─── Theme toggle ────────────────────────────────────────────
  const themeBtn = document.getElementById('theme-toggle');
  const html     = document.documentElement;

  function applyTheme(theme) {
    html.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    if (themeBtn) themeBtn.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Ensure theme is set (inline script in <head> may have already done this)
  if (!html.dataset.theme) {
    const preferred = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(preferred);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(html.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }

  // Sync with system preference if no user override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ─── Elements ────────────────────────────────────────────────
  const nav        = document.getElementById('nav');
  const navToggle  = document.querySelector('.nav-toggle');
  const navMobile  = document.querySelector('.nav-mobile');
  const navLinks   = document.querySelectorAll('.nav-links a');
  const backToTop  = document.querySelector('.back-to-top');
  const sections   = document.querySelectorAll('section[id]');
  const fadeEls    = document.querySelectorAll('.fade-in');

  // ─── Nav scroll shadow ───────────────────────────────────────
  function onScroll() {
    const y = window.scrollY;

    // Shadow on scroll
    nav.classList.toggle('scrolled', y > 10);

    // Back to top visibility
    if (backToTop) {
      backToTop.classList.toggle('visible', y > 400);
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      if (y >= section.offsetTop - 80) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ─── Mobile nav toggle ───────────────────────────────────────
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (
        navMobile.classList.contains('open') &&
        !navMobile.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMobile.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Scroll animations (IntersectionObserver) ────────────────
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ─── Smooth scroll ───────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
