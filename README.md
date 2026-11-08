# ATELIER • NOIR — Tienda Bijou Buenos Aires

Catálogo e-commerce móvil y responsive desarrollado en **HTML5 puro**, **CSS3** y **JavaScript vanilla** sin dependencias externas.

## Características implementadas

- **Selector de modo dual (ATELIER / NOIR):** Alterna entre tema claro y tema oscuro con persistencia en `localStorage`.
- **Filtros por categoría dinámicos:** Todo, Oro, Plata, Aros, Collares, Anillos.
- **Grilla de 2 columnas optimizada para móviles:**
  - Tarjetas con estilo diferenciado según material (oro o plata/noir).
  - Insignias de material (`ORO 18K`, `PLATA 925`).
  - Botón interactivo de favoritos (guarda en `localStorage`).
  - Botón directo de compra por WhatsApp (`✦ AGREGAR — WHATSAPP`) con mensaje pre-rellenado con nombre y precio del producto.
- **Tipografía editorial:** Cormorant Garamond y Plus Jakarta Sans vía Google Fonts.

## Cómo previsualizar localmente

```bash
# Servidor local con Python desde la raíz del proyecto
python3 -m http.server 8000
```
Luego abre `http://localhost:8000` en tu navegador (o abre directamente `index.html`).
