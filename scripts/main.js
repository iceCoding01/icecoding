// ICECODING Website JavaScript - Performance Optimized

// Performance optimizations
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
        }
    }
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({ type: 'largest-contentful-paint', buffered: true });
}

// Lazy loading images fallback for older browsers
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
        document.head.appendChild(script);
        
        script.onload = () => {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => imageObserver.observe(img));
        };
    }
}

// Enhanced DOM ready with performance monitoring
document.addEventListener('DOMContentLoaded', function() {
    const startTime = performance.now();
    
    // Core functionality
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initNavbarScrollEffect();
    initCarousel();
    initAnimatedCounters();
    initLazyLoading();
    initErrorBoundary();
    registerServiceWorker();
    initPerformanceMonitoring();
    
    // Performance logging
    const endTime = performance.now();
    console.log(`Initialization took ${endTime - startTime} milliseconds`);
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

// Contact Form Handling with Enhanced Validation
function initContactForm() {
    const contactForms = document.querySelectorAll('#contactForm, form[action*="contact"], .contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Enhanced validation
            const validation = validateForm(data);
            if (!validation.isValid) {
                showFormStatus(validation.message, 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-50');
            }
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Success simulation
                showFormStatus('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
                this.reset();
                
                // Reset button
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-50');
                }
                
                // Track form submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'engagement',
                        event_label: 'contact_form'
                    });
                }
            }, 1500);
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

// Enhanced Form Validation
function validateForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    // Email validation
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation (if provided)
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // Service validation (if provided)
    if (data.service && !isValidService(data.service)) {
        errors.push('Please select a valid service');
    }
    
    return {
        isValid: errors.length === 0,
        message: errors.length > 0 ? errors.join('. ') : 'Form is valid'
    };
}

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    switch (field.type) {
        case 'email':
            isValid = isValidEmail(value);
            message = isValid ? '' : 'Please enter a valid email address';
            break;
        case 'tel':
            isValid = value === '' || isValidPhone(value);
            message = isValid ? '' : 'Please enter a valid phone number';
            break;
        default:
            if (field.required) {
                isValid = value.length > 0;
                message = isValid ? '' : 'This field is required';
            }
    }
    
    if (!isValid) {
        showFieldError(field, message);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('border-red-500', 'bg-red-50');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-600 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('border-red-500', 'bg-red-50');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Enhanced email validation
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 7 && cleanPhone.length <= 15;
}

// Service validation
function isValidService(service) {
    const validServices = [
        'software-development',
        'tech-education',
        'consulting',
        'web-development',
        'mobile-development',
        'other'
    ];
    return validServices.includes(service);
}

// Enhanced status messages
function showFormStatus(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-status-message');
    existingMessages.forEach(msg => msg.remove());
    
    const statusDiv = document.createElement('div');
    statusDiv.className = `form-status-message fixed top-20 right-6 p-4 rounded-lg shadow-lg z-50 max-w-md transition-all duration-300 ${getStatusClasses(type)}`;
    statusDiv.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                ${getStatusIcon(type)}
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button type="button" class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <span class="material-icons text-sm">close</span>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(statusDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.remove();
        }
    }, 5000);
}

function getStatusClasses(type) {
    switch (type) {
        case 'success':
            return 'bg-green-50 border border-green-200 text-green-800';
        case 'error':
            return 'bg-red-50 border border-red-200 text-red-800';
        case 'warning':
            return 'bg-yellow-50 border border-yellow-200 text-yellow-800';
        default:
            return 'bg-blue-50 border border-blue-200 text-blue-800';
    }
}

function getStatusIcon(type) {
    switch (type) {
        case 'success':
            return '<span class="material-icons text-green-400">check_circle</span>';
        case 'error':
            return '<span class="material-icons text-red-400">error</span>';
        case 'warning':
            return '<span class="material-icons text-yellow-400">warning</span>';
        default:
            return '<span class="material-icons text-blue-400">info</span>';
    }
}

// Error Boundary Implementation
function initErrorBoundary() {
    window.addEventListener('error', function(event) {
        console.error('JavaScript Error:', event.error);
        
        // Log error for monitoring
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: event.error?.message || 'Unknown error',
                fatal: false
            });
        }
        
        // Show user-friendly error message for critical errors
        if (event.error?.stack?.includes('critical')) {
            showFormStatus('We encountered a technical issue. Please refresh the page and try again.', 'error');
        }
    });
    
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        
        // Log promise rejection
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: event.reason?.message || 'Promise rejection',
                fatal: false
            });
        }
    });
}

// Additional Form Status Function (Legacy Support)
function showFormStatusLegacy(message, type) {
    // This function maintains compatibility with existing form implementations
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
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
    contactForm.parentNode.insertBefore(statusDiv, contactForm);
    
    // Auto-hide success/info messages after 5 seconds
    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            statusDiv.remove();
        }, 5000);
    }
}

// Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // Show update notification
                                    showUpdateNotification();
                                }
                            }
                        });
                    });
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Show update notification
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'sw-update-available fixed bottom-6 right-6 bg-electric-blue text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="material-icons mr-2">system_update</span>
            <div class="flex-1">
                <p class="font-medium">Update Available</p>
                <p class="text-sm opacity-90">A new version is ready. Refresh to update.</p>
            </div>
            <button class="ml-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded px-3 py-1 text-sm" onclick="window.location.reload()">
                Refresh
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const paint = performance.getEntriesByType('paint');
            
            // Log performance metrics
            console.log('Performance Metrics:', {
                'DOM Content Loaded': navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                'Load Complete': navigation.loadEventEnd - navigation.loadEventStart,
                'First Paint': paint.find(p => p.name === 'first-paint')?.startTime,
                'First Contentful Paint': paint.find(p => p.name === 'first-contentful-paint')?.startTime,
                'Total Load Time': navigation.loadEventEnd - navigation.fetchStart
            });
            
            // Send to analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    event_category: 'performance',
                    value: Math.round(navigation.loadEventEnd - navigation.fetchStart)
                });
            }
        }, 0);
    });
    
    // Monitor resource loading
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 1000) { // Log slow resources
                console.warn('Slow resource detected:', entry.name, entry.duration + 'ms');
            }
        }
    });
    
    if ('PerformanceObserver' in window) {
        observer.observe({ entryTypes: ['resource'] });
    }
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                console.warn('High memory usage detected');
            }
        }, 30000); // Check every 30 seconds
    }
    
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.warn('Long task detected:', entry.duration + 'ms');
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'long_task', {
                        event_category: 'performance',
                        value: Math.round(entry.duration)
                    });
                }
            }
        });
        
        try {
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            // Long task API not supported
        }
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
