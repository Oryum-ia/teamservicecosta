# Productos con Múltiples Imágenes - Guía Completa

## 📸 Nueva Estructura de Productos

Ahora cada producto puede tener **múltiples imágenes** guardadas en Supabase Storage, permitiendo mostrar galerías de productos.

## 🔄 Cambios Implementados

### 1. Estructura de Base de Datos

La tabla `producto_tienda` ahora tiene:

```sql
CREATE TABLE producto_tienda (
  id uuid PRIMARY KEY,
  nombre text NOT NULL,
  descripcion text,
  precio numeric,
  stock integer,
  imagenes text[] DEFAULT '{}',  -- Array de rutas de imágenes ✨
  promocion boolean DEFAULT false,
  activo boolean DEFAULT true,
  categoria text,               -- Nueva: categoría del producto
  marca text,                   -- Nueva: marca
  modelo text                   -- Nueva: modelo específico
);
```

**Antes:** `imagen_url text` (una sola imagen)
**Ahora:** `imagenes text[]` (array de imágenes)

### 2. Corrección del Bug del Carrito

Se corrigió el problema donde el carrito mostraba "vacío" cuando tenía productos:

**Cambios realizados:**
- Se agregó control de `visibility` además de `display`
- Se oculta el estado vacío **ANTES** de mostrar los items
- Se añadieron logs mejorados para debugging
- Se asegura que el estado vacío solo aparezca cuando `items.length === 0`

## 📁 Organización de Imágenes en Storage

### Estructura Recomendada

```
imagenes/
└── productos/
    ├── karcher-k5-1.jpg        # Imagen principal
    ├── karcher-k5-2.jpg        # Vista lateral
    ├── karcher-k5-3.jpg        # Detalle de características
    ├── karcher-wd3-1.jpg
    ├── karcher-wd3-2.jpg
    ├── makita-hp1640-1.jpg
    ├── makita-hp1640-2.jpg
    └── makita-hp1640-3.jpg
```

### Nomenclatura Sugerida

**Formato:** `{marca}-{modelo}-{numero}.jpg`

Ejemplos:
- `karcher-k5-1.jpg` - Imagen principal del producto
- `karcher-k5-2.jpg` - Vista desde otro ángulo
- `karcher-k5-3.jpg` - Accesorios o detalles

## ✅ Paso a Paso: Agregar Producto con Múltiples Imágenes

### Paso 1: Subir Imágenes a Storage

1. Ve a **Storage** → `imagenes` → `productos/`
2. Sube todas las imágenes del producto
3. Nombra las imágenes consistentemente

**Ejemplo:**
- `karcher-k7-1.jpg` (principal)
- `karcher-k7-2.jpg` (lateral)
- `karcher-k7-3.jpg` (accesorios)
- `karcher-k7-4.jpg` (en uso)

### Paso 2: Insertar Producto en la Base de Datos

```sql
INSERT INTO producto_tienda (
  nombre,
  descripcion,
  precio,
  stock,
  imagenes,
  promocion,
  activo,
  categoria,
  marca,
  modelo
)
VALUES (
  'Hidrolavadora KÄRCHER K7',
  'Hidrolavadora de alta presión profesional. 160 bar, motor de 3000W. Ideal para uso intensivo.',
  2450000,
  8,
  ARRAY[
    'productos/karcher-k7-1.jpg',
    'productos/karcher-k7-2.jpg',
    'productos/karcher-k7-3.jpg',
    'productos/karcher-k7-4.jpg'
  ],
  true,
  true,
  'hidrolavadoras',
  'KÄRCHER',
  'K7 Premium Full Control Plus'
);
```

### Paso 3: Verificar en la Tienda

1. Abre `http://localhost:4321/tienda`
2. El producto mostrará la **primera imagen del array**
3. En la vista de detalles (próximamente), se mostrará la galería completa

## 🔍 Cómo Funciona

### En el Frontend

```typescript
// La página de tienda mapea los productos
products = productsFromDB.map((p: ProductoTienda) => {
  // Si tiene múltiples imágenes, usar la primera
  const imageUrl = p.imagenes && p.imagenes.length > 0
    ? getPublicUrl(p.imagenes[0])  // Primera imagen
    : '';

  return {
    name: p.nombre,
    model: p.modelo || p.descripcion,
    price: p.precio,
    image: imageUrl,
    available: (p.stock ?? 0) > 0,
    category: p.categoria
  };
});
```

### Función getPublicUrl()

```typescript
export function getPublicUrl(path: string | null): string {
  if (!path) return '';

  // Si ya es URL completa, retornarla
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Obtener URL pública del bucket
  const { data } = supabase.storage
    .from('imagenes')
    .getPublicUrl(path);

  return data.publicUrl;
}
```

## 📝 Ejemplos de Productos

### Producto con 1 Imagen

```sql
INSERT INTO producto_tienda (nombre, precio, stock, imagenes, marca, modelo, categoria)
VALUES (
  'Filtro HEPA KÄRCHER',
  95000,
  50,
  ARRAY['productos/filtro-hepa.jpg'],
  'KÄRCHER',
  'HEPA 13',
  'accesorios'
);
```

### Producto con 3 Imágenes

```sql
INSERT INTO producto_tienda (nombre, precio, stock, imagenes, marca, modelo, categoria)
VALUES (
  'Aspiradora KÄRCHER WD6',
  1450000,
  12,
  ARRAY[
    'productos/karcher-wd6-1.jpg',
    'productos/karcher-wd6-2.jpg',
    'productos/karcher-wd6-3.jpg'
  ],
  'KÄRCHER',
  'WD6 Premium',
  'aspiradoras'
);
```

