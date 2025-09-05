# plan-accion.md – Plan de Acción Ultra Detallado

## Descripción
Documento estratégico que detalla **paso a paso la implementación** de la invitación interactiva de boda. Incluye fases, tareas, checklist de desarrollo, integración con Google Sheets, animaciones, UX/UI y testing.  

Ideal para seguir en VS Code y para que la IA genere el proyecto de manera ordenada.

---

## 1️⃣ Objetivo
Crear una invitación digital interactiva que permita a los invitados:

- Ver landing animada con información del evento  
- Confirmar asistencia mediante formulario RSVP  
- Recibir confirmación visual con animaciones y confetti  
- Enviar respuestas automáticamente a Google Sheets  

Todo esto con una **experiencia UX/UI atractiva, fluida y moderna**.

---

## 2️⃣ Estructura del Proyecto Recomendada
invitacion-boda-interactiva/
├── assets/
│ ├── fonts/ # Tipografías
│ ├── images/ # Ilustraciones, íconos, fotos pareja
│ └── animations/ # JSON de partículas, confetti
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

markdown
Copiar código

---

## 3️⃣ Fases de Implementación

### Fase 1: Preparación y Diseño
1. Revisar `index.html` y archivos existentes para identificar estructura base y recursos disponibles.  
2. Confirmar conexión con Google Sheets mediante Google Apps Script. Testear envío de datos.  
3. Definir **paleta de colores**, tipografía y estilo “vibe coding”.  
4. Recopilar contenido:
   - Fotos de la pareja  
   - Información de evento (lugar, fecha, hora)  
   - Textos personalizados y cronograma del día  
5. Crear mockups de las páginas:
   - Landing Page  
   - Formulario RSVP  
   - Confirmación  

**Objetivo:** tener claridad sobre lo que funciona y lo que se debe mejorar.

---

### Fase 2: Desarrollo de Landing Page
1. Crear página de entrada impactante:
   - Animación de entrada con `anime.js`  
   - Partículas animadas con `particles.js`  
   - Hero con nombres de los novios y efectos tipográficos  
   - Botón CTA “RSVP” con hover y bounce  
2. Implementar **cuenta regresiva**:
   - Contador dinámico hasta el día de la boda  
   - Animación de números  
   - Mensajes personalizados según tiempo restante  
3. Añadir **transición suave** hacia formulario RSVP.

---

### Fase 3: Formulario RSVP
1. Rediseñar disposición de campos para mejor UX:  
   - Nombre, email, asistencia (sí/no), comentarios opcionales  
2. Validaciones en tiempo real:
   - Campo requerido, formato de email válido  
   - Feedback visual con animaciones (`shake` en error, `checkmark` en éxito)  
3. Integración con Google Sheets:
   - Pruebas de envío en tiempo real  
   - Manejo de errores  
   - Feedback visual al usuario  
4. Funcionalidades extra:
   - Selección de menú con imágenes  
   - Campos opcionales para transporte o alojamiento  

---

### Fase 4: Animaciones y Experiencia Interactiva
1. Implementar animaciones con `anime.js`:
   - Fade-in, bounce y scale para textos y botones  
   - Transiciones entre secciones  
   - Animaciones en íconos y decoraciones  
2. Optimizar experiencia móvil:
   - Revisar todas las vistas para móviles y tablets  
   - Ajustar animaciones y tamaño de botones/inputs  
3. Detalles especiales:
   - Efectos de parallax en fondos  
   - Microinteracciones en formularios  
   - Confetti en envíos exitosos  

---

### Fase 5: Testing y Optimización
1. Pruebas exhaustivas:
   - Cross-browser (Chrome, Firefox, Safari)  
   - Funcionalidad del formulario y envío a Google Sheets  
   - Pruebas de accesibilidad y lectura de pantalla  
   - Rendimiento y tiempos de carga  
2. Preparar despliegue:
   - Mover archivos finales a `docs/` (GitHub Pages)  
   - Actualizar `index.html` principal  
   - Verificar rutas relativas y recursos cargados  
3. Monitoreo:
   - Revisar que los datos lleguen correctamente a Google Sheets  
   - Test con invitados de prueba para asegurar experiencia fluida  

---

## 4️⃣ Estrategia UI/UX
- **Landing Page:** Hero central, nombre de los novios, botón RSVP animado, partículas de fondo  
- **Formulario RSVP:** campos claros, validaciones en tiempo real, botón grande centrado, feedback visual  
- **Confirmación:** mensaje de agradecimiento, animación checkmark y confetti, link opcional a info adicional  
- **Transiciones y Animaciones:** fade, slide, scale, bounce, microinteracciones  
- **Paleta de colores:** Violeta `#3b2c9a`, Cyan `#6cf0f3`, Blanco `#f2f0ff`  

---

## 5️⃣ Próximos pasos inmediatos
1. Crear **landing.html** con hero y botón RSVP  
2. Implementar animaciones básicas con `anime.js` y `particles.js`  
3. Rediseñar y reorganizar el formulario RSVP actual para mejor UX  
4. Diseñar elementos visuales decorativos (flores, anillos, íconos)  

---

## 6️⃣ Tecnologías
- HTML5, CSS3, JavaScript (ES6+)  
- anime.js para animaciones  
- particles.js para fondo dinámico  
- Google Apps Script y Google Sheets para backend  
- SVG para gráficos e íconos  
- Fuentes personalizadas y Google Fonts  
- LocalStorage para guardar estado temporal  

---

## 7️⃣ Checklist de Desarrollo
- [ ] Revisar `index.html` y estructura base  
- [ ] Confirmar endpoint Google Sheets  
- [ ] Crear mockups de páginas  
- [ ] Desarrollar landing page con animaciones y hero  
- [ ] Implementar cuenta regresiva  
- [ ] Rediseñar formulario RSVP con validaciones  
- [ ] Integrar envío a Google Sheets con feedback visual  
- [ ] Crear confirmation page con animaciones  
- [ ] Optimizar responsividad y animaciones móviles  
- [ ] Testing cross-browser y mobile  
- [ ] Preparar despliegue en GitHub Pages  

---

**Creado con ❤️ por Jose Alba Caro para nuestra boda – 16 de mayo de 2026**