// Qbix Solution - Main JavaScript
// Modern, professional, and accessible

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoader();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initForms();
    initCounters();
    initAlerts();
});

// ===== Loading Animation =====
function initLoader() {
    const loader = document.getElementById('loader');
    const progressFill = document.querySelector('.loader-progress-fill');
    const percentageText = document.querySelector('.loader-percentage');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        if (percentageText) {
            percentageText.textContent = Math.round(progress) + '%';
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 150);
    
    // Hide loader after page load
    window.addEventListener('load', function() {
        // Ensure progress reaches 100%
        if (progressFill) progressFill.style.width = '100%';
        if (percentageText) percentageText.textContent = '100%';
        
        setTimeout(function() {
            loader.classList.add('hidden');
            clearInterval(progressInterval);
        }, 600);
    });
}

// ===== Navigation =====
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Sticky header on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors or javascript: links
            if (href === '#' || href.startsWith('#!') || href === '#consultation') {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Scroll Effects =====
function initScrollEffects() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.feature-card, .service-card, .portfolio-item, .testimonial-card, .blog-card, .team-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ===== Animations =====
function initAnimations() {
    // Intersection Observer for scroll animations
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
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.value-card, .culture-card, .job-card, .process-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== Form Handling =====
function initForms() {
    // Form validation and submission
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add loading state to submit button
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Re-enable after 3 seconds (in case of slow response)
                setTimeout(() => {
                    if (submitBtn.disabled) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                }, 3000);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
    
    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        let isValid = true;
        let errorMessage = '';
        
        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (type === 'tel' && value) {
            const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Update field state
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            removeFieldError(field);
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        removeFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
}

// ===== Counter Animation =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation duration in ms
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== Alert Messages =====
function initAlerts() {
    const alerts = document.querySelectorAll('.alert');
    
    alerts.forEach(alert => {
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            dismissAlert(alert);
        }, 5000);
        
        // Close button
        const closeBtn = alert.querySelector('.alert-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                dismissAlert(alert);
            });
        }
    });
    
    function dismissAlert(alert) {
        alert.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }
}

// ===== Utility Functions =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
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

// Add fade-out keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    input.error, textarea.error, select.error {
        border-color: #ef4444 !important;
    }
    
    input.success, textarea.success, select.success {
        border-color: #10b981 !important;
    }
