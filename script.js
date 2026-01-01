// Project Modal Functionality for Muhammad Tayyab Portfolio
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');
    
    // Initialize project modal functionality
    initProjectModal();
    
    // Initialize form submission
    initContactForm();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize particle animations
    initParticleAnimations();
    
    // Initialize scroll animations
    initScrollAnimations();
});

/**
 * Initialize particle animations for hero section
 */
function initParticleAnimations() {
    // This ensures the CSS animations for particles are applied
    const particles = document.querySelectorAll('.code-particles span');
    particles.forEach((particle, index) => {
        // Add delay to each particle for staggered animation
        particle.style.animationDelay = `${index * 0.5}s`;
    });
    
    console.log(`Initialized ${particles.length} particle animations`);
}

/**
 * Initialize scroll animations for sections
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize mobile hamburger menu
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/**
 * Initialize project modal for viewing project details
 */
function initProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    
    if (!modal) {
        console.error('Project modal not found!');
        return;
    }
    
    const closeBtn = modal.querySelector('.close-project-modal');
    
    console.log(`Found ${projectCards.length} project cards`);
    
    // Add click event to each project card
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Project card clicked!');
            
            // Get project data from card attributes
            const title = this.getAttribute('data-project-title');
            const description = this.getAttribute('data-project-description');
            const image = this.getAttribute('data-project-image');
            const technology = this.getAttribute('data-project-technology');
            const link = this.getAttribute('data-project-link');
            
            console.log('Project Data:', { title, image });
            
            // Update modal content
            updateModalContent(title, description, image, technology, link);
            
            // Show modal
            showModal();
        });
    });
    
    // Close modal when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideModal();
        });
    }
    
    // Close modal when clicking outside of modal content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
}

/**
 * Update modal content with project data
 */
function updateModalContent(title, description, image, technology, link) {
    const modal = document.getElementById('projectModal');
    
    // Update text content
    const titleElement = modal.querySelector('.modal-title');
    const descriptionElement = modal.querySelector('.modal-description');
    const technologyElement = modal.querySelector('.modal-technology');
    const githubLink = modal.querySelector('.modal-link');
    
    if (titleElement) titleElement.textContent = title || 'Project Details';
    if (descriptionElement) descriptionElement.textContent = description || 'No description available.';
    if (technologyElement) technologyElement.textContent = `Technologies: ${technology || 'Not specified'}`;
    if (githubLink) githubLink.href = link || 'https://github.com/muhammadtayyabcs';
    
    // Update image with error handling
    const modalImage = modal.querySelector('.modal-image');
    if (modalImage && image) {
        modalImage.src = image;
        modalImage.alt = title || 'Project Image';
        
        // Handle image loading errors
        modalImage.onerror = function() {
            console.error('Failed to load project image:', image);
            this.src = 'https://via.placeholder.com/600x400/1a1a1a/ffb400?text=Project+Image';
            this.alt = 'Image not found';
        };
    }
}

/**
 * Show the project modal
 */
function showModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    console.log('Modal shown');
}

/**
 * Hide the project modal
 */
function hideModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    console.log('Modal hidden');
}

/**
 * Initialize contact form submission
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const popup = document.getElementById('popup');
    
    if (!contactForm || !popup) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        
        // Show success popup
        showPopup(`✅ Thank you ${name || 'there'}! Your message has been sent successfully.`);
        
        // Reset form
        this.reset();
        
        // In a real application, you would send the form data to a server here
        console.log('Form submitted with data:', Object.fromEntries(formData));
        
        // You can uncomment the following to actually submit the form
        // this.submit();
    });
}

/**
 * Show popup message
 */
function showPopup(message) {
    const popup = document.getElementById('popup');
    if (!popup) return;
    
    popup.textContent = message;
    popup.style.display = 'block';
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 4000);
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-column a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Initialize project filtering (if you add filter buttons later)
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
        });
    });
}

/**
 * Filter projects by category
 */
function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            const category = card.getAttribute('data-category');
            if (category && category.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Make functions available globally if needed
window.initProjectModal = initProjectModal;
window.showModal = showModal;
window.hideModal = hideModal;
window.showPopup = showPopup;

console.log('Portfolio JavaScript loaded successfully! All animations enabled!');
