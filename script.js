document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  document.querySelector('.nav-container').appendChild(hamburger);

  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close hamburger menu when a nav link is clicked
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Popup for contact form
  const form = document.querySelector('.contact-form');
  const popup = document.getElementById('popup');

  // Only add event listener if form exists
  if (form && popup) {
    form.addEventListener('submit', (e) => {
      let valid = true;
      const fields = form.querySelectorAll('input, textarea');

      fields.forEach(field => {
        // Create error element if it doesn't exist
        let errorText = field.nextElementSibling;
        if (!errorText || !errorText.classList.contains('error-text')) {
          errorText = document.createElement('div');
          errorText.classList.add('error-text');
          field.parentNode.insertBefore(errorText, field.nextSibling);
        }

        if (!field.value.trim()) {
          errorText.textContent = '⚠️ This field is required.';
          errorText.style.display = 'block';
          valid = false;
        } else if (field.type === 'email' && !field.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          errorText.textContent = '⚠️ Please enter a valid email address.';
          errorText.style.display = 'block';
          valid = false;
        } else {
          errorText.textContent = '';
          errorText.style.display = 'none';
        }
      });

      if (!valid) {
        e.preventDefault(); // stop form if errors exist
      } else {
        popup.style.display = 'block';
        setTimeout(() => popup.style.display = 'none', 4000);
      }
    });
  }

  // Randomize particle animation
  const particles = document.querySelectorAll('.code-particles span');
  particles.forEach((p) => {
    // Random start positions
    const startX = Math.random() * 100; // 0-100% horizontal
    const startY = Math.random() * 100; // 0-100% vertical
    
    // Random movement directions
    const endX = (Math.random() - 0.5) * 200 - 50; // -150 to 50vw
    const endY = -100 - Math.random() * 50; // -150 to -100vh (upward with variation)
    
    const delay = Math.random() * 15;
    const duration = 15 + Math.random() * 20; // 15-35 seconds
    const size = 14 + Math.random() * 24;
    const opacity = 0.1 + Math.random() * 0.4;
    
    // Apply CSS custom properties for animation
    p.style.setProperty('--end-x', endX);
    p.style.setProperty('--end-y', endY);
    
    // Apply styles
    p.style.left = `${startX}%`;
    p.style.top = `${startY}%`;
    p.style.animationDelay = `${delay}s`;
    p.style.animationDuration = `${duration}s`;
    p.style.fontSize = `${size}px`;
    p.style.opacity = `${opacity}`;
    p.style.zIndex = '0';
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 180, 0, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = '#ffb400';
      navbar.style.backdropFilter = 'none';
    }
  });

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

  // Observe project cards for animation
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

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

  // Projects Filtering and Animation
  function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Filter projects
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.classList.add('visible');
            }, 100);
          } else {
            card.classList.remove('visible');
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Initialize projects filter if filter buttons exist
  if (document.querySelectorAll('.filter-btn').length > 0) {
    initProjectsFilter();
  }


  // Project Modal Functionality
  const projectModal = document.getElementById('projectModal');
  const closeProjectModal = document.querySelector('.close-project-modal');

  // Open project modal when project card is clicked
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
      // Extract data attributes from the clicked card
      const projectTitle = this.getAttribute('data-project-title');
      const projectDescription = this.getAttribute('data-project-description');
      const projectImage = this.getAttribute('data-project-image');
      const projectLink = this.getAttribute('data-project-link');
      const projectTechnology = this.getAttribute('data-project-technology');
      
      // Populate modal with project information
      const modalImage = projectModal.querySelector('.modal-image');
      const modalTitle = projectModal.querySelector('.modal-title');
      const modalDescription = projectModal.querySelector('.modal-description');
      const modalTechnology = projectModal.querySelector('.modal-technology');
      const modalLink = projectModal.querySelector('.modal-link');
      
      modalImage.src = projectImage;
      modalImage.alt = projectTitle + ' by Muhammad Tayyab';
      modalTitle.textContent = projectTitle;
      modalDescription.textContent = projectDescription;
      modalTechnology.textContent = 'Technologies: ' + projectTechnology;
      modalLink.href = projectLink;
      
      // Show modal with animation
      projectModal.style.display = 'flex';
      setTimeout(() => {
        projectModal.classList.add('active');
      }, 10);
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal functionality
  function closeProjectModalFunc() {
    projectModal.classList.remove('active');
    setTimeout(() => {
      projectModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300); // Wait for fade-out animation
  }

  // Close modal when close button is clicked
  if (closeProjectModal) {
    closeProjectModal.addEventListener('click', closeProjectModalFunc);
  }

  // Close modal when clicking outside the modal content
  projectModal.addEventListener('click', function(e) {
    if (e.target === projectModal) {
      closeProjectModalFunc();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModalFunc();
    }
  });
});