`;
document.head.appendChild(style);

// ===== Accessibility Enhancements =====

// Keyboard navigation for custom elements
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Add focus visible for keyboard navigation
document.addEventListener('mousedown', function() {
    document.body.classList.add('using-mouse');
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
    }
});

// Add styles for focus-visible
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .using-mouse *:focus {
        outline: none;
    }
    
    *:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// ===== Console Message =====
console.log('%cQbix Solution', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cWebsite developed with modern best practices', 'font-size: 12px; color: #64748b;');

// ===== Policy Modals =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
        
        // Close on outside click
        modal.addEventListener('click', handleOutsideClick);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove event listeners
        document.removeEventListener('keydown', handleEscapeKey);
        modal.removeEventListener('click', handleOutsideClick);
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.policy-modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
}

function handleOutsideClick(e) {
    if (e.target.classList.contains('policy-modal')) {
        closeModal(e.target.id);
    }
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;

// ===== FAQ Accordion =====
function toggleFaq(element) {
    const faqQuestion = element;
    const faqAnswer = faqQuestion.nextElementSibling;
    const isActive = faqQuestion.classList.contains('active');
    
    // Close all other FAQs in the same category (optional - remove if you want multiple open)
    const category = faqQuestion.closest('.faq-category');
    if (category) {
        const allQuestions = category.querySelectorAll('.faq-question');
        const allAnswers = category.querySelectorAll('.faq-answer');
        
        allQuestions.forEach(q => q.classList.remove('active'));
        allAnswers.forEach(a => a.classList.remove('active'));
    }
    
    // Toggle current FAQ
    if (!isActive) {
        faqQuestion.classList.add('active');
        faqAnswer.classList.add('active');
        
        // Smooth scroll to question (with offset for navbar)
        setTimeout(() => {
            const offset = 100;
            const elementPosition = faqQuestion.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 100);
    }
}

// Make toggleFaq globally available
window.toggleFaq = toggleFaq;

// Add keyboard navigation for FAQs
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Add keyboard support
        question.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq(this);
            }
        });
        
        // Add tabindex for accessibility
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded on click
        question.addEventListener('click', function() {
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    });
});

// ===== PERFORMANCE-OPTIMIZED SCROLL ANIMATIONS =====

// Intersection Observer for Scroll Reveal (Very Efficient)
function initScrollReveal() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip animations for users who prefer reduced motion
        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
            el.classList.add('revealed');
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Unobserve after reveal for better performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal classes
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
        observer.observe(el);
    });
}

// Animated Number Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const suffix = element.dataset.suffix || '';
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Initialize counters when they come into view
function initCounterAnimations() {
    const counterElements = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
}

// Smooth Parallax Effect (RequestAnimationFrame for Performance)
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const rect = el.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * -speed;
            
            el.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Add Ripple Effect to Buttons
function addRippleEffect() {
    const rippleButtons = document.querySelectorAll('.ripple-effect');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Tilt Effect on Mouse Move (Subtle 3D Effect)
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-hover');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize all scroll animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCounterAnimations();
    initParallax();
    addRippleEffect();
    initTiltEffect();
    initPortfolioSlider();
});

// ===== Portfolio Auto-Scroll Slider =====
function initPortfolioSlider() {
    const slider = document.getElementById('portfolioSlider');
    const prevBtn = document.getElementById('portfolioPrev');
    const nextBtn = document.getElementById('portfolioNext');
    
    if (!slider) return;
    
    let currentIndex = 0;
    let itemsPerView = 1;
    let autoScrollInterval;
    let isTransitioning = false;
    
    // Calculate items per view based on screen size
    function updateItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1280) {
            itemsPerView = 4;
        } else if (width >= 1024) {
            itemsPerView = 3;
        } else if (width >= 768) {
            itemsPerView = 2;
        } else {
            itemsPerView = 1;
        }
    }
    
    // Get actual portfolio items (not clones)
    function getOriginalItems() {
        return Array.from(slider.children).filter(item => !item.classList.contains('clone'));
    }
    
    // Clone items for infinite loop
    function setupInfiniteLoop() {
        // Remove existing clones
        slider.querySelectorAll('.clone').forEach(clone => clone.remove());
        
        const items = getOriginalItems();
        const itemCount = items.length;
        
        if (itemCount === 0) return;
        
        // Clone items for seamless infinite scroll
        // Clone enough items to fill at least 2 full views on each side
        const clonesToCreate = Math.max(itemsPerView * 2, 4);
        
        // Add clones to the end
        for (let i = 0; i < clonesToCreate; i++) {
            const clone = items[i % itemCount].cloneNode(true);
            clone.classList.add('clone');
            slider.appendChild(clone);
        }
        
        // Add clones to the beginning
        for (let i = clonesToCreate - 1; i >= 0; i--) {
            const clone = items[(itemCount - 1 - (i % itemCount))].cloneNode(true);
            clone.classList.add('clone');
            slider.insertBefore(clone, slider.firstChild);
        }
        
        // Set initial position (accounting for prepended clones)
        currentIndex = clonesToCreate;
        updateSliderPosition(false);
    }
    
    // Update slider position
    function updateSliderPosition(animate = true) {
        if (!animate) {
            slider.style.transition = 'none';
        } else {
            slider.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        const slideWidth = slider.children[0]?.offsetWidth || 0;
        const gap = parseFloat(getComputedStyle(slider).gap) || 0;
        const offset = -(currentIndex * (slideWidth + gap));
        
        slider.style.transform = `translateX(${offset}px)`;
        
        if (!animate) {
            // Force reflow
            slider.offsetHeight;
        }
    }
    
    // Go to next slide
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const originalItems = getOriginalItems();
        const totalItems = originalItems.length;
        
        currentIndex++;
        updateSliderPosition(true);
        
        // Check if we need to loop back
        setTimeout(() => {
            const clonesToCreate = Math.max(itemsPerView * 2, 4);
            if (currentIndex >= clonesToCreate + totalItems) {
                currentIndex = clonesToCreate;
                updateSliderPosition(false);
            }
            isTransitioning = false;
        }, 600);
    }
    
    // Go to previous slide
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex--;
        updateSliderPosition(true);
        
        // Check if we need to loop forward
        setTimeout(() => {
            const clonesToCreate = Math.max(itemsPerView * 2, 4);
            if (currentIndex < clonesToCreate) {
                const originalItems = getOriginalItems();
                currentIndex = clonesToCreate + originalItems.length - 1;
                updateSliderPosition(false);
            }
            isTransitioning = false;
        }, 600);
    }
    
    // Start auto-scroll
    function startAutoScroll() {
        stopAutoScroll();
        // Auto-scroll every 3 seconds
        autoScrollInterval = setInterval(nextSlide, 3000);
    }
    
    // Stop auto-scroll
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoScroll();
            // Restart auto-scroll after user interaction
            setTimeout(startAutoScroll, 8000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoScroll();
            // Restart auto-scroll after user interaction
            setTimeout(startAutoScroll, 8000);
        });
    }
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoScroll();
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        setTimeout(startAutoScroll, 8000);
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            nextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevSlide();
        }
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldItemsPerView = itemsPerView;
            updateItemsPerView();
            
            if (oldItemsPerView !== itemsPerView) {
                setupInfiniteLoop();
            } else {
                updateSliderPosition(false);
            }
        }, 250);
    });
    
    // Initialize
    updateItemsPerView();
    setupInfiniteLoop();
    startAutoScroll();
}

// Performance: Use passive event listeners where possible
window.addEventListener('scroll', () => {}, { passive: true });
window.addEventListener('touchstart', () => {}, { passive: true });
