# Guía de Integración de Métodos de Pago

Este documento explica cómo integrar los diferentes métodos de pago en Team Service Costa.

## Estado Actual

Actualmente, la página de checkout (`/comprar`) tiene la estructura UI completa para tres métodos de pago:
- ✅ **WhatsApp** - Completamente funcional
- ⚠️ **PSE** - Solo UI, sin integración backend
- ⚠️ **Tarjeta de Crédito** - Solo UI, sin integración backend

## 1. Integración de PSE (Pago Seguro en Línea)

PSE es el sistema de pagos electrónicos más utilizado en Colombia. Permite realizar pagos a través del portal transaccional de los bancos.

### Opciones de Proveedores

#### Opción A: ePayco (Recomendado)
**Ventajas:**
- Específico para Colombia
- Soporta PSE, tarjetas, efectivo
- Fácil integración
- Comisiones competitivas

**Pasos de integración:**

1. **Crear cuenta en ePayco**
   - Registrarse en https://epayco.co/
   - Completar verificación de negocio
   - Obtener credenciales API (Public Key y Private Key)

2. **Instalar SDK**
   ```bash
   npm install epayco-sdk-node
   ```

3. **Configurar variables de entorno** (`.env`)
   ```env
   EPAYCO_PUBLIC_KEY=your_public_key
   EPAYCO_PRIVATE_KEY=your_private_key
   EPAYCO_TEST_MODE=true  # Cambiar a false en producción
   ```

4. **Crear endpoint de servidor** (`src/pages/api/create-payment.ts`)
   ```typescript
   import type { APIRoute } from 'astro';
   import epayco from 'epayco-sdk-node';

   export const POST: APIRoute = async ({ request }) => {
     const data = await request.json();

     const epaycoClient = epayco({
       apiKey: import.meta.env.EPAYCO_PUBLIC_KEY,
       privateKey: import.meta.env.EPAYCO_PRIVATE_KEY,
       test: import.meta.env.EPAYCO_TEST_MODE === 'true'
     });

     try {
       const payment = await epaycoClient.checkout.create({
         name: "Pedido Team Service Costa",
         description: data.description,
         invoice: data.invoiceId,
         currency: "COP",
         amount: data.amount,
         tax_base: "0",
         tax: "0",
         country: "CO",
         lang: "es",

         // Datos del cliente
         external: "false",
         name_billing: data.customerName,
         email_billing: data.customerEmail,
         type_doc_billing: "CC",
         number_doc_billing: data.customerDocument,
         mobilephone_billing: data.customerPhone,
         address_billing: data.customerAddress,

         // URLs de respuesta
         response: `${import.meta.env.PUBLIC_SITE_URL}/payment-response`,
         confirmation: `${import.meta.env.PUBLIC_SITE_URL}/api/payment-confirmation`,

         // Método de pago
         methodsDisable: ["CARD", "CASH", "DP", "SP"]  // Solo PSE habilitado
       });

       return new Response(JSON.stringify({
         success: true,
         url: payment.url
       }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' }
       });
     } catch (error) {
       return new Response(JSON.stringify({
         success: false,
         error: error.message
       }), {
         status: 500,
         headers: { 'Content-Type': 'application/json' }
       });
     }
   };
   ```

5. **Actualizar el script del checkout** (en `comprar.astro`)
   ```javascript
   // En la función handlePSEPayment
   async function handlePSEPayment(formData) {
     try {
       const response = await fetch('/api/create-payment', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           amount: total,
           invoiceId: `TS-${Date.now()}`,
           description: `Pedido de ${cartItems.length} productos`,
           customerName: formData.get('name'),
           customerEmail: formData.get('email'),
           customerPhone: formData.get('phone'),
           customerDocument: formData.get('document'),
           customerAddress: formData.get('address')
         })
       });

       const data = await response.json();

       if (data.success) {
         // Redirigir a la pasarela de pago
         window.location.href = data.url;
       } else {
         showErrorMessage('Error al procesar el pago. Intenta nuevamente.');
       }
     } catch (error) {
       showErrorMessage('Error de conexión. Verifica tu internet.');
     }
   }
   ```

