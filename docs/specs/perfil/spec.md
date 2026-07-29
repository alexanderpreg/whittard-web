# My Account - Profile & Address

## UI Specification

Version: 1.0

Status: Draft

---

# Objetivo

Implementar las vistas del módulo **Mi Cuenta** siguiendo el diseño aprobado.

En esta primera versión se implementarán dos pantallas:

- Mis Datos
- Dirección

Ambas comparten exactamente el mismo layout y únicamente cambia el contenido del panel principal.

Toda la implementación utilizará Mock Data durante la fase de desarrollo y deberá quedar preparada para consumir la API posteriormente.

---

# Layout General

La página está compuesta por dos columnas.

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumb                                                                │
├──────────────────────┬─────────────────────────────────────────────────────┤
│                      │                                                     │
│ Sidebar              │ Content                                             │
│                      │                                                     │
│                      │                                                     │
└──────────────────────┴─────────────────────────────────────────────────────┘
```

Desktop

```
Grid

3 columnas
Sidebar

9 columnas
Contenido
```

Tablet

```
Sidebar

↓

Contenido
```

Mobile

```
Sidebar

↓

Contenido
```

---

# Estructura

```
MyAccountPage

├── Breadcrumb
│
├── MyAccountLayout
│
│   ├── Sidebar
│   │
│   │   ├── Navigation
│   │   ├── Support Links
│   │   └── Contact Card
│   │
│   └── Content
│
└── Footer
```

---

# Sidebar

El Sidebar debe ser reutilizable entre todas las páginas del módulo.

Contiene tres bloques.

## Navegación

Título

```
Mi Cuenta
```

Opciones

```
Mis Datos

Mis Órdenes

Dirección

Lista de Deseos

Cerrar Sesión
```

La opción correspondiente a la página actual debe mostrarse activa.

---

## Compra Segura

Mostrar enlaces informativos.

```
Preguntas Frecuentes

Delivery y Devoluciones

Políticas de Privacidad

Términos y Condiciones
```

---

## Contact Card

Mostrar una tarjeta informativa.

Debe contener

- título
- descripción
- horario
- correo

Es únicamente informativa.

---

# Content

El contenido cambia según la ruta.

Actualmente existen dos vistas.

```
Mis Datos

Dirección
```

---

# Vista

## Mis Datos

Cabecera

```
MIS DATOS

SOBRE MI CUENTA
```

Formulario

```
Nombre

Apellidos

Correo

Teléfono

Tipo Documento

Número Documento
```

Botón

```
Agregar
```

---

# Vista

## Dirección

Cabecera

```
Dirección

DELIVERY A TU LUGAR
```

Formulario

```
Dirección

Número

Departamento

Provincia

Distrito

Referencia
```

Botón

```
Agregar
```

---

# Componentes

```
Breadcrumb

MyAccountLayout

Sidebar

SidebarNavigation

SidebarSupport

SidebarContactCard

PageHeader

FormSection

TextInput

Select

Textarea

PrimaryButton
```

Todos los componentes deben ser independientes.

---

# Grid del Formulario

## Mis Datos

```
Nombre Completo          (100%)

Apellidos                (100%)

Correo                   (50%)

Teléfono                 (50%)

Tipo Documento           (50%)

Número Documento         (50%)
```

---

## Dirección

```
Dirección                (75%)

Número                   (25%)

Departamento             (33%)

Provincia                (33%)

Distrito                 (33%)

Referencia               (100%)
```

---

# Responsive

Desktop

Mantener distribución de columnas.

Tablet

Sidebar arriba.

Formulario debajo.

Mobile

Todo en una sola columna.

Todos los inputs deben ocupar el 100%.

---

# Estados

## Loading

Mostrar skeletons.

---

## Empty

Todos los campos vacíos.

---

## Editing

Mostrar la información del usuario.

---

## Saving

Deshabilitar botón.

Mostrar loading.

---

# Mock Data

Durante esta fase toda la información será obtenida desde

```
accountMock
```

No utilizar valores hardcodeados dentro de los componentes.

---

# Validaciones

## Mis Datos

Nombre

Obligatorio.

Apellidos

Obligatorio.

Correo

Formato válido.

Teléfono

Obligatorio.

Tipo Documento

Obligatorio.

Número Documento

Obligatorio.

---

## Dirección

Dirección

Obligatoria.

Número

Obligatorio.

Departamento

Obligatorio.

Provincia

Obligatoria.

Distrito

Obligatorio.

Referencia

Opcional.

---

# Integración Backend

Actualmente

```
Mock Data

↓

Components
```

Posteriormente

```
API

↓

useAccount()

↓

Components
```

Los componentes nunca deben depender del origen de datos.

Únicamente reciben props.

---

# Acceptance Criteria

✓ Coincide visualmente con el diseño aprobado.

✓ Sidebar reutilizable.

✓ Layout reutilizable.

✓ Formularios reutilizables.

✓ Responsive.

✓ Componentes desacoplados.

✓ Mock Data preparado para sustituirse por API.

✓ Sin lógica acoplada al origen de datos.
