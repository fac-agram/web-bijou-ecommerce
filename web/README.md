# ATELIER — Joyería de autor

Sitio web estático desarrollado en **HTML5 puro**, **CSS3** y **JavaScript vanilla** sin dependencias externas.

## Estructura

- `index.html`: Estructura semántica completa (Header, Hero, Intro sobre el taller, Footer).
- `styles.css`: Sistema de diseño con variables CSS, tipografía fluida y paletas para los tres acabados (Oro, Plata, Noir).
- `script.js`:
  - Selector de acabado persistente en `localStorage`.
  - Menú desplegable accesible para móviles.
  - Actualización dinámica del año de copyright.

## Cómo previsualizar

Puedes abrir directamente el archivo `index.html` en cualquier navegador, o iniciar un servidor local rápido:

```bash
# Con Python 3
python3 -m http.server 8000 --directory web

# O con npx serve
npx serve web
```