#### Opción B: PayU Latam
Alternativa similar con mayor presencia en Latinoamérica.

---

## 2. Integración de Tarjetas de Crédito

### Opción A: Stripe (Recomendado para internacional)

**Pasos:**

1. **Crear cuenta en Stripe**
   - Registrarse en https://stripe.com/
   - Completar verificación de negocio

2. **Instalar dependencias**
   ```bash
   npm install stripe @stripe/stripe-js
   ```

3. **Configurar variables**
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. **Crear endpoint** (`src/pages/api/create-payment-intent.ts`)
   ```typescript
   import type { APIRoute } from 'astro';
   import Stripe from 'stripe';

   const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

   export const POST: APIRoute = async ({ request }) => {
     const data = await request.json();

     try {
       const paymentIntent = await stripe.paymentIntents.create({
         amount: data.amount * 100, // Convertir a centavos
         currency: 'cop',
         metadata: {
           orderId: data.orderId,
           customerEmail: data.email
         }
       });

       return new Response(JSON.stringify({
         clientSecret: paymentIntent.client_secret
       }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' }
       });
     } catch (error) {
       return new Response(JSON.stringify({ error: error.message }), {
         status: 500
       });
     }
   };
   ```

### Opción B: Mercado Pago
Mejor para Colombia y Latinoamérica, soporta PSE también.

---

## 3. Guardar Pedidos en Base de Datos

Actualmente los pedidos no se guardan. Necesitas:

1. **Crear tabla en Supabase** (`ordenes`)
   ```sql
   CREATE TABLE ordenes (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     numero_orden TEXT UNIQUE NOT NULL,
     cliente_nombre TEXT NOT NULL,
     cliente_email TEXT NOT NULL,
     cliente_telefono TEXT NOT NULL,
     direccion_envio TEXT NOT NULL,
     ciudad TEXT NOT NULL,
     departamento TEXT NOT NULL,
     metodo_pago TEXT NOT NULL,
     metodo_envio TEXT NOT NULL,
     productos JSONB NOT NULL,
     subtotal DECIMAL(10, 2) NOT NULL,
     costo_envio DECIMAL(10, 2) NOT NULL,
     descuento DECIMAL(10, 2) DEFAULT 0,
     total DECIMAL(10, 2) NOT NULL,
     estado TEXT DEFAULT 'pendiente',
     estado_pago TEXT DEFAULT 'pendiente',
     notas TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. **Crear función para guardar pedido** (`src/lib/orders.ts`)
   ```typescript
   import { supabase } from './supabase';

   export async function createOrder(orderData) {
     const { data, error } = await supabase
       .from('ordenes')
       .insert([{
         numero_orden: `TS-${Date.now()}`,
         ...orderData
       }])
       .select()
       .single();

     if (error) throw error;
     return data;
   }

   export async function updateOrderStatus(orderId, status, paymentStatus) {
     const { data, error } = await supabase
       .from('ordenes')
       .update({
         estado: status,
         estado_pago: paymentStatus,
         updated_at: new Date().toISOString()
       })
       .eq('id', orderId)
       .select()
       .single();

     if (error) throw error;
     return data;
   }
   ```

---

## 4. Notificaciones por Email

Usar Resend o SendGrid para enviar emails de confirmación.

**Ejemplo con Resend:**

1. **Instalar**
   ```bash
   npm install resend
   ```

2. **Crear endpoint** (`src/pages/api/send-confirmation.ts`)
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(import.meta.env.RESEND_API_KEY);

   export async function sendOrderConfirmation(order) {
     await resend.emails.send({
       from: 'pedidos@teamservicecosta.com',
       to: order.cliente_email,
       subject: `Confirmación de Pedido ${order.numero_orden}`,
       html: `
         <h1>¡Gracias por tu pedido!</h1>
         <p>Tu pedido ${order.numero_orden} ha sido recibido.</p>
         <h2>Resumen:</h2>
         <ul>
           ${order.productos.map(p => `<li>${p.name} x${p.quantity} - $${p.price}</li>`).join('')}
         </ul>
         <p><strong>Total: $${order.total}</strong></p>
       `
     });
   }
   ```

