# Barbería Royal — landing page

Landing page de una barbería con demostración interactiva del asistente de
reservas por IA. React + Vite + Tailwind CSS v4, mobile-first.

## Poner en marcha

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # producción en dist/
npm run preview  # servir dist/ en local
```

## ⚠️ Antes de publicar: 3 cosas que sustituir

Todo el contenido editable está en **`src/data/site.js`**. No hace falta tocar
ningún componente.

| Qué | Constante | Valor actual |
| --- | --- | --- |
| Enlace de reservas (Fresha) | `BOOKING_URL` | `https://URL_FRESHA_PLACEHOLDER` |
| Número de WhatsApp | `WHATSAPP_NUMBER` | `NUMERO_PLACEHOLDER` |
| Fotos | `IMAGES` | fotos de stock de Unsplash |

El número de WhatsApp va con prefijo de país y sin `+` ni espacios
(ej. España: `34611223344`).

### Fotos

`IMAGES` apunta por defecto a fotos de stock de Unsplash. Para usar las fotos
reales del local, súbelas a `public/fotos/` y cambia las rutas por
`/fotos/mi-foto.jpg`.

Si una imagen no carga, la web muestra un marcador dorado con la marca en su
lugar — nunca aparece un icono de imagen rota.

## Qué hay dentro

- **Demo de chat interactiva** (`ChatDemo.jsx`) — reproduce sola una
  conversación de ejemplo al entrar en pantalla y luego deja escribir al
  visitante. Las respuestas se resuelven por palabras clave en el propio
  navegador (`CHAT_INTENTS` en `site.js`): no hay backend ni sale ningún dato.
- **Contadores animados**, aparición al hacer scroll y parallax ligero, todo
  desactivado automáticamente con `prefers-reduced-motion`.
- **Galería con lightbox** navegable con flechas y `Escape`, con el foco
  devuelto a la miniatura de origen al cerrar.
- **Sin `localStorage` ni `sessionStorage`**: la página no guarda nada.

## Estructura

```
src/
  data/site.js        ← todo el contenido y los placeholders
  lib/hooks.js        ← scroll, viewport, contadores, parallax
  components/         ← una sección por archivo
  index.css           ← tokens de color y tipografía, animaciones
```

## Personalizar la marca

Los colores y las tipografías se definen como tokens en el bloque `@theme` de
`src/index.css`. Cambiar `--color-gold` ahí lo cambia en toda la web.

Las fuentes (Playfair Display e Inter) van autoalojadas con `@fontsource`, sin
llamadas a CDN.
