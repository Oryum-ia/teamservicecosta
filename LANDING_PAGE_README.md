# Team Service Costa Landing Page

Landing page moderna para Team Service Costa S.A.S., Centro de Servicio Técnico Autorizado KÄRCHER.

## 🎨 Descripción del Proyecto

Este proyecto es una landing page profesional desarrollada con Astro, basada en los requisitos del documento de propuesta y con un diseño moderno inspirado en las mejores prácticas de UI/UX.

### Características Principales

- ✅ **Diseño Moderno y Responsivo**: Adaptado a todos los dispositivos (móvil, tablet, desktop)
- ✅ **Navegación Intuitiva**: Header con menú responsive
- ✅ **Hero Section**: Banner principal con llamados a la acción
- ✅ **Catálogo de Productos**: Grid de productos con tarjetas estilizadas
- ✅ **Sección de Servicios**: 4 servicios principales con diseño de tarjetas
- ✅ **Footer Completo**: Con 3 ubicaciones (Montería, Cartagena, Apartadó)
- ✅ **WhatsApp Flotante**: Botón de contacto directo siempre visible
- ✅ **SEO Optimizado**: Meta tags y estructura semántica

## 🚀 Tecnología Utilizada

- **Framework**: Astro 5.14.3
- **Lenguajes**: TypeScript, CSS moderno
- **Diseño**: CSS Grid, Flexbox, Variables CSS
- **Iconos**: SVG inline para mejor rendimiento

## 📁 Estructura del Proyecto

```
TeamServiceCosta/
├── src/
│   ├── components/
│   │   ├── Header.astro           # Navegación principal
│   │   ├── Hero.astro             # Banner hero
│   │   ├── ProductCard.astro      # Tarjeta de producto
│   │   ├── ProductsSection.astro  # Sección de productos
│   │   ├── ServicesSection.astro  # Sección de servicios
│   │   ├── Footer.astro           # Footer con ubicaciones
│   │   └── WhatsAppButton.astro   # Botón flotante WhatsApp
│   ├── layouts/
│   │   └── Layout.astro           # Layout principal
│   ├── pages/
│   │   └── index.astro            # Página principal
│   └── styles/
│       └── global.css             # Estilos globales y variables
├── public/                        # Archivos estáticos
└── package.json
```

## 🎨 Sistema de Diseño

### Colores

- **Primary (KÄRCHER Yellow)**: `#FFD700`
- **Secondary (Negro)**: `#1A1A1A`
- **Grises**: Escala completa de 50 a 900
- **Blanco**: `#FFFFFF`

### Tipografía

- **Fuente Principal**: System fonts (Apple, Segoe UI, Roboto)
- **Tamaños**: Escala responsive desde 12px hasta 60px
- **Pesos**: Normal (400), Medium (500), Semibold (600), Bold (700), Extrabold (800)

### Espaciado

Sistema basado en múltiplos de 4px (spacing-1 hasta spacing-24)

### Bordes y Sombras

- **Border Radius**: sm, md, lg, xl, 2xl, full
- **Shadows**: sm, md, lg, xl
- **Transitions**: fast (150ms), base (250ms), slow (350ms)

## 🧩 Componentes Creados

### 1. Header (`Header.astro`)
- Logo de Team Service Costa
- Menú de navegación
- Carrito de compras con badge
- Menú hamburguesa responsive

### 2. Hero (`Hero.astro`)
- Badge "Centro Autorizado KÄRCHER"
- Título y subtítulo principal
- 2 botones CTA (Comprar Equipos, Reparar Mi Equipo)
- Features destacadas (Envíos, Garantía, Servicio)
- Wave SVG decorativo

### 3. ProductCard (`ProductCard.astro`)
**Props:**
- `name`: Nombre del producto
- `model`: Modelo del producto
- `price`: Precio del producto
- `image`: URL de imagen (opcional)
- `available`: Disponibilidad (boolean)

### 4. ProductsSection (`ProductsSection.astro`)
- Header con badge y título
- Barra de búsqueda con filtros
- Grid responsive de productos (5 productos de ejemplo)
- Botón "Ver Todos los Productos"

### 5. ServicesSection (`ServicesSection.astro`)
- 4 tarjetas de servicios:
  - Reparación y Mantenimiento
  - Venta de Equipos
  - Repuestos Originales
  - Asesoría Técnica
