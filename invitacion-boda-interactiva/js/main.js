const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz9-uQxZv3vNOTwCQNk4StHifh0ypYjrW7fVlNBz2qp7D9vX5Vqyam3nSy0gvrRZqCfnQ/exec";

// Inicializar animaciones de entrada
function initLandingAnimations() {
    const background = document.querySelector('.background');
    const couple = document.querySelector('.couple');
    
    anime({
        targets: background,
        opacity: [0, 1],
        duration: 2000,
        easing: 'easeInOutQuad'
    });

    anime({
        targets: couple,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutExpo',
        delay: 500
    });
}

// Configurar el evento de envío del formulario
function setupFormSubmission() {
    const form = document.getElementById('rsvpForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;

        submitBtn.disabled = true;

        const payload = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            attendance: form.attendance.value,
            guests: Number(form.guests.value || '1'),
            dietary: form.dietary.value.trim(),
            message: form.message.value.trim(),
            ua: navigator.userAgent
        };

        try {
            const res = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const data = await res.json();
                if (data.ok !== false) {
                    alert('¡Gracias! Tu confirmación ha sido registrada ✅');
                    form.reset();
                } else {
                    alert('No se pudo registrar. Inténtalo de nuevo más tarde.');
                }
            } else {
                alert('Servidor no disponible ahora mismo. Prueba en unos minutos.');
            }
        } catch (err) {
            console.error(err);
            alert('Error de red. Comprueba tu conexión e inténtalo de nuevo.');
        } finally {
            submitBtn.disabled = false;
        }
    });
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    initLandingAnimations();
    setupFormSubmission();
});