### Producto con 5 Imágenes (Galería Completa)

```sql
INSERT INTO producto_tienda (nombre, precio, stock, imagenes, marca, modelo, categoria)
VALUES (
  'Taladro Makita DHP484',
  890000,
  25,
  ARRAY[
    'productos/makita-dhp484-1.jpg',  -- Principal
    'productos/makita-dhp484-2.jpg',  -- Lateral
    'productos/makita-dhp484-3.jpg',  -- Accesorios incluidos
    'productos/makita-dhp484-4.jpg',  -- En uso
    'productos/makita-dhp484-5.jpg'   -- Detalle técnico
  ],
  'Makita',
  'DHP484',
  'herramientas'
);
```

## 🔧 Migrar Productos Existentes

Si tienes productos con el campo antiguo `imagen_url`, migra así:

```sql
-- Ver productos con estructura antigua
SELECT id, nombre, imagen_url
FROM producto_tienda
WHERE imagen_url IS NOT NULL;

-- Migrar uno por uno
UPDATE producto_tienda
SET imagenes = ARRAY[imagen_url]
WHERE id = 'UUID_DEL_PRODUCTO';

-- O migrar todos a la vez
UPDATE producto_tienda
SET imagenes = ARRAY[imagen_url]
WHERE imagen_url IS NOT NULL AND imagenes = '{}';
```

## 🐛 Solución del Bug del Carrito

### Problema Anterior

Cuando agregabas un producto al carrito, seguía mostrando "Tu carrito está vacío".

### Causa

El estado vacío (`cart-empty`) no se ocultaba correctamente cuando había items.

### Solución Implementada

```typescript
if (items.length === 0) {
  // Limpiar y ocultar items
  this.itemsContainer!.innerHTML = '';
  this.itemsContainer!.style.display = 'none';
  this.itemsContainer!.style.visibility = 'hidden';

  // Mostrar estado vacío
  this.emptyState!.style.display = 'flex';
  this.emptyState!.style.visibility = 'visible';
} else {
  // PRIMERO ocultar estado vacío
  this.emptyState!.style.display = 'none';
  this.emptyState!.style.visibility = 'hidden';

  // LUEGO mostrar items
  this.itemsContainer!.style.display = 'flex';
  this.itemsContainer!.style.visibility = 'visible';

  // Renderizar items
  this.fullRender(items);
}
```

**Cambios clave:**
1. Se oculta el estado vacío **ANTES** de mostrar items
2. Se usa tanto `display` como `visibility` para asegurar ocultación completa
3. Logs mejorados en consola para debugging

## 🧪 Probar el Carrito

### Test 1: Agregar Primer Producto
1. Abre la tienda
2. Haz clic en "Agregar al carrito"
3. ✅ El carrito debe mostrar 1 item (NO "vacío")

### Test 2: Agregar Múltiples Productos
1. Agrega 3 productos diferentes
2. ✅ El carrito debe mostrar 3 items

### Test 3: Eliminar Todos los Productos
1. Elimina todos los items uno por uno
2. ✅ Al eliminar el último, debe mostrar "Tu carrito está vacío"

### Test 4: Agregar Después de Vaciar
1. Vacía el carrito
2. Agrega un nuevo producto
3. ✅ Debe mostrar el producto (NO "vacío")

## 📊 Ver Datos de Productos

```sql
-- Ver todos los productos con sus imágenes
SELECT
  nombre,
  marca,
  modelo,
  precio,
  array_length(imagenes, 1) as cantidad_imagenes,
  imagenes
FROM producto_tienda
WHERE activo = true
ORDER BY nombre;

-- Ver productos por categoría
SELECT categoria, COUNT(*) as total
FROM producto_tienda
WHERE activo = true
GROUP BY categoria;

-- Ver productos con más de 2 imágenes
SELECT nombre, array_length(imagenes, 1) as imagenes_count
FROM producto_tienda
WHERE array_length(imagenes, 1) > 2;
```

## 🎨 Próximas Mejoras

### Galería de Producto (Modal)
Cuando se muestre el detalle del producto, permitir:
- Ver todas las imágenes en galería
- Zoom en las imágenes
- Navegación entre imágenes

### Thumbnails
En la vista de lista, mostrar thumbnails de todas las imágenes disponibles.

### Drag & Drop
Interfaz para reordenar imágenes del producto.

## 🔍 Logs de Debugging

Cuando abres la consola del navegador (F12), verás:

```
🛍️ Cargados 15 productos desde Supabase
🛒 CartModal: Mostrando 2 items
🛒 CartModal: Mostrando estado vacío - 0 items
```

Estos logs te ayudan a identificar problemas rápidamente.

## 💡 Tips

1. **Optimiza las imágenes** antes de subirlas (comprímelas)
2. **Usa nombres consistentes** para facilitar la gestión
3. **Primera imagen = principal** - será la que se muestra en la lista
4. **Máximo recomendado:** 5 imágenes por producto
5. **Formato recomendado:** JPG para fotos, PNG para transparencias
6. **Tamaño recomendado:**
   - Lista: 800x800px
   - Detalle: 1200x1200px
   - Galería: 1600x1600px

## 🚀 Siguiente Paso

Ahora que tienes productos con múltiples imágenes:

1. Sube las imágenes a Storage
2. Inserta los productos con arrays de imágenes
3. Prueba el carrito agregando y eliminando productos
4. Verifica que el estado vacío funcione correctamente

---

**Servidor corriendo en:** http://localhost:4321/
**Tienda:** http://localhost:4321/tienda
