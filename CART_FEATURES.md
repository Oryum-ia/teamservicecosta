# Funcionalidades del Carrito de Compras

## Características Implementadas

### 1. Modal del Carrito (CartModal.astro)

Un modal lateral moderno que se desliza desde la derecha cuando el usuario:
- Hace clic en el icono del carrito en el header
- Agrega un producto al carrito

**Características del Modal:**
- **Diseño moderno y responsive**: Se adapta perfectamente a móviles y desktop
- **Animaciones suaves**: Slide-in desde la derecha con overlay difuminado
- **Contador de productos**: Badge animado en el icono del carrito
- **Vista rápida de productos**: Muestra imagen, nombre, modelo, precio y cantidad
- **Controles de cantidad**: Botones + y - para ajustar cantidades
- **Eliminar productos**: Botón de eliminar con confirmación
- **Resumen de compra**: Subtotal, envío y total
- **Acciones rápidas**: Botones para ver carrito completo o proceder al pago
- **Estado vacío**: Mensaje amigable cuando no hay productos

**Funcionalidades:**
- Se cierra al hacer clic en el overlay
- Se cierra con la tecla ESC
- Se cierra con el botón X
- Actualización en tiempo real al cambiar cantidades
- Persistencia en localStorage

### 2. Página Completa del Carrito (/carrito)

Una página dedicada con todas las funcionalidades del e-commerce.

**Características:**
- **Vista detallada de productos**: Imágenes grandes, información completa
- **Control de cantidades**: Input numérico con botones +/-
- **Cálculo automático**: Subtotal, IVA (19%), envío y total
- **Envío gratis**: Para compras superiores a $500,000 COP
- **Resumen lateral**: Card sticky con el resumen de compra
- **Badges de confianza**: Compra segura, envío nacional, garantía oficial
- **Ayuda por WhatsApp**: Botón directo para chatear
- **Estado vacío**: Mensaje con botón para volver a productos
- **Responsive**: Layout optimizado para móvil, tablet y desktop

### 3. Gestión de Estado (cart.ts)

Sistema de gestión de carrito con patrón Observer.

**Características:**
- **Singleton pattern**: Una única instancia del carrito
- **Subscribe pattern**: Los componentes se suscriben a cambios
- **LocalStorage**: Persistencia automática entre sesiones
- **Operaciones CRUD**:
  - `addItem()`: Agregar producto (incrementa si ya existe)
  - `removeItem()`: Eliminar producto
  - `updateQuantity()`: Actualizar cantidad
  - `clear()`: Vaciar carrito
  - `getItems()`: Obtener todos los productos
  - `getItemCount()`: Total de productos
  - `getSubtotal()`: Subtotal de la compra
  - `getTax()`: Cálculo del IVA (19%)
  - `getShipping()`: Cálculo de envío (gratis > $500,000)
  - `getTotal()`: Total a pagar

**Utilidades:**
- `formatCurrency()`: Formatea precios en COP
- `parsePrice()`: Convierte strings de precio a números

### 4. Integración con Productos (ProductCardMiro.astro)

Los productos ahora tienen funcionalidad completa de agregar al carrito.

**Características:**
- Botón "Agregar al carrito" en cada producto
- Feedback visual: cambia a "¡Agregado!" por 2 segundos
- Abre automáticamente el modal del carrito
- Captura imagen del producto para mostrar en el carrito
- Deshabilitado para productos agotados

### 5. Header Mejorado (HeaderMiro.astro)

El header ahora incluye:
- **Botón del carrito**: Con contador animado de productos
- **Badge con contador**: Muestra el número total de productos
- **Animación bounce**: Cuando se agrega un producto
- **Click para abrir modal**: Abre el modal del carrito

## Experiencia de Usuario

### Flujo de Compra

1. **Usuario navega productos** en la página principal
2. **Hace clic en "Agregar al carrito"** en un producto
3. **Botón muestra feedback** ("¡Agregado!")
4. **Modal se abre automáticamente** mostrando el producto agregado
5. **Usuario puede**:
   - Continuar comprando (cerrar modal)
   - Ver carrito completo
   - Proceder al pago
6. **Desde el carrito completo** puede:
   - Ajustar cantidades
   - Eliminar productos
   - Ver totales detallados
   - Proceder al pago
   - Contactar por WhatsApp

### Responsive Design

- **Desktop**: Modal lateral de 420px, vista de carrito con 2 columnas
- **Tablet**: Modal lateral, vista de carrito con 1 columna
- **Mobile**: Modal full-width, productos en cards verticales

### Animaciones y Transiciones

- Slide-in del modal desde la derecha
- Fade-in del overlay
- Bounce en el contador del carrito
- Hover effects en botones y productos
- Scale en botones al hacer click

### Accesibilidad

- Labels en todos los controles
- Aria-labels para botones de iconos
- Navegación por teclado (ESC para cerrar modal)
- Contraste adecuado de colores
- Focus states visibles

## Tecnología Utilizada

- **Astro**: Framework principal
- **TypeScript**: Para type-safety en el cart store
- **CSS Custom Properties**: Para theming consistente
- **LocalStorage API**: Para persistencia
- **Observer Pattern**: Para reactividad

## Próximos Pasos Recomendados

1. **Proceso de Checkout**: Crear página de pago con formulario
2. **Integración de pasarela de pago**: PSE, tarjetas, etc.
3. **Sistema de cupones de descuento**: Input para códigos promocionales
4. **Productos relacionados**: Sugerencias en el carrito
5. **Wishlist**: Guardar productos para después
6. **Comparar productos**: Comparación de especificaciones
7. **Historial de compras**: Para usuarios registrados
8. **Notificaciones**: Toast notifications para mejor feedback

## Mejoras de la Página de Compra

### Características Agregadas:

1. **Vista de productos mejorada**:
   - Imágenes más grandes y de mejor calidad
   - Información detallada de cada producto
   - Controles de cantidad intuitivos

2. **Cálculos automáticos**:
   - IVA (19%) incluido en el total
   - Envío gratis para compras > $500,000
   - Actualización en tiempo real

3. **Experiencia de usuario mejorada**:
   - Confirmación al eliminar productos
   - Feedback visual en todas las acciones
   - Mensajes claros de estado vacío
   - Badges de confianza

4. **Integración con WhatsApp**:
   - Botón directo para consultas
   - Número personalizable

## Estructura de Archivos

```
src/
├── components/
│   ├── CartModal.astro          # Modal del carrito (nuevo)
│   ├── HeaderMiro.astro          # Header con carrito (modificado)
│   └── ProductCardMiro.astro     # Productos con add to cart (modificado)
├── pages/
│   └── carrito.astro             # Página del carrito (mejorado)
└── scripts/
    └── cart.ts                    # Store del carrito (existente)
```

## Testing Recomendado

- [ ] Agregar productos al carrito
- [ ] Modificar cantidades desde el modal
- [ ] Modificar cantidades desde la página del carrito
- [ ] Eliminar productos
- [ ] Vaciar el carrito
- [ ] Verificar persistencia al recargar página
- [ ] Probar en mobile, tablet y desktop
- [ ] Verificar cálculos de subtotal, envío y total
- [ ] Probar con productos sin imagen
- [ ] Verificar estados vacíos
- [ ] Probar cierre del modal (overlay, ESC, botón X)
- [ ] Verificar animaciones y transiciones

---

**Desarrollado para Team Service Costa S.A.S.**
**Centro Autorizado KÄRCHER**
