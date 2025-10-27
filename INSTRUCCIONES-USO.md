# Instrucciones de Uso - Team Service Costa Website

## 🚀 Inicio Rápido

### Comandos Disponibles

```bash
# Instalar dependencias (primera vez)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Acceder al Sitio

Una vez iniciado el servidor de desarrollo (`npm run dev`), el sitio estará disponible en:
- **Local:** http://localhost:4321/
- **Red:** Usar `--host` para exponer en la red local

---

## 📁 Estructura del Proyecto

```
teamservicecosta/
├── public/
│   ├── images/
│   │   ├── logo de la empresa/
│   │   │   └── logo.jpg
│   │   ├── productos/
│   │   ├── clientes/
│   │   └── labor-social/
│   ├── documentos/
│   └── cart-modal.css
├── src/
│   ├── components/
│   │   ├── HeaderMiro.astro          # Menú principal
│   │   ├── FooterMiro.astro          # Footer
│   │   ├── HeroMiro.astro            # Hero de inicio
│   │   ├── OffersSection.astro       # Sección de ofertas
│   │   ├── ServicesSection.astro     # Nuestros servicios
│   │   ├── StatsSection.astro        # Estadísticas
│   │   ├── ContactForm.astro         # Formulario contacto
│   │   ├── MapSection.astro          # Mapas de ubicación
│   │   ├── WhatsAppButton.astro      # Botón WhatsApp flotante
│   │   ├── ProductCard.astro         # Tarjeta de producto
│   │   └── CartModal.astro           # Modal del carrito
│   ├── layouts/
│   │   └── Layout.astro              # Layout principal
│   ├── pages/
│   │   ├── index.astro               # Página de inicio
│   │   ├── tienda.astro              # Tienda online
│   │   ├── quienes-somos.astro       # Quiénes somos
│   │   ├── labor-social.astro        # Labor social
│   │   ├── nuestros-clientes.astro   # Nuestros clientes
│   │   ├── estado-producto.astro     # Estado de producto
│   │   ├── pqr.astro                 # PQR
│   │   └── encuesta.astro            # Encuesta de satisfacción
│   ├── styles/
│   │   └── global.css                # Estilos globales
│   └── data/
│       └── products.ts               # Datos de productos
├── RESUMEN-MEJORAS-IMPLEMENTADAS.md  # Resumen de mejoras
└── package.json
```

---

## 🎨 Personalización de Contenido

### 1. Cambiar Logo

**Ubicación:** `/public/images/logo de la empresa/logo.jpg`

Para cambiar el logo:
1. Reemplazar el archivo `logo.jpg` con tu nuevo logo
2. Mantener el nombre `logo.jpg` o actualizar las referencias en:
   - `src/components/HeaderMiro.astro`
   - `src/components/FooterMiro.astro`

### 2. Modificar Ofertas

**Archivo:** `src/components/OffersSection.astro`

```typescript
// Ofertas Kärcher (líneas 3-40)
const karcherOffers = [
  {
    id: 1,
    name: 'Hidrolavadora K2',
    image: '/images/productos/hidrolavadora-k2.jpg',
    originalPrice: 1999900,
    discountPrice: 1499900,
    discount: 25,
    badge: '¡OFERTA!'
  },
  // ... más ofertas
];

// Ofertas Makita (líneas 42-79)
const makitaOffers = [
  // ... ofertas Makita
];
```

### 3. Actualizar Productos en Tienda

**Archivo:** `src/data/products.ts`

Agregar, modificar o eliminar productos en el array de productos.

### 4. Modificar Textos del Hero (Inicio)

**Archivo:** `src/components/HeroMiro.astro`

Buscar y modificar:
- `.hero-title` - Título principal
- `.hero-description` - Descripción
- `.hero-stats` - Estadísticas (10+ años, 3 sedes, etc.)

### 5. Actualizar Información de Contacto

**Archivos a modificar:**
- `src/components/ContactForm.astro`
- `src/components/MapSection.astro`
- `src/components/FooterMiro.astro`
- `src/components/WhatsAppButton.astro`
- `src/pages/pqr.astro`

**Datos actuales:**
- **Montería:** +57 320 508 5531 | tscosta.auxadmon@gmail.com
- **Cartagena:** +57 302 326 2268 | tscosta.admon@gmail.com
- **Apartadó:** +57 302 326 2239 | tscostaapartado@gmail.com

### 6. Agregar Imágenes de Clientes

**Ubicación:** `/public/images/clientes/`

**Estructura necesaria:**
```
clientes/
├── caribe-verde-1.jpg
├── caribe-verde-2.jpg
├── caribe-verde-3.jpg
├── exito-1.jpg
├── exito-2.jpg
├── exito-3.jpg
├── alcaldia-1.jpg
├── alcaldia-2.jpg
├── alcaldia-3.jpg
├── unicordoba-1.jpg
├── unicordoba-2.jpg
└── unicordoba-3.jpg
```

Para agregar más clientes, editar:
**Archivo:** `src/pages/nuestros-clientes.astro` (líneas 8-45)

### 7. Agregar Imágenes de Labor Social

**Ubicación:** `/public/images/labor-social/`

**Estructura necesaria:**
```
labor-social/
├── actividad-1.jpg
├── actividad-2.jpg
├── actividad-3.jpg
├── actividad-4.jpg
├── actividad-5.jpg
└── actividad-6.jpg
```

---

## 🎨 Personalización de Estilos

### Colores Corporativos

**Archivo:** `src/styles/global.css` (líneas 3-26)

```css
:root {
  /* Colores principales */
  --color-primary: #FFD700;        /* Amarillo Kärcher */
  --color-secondary: #1a1a1a;      /* Negro/Antracita */
  --color-accent: #2563eb;         /* Azul */

  /* Puedes modificar según necesites */
}
```

### Tipografía

**Archivo:** `src/styles/global.css` (líneas 28-42)

Cambiar tamaños de fuente modificando las variables:
```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
/* etc. */
```

---

## 📱 Redes Sociales

### Actualizar Enlaces

**Archivo:** `src/components/FooterMiro.astro` (líneas 43-57)

```html
<!-- Facebook -->
<a href="https://www.facebook.com/tscostasas" target="_blank">

