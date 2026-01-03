// Project Modal Functionality with Improved Error Handling
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

// Contact form submission handling
function initializeContactForm() {
  const contactForm = document.querySelector('.contact-form');
  const popup = document.getElementById('popup');
  
  if (contactForm && popup) {
    contactForm.addEventListener('submit', function(e) {
      // Optional: Add form validation here
      
      // Show popup
      popup.style.display = 'block';
      
      // Hide popup after 3 seconds
      setTimeout(function() {
        popup.style.display = 'none';
      }, 3000);
    });
  }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio loaded - Initializing all features...');
  
  initializeProjects();
  initializeContactForm();
  initializeSmoothScrolling();
  
  // Add dynamic code particles positioning
  const codeParticles = document.querySelectorAll('.code-particles span');
  codeParticles.forEach((span, index) => {
    // Set random positions for each particle
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;
    
    span.style.setProperty('--start-x', startX);
    span.style.setProperty('--start-y', startY);
    span.style.setProperty('--end-x', endX);
    span.style.setProperty('--end-y', endY);
    
    // Random animation delay
    span.style.animationDelay = `${Math.random() * 10}s`;
  });
  
  console.log('All features initialized successfully!');
});

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeProjectModal,
    openProjectModal,
    closeProjectModal,
    filterProjectsByTechnology,
    searchProjects,
    initializeProjects,
    initializeContactForm,
    initializeSmoothScrolling
  };
}
