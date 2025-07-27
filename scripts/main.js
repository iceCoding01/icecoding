// ICECODING Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Contact form handling
    initContactForm();
    
    // Scroll animations
    initScrollAnimations();
    
    // Navbar scroll effect
    initNavbarScrollEffect();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    
    if (mobileMenuButton && mobileMenu) {
        let isMenuOpen = false;
        
        mobileMenuButton.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Show menu
                mobileMenu.classList.remove('opacity-0', 'invisible', 'translate-y-[-10px]');
                mobileMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
                
                // Transform hamburger to X
                const lines = mobileMenuButton.querySelectorAll('div > div');
                if (lines.length >= 3) {
                    lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                    lines[1].style.opacity = '0';
                    lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
                }
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            } else {
                // Hide menu
                mobileMenu.classList.add('opacity-0', 'invisible', 'translate-y-[-10px]');
                mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                
                // Reset hamburger
                const lines = mobileMenuButton.querySelectorAll('div > div');
                if (lines.length >= 3) {
                    lines[0].style.transform = '';
                    lines[1].style.opacity = '';
                    lines[2].style.transform = '';
                }
                
                // Restore body scroll
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        if (mobileMenuLinks) {
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    isMenuOpen = false;
                    mobileMenu.classList.add('opacity-0', 'invisible', 'translate-y-[-10px]');
                    mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                    
                    // Reset hamburger
                    const lines = mobileMenuButton.querySelectorAll('div > div');
                    if (lines.length >= 3) {
                        lines[0].style.transform = '';
                        lines[1].style.opacity = '';
                        lines[2].style.transform = '';
                    }
                    
                    // Restore body scroll
                    document.body.style.overflow = '';
                });
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (isMenuOpen && !mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                isMenuOpen = false;
                mobileMenu.classList.add('opacity-0', 'invisible', 'translate-y-[-10px]');
                mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                
                // Reset hamburger
                const lines = mobileMenuButton.querySelectorAll('div > div');
                if (lines.length >= 3) {
                    lines[0].style.transform = '';
                    lines[1].style.opacity = '';
                    lines[2].style.transform = '';
                }
                
                // Restore body scroll
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && isMenuOpen) {
                isMenuOpen = false;
                mobileMenu.classList.add('opacity-0', 'invisible', 'translate-y-[-10px]');
                mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                
                // Reset hamburger
                const lines = mobileMenuButton.querySelectorAll('div > div');
                if (lines.length >= 3) {
                    lines[0].style.transform = '';
                    lines[1].style.opacity = '';
                    lines[2].style.transform = '';
                }
                
                // Restore body scroll
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                showFormStatus('Sending message...', 'info');
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                }, 2000);
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.service) {
        errors.push('Please select a service');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message with at least 10 characters');
    }
    
    if (errors.length > 0) {
        showFormStatus(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form status messages
function showFormStatus(message, type) {
    // Remove existing status messages
    const existingStatus = document.querySelector('.status-message');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create new status message
    const statusDiv = document.createElement('div');
    statusDiv.className = `status-message status-${type}`;
    statusDiv.innerHTML = message;
    
    // Insert before the form
    const contactForm = document.getElementById('contactForm');
    contactForm.parentNode.insertBefore(statusDiv, contactForm);
    
    // Auto-hide success/info messages after 5 seconds
    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            statusDiv.remove();
        }, 5000);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animatedElements = document.querySelectorAll('.bg-white.p-10, .bg-white.p-8, .grid.md\\:grid-cols-2 > div');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll', 'opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
        observer.observe(el);
    });
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.classList.add('shadow-xl');
        } else {
            navbar.style.backgroundColor = 'white';
            navbar.style.backdropFilter = 'none';
            navbar.classList.remove('shadow-xl');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Utility Functions

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get element offset
function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add CSS for mobile menu animation
const mobileMenuCSS = `
.nav-menu {
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        background-color: var(--white);
        flex-direction: column;
        align-items: center;
        padding: 2rem 0;
        box-shadow: 0 2px 10px rgba(0, 31, 63, 0.1);
        z-index: 999;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
}
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);