---

## 5. Webhooks para Confirmación de Pago

Los proveedores de pago envían webhooks cuando el pago se confirma.

**Ejemplo endpoint webhook** (`src/pages/api/payment-webhook.ts`):

```typescript
import type { APIRoute } from 'astro';
import { updateOrderStatus } from '../../lib/orders';

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get('x-signature');
  const body = await request.text();

  // Verificar firma del webhook (específico del proveedor)
  if (!verifyWebhookSignature(signature, body)) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.type === 'payment.success') {
    await updateOrderStatus(
      event.orderId,
      'confirmado',
      'pagado'
    );

    // Enviar email de confirmación
    await sendOrderConfirmation(event.order);
  }

  return new Response('OK', { status: 200 });
};
```

---

## 6. Flujo Completo Recomendado

1. Usuario llena formulario de checkout
2. Selecciona método de pago (PSE/Tarjeta/WhatsApp)
3. Sistema crea pedido en base de datos con estado "pendiente"
4. Si es PSE/Tarjeta:
   - Se crea sesión de pago con proveedor
   - Usuario es redirigido a pasarela
   - Completa el pago
   - Proveedor envía webhook
   - Sistema actualiza estado del pedido
   - Se envía email de confirmación
5. Si es WhatsApp:
   - Se envía mensaje con detalles
   - Pedido queda en estado "pendiente_confirmacion"

---

## 7. Costos Aproximados

**ePayco PSE:**
- 3.49% + $900 COP por transacción exitosa

**Stripe:**
- 3.25% + $800 COP por transacción

**PayU:**
- 3.49% + IVA por transacción

**Mercado Pago:**
- 3.69% + IVA por transacción

---

## 8. Seguridad

- ✅ Nunca guardar datos de tarjetas en tu servidor
- ✅ Usar HTTPS en producción
- ✅ Validar webhooks con firmas
- ✅ Sanitizar inputs del usuario
- ✅ Implementar rate limiting en APIs
- ✅ Guardar logs de transacciones

---

## 9. Testing

Todos los proveedores ofrecen:
- Cuentas de prueba (sandbox/test mode)
- Números de tarjeta de prueba
- Bancos de prueba para PSE

**Tarjetas de prueba Stripe:**
- Éxito: `4242 4242 4242 4242`
- Rechazada: `4000 0000 0000 0002`

---

## Próximos Pasos

1. ✅ Decidir proveedor de pagos (Recomiendo: ePayco para PSE + Stripe para tarjetas)
2. ✅ Crear cuentas y obtener credenciales
3. ✅ Implementar tabla de órdenes en Supabase
4. ✅ Crear endpoints de API
5. ✅ Integrar frontend con backend
6. ✅ Implementar webhooks
7. ✅ Agregar envío de emails
8. ✅ Probar en modo sandbox
9. ✅ Activar en producción

---

## Recursos Útiles

- [Documentación ePayco](https://docs.epayco.co/)
- [Documentación Stripe](https://stripe.com/docs)
- [Documentación PayU](https://developers.payulatam.com/)
- [Documentación Mercado Pago](https://www.mercadopago.com.co/developers)
- [Supabase Docs](https://supabase.com/docs)

---

**Nota:** Este documento proporciona la arquitectura completa. La implementación real requiere tiempo de desarrollo y pruebas exhaustivas. Se recomienda comenzar con modo de prueba antes de activar pagos reales.
