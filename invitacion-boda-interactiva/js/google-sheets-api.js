const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

async function sendDataToGoogleSheets(data) {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error al enviar datos a Google Sheets:', error);
        throw error;
    }
}

function handleFormSubmission(form) {
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        attendance: form.attendance.value,
        guests: Number(form.guests.value || '1'),
        dietary: form.dietary.value.trim(),
        message: form.message.value.trim(),
        ua: navigator.userAgent
    };

    return sendDataToGoogleSheets(formData);
}