- Banner CTA para agendar servicio

### 6. Footer (`Footer.astro`)
- Wave decorativo superior
- Logo y descripción de la empresa
- 3 ubicaciones con direcciones y teléfonos:
  - Montería: Calle 40 # 2-55
  - Cartagena: Calle 30 # 21-137
  - Apartadó: Calle 91 # 98-23
- Enlaces rápidos
- Redes sociales
- Copyright y términos legales

### 7. WhatsAppButton (`WhatsAppButton.astro`)
- Botón flotante en la esquina inferior derecha
- Efecto de pulso animado
- Texto "¿Necesitas ayuda?" (oculto en móvil)
- Enlace directo a WhatsApp con mensaje predefinido

**Props:**
- `phone`: Número de teléfono
- `message`: Mensaje predefinido

## 🎯 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 968px
- **Desktop**: > 968px

## 📱 Características Responsive

- Grid de productos: 1 columna (móvil), 2 columnas (tablet), 3+ columnas (desktop)
- Navegación: Hamburger menu en móvil
- Tipografía: Escalado automático según viewport
- WhatsApp button: Solo icono en móvil, con texto en desktop
- Footer: Layout adaptable según tamaño de pantalla

## 🚀 Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🌐 Navegación del Sitio

- **Home** (`/`): Página principal
- **Nosotros** (`#nosotros`): Sección about
- **Servicios** (`#servicios`): Información de servicios
- **Contacto** (`#contacto`): Footer con ubicaciones
- **Tienda** (`/tienda`): Catálogo completo (pendiente)

## 📝 Próximos Pasos Sugeridos

1. **Agregar imágenes reales**: Reemplazar placeholders con fotos de productos KÄRCHER
2. **Crear página de tienda completa**: `/tienda` con todos los productos
3. **Implementar carrito de compras funcional**: Estado y lógica de carrito
4. **Página de producto individual**: Detalles de cada producto
5. **Sistema de autenticación**: Registro e inicio de sesión
6. **Panel de cliente**: Área privada con pedidos y reparaciones
7. **Integración con backend**: API para productos, pedidos, reparaciones
8. **Formularios funcionales**: Contacto, cotización, registro
9. **Optimización de imágenes**: Lazy loading, formatos modernos (WebP)
10. **Analytics**: Google Analytics o similar

## 🎨 Personalización

### Cambiar colores principales

Editar las variables en [`src/styles/global.css`](src/styles/global.css):

```css
:root {
  --color-primary: #FFD700;        /* Amarillo KÄRCHER */
  --color-secondary: #1A1A1A;      /* Negro */
  /* ... más variables */
}
```

### Modificar productos destacados

Editar el array en [`src/components/ProductsSection.astro`](src/components/ProductsSection.astro):

```javascript
const products = [
  {
    name: 'Hidrolavadora K1',
    model: 'Modelo XD 585',
    price: '460 000,00',
    available: true
  },
  // ... más productos
];
```

### Actualizar información de contacto

Editar el array de ubicaciones en [`src/components/Footer.astro`](src/components/Footer.astro):

```javascript
const locations = [
  {
    city: 'Montería',
    address: 'Calle 40 # 2-55, Barrio Nariño',
    phone: '+57 300 123 4567'
  },
  // ... más ubicaciones
];
```

### Configurar WhatsApp

En [`src/pages/index.astro`](src/pages/index.astro):

```astro
<WhatsAppButton
  phone="+573001234567"
  message="Hola, necesito información sobre los servicios de Team Service Costa"
/>
```

## 📊 SEO

El proyecto incluye:
- Meta tags de descripción y keywords
- Open Graph tags para redes sociales
- Twitter Card tags
- Estructura semántica HTML5
- URLs amigables
- Lang="es" configurado

## ♿ Accesibilidad

- ARIA labels en botones e iconos
- Contraste de colores WCAG AA
- Navegación por teclado
- Alt text en imágenes (cuando se agreguen)
- Reducción de movimiento respetada

## 📄 Licencia

Este proyecto fue desarrollado para Team Service Costa S.A.S. según lo especificado en la propuesta de desarrollo web.

---

**Desarrollado con ❤️ usando Astro**

Para más información sobre Astro: [docs.astro.build](https://docs.astro.build)
