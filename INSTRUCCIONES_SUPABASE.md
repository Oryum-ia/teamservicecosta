# Instrucciones Completas de Configuración de Supabase

## 📋 Resumen de Cambios

Se ha integrado completamente Supabase para gestionar:
1. **Carrusel del inicio** - Tabla `carrusel` con imágenes desde Storage
2. **Productos de la tienda** - Tabla `producto_tienda` con imágenes desde Storage
3. **Órdenes de servicio** - Tabla `ordenes` con toda la información de reparaciones y compras

## 🚀 Paso 1: Ejecutar el Script SQL

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navega a **SQL Editor** (en el menú lateral)
3. Abre el archivo `supabase-setup.sql` en tu editor de código
4. Copia todo el contenido
5. Pégalo en el SQL Editor de Supabase
6. Click en **Run** o presiona Ctrl+Enter
7. Verifica que dice "Success" sin errores

Esto creará todas las tablas necesarias:
- `carrusel`
- `producto_tienda`
- `admin_tienda`
- `clientes`
- `equipos`
- `usuarios`
- `sedes`
- `ordenes`

## 📦 Paso 2: Crear Bucket de Storage

1. En Supabase Dashboard, ve a **Storage**
2. Click en **New bucket**
3. Nombre del bucket: `imagenes`
4. Marca como **Public bucket** ✅
5. Click en **Create bucket**

Este bucket almacenará todas las imágenes del proyecto.

## 📁 Paso 3: Estructura de Carpetas en Storage

Dentro del bucket `imagenes`, crea estas carpetas:

```
imagenes/
├── carrusel/          # Imágenes del carrusel del inicio
├── productos/         # Imágenes de productos de la tienda
└── ordenes/           # Fotos de diagnóstico de órdenes
```

### Cómo crear carpetas:
1. Entra al bucket `imagenes`
2. Click en **Upload file**
3. En la ruta, escribe `carrusel/` (con la barra al final)
4. Sube cualquier imagen temporal
5. Repite para `productos/` y `ordenes/`

## 🖼️ Paso 4: Subir Imágenes

### Para el Carrusel:

1. Ve a Storage → `imagenes` → `carrusel/`
2. Sube 3 imágenes (o las que quieras) con nombres descriptivos:
   - `imagen1.jpg`
   - `imagen2.jpg`
   - `imagen3.jpg`
3. Recomendación: Imágenes de 1920x800px o similar (formato panorámico)

### Para Productos:

1. Ve a Storage → `imagenes` → `productos/`
2. Sube imágenes de tus productos:
   - `karcher-k5.jpg`
   - `karcher-wd3.jpg`
   - `makita-hp1640.jpg`
3. Recomendación: Imágenes de 800x600px (formato 4:3)

### Para Órdenes:

1. Ve a Storage → `imagenes` → `ordenes/`
2. Sube fotos de diagnóstico con nombres descriptivos:
   - `ORD-2024-0001-foto1.jpg`
   - `ORD-2024-0001-foto2.jpg`

## 📝 Paso 5: Insertar Datos en las Tablas

### A. Insertar Imágenes del Carrusel

```sql
INSERT INTO public.carrusel (titulo, descripcion, imagen_url, orden, activo)
VALUES
  ('Servicio Técnico Especializado', 'Reparación y mantenimiento de equipos KÄRCHER y Makita', 'carrusel/imagen1.jpg', 1, true),
  ('Equipos Profesionales', 'Las mejores marcas para tu trabajo', 'carrusel/imagen2.jpg', 2, true),
  ('Repuestos Originales', 'Garantía y calidad certificada', 'carrusel/imagen3.jpg', 3, true);
```

**Nota:** Las rutas son relativas al bucket. NO incluyas `imagenes/` al principio.

### B. Insertar Productos

```sql
INSERT INTO public.producto_tienda (nombre, descripcion, precio, stock, imagen_url, promocion, activo)
VALUES
  (
    'Hidrolavadora KÄRCHER K5',
    'Hidrolavadora de alta presión perfecta para uso profesional y doméstico. 145 bar de presión.',
    1850000,
    15,
    'productos/karcher-k5.jpg',
    true,
    true
  ),
  (
    'Aspiradora KÄRCHER WD3',
    'Aspiradora seco/húmedo de uso múltiple con gran capacidad de 17 litros',
    980000,
    20,
    'productos/karcher-wd3.jpg',
    false,
    true
  ),
  (
    'Taladro Makita HP1640',
    'Taladro de percusión 680W profesional con velocidad variable',
    450000,
    30,
    'productos/makita-hp1640.jpg',
    true,
    true
  );
```

