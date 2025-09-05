# wireframe.md – Wireframe Ultra Detallado de la Invitación Interactiva

## Descripción
Este documento describe el **wireframe visual y funcional completo** de la invitación interactiva de boda.  
Incluye la disposición de elementos, IDs, clases, animaciones sugeridas y relaciones entre secciones.  
Ideal para VS Code + IA genere automáticamente la web.

---

## 1️⃣ Landing Page (`landing.html`)

+------------------------------------------------------+

ID: hero
[Imagen pareja]
<img src="../assets/images/couple.svg"
alt="Pareja" class="hero-img">
[Título]
<h1 id="hero-title">Jose & [Nombre]</h1>
[Subtítulo opcional]
<p id="hero-subtitle">¡Nos casamos el 16/05/2026!</p>
[Botón RSVP]
<button id="rsvp-button" class="cta-btn">Confirmar
asistencia</button>
[Fondo Partículas]
ID: particles-js-container
+------------------------------------------------------+

yaml
Copiar código

### Animaciones Sugeridas
- Hero: fade-in + bounce-in (`anime.js`)  
- Botón RSVP: scale-up + shadow dinámico hover  
- Imagen pareja: entrada suave con scale  
- Fondo: partículas dinámicas (`particles.js`)  
- Transición: scroll o fade al presionar botón RSVP  

---

## 2️⃣ Formulario RSVP (`rsvp.html`)

+------------------------------------------------------+

ID: rsvp-form
Campo Nombre
<input type="text" name="nombre" id="input-name"
placeholder="Tu nombre" required>
Campo Email
<input type="email" name="email" id="input-email"
placeholder="Tu email" required>
Campo Asistencia
<select name="asistencia" id="input-asistencia"
required>
<option value="">Selecciona</option>
<option value="si">Sí, asistiré</option>
<option value="no">No podré asistir</option>
</select>
Campo Comentarios (opcional)
<textarea name="comentarios" id="input-comments"
placeholder="Comentarios"></textarea>
Botón Enviar
<button type="submit" id="submit-btn">Enviar</button
+------------------------------------------------------+

yaml
Copiar código

### Animaciones Sugeridas
- Focus en inputs: borde destacado + ligero scale  
- Error: shake + color rojo  
- Éxito: checkmark + fade out + confetti opcional  

---

## 3️⃣ Confirmación (`confirmation.html`)

+------------------------------------------------------+

ID: confirmation-container
Mensaje Agradecimiento
<h2 id="thank-you-msg">Gracias por confirmar tu
asistencia!</h2>
Animación Checkmark
<div id="checkmark-animation"></div>
Confetti Opcional
<canvas id="confetti-canvas"></canvas>
Botón Volver / Info Opcional
<button id="back-btn">Volver a la landing</button>
+------------------------------------------------------+

yaml
Copiar código

### Animaciones Sugeridas
- Fade-in mensaje  
- Checkmark animado  
- Confetti con colores violeta/cian  
- Botón con hover scale  

---

## 4️⃣ Relación y Flujo Visual
Landing Page (hero + botón RSVP)
|
v
Formulario RSVP (inputs + submit)
|
v
Confirmation Page (mensaje + animaciones)

markdown
Copiar código

- IDs y clases se deben mantener consistentes para que `animations.js`, `form-handler.js` y `validation.js` funcionen correctamente.  
- Cada sección modular permite añadir microinteracciones adicionales, easter eggs, parallax o efectos extra sin romper el flujo.  

---

## 5️⃣ Paleta y Estilo Recomendado
- Violeta: #3b2c9a (texto y botones principales)  
- Cyan: #6cf0f3 (detalles y partículas)  
- Blanco: #f2f0ff (fondos y secciones)  
- Tipografía principal: `'CustomFont', sans-serif`  
- Animaciones: suaves y fluidas, con duración entre 300-1500ms según efecto  

---

## 6️⃣ Tips para IA / VS Code
- Utilizar los `id` para animaciones automáticas  
- Cada `section` y `form` modularizable para autocompletado  
- Mantener consistencia de clases (`cta-btn`, `hero-img`, `input-*`)  
- Assets separados en `assets/` para fácil reemplazo  
- Scripts separados (`animations.js`, `form-handler.js`, `google-sheets-api.js`) para modularidad  

**Creado con ❤️ por Jose Alba Caro para nuestra boda – 16 de mayo de 2026**