<!-- Instagram -->
<a href="https://www.instagram.com/ts.karcher" target="_blank">

<!-- LinkedIn -->
<a href="https://www.linkedin.com/company/tscostasas" target="_blank">
```

---

## 🛒 E-commerce (Funcionalidades Pendientes)

### Códigos de Descuento
**Estado:** No implementado
**Requiere:** Backend con base de datos

### Pasarela de Pago
**Estado:** No implementado
**Opciones recomendadas:**
- PSE (ACH Colombia)
- PayU Colombia
- ePayco
- Mercado Pago

### Cálculo de Envíos
**Estado:** No implementado
**Opciones:**
- API de Servientrega
- API de Coordinadora
- Cálculo manual por zonas

---

## 📝 Formularios

### PQR y Encuesta

**Estado Actual:** Los formularios están implementados en el frontend pero **no están conectados a un backend**.

**Para activar:**
1. Crear API endpoint para recibir datos
2. Configurar base de datos (MySQL, PostgreSQL, MongoDB)
3. O usar servicio como:
   - Formspree
   - EmailJS
   - Google Forms API
   - Typeform

**Código a modificar:**
- `src/pages/pqr.astro` (script final, línea 443)
- `src/pages/encuesta.astro` (script final)

---

## 🚀 Despliegue a Producción

### Opción 1: Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Opción 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Opción 3: GitHub Pages
```bash
npm run build
# Subir carpeta dist/ a GitHub Pages
```

### Opción 4: Servidor Propio
```bash
npm run build
# Copiar carpeta dist/ al servidor
# Configurar Apache/Nginx para servir archivos estáticos
```

---

## 🔧 Solución de Problemas

### El servidor no inicia

```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Errores de TypeScript

```bash
# Limpiar cache de Astro
rm -rf .astro
npm run dev
```

### Imágenes no cargan

1. Verificar que las imágenes existan en `/public/images/`
2. Las rutas deben empezar con `/images/` (sin `public`)
3. Ejemplo correcto: `/images/logo de la empresa/logo.jpg`

### Estilos no se aplican

1. Verificar que `src/styles/global.css` esté importado en `src/layouts/Layout.astro`
2. Limpiar cache del navegador (Ctrl + Shift + R)

---

## 📞 Soporte

Para asistencia técnica o preguntas sobre la implementación:

1. Revisar el archivo [RESUMEN-MEJORAS-IMPLEMENTADAS.md](./RESUMEN-MEJORAS-IMPLEMENTADAS.md)
2. Consultar la documentación de Astro: https://docs.astro.build
3. Contactar al equipo de desarrollo

---

## 📋 Checklist de Implementación Completa

### Contenido
- [ ] Reemplazar logo.jpg con el logo oficial
- [ ] Agregar imágenes de productos en `/public/images/productos/`
- [ ] Agregar imágenes de clientes en `/public/images/clientes/`
- [ ] Agregar imágenes de labor social en `/public/images/labor-social/`
- [ ] Agregar imagen del equipo para "Quiénes Somos"

### Funcionalidades
- [ ] Conectar formulario PQR a backend/servicio
- [ ] Conectar encuesta de satisfacción a backend/servicio
- [ ] Implementar códigos de descuento (requiere backend)
- [ ] Integrar pasarela de pago PSE
- [ ] Implementar cálculo de envíos
- [ ] Configurar email transaccional

### Configuración
- [ ] Configurar dominio personalizado
- [ ] Configurar SSL/HTTPS
- [ ] Configurar Google Analytics
- [ ] Configurar Facebook Pixel (opcional)
- [ ] Configurar sitemap.xml
- [ ] Configurar robots.txt

### SEO
- [ ] Optimizar meta descriptions
- [ ] Agregar textos alt a todas las imágenes
- [ ] Configurar Open Graph tags
- [ ] Configurar Twitter Cards

### Testing
- [ ] Probar en Chrome, Firefox, Safari, Edge
- [ ] Probar en móviles (iOS y Android)
- [ ] Probar formularios
- [ ] Probar carrito de compras
- [ ] Probar enlaces de WhatsApp
- [ ] Verificar responsive en todos los breakpoints

---

**Última actualización:** Octubre 2025
**Versión:** 1.0
