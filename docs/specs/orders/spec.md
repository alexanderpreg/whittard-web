# Feature Specification

# Order History

Version: 1.0

Status: Draft

Owner: Frontend Team

---

# 1. Objetivo

Implementar el módulo **Historial de Pedidos** dentro de **Mi Cuenta**.

El usuario debe poder visualizar el listado de pedidos realizados y expandir cualquiera de ellos para consultar su información detallada sin abandonar la página.

Durante esta fase la implementación utilizará datos mock. Posteriormente los datos serán obtenidos desde la API sin modificar la estructura de los componentes.

---

# 2. Objetivos

La funcionalidad debe permitir:

- Visualizar el historial de pedidos.
- Mostrar el estado actual de cada pedido.
- Expandir o contraer un pedido.
- Visualizar la información general del pedido.
- Visualizar los productos asociados.
- Mantener un diseño responsive.
- Preparar la vista para integración con Backend.

---

# 3. Layout

La vista reutiliza el layout del módulo **Mi Cuenta**.

```
┌──────────────────────────────────────────────────────────────────────┐
│ Breadcrumb                                                           │
├───────────────────────┬──────────────────────────────────────────────┤
│                       │                                              │
│ Sidebar               │ Order History                               │
│                       │                                              │
│                       │ Accordion                                   │
│                       │                                              │
│                       │ Accordion                                   │
│                       │                                              │
│                       │ Accordion                                   │
│                       │                                              │
└───────────────────────┴──────────────────────────────────────────────┘
```

---

# 4. Component Architecture

```
MyOrdersPage

├── Breadcrumb
│
├── MyAccountLayout
│
│   ├── AccountSidebar
│   │
│   └── OrdersSection
│
│       ├── OrdersHeader
│       │
│       ├── OrdersAccordion
│       │
│       │   ├── OrderCard
│       │   │
│       │   ├── OrderSummary
│       │   │
│       │   └── OrderDetail
│       │
│       └── EmptyState
│
└── Footer
```

Cada componente debe ser reutilizable e independiente.

---

# 5. Order List

El contenido principal muestra una colección de pedidos.

Cada pedido debe renderizarse como un Accordion.

Solo un pedido puede permanecer expandido al mismo tiempo.

---

# 6. Order Summary (Collapsed)

Cada item debe mostrar:

- Número de pedido
- Estado
- Fecha
- Tienda
- Total
- Icono para expandir

Ejemplo

```
Pedido #78997318177

16 Dic 2025

Tienda Larcomar

Total S/.450.00

Estado:
Pagado
```

---

# 7. Order Status

El estado debe mostrarse mediante un Badge.

Estados soportados

```
Pagado

Pendiente

Procesando

Enviado

Entregado

Cancelado
```

Cada estado tendrá un estilo visual independiente.

---

# 8. Order Detail (Expanded)

Al expandir un pedido deben mostrarse dos bloques.

## Información General

Debe incluir

- Número de pedido
- Fecha
- Método de pago
- Dirección de entrega
- Tienda (si corresponde)
- Estado

---

## Productos

Mostrar todos los productos pertenecientes al pedido.

Cada producto debe incluir:

- Imagen
- Nombre
- SKU
- Cantidad
- Precio unitario
- Total

Los productos deben renderizarse como una lista.

---

# 9. Accordion Behavior

Estado inicial

Todos los pedidos colapsados.

Al hacer click

- Expandir el pedido seleccionado.
- Colapsar cualquier otro pedido abierto.

Si el usuario vuelve a hacer click

- Colapsar el pedido.

---

# 10. Estados

## Loading

Mostrar Skeleton.

---

## Empty

Mostrar mensaje

```
No tienes pedidos registrados.
```

---

## Success

Mostrar listado.

---

## Error

Mostrar mensaje de error.

---

# 11. Responsive

Desktop

Sidebar + contenido.

Tablet

Sidebar arriba.

Contenido debajo.

Mobile

Una sola columna.

Los productos deben apilarse verticalmente.

---

# 12. Mock Data

Durante la fase de desarrollo toda la información utilizará un único objeto

```ts
ordersMock;
```

No utilizar valores hardcodeados dentro de los componentes.

---

# 13. Integración Backend

Actualmente

```
ordersMock

↓

OrdersAccordion
```

Posteriormente

```
GET /account/orders

↓

OrdersAccordion
```

Los componentes únicamente reciben props.

Nunca deben depender del origen de los datos.

---

# 14. Eventos

```
onToggleOrder()

onSelectOrder()
```

---

# 15. Reglas de Negocio

BR-001

Un pedido solo puede estar expandido una vez.

---

BR-002

Solo un Accordion abierto simultáneamente.

---

BR-003

Todos los montos deben mostrarse con formato monetario.

---

BR-004

El estado debe representarse mediante Badge.

---

BR-005

La lista de productos pertenece exclusivamente al pedido expandido.

---

BR-006

No realizar cálculos en el frontend.

Todos los importes deben provenir del Backend.

---

# 16. Acceptance Criteria

✓ Coincide con el diseño.

✓ Sidebar reutilizable.

✓ Accordion funcional.

✓ Responsive.

✓ Componentes desacoplados.

✓ Preparado para consumir API.

✓ Sin datos hardcodeados.

✓ Estados visuales implementados.

✓ Compatible con múltiples pedidos.

---

# 17. Out of Scope

No implementar:

- Recompra.
- Descarga de comprobante.
- Seguimiento del envío.
- Cancelación de pedido.
- Integración con Backend.
- Paginación.
- Filtros.
