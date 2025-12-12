// Variables globales para la página
let scrollProgress = 0;
let visitorsCount = 1247;
let ordersCount = 3892;

// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle del menú móvil
    const navOverlay = document.querySelector('.nav-overlay');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer click en el overlay
    navOverlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.menu-item, .featured-item, .info-item, .contact-btn, .feature');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto parallax sutil en el hero video
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVideo = document.querySelector('.hero-video video');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroVideo && scrolled < window.innerHeight) {
            heroVideo.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
        }
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * -0.1}px)`;
        }
    });

    // Contador animado para precios (opcional)
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = `€${current.toFixed(2)}`;
        }, 20);
    }

    // Efecto hover en las tarjetas del menú
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Funcionalidad del botón flotante
    const floatingBtn = document.querySelector('.floating-btn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function(e) {
            // Añadir efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Mostrar/ocultar botón flotante según scroll
    window.addEventListener('scroll', function() {
        const floatingOrder = document.querySelector('.floating-order');
        if (window.scrollY > 300) {
            floatingOrder.style.opacity = '1';
            floatingOrder.style.visibility = 'visible';
        } else {
            floatingOrder.style.opacity = '0';
            floatingOrder.style.visibility = 'hidden';
        }
    });

    // Efecto de typing en el hero (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Inicializar efectos
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }
});

// Función para manejar el formulario de contacto (si se añade)
function handleContactForm(event) {
    event.preventDefault();
    
    // Aquí se puede añadir lógica para enviar el formulario
    const formData = new FormData(event.target);
    
    // Mostrar mensaje de confirmación
    showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para manejar pedidos
function handleOrder(item, price) {
    const message = `¡Hola! Me gustaría pedir: ${item} - ${price}`;
    const whatsappUrl = `https://wa.me/34911234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Añadir funcionalidad a los botones de llamada
document.addEventListener('DOMContentLoaded', function() {
    const callButtons = document.querySelectorAll('.btn-secondary');
    callButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Los botones ya tienen href="tel:" así que no necesitamos preventDefault
            showNotification('Llamando al restaurante...', 'info');
        });
    });
});

// Función para manejar llamadas directas
function makeCall() {
    window.location.href = 'tel:+34911234567';
}

