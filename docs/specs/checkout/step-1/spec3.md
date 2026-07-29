# 📋 RESUMEN TÉCNICO: REUTILIZACIÓN / ACTUALIZACIÓN DE ORDEN

## 🎯 Objetivo

Evitar la duplicación de pedidos en la Base de Datos cuando un usuario regresa del **Paso 2 (`/checkout/step-2`)** al **Paso 1 (`/checkout/step-1`)** para cambiar su método de pago o datos de envío.

---

## 🔄 Flujo de Datos & Persistencia

1. **Estado Inicial (`sessionStorage`):**
   - Se guarda el borrador del formulario.
   - Propiedad clave: `orderId` (inicia en `null`).

2. **Creación (Primera vez en Paso 1 ➔ Paso 2):**
   - **Trigger:** Click en `[ PAGAR ]`.
   - **Evaluación:** Si `orderId === null` ➔ Ejecuta `POST /api/orders`.
   - **Respuesta:** Devuelve `orderId: "ORD-1024"` y `status: "PENDING_PAYMENT"`.
   - **Acción:** Se guarda `orderId` en `sessionStorage` y redirige a `/checkout/step-2`.

3. **Retorno y Edición (Paso 2 ➔ Paso 1):**
   - El usuario presiona `[ ← Cambiar método de pago ]`.
   - Redirige a `/checkout/step-2` manteniendo `orderId: "ORD-1024"` en `sessionStorage`.

4. **Actualización (Re-confirmación en Paso 1 ➔ Paso 2):**
   - **Trigger:** Click en `[ PAGAR ]` tras editar.
   - **Evaluación:** Si `orderId !== null` ➔ Ejecuta `PATCH /api/orders/ORD-1024`.
   - **Backend:** Actualiza los campos modificados (`paymentMethod`, `address`, etc.) sobre el mismo registro en la BD.
   - **Acción:** Redirige nuevamente a `/checkout/step-2`.

---

## 🛠️ Endpoints Requeridos (Backend API)

| Método    | Endpoint          | Descripción                                     | Payload                                              |
| :-------- | :---------------- | :---------------------------------------------- | :--------------------------------------------------- |
| **POST**  | `/api/orders`     | Crea la orden en estado `PENDING_PAYMENT`.      | Datos de cliente, entrega, carrito y método de pago. |
| **PATCH** | `/api/orders/:id` | Actualiza la orden existente sin cambiar su ID. | Solo los campos que cambiaron (ej: `paymentMethod`). |

---

## 💡 Regla de Limpieza Final

Al completar el pago con éxito en el Paso 2 (Tarjeta aprobada o Voucher enviado) y redirigir a `/checkout/success`, se debe ejecutar **`clearCheckoutData()`** para limpiar el `sessionStorage` (borrando el `orderId`) y dejar el estado listo para futuras compras.
