// ========================================================
// PORTFOLIO JAVASCRIPT - FIXED VERSION
// ========================================================

/**
 * Initialize project modal with null checks and event delegation
 */
function initializeProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close');
  const projectCards = document.querySelectorAll('.project-card');

  // Add click event listeners to project cards
  projectCards.forEach((card) => {
    if (card) {
      card.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openProjectModal(card);
      });
      
      // Make the entire card clickable
      card.style.cursor = 'pointer';
    }
  });

  // Close modal on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeProjectModal();
    });
  }

  // Close modal when clicking outside of modal content
  if (modal) {
    modal.addEventListener('click', (event) => {
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent && event.target === modal) {
        event.preventDefault();
        closeProjectModal();
      }
    });
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/**
 * Open project modal with data from clicked card
 */
function openProjectModal(card) {
  const modal = document.getElementById('projectModal');

  if (!modal) return;

  try {
    // Extract project data
    const projectTitle = card.getAttribute('data-project-title') || card.querySelector('h3')?.textContent || 'Untitled Project';
    const projectDescription = card.getAttribute('data-project-description') || card.querySelector('p')?.textContent || 'No description available';
    const projectImage = card.getAttribute('data-project-image') || card.querySelector('img')?.src || '';
    const projectTechnology = card.getAttribute('data-project-technology') || 'Not specified';

    // Update modal content
    modal.querySelector('.modal-title').textContent = projectTitle;
    modal.querySelector('.modal-description').textContent = projectDescription;
    modal.querySelector('.modal-technology').textContent = `Technologies: ${projectTechnology}`;
    
    const modalImage = modal.querySelector('.modal-image');
    modalImage.src = projectImage;
    modalImage.alt = projectTitle;
    modalImage.onerror = function() {
      this.src = 'https://via.placeholder.com/600x400/1a1a1a/ffb400?text=' + encodeURIComponent(projectTitle);
    };

    // Display modal
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
 * Enhanced Code Particles Initialization with Better Distribution
 */
function initializeEnhancedCodeParticles() {
  const codeParticlesContainer = document.querySelector('.code-particles');
  
  if (!codeParticlesContainer) return;
  
  // Clear existing particles
  codeParticlesContainer.innerHTML = '';
  
  // Programming keywords
  const codeKeywords = [
    'Flutter', 'Dart', 'Widget', 'Material', 'Provider', 'Stateful',
    'Stateless', 'async', 'await', 'Future', 'Stream', 'Firebase',
    'HTML5', 'CSS3', 'JavaScript', 'ES6+', 'Bootstrap', 'Responsive',
    'Java', 'Python', 'C++', 'OOP', 'API', 'REST', 'JSON',
    'Git', 'GitHub', 'VS Code', 'Android Studio', 'SQLite', 'MySQL',
    '< />', '{ }', '[ ]', '()', '=>', '::', '...', '?.', '??',
    'const', 'let', 'var', 'function', 'class', 'import', 'export'
  ];
  
  // Create 35 particles for better spacing
  const particleCount = 35;
  
  // Pre-defined grid positions for even distribution
  const gridPositions = [];
  const gridSize = 6; // 6x6 grid for better coverage
  const cellWidth = 100 / gridSize;
  const cellHeight = 100 / gridSize;
  
  // Generate grid positions
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * cellWidth + (Math.random() * cellWidth * 0.6 + cellWidth * 0.2);
      const y = row * cellHeight + (Math.random() * cellHeight * 0.6 + cellHeight * 0.2);
      gridPositions.push({ x, y });
    }
  }
  
  // Shuffle positions
  for (let i = gridPositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gridPositions[i], gridPositions[j]] = [gridPositions[j], gridPositions[i]];
  }
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('span');
    
    // Get keyword
    const keyword = codeKeywords[Math.floor(Math.random() * codeKeywords.length)];
    particle.textContent = keyword;
    
    // Use grid position for even distribution
    const gridPos = gridPositions[i % gridPositions.length];
    const startX = gridPos.x;
    const startY = gridPos.y;
    
    // Calculate end position (opposite side for diagonal movement)
    const endX = 100 - startX + (Math.random() * 40 - 20);
    const endY = 100 - startY + (Math.random() * 40 - 20);
    
    // Random properties
    const sizeFactor = 0.3 + Math.random() * 0.7;
    const opacity = 0.08 + Math.random() * 0.17; // Very subtle
    const duration = 25 + Math.random() * 20;
    const delay = Math.random() * 15;
    
    // Set CSS custom properties
    particle.style.setProperty('--start-x', startX);
    particle.style.setProperty('--start-y', startY);
    particle.style.setProperty('--end-x', endX);
    particle.style.setProperty('--end-y', endY);
    particle.style.setProperty('--size-factor', sizeFactor);
    particle.style.setProperty('--opacity', opacity);
    
    // Assign color
    if (keyword.includes('Flutter') || keyword.includes('Dart') || keyword.includes('Widget')) {
      particle.style.color = '#4ec9b0';
    } else if (keyword.includes('HTML') || keyword.includes('<')) {
      particle.style.color = '#f44747';
    } else if (keyword.includes('CSS') || keyword.includes('Style')) {
      particle.style.color = '#ce9178';
    } else if (keyword.includes('JavaScript') || keyword.includes('JS')) {
      particle.style.color = '#569cd6';
    } else if (keyword.includes('Java') || keyword.includes('Python') || keyword.includes('C++')) {
      particle.style.color = '#9cdcfe';
    } else if (keyword.match(/[{}()[\]<>;:.,?!=+-\/*&|^~]/)) {
      particle.style.color = '#ffb400';
    } else {
      const goldVariations = ['#ffb400', '#ffca56', '#ffd166'];
      particle.style.color = goldVariations[Math.floor(Math.random() * goldVariations.length)];
    }
    
    // Set smooth animation
    const easing = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    particle.style.animation = `
      floatCodeParticle ${duration}s ${easing} infinite ${delay}s,
      subtlePulse ${3 + Math.random() * 2}s ease-in-out infinite alternate
    `;
    
    // Add to container
    codeParticlesContainer.appendChild(particle);
  }
}

/**
 * Hamburger Menu Toggle
 */
function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Prevent body scrolling when menu is open on mobile
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking a link
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
 * Smooth Scrolling for Navigation
 */
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks && navLinks.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        // Calculate scroll position
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        // Smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Contact Form Handling
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
 * Initialize All Components
 */
function initializeAll() {
  console.log('Portfolio Initializing...');
  
  // Initialize all components
  initializeProjectModal();
  initializeHamburgerMenu();
  initializeEnhancedCodeParticles();
  initializeSmoothScrolling();
  initializeContactForm();
  
  console.log('Portfolio Initialized Successfully!');
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  initializeAll();
}
