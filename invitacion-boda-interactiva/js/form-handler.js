// File: /invitacion-boda-interactiva/invitacion-boda-interactiva/js/form-handler.js

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz9-uQxZv3vNOTwCQNk4StHifh0ypYjrW7fVlNBz2qp7D9vX5Vqyam3nSy0gvrRZqCfnQ/exec";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvpForm');
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;

        submitBtn.disabled = true;
        showToast('Enviando…', 'ok');

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
                let data = {};
                try { data = await res.json(); } catch (_) {}
                const ok = data.ok !== false;
                if (ok) {
                    showToast('¡Gracias! Tu confirmación ha sido registrada ✅', 'ok');
                    form.reset();
                } else {
                    showToast('No se pudo registrar. Inténtalo de nuevo más tarde.', 'err');
                }
            } else {
                showToast('Servidor no disponible ahora mismo. Prueba en unos minutos.', 'err');
            }
        } catch (err) {
            console.error(err);
            showToast('Error de red. Comprueba tu conexión e inténtalo de nuevo.', 'err');
        } finally {
            submitBtn.disabled = false;
        }
    });

    function showToast(msg, type = 'ok') {
        toast.textContent = msg;
        toast.className = `toast show ${type}`;
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }
});