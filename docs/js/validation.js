// validation.js - Validaciones del formulario RSVP

// Objeto con las reglas de validación
const validationRules = {
    nombre: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        message: 'Por favor ingresa un nombre válido (solo letras y espacios)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Por favor ingresa un email válido'
    },
    asistencia: {
        required: true,
        message: 'Por favor selecciona si asistirás o no'
    }
};

// Mensajes de error personalizados
const errorMessages = {
    required: 'Este campo es obligatorio',
    minLength: 'Debe tener al menos {min} caracteres',
    pattern: 'El formato no es válido',
    email: 'Por favor ingresa un email válido'
};

// Función principal de validación
function validateForm(form) {
    let isValid = true;
    const formData = new FormData(form);
    
    // Validar cada campo
    for (const [fieldName, rules] of Object.entries(validationRules)) {
        const input = form.querySelector(`[name="${fieldName}"]`);
        const value = formData.get(fieldName);
        
        if (!validateField(input, value, rules)) {
            isValid = false;
        }
    }
    
    return isValid;
}

// Validar un campo individual
function validateField(input, value, rules) {
    let isValid = true;
    let errorMessage = '';
    
    // Limpiar errores previos
    if (typeof hideInputError === 'function') {
        hideInputError(input);
    }
    
    // Validación required
    if (rules.required && (!value || value.trim() === '')) {
        isValid = false;
        errorMessage = errorMessages.required;
    }
    
    // Si el campo está vacío y no es required, no validar el resto
    if (!value || value.trim() === '') {
        if (isValid) return true;
    } else {
        // Validación minLength
        if (rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = errorMessages.minLength.replace('{min}', rules.minLength);
        }
        
        // Validación pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message || errorMessages.pattern;
        }
    }
    
    // Mostrar error si es necesario
    if (!isValid) {
        showFieldError(input, errorMessage);
    }
    
    return isValid;
}

// Mostrar error en un campo
function showFieldError(input, message) {
    input.classList.add('error');
    
    // Buscar o crear mensaje de error
    let errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        input.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Animación de error si está disponible
    if (typeof showInputError === 'function') {
        showInputError(input);
    }
}

// Validación en tiempo real
function setupRealTimeValidation() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;
    
    // Validar al perder el foco
    Object.keys(validationRules).forEach(fieldName => {
        const input = form.querySelector(`[name="${fieldName}"]`);
        if (input) {
            input.addEventListener('blur', function() {
                const value = this.value;
                const rules = validationRules[fieldName];
                validateField(this, value, rules);
            });
            
            // Limpiar errores al escribir
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    if (typeof hideInputError === 'function') {
                        hideInputError(this);
                    }
                }
            });
        }
    });
}

// Funciones de validación específicas
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function validateName(name) {
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return pattern.test(name) && name.length >= 2;
}

function sanitizeInput(input) {
    return input.trim().replace(/\s+/g, ' ');
}

// Función para limpiar todos los errores del formulario
function clearFormErrors() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;
    
    const errorInputs = form.querySelectorAll('.error');
    const errorMessages = form.querySelectorAll('.error-message.show');
    
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
    
    errorMessages.forEach(message => {
        message.classList.remove('show');
    });
}

// Función para obtener datos del formulario limpio
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        data[key] = sanitizeInput(value);
    }
    
    // Agregar timestamp
    data.timestamp = new Date().toISOString();
    data.userAgent = navigator.userAgent;
    
    return data;
}

// Validaciones adicionales para futuros campos
const extendedValidations = {
    phone: {
        pattern: /^[\+]?[0-9\s\-\(\)]{9,15}$/,
        message: 'Por favor ingresa un teléfono válido'
    },
    guests: {
        min: 1,
        max: 10,
        message: 'El número de invitados debe estar entre 1 y 10'
    }
};

// Inicializar validaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupRealTimeValidation();
});

// Exportar funciones para uso en otros archivos
window.validateForm = validateForm;
window.validateField = validateField;
window.clearFormErrors = clearFormErrors;
window.getFormData = getFormData;
