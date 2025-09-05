// Este archivo contiene funciones para validar los datos del formulario antes de enviarlos.

function validateForm(form) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const attendance = form.attendance.value;
    const guests = form.guests.value;
    const dietary = form.dietary.value.trim();

    let errors = [];

    if (name === "") {
        errors.push("El nombre es obligatorio.");
    }

    if (email === "") {
        errors.push("El correo electrónico es obligatorio.");
    } else if (!validateEmail(email)) {
        errors.push("El correo electrónico no es válido.");
    }

    if (attendance === "") {
        errors.push("Debes confirmar tu asistencia.");
    }

    if (guests < 1 || guests > 10) {
        errors.push("El número de acompañantes debe estar entre 1 y 10.");
    }

    if (errors.length > 0) {
        displayErrors(errors);
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function displayErrors(errors) {
    const errorContainer = document.getElementById('error-messages');
    errorContainer.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
    errorContainer.style.display = 'block';
}