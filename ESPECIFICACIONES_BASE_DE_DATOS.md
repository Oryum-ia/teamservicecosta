# Especificaciones de Base de Datos - Team Service Costa

## Tabla: Encuestas de Satisfacción

Esta tabla almacenará las respuestas de los usuarios al formulario de encuesta de satisfacción.

### Estructura de la tabla `encuestas`

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | SERIAL BIGINT | Identificador único de la encuesta | Sí |
| nombre_completo | VARCHAR(255) | Nombre completo del usuario | Sí |
| email | VARCHAR(255) | Correo electrónico del usuario | Sí |
| telefono | VARCHAR(20) | Teléfono de contacto | No |
| sede | VARCHAR(50) | Sede donde fue atendido (monteria, cartagena, apartado) | Sí |
| atencion_calificacion | INTEGER | Calificación de atención (1-5) | Sí |
| calidad_calificacion | INTEGER | Calificación de calidad del servicio (1-5) | Sí |
| tiempo_calificacion | INTEGER | Calificación de tiempo de respuesta (1-5) | Sí |
| productos_calificacion | INTEGER | Calificación de productos/equipos (1-5) | Sí |
| satisfaccion_general | INTEGER | Satisfacción general (1-5) | Sí |
| recomendacion_puntuacion | INTEGER | Puntuación de recomendación (0-10) | Sí |
| comentarios | TEXT | Comentarios adicionales | No |
| fecha_creacion | TIMESTAMP | Fecha y hora de creación del registro | Sí |
| ip_address | INET | Dirección IP del usuario | No |
| user_agent | TEXT | Navegador del usuario | No |

### SQL para crear la tabla

```sql
CREATE TABLE encuestas (
    id SERIAL BIGINT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    sede VARCHAR(50) NOT NULL CHECK (sede IN ('monteria', 'cartagena', 'apartado')),
    atencion_calificacion INTEGER NOT NULL CHECK (atencion_calificacion BETWEEN 1 AND 5),
    calidad_calificacion INTEGER NOT NULL CHECK (calidad_calificacion BETWEEN 1 AND 5),
    tiempo_calificacion INTEGER NOT NULL CHECK (tiempo_calificacion BETWEEN 1 AND 5),
    productos_calificacion INTEGER NOT NULL CHECK (productos_calificacion BETWEEN 1 AND 5),
    satisfaccion_general INTEGER NOT NULL CHECK (satisfaccion_general BETWEEN 1 AND 5),
    recomendacion_puntuacion INTEGER NOT NULL CHECK (recomendacion_puntuacion BETWEEN 0 AND 10),
    comentarios TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_encuestas_email ON encuestas(email);
CREATE INDEX idx_encuestas_sede ON encuestas(sede);
CREATE INDEX idx_encuestas_fecha ON encuestas(fecha_creacion);
```

---

## Tabla: PQR (Peticiones, Quejas y Reclamos)

Esta tabla almacenará todas las solicitudes PQR de los usuarios.

### Estructura de la tabla `pqr`

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | SERIAL BIGINT | Identificador único del PQR | Sí |
| tipo_solicitud | VARCHAR(20) | Tipo de solicitud (peticion, queja, reclamo, sugerencia, felicitacion) | Sí |
| nombre_completo | VARCHAR(255) | Nombre completo del solicitante | Sí |
| email | VARCHAR(255) | Correo electrónico del solicitante | Sí |
| telefono | VARCHAR(20) | Teléfono de contacto | Sí |
| ciudad | VARCHAR(50) | Ciudad del solicitante | Sí |
| asunto | VARCHAR(255) | Asunto de la solicitud | Sí |
| mensaje | TEXT | Descripción detallada de la solicitud | Sí |
| archivo_adjunto | VARCHAR(500) | Ruta del archivo adjunto (si existe) | No |
| estado | VARCHAR(20) | Estado de la solicitud (recibido, en_proceso, respondido, cerrado) | Sí |
| prioridad | VARCHAR(10) | Nivel de prioridad (baja, media, alta, urgente) | Sí |
| fecha_creacion | TIMESTAMP | Fecha y hora de creación del registro | Sí |
| fecha_actualizacion | TIMESTAMP | Fecha y hora de última actualización | Sí |
| fecha_respuesta | TIMESTAMP | Fecha y hora de respuesta | No |
| respuesta | TEXT | Respuesta proporcionada al solicitante | No |
| radicado | VARCHAR(20) | Número de radicado único | Sí |
| ip_address | INET | Dirección IP del usuario | No |
| user_agent | TEXT | Navegador del usuario | No |
| id_usuario_asignado | BIGINT | ID del usuario que atiende el caso | No |

### SQL para crear la tabla

