document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Accessible hamburger menu toggle
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');

  if (navContainer && navLinks) {
    const hamburger = document.createElement('button');
    hamburger.type = 'button';
    hamburger.classList.add('hamburger');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'navLinks');
    hamburger.style.border = '0';
    hamburger.style.background = 'transparent';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    navContainer.insertBefore(hamburger, navLinks);

    const mobileViewport = window.matchMedia('(max-width: 768px)');
    const background = document.querySelectorAll('main, footer');
    const setMenuOpen = (isOpen) => {
      document.documentElement.classList.toggle('mobile-menu-open', isOpen);
      background.forEach((element) => { element.inert = isOpen; });
      hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      hamburger.classList.toggle('active', isOpen);
      navLinks.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    mobileViewport.addEventListener('change', () => setMenuOpen(false));
    navContainer.querySelector('.logo').addEventListener('click', () => setMenuOpen(false));

    hamburger.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('active'));
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.focus();
        setMenuOpen(false);
      }
    });
  }

  const sectionLinks = [...navLinks.querySelectorAll('li:not(.drawer-actions) > a[href^="#"]')];
  const sections = sectionLinks.map(link => document.querySelector(link.hash));
  const navbar = document.querySelector('.navbar');
  let frame = 0;
  function updateCurrentSection() {
    frame = 0;
    if (document.documentElement.classList.contains('mobile-menu-open')) return;
    const marker = navbar.offsetHeight + 36;
    let active = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= marker) active = index;
    });
    sectionLinks.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleSectionUpdate() {
    if (!frame) frame = requestAnimationFrame(updateCurrentSection);
  }
  window.addEventListener('scroll', scheduleSectionUpdate, {passive: true});
  window.addEventListener('resize', scheduleSectionUpdate);
  window.addEventListener('pageshow', scheduleSectionUpdate);
  updateCurrentSection();
  // Hero: rotating headline words with exact dynamic box width
  const rotateWrap = document.getElementById('heroRotateWrap');
  const rotateWords = document.querySelectorAll('.hero-rotate-word');

  if (rotateWrap && rotateWords.length > 0) {
    let activeIndex = 0;

    const syncRotateWidth = (wordEl) => {
      const style = window.getComputedStyle(rotateWrap);
      const padLeft = parseFloat(style.paddingLeft) || 0;
      const padRight = parseFloat(style.paddingRight) || 0;
      const borderLeft = parseFloat(style.borderLeftWidth) || 0;
      const borderRight = parseFloat(style.borderRightWidth) || 0;
      const exactWidth = Math.ceil(wordEl.scrollWidth + padLeft + padRight + borderLeft + borderRight);
      rotateWrap.style.width = `${exactWidth}px`;
    };

    // Set initial width immediately and again once web fonts finish loading
    syncRotateWidth(rotateWords[0]);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => syncRotateWidth(rotateWords[activeIndex]));
    }
    window.addEventListener('resize', () => syncRotateWidth(rotateWords[activeIndex]), { passive: true });

    if (rotateWords.length > 1 && !prefersReducedMotion) {
      setInterval(() => {
        const current = rotateWords[activeIndex];
        const nextIndex = (activeIndex + 1) % rotateWords.length;
        const next = rotateWords[nextIndex];

        current.classList.remove('is-active');
        current.classList.add('is-exit');

        next.classList.remove('is-exit');
        void next.offsetWidth;
        next.classList.add('is-active');
        syncRotateWidth(next);

        setTimeout(() => {
          current.classList.remove('is-exit');
        }, 550);

        activeIndex = nextIndex;
      }, 2500);
    }
  }

  // Hero: silky mouse-follow parallax on desktop
  const heroSection = document.querySelector('.hero');
  if (heroSection && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      heroSection.style.setProperty('--mx', currentX.toFixed(3));
      heroSection.style.setProperty('--my', currentY.toFixed(3));

      if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) {
        rafId = requestAnimationFrame(animateParallax);
      } else {
        rafId = null;
      }
    };

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      targetX = (relX / rect.width - 0.5) * 2;
      targetY = (relY / rect.height - 0.5) * 2;
      heroSection.style.setProperty('--cx', `${relX.toFixed(1)}px`);
      heroSection.style.setProperty('--cy', `${relY.toFixed(1)}px`);
      if (!rafId) rafId = requestAnimationFrame(animateParallax);
    });

    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = requestAnimationFrame(animateParallax);
    });

    // Magnetic hover pull on primary hero CTA buttons
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.16;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
        btn.style.transform = `translate(${dx.toFixed(1)}px, ${(dy - 3).toFixed(1)}px) scale(1.02)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // Hero: count-up stats animation
  const statCounters = document.querySelectorAll('.hero-stats strong[data-count]');
  if (statCounters.length > 0 && !prefersReducedMotion) {
    const animateCounter = (el) => {
      const target = Number(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 900;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.max(1, Math.round(eased * target));
        el.textContent = `${value}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statCounters.forEach((el) => statsObserver.observe(el));
  }

  // Scroll reveal for redesigned sections (About, etc.)
  const revealEls = document.querySelectorAll('.reveal-on-scroll');
  if (revealEls.length > 0) {
    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach((el) => revealObserver.observe(el));
    }
  }

  // Services: Kinetic Editorial Rows (hover-to-expand on desktop, tap-to-toggle on mobile)
  const serviceRows = document.querySelectorAll('[data-service-row]');
  if (serviceRows.length > 0) {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    const openRow = (targetRow) => {
      serviceRows.forEach((row) => {
        const isTarget = row === targetRow;
        row.classList.toggle('is-open', isTarget);
        const btn = row.querySelector('.srv-row-trigger');
        if (btn) btn.setAttribute('aria-expanded', String(isTarget));
      });
    };

    serviceRows.forEach((row) => {
      const trigger = row.querySelector('.srv-row-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const alreadyOpen = row.classList.contains('is-open');
        if (alreadyOpen && !isFinePointer) {
          row.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          openRow(row);
        }
      });

      if (isFinePointer) {
        row.addEventListener('mouseenter', () => openRow(row));
      }
    });
  }

  // Open WhatsApp with the demo request.
  const form = document.getElementById('demoForm');
  const demoStatus = document.getElementById('demoStatus');

  if (form) {
    form.addEventListener('input', (event) => {
      event.target.setCustomValidity('');
      demoStatus.textContent = '';
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      for (const field of form.querySelectorAll('[required]')) {
        if (!field.value.trim()) {
          field.setCustomValidity('Please fill out this field.');
          field.reportValidity();
          return;
        }
      }

      const data = new FormData(form);
      const name = data.get('name').trim();
      const businessType = data.get('businessType').trim();
      const message = data.get('message').trim();
      const summary =
        `Free Demo Request\n\nName: ${name}\nBusiness Type: ${businessType}\n\nProject Details:\n${message}`;

      window.open(`https://wa.me/923359273944?text=${encodeURIComponent(summary)}`, '_blank', 'noopener,noreferrer');
      demoStatus.textContent = 'Send the prefilled message in WhatsApp to request your demo.';
      form.reset();
    });
  }

  // Navbar elevation on scroll

  if (navbar) {
    const updateNavbar = () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  // Project card animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe skill categories for animation
  document.querySelectorAll('.skill-category').forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(30px)';
    skill.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(skill);
  });

  // Remove cursor pointer from skill categories to indicate they're not clickable
  document.querySelectorAll('.skill-category').forEach(category => {
    category.style.cursor = 'default';
  });

  // FAQ Accordion toggle
  const faqItems = document.querySelectorAll('[data-faq-item]');
  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isCurrentlyOpen = item.classList.contains('is-open');
        faqItems.forEach((other) => {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-trigger');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isCurrentlyOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // Projects Filtering and Animation
  function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    const gallery = document.querySelector('.project-grid');
    const controls = document.querySelector('.project-controls');
    const [previous, next] = controls.querySelectorAll('button');
    const position = controls.querySelector('.project-position');
    const mobile = window.matchMedia('(max-width: 768px)');
    let visible = [...projectCards];
    let current = -1;

    function select(index) {
      if (index === current) return;
      current = index;
      projectCards.forEach(card => card.classList.toggle('current-project', card === visible[index]));
      previous.disabled = index <= 0;
      next.disabled = index >= visible.length - 1;
      position.textContent = (index + 1) + ' / ' + visible.length;
    }

    function offset(card) {
      return card.offsetLeft + card.offsetWidth / 2 - gallery.clientWidth / 2;
    }

    function updateFromScroll() {
      if (!mobile.matches) return;
      let closest = 0;
      visible.forEach((card, i) => {
        if (Math.abs(offset(card) - gallery.scrollLeft) < Math.abs(offset(visible[closest]) - gallery.scrollLeft)) closest = i;
      });
      select(closest);
    }

    controls.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      const card = visible[current + Number(button.dataset.projectStep)];
      if (card) gallery.scrollTo({left: offset(card), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    });
    gallery.addEventListener('scroll', updateFromScroll, {passive: true});
    new ResizeObserver(updateFromScroll).observe(gallery);
    gallery.classList.add('enhanced');
    select(0);

    filterButtons.forEach((button) => {
      button.addEventListener('click', function () {
        filterButtons.forEach((btn) => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        const filterValue = this.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const categories = (card.getAttribute('data-category') || '').split(/\s+/);
          const matches = filterValue === 'all' || categories.includes(filterValue);

          card.hidden = !matches;
        });
        visible = [...projectCards].filter(card => !card.hidden);
        gallery.scrollLeft = 0;
        current = -1;
        select(0);
      });
    });
  }

  // Initialize projects filter if filter buttons exist
  if (document.querySelectorAll('.filter-btn').length > 0) {
    initProjectsFilter();
  }


  const modal = document.getElementById('projectModal');
  let opener;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      const project = card.dataset;
      opener = card.querySelector('.preview-trigger');
      const image = modal.querySelector('#modalProjectImage');
      image.src = project.projectImage;
      image.alt = project.projectTitle;
      modal.querySelector('#modalProjectTitle').textContent = project.projectTitle;
      modal.querySelector('.modal-description').textContent = project.projectDescription;
      modal.querySelector('.modal-technology').textContent = 'Technologies: ' + project.projectTechnology;
      modal.querySelector('.modal-link').href = project.projectLink;
      modal.showModal();
    });
  });

  modal.querySelector('.close-project-modal').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    if (event.target === modal) modal.close();
  });
  modal.querySelector('#modalDemoBtn').addEventListener('click', () => modal.close('demo'));
  modal.addEventListener('close', () => {
    if (modal.returnValue === 'demo') {
      document.querySelector('#demoForm input').focus({ preventScroll: true });
    } else {
      opener?.focus({ preventScroll: true });
    }
    modal.returnValue = '';
  });
});
