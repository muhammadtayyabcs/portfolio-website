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

  // Contact form validation + WhatsApp/Email choice
  const form = document.getElementById('demoForm');
  const popup = document.getElementById('popup');
  const sendChoiceModal = document.getElementById('sendChoiceModal');
  const closeSendChoiceModal = document.getElementById('closeSendChoiceModal');
  const sendViaWhatsAppBtn = document.getElementById('sendViaWhatsApp');
  const sendViaEmailBtn = document.getElementById('sendViaEmail');

  const WHATSAPP_NUMBER = '923359273944'; // +92 335 9273944
  const OWNER_EMAIL = 'muhammadtayyabbcs@gmail.com';

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const fields = form.querySelectorAll('input, textarea, select');

      fields.forEach(field => {
        // Create error element if it doesn't exist
        let errorText = field.nextElementSibling;
        if (!errorText || !errorText.classList.contains('error-text')) {
          errorText = document.createElement('div');
          errorText.classList.add('error-text');
          field.parentNode.insertBefore(errorText, field.nextSibling);
        }

        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');

        if (isRequired && !value) {
          errorText.textContent = '⚠️ This field is required.';
          errorText.style.display = 'block';
          valid = false;
        } else if (value && field.type === 'email' && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          errorText.textContent = '⚠️ Please enter a valid email address.';
          errorText.style.display = 'block';
          valid = false;
        } else if (value && field.name === 'whatsapp' && !value.match(/^[0-9+\-\s()]{7,}$/)) {
          errorText.textContent = '⚠️ Please enter a valid WhatsApp number.';
          errorText.style.display = 'block';
          valid = false;
        } else {
          errorText.textContent = '';
          errorText.style.display = 'none';
        }
      });

      if (!valid) return;

      // Build the inquiry message from the form
      const data = new FormData(form);
      const name = data.get('name').trim();
      const businessName = data.get('businessName').trim();
      const whatsapp = data.get('whatsapp').trim();
      const email = data.get('email').trim();
      const businessType = data.get('businessType').trim();
      const theme = data.get('theme').trim();
      const referenceWebsite = data.get('referenceWebsite').trim();
      const message = data.get('message').trim();

      const summary =
        `New Business Inquiry from Portfolio Site\n\n` +
        `Name: ${name}\n` +
        `Business Name: ${businessName}\n` +
        `WhatsApp: ${whatsapp}\n` +
        `Email: ${email}\n` +
        `Business Type: ${businessType}\n` +
        `Preferred Theme: ${theme}\n` +
        `Reference Website: ${referenceWebsite || 'Not provided'}\n\n` +
        `Project Details:\n${message}`;

      if (sendViaWhatsAppBtn) {
        sendViaWhatsAppBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
      }
      if (sendViaEmailBtn) {
        sendViaEmailBtn.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent('New Business Inquiry - ' + businessName)}&body=${encodeURIComponent(summary)}`;
      }

      if (sendChoiceModal) {
        sendChoiceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Handle the WhatsApp / Email choice
  function finishSend() {
    if (sendChoiceModal) {
      sendChoiceModal.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
    if (popup) {
      popup.style.display = 'block';
      setTimeout(() => popup.style.display = 'none', 4000);
    }
    if (form) form.reset();
  }

  if (sendViaWhatsAppBtn) {
    sendViaWhatsAppBtn.addEventListener('click', finishSend);
  }
  if (sendViaEmailBtn) {
    sendViaEmailBtn.addEventListener('click', finishSend);
  }
  if (closeSendChoiceModal) {
    closeSendChoiceModal.addEventListener('click', () => {
      sendChoiceModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
  if (sendChoiceModal) {
    sendChoiceModal.addEventListener('click', (e) => {
      if (e.target === sendChoiceModal) {
        sendChoiceModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

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


// Simple Project Modal Functionality
const projectModal = document.getElementById('projectModal');
const closeProjectModal = document.querySelector('.close-project-modal');

// Open project modal when project card is clicked, using each card's own data
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function() {
    openProjectModal(this);
  });
});

function openProjectModal(card) {
  const title = card.getAttribute('data-project-title');
  const description = card.getAttribute('data-project-description');
  const image = card.getAttribute('data-project-image');
  const link = card.getAttribute('data-project-link');
  const technology = card.getAttribute('data-project-technology');

  if (!title || !image) return;

  // Set modal content from the clicked project's own data
  const modalImage = document.getElementById('modalProjectImage');
  modalImage.src = image;
  modalImage.alt = title;
  document.getElementById('modalProjectTitle').textContent = title;

  const modalDescription = document.querySelector('.modal-description');
  if (modalDescription && description) modalDescription.textContent = description;

  const modalTechnology = document.querySelector('.modal-technology');
  if (modalTechnology && technology) modalTechnology.textContent = 'Technologies: ' + technology;

  const modalLink = document.querySelector('.modal-link');
  if (modalLink && link) {
    modalLink.href = link;
    modalLink.innerHTML = '<i class="fas fa-arrow-up-right-from-square"></i> View Live Site';
  }

  // Show modal
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal functionality
closeProjectModal.addEventListener('click', closeProjectModalFunc);
projectModal.addEventListener('click', function(e) {
  if (e.target === projectModal) closeProjectModalFunc();
});

function closeProjectModalFunc() {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProjectModalFunc();
  }
  const sendChoiceModalEl = document.getElementById('sendChoiceModal');
  if (e.key === 'Escape' && sendChoiceModalEl && sendChoiceModalEl.classList.contains('active')) {
    sendChoiceModalEl.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
});