### C. Insertar Datos de Soporte para Órdenes

Primero crea clientes, equipos, sedes y usuarios:

```sql
-- Clientes
INSERT INTO public.clientes (nombre, email, telefono, direccion)
VALUES
  ('Juan Pérez', 'juan@example.com', '3001234567', 'Calle 123 #45-67, Montería'),
  ('María García', 'maria@example.com', '3009876543', 'Carrera 50 #30-20, Cartagena');

-- Equipos
INSERT INTO public.equipos (tipo, marca, modelo, serial)
VALUES
  ('Hidrolavadora', 'KÄRCHER', 'K5 Premium Full Control', 'KAR-K5-2023-45678'),
  ('Aspiradora', 'KÄRCHER', 'WD3 Premium', 'KAR-WD3-2023-12345');

-- Sedes
INSERT INTO public.sedes (nombre, ciudad)
VALUES
  ('Sede Principal', 'Montería'),
  ('Sucursal Caribe', 'Cartagena'),
  ('Punto Urabá', 'Apartadó');

-- Usuarios/Técnicos
INSERT INTO public.usuarios (nombre, rol)
VALUES
  ('Carlos Técnico', 'tecnico'),
  ('Ana Diagnostico', 'tecnico'),
  ('Pedro Recepción', 'recepcionista');
```

### D. Insertar Órdenes de Ejemplo

```sql
-- Obtener IDs primero
SELECT id, nombre FROM clientes LIMIT 2;
SELECT id, tipo FROM equipos LIMIT 2;
SELECT id, nombre FROM sedes WHERE ciudad = 'Montería';
SELECT id, nombre FROM usuarios WHERE rol = 'tecnico' LIMIT 2;

-- Luego insertar orden (reemplaza los UUIDs con los reales)
INSERT INTO public.ordenes (
  codigo,
  cliente_id,
  equipo_id,
  sede_id,
  estado_actual,
  tipo_orden,
  fecha_creacion,
  fecha_fin_recepcion,
  fecha_inicio_diagnostico,
  comentarios_diagnostico,
  fotos_diagnostico,
  repuestos_diagnostico,
  tecnico_diagnostico,
  total
)
VALUES (
  'ORD-2024-0001',
  'CLIENTE_UUID_AQUI',
  'EQUIPO_UUID_AQUI',
  'SEDE_UUID_AQUI',
  'En diagnóstico',
  'reparacion',
  '2024-01-15 10:00:00',
  '2024-01-15 10:30:00',
  '2024-01-15 14:00:00',
  'Equipo presenta fuga en bomba de presión principal.',
  ARRAY['ordenes/ORD-2024-0001-foto1.jpg', 'ordenes/ORD-2024-0001-foto2.jpg'],
  '[{"name":"Bomba de Presión","code":"K5-PUMP-2024","price":285000,"status":"Pendiente"}]'::jsonb,
  'TECNICO_UUID_AQUI',
  285000
);
```

## 🔍 Paso 6: Verificar que Todo Funciona

### Prueba 1: Carrusel del Inicio
1. Abre `http://localhost:4321/`
2. Deberías ver las imágenes del carrusel rotando automáticamente
3. Abre la consola del navegador (F12) y busca: `🎠 Carrusel inicializado con X slides`

### Prueba 2: Productos de la Tienda
1. Abre `http://localhost:4321/tienda`
2. Deberías ver los productos con sus imágenes
3. En la consola: `🛍️ Cargados X productos desde Supabase`

### Prueba 3: Estado de Producto
1. Abre `http://localhost:4321/estado-producto`
2. Ingresa el código: `ORD-2024-0001`
3. Deberías ver toda la información de la orden
4. En la consola: `🔍 Buscando orden: ORD-2024-0001` y `✅ Orden encontrada`

## 🛠️ Solución de Problemas

### Problema: Imágenes no se muestran

**Solución 1: Verificar que el bucket es público**
```sql
-- En SQL Editor
UPDATE storage.buckets
SET public = true
WHERE name = 'imagenes';
```

**Solución 2: Verificar las rutas**
- Las rutas en la DB deben ser: `carrusel/imagen1.jpg` (sin `imagenes/` al inicio)
- NO uses URLs completas, solo la ruta relativa

