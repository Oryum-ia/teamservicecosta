# 🎨 Landing Page - Estilo Miro

Actualización completa del diseño de la landing page con un estilo moderno inspirado en Miro.

## ✨ Cambios Implementados

### 1. Sistema de Diseño Actualizado

#### Colores
- **Primary Yellow**: `#FFD02F` (amarillo KÄRCHER más vibrante)
- **Secondary Dark**: `#050038` (azul oscuro profundo)
- **Accent Blue**: `#4262FF` (azul vibrante para CTAs)
- **Light Accent**: `#E5EBFF` (azul claro para fondos)

#### Tipografía
- **Font Stack**: Sistema nativo (Apple System, Segoe UI, Helvetica)
- **Tamaños más generosos**: De 12px hasta 88px
- **Letter spacing negativo**: -0.02em/-0.03em para títulos grandes
- **Font weights**: Normal hasta Black (900)

#### Espaciado
- Más generoso que antes (hasta 128px)
- Padding de contenedor: 2rem
- Max-width: 1440px

#### Bordes y Sombras
- Bordes más redondeados (hasta 32px)
- Sombras más suaves (7% opacity vs 10%)
- Transiciones con cubic-bezier

### 2. Componentes Nuevos (Estilo Miro)

#### `HeaderMiro.astro`
```
- Navegación limpia y moderna
- Logo Team Service Costa con colores actualizados
- Botones de login y carrito
- Menú responsive con hamburguesa animada
- Altura: 72px (64px en móvil)
- Backdrop blur en sticky
```

**Características:**
- ✅ Sticky header con transparencia
- ✅ Logo con spacing negativo
- ✅ Botones con bordes redondeados
- ✅ Cart badge con contador
- ✅ Mobile menu con animación

#### `HeroMiro.astro`
```
- Diseño de dos columnas (1.1fr 0.9fr)
- Título grande con highlight amarillo
- CTAs azul (primary) y blanco (secondary)
- Trust badges con iconos
- Card visual con preview de producto
- Padding: 96px 0 128px (vertical)
```

**Características:**
- ✅ Título hasta 72px con highlight text
- ✅ Descripción en 20px
- ✅ Botones grandes con sombras
- ✅ Card flotante con efecto hover
- ✅ Dots de colores (macOS style)
- ✅ Tags de features

#### `ProductCardMiro.astro`
```
- Card con borde sutil (1px)
- Imagen con gradiente de fondo
- Badge de disponibilidad con dot animado
- Precio grande y prominente (40px)
- Botones azul (primary) y blanco (secondary)
- Border radius: 24px
```

**Características:**
- ✅ Hover effect con elevación
- ✅ Badge con backdrop-filter blur
- ✅ Precio con currency label
- ✅ Botones full-width en mobile
- ✅ Imagen con zoom hover

#### `ProductsSectionMiro.astro`
```
- Header centrado con eyebrow
- Título de 56px
- Descripción en 20px
- Grid adaptable (300px min)
- Botón CTA negro al final
```

**Características:**
- ✅ Eyebrow con fondo azul claro
- ✅ Typography jerarquía clara
- ✅ Grid responsive (1-4 columnas)
- ✅ Spacing generoso (32px entre cards)

#### `StatsSection.astro`
```
- Fondo amarillo vibrante
- Header con título y link
- 4 cards con estadísticas
- Cards con glass morphism
- Grid de 4 columnas
```

**Características:**
- ✅ Fondo con gradientes radiales
- ✅ Cards semi-transparentes
- ✅ Números gigantes (72px)
- ✅ Hover effect con elevación
- ✅ Link decorativo con flecha

#### `FooterMiro.astro`
```
- Fondo azul oscuro (#050038)
- Grid de 3 columnas
- Logo amarillo y blanco
- Social links con hover
- Legal links en bottom
```

**Características:**
- ✅ Color scheme invertido
- ✅ Social icons con transform hover
- ✅ Links con transiciones suaves
- ✅ 3 ubicaciones destacadas
- ✅ Copyright y legal separados

### 3. Archivos Actualizados

#### `src/styles/global.css`
- Variables CSS actualizadas
- Typography system mejorado
- Spacing system expandido
- Shadow system más suave
- Responsive breakpoints

#### `src/pages/index.astro`
- Imports actualizados a versiones Miro
- Orden de componentes optimizado
- Layout completo implementado

## 🎯 Estructura de Componentes

```
index.astro
├── HeaderMiro
├── main
│   ├── HeroMiro
│   ├── ProductsSectionMiro
│   │   └── ProductCardMiro (x4)
│   ├── StatsSection
│   └── ServicesSection (original)
├── FooterMiro
└── WhatsAppButton (original)
```

