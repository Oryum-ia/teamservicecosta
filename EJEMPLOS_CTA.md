# Ejemplos de Uso de CTAs

Esta guía muestra cómo usar los componentes de Call to Action en diferentes páginas del sitio.

## Componentes Disponibles

### 1. CTAButton - Botón Individual

Úsalo cuando necesites un botón CTA simple.

```astro
---
import CTAButton from '../components/CTAButton.astro';
---

<CTAButton
  text="Agenda tu Cita"
  href="https://wa.me/573205085531?text=Hola"
  icon="calendar"
  variant="primary"
  size="large"
/>
```

**Props disponibles:**
- `text` (string, requerido): Texto del botón
- `href` (string, opcional): URL del enlace
- `icon` (string, opcional): 'calendar' | 'diagnostic' | 'maintenance' | 'phone' | 'whatsapp' | 'shop'
- `variant` (string, opcional): 'primary' | 'secondary' | 'outline'
- `size` (string, opcional): 'small' | 'medium' | 'large'
- `openInNewTab` (boolean, opcional): Abrir en nueva pestaña

### 2. CTASection - Sección Completa

Úsalo para crear una sección destacada con CTA.

```astro
---
import CTASection from '../components/CTASection.astro';
---

<CTASection
  subtitle="SERVICIO TÉCNICO"
  title="¿Tu equipo necesita mantenimiento?"
  description="Agenda una cita con nuestros técnicos certificados."
  ctaText="Agenda Ahora"
  ctaHref="https://wa.me/573205085531"
  ctaIcon="calendar"
  variant="gradient"
/>
```

**Props disponibles:**
- `title` (string, requerido): Título principal
- `subtitle` (string, opcional): Subtítulo o badge
- `description` (string, requerido): Descripción del CTA
- `ctaText` (string, requerido): Texto del botón
- `ctaHref` (string, requerido): URL del enlace
- `ctaIcon` (string, opcional): Ícono del botón
- `variant` (string, opcional): 'default' | 'gradient' | 'dark'
- `imageUrl` (string, opcional): URL de imagen decorativa

---

## Ejemplos por Página

### Página de Servicios

```astro
---
import CTASection from '../components/CTASection.astro';
---

<CTASection
  subtitle="MANTENIMIENTO PREVENTIVO"
  title="Prolonga la vida de tu equipo"
  description="Programa mantenimientos periódicos y evita costosas reparaciones. Nuestros técnicos certificados KÄRCHER realizarán una revisión completa de tu hidrolavadora."
  ctaText="Cotizar Mantenimiento"
  ctaHref="https://wa.me/573205085531?text=Quiero%20cotizar%20un%20mantenimiento%20preventivo"
  ctaIcon="maintenance"
  variant="default"
/>
```

### Página de Productos (Tienda)

```astro
---
import CTAButton from '../components/CTAButton.astro';
---

<!-- En la parte inferior de cada producto -->
<div class="product-actions">
  <CTAButton
    text="Comprar Ahora"
    href="/comprar"
    icon="shop"
    variant="primary"
    size="medium"
  />
  <CTAButton
    text="Consultar por WhatsApp"
    href="https://wa.me/573205085531?text=Hola,%20me%20interesa%20este%20producto"
    icon="whatsapp"
    variant="outline"
    size="medium"
  />
</div>
```

### Página de Contacto

```astro
<CTASection
  subtitle="ATENCIÓN INMEDIATA"
  title="¿Necesitas ayuda urgente?"
  description="Nuestro equipo está disponible para atenderte. Llámanos o escríbenos por WhatsApp y te responderemos de inmediato."
  ctaText="Contactar por WhatsApp"
  ctaHref="https://wa.me/573205085531"
  ctaIcon="whatsapp"
  variant="gradient"
/>
```

### Página Quiénes Somos

```astro
<CTASection
  subtitle="ÚNETE A NUESTROS CLIENTES"
  title="Más de 500 empresas confían en nosotros"
  description="Somos el centro autorizado KÄRCHER con mayor experiencia en la región. Únete a las empresas que ya disfrutan de equipos de limpieza profesional con respaldo oficial."
  ctaText="Ver Productos"
  ctaHref="/tienda"
  ctaIcon="shop"
  variant="dark"
/>
```

### Página de PQR

```astro
<!-- Al final del formulario -->
<CTASection
  subtitle="ATENCIÓN RÁPIDA"
  title="¿Prefieres hablar con nosotros?"
  description="Si tu consulta es urgente o prefieres una atención personalizada, contáctanos directamente por WhatsApp o teléfono."
  ctaText="Contactar Ahora"
  ctaHref="https://wa.me/573205085531?text=Necesito%20atención%20para%20una%20consulta"
  ctaIcon="phone"
  variant="default"
/>
```

### Página de Blog/Artículo

```astro
<!-- Al final de cada artículo -->
<div class="article-cta">
  <h3>¿Te resultó útil este artículo?</h3>
  <p>Agenda un servicio técnico y mantén tu equipo en perfecto estado</p>
  <CTAButton
    text="Agendar Servicio"
    href="https://wa.me/573205085531?text=Quiero%20agendar%20un%20servicio%20técnico"
    icon="calendar"
    variant="primary"
    size="large"
  />
</div>
```

---

## Mejores Prácticas

### 1. Ubicación Estratégica

**✅ Bueno:**
- Después de contenido relevante
- En puntos de decisión del usuario
- Al final de secciones importantes

**❌ Evitar:**
- Demasiados CTAs en una página
- CTAs que interrumpan la lectura
- Múltiples CTAs compitiendo

### 2. Mensajes Claros

