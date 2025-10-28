# Configuración de Supabase para PQR y Encuestas

Este documento contiene las instrucciones para configurar las tablas y el almacenamiento en Supabase para las funcionalidades de PQR (Peticiones, Quejas y Reclamos) y Encuestas.

## 1. Crear Tablas en Supabase

Ve al panel de Supabase > SQL Editor y ejecuta los siguientes scripts:

### Tabla PQR

```sql
-- Crear función para actualizar fecha_actualizacion automáticamente
CREATE OR REPLACE FUNCTION update_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear tabla PQR
CREATE TABLE public.pqr (
  id bigserial NOT NULL,
  tipo_solicitud character varying(50) NOT NULL,
  nombre_completo character varying(255) NOT NULL,
  email character varying(255) NOT NULL,
  telefono character varying(20) NOT NULL,
  ciudad character varying(50) NOT NULL,
  asunto character varying(255) NOT NULL,
  mensaje text NOT NULL,
  archivo_adjunto character varying(500) NULL,
  estado character varying(50) NOT NULL DEFAULT 'recibido'::character varying,
  prioridad character varying(50) NOT NULL DEFAULT 'media'::character varying,
  fecha_creacion timestamp with time zone NULL DEFAULT now(),
  fecha_actualizacion timestamp with time zone NULL DEFAULT now(),
  fecha_respuesta timestamp without time zone NULL,
  respuesta text NULL,
  radicado character varying(50) NOT NULL,
  ip_address inet NULL,
  user_agent text NULL,
  id_usuario_asignado uuid NULL,
  CONSTRAINT pqr_pkey PRIMARY KEY (id),
  CONSTRAINT pqr_radicado_key UNIQUE (radicado),
  CONSTRAINT pqr_id_usuario_asignado_fkey FOREIGN KEY (id_usuario_asignado)
    REFERENCES auth.users (id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- Crear índices para PQR
CREATE INDEX IF NOT EXISTS idx_pqr_email ON public.pqr USING btree (email) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_pqr_estado ON public.pqr USING btree (estado) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_pqr_tipo ON public.pqr USING btree (tipo_solicitud) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_pqr_fecha ON public.pqr USING btree (fecha_creacion) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_pqr_radicado ON public.pqr USING btree (radicado) TABLESPACE pg_default;

-- Crear trigger para actualizar fecha_actualizacion
CREATE TRIGGER trg_update_fecha_pqr
BEFORE UPDATE ON pqr
FOR EACH ROW
EXECUTE FUNCTION update_fecha_actualizacion();
```

### Tabla Encuestas

```sql
-- Crear tabla Encuestas
CREATE TABLE public.encuestas (
  id bigserial NOT NULL,
  nombre_completo character varying(255) NOT NULL,
  email character varying(255) NOT NULL,
  telefono character varying(20) NULL,
  sede character varying(50) NOT NULL,
  atencion_calificacion integer NOT NULL,
  calidad_calificacion integer NOT NULL,
  tiempo_calificacion integer NOT NULL,
  productos_calificacion integer NOT NULL,
  satisfaccion_general integer NOT NULL,
  recomendacion_puntuacion integer NOT NULL,
  comentarios text NULL,
  fecha_creacion timestamp with time zone NULL DEFAULT now(),
  ip_address inet NULL,
  user_agent text NULL,
  user_id uuid NULL,
  CONSTRAINT encuestas_pkey PRIMARY KEY (id),
  CONSTRAINT encuestas_email_key UNIQUE (email),
  CONSTRAINT encuestas_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES auth.users (id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- Crear índices para Encuestas
CREATE INDEX IF NOT EXISTS idx_encuestas_email ON public.encuestas USING btree (email) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_encuestas_sede ON public.encuestas USING btree (sede) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_encuestas_fecha ON public.encuestas USING btree (fecha_creacion) TABLESPACE pg_default;
```

## 2. Configurar Políticas de Seguridad (RLS)

### Políticas para PQR

```sql
-- Habilitar RLS en la tabla PQR
ALTER TABLE public.pqr ENABLE ROW LEVEL SECURITY;

-- Permitir inserción anónima (para el formulario público)
CREATE POLICY "Permitir inserción pública de PQR"
ON public.pqr FOR INSERT
WITH CHECK (true);

-- Permitir lectura solo a usuarios autenticados (admin)
CREATE POLICY "Permitir lectura a usuarios autenticados"
ON public.pqr FOR SELECT
USING (auth.role() = 'authenticated');

-- Permitir actualización solo a usuarios autenticados (admin)
CREATE POLICY "Permitir actualización a usuarios autenticados"
ON public.pqr FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
```

### Políticas para Encuestas

```sql
-- Habilitar RLS en la tabla Encuestas
ALTER TABLE public.encuestas ENABLE ROW LEVEL SECURITY;

-- Permitir inserción anónima (para el formulario público)
CREATE POLICY "Permitir inserción pública de encuestas"
ON public.encuestas FOR INSERT
WITH CHECK (true);

-- Permitir lectura solo a usuarios autenticados (admin)
CREATE POLICY "Permitir lectura a usuarios autenticados"
ON public.encuestas FOR SELECT
USING (auth.role() = 'authenticated');
```

## 3. Crear Bucket de Storage para Archivos PQR

1. Ve a **Storage** en el panel de Supabase
2. Haz clic en **"New bucket"**
3. Configuración del bucket:
   - **Name:** `documentos`
   - **Public:** NO (desmarcado) - Los archivos serán privados
   - **File size limit:** 5MB (o el límite que prefieras)
   - **Allowed MIME types:**
     - `image/jpeg`
     - `image/png`
     - `image/gif`
     - `application/pdf`
     - `application/msword`
     - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

4. Haz clic en **"Create bucket"**

