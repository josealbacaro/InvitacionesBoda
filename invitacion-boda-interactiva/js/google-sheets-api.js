// google-sheets-api.js - Integración con Google Sheets

// URL del Google Apps Script (debes reemplazar con tu URL real)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

/**
 * Envía datos del formulario RSVP a Google Sheets
 * @param {Object} formData - Los datos del formulario
 * @returns {Promise<boolean>} - True si el envío fue exitoso
 */
async function sendToGoogleSheets(formData) {
    try {
        console.log('Intentando enviar datos a Google Sheets:', formData);
        
        // Preparar datos para envío
        const payload = prepareDataForSubmission(formData);
        
        // Realizar petición HTTP
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        // Verificar respuesta
        if (response.ok) {
            const result = await response.json();
            console.log('Respuesta de Google Sheets:', result);
            
            if (result.success || result.status === 'success') {
                console.log('✅ Datos enviados exitosamente a Google Sheets');
                return true;
            } else {
                console.error('❌ Error en la respuesta de Google Sheets:', result.error || result.message);
                return false;
            }
        } else {
            console.error('❌ Error HTTP al enviar a Google Sheets:', response.status, response.statusText);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error al enviar datos a Google Sheets:', error);
        
        // Intentar guardar localmente como respaldo
        saveToLocalStorage(formData);
        
        return false;
    }
}

/**
 * Prepara los datos del formulario para envío a Google Sheets
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Datos preparados para envío
 */
function prepareDataForSubmission(formData) {
    const timestamp = new Date();
    
    return {
        // Datos del formulario
    name: formData.name || '',
    email: formData.email || '',
    attendance: formData.attendance || '',
    message: formData.message || '',
        
        // Metadatos
        fechaEnvio: timestamp.toISOString(),
        fechaEnvioLocal: timestamp.toLocaleString('es-ES', {
            timeZone: 'Europe/Madrid',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }),
        
        // Información técnica
        userAgent: navigator.userAgent,
        idioma: navigator.language,
        plataforma: navigator.platform,
        url: window.location.href,
        referrer: document.referrer || 'Directo',
        
        // Información de pantalla
        screenResolution: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        
        // Identificador único para evitar duplicados
        sessionId: generateSessionId()
    };
}

/**
 * Genera un ID único para la sesión
 * @returns {string} - ID único
 */
function generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Guarda los datos localmente como respaldo
 * @param {Object} formData - Datos del formulario
 */
function saveToLocalStorage(formData) {
    try {
        const backupData = {
            ...formData,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        // Obtener datos existentes
        const existingData = JSON.parse(localStorage.getItem('rsvp-backup') || '[]');
        existingData.push(backupData);
        
        // Guardar datos actualizados
        localStorage.setItem('rsvp-backup', JSON.stringify(existingData));
        
        console.log('📱 Datos guardados localmente como respaldo');
    } catch (error) {
        console.error('Error al guardar respaldo local:', error);
    }
}

/**
 * Obtiene los datos de respaldo guardados localmente
 * @returns {Array} - Array de datos de respaldo
 */
function getLocalBackupData() {
    try {
        return JSON.parse(localStorage.getItem('rsvp-backup') || '[]');
    } catch (error) {
        console.error('Error al obtener datos de respaldo:', error);
        return [];
    }
}

/**
 * Intenta reenviar datos de respaldo pendientes
 */
async function retryPendingSubmissions() {
    const backupData = getLocalBackupData();
    const pendingData = backupData.filter(item => item.status === 'pending');
    
    if (pendingData.length === 0) {
        console.log('No hay envíos pendientes');
        return;
    }
    
    console.log(`Intentando reenviar ${pendingData.length} envíos pendientes...`);
    
    for (const data of pendingData) {
        try {
            const success = await sendToGoogleSheets(data);
            if (success) {
                // Marcar como enviado exitosamente
                data.status = 'sent';
                data.sentAt = new Date().toISOString();
            }
        } catch (error) {
            console.error('Error al reenviar datos pendientes:', error);
        }
    }
    
    // Actualizar localStorage
    localStorage.setItem('rsvp-backup', JSON.stringify(backupData));
}

/**
 * Limpia los datos de respaldo ya enviados
 */
function cleanupBackupData() {
    try {
        const backupData = getLocalBackupData();
        const pendingData = backupData.filter(item => item.status === 'pending');
        
        if (pendingData.length < backupData.length) {
            localStorage.setItem('rsvp-backup', JSON.stringify(pendingData));
            console.log('🧹 Datos de respaldo limpiados');
        }
    } catch (error) {
        console.error('Error al limpiar datos de respaldo:', error);
    }
}

/**
 * Verifica el estado de conectividad y reintenta envíos pendientes
 */
function setupConnectivityCheck() {
    // Verificar cuando la conexión se restablece
    window.addEventListener('online', () => {
        console.log('🌐 Conexión restablecida, intentando reenviar datos pendientes...');
        setTimeout(retryPendingSubmissions, 1000);
    });
    
    // Limpiar datos de respaldo periódicamente
    setInterval(cleanupBackupData, 30000); // Cada 30 segundos
}

/**
 * Simula el envío para desarrollo/testing
 * @param {Object} formData - Datos del formulario
 * @returns {Promise<boolean>} - Simula respuesta exitosa
 */
async function simulateGoogleSheetsSubmission(formData) {
    console.log('🧪 MODO DESARROLLO: Simulando envío a Google Sheets');
    console.log('Datos que se enviarían:', prepareDataForSubmission(formData));
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simular fallo ocasional (10% de probabilidad)
    if (Math.random() < 0.1) {
        throw new Error('Simulación de error de red');
    }
    
    return true;
}

// Configuración para desarrollo
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname.includes('github.io');

// Exportar funciones principales
if (isDevelopment) {
    // En desarrollo, usar simulación
    window.sendToGoogleSheets = simulateGoogleSheetsSubmission;
    console.log('🧪 Modo desarrollo activado - usando simulación de Google Sheets');
} else {
    // En producción, usar función real
    window.sendToGoogleSheets = sendToGoogleSheets;
}

// Exportar funciones de utilidad
window.getLocalBackupData = getLocalBackupData;
window.retryPendingSubmissions = retryPendingSubmissions;
window.cleanupBackupData = cleanupBackupData;

// Inicializar verificación de conectividad
document.addEventListener('DOMContentLoaded', setupConnectivityCheck);

// Configuración del Google Apps Script necesaria:
/*
GOOGLE APPS SCRIPT CÓDIGO:

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Abrir la hoja de cálculo (reemplaza con tu ID)
    const sheet = SpreadsheetApp.openById('TU_SPREADSHEET_ID').getActiveSheet();
    
    // Agregar fila con los datos
    sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.attendance || '',
    data.message || '',
    data.userAgent || '',
    data.sessionId || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'Google Apps Script funcionando'}))
    .setMimeType(ContentService.MimeType.JSON);
}
*/

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