**✅ Bueno:**
- "Agenda tu Cita"
- "Solicita tu Diagnóstico"
- "Cotiza Ahora"

**❌ Evitar:**
- "Click aquí"
- "Más información"
- "Enviar"

### 3. Variantes Apropiadas

**Primary (Amarillo):** Acción principal más importante
```astro
<CTAButton variant="primary" text="Comprar Ahora" />
```

**Secondary (Azul oscuro):** Acción secundaria
```astro
<CTAButton variant="secondary" text="Saber Más" />
```

**Outline (Borde):** Acción terciaria o alternativa
```astro
<CTAButton variant="outline" text="Cancelar" />
```

### 4. Íconos Apropiados

- 📅 `calendar`: Agendar, reservar, programar
- 📋 `diagnostic`: Diagnóstico, evaluación, inspección
- �� `maintenance`: Mantenimiento, reparación, servicio
- 📞 `phone`: Llamar, contacto telefónico
- 💬 `whatsapp`: Chat, mensaje, WhatsApp
- 🛒 `shop`: Comprar, tienda, productos

### 5. URLs de WhatsApp

Formato correcto para mensajes predefinidos:

```javascript
https://wa.me/573205085531?text=Mensaje%20aquí
```

**Ejemplos:**
```astro
<!-- Agenda de cita -->
href="https://wa.me/573205085531?text=Hola,%20quiero%20agendar%20una%20cita%20para%20servicio%20técnico"

<!-- Cotización -->
href="https://wa.me/573205085531?text=Necesito%20cotizar%20un%20mantenimiento%20preventivo%20para%20mi%20hidrolavadora"

<!-- Diagnóstico -->
href="https://wa.me/573205085531?text=Hola,%20mi%20equipo%20KÄRCHER%20presenta%20problemas.%20Necesito%20un%20diagnóstico"

<!-- Producto específico -->
href="https://wa.me/573205085531?text=Me%20interesa%20la%20hidrolavadora%20K5"
```

**Nota:** Los espacios en URLs deben ser `%20`

---

## Variaciones de Diseño

### Con Imagen

```astro
<CTASection
  title="Visita Nuestras Sedes"
  description="Contamos con 3 sedes en Colombia para atenderte mejor."
  ctaText="Ver Ubicaciones"
  ctaHref="/contacto"
  ctaIcon="phone"
  variant="default"
  imageUrl="/images/sedes.jpg"
/>
```

### Sin Imagen (Centrado)

```astro
<CTASection
  subtitle="OFERTA ESPECIAL"
  title="20% de descuento en mantenimiento"
  description="Válido hasta fin de mes. No dejes pasar esta oportunidad."
  ctaText="Aprovechar Oferta"
  ctaHref="/tienda"
  ctaIcon="shop"
  variant="gradient"
/>
```

### Múltiples Botones

```astro
<div class="cta-group">
  <CTAButton
    text="Comprar en Tienda"
    href="/tienda"
    icon="shop"
    variant="primary"
    size="large"
  />
  <CTAButton
    text="Consultar por WhatsApp"
    href="https://wa.me/573205085531"
    icon="whatsapp"
    variant="outline"
    size="large"
  />
</div>

<style>
  .cta-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
```

---

## Testing de CTAs

### Checklist de Verificación

- [ ] El texto es claro y orientado a la acción
- [ ] El ícono es relevante
- [ ] El enlace funciona correctamente
- [ ] Es visible en mobile
- [ ] Los colores tienen buen contraste
- [ ] La animación es suave
- [ ] El mensaje de WhatsApp es apropiado
- [ ] No hay errores de ortografía

### Métricas a Monitorear

1. **Click-through Rate (CTR):** % de usuarios que hacen clic
2. **Conversión:** % que completan la acción deseada
3. **Ubicación óptima:** Prueba diferentes posiciones
4. **Texto efectivo:** A/B testing de mensajes

---

## Plantillas Predefinidas

### CTA de Urgencia

```astro
<CTASection
  subtitle="⚡ URGENTE"
  title="Servicio Técnico de Emergencia"
  description="¿Tu equipo dejó de funcionar? Te atendemos el mismo día. Llama ahora."
  ctaText="Llamar Ahora"
  ctaHref="tel:+573205085531"
  ctaIcon="phone"
  variant="gradient"
/>
```

### CTA de Confianza

```astro
<CTASection
  subtitle="✅ GARANTÍA OFICIAL"
  title="Centro Autorizado KÄRCHER"
  description="Repuestos originales, técnicos certificados y garantía en todos nuestros servicios."
  ctaText="Conocer Más"
  ctaHref="/quienes-somos"
  ctaIcon="diagnostic"
  variant="default"
/>
```

### CTA de Oferta

```astro
<CTASection
  subtitle="🎉 PROMOCIÓN LIMITADA"
  title="¡Envío Gratis en Compras Superiores a $500.000!"
  description="Aprovecha esta oferta exclusiva. Válida solo hasta fin de mes."
  ctaText="Ver Productos"
  ctaHref="/tienda"
  ctaIcon="shop"
  variant="dark"
/>
```

---

## Integración con Analytics

Para rastrear clics en CTAs:

```astro
<CTAButton
  text="Agendar Cita"
  href="https://wa.me/573205085531"
  icon="calendar"
  onclick="gtag('event', 'cta_click', {
    'cta_name': 'agendar_cita',
    'cta_location': 'home_hero'
  });"
/>
```

---

## Soporte

Si tienes dudas sobre cómo implementar un CTA específico, revisa los ejemplos en `src/pages/index.astro` donde se han implementado 3 CTAs diferentes.
