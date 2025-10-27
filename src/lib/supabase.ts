import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Nombre del bucket de Storage (debes crearlo en Supabase Dashboard)
export const STORAGE_BUCKET = 'imagenes';

// Función para obtener URL pública de Storage
export function getPublicUrl(path: string | null): string {
  if (!path) return '';

  // Si ya es una URL completa, retornarla
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Obtener URL pública del bucket
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// Tipos para la base de datos
export interface ProductoTienda {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: number | null;
  stock: number | null;
  imagenes: string[] | null;
  promocion: boolean | null;
  activo: boolean | null;
  categoria: string | null;
  marca: string | null;
  modelo: string | null;
}

export interface Carrusel {
  id: string;
  titulo: string | null;
  descripcion: string | null;
  imagen_url: string;
  orden: number;
  activo: boolean | null;
}

export interface Orden {
  id: string;
  codigo: string | null;
  cliente_id: string | null;
  estado_actual: string | null;
  tipo_orden: string | null;
  prioridad: string | null;
  tipo_entrega: string | null;
  fecha_creacion: string | null;
  fecha_fin_recepcion: string | null;
  fecha_inicio_diagnostico: string | null;
  fecha_fin_diagnostico: string | null;
  fecha_cotizacion: string | null;
  fecha_aprobacion: string | null;
  fecha_solicitud_repuestos: string | null;
  fecha_recepcion_repuestos: string | null;
  fecha_inicio_reparacion: string | null;
  fecha_fin_reparacion: string | null;
  fecha_entrega: string | null;
  comentarios_recepcion: string | null;
  comentarios_diagnostico: string | null;
  comentarios_cotizacion: string | null;
  comentarios_reparacion: string | null;
  comentarios_entrega: string | null;
  comentarios_cliente: string | null;
  es_retrabajo: boolean | null;
  valor_revision: number | null;
  revision_pagada: boolean | null;
  calificacion: number | null;
  total: number | null;
  fotos_diagnostico: string[] | null;
  repuestos_diagnostico: any;
  repuestos_cotizacion: any;
  equipo_id: string | null;
  responsable: string | null;
}