**Solución 3: Verificar permisos RLS**
```sql
-- Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Crear política de acceso público para lectura
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'imagenes');

-- Permitir subida autenticada (opcional)
CREATE POLICY "Authenticated can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'imagenes' AND auth.role() = 'authenticated');
```

### Problema: No se cargan productos/carrusel

**Verificar en consola del navegador:**
- Busca errores en rojo
- Si dice "CORS error", verifica las políticas RLS
- Si dice "not found", verifica que el bucket y las carpetas existen

**Verificar datos en Supabase:**
```sql
-- Ver todos los registros de carrusel
SELECT * FROM carrusel WHERE activo = true ORDER BY orden;

-- Ver todos los productos
SELECT * FROM producto_tienda WHERE activo = true;

-- Ver todas las órdenes
SELECT codigo, estado_actual, fecha_creacion FROM ordenes ORDER BY fecha_creacion DESC;
```

### Problema: Órdenes no se encuentran

**Verificar relaciones:**
```sql
-- Ver orden con todas sus relaciones
SELECT
  o.*,
  c.nombre as cliente_nombre,
  e.tipo as equipo_tipo,
  s.nombre as sede_nombre
FROM ordenes o
LEFT JOIN clientes c ON o.cliente_id = c.id
LEFT JOIN equipos e ON o.equipo_id = e.id
LEFT JOIN sedes s ON o.sede_id = s.id
WHERE o.codigo = 'ORD-2024-0001';
```

## 📊 Agregar Más Datos

### Agregar un Nuevo Producto

1. Sube la imagen a Storage: `imagenes/productos/nuevo-producto.jpg`
2. Inserta en la base de datos:

```sql
INSERT INTO producto_tienda (nombre, descripcion, precio, stock, imagen_url, promocion, activo)
VALUES (
  'Nombre del Producto',
  'Descripción detallada',
  1200000,
  10,
  'productos/nuevo-producto.jpg',
  false,
  true
);
```

### Agregar una Nueva Imagen al Carrusel

1. Sube la imagen: `imagenes/carrusel/imagen4.jpg`
2. Inserta:

```sql
INSERT INTO carrusel (titulo, descripcion, imagen_url, orden, activo)
VALUES ('Nuevo Título', 'Nueva descripción', 'carrusel/imagen4.jpg', 4, true);
```

### Agregar una Nueva Orden

```sql
INSERT INTO ordenes (
  codigo,
  cliente_id,
  equipo_id,
  sede_id,
  estado_actual,
  tipo_orden,
  fecha_creacion,
  comentarios_recepcion
)
VALUES (
  'ORD-2024-0010',
  (SELECT id FROM clientes LIMIT 1),
  (SELECT id FROM equipos LIMIT 1),
  (SELECT id FROM sedes LIMIT 1),
  'Recibido',
  'reparacion',
  NOW(),
  'Equipo recibido para revisión general'
);
```

## 🎯 Características Implementadas

✅ **Carrusel dinámico** - Carga automática desde Supabase
✅ **Número ilimitado de slides** - Agrega cuantas imágenes quieras
✅ **Carrusel mejorado** - Sin problemas de quedarse en la misma imagen
✅ **Productos dinámicos** - Gestión completa desde Supabase
✅ **Imágenes en Storage** - No más URLs externas
✅ **Órdenes desde base de datos** - Búsqueda en tiempo real
✅ **Fallback local** - Si Supabase falla, usa datos de respaldo
✅ **Optimización de imágenes** - Lazy loading y carga eficiente

## 📱 URLs Útiles

- **Dashboard Supabase**: https://supabase.com/dashboard
- **Proyecto Local**: http://localhost:4321/
- **Tienda**: http://localhost:4321/tienda
- **Estado**: http://localhost:4321/estado-producto

## 💡 Consejos

1. **Optimiza las imágenes** antes de subirlas (compresión, tamaño adecuado)
2. **Usa nombres descriptivos** para las imágenes
3. **Mantén consistencia** en las rutas (siempre relativas al bucket)
4. **Haz respaldos** de tu base de datos regularmente
5. **Documenta** cualquier cambio que hagas

## 🔒 Seguridad

- Las credenciales están en `.env` y NO se suben a Git (`.gitignore`)
- El bucket es público solo para lectura
- Las políticas RLS protegen los datos sensibles
- Solo datos activos (`activo = true`) son visibles al público

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para logs detallados con emojis 🎠🛍️🔍