## 📊 Comparación con Diseño Original

| Aspecto | Original | Miro Style |
|---------|----------|------------|
| **Colores** | #FFD700 | #FFD02F |
| **Typography** | 48px max | 88px max |
| **Spacing** | 96px max | 128px max |
| **Shadows** | 10% opacity | 7% opacity |
| **Border Radius** | 24px max | 32px max |
| **Container** | 1280px | 1440px |
| **Font Weight** | 800 max | 900 max |

## 🚀 Características Destacadas

### Inspiración de Miro

1. **Typography Bold**
   - Títulos grandes y pesados
   - Letter spacing negativo
   - Jerarquía clara

2. **Spacing Generoso**
   - Mucho aire entre elementos
   - Padding consistente
   - Margins grandes

3. **Colores Vibrantes**
   - Amarillo brillante
   - Azul profundo
   - Accent azul llamativo

4. **Sombras Suaves**
   - Menos opacidad
   - Múltiples capas
   - Elevación sutil

5. **Bordes Redondeados**
   - Cards con 24px radius
   - Botones con 16px radius
   - Pills con radius full

6. **Interacciones**
   - Hover con elevación
   - Transiciones suaves
   - Transform subtle

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 968px
- **Tablet**: 640px - 968px
- **Mobile**: < 640px

### Adaptaciones Móviles
- Grid → 1 columna
- Typography reducida
- Spacing ajustado
- Botones full-width
- Menu hamburguesa

## 🎨 Paleta de Colores

### Primarios
```css
--color-primary: #FFD02F        /* Amarillo KÄRCHER */
--color-primary-light: #FFF4CC  /* Amarillo claro */
--color-secondary: #050038      /* Azul oscuro */
--color-accent: #4262FF         /* Azul vibrante */
```

### Grises
```css
--color-gray-50: #FAFAFA
--color-gray-100: #F4F4F5
--color-gray-200: #E4E4E7
--color-gray-300: #D4D4D8
--color-gray-400: #A1A1AA
--color-gray-500: #71717A
--color-gray-600: #52525B
--color-gray-700: #3F3F46
--color-gray-800: #27272A
--color-gray-900: #18181B
```

## 💡 Uso de Componentes

### Hero con Highlight
```astro
<h1>
  Servicio técnico y equipos
  <span class="text-highlight">KÄRCHER</span>
  de calidad
</h1>
```

### Eyebrow Tag
```astro
<span class="section-eyebrow">
  Nuestra Tienda
</span>
```

### Product Card
```astro
<ProductCardMiro
  name="Hidrolavadora K4"
  model="Modelo K9 MX"
  price="1 500 000"
  available={true}
/>
```

### Stats Card
```astro
<div class="stat-card">
  <div class="stat-value">15+</div>
  <div class="stat-label">Años de experiencia</div>
</div>
```

## 🔧 Personalización

### Cambiar Color Primary
```css
/* src/styles/global.css */
:root {
  --color-primary: #TU_COLOR;
}
```

### Ajustar Typography
```css
:root {
  --text-6xl: TU_TAMAÑO;
}
```

### Modificar Spacing
```css
:root {
  --spacing-32: TU_VALOR;
}
```

## 📦 Archivos del Proyecto

### Nuevos (Estilo Miro)
- `src/components/HeaderMiro.astro`
- `src/components/HeroMiro.astro`
- `src/components/ProductCardMiro.astro`
- `src/components/ProductsSectionMiro.astro`
- `src/components/StatsSection.astro`
- `src/components/FooterMiro.astro`

### Originales (Mantenidos)
- `src/components/Header.astro`
- `src/components/Hero.astro`
- `src/components/ProductCard.astro`
- `src/components/ProductsSection.astro`
- `src/components/ServicesSection.astro`
- `src/components/Footer.astro`
- `src/components/WhatsAppButton.astro`

### Actualizados
- `src/styles/global.css`
- `src/pages/index.astro`

## 🌟 Mejoras Visuales

1. **Typography más bold y grande**
2. **Spacing más generoso**
3. **Colores más vibrantes**
4. **Sombras más suaves**
5. **Bordes más redondeados**
6. **Hover effects mejorados**
7. **Responsive más fluido**
8. **Accessibility mejorada**

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 📸 Screenshots

La landing page ahora tiene:
- ✅ Header limpio estilo Miro
- ✅ Hero con card visual
- ✅ Products grid moderno
- ✅ Stats section amarilla
- ✅ Services (original)
- ✅ Footer oscuro
- ✅ WhatsApp floating

---

**🎨 Inspirado en:** [Miro.com](https://miro.com)
**⚡ Powered by:** Astro 5.14.3
**💛 Para:** Team Service Costa S.A.S.
