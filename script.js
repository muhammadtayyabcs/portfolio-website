// ========================================================
// PORTFOLIO JAVASCRIPT - PERFECT PARTICLE DISTRIBUTION
// ========================================================

/**
 * Initialize project modal
 */
function initializeProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close');
  const projectCards = document.querySelectorAll('.project-card');

  // Make project cards clickable
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

  // Close modal handlers
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
  const modal = document.getElementById('projectModal');
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
    document.body.style.position = 'fixed';
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
 * Enhanced Code Particles with Perfect Left-Right Balance
 */
function initializeEnhancedCodeParticles() {
  const codeParticlesContainer = document.querySelector('.code-particles');
  
  if (!codeParticlesContainer) return;
  
  // Clear existing particles
  codeParticlesContainer.innerHTML = '';
  
  // Tech Stack with Categories and Colors
  const techStack = [
    // Flutter/Dart (Green-Blue)
    { keyword: 'Flutter', category: 'flutter', color: '#4ec9b0' },
    { keyword: 'Dart', category: 'dart', color: '#2ab7a9' },
    { keyword: 'Widget', category: 'flutter', color: '#3dc4b8' },
    { keyword: 'Material', category: 'flutter', color: '#4ad0c4' },
    { keyword: 'Provider', category: 'flutter', color: '#58dcd0' },
    
    // Mobile Dev (Green)
    { keyword: 'Android', category: 'mobile', color: '#34a853' },
    { keyword: 'iOS', category: 'mobile', color: '#000000' },
    { keyword: 'Cross-platform', category: 'mobile', color: '#42b845' },
    
    // HTML (Red)
    { keyword: 'HTML5', category: 'html', color: '#f44747' },
    { keyword: '<div>', category: 'html', color: '#ff5555' },
    { keyword: '<section>', category: 'html', color: '#ff6363' },
    
    // CSS (Brown-Orange)
    { keyword: 'CSS3', category: 'css', color: '#ce9178' },
    { keyword: 'Flexbox', category: 'css', color: '#d69f86' },
    { keyword: 'Grid', category: 'css', color: '#dead94' },
    
    // JavaScript (Blue)
    { keyword: 'JavaScript', category: 'js', color: '#569cd6' },
    { keyword: 'ES6+', category: 'js', color: '#64aade' },
    { keyword: 'TypeScript', category: 'js', color: '#72b8e6' },
    
    // Java (Orange)
    { keyword: 'Java', category: 'java', color: '#f89820' },
    { keyword: 'Spring', category: 'java', color: '#ffa62e' },
    
    // Python (Blue)
    { keyword: 'Python', category: 'python', color: '#3776ab' },
    { keyword: 'Django', category: 'python', color: '#4584b9' },
    
    // C++ (Dark Blue)
    { keyword: 'C++', category: 'cpp', color: '#00599c' },
    
    // Database (Teal)
    { keyword: 'MySQL', category: 'database', color: '#00618a' },
    { keyword: 'SQLite', category: 'database', color: '#0e6f98' },
    { keyword: 'Firebase', category: 'database', color: '#1c7da6' },
    
    // Git/Version Control (Orange-Red)
    { keyword: 'Git', category: 'git', color: '#f14e32' },
    { keyword: 'GitHub', category: 'git', color: '#ff5c40' },
    
    // Web (Light Blue)
    { keyword: 'Web Dev', category: 'web', color: '#4285f4' },
    { keyword: 'REST API', category: 'web', color: '#5093fc' },
    
    // Tools (Red)
    { keyword: 'VS Code', category: 'tool', color: '#ea4335' },
    { keyword: 'Android Studio', category: 'tool', color: '#f85143' },
    
    // Symbols (Gold - Brand Color)
    { keyword: '< />', category: 'symbol', color: '#ffb400' },
    { keyword: '{ }', category: 'symbol', color: '#ffc228' },
    { keyword: '[ ]', category: 'symbol', color: '#ffd050' },
    { keyword: '( )', category: 'symbol', color: '#ffde78' },
    { keyword: '=>', category: 'symbol', color: '#ffeca0' },
    
    // Programming Concepts
    { keyword: 'async', category: 'flutter', color: '#4ec9b0' },
    { keyword: 'await', category: 'flutter', color: '#2ab7a9' },
    { keyword: 'Future', category: 'flutter', color: '#3dc4b8' },
    { keyword: 'Stream', category: 'flutter', color: '#4ad0c4' },
    { keyword: 'const', category: 'js', color: '#569cd6' },
    { keyword: 'let', category: 'js', color: '#64aade' },
    { keyword: 'var', category: 'js', color: '#72b8e6' },
  ];
  
  // Create 80 particles (40 left, 40 right)
  const particleCount = 80;
  
  // Left side particles
  for (let i = 0; i < particleCount/2; i++) {
    createParticle(i, techStack, 'left');
  }
  
  // Right side particles
  for (let i = particleCount/2; i < particleCount; i++) {
    createParticle(i, techStack, 'right');
  }
  
  console.log(`Created ${particleCount} perfectly balanced particles`);
  
  // Helper function
  function createParticle(index, techStack, side) {
    const particle = document.createElement('span');
    const tech = techStack[Math.floor(Math.random() * techStack.length)];
    particle.textContent = tech.keyword;
    particle.classList.add(tech.category);
    
    // Position calculation
    let startX, startY, endX, endY;
    
    if (side === 'left') {
      startX = 5 + Math.random() * 35;
      startY = 10 + Math.random() * 80;
      endX = 60 + Math.random() * 35;
      endY = 10 + Math.random() * 80;
    } else {
      startX = 60 + Math.random() * 35;
      startY = 10 + Math.random() * 80;
      endX = 5 + Math.random() * 35;
      endY = 10 + Math.random() * 80;
    }
    
    // Random properties
    const sizeFactor = 0.4 + Math.random() * 0.6;
    const opacity = 0.08 + Math.random() * 0.17;
    const duration = 25 + Math.random() * 25;
    const delay = Math.random() * 20;
    
    // Set CSS properties
    particle.style.setProperty('--start-x', startX);
    particle.style.setProperty('--start-y', startY);
    particle.style.setProperty('--end-x', endX);
    particle.style.setProperty('--end-y', endY);
    particle.style.setProperty('--size-factor', sizeFactor);
    particle.style.setProperty('--opacity', opacity);
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);
    particle.style.color = tech.color;
    
    // Animation
    const easing = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    particle.style.animation = `
      floatCodeParticle ${duration}s ${easing} infinite ${delay}s,
      subtlePulse ${3 + Math.random() * 3}s ease-in-out infinite alternate ${Math.random() * 2}s
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
          hamburger.classList.remove('active');
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
  const contactForm = document.querySelector('.contact-form');
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
 * Initialize Everything
 */
function initializeAll() {
  console.log('Initializing Portfolio...');
  
  initializeProjectModal();
  initializeHamburgerMenu();
  initializeEnhancedCodeParticles();
  initializeSmoothScrolling();
  initializeContactForm();
  
  console.log('Portfolio Initialized!');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  initializeAll();
}
