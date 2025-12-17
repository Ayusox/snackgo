// ===== SNACK&GO - OPTIMIZED JAVASCRIPT =====
// Performance-first approach with modern ES6+ features

class SnackGoApp {
    constructor() {
        this.isInitialized = false;
        this.observers = new Map();
        this.throttledFunctions = new Map();
        this.init();
    }

    // Throttle function for performance
    throttle(func, limit) {
        if (this.throttledFunctions.has(func)) {
            return this.throttledFunctions.get(func);
        }
        
        let inThrottle;
        const throttledFunc = function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
        
        this.throttledFunctions.set(func, throttledFunc);
        return throttledFunc;
    }

    // Debounce function for performance
    debounce(func, wait) {
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

    // Initialize app
    init() {
        if (this.isInitialized) return;
        
        // Use requestIdleCallback for non-critical initialization
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => this.initializeComponents());
        } else {
            setTimeout(() => this.initializeComponents(), 1);
        }
        
        // Critical components first
        this.initMobileMenu();
        this.initPreloader();
        this.isInitialized = true;
    }

    // Initialize all components
    initializeComponents() {
        this.initScrollEffects();
        this.initIntersectionObservers();
        this.initImageLazyLoading();
        this.initSmoothScrolling();
        this.initFloatingButton();
        this.initPerformanceOptimizations();
    }

    // Mobile menu with improved performance
    initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-overlay');
        const navLinks = document.querySelectorAll('.nav-menu a');

        if (!hamburger || !navMenu) return;

        // Use event delegation for better performance
        hamburger.addEventListener('click', this.toggleMobileMenu.bind(this), { passive: true });
        
        if (navOverlay) {
            navOverlay.addEventListener('click', this.closeMobileMenu.bind(this), { passive: true });
        }

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', this.closeMobileMenu.bind(this), { passive: true });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-overlay');
        
        const isActive = navMenu.classList.contains('active');
        
        hamburger.classList.toggle('active', !isActive);
        navMenu.classList.toggle('active', !isActive);
        navOverlay?.classList.toggle('active', !isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? '' : 'hidden';
        
        // Improve accessibility
        hamburger.setAttribute('aria-expanded', !isActive);
        navMenu.setAttribute('aria-hidden', isActive);
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-overlay');
        
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        navOverlay?.classList.remove('active');
        document.body.style.overflow = '';
        
        // Accessibility
        hamburger?.setAttribute('aria-expanded', 'false');
        navMenu?.setAttribute('aria-hidden', 'true');
    }

    // Optimized scroll effects
    initScrollEffects() {
        const header = document.querySelector('.header');
        if (!header) return;

        const throttledScrollHandler = this.throttle(() => {
            const scrollY = window.pageYOffset;
            
            // Header background change
            if (scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }

            // Update scroll progress
            this.updateScrollProgress(scrollY);
            
            // Floating button visibility
            this.updateFloatingButton(scrollY);
            
        }, 16); // ~60fps

        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    }

    // Scroll progress indicator
    updateScrollProgress(scrollY) {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollY / docHeight) * 100, 100);
        
        // Use transform for better performance
        progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
    }

    // Floating button visibility
    updateFloatingButton(scrollY) {
        const floatingOrder = document.querySelector('.floating-order');
        if (!floatingOrder) return;

        const shouldShow = scrollY > 300;
        floatingOrder.style.opacity = shouldShow ? '1' : '0';
        floatingOrder.style.visibility = shouldShow ? 'visible' : 'hidden';
    }

    // Intersection Observer for animations
    initIntersectionObservers() {
        // Animation observer
        const animationObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-animate');
                        // Unobserve after animation to improve performance
                        animationObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        // Observe elements for animations
        const animatedElements = document.querySelectorAll(
            '.menu-section, .featured-item, .info-item, .contact-btn'
        );
        
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });

        this.observers.set('animation', animationObserver);
    }

    // Optimized image lazy loading
    initImageLazyLoading() {
        // Use native lazy loading when available
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                }, { once: true });
            });
            return;
        }

        // Fallback for browsers without native lazy loading
        const imageObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            },
            { rootMargin: '50px' }
        );

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
        
        this.observers.set('image', imageObserver);
    }

    // Smooth scrolling for internal links
    initSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, { passive: false });
    }

    // Floating button functionality
    initFloatingButton() {
        const floatingBtn = document.querySelector('.floating-btn');
        if (!floatingBtn) return;

        floatingBtn.addEventListener('click', (e) => {
            // Visual feedback
            floatingBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                floatingBtn.style.transform = 'scale(1)';
            }, 150);

            // Haptic feedback on mobile
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        }, { passive: true });
    }

    // Preloader management
    initPreloader() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        // Hide preloader when page is loaded
        const hidePreloader = () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        };

        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader, { once: true });
        }
    }

    // Performance optimizations
    initPerformanceOptimizations() {
        // Optimize for mobile devices
        if (this.isMobile()) {
            this.initMobileOptimizations();
        }

        // Create scroll progress indicator
        this.createScrollProgress();
        
        // Initialize video optimizations
        this.initVideoOptimizations();
    }

    // Mobile device detection
    isMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Mobile-specific optimizations
    initMobileOptimizations() {
        document.body.classList.add('mobile-device');
        
        // Improve iOS scrolling
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Optimize videos for mobile
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
        });

        // Handle orientation changes
        window.addEventListener('orientationchange', this.debounce(() => {
            // Force repaint after orientation change
            window.scrollTo(window.scrollX, window.scrollY);
        }, 100));
    }

    // Create scroll progress indicator
    createScrollProgress() {
        if (document.querySelector('.scroll-progress')) return;

        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress';
        progressContainer.innerHTML = '<div class="scroll-progress-bar"></div>';
        
        // Add CSS if not already present
        if (!document.querySelector('#scroll-progress-styles')) {
            const style = document.createElement('style');
            style.id = 'scroll-progress-styles';
            style.textContent = `
                .scroll-progress {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: rgba(0,0,0,0.1);
                    z-index: 10000;
                    pointer-events: none;
                }
                .scroll-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #e74c3c, #c0392b);
                    transform-origin: left;
                    transform: scaleX(0);
                    transition: transform 0.1s ease;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(progressContainer);
    }

    // Video optimizations
    initVideoOptimizations() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Optimize video loading
            video.addEventListener('loadeddata', () => {
                video.classList.add('loaded');
            }, { once: true });

            // Handle video errors gracefully
            video.addEventListener('error', () => {
                console.warn('Video failed to load, showing fallback');
                const fallback = video.nextElementSibling;
                if (fallback && fallback.tagName === 'IMG') {
                    fallback.style.display = 'block';
                    video.style.display = 'none';
                }
            }, { once: true });
        });
    }

    // Cleanup method
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        // Clear throttled functions
        this.throttledFunctions.clear();
        
        this.isInitialized = false;
    }
}

// Utility functions
const Utils = {
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#27ae60' : '#e74c3c',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Show notification
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },

    // Handle orders
    handleOrder(item, price) {
        const message = `¡Hola! Me gustaría pedir: ${item} - ${price}`;
        const whatsappUrl = `https://wa.me/34911234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    },

    // Make reservation
    makeReservation() {
        const message = '¡Hola! Me gustaría hacer una reserva de mesa. ¿Podrían ayudarme con la disponibilidad?';
        const whatsappUrl = `https://wa.me/34911234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.snackGoApp = new SnackGoApp();
    });
} else {
    window.snackGoApp = new SnackGoApp();
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SnackGoApp, Utils };
}