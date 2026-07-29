# 📋 ESPECIFICACIÓN TÉCNICA: CHECKOUT PASO 1 (DATOS CON SECCIONES/ACORDEONES)

> **Versión:** 1.1 (Alineada con Mockup UX/UI)  
> **Estado:** Aprobado  
> **Patrón UI:** Accordion-based / Card-based Single-Page Step (`(1) DATOS`)

---

## 💡 1. ACLARACIÓN DEL FLUJO Y ARQUITECTURA DE UI

### ¿Cómo se reconcilia el Stepper con los Acordeones?

En el diseño aprobado (Mockup):

1. **Stepper Superior (2 Pasos):**
   - **`(1) DATOS` (Paso Actual):** Agrupa en una sola pantalla todas las secciones mediante **Tarjetas / Acordeones Desplegables**.
   - **`(2) PAGO`:** Confirmación / Procesamiento final o redirección bancaria.

2. **Estructura Interna del Paso 1 (`(1) DATOS`):**
   No son pantallas independientes. Todo ocurre dentro de la misma pantalla `/checkout` usando contenedores colapsables / tarjetas:
   - 🔘 **Selector Delivery / Recojo** (Tabs superiores)
   - 📂 **Sección 1: Información Personal** (Card / Acordeón)
   - 📂 **Sección 2: Dirección** (Si es Delivery) OR **Info de Tienda** (Si es Recojo)
   - 📂 **Sección 3: Método de Pago** (Acordeón con Tarjeta / Transferencia / Yape-Plin)
   - 📂 **Sección 4: Información Adicional** (Textarea opcional)
   - 🛒 **Sidebar Derecho (Resumen de Compra - Sticky):** Siempre visible con el botón `PAGAR` / `Continuar`.

---

## 📐 2. DIAGRAMA DE COMPONENTES DE LA PANTALLA

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [ STEPPER: (1) DATOS (Activo)  ───────────────────────────  (2) PAGO ]       │
├───────────────────────────────────────────────┬──────────────────────────────┤
│  COLUMNA IZQUIERDA (8 Cols en Desktop)        │ COLUMNA DERECHA (4 Cols)     │
│                                               │                              │
│  ┌─────────────────────────────────────────┐  │ ┌──────────────────────────┐ │
│  │ 1. [ Delivery ]   [ Recojo en Tienda ]  │  │ │ RESUMEN DE COMPRA        │ │
│  └─────────────────────────────────────────┘  │ │                          │ │
│                                               │ │ • Item 1 ........ S/. 12 │ │
│  ┌─────────────────────────────────────────┐  │ │ • Item 2 ........ S/. 85 │ │
│  │ 2. 🗂️ Información Personal  [▲/▼]      │  │ │                          │ │
│  │    Inputs: Nombre, Apellidos, Correo... │  │ │ Subtotal:        S/. 97 │ │
│  └─────────────────────────────────────────┘  │ │ Delivery:        S/. 12 │ │
│                                               │ │ TOTAL:          S/. 109 │ │
│  ┌─────────────────────────────────────────┐  │ │                          │ │
│  │ 3. 🗂️ Dirección (O Tienda PickUp) [▲/▼] │  │ │ [ Logos Tarjetas ]       │ │
│  │    Inputs: Dep, Prov, Dist, Dirección   │  │ │                          │ │
│  └─────────────────────────────────────────┘  │ │  ┌────────────────────┐  │ │
│                                               │ │  │    Boton PAGAR     │  │ │
│  ┌─────────────────────────────────────────┐  │ │  └────────────────────┘  │ │
│  │ 4. 🗂️ Método de Pago (Accordion) [▲/▼]  │  │ └──────────────────────────┘ │
│  │    (o) Tarjeta Crédito/Débito           │  │                              │
│  │    ( ) Transferencia Bancaria           │  │                              │
│  │    ( ) Yape / Plin                      │  │                              │
│  └─────────────────────────────────────────┘  │                              │
│                                               │                              │
│  ┌─────────────────────────────────────────┐  │                              │
│  │ 5. 🗂️ Información Adicional (Notas)      │  │                              │
│  └─────────────────────────────────────────┘  │                              │
└───────────────────────────────────────────────┴──────────────────────────────┘
```

---

## 🔄 3. REGLAS DE NEGOCIO Y COMPORTAMIENTO DINÁMICO

### 3.1 Cambio entre Delivery y Recojo

- **Si el cliente elige `Delivery`:**
  - La sección **Dirección** se MUESTRA en formato Card/Acordeón con todos sus inputs activos.
  - En el Resumen, `Delivery = S/. 12.00` (o el valor calculado).
- **Si el cliente elige `Recojo`:**
  - La sección **Dirección** se OCULTA.
  - Aparece la tarjeta informativa estática con los datos de la tienda (`Whittard Larcomar`, dirección, horario).
  - En el Resumen, `Delivery = S/. 0.00` automáticamente.
  - **Importante (BR-004):** Si el cliente vuelve a seleccionar `Delivery`, los datos de dirección previamente ingresados NO deben borrarse.

### 3.2 Comportamiento de los Acordeones / Secciones

- Cada sección (`Información Personal`, `Dirección/Tienda`, `Método de Pago`, `Información Adicional`) se presenta como una tarjeta independiente.
- Las secciones pueden estar desplegadas por defecto o permitir colapsar/expandir al hacer clic en la cabecera.
- El acordeón de **Método de Pago** solo permite tener 1 método seleccionado activo a la vez (RadioGroup exclusivo).

---

## 💻 4. ESTADO GLOBAL DE LA PANTALLA (`CheckoutState`)

```typescript
export type DeliveryMethod = 'delivery' | 'pickup';
export type PaymentType = 'card' | 'transfer' | 'yape_plin';

export interface CheckoutState {
  deliveryMethod: DeliveryMethod;

  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    documentType: string;
    documentNumber: string;
    company?: string; // Opcional
  };

  address?: {
    department: string;
    province: string;
    district: string;
    address: string;
    reference?: string;
  };

  selectedStore?: {
    id: number;
    name: string;
    address: string;
    schedule: string;
  };

  payment: {
    method: PaymentType;
    cardDetails?: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    };
  };

  notes?: string;

  summary: {
    subtotal: number;
    delivery: number;
    discount: number;
    total: number;
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }>;
  };
}
```

---

## ✅ 5. CRITERIOS DE ACEPTACIÓN DE UI (Basados en la Imagen)

1. **Stepper:** Muestra únicamente 2 pasos (`1 DATOS` activo en azul/oscuro, `2 PAGO` inactivo).
2. **Tabs de Entrega:** Dos botones superiores toggleables (`Delivery` / `Recojo`).
3. **Puntaje de Secciones:** 4 o 5 tarjetas/bloques verticales independientes.
4. **Resumen Lateral:** Bloque flotante sticky a la derecha (4 columnas) con subtotal, costo de envío dinámico, total y botón principal de acción (`PAGAR`).
5. **Responsiveness:** En móvil y tablet las 2 columnas se apilan verticalmente (Formulario arriba, Resumen y botón abajo).