// Función para reservas por WhatsApp
function makeReservation() {
    const message = '¡Hola! Me gustaría hacer una reserva de mesa. ¿Podrían ayudarme con la disponibilidad?';
    const whatsappUrl = `https://wa.me/34911234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Función para reproducir video (placeholder)
function playVideo() {
    showNotification('Video de la cocina próximamente disponible', 'info');
}



// Mejorar el botón flotante para llamadas
document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.querySelector('.floating-btn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function(e) {
            // El enlace tel: ya maneja la llamada, solo añadimos efecto visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

// Animaciones de entrada mejoradas
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.menu-item, .featured-item, .feature, .info-item').forEach(el => {
    animationObserver.observe(el);
});

// Preloader y carga del video
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const heroVideo = document.querySelector('.hero-video video');
    const heroFallback = document.querySelector('.hero-fallback');
    
    // Manejar carga del video
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', function() {
            this.classList.add('loaded');
            if (heroFallback) {
                heroFallback.style.display = 'none';
            }
        });
        
        heroVideo.addEventListener('error', function() {
            console.log('Video failed to load, using fallback image');
            if (heroFallback) {
                heroFallback.style.display = 'block';
            }
        });
        
        // Fallback si el video no carga en 3 segundos
        setTimeout(() => {
            if (!heroVideo.classList.contains('loaded')) {
                console.log('Video timeout, using fallback image');
                heroVideo.style.display = 'none';
                if (heroFallback) {
                    heroFallback.style.display = 'block';
                }
            }
        }, 3000);
    }
    
    // Ocultar preloader
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Lazy loading mejorado para imágenes
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ===== NUEVAS FUNCIONALIDADES PROFESIONALES =====

// 1. INDICADOR DE PROGRESO DE SCROLL
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
    });
}

// 3. ANIMACIONES AL HACER SCROLL MEJORADAS
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                

            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    document.querySelectorAll('.menu-section, .featured-item, .info-item').forEach(el => {
        scrollObserver.observe(el);
    });
}

// 4. EFECTOS HOVER MEJORADOS (ya implementados en CSS)



// Inicializar todas las nuevas funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Crear indicador de progreso
    createScrollProgress();
    

    
    // Inicializar animaciones de scroll
    setTimeout(() => {
        initScrollAnimations();
    }, 100);
    

});
// ===== OPTIMIZACIONES PARA MÓVILES =====

// Detectar dispositivos móviles
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimizaciones específicas para móviles
document.addEventListener('DOMContentLoaded', function() {
    if (isMobile()) {
        // Reducir animaciones en móviles para mejor performance
        document.body.classList.add('mobile-device');
        
        // Mejorar el scroll en iOS
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Prevenir zoom accidental en inputs
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                document.querySelector('meta[name=viewport]').setAttribute('content', 
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            });
            
            input.addEventListener('blur', function() {
                document.querySelector('meta[name=viewport]').setAttribute('content', 
                    'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
            });
        });
        
        // Optimizar videos para móviles
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
        });
    }
    
    // Mejorar el menú hamburguesa para touch
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Añadir área de touch más grande
        hamburger.style.padding = '15px';
        
        // Cerrar menú al tocar fuera
        document.addEventListener('touchstart', function(e) {
            if (navMenu.classList.contains('active') && 
                !hamburger.contains(e.target) && 
                !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.querySelector('.nav-overlay').classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Optimizar botón flotante para móviles
    const floatingBtn = document.querySelector('.floating-btn');
    if (floatingBtn && isMobile()) {
        // Hacer el botón más grande en móviles
        floatingBtn.style.padding = '1rem 1.2rem';
        floatingBtn.style.fontSize = '0.9rem';
        
        // Añadir vibración en dispositivos compatibles
        floatingBtn.addEventListener('click', function() {
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    }
    
    // Mejorar performance en scroll para móviles
    let ticking = false;
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking && isMobile()) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    });
});

// Función para manejar orientación en móviles
window.addEventListener('orientationchange', function() {
    // Pequeño delay para que el navegador se ajuste
    setTimeout(function() {
        // Recalcular alturas si es necesario
        const hero = document.querySelector('.hero');
        if (hero && isMobile()) {
            if (window.orientation === 90 || window.orientation === -90) {
                // Landscape
                hero.style.minHeight = '100vh';
            } else {
                // Portrait
                hero.style.minHeight = '70vh';
            }
        }
        
        // Forzar repaint
        window.scrollTo(window.scrollX, window.scrollY);
    }, 100);
});

// Mejorar performance de imágenes en móviles
document.addEventListener('DOMContentLoaded', function() {
    if (isMobile()) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Lazy loading nativo si está disponible
            if ('loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }
            
            // Optimizar calidad para móviles
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        });
    }
});

// Función para optimizar touch events
function addTouchOptimizations() {
    const touchElements = document.querySelectorAll('.contact-btn, .btn-primary, .btn-secondary, .menu-section, .featured-item');
    
    touchElements.forEach(element => {
        // Añadir feedback visual en touch
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Prevenir doble tap zoom en estos elementos
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
}

// Inicializar optimizaciones touch
if (isMobile()) {
    document.addEventListener('DOMContentLoaded', addTouchOptimizations);
}

// Función para manejar el teclado virtual en móviles
window.addEventListener('resize', function() {
    if (isMobile()) {
        // Detectar si el teclado virtual está abierto
        const heightDifference = window.screen.height - window.innerHeight;
        const isKeyboardOpen = heightDifference > 150;
        
        if (isKeyboardOpen) {
            document.body.classList.add('keyboard-open');
            // Ocultar elementos que puedan interferir
            const floatingBtn = document.querySelector('.floating-order');
            if (floatingBtn) {
                floatingBtn.style.display = 'none';
            }
        } else {
            document.body.classList.remove('keyboard-open');
            const floatingBtn = document.querySelector('.floating-order');
            if (floatingBtn) {
                floatingBtn.style.display = 'block';
            }
        }
    }
});