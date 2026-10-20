
(function () {
  'use strict';

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const mobileBreakpoint = window.matchMedia('(max-width: 820px)');

  // Responsive navigation.
  if (menuToggle && nav) {
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');

      nav.classList.remove('is-open');
      document.body.classList.remove('menu-is-open');
    };

    const openMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close navigation');

      nav.classList.add('is-open');
      document.body.classList.add('menu-is-open');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen =
        menuToggle.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the menu after a navigation link is selected.
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close the menu with Escape.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Close when the user clicks outside the menu.
    document.addEventListener('click', (event) => {
      const isOpen =
        menuToggle.getAttribute('aria-expanded') === 'true';

      if (
        isOpen &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Do not leave the mobile menu state active on desktop.
    const handleBreakpointChange = () => {
      if (!mobileBreakpoint.matches) {
        closeMenu();
      }
    };

    if (mobileBreakpoint.addEventListener) {
      mobileBreakpoint.addEventListener(
        'change',
        handleBreakpointChange
      );
    } else {
      // Compatibility with older browsers.
      window.addEventListener('resize', handleBreakpointChange);
    }
  }

  // Automatically update the copyright year.
  const yearElement = document.querySelector('[data-current-year]');

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  // Scroll reveal animations.
  const revealItems = document.querySelectorAll('.reveal');

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (
    'IntersectionObserver' in window &&
    !reducedMotion
  ) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px'
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    // Content remains visible if animations are unsupported
    // or the visitor prefers reduced motion.
    revealItems.forEach((item) => {
      item.classList.add('is-visible');
    });
  }

  // Open a FAQ when a direct link uses its section ID.
  if (window.location.hash) {
    try {
      const id = decodeURIComponent(
        window.location.hash.slice(1)
      );

      const target = document.getElementById(id);

      if (target && target.tagName === 'DETAILS') {
        target.open = true;
      }
    } catch (error) {
      // Ignore malformed URL fragments without breaking the page.
    }
  }
})();
