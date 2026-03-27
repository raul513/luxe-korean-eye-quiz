# Luxe Korean Under-Eye Balm — Quiz Funnel

Quiz funnel de alta conversión adaptado del funnel de Seranova Beauty, diseñado para el producto **Luxe Korean Under-Eye Balm** de Luxe Research Lab.

---

## 🚀 Cómo desplegar en GitHub + Vercel (paso a paso)

### PASO 1 — Subir el proyecto a GitHub

1. Ve a [github.com](https://github.com) e inicia sesión (o crea una cuenta gratis).
2. Haz clic en **"New repository"** (botón verde arriba a la derecha).
3. Ponle un nombre, por ejemplo: `luxe-eye-quiz`
4. Déjalo en **Public** (necesario para Vercel gratis).
5. Haz clic en **"Create repository"**.
6. En la página del repositorio vacío, haz clic en **"uploading an existing file"**.
7. Arrastra y suelta los 4 archivos del proyecto:
   - `index.html`
   - `style.css`
   - `quiz.js`
   - `README.md`
8. Escribe un mensaje de commit como `"Initial quiz funnel"` y haz clic en **"Commit changes"**.

✅ Tu código ya está en GitHub.

---

### PASO 2 — Desplegar en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New… → Project"**.
3. Busca y selecciona tu repositorio `luxe-eye-quiz`.
4. Vercel detectará automáticamente que es un proyecto estático (HTML/CSS/JS).
5. Deja todas las opciones por defecto y haz clic en **"Deploy"**.
6. En ~30 segundos tendrás una URL pública como:
   `https://luxe-eye-quiz.vercel.app`

✅ Tu quiz funnel está live en internet.

---

### PASO 3 — Conectar tu dominio personalizado (opcional)

1. En Vercel, ve a tu proyecto → **Settings → Domains**.
2. Escribe tu dominio, por ejemplo: `quiz.luxeresearchlab.com`
3. Vercel te dará un registro DNS para agregar en tu proveedor de dominio (Namecheap, GoDaddy, Cloudflare, etc.).
4. Agrega el registro CNAME apuntando a `cname.vercel-dns.com`
5. En ~5 minutos el dominio estará activo con SSL automático.

---

### PASO 4 — Actualizar el quiz (workflow futuro)

Cada vez que quieras hacer cambios:

1. Edita los archivos localmente o directamente en GitHub.
2. Haz commit de los cambios en GitHub.
3. Vercel detecta el push automáticamente y redespliega en segundos.

---

## 📁 Estructura del proyecto

```
luxe-eye-quiz/
├── index.html    ← Estructura completa del quiz (18 pantallas)
├── style.css     ← Estilos visuales (colores, tipografía, layout)
├── quiz.js       ← Lógica del quiz (navegación, animaciones, tracking)
└── README.md     ← Este archivo
```

---

## 🎨 Personalización rápida

### Cambiar colores de marca
En `style.css`, busca la sección `:root` y modifica:
```css
--accent:      #8b5cf6;   /* Color principal (morado) */
--pink:        #ec4899;   /* Color secundario (rosa) */
```

### Cambiar el link del botón de compra
En `index.html`, busca todas las ocurrencias de:
```
https://luxeresearchlab.com/products/luxe-korean-under-eye-balm
```
Y reemplázalas con tu URL de checkout o landing page.

### Cambiar el precio del descuento
En `index.html`, busca `$34.99` y `$39.95` y actualiza según tu oferta.

### Agregar Facebook Pixel o Google Analytics
En `quiz.js`, busca la función `trackEvent` y agrega tu código de tracking:
```javascript
function trackEvent(name, data) {
  window.fbq && fbq('trackCustom', name, data);
  window.gtag && gtag('event', name, data);
}
```

---

## 📊 Pantallas del quiz

| # | Pantalla | Tipo |
|---|----------|------|
| 0 | Intro + CTA | Landing |
| 1 | ¿Cuántos años tienes? | Single select |
| 2 | Mayor preocupación bajo los ojos | Multi select |
| 3 | Severidad del problema | Multi select |
| 4 | Social proof (testimonios) | Interstitial |
| 5 | Exposición al sol | Single select |
| 6 | Horas de sueño | Single select |
| 7 | Nivel de estrés | Single select |
| 8 | Piel sensible | Single select |
| 9 | Creando tu perfil… | Loading animation |
| 10 | Tu perfil de piel personalizado | Profile result |
| 11 | Soluciones probadas antes | Multi select |
| 12 | Experiencia con productos | Multi select |
| 13 | Rutina de skincare actual | Single select |
| 14 | Pregunta emocional | Single select |
| 15 | Evento próximo | Single select |
| 16 | Calculando transformación… | Loading animation |
| 17 | Resultados + transformación | Results page |
| 18 | Oferta final + CTA de compra | Offer/CTA |

---

## 🔗 Links útiles

- Producto: [luxeresearchlab.com/products/luxe-korean-under-eye-balm](https://luxeresearchlab.com/products/luxe-korean-under-eye-balm)
- Vercel: [vercel.com](https://vercel.com)
- GitHub: [github.com](https://github.com)