```sql
CREATE TABLE pqr (
    id SERIAL BIGINT PRIMARY KEY,
    tipo_solicitud VARCHAR(20) NOT NULL CHECK (tipo_solicitud IN ('peticion', 'queja', 'reclamo', 'sugerencia', 'felicitacion')),
    nombre_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    ciudad VARCHAR(50) NOT NULL CHECK (ciudad IN ('monteria', 'cartagena', 'apartado', 'otra')),
    asunto VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    archivo_adjunto VARCHAR(500),
    estado VARCHAR(20) NOT NULL DEFAULT 'recibido' CHECK (estado IN ('recibido', 'en_proceso', 'respondido', 'cerrado')),
    prioridad VARCHAR(10) NOT NULL DEFAULT 'media' CHECK (prioridad IN ('baja', 'media', 'alta', 'urgente')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP,
    respuesta TEXT,
    radicado VARCHAR(20) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    id_usuario_asignado BIGINT
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_pqr_email ON pqr(email);
CREATE INDEX idx_pqr_estado ON pqr(estado);
CREATE INDEX idx_pqr_tipo ON pqr(tipo_solicitud);
CREATE INDEX idx_pqr_fecha ON pqr(fecha_creacion);
CREATE INDEX idx_pqr_radicado ON pqr(radicado);

-- Trigger para actualizar fecha_actualización automáticamente
CREATE OR REPLACE FUNCTION actualizar_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_fecha_actualizacion
    BEFORE UPDATE ON pqr
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_fecha_actualizacion();
```

---

## Tabla: Seguimiento PQR

Esta tabla almacenará el historial de cambios y seguimientos de cada PQR.

### Estructura de la tabla `pqr_seguimiento`

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | SERIAL BIGINT | Identificador único del seguimiento | Sí |
| id_pqr | BIGINT | ID del PQR relacionado | Sí |
| tipo_accion | VARCHAR(50) | Tipo de acción (creacion, actualizacion, respuesta, cambio_estado) | Sí |
| descripcion | TEXT | Descripción de la acción realizada | Sí |
| id_usuario | BIGINT | ID del usuario que realiza la acción | Sí |
| fecha_accion | TIMESTAMP | Fecha y hora de la acción | Sí |
| observaciones | TEXT | Observaciones adicionales | No |

### SQL para crear la tabla

```sql
CREATE TABLE pqr_seguimiento (
    id SERIAL BIGINT PRIMARY KEY,
    id_pqr BIGINT NOT NULL REFERENCES pqr(id) ON DELETE CASCADE,
    tipo_accion VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    id_usuario BIGINT,
    fecha_accion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_pqr_seguimiento_id_pqr ON pqr_seguimiento(id_pqr);
CREATE INDEX idx_pqr_seguimiento_fecha ON pqr_seguimiento(fecha_accion);
```

---

## Consideraciones Adicionales

### 1. Seguridad
- Implementar validación de datos en el backend
- Sanitizar todas las entradas de usuario
- Utilizar consultas parametrizadas para prevenir SQL Injection
- Implementar rate limiting para evitar spam

### 2. Almacenamiento de Archivos
- Para los archivos adjuntos del PQR, se recomienda:
  - Almacenar en un servicio como AWS S3 o similar
  - Generar nombres de archivo únicos
  - Validar tipo y tamaño de archivo
  - Escanear en busca de malware

### 3. Notificaciones
- Configurar sistema de notificaciones por email:
  - Confirmación de recepción de PQR
  - Notificación de respuesta
  - Recordatorios para encuestas

### 4. Backup y Recuperación
- Implementar estrategia de backup regular
- Configurar replicación para alta disponibilidad
- Documentar procedimientos de recuperación

### 5. API Endpoints Sugeridos

#### Para Encuestas
- `POST /api/encuestas` - Crear nueva encuesta
- `GET /api/encuestas` - Listar encuestas (con paginación)
- `GET /api/encuestas/:id` - Obtener encuesta específica
- `GET /api/encuestas/estadisticas` - Obtener estadísticas

#### Para PQR
- `POST /api/pqr` - Crear nuevo PQR
- `GET /api/pqr` - Listar PQRs (con filtros)
- `GET /api/pqr/:id` - Obtener PQR específico
- `PUT /api/pqr/:id` - Actualizar PQR
- `POST /api/pqr/:id/seguimiento` - Agregar seguimiento
- `GET /api/pqr/:radicado` - Buscar por número de radicado

### 6. Variables de Entorno Sugeridas
```
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=teamservicecosta
DB_USER=postgres
DB_PASSWORD=password

# Storage
STORAGE_TYPE=s3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=teamservicecosta-files
AWS_REGION=us-east-1

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

---

## Notas de Implementación

1. **Validación de Email**: Implementar verificación de formato de email y opcionalmente verificación de dominio
2. **Generación de Radicado**: Crear formato único como: PQR-YYYYMMDD-XXXX donde XXXX es un consecutivo
3. **Rate Limiting**: Implementar límite de solicitudes por IP para evitar spam
4. **CORS**: Configurar adecuadamente para permitir solo dominios autorizados
5. **Logging**: Implementar sistema de logs para auditoría y debugging
6. **Métricas**: Configurar sistema de métricas para monitorear el rendimiento y uso del sistema