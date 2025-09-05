// Extrae los datos del formulario RSVP y los adapta a los nombres esperados por el backend
function getFormData(form) {
    const formData = {};
    const elements = form.elements;
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (el.name && !el.disabled) {
            // Mapear los nombres antiguos a los nuevos si existieran
            if (el.name === 'nombre') formData['name'] = el.value.trim();
            else if (el.name === 'asistencia') formData['attendance'] = el.value.trim();
            else if (el.name === 'comentarios') formData['message'] = el.value.trim();
            else formData[el.name] = el.value.trim();
        }
    }
    return formData;
}

// Exportar para uso global si es necesario
window.getFormData = getFormData;
