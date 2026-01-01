// Project Modal Functionality with Improved Error Handling
// ========================================================

/**
 * Initialize project modal with null checks and event delegation
 */
function initializeProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close');
  const projectCards = document.querySelectorAll('.project-card');

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
  projectCards.forEach((card) => {
    if (card) {
      card.addEventListener('click', () => openProjectModal(card));
    }
  });

  // Close modal on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeProjectModal());
  }

  // Close modal when clicking outside of modal content
  modal.addEventListener('click', (event) => {
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent && event.target === modal) {
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

  // Null check for modal
  if (!modal) {
    console.error('Project modal not found');
    return;
  }

  try {
    // Extract project data from card attributes with fallback values
    const projectTitle = card.getAttribute('data-project-title') || 'Untitled Project';
    const projectDescription = card.getAttribute('data-project-description') || 'No description available';
    const projectImage = card.getAttribute('data-project-image') || '';
    const projectLink = card.getAttribute('data-project-link') || '#';
    const projectTechnology = card.getAttribute('data-project-technology') || 'Not specified';

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
    }

    if (modalLink) {
      modalLink.href = projectLink;
      modalLink.textContent = projectLink.includes('http') ? 'View Project' : 'More Info';
    }

    if (modalTechnology) {
      modalTechnology.textContent = `Technologies: ${projectTechnology}`;
    }

    // Display modal with smooth transition
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  } catch (error) {
    console.error('Error opening project modal:', error);
  }
}

/**
 * Close project modal with proper cleanup
 */
function closeProjectModal() {
  const modal = document.getElementById('projectModal');

  // Null check for modal
  if (!modal) {
    console.error('Project modal not found');
    return;
  }

  try {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
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
 * Initialize search and filter functionality
 */
function initializeProjectFilters() {
  const searchInput = document.getElementById('projectSearch');
  const filterButtons = document.querySelectorAll('[data-filter]');

  // Add search event listener with null check
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      searchProjects(event.target.value);
    });
  }

  // Add filter button event listeners
  filterButtons.forEach((button) => {
    if (button) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const filter = button.getAttribute('data-filter');
        if (filter) {
          filterProjectsByTechnology(filter);
          // Update active state
          filterButtons.forEach((btn) => btn.classList.remove('active'));
          button.classList.add('active');
        }
      });
    }
  });
}

/**
 * Initialize all project-related functionality on DOM ready
 */
function initializeProjects() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeProjectModal();
      initializeProjectFilters();
    });
  } else {
    initializeProjectModal();
    initializeProjectFilters();
  }
}

// Auto-initialize on script load
initializeProjects();

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeProjectModal,
    openProjectModal,
    closeProjectModal,
    filterProjectsByTechnology,
    searchProjects,
    initializeProjectFilters,
    initializeProjects,
  };
}
