# esquema-flujo.md – Flujo Completo de la Invitación Interactiva

## Descripción
Este documento describe el **flujo completo de la invitación interactiva**, incluyendo animaciones, transiciones, microinteracciones y UX/UI detallada. Ideal para desarrollo y para que VS Code + IA genere automáticamente las secciones.

---

## 1️⃣ Flujo General

+-------------------+
| Landing Page |

(landing.html)
Hero animado
Botón RSVP
Fondo partículas
+---------+---------+

markdown
Copiar código
      |
      v
+-------------------+
| Formulario RSVP |

(rsvp.html)
Campos:
- Nombre
- Email
- Asistencia
- Comentarios
Validaciones JS
Envío Google API
+---------+---------+

markdown
Copiar código
      |
      v
+-------------------+
| Confirmación |

(confirmation.html)
Animación check
Confetti opcional
Mensaje de gracias
+-------------------+

markdown
Copiar código

---

## 2️⃣ Detalles de Landing Page

### Elementos Principales
- **Hero**: nombres de los novios (h1), fade-in y bounce con anime.js  
- **Imagen pareja**: entrada suave, scaling  
- **Botón RSVP**: hover con scale-up y shadow dinámico  
- **Fondo partículas**: particles.js con colores violeta/cian y movimiento suave  

### Transiciones Recomendadas
- Scroll o fade al presionar el botón RSVP  
- Animación de botón pulsado antes de redirigir al formulario  

---

## 3️⃣ Formulario RSVP

### Campos y Validaciones
- Nombre → requerido, alfanumérico  
- Email → requerido, formato válido  
- Asistencia → requerido, sí/no  
- Comentarios → opcional  

### Animaciones UX
- **Focus suave**: borde destacado + ligero scale  
- **Error**: shake animation + color rojo  
- **Éxito**: checkmark + fade out del formulario  
- **Confetti**: opcional al enviar correctamente  

### Integración
- `form-handler.js` → captura evento submit  
- `validation.js` → valida campos antes de enviar  
- `google-sheets-api.js` → envía datos a Google Sheets  

---

## 4️⃣ Confirmación

### Elementos
- Mensaje de agradecimiento: “Gracias por confirmar tu asistencia!”  
- Animación checkmark o fade-in  
- Confetti opcional con colores de la paleta (violeta/cian)  
- Botón opcional: “Volver a la landing” o link a info adicional  

### Transiciones Recomendadas
- Fade-in del mensaje principal  
- Partículas sutiles en background (opcional)  

---

## 5️⃣ Flujo de Animaciones y UX

### Landing Page
- Anime.js: Hero fade + bounce  
- Particles.js: fondo dinámico  
- Botón RSVP: hover scale  

### Formulario RSVP
- Focus animado en inputs  
- Shake en errores  
- Checkmark + confetti en envío  

### Confirmación
- Fade-in mensaje  
- Confetti opcional  
- Botón volver a info o landing  

> Tip IA: Cada bloque de animación puede autogenerarse en VS Code usando los `id` y `class` definidos en HTML.

---

## 6️⃣ Notas de Desarrollo
- Mantener **IDs únicos** para elementos animables: `hero-title`, `rsvp-button`, `form-inputs`  
- Modularizar scripts: un archivo por funcionalidad (`animations.js`, `form-handler.js`, `validation.js`)  
- Assets en `assets/` para cambios de estilo fáciles  
- Testear en móvil y escritorio: animaciones y formulario deben ser fluidas  
- **Paleta recomendada**: Violeta `#3b2c9a`, Cyan `#6cf0f3`, Blanco `#f2f0ff`  

---

## 7️⃣ Bonus UX/Animaciones
- Microinteracciones: botones y campos de formulario  
- Confetti en envíos exitosos  
- Animación de partículas suaves en landing y confirmación  
- Transiciones fluidas entre secciones para experiencia natural y moderna  

**Creado con ❤️ por Jose Alba Caro para nuestra boda – 16 de mayo de 2026**