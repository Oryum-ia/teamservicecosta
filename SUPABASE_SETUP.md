# Configuración de Supabase

Este proyecto usa Supabase para gestionar productos de la tienda e imágenes del carrusel del inicio.

## 1. Configuración Inicial

Las credenciales de Supabase ya están configuradas en el archivo `.env`:

```env
SUPABASE_URL=https://caodmkmabgyueofjwgek.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 2. Crear Tablas en Supabase

1. Ve a tu proyecto en [Supabase](https://supabase.com/dashboard)
2. Navega a **SQL Editor**
3. Abre el archivo `supabase-setup.sql` en este proyecto
4. Copia y ejecuta todo el contenido del archivo SQL

El script creará:
- ✅ Tabla `producto_tienda` - Para productos de la tienda
- ✅ Tabla `imagen_hero` - Para imágenes del carrusel del inicio
- ✅ Políticas RLS (Row Level Security) para lectura pública
- ✅ Índices para mejor rendimiento
- ✅ Datos de ejemplo

## 3. Estructura de Tablas

### Tabla: `producto_tienda`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | ID único (generado automáticamente) |
| `nombre` | text | Nombre del producto |
| `descripcion` | text | Descripción/modelo del producto |
| `precio` | numeric | Precio en COP |
| `stock` | integer | Cantidad disponible |
| `imagen_url` | text | URL de la imagen del producto |
| `promocion` | boolean | Si está en promoción |
| `activo` | boolean | Si está activo/visible |

### Tabla: `imagen_hero`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | ID único (generado automáticamente) |
| `titulo` | text | Título de la imagen |
| `subtitulo` | text | Subtítulo opcional |
| `imagen_url` | text | URL de la imagen |
| `orden` | integer | Orden de visualización (1, 2, 3...) |
| `activo` | boolean | Si está activo/visible |
| `created_at` | timestamp | Fecha de creación |

## 4. Gestión de Imágenes

### Opción A: Usar URLs Externas (Recomendado para desarrollo)
Puedes usar URLs de servicios como:
- Unsplash: `https://images.unsplash.com/photo-...`
- Tu propio CDN o servidor

### Opción B: Subir a Supabase Storage

1. En tu dashboard de Supabase, ve a **Storage**
2. Crea un bucket llamado `productos` o `imagenes`
3. Sube tus imágenes
4. Haz el bucket público
5. Copia la URL pública de cada imagen
6. Usa esas URLs en los campos `imagen_url`

## 5. Agregar Productos desde el Dashboard

### Método 1: SQL Editor
```sql
INSERT INTO public.producto_tienda (nombre, descripcion, precio, stock, imagen_url, promocion, activo)
VALUES (
  'Hidrolavadora KÄRCHER K7',
  'K7 Premium Full Control Plus - Máxima potencia',
  2450000,
  10,
  'https://tu-imagen-url.jpg',
  false,
  true
);
```

### Método 2: Table Editor
1. Ve a **Table Editor** en Supabase
2. Selecciona la tabla `producto_tienda`
3. Click en **Insert row**
4. Llena los campos manualmente
5. Guarda

## 6. Agregar Imágenes del Hero/Carrusel

```sql
INSERT INTO public.imagen_hero (titulo, subtitulo, imagen_url, orden, activo)
VALUES (
  'Servicio Técnico Especializado',
  'Reparación y mantenimiento de equipos KÄRCHER y Makita',
  'https://tu-imagen-url.jpg',
  1,
  true
);
```

## 7. Verificar que Funciona

1. Asegúrate de que el servidor de desarrollo esté corriendo:
   ```bash
   npm run dev
   ```

2. Visita:
   - **Inicio** → `http://localhost:4321/` → Deberías ver las imágenes del carrusel
   - **Tienda** → `http://localhost:4321/tienda` → Deberías ver los productos

3. Revisa la consola del navegador (F12) para ver si hay errores de conexión

## 8. Troubleshooting

### Error: "Missing Supabase environment variables"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Reinicia el servidor de desarrollo

### No se cargan las imágenes/productos
- Verifica que las tablas existen en Supabase
- Comprueba que hay datos con `activo = true`
- Revisa las políticas RLS en Supabase → Authentication → Policies

### Políticas RLS bloqueando lectura
Ejecuta en SQL Editor:
```sql
-- Permitir lectura pública
ALTER TABLE public.producto_tienda ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.imagen_hero ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir lectura pública de productos" ON public.producto_tienda;
DROP POLICY IF EXISTS "Permitir lectura pública de imágenes hero" ON public.imagen_hero;

CREATE POLICY "Permitir lectura pública de productos"
ON public.producto_tienda FOR SELECT USING (true);

CREATE POLICY "Permitir lectura pública de imágenes hero"
ON public.imagen_hero FOR SELECT USING (true);
```

## 9. Archivos Modificados

Los siguientes archivos ahora consumen datos de Supabase:

- ✅ `src/lib/supabase.ts` - Cliente y tipos de Supabase
- ✅ `src/pages/tienda.astro` - Carga productos desde DB
- ✅ `src/components/HeroMiro.astro` - Carga imágenes desde DB
- ✅ `.env` - Variables de entorno
- ✅ `supabase-setup.sql` - Script de configuración

## 10. Siguientes Pasos

### Panel de Administración (Opcional)
Podrías crear páginas de administración para:
- Agregar/editar/eliminar productos
- Subir y gestionar imágenes
- Ver estadísticas

### Imágenes Optimizadas
Considera usar Supabase Storage con transformaciones de imagen para mejor rendimiento.

### Cache
Implementar cache para reducir llamadas a la API de Supabase.
