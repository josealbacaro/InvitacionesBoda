// form-handler.js - Manejo del formulario RSVP

document.addEventListener('DOMContentLoaded', function() {
    initializeFormHandler();
});

function initializeFormHandler() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;
    
    // Configurar el event listener del formulario
    form.addEventListener('submit', handleFormSubmit);
    
    // Configurar botones adicionales si existen
    setupAdditionalButtons();
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('#submit-btn');
    
    try {
        // Validar formulario
        if (!validateForm(form)) {
            console.log('Formulario no válido');
            return;
        }
        
        // Mostrar estado de carga
        setButtonLoading(submitButton, true);
        
        // Obtener datos del formulario
        // Usar la función getFormData del archivo externo
        if (typeof getFormData === 'undefined') {
            console.error('No se encontró la función getFormData. Asegúrate de importar js/get-form-data.js en tu HTML.');
            return;
        }
        const formData = getFormData(form);
        
        console.log('Enviando datos:', formData);
        
        // Enviar datos a Google Sheets
        const success = await sendToGoogleSheets(formData);
        
        if (success) {
            // Éxito - mostrar animación y redirigir
            await showSuccessAnimation();
            animateFormSuccess();
        } else {
            throw new Error('Error al enviar los datos');
        }
        
    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        showErrorMessage('Hubo un error al enviar tu confirmación. Por favor intenta de nuevo.');
        setButtonLoading(submitButton, false);
    }
}

function showSuccessAnimation() {
    return new Promise((resolve) => {
        // Mostrar mensaje de éxito temporal
        const successMessage = createSuccessMessage();
        document.body.appendChild(successMessage);
        
        // Animación de aparición
        if (typeof anime !== 'undefined') {
            anime({
                targets: successMessage,
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 500,
                easing: 'easeOutBack',
                complete: () => {
                    setTimeout(() => {
                        anime({
                            targets: successMessage,
                            opacity: [1, 0],
                            scale: [1, 0.8],
                            duration: 300,
                            easing: 'easeInBack',
                            complete: () => {
                                successMessage.remove();
                                resolve();
                            }
                        });
                    }, 1500);
                }
            });
        } else {
            setTimeout(() => {
                successMessage.remove();
                resolve();
            }, 2000);
        }
    });
}

function createSuccessMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--primary-violet), var(--primary-cyan));
            color: white;
            padding: 2rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-strong);
            text-align: center;
            z-index: 9999;
            opacity: 0;
        ">
            <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
            <h3 style="margin: 0 0 0.5rem 0; color: white;">¡Confirmación enviada!</h3>
            <p style="margin: 0; opacity: 0.9;">Gracias por confirmar tu asistencia</p>
        </div>
    `;
    return message;
}

function showErrorMessage(message) {
    // Crear elemento de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-strong);
            z-index: 9999;
            max-width: 300px;
        ">
            <strong>Error:</strong> ${message}
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Animar entrada
    if (typeof anime !== 'undefined') {
        anime({
            targets: errorDiv.firstElementChild,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutBack'
        });
    }
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (typeof anime !== 'undefined') {
            anime({
                targets: errorDiv.firstElementChild,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInBack',
                complete: () => errorDiv.remove()
            });
        } else {
            errorDiv.remove();
        }
    }, 5000);
}

function setupAdditionalButtons() {
    // Configurar botón de limpiar formulario si existe
    const clearButton = document.querySelector('[data-action="clear"]');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            const form = document.getElementById('rsvp-form');
            if (form) {
                form.reset();
                clearFormErrors();
            }
        });
    }
    
    // Configurar botón de volver
    const backButton = document.querySelector('.back-link');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: document.body,
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeInQuad',
                    complete: () => {
                        window.location.href = this.href;
                    }
                });
            } else {
                window.location.href = this.href;
            }
        });
    }
}

// Funciones de utilidad para el manejo del formulario
function prepareFormData(formData) {
    // Agregar información adicional
    const enrichedData = {
        ...formData,
        submitTime: new Date().toLocaleString('es-ES', {
            timeZone: 'Europe/Madrid'
        }),
        browserInfo: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform
        }
    };
    
    return enrichedData;
}

function validateFormBeforeSubmit(form) {
    // Validación adicional antes del envío
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo es obligatorio');
            allValid = false;
        }
    });
    
    return allValid && validateForm(form);
}

// Guardar borrador en localStorage
function saveDraft() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const draft = {};
    
    for (const [key, value] of formData.entries()) {
        if (value.trim()) {
            draft[key] = value.trim();
        }
    }
    
    localStorage.setItem('rsvp-draft', JSON.stringify(draft));
}

// Cargar borrador desde localStorage
function loadDraft() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;
    
    try {
        const draft = JSON.parse(localStorage.getItem('rsvp-draft') || '{}');
        
        Object.entries(draft).forEach(([key, value]) => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = value;
            }
        });
    } catch (error) {
        console.log('No se pudo cargar el borrador:', error);
    }
}

// Auto-guardar borrador mientras el usuario escribe
function setupAutoSave() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;
    
    let saveTimeout;
    
    form.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveDraft, 1000); // Guardar después de 1 segundo de inactividad
    });
}

// Limpiar borrador después del envío exitoso
function clearDraft() {
    localStorage.removeItem('rsvp-draft');
}

// Inicializar auto-guardado y carga de borrador
document.addEventListener('DOMContentLoaded', function() {
    loadDraft();
    setupAutoSave();
});

// Limpiar borrador cuando se envía exitosamente
window.addEventListener('beforeunload', function() {
    // No limpiar automáticamente, solo si el envío fue exitoso
});

// Exportar funciones para uso en otros archivos
window.handleFormSubmit = handleFormSubmit;
window.showErrorMessage = showErrorMessage;
window.clearDraft = clearDraft;
