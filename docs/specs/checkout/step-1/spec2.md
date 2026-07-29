# 📋 TECHNICAL SPECIFICATION: CHECKOUT STEP 2 (PAGO & CONFIRMACIÓN)

- **Spec ID:** `SPEC-CHK-002`
- **Version:** `1.1.0`
- **Status:** `APPROVED`
- **Owner:** Frontend Engineering Team
- **Target Route:** `/checkout/step-2`

---

## 📑 TABLE OF CONTENTS

1. [Overview & Scope](#1-overview--scope)
2. [Conditional Routing Logic](#2-conditional-routing-logic)
3. [View A: Credit / Debit Card Processing](#3-view-a-credit--debit-card-processing)
4. [View B: Transfer / QR Payment & Voucher Upload](#4-view-b-transfer--qr-payment--voucher-upload)
5. [Data Schemas & Verification](#5-data-schemas--verification)
6. [Acceptance Criteria (BDD / Gherkin)](#6-acceptance-criteria-bdd--gherkin)

---

## 1. OVERVIEW & SCOPE

### 1.1 Purpose

Especificar el comportamiento visual, la lógica de negocio y la interfaz del **Paso 2 (`/checkout/step-2`)**.

Esta pantalla recibe el estado recopilado en el Paso 1 (`paymentMethod`, datos del cliente, dirección/tienda y carrito) y ejecuta la acción correspondiente según el método de pago elegido:

1. **Tarjeta de Crédito / Débito:** Procesamiento y cobro de la transacción mediante pasarela de pago segura.
2. **Transferencia Bancaria o QR (Yape / Plin):** Presentación de cuentas bancarias/QRs, captura del código de operación y subida del comprobante de pago (voucher).

---

## 2. CONDITIONAL ROUTING LOGIC

El flujo de navegación y renderizado en `/checkout/step-2` se determina por el valor de `paymentMethod` enviado desde el Paso 1:

```text
                  ┌──────────────────────────────┐
                  │   Action: Click [PAGAR]      │
                  │   en Paso 1 (/checkout/step-1)│
                  └──────────────┬───────────────┘
                                 │
                   ¿Cuál es el paymentMethod?
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
┌─────────────────────────┐             ┌────────────────────────────────┐
│   'card' (Tarjeta)      │             │  'transfer' / 'yape_plin'      │
└────────┬────────────────┘             └────────────────┬───────────────┘
         │                                               │
         ▼                                               ▼
┌─────────────────────────┐             ┌────────────────────────────────┐
│ Muestra:                │             │ Muestra:                       │
│ Card Processing View    │             │ Vista de Cuentas, QRs y Voucher│
│ Realiza Cobro via API   │             │ Redirige a página/sección de   │
└────────┬────────────────┘             │ Transferencia y Subida         │
         │                              └────────────────┬───────────────┘
         ▼                                               ▼
┌─────────────────────────┐             ┌────────────────────────────────┐
│ Redirección:            │             │ Redirección:                   │
│ /checkout/success       │             │ /checkout/success              │
└─────────────────────────┘             └────────────────────────────────┘
```
