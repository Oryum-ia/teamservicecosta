-- Tabla para el carrusel del inicio
CREATE TABLE IF NOT EXISTS public.carrusel (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  titulo text NULL,
  descripcion text NULL,
  imagen_url text NOT NULL,
  orden integer NULL DEFAULT 0,
  activo boolean NULL DEFAULT true,
  CONSTRAINT carrusel_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Tabla de productos de la tienda
CREATE TABLE IF NOT EXISTS public.producto_tienda (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text NULL,
  precio numeric NULL,
  stock integer NULL,
  imagenes text[] NULL DEFAULT '{}',
  promocion boolean NULL DEFAULT false,
  activo boolean NULL DEFAULT true,
  categoria text NULL,
  marca text NULL,
  modelo text NULL,
  CONSTRAINT producto_tienda_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Tabla de administración de tienda
CREATE TABLE IF NOT EXISTS public.admin_tienda (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  usuario_id uuid NULL,
  estado_tienda text NULL DEFAULT 'Activa',
  mensaje_promocion text NULL,
  updated_at timestamp without time zone NULL DEFAULT now(),
  CONSTRAINT admin_tienda_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Tabla de clientes (necesaria para ordenes)
CREATE TABLE IF NOT EXISTS public.clientes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  email text NULL,
  telefono text NULL,
  direccion text NULL,
  CONSTRAINT clientes_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Tabla de equipos (necesaria para ordenes)
CREATE TABLE IF NOT EXISTS public.equipos (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tipo text NOT NULL,
  marca text NULL,
  modelo text NULL,
  serial text NULL,
  CONSTRAINT equipos_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Tabla de usuarios (necesaria para ordenes)
CREATE TABLE IF NOT EXISTS public.usuarios (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  rol text NULL,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Tabla de sedes (necesaria para ordenes)
CREATE TABLE IF NOT EXISTS public.sedes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  ciudad text NULL,
  CONSTRAINT sedes_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Tabla de órdenes
CREATE TABLE IF NOT EXISTS public.ordenes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  codigo text NULL,
  cliente_id uuid NULL,
  estado_actual text NULL,
  tipo_orden text NULL,
  prioridad text NULL,
  tipo_entrega text NULL,
  fecha_creacion timestamp without time zone NULL,
  fecha_fin_recepcion timestamp without time zone NULL,
  fecha_inicio_diagnostico timestamp without time zone NULL,
  fecha_fin_diagnostico timestamp without time zone NULL,
  fecha_cotizacion timestamp without time zone NULL,
  fecha_aprobacion timestamp without time zone NULL,
  fecha_solicitud_repuestos timestamp without time zone NULL,
  fecha_recepcion_repuestos timestamp without time zone NULL,
  fecha_inicio_reparacion timestamp without time zone NULL,
  fecha_fin_reparacion timestamp without time zone NULL,
  fecha_entrega timestamp without time zone NULL,
  comentarios_recepcion text NULL,
  comentarios_diagnostico text NULL,
  comentarios_cotizacion text NULL,
  comentarios_reparacion text NULL,
  comentarios_entrega text NULL,
  comentarios_cliente text NULL,
  es_retrabajo boolean NULL DEFAULT false,
  valor_revision numeric NULL DEFAULT 0,
  revision_pagada boolean NULL DEFAULT false,
  calificacion numeric NULL,
  tecnico_recepcion uuid NULL,
  tecnico_diagnostico uuid NULL,
  tecnico_cotiza uuid NULL,
  tecnico_repara uuid NULL,
  tecnico_entrega uuid NULL,
  sede_id uuid NULL,
  estado_garantia text NULL,
  ultima_actualizacion timestamp without time zone NULL DEFAULT now(),
  pedido text NULL,
  fecha_pedido timestamp without time zone NULL,
  total numeric NULL DEFAULT 0,
  aprobado_cliente boolean NULL DEFAULT false,
  equipo_id uuid NULL,
  responsable text NULL,
  updated_at timestamp without time zone NULL,
  fotos_diagnostico text[] NULL,
  repuestos_diagnostico jsonb NULL DEFAULT '[]'::jsonb,
  repuestos_cotizacion jsonb NULL DEFAULT '[]'::jsonb,
  aprobacion_marca jsonb NULL,
  CONSTRAINT ordenes_pkey PRIMARY KEY (id),
  CONSTRAINT ordenes_codigo_key UNIQUE (codigo),
  CONSTRAINT ordenes_sede_id_fkey FOREIGN KEY (sede_id) REFERENCES sedes (id) ON DELETE SET NULL,
  CONSTRAINT ordenes_tecnico_cotiza_fkey FOREIGN KEY (tecnico_cotiza) REFERENCES usuarios (id) ON DELETE SET NULL,
  CONSTRAINT ordenes_tecnico_diagnostico_fkey FOREIGN KEY (tecnico_diagnostico) REFERENCES usuarios (id) ON DELETE SET NULL,
  CONSTRAINT ordenes_tecnico_entrega_fkey FOREIGN KEY (tecnico_entrega) REFERENCES usuarios (id) ON DELETE SET NULL,
  CONSTRAINT ordenes_tecnico_recepcion_fkey FOREIGN KEY (tecnico_recepcion) REFERENCES usuarios (id) ON DELETE SET NULL,
  CONSTRAINT ordenes_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES clientes (id) ON DELETE SET NULL,
  CONSTRAINT ordenes_tecnico_repara_fkey FOREIGN KEY (tecnico_repara) REFERENCES usuarios (id) ON DELETE SET NULL,
  CONSTRAINT ordenes_equipo_fkey FOREIGN KEY (equipo_id) REFERENCES equipos (id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.carrusel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.producto_tienda ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ordenes ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
CREATE POLICY "Permitir lectura pública de carrusel"
ON public.carrusel FOR SELECT USING (activo = true);

CREATE POLICY "Permitir lectura pública de productos"
ON public.producto_tienda FOR SELECT USING (activo = true);

CREATE POLICY "Permitir lectura pública de ordenes"
ON public.ordenes FOR SELECT USING (true);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_carrusel_orden ON public.carrusel(orden) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_carrusel_activo ON public.carrusel(activo) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_producto_tienda_activo ON public.producto_tienda(activo);
CREATE INDEX IF NOT EXISTS idx_producto_tienda_promocion ON public.producto_tienda(promocion);
CREATE INDEX IF NOT EXISTS idx_ordenes_equipo ON public.ordenes(equipo_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_ordenes_codigo ON public.ordenes(codigo) TABLESPACE pg_default;

-- Datos de ejemplo para carrusel (usar rutas de Storage de Supabase)
-- Nota: Debes subir las imágenes a Storage primero y reemplazar estas URLs
INSERT INTO public.carrusel (titulo, descripcion, imagen_url, orden, activo)
VALUES
  ('Servicio Técnico Especializado', 'Reparación y mantenimiento de equipos KÄRCHER y Makita', 'carrusel/imagen1.jpg', 1, true),
  ('Equipos Profesionales', 'Las mejores marcas para tu trabajo', 'carrusel/imagen2.jpg', 2, true),
  ('Repuestos Originales', 'Garantía y calidad certificada', 'carrusel/imagen3.jpg', 3, true)
ON CONFLICT DO NOTHING;

-- Datos de ejemplo para productos (usar rutas de Storage de Supabase)
-- Nota: Cada producto puede tener múltiples imágenes en el array
INSERT INTO public.producto_tienda (nombre, descripcion, precio, stock, imagenes, promocion, activo, categoria, marca, modelo)
VALUES
  (
    'Hidrolavadora KÄRCHER K5',
    'Hidrolavadora de alta presión perfecta para uso profesional y doméstico. 145 bar de presión, motor de 2100W.',
    1850000,
    15,
    ARRAY['productos/karcher-k5-1.jpg', 'productos/karcher-k5-2.jpg', 'productos/karcher-k5-3.jpg'],
    true,
    true,
    'hidrolavadoras',
    'KÄRCHER',
    'K5 Premium Full Control'
  ),
  (
    'Aspiradora KÄRCHER WD3',
    'Aspiradora seco/húmedo de uso múltiple con gran capacidad de 17 litros. Ideal para talleres.',
    980000,
    20,
    ARRAY['productos/karcher-wd3-1.jpg', 'productos/karcher-wd3-2.jpg'],
    false,
    true,
    'aspiradoras',
    'KÄRCHER',
    'WD3 Premium'
  ),
  (
    'Taladro Makita HP1640',
    'Taladro de percusión 680W profesional con velocidad variable y mandril de 13mm.',
    450000,
    30,
    ARRAY['productos/makita-hp1640-1.jpg', 'productos/makita-hp1640-2.jpg', 'productos/makita-hp1640-3.jpg'],
    true,
    true,
    'herramientas',
    'Makita',
    'HP1640'
  )
ON CONFLICT DO NOTHING;