### Configurar Políticas de Storage

Después de crear el bucket, ve a la pestaña **Policies** del bucket y crea estas políticas:

```sql
-- Permitir subida de archivos (INSERT)
CREATE POLICY "Permitir subida pública de archivos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documentos' AND auth.role() = 'anon');

-- Permitir lectura solo a usuarios autenticados
CREATE POLICY "Permitir lectura a usuarios autenticados"
ON storage.objects FOR SELECT
USING (bucket_id = 'documentos' AND auth.role() = 'authenticated');

-- Permitir eliminación solo a usuarios autenticados
CREATE POLICY "Permitir eliminación a usuarios autenticados"
ON storage.objects FOR DELETE
USING (bucket_id = 'documentos' AND auth.role() = 'authenticated');
```

## 4. Verificar Variables de Entorno

Asegúrate de que tu archivo `.env` contenga las credenciales correctas de Supabase:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-anon-key-aqui
```

## 5. Implementación con Supabase JS Client

Los formularios de PQR y Encuestas usan **directamente** el cliente de Supabase desde el navegador. No se utilizan endpoints API intermedios.

### Ventajas de esta implementación:
- ✅ Menor latencia (conexión directa a Supabase)
- ✅ Menos código que mantener (no hay endpoints API)
- ✅ Uso de políticas RLS de Supabase para seguridad
- ✅ Actualizaciones en tiempo real disponibles

### Conexión directa desde cliente:
Ambos formularios importan el cliente de Supabase:
```typescript
import { supabase } from '../lib/supabase';
```

Y realizan operaciones directamente:
```typescript
// Ejemplo de inserción PQR
const { data, error } = await supabase
  .from('pqr')
  .insert([pqrData])
  .select()
  .single();

// Ejemplo de subida de archivo
const { data, error } = await supabase.storage
  .from('documentos')
  .upload(filePath, archivo);
```

## 6. Funcionalidades Implementadas

### PQR (Peticiones, Quejas y Reclamos)
- ✅ Formulario web completo
- ✅ Generación automática de radicado único
- ✅ Subida de archivos adjuntos a Supabase Storage
- ✅ Captura de IP y User Agent
- ✅ Estado inicial: "recibido"
- ✅ Prioridad inicial: "media"
- ✅ Validación de campos requeridos
- ✅ Mensaje de éxito con número de radicado

### Encuestas de Satisfacción
- ✅ Formulario web completo
- ✅ Calificaciones por estrellas (1-5)
- ✅ Net Promoter Score (NPS) 0-10
- ✅ Validación de rangos de calificación
- ✅ Captura de IP y User Agent
- ✅ Validación de email único (no duplicados)
- ✅ Cálculo automático de categoría NPS (Promotor/Pasivo/Detractor)
- ✅ Redirección automática después de envío exitoso

## 7. Arquitectura de la Implementación

### Flujo de PQR:
1. Usuario completa formulario en `/pqr`
2. JavaScript captura el submit y previene el comportamiento por defecto
3. Si hay archivo adjunto, se sube primero a Supabase Storage (bucket: `documentos`)
4. Se genera un radicado único (formato: `PQR-YYYYMMDD-XXXX`)
5. Los datos se insertan directamente a la tabla `pqr` usando `supabase.from('pqr').insert()`
6. Las políticas RLS de Supabase validan que la operación INSERT es permitida
7. Se muestra mensaje de éxito con el número de radicado

### Flujo de Encuestas:
1. Usuario completa formulario en `/encuesta`
2. JavaScript valida los rangos de calificación (1-5 estrellas, 0-10 NPS)
3. Los datos se insertan directamente a la tabla `encuestas` usando `supabase.from('encuestas').insert()`
4. Las políticas RLS validan la inserción
5. Se detectan emails duplicados (constraint único)
6. Se muestra mensaje de éxito y redirección automática

### Seguridad:
- **RLS (Row Level Security)** está habilitado en ambas tablas
- **Política de INSERT anónimo** permite que usuarios no autenticados envíen formularios
- **Solo usuarios autenticados** pueden leer/actualizar registros (para panel admin futuro)
- **Storage privado** para archivos PQR (solo accesible por autenticados)
- La **SUPABASE_KEY** usada es la clave anónima (segura para frontend)

## 8. Próximos Pasos (Opcional)

- Crear panel de administración para ver y gestionar PQR
- Implementar notificaciones por email al recibir PQR
- Crear dashboard de estadísticas de encuestas
- Implementar sistema de respuestas para PQR
- Agregar autenticación para asignar PQR a usuarios
- Implementar captcha para prevenir spam

## 9. Testing

Para probar las funcionalidades:

1. Inicia el servidor de desarrollo: `npm run dev`
2. Navega a:
   - PQR: `http://localhost:4321/pqr`
   - Encuesta: `http://localhost:4321/encuesta`
3. Completa y envía los formularios
4. Verifica en Supabase > Table Editor que los datos se guardaron correctamente
5. Para PQR con archivos, verifica en Storage > documentos que el archivo se subió

## Solución de Problemas

### Error: "Missing Supabase environment variables"
- Verifica que `.env` esté en la raíz del proyecto
- Reinicia el servidor de desarrollo después de modificar `.env`

### Error: "permission denied for table pqr/encuestas"
- Revisa que las políticas RLS estén creadas correctamente
- Verifica que `auth.role() = 'anon'` esté permitido para INSERT

### Error al subir archivos
- Verifica que el bucket "documentos" exista
- Revisa las políticas de storage
- Confirma que el archivo no exceda el límite de tamaño

### Error: "duplicate key value violates unique constraint"
- Para PQR: El radicado generado ya existe (muy improbable)
- Para Encuestas: El email ya fue usado en otra encuesta
