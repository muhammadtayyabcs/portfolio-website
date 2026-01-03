// ========================================================
// PORTFOLIO JAVASCRIPT - ENHANCED WITH SMOOTH PARTICLES
// ========================================================

/**
 * Initialize project modal with null checks and event delegation
 */
function initializeProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close');
  const projectCards = document.querySelectorAll('.project-card');

  console.log('Initializing project modal...');
  console.log('Modal found:', !!modal);
  console.log('Close button found:', !!closeBtn);
  console.log('Project cards found:', projectCards.length);

  // Null checks for modal elements
  if (!modal) {
    console.warn('Project modal element not found in DOM');
    return;
  }

  if (!closeBtn) {
    console.warn('Modal close button not found in DOM');
  }

  if (projectCards.length === 0) {
    console.warn('No project cards found in DOM');
  }

  // Add click event listeners to project cards
  projectCards.forEach((card, index) => {
    if (card) {
      console.log(`Adding click listener to card ${index + 1}`);
      card.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openProjectModal(card);
      });
      
      // Also make the entire card clickable
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
  modal.addEventListener('click', (event) => {
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent && event.target === modal) {
      event.preventDefault();
      closeProjectModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/**
 * Open project modal with data from clicked card
 * @param {HTMLElement} card - The project card element
 */
function openProjectModal(card) {
  const modal = document.getElementById('projectModal');

  console.log('Opening modal for card:', card);

  // Null check for modal
  if (!modal) {
    console.error('Project modal not found');
    return;
  }

  try {
    // Extract project data from card attributes with fallback values
    const projectTitle = card.getAttribute('data-project-title') || card.querySelector('h3')?.textContent || 'Untitled Project';
    const projectDescription = card.getAttribute('data-project-description') || card.querySelector('p')?.textContent || 'No description available';
    const projectImage = card.getAttribute('data-project-image') || card.querySelector('img')?.src || '';
    const projectLink = card.getAttribute('data-project-link') || 'https://github.com/muhammadtayyabcs';
    const projectTechnology = card.getAttribute('data-project-technology') || card.querySelector('.project-tech')?.textContent || 'Not specified';

    console.log('Project data:', { projectTitle, projectDescription, projectImage, projectLink, projectTechnology });

    // Get modal elements with null checks
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalImage = modal.querySelector('.modal-image');
    const modalLink = modal.querySelector('.modal-link');
    const modalTechnology = modal.querySelector('.modal-technology');

    // Update modal content safely
    if (modalTitle) {
      modalTitle.textContent = projectTitle;
    }

    if (modalDescription) {
      modalDescription.textContent = projectDescription;
    }

    if (modalImage && projectImage) {
      modalImage.src = projectImage;
      modalImage.alt = projectTitle;
      modalImage.onerror = function() {
        this.src = 'https://via.placeholder.com/600x400/1a1a1a/ffb400?text=' + encodeURIComponent(projectTitle);
      };
    }

    if (modalLink) {
      modalLink.href = projectLink;
      modalLink.innerHTML = '<i class="fab fa-github"></i> View Project on GitHub';
    }

    if (modalTechnology) {
      modalTechnology.textContent = `Technologies: ${projectTechnology}`;
    }

    // Display modal with smooth transition
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    document.body.style.position = 'fixed'; // Prevent background scroll
    document.body.style.width = '100%';
    
    console.log('Modal opened successfully');
  } catch (error) {
    console.error('Error opening project modal:', error);
  }
}

/**
 * Close project modal with proper cleanup
 */
function closeProjectModal() {
  const modal = document.getElementById('projectModal');

  console.log('Closing modal');

  // Null check for modal
  if (!modal) {
    console.error('Project modal not found');
    return;
  }

  try {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    document.body.style.position = '';
    document.body.style.width = '';
    console.log('Modal closed successfully');
  } catch (error) {
    console.error('Error closing project modal:', error);
  }
}

/**
 * Filter projects by technology
 * @param {string} technology - Technology filter keyword
 */
function filterProjectsByTechnology(technology) {
  const projectCards = document.querySelectorAll('.project-card');

  if (projectCards.length === 0) {
    console.warn('No project cards found to filter');
    return;
  }

  console.log(`Filtering projects by: ${technology}`);

  projectCards.forEach((card) => {
    if (!card) return;

    try {
      const cardTechnology = card.getAttribute('data-project-technology') || '';
      const matches = technology === 'all' || cardTechnology.toLowerCase().includes(technology.toLowerCase());

      card.style.display = matches ? 'block' : 'none';
    } catch (error) {
      console.error('Error filtering project card:', error);
    }
  });
}

/**
 * Search projects by title or description
 * @param {string} searchTerm - Search keyword
 */
function searchProjects(searchTerm) {
  const projectCards = document.querySelectorAll('.project-card');

  if (projectCards.length === 0) {
    console.warn('No project cards found to search');
    return;
  }

  const term = searchTerm.toLowerCase().trim();

  projectCards.forEach((card) => {
    if (!card) return;

    try {
      const title = (card.getAttribute('data-project-title') || '').toLowerCase();
      const description = (card.getAttribute('data-project-description') || '').toLowerCase();

      const matches = title.includes(term) || description.includes(term) || term === '';
      card.style.display = matches ? 'block' : 'none';
    } catch (error) {
      console.error('Error searching project card:', error);
    }
  });
}

/**
 * Initialize all project-related functionality on DOM ready
 */
function initializeProjects() {
  console.log('DOM ready, initializing projects...');
  
  // Initialize modal functionality
  initializeProjectModal();
  
  // Log success
  console.log('Projects initialized successfully');
}

/**
 * Enhanced Code Particles Initialization with Smooth Animations
 */
function initializeEnhancedCodeParticles() {
  const codeParticlesContainer = document.querySelector('.code-particles');
  
  if (!codeParticlesContainer) {
    console.warn('Code particles container not found');
    return;
  }
  
  console.log('Initializing enhanced code particles...');
  
  // Clear existing particles for dynamic generation
  codeParticlesContainer.innerHTML = '';
  
  // Programming language keywords for variety - Tech Stack focused
  const codeKeywords = [
    // Muhammad Tayyab's Tech Stack
    'Flutter', 'Dart', 'Widget', 'Material', 'Cupertino', 'Provider',
    'Stateful', 'Stateless', 'BuildContext', 'setState', 'async',
    'await', 'Future', 'Stream', 'Firebase', 'API', 'REST',
    
    // Web Technologies
    'HTML5', 'CSS3', 'JavaScript', 'ES6+', 'DOM', 'BOM', 'AJAX',
    'JSON', 'XML', 'Bootstrap', 'Responsive', 'Flexbox', 'Grid',
    'Animation', 'Transition', 'Transform', '@keyframes',
    
    // Mobile Development
    'Android', 'iOS', 'Cross-platform', 'Native', 'Hybrid', 'UI/UX',
    'Material Design', 'Human Interface', 'Navigation', 'Route',
    'Bloc', 'Cubit', 'Riverpod', 'GetX', 'State Management',
    
    // Programming Languages
    'Java', 'Python', 'C++', 'OOP', 'Polymorphism', 'Inheritance',
    'Encapsulation', 'Abstraction', 'Interface', 'Class', 'Object',
    'Method', 'Function', 'Constructor', 'Destructor',
    
    // Tools & Databases
    'Git', 'GitHub', 'VS Code', 'Android Studio', 'Xcode', 'Figma',
    'Adobe XD', 'MySQL', 'SQLite', 'Firestore', 'MongoDB', 'PostgreSQL',
    'JIRA', 'Trello', 'Slack', 'Postman', 'Swagger',
    
    // Development Concepts
    'Clean Code', 'SOLID', 'DRY', 'KISS', 'YAGNI', 'TDD', 'BDD',
    'Agile', 'Scrum', 'Sprint', 'Backlog', 'MVP', 'CI/CD', 'DevOps',
    'Microservices', 'Monolith', 'Serverless', 'Containerization',
    
    // Special Symbols (for visual interest)
    '< />', '{ }', '[ ]', '( )', '=>', '->', '::', '...', '??', '?.',
    '!', '?', ':', ';', '.', ',', '*', '/', '+', '-', '=', '==', '===',
    '!=', '!==', '>', '<', '>=', '<=', '&&', '||', '|', '&', '^', '~',
    
    // Project Types
    'E-commerce', 'Social Media', 'Weather App', 'Chat App', 'Todo List',
    'Expense Tracker', 'Fitness App', 'News App', 'Music Player', 'Gallery',
    'Calculator', 'Game', 'Educational', 'Healthcare', 'Finance', 'Travel',
  ];
  
  // Create 50 particles for better coverage and visual richness
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('span');
    
    // Random keyword - weighted towards Flutter/Dart (your expertise)
    let keyword;
    if (i < 15) {
      // First 15 particles are Flutter/Dart focused
      const flutterKeywords = ['Flutter', 'Dart', 'Widget', 'Material', 'Provider', 'Stateful', 
                              'Stateless', 'BuildContext', 'async', 'await', 'Future', 'Stream',
                              'Firebase', 'Android', 'iOS'];
      keyword = flutterKeywords[Math.floor(Math.random() * flutterKeywords.length)];
    } else if (i < 30) {
      // Next 15 are Web Technologies
      const webKeywords = ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive', 'Flexbox',
                          'Grid', 'Animation', 'JSON', 'API', 'REST', 'DOM', 'ES6+'];
      keyword = webKeywords[Math.floor(Math.random() * webKeywords.length)];
    } else {
      // Remaining are random from all keywords
      keyword = codeKeywords[Math.floor(Math.random() * codeKeywords.length)];
    }
    
    particle.textContent = keyword;
    
    // Random properties for unique animations
    const startX = Math.random() * 140 - 20; // -20 to 120vw
    const startY = Math.random() * 140 - 20; // -20 to 120vh
    const endX = Math.random() * 140 - 20;
    const endY = Math.random() * 140 - 20;
    const sizeFactor = 0.2 + Math.random() * 0.8; // 0.2 to 1.0
    const opacity = 0.15 + Math.random() * 0.35; // 0.15 to 0.5 (more subtle)
    const duration = 20 + Math.random() * 25; // 20 to 45 seconds (slower, smoother)
    const delay = Math.random() * 30; // 0 to 30 seconds delay
    const rotation = Math.random() * 720; // 0 to 720 degrees rotation
    
    // Set CSS custom properties
    particle.style.setProperty('--start-x', startX);
    particle.style.setProperty('--start-y', startY);
    particle.style.setProperty('--end-x', endX);
    particle.style.setProperty('--end-y', endY);
    particle.style.setProperty('--size-factor', sizeFactor);
    particle.style.setProperty('--opacity', opacity);
    particle.style.setProperty('--rotation', rotation);
    
    // Assign color based on keyword type with Muhammad Tayyab's theme
    if (keyword.includes('Flutter') || keyword.includes('Dart') || keyword.includes('Widget') || 
        keyword.includes('Material') || keyword.includes('Provider') || keyword.includes('State')) {
      // Flutter/Dart - Blue-green theme
      const flutterColors = ['#4ec9b0', '#52ceb6', '#56d3bc', '#5ad8c2'];
      particle.style.color = flutterColors[Math.floor(Math.random() * flutterColors.length)];
      particle.style.fontWeight = '700';
    } else if (keyword.includes('HTML') || keyword.includes('div') || keyword.includes('class') || 
               keyword.includes('span') || keyword.includes('header') || keyword.includes('footer')) {
      // HTML - Orange-red theme
      const htmlColors = ['#f44747', '#ff6b6b', '#ff5252', '#ff3838'];
      particle.style.color = htmlColors[Math.floor(Math.random() * htmlColors.length)];
    } else if (keyword.includes('CSS') || keyword.includes('responsive') || keyword.includes('animation') || 
               keyword.includes('flex') || keyword.includes('grid') || keyword.includes('media')) {
      // CSS - Brown-orange theme
      const cssColors = ['#ce9178', '#d6997f', '#dea186', '#e6a98d'];
      particle.style.color = cssColors[Math.floor(Math.random() * cssColors.length)];
    } else if (keyword.includes('JavaScript') || keyword.includes('JS') || keyword.includes('function') || 
               keyword.includes('const') || keyword.includes('let') || keyword.includes('var')) {
      // JavaScript - Blue theme
      const jsColors = ['#569cd6', '#5ea5de', '#66aee6', '#6eb7ee'];
      particle.style.color = jsColors[Math.floor(Math.random() * jsColors.length)];
    } else if (keyword.includes('Java') || keyword.includes('Python') || keyword.includes('C++')) {
      // Other Languages - Light blue theme
      const langColors = ['#9cdcfe', '#a4e4fe', '#acecfe', '#b4f4fe'];
      particle.style.color = langColors[Math.floor(Math.random() * langColors.length)];
    } else if (keyword.match(/[{}()[\]<>;:.,?!=+-\/*&|^~]/)) {
      // Symbols - Gold theme
      const symbolColors = ['#ffb400', '#ffbb1a', '#ffc233', '#ffc94d'];
      particle.style.color = symbolColors[Math.floor(Math.random() * symbolColors.length)];
    } else {
      // Default - Muhammad Tayyab's brand gold with variations
      const goldVariations = ['#ffb400', '#ffba14', '#ffc028', '#ffc63c', '#ffcc50', '#ffd264'];
      particle.style.color = goldVariations[Math.floor(Math.random() * goldVariations.length)];
    }
    
    // Add data attribute for interactivity
    particle.setAttribute('data-keyword', keyword);
    
    // Set animation with custom bezier curve for smooth movement
    const bezierCurve = 'cubic-bezier(0.4, 0.0, 0.2, 1)'; // Smooth easing
    particle.style.animation = `
      floatCodeParticle ${duration}s ${bezierCurve} infinite ${delay}s,
      pulseGlow ${4 + Math.random() * 3}s ease-in-out infinite alternate ${Math.random() * 2}s
    `;
    
    // Add subtle floating effect
    particle.style.willChange = 'transform, opacity';
    
    // Add hover effect for desktop
    if (window.innerWidth > 768) {
      particle.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
        this.style.opacity = '0.9';
        this.style.transform = 'scale(1.8)';
        this.style.textShadow = `
          0 0 25px currentColor,
          0 0 50px rgba(255, 255, 255, 0.5),
          0 0 75px rgba(255, 255, 255, 0.3)
        `;
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
      });
      
      particle.addEventListener('mouseleave', function() {
        this.style.zIndex = '';
        this.style.opacity = '';
        this.style.transform = '';
        this.style.textShadow = '';
        this.style.transition = '';
      });
    }
    
    // Add to container
    codeParticlesContainer.appendChild(particle);
  }
  
  console.log(`Enhanced code particles initialized with 50 dynamic particles`);
  
  // Add periodic refresh for variety (every 5 minutes)
  setInterval(() => {
    refreshRandomParticles();
  }, 300000); // 5 minutes
}

/**
 * Refresh random particles for ongoing variety
 */
function refreshRandomParticles() {
  const particles = document.querySelectorAll('.code-particles span');
  if (particles.length === 0) return;
  
  // Refresh 10 random particles
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * particles.length);
    const particle = particles[randomIndex];
    
    if (particle) {
      // Randomize some properties
      const newOpacity = 0.15 + Math.random() * 0.35;
      const newDuration = 20 + Math.random() * 25;
      const newDelay = Math.random() * 30;
      
      particle.style.setProperty('--opacity', newOpacity);
      particle.style.animationDuration = `${newDuration}s`;
      particle.style.animationDelay = `${newDelay}s`;
      
      // Random color shift
      const currentColor = particle.style.color;
      if (currentColor && Math.random() > 0.7) { // 30% chance to change color
        const colorVariations = [
          '#ffb400', '#4ec9b0', '#569cd6', '#ce9178', 
          '#9cdcfe', '#ff6b6b', '#52ceb6', '#5ea5de'
        ];
        particle.style.color = colorVariations[Math.floor(Math.random() * colorVariations.length)];
      }
    }
  }
  
  console.log('Refreshed 10 random code particles');
}

/**
 * Hamburger Menu Toggle
 */
function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    console.log('Initializing hamburger menu...');
    
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
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (event) => {
      if (window.innerWidth <= 768 && 
          navLinks.classList.contains('active') &&
          !hamburger.contains(event.target) &&
          !navLinks.contains(event.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    console.log('Hamburger menu initialized');
  } else {
    console.warn('Hamburger menu elements not found');
  }
}

/**
 * Smooth Scrolling for Navigation
 */
function initializeSmoothScrolling() {
  console.log('Initializing smooth scrolling...');
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just # or empty
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
        
        // Calculate scroll position (account for navbar height)
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        // Smooth scroll with easing
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        console.log(`Smooth scrolling to: ${href}`);
      }
    });
  });
  
  console.log('Smooth scrolling initialized');
}

