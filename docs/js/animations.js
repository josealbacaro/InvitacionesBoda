// animations.js - Animaciones con anime.js y particles.js

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeParticles();
    initializeInteractions();
});

// Función principal para inicializar todas las animaciones
function initializeAnimations() {
    // Detectar qué página estamos visitando
    const isLanding = document.getElementById('hero');
    const isForm = document.getElementById('rsvp-form');
    const isConfirmation = document.getElementById('confirmation-container');

    if (isLanding) {
        initLandingAnimations();
    }
    
    if (isForm) {
        initFormAnimations();
    }
    
    if (isConfirmation) {
        initConfirmationAnimations();
    }
}

// Animaciones para la landing page
function initLandingAnimations() {
    // Animación de entrada de la tarjeta principal
    anime({
        targets: '.main-content',
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutBack',
        delay: 200
    });

    // Animación de la etiqueta de invitación
    anime({
        targets: '.invitation-label',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
        delay: 400
    });

    // Animación de la imagen de la pareja
    anime({
        targets: '.hero-img',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutBounce',
        delay: 600
    });

    // Animación de los nombres
    anime({
        targets: '.couple-names',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 800
    });

    // Animación de los detalles de la boda
    anime({
        targets: '.wedding-details',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
        delay: 1000
    });

    // Animación del mensaje de invitación
    anime({
        targets: '.invitation-message',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
        delay: 1200
    });

    // Animación de los botones de acción
    anime({
        targets: '.action-buttons',
        translateY: [20, 0],
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 600,
        easing: 'easeOutBack',
        delay: 1400
    });

    // Animación de los enlaces rápidos
    anime({
        targets: '.quick-links',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
        delay: 1600
    });

    // Animación individual de cada enlace rápido
    anime({
        targets: '.quick-link',
        translateY: [10, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuad',
        delay: anime.stagger(100, {start: 1700})
    });

    // Animación de las decoraciones
    anime({
        targets: '.decoration',
        opacity: [0, 0.6],
        scale: [0.5, 1],
        rotate: [0, 360],
        duration: 1500,
        easing: 'easeOutElastic',
        delay: anime.stagger(200, {start: 1000})
    });

    // Configurar hover animations para botones
    setupButtonHoverAnimations();
    setupLinkHoverAnimations();
}

// Animaciones para el formulario
function initFormAnimations() {
    // Animación de entrada de los grupos de formulario
    anime({
        targets: '.form-group',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
        delay: anime.stagger(100, {start: 200})
    });

    // Animación del header
    anime({
        targets: '.header',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
    });
}

// Animaciones para la página de confirmación
function initConfirmationAnimations() {
    // Las animaciones del checkmark ya están en el HTML inline
    // Aquí agregamos animaciones adicionales
    
    // Animación de las info cards
    anime({
        targets: '.info-card',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
        delay: anime.stagger(150, {start: 1200})
    });

    // Animación de los botones de acción
    anime({
        targets: '.action-buttons .btn',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutBack',
        delay: anime.stagger(100, {start: 1600})
    });
}

// Configurar hover effects para botones
function setupButtonHover() {
    const buttons = document.querySelectorAll('#rsvp-button, .cta-btn, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mousedown', function() {
            anime({
                targets: this,
                scale: 0.98,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseup', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Inicializar partículas de fondo
function initializeParticles() {
    const container = document.getElementById('particles-js-container');
    
    if (container && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js-container', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#3b2c9a", "#6cf0f3", "#8b5cf6"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6cf0f3",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Configurar microinteracciones
function initializeInteractions() {
    // Focus effects para inputs
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            anime({
                targets: this,
                scale: [1, 1.02],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        input.addEventListener('blur', function() {
            anime({
                targets: this,
                scale: [1.02, 1],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // Animación de error para formularios
    setupErrorAnimations();
}

// Configurar animaciones de error
function setupErrorAnimations() {
    window.showInputError = function(input) {
        input.classList.add('error');
        
        // Shake animation
        anime({
            targets: input,
            translateX: [0, -10, 10, -10, 10, 0],
            duration: 500,
            easing: 'easeInOutQuad'
        });
        
        // Mostrar mensaje de error
        const errorMsg = input.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.classList.add('show');
            anime({
                targets: errorMsg,
                opacity: [0, 1],
                translateY: [-10, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    };
    
    window.hideInputError = function(input) {
        input.classList.remove('error');
        
        const errorMsg = input.parentNode.querySelector('.error-message');
        if (errorMsg) {
            anime({
                targets: errorMsg,
                opacity: [1, 0],
                translateY: [0, -10],
                duration: 200,
                easing: 'easeInQuad',
                complete: () => {
                    errorMsg.classList.remove('show');
                }
            });
        }
    };
}

// Funciones de utilidad para animaciones
window.animateFormSuccess = function() {
    const form = document.getElementById('rsvp-form');
    if (form) {
        anime({
            targets: form,
            opacity: [1, 0],
            scale: [1, 0.95],
            duration: 600,
            easing: 'easeInQuad',
            complete: () => {
                // Redirigir a confirmación después de la animación
                window.location.href = 'confirmation.html';
            }
        });
    }
};

// Función para confetti (placeholder para futura implementación)
window.triggerConfetti = function() {
    console.log('🎉 ¡Confetti time!');
    // Aquí se puede implementar una librería de confetti como canvas-confetti
};

// Animación de carga para botones
window.setButtonLoading = function(button, loading = true) {
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
        
        if (btnText && btnLoading) {
            anime({
                targets: btnText,
                opacity: [1, 0],
                duration: 200,
                complete: () => {
                    anime({
                        targets: btnLoading,
                        opacity: [0, 1],
                        duration: 200
                    });
                }
            });
        }
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        
        if (btnText && btnLoading) {
            anime({
                targets: btnLoading,
                opacity: [1, 0],
                duration: 200,
                complete: () => {
                    anime({
                        targets: btnText,
                        opacity: [0, 1],
                        duration: 200
                    });
                }
            });
        }
    }
};

// Efecto parallax sutil para decoraciones
function initParallaxEffect() {
    const decorations = document.querySelectorAll('.decoration');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        decorations.forEach((decoration, index) => {
            const speed = 0.5 + (index * 0.1);
            decoration.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// Inicializar parallax si hay decoraciones
if (document.querySelectorAll('.decoration').length > 0) {
    initParallaxEffect();
}

// Funciones de hover para botones
function setupButtonHoverAnimations() {
    const buttons = document.querySelectorAll('.cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mousedown', () => {
            anime({
                targets: button,
                scale: 0.98,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseup', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Funciones de hover para enlaces rápidos
function setupLinkHoverAnimations() {
    const links = document.querySelectorAll('.quick-link');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                translateY: -3,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                translateY: 0,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Agregar funcionalidad a los enlaces rápidos
document.addEventListener('DOMContentLoaded', function() {
    // Enlace del calendario
    const calendarLink = document.getElementById('calendar-link');
    if (calendarLink) {
        calendarLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Crear evento de calendario
            const startDate = new Date('2026-05-16T12:00:00');
            const endDate = new Date('2026-05-17T02:00:00');
            const title = 'Boda Jose Alba Caro & Emma Wikermark';
            const location = 'Parroquia de Nuestra Señora del Rosario, Fuengirola';
            
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&location=${encodeURIComponent(location)}&details=${encodeURIComponent('¡Nos casamos! Esperamos verte ahí.')}`;
            
            window.open(googleCalendarUrl, '_blank');
        });
    }
    
    // Enlace de ubicaciones
    const locationLink = document.getElementById('location-link');
    if (locationLink) {
        locationLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Mostrar modal con ambas ubicaciones
            const modal = `
                <div id="location-modal" style="
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 100%; 
                    background: rgba(0,0,0,0.8); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    z-index: 1000;
                ">
                    <div style="
                        background: white; 
                        padding: 2rem; 
                        border-radius: 16px; 
                        max-width: 500px; 
                        margin: 1rem;
                        text-align: center;
                    ">
                        <h3 style="margin-bottom: 1.5rem; color: #3b2c9a;">Ubicaciones</h3>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 0.5rem; color: #3b2c9a;">Ceremonia Religiosa</h4>
                            <p style="margin-bottom: 0.5rem; font-size: 0.9rem;">Parroquia de Nuestra Señora del Rosario</p>
                            <p style="margin-bottom: 1rem; font-size: 0.8rem; color: #666;">Pl. de la Constitución, 19, 29640 Fuengirola, Málaga</p>
                            <a href="https://maps.app.goo.gl/sozGZsFbfGZUa4ji7" target="_blank" 
                               style="background: linear-gradient(135deg, #3b2c9a, #6cf0f3); color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 8px; display: inline-block; margin-bottom: 1rem;">
                               Ver iglesia en Google Maps
                            </a>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 0.5rem; color: #3b2c9a;">Banquete y Celebración</h4>
                            <p style="margin-bottom: 0.5rem; font-size: 0.9rem;">Estival Torrequebrada</p>
                            <p style="margin-bottom: 1rem; font-size: 0.8rem; color: #666;">Av. del Sol, 89, 29630 Benalmádena, Málaga</p>
                            <a href="https://maps.app.goo.gl/tnas1uEiDg6E15i7A" target="_blank" 
                               style="background: linear-gradient(135deg, #3b2c9a, #6cf0f3); color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 8px; display: inline-block; margin-bottom: 1rem;">
                               Ver banquete en Google Maps
                            </a>
                        </div>
                        
                        <button onclick="document.getElementById('location-modal').remove()" 
                                style="background: #f0f0f0; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
                            Cerrar
                        </button>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modal);
        });
    }
    
    // Enlace de lista de regalos
    const giftLink = document.getElementById('gift-link');
    if (giftLink) {
        giftLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Mostrar modal o navegar a lista de regalos
            alert('¡Tu presencia es el mejor regalo! Si deseas tener un detalle con nosotros, agradecemos cualquier aportación económica por Bizum o en sobre el día de la boda.');
        });
    }
});
