// ========================================================
// PORTFOLIO JAVASCRIPT - ENHANCED PARTICLES & INTERACTIONS
// ========================================================

/**
 * Initialize project modal
 */
function initializeProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close');
  const projectCards = document.querySelectorAll('. project-card');

  projectCards.forEach((card) => {
    if (card) {
      card.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openProjectModal(card);
      });
      card.style.cursor = 'pointer';
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeProjectModal();
    });
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/**
 * Open project modal
 */
function openProjectModal(card) {
  const modal = document. getElementById('projectModal');
  if (!modal) return;

  try {
    const projectTitle = card.getAttribute('data-project-title') || card.querySelector('h3')?.textContent || 'Untitled Project';
    const projectDescription = card.getAttribute('data-project-description') || card.querySelector('p')?.textContent || 'No description available';
    const projectImage = card.getAttribute('data-project-image') || card.querySelector('img')?.src || '';
    const projectTechnology = card.getAttribute('data-project-technology') || 'Not specified';

    modal.querySelector('.modal-title').textContent = projectTitle;
    modal.querySelector('.modal-description').textContent = projectDescription;
    modal.querySelector('.modal-technology').textContent = `Technologies: ${projectTechnology}`;
    
    const modalImage = modal.querySelector('.modal-image');
    modalImage.src = projectImage;
    modalImage.alt = projectTitle;
    modalImage.onerror = function() {
      this.src = 'https://via.placeholder.com/600x400/1a1a1a/ffb400?text=' + encodeURIComponent(projectTitle);
    };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document. body.style.position = 'fixed';
    document.body.style.width = '100%';
  } catch (error) {
    console.error('Error opening project modal:', error);
  }
}

/**
 * Close project modal
 */
function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
}

/**
 * Enhanced Code Particles with Perfect Distribution
 * 75 total particles with balanced left, center, and right placement
 */
