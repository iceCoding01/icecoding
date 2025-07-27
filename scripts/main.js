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
    
    // Initialize carousel
    initCarousel();
    
    // Initialize animated counters
    initAnimatedCounters();
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

// Carousel Functionality
function initCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.carousel-dot');
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');
    const loading = document.getElementById('carousel-loading');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isAnimating = false;
    
    // Update total slides display
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }
    
    // Auto-play settings
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds
    
    // Update carousel position
    function updateCarousel(slideIndex, withAnimation = true) {
        if (isAnimating && withAnimation) return;
        
        if (withAnimation) {
            isAnimating = true;
            // Show loading overlay
            if (loading) {
                loading.style.opacity = '0.3';
            }
        }
        
        const translateX = -(slideIndex * 100);
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update current slide display
        if (currentSlideSpan) {
            currentSlideSpan.textContent = slideIndex + 1;
        }
        
        // Update dot indicators
        dots.forEach((dot, index) => {
            if (index === slideIndex) {
                dot.style.backgroundColor = '#007BFF';
                dot.style.transform = 'scale(1.2)';
            } else {
                dot.style.backgroundColor = 'rgba(45, 45, 45, 0.3)';
                dot.style.transform = 'scale(1)';
            }
        });
        
        // Hide loading overlay after animation
        if (withAnimation) {
            setTimeout(() => {
                isAnimating = false;
                if (loading) {
                    loading.style.opacity = '0';
                }
            }, 500);
        }
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= totalSlides) return;
        currentSlide = slideIndex;
        updateCarousel(currentSlide);
        resetAutoPlay();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(currentSlide);
        resetAutoPlay();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(currentSlide);
        resetAutoPlay();
    }
    
    // Start auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }
    
    // Stop auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Reset auto-play
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    const minSwipeDistance = 50;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoPlay();
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });
    
    track.addEventListener('touchend', () => {
        const swipeDistance = startX - endX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            resetAutoPlay();
        }
    }, { passive: true });
    
    // Mouse drag support for desktop
    let isDragging = false;
    let dragStartX = 0;
    let dragEndX = 0;
    
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        stopAutoPlay();
        track.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        dragEndX = e.clientX;
    });
    
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        
        const dragDistance = dragStartX - dragEndX;
        
        if (Math.abs(dragDistance) > minSwipeDistance) {
            if (dragDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            resetAutoPlay();
        }
        
        isDragging = false;
        track.style.cursor = 'grab';
    });
    
    // Pause auto-play on hover
    const carouselContainer = track.closest('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
    
    // Initialize carousel
    updateCarousel(0, false);
    startAutoPlay();
    
    // Set cursor style
    track.style.cursor = 'grab';
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

// Animated Counters for Success Stories
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                // Reset counter
                counter.textContent = '0';
                
                // Animate counter
                animateCounter(counter, target);
                
                // Stop observing this counter
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
    }, 16);
}

// Enhanced scroll animations for Success Stories section
function initSuccessStoriesAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation delays
                const cards = entry.target.querySelectorAll('.group');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe success stories section
    const successSection = document.querySelector('.mt-32');
    if (successSection) {
        const cards = successSection.querySelectorAll('.group');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        observer.observe(successSection);
    }
}

// Call the new animation function
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    initSuccessStoriesAnimations();
});
