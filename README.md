# README.md – Invitación de Boda Interactiva (Ultra Detallado)

## Descripción del Proyecto
Invitación digital interactiva para nuestra boda, creada con HTML, CSS y JavaScript, con integración a Google Sheets para gestionar confirmaciones de asistencia automáticamente.  

Este README funciona como **manual completo de desarrollo**, ideal para VS Code y asistentes de IA, incluyendo mini-guías de código, estructura de archivos, animaciones, UX/UI y ejemplos listos para copiar y personalizar.

---

## Objetivo
Crear una experiencia interactiva única para los invitados, con:

- Landing page animada con partículas y efectos tipográficos  
- Formulario RSVP con validaciones y envío automático a Google Sheets  
- Confirmación visual de asistencia con animaciones y confetti  
- Totalmente responsive y optimizada para móviles, tablets y desktop  
- Estética moderna y divertida (“vibe coding”) con paleta violeta/cian  

---

## Características Clave

- 🎉 **Landing Page Animada**: anime.js + partículas dinámicas con particles.js  
- 📋 **Formulario RSVP**: validación, envío a Google Sheets, feedback visual y animaciones  
- ⏱️ **Cuenta Regresiva**: temporizador dinámico hasta el día de la boda  
- 📱 **Responsive**: compatible con todos los dispositivos  
- 🎨 **Estilo “Vibe Coding”**: paleta violeta/cian, tipografía personalizada y transiciones suaves  
- 🔄 **Transiciones y Microinteracciones**: hover effects, focus smooth, shake en errores y checkmark con confetti en éxito  

---

## Estructura del Proyecto

invitacion-boda-interactiva/
├── assets/
│ ├── fonts/
│ │ └── custom-fonts.css # Tipografías personalizadas
│ ├── images/
│ │ ├── background.svg
│ │ ├── couple.svg
│ │ ├── decorations/
│ │ │ ├── flower1.svg
│ │ │ ├── flower2.svg
│ │ │ └── rings.svg
│ │ └── icons/
│ │ ├── calendar.svg
│ │ ├── location.svg
│ │ ├── gift.svg
│ │ └── dress.svg
│ └── animations/
│ └── particles.json
├── css/
│ ├── main.css
│ ├── landing.css
│ ├── form.css
│ ├── animations.css
│ └── responsive.css
├── js/
│ ├── main.js
│ ├── animations.js
│ ├── form-handler.js
│ ├── validation.js
│ └── google-sheets-api.js
├── lib/
│ ├── anime.min.js
│ └── particles.min.js
├── pages/
│ ├── landing.html
│ ├── rsvp.html
│ ├── confirmation.html
│ └── info.html
├── index.html
├── .gitignore
└── README.md

php-template
Copiar código

> Mantener esta estructura facilita la modularidad, escalabilidad y permite que VS Code + IA autogenere secciones y animaciones de manera precisa.

---

## Mini-Guías de Código

### 1️⃣ Landing Page (`landing.html`)
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Jose & [Nombre] - Invitación</title>
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/landing.css">
  <script src="../lib/anime.min.js"></script>
  <script src="../lib/particles.min.js"></script>
  <script src="../js/animations.js" defer></script>
</head>
<body>
  <section id="hero">
    <img src="../assets/images/couple.svg" alt="Pareja" class="hero-img">
    <h1 id="hero-title">Jose & [Nombre]</h1>
    <button id="rsvp-button">Confirmar Asistencia</button>
  </section>
</body>
</html>
Tip IA: VS Code puede autocompletar secciones <section> y animaciones usando id y class.

2️⃣ Animaciones (animations.js)
javascript
Copiar código
// Cargar partículas de fondo
particlesJS.load('hero', '../assets/animations/particles.json', () => {
  console.log('Partículas cargadas');
});

// Animación del título
anime({
  targets: '#hero-title',
  translateY: [-50, 0],
  opacity: [0, 1],
  duration: 1500,
  easing: 'easeOutExpo'
});

// Botón RSVP animación hover
const btn = document.getElementById('rsvp-button');
btn.addEventListener('mouseenter', () => {
  anime({ targets: btn, scale: 1.1, duration: 300, easing: 'easeInOutQuad' });
});
btn.addEventListener('mouseleave', () => {
  anime({ targets: btn, scale: 1, duration: 300, easing: 'easeInOutQuad' });
});
3️⃣ Formulario RSVP (rsvp.html)
html
Copiar código
<form id="rsvp-form">
  <input type="text" name="nombre" placeholder="Tu nombre" required>
  <input type="email" name="email" placeholder="Tu email" required>
  <select name="asistencia" required>
    <option value="">Selecciona</option>
    <option value="si">Sí, asistiré</option>
    <option value="no">No podré asistir</option>
  </select>
  <textarea name="comentarios" placeholder="Comentarios (opcional)"></textarea>
  <button type="submit">Enviar</button>
</form>
<script src="../js/validation.js" defer></script>
<script src="../js/form-handler.js" defer></script>
4️⃣ Validación y Envío (form-handler.js)
javascript
Copiar código
const form = document.getElementById('rsvp-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (validateForm(form)) {
    sendToGoogleSheets(new FormData(form))
      .then(() => {
        anime({
          targets: form,
          opacity: [1, 0],
          duration: 500,
          easing: 'easeInOutQuad',
          complete: () => window.location.href = 'confirmation.html'
        });
      })
      .catch(err => alert("Error enviando datos: " + err));
  }
});
5️⃣ Conexión con Google Sheets (google-sheets-api.js)
javascript
Copiar código
async function sendToGoogleSheets(formData) {
  const endpoint = 'TU_ENDPOINT_GOOGLE_SHEETS';
  try {
    await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error al enviar a Google Sheets:", error);
  }
}
6️⃣ Estilos CSS (main.css)
css
Copiar código
body {
  font-family: 'CustomFont', sans-serif;
  background-color: #f2f0ff;
  color: #3b2c9a;
  margin: 0;
  overflow-x: hidden;
}

#hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
Animaciones adicionales en animations.css

Media queries en responsive.css

Flujo de Datos
nginx
Copiar código
Invitado → Landing Page → Formulario RSVP → Google Sheets → Confirmation Page
Scripts separados (animations.js, form-handler.js, google-sheets-api.js) para modularidad y escalabilidad.

Permite ampliaciones: notificaciones, mapas, confetti animado, temporizador regresivo.

Próximos Extras
Confetti al enviar formulario

Temporizador regresivo hasta el día de la boda

Integración con mapa interactivo o lista de regalos

Mejora de accesibilidad y compatibilidad cross-browser

Inspiración y Notas
Estilo “Vibe coding”: moderno, animaciones suaves, UX divertida

Cada archivo y función modular para ampliar y mantener escalabilidad

Testear con datos ficticios antes de producción para garantizar funcionalidad

Creado con ❤️ por Jose Alba Caro para nuestra boda – 16 de mayo de 2026