function initializeEnhancedCodeParticles() {
  const codeParticlesContainer = document.querySelector('.code-particles');
  
  if (!codeParticlesContainer) return;
  
  // Clear existing particles
  codeParticlesContainer.innerHTML = '';
  
  // Tech Stack with Categories and Colors
  const techStack = [
    // Flutter/Dart (Teal)
    { keyword: 'Flutter', category: 'flutter', color: '#4ec9b0' },
    { keyword: 'Dart', category: 'dart', color: '#2ab7a9' },
    { keyword: 'Widget', category: 'flutter', color: '#3dc4b8' },
    { keyword: 'StatefulWidget', category: 'flutter', color: '#4ec9b0' },
    { keyword: 'async', category: 'dart', color: '#2ab7a9' },
    { keyword: 'await', category: 'dart', color: '#2ab7a9' },

    // Web (HTML, CSS, JS)
    { keyword: '<html>', category: 'html', color: '#f44747' },
    { keyword: '<body>', category: 'html', color: '#f44747' },
    { keyword: '<div>', category: 'html', color: '#f44747' },
    { keyword: '<script>', category: 'js', color: '#569cd6' },
    { keyword: 'const', category: 'js', color: '#569cd6' },
    { keyword: 'function()', category: 'js', color: '#569cd6' },
    { keyword: '() => {}', category: 'js', color: '#569cd6' },
    { keyword: '. css', category: 'css', color: '#ce9178' },
    { keyword: '@media', category: 'css', color: '#ce9178' },

    // Backend (Java, Python)
    { keyword: 'class', category: 'java', color: '#f89820' },
    { keyword: 'public', category: 'java', color: '#f89820' },
    { keyword: 'private', category: 'java', color:  '#f89820' },
    { keyword: 'return;', category: 'java', color: '#f89820' },
    { keyword: 'import', category: 'python', color: '#3776ab' },
    { keyword:  'def', category: 'python', color: '#3776ab' },
    { keyword: 'if', category: 'python', color:  '#3776ab' },

    // Tools & Symbols
    { keyword: '{', category: 'symbol', color: '#ffb400' },
    { keyword: '}', category: 'symbol', color: '#ffb400' },
    { keyword: '[', category: 'symbol', color: '#ffb400' },
    { keyword: ']', category: 'symbol', color: '#ffb400' },
    { keyword: '==', category: 'symbol', color: '#ffb400' },
    { keyword: '!=', category: 'symbol', color: '#ffb400' },
    { keyword: '=>', category: 'symbol', color: '#569cd6' },
    { keyword: '... ', category: 'symbol', color: '#ffb400' },
    { keyword: 'null', category: 'symbol', color: '#ffb400' },
  ];

  // Total particles:  75 for better coverage
  const totalParticles = 75;
  const leftParticles = 25;    // Left side (0-24)
  const centerParticles = 25;  // Center (25-49)
  const rightParticles = 25;   // Right side (50-74)

  // Create particles with balanced distribution
  for (let i = 0; i < totalParticles; i++) {
    const particle = document.createElement('span');
    const tech = techStack[Math.floor(Math.random() * techStack.length)];
    particle.textContent = tech.keyword;
    particle.classList.add(tech.category);

    let startX, startY, endX, endY;

    // LEFT SIDE PARTICLES (5-20% width)
    if (i < leftParticles) {
      startX = 5 + Math.random() * 15;
      startY = 5 + Math.random() * 90;
      endX = 20 + Math.random() * 10;
      endY = 5 + Math.random() * 90;
    }
    // CENTER PARTICLES (30-70% width, full height)
    else if (i < leftParticles + centerParticles) {
      startX = 40 + Math.random() * 20;
      startY = -10 + Math.random() * 110;
      endX = 40 + Math.random() * 20;
      endY = -10 + Math.random() * 110;
    }
    // RIGHT SIDE PARTICLES (75-95% width)
    else {
      startX = 75 + Math.random() * 20;
      startY = 5 + Math.random() * 90;
      endX = 60 + Math.random() * 15;
      endY = 5 + Math.random() * 90;
    }

    // Random animation properties
    const sizeFactor = 0.3 + Math.random() * 0.7;
    const opacity = 0.05 + Math.random() * 0.15;
    const duration = 20 + Math.random() * 30; // 20-50 seconds
    const delay = Math.random() * 15;

    // Set CSS custom properties
    particle.style.setProperty('--start-x', startX);
    particle.style.setProperty('--start-y', startY);
    particle.style.setProperty('--end-x', endX);
    particle.style. setProperty('--end-y', endY);
    particle.style.setProperty('--size-factor', sizeFactor);
    particle.style.setProperty('--opacity', opacity);
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);

    // Apply smooth animation with cubic-bezier easing
    const easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    particle.style.animation = `
      floatCodeParticle ${duration}s ${easing} infinite ${delay}s,
      smoothPulse ${2 + Math.random() * 2}s ease-in-out infinite alternate ${Math.random() * 1}s
    `;

    codeParticlesContainer.appendChild(particle);
  }
}

/**
 * Hamburger Menu
 */
function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Smooth Scrolling
 */
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks && navLinks.classList.contains('active')) {
          hamburger.classList. remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Contact Form
 */
function initializeContactForm() {
  const contactForm = document.querySelector('. contact-form');
  const popup = document.getElementById('popup');
  
  if (contactForm && popup) {
    contactForm.addEventListener('submit', function() {
      setTimeout(() => {
        popup.style.display = 'block';
        popup.style.opacity = '1';
        
        setTimeout(() => {
          popup.style.opacity = '0';
          setTimeout(() => {
            popup.style.display = 'none';
          }, 500);
        }, 3000);
      }, 500);
    });
  }
}

/**
 * Reinitialize particles on window resize (for responsive behavior)
 */
function handleWindowResize() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initializeEnhancedCodeParticles();
    }, 250);
  });
}

/**
 * Initialize Everything
 */
function initializeAll() {
  console.log('🚀 Initializing Portfolio.. .');
  
  initializeProjectModal();
  initializeHamburgerMenu();
  initializeEnhancedCodeParticles();
  initializeSmoothScrolling();
  initializeContactForm();
  handleWindowResize();
  
  console.log('✅ Portfolio Initialized Successfully!');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  initializeAll();
}
