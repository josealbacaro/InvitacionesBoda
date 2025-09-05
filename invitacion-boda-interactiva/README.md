# Invitación de Boda Interactiva

Este proyecto es una invitación interactiva para una boda, que incluye una página de entrada con animaciones y un formulario de RSVP. A continuación se detallan las características y la estructura del proyecto.

## Estructura del Proyecto

```
invitacion-boda-interactiva
├── assets
│   ├── fonts
│   │   └── custom-fonts.css
│   ├── images
│   │   ├── background.svg
│   │   ├── couple.svg
│   │   ├── decorations
│   │   │   ├── flower1.svg
│   │   │   ├── flower2.svg
│   │   │   └── rings.svg
│   │   └── icons
│   │       ├── calendar.svg
│   │       ├── location.svg
│   │       ├── gift.svg
│   │       └── dress.svg
│   └── animations
│       └── particles.json
├── css
│   ├── main.css
│   ├── animations.css
│   ├── landing.css
│   ├── form.css
│   └── responsive.css
├── js
│   ├── main.js
│   ├── animations.js
│   ├── form-handler.js
│   ├── validation.js
│   └── google-sheets-api.js
├── lib
│   ├── anime.min.js
│   └── particles.min.js
├── pages
│   ├── landing.html
│   ├── rsvp.html
│   ├── confirmation.html
│   └── info.html
├── index.html
├── .gitignore
└── README.md
```

## Características

- **Página de Entrada Atractiva**: La página `landing.html` presenta la invitación con animaciones utilizando la biblioteca [anime.js](https://animejs.com/).
- **Formulario de RSVP**: La página `rsvp.html` permite a los invitados confirmar su asistencia de manera fácil y atractiva.
- **Envío a Google Sheets**: Los datos del formulario se envían a una hoja de cálculo de Google utilizando la API de Google Sheets.
- **Página de Confirmación**: Después de enviar el formulario, los usuarios son redirigidos a `confirmation.html`, donde se muestra un mensaje de agradecimiento.
- **Responsividad**: Todas las páginas están diseñadas para ser responsivas y se ven bien en dispositivos móviles.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener acceso a la API de Google Sheets y configura `google-sheets-api.js` con tu endpoint.
3. Abre `index.html` en tu navegador para ver la invitación interactiva.

## Uso

- Los invitados pueden navegar a la página de entrada, donde se presentan animaciones y detalles sobre la boda.
- Al hacer clic en el botón de RSVP, se les redirige al formulario donde pueden ingresar su información.
- Después de enviar el formulario, recibirán una confirmación de su asistencia.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.