/**
 * Contact Form Handling
 */
function initializeContactForm() {
  const contactForm = document.querySelector('.contact-form');
  const popup = document.getElementById('popup');
  
  if (contactForm && popup) {
    console.log('Initializing contact form...');
    
    contactForm.addEventListener('submit', function(e) {
      // For Formspree, we don't need to prevent default
      // Just show the popup after a short delay
      setTimeout(() => {
        popup.style.display = 'block';
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
        
        // Hide after 4 seconds with fade out
        setTimeout(() => {
          popup.style.opacity = '0';
          popup.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            popup.style.display = 'none';
          }, 500);
        }, 4000);
      }, 500);
      
      console.log('Contact form submitted - showing popup');
    });
    
    console.log('Contact form initialized');
  } else {
    console.warn('Contact form elements not found');
  }
}

/**
 * Lazy Load Images for Better Performance
 */
function initializeLazyLoading() {
  console.log('Initializing lazy loading...');
  
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  console.log(`Lazy loading initialized for ${images.length} images`);
}

/**
 * Active Navigation Link Highlighting
 */
function initializeActiveNav() {
  console.log('Initializing active navigation highlighting...');
  
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  function highlightNavLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      
      if (scrollY >= (sectionTop - navbarHeight - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Initial highlight
  highlightNavLink();
  
  // Highlight on scroll
  window.addEventListener('scroll', highlightNavLink);
  
  console.log('Active navigation highlighting initialized');
}

/**
 * Initialize All Components
 */
function initializeAll() {
  console.log('=========================================');
  console.log('MUHAMMAD TAYYAB PORTFOLIO - Initializing');
  console.log('=========================================');
  
  // Initialize all components in order
  initializeProjects();
  initializeHamburgerMenu();
  initializeEnhancedCodeParticles(); // Enhanced with smooth animations
  initializeSmoothScrolling();
  initializeContactForm();
  initializeLazyLoading();
  initializeActiveNav();
  
  // Add resize listener for responsive adjustments
  window.addEventListener('resize', function() {
    // Update particle interactions on resize
    const particles = document.querySelectorAll('.code-particles span');
    particles.forEach(particle => {
      // Remove all event listeners first
      const newParticle = particle.cloneNode(true);
      particle.parentNode.replaceChild(newParticle, particle);
    });
    
    // Reinitialize enhanced particles on large screens
    if (window.innerWidth > 768) {
      setTimeout(initializeEnhancedCodeParticles, 100);
    }
  });
  
  // Add scroll effect for hero section
  window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
      hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    }
  });
  
  console.log('=========================================');
  console.log('PORTFOLIO FULLY INITIALIZED!');
  console.log('=========================================');
  console.log('Developed by: Muhammad Tayyab');
  console.log('Tech Stack: Flutter, Dart, Web Development');
  console.log('Location: Pakistan');
  console.log('=========================================');
}

// ========================================================
// AUTO-INITIALIZATION
// ========================================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAll);
} else {
  // DOM already loaded
  initializeAll();
}

// ========================================================
// EXPORTS (For Module Systems)
// ========================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeProjectModal,
    openProjectModal,
    closeProjectModal,
    filterProjectsByTechnology,
    searchProjects,
    initializeProjects,
    initializeEnhancedCodeParticles,
    initializeHamburgerMenu,
    initializeSmoothScrolling,
    initializeContactForm,
    initializeLazyLoading,
    initializeActiveNav,
    initializeAll
  };
}
