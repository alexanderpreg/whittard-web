# Category Navigation — Refactor

## Objetivo

Refactorizar el componente **Category Navigation** para que el Mega Menú se construya **únicamente a partir del árbol de categorías**.

No debe existir un módulo independiente de navegación, grupos o promociones.

La navegación debe representar directamente la estructura del catálogo.

---

# Tecnologías

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

---

# Arquitectura

```
Header
│
└── CategoryNavigation
      ├── Desktop
      │     ├── MegaMenuDesktop
      │     ├── MegaMenuColumn
      │     ├── MegaMenuCategoryCard
      │     └── MegaMenuLink
      │
      └── Mobile
            ├── MobileNavigation
            └── MobileAccordion
```

El componente `CategoryNavigation` únicamente obtiene las categorías y decide qué versión renderizar.

No debe contener lógica de negocio.

---

# Fuente de datos

Toda la información proviene del árbol de categorías.

No existen:

- Navigation Groups
- Navigation Items
- Promociones del Mega Menú

La API únicamente devuelve categorías.

---

# Modelo de datos

La navegación utiliza una jerarquía de tres niveles.

```
Categoría (Nivel 1)
│
├── Subcategoría (Nivel 2)
│     ├── Subcategoría (Nivel 3)
│     ├── Subcategoría (Nivel 3)
│     └── ...
│
├── Subcategoría (Nivel 2)
│     ├── Subcategoría (Nivel 3)
│     └── ...
│
└── Imagen de la categoría principal
```

---

# Contrato esperado de la API

```ts
interface Category {
  id: number;
  name: string;
  slug: string;

  image: string;

  shortDescription?: string;

  children?: Category[];
}
```

Ejemplo

```json
{
  "id": 1,
  "name": "Tea",
  "slug": "tea",
  "image": "/categories/tea.jpg",
  "shortDescription": "Discover our premium tea collection.",
  "children": [
    {
      "id": 10,
      "name": "Shop Tea",
      "slug": "shop-tea",
      "children": [
        {
          "id": 100,
          "name": "Loose Leaf Tea",
          "slug": "loose-leaf-tea"
        },
        {
          "id": 101,
          "name": "Tea Bags",
          "slug": "tea-bags"
        },
        {
          "id": 102,
          "name": "Matcha",
          "slug": "matcha"
        }
      ]
    },
    {
      "id": 20,
      "name": "Tea Type",
      "slug": "tea-type",
      "children": [
        {
          "id": 200,
          "name": "Black Tea",
          "slug": "black-tea"
        },
        {
          "id": 201,
          "name": "Green Tea",
          "slug": "green-tea"
        }
      ]
    }
  ]
}
```

---

# Comportamiento Desktop

Cada categoría principal del Navbar abre un Mega Menú.

El Mega Menú se genera automáticamente.

```
Categoría Principal

↓

Cada subcategoría (Nivel 2)

↓

Una columna

↓

Cada hijo (Nivel 3)

↓

Lista de enlaces
```

Ejemplo

```
---------------------------------------------------------------

Shop Tea        Tea Type        Tea Flavours          Tea

Ver todos       Ver todos       Ver todos

Loose Leaf      Black Tea       Citrus

Tea Bags        Green Tea       Floral

Matcha          White Tea       Fruity


                                         [ Imagen ]

                                           Tea

                              Discover our premium tea collection.

                                     Ver todos →

---------------------------------------------------------------
```

---

# Columnas

Cada subcategoría de segundo nivel representa automáticamente una columna.

Ejemplo

```
Tea

├── Shop Tea
├── Tea Type
├── Tea Flavours
```

Resultado

```
Columna 1

Shop Tea

----------------

Columna 2

Tea Type

----------------

Columna 3

Tea Flavours
```

No existe ninguna configuración adicional.

---

# Opción "Ver todos"

Cada columna debe mostrar la opción **Ver todos**.

Debe navegar únicamente a la categoría representada por la columna.

Ejemplo

```
Shop Tea

Ver todos

Loose Leaf Tea

Tea Bags

Matcha
```

Debe navegar a:

```
/catalogo/shop-tea
```

No debe aplicar filtros adicionales.

---

# Última columna

La última columna **no es una promoción**.

Debe representar la categoría principal actualmente seleccionada.

Debe reutilizar la información existente de la categoría.

Contenido

- Imagen
- Nombre
- Descripción corta (opcional)
- Botón "Ver todos"

Ejemplo

```
┌──────────────────────────────┐
│                              │
│          Imagen              │
│                              │
├──────────────────────────────┤
│ Tea                          │
│                              │
│ Discover our premium tea     │
│ collection.                  │
│                              │
│        Ver todos →           │
└──────────────────────────────┘
```

La imagen debe utilizar el campo

```
category.image
```

El botón debe navegar a

```
/catalogo/tea
```

---

# Mobile

En dispositivos móviles no debe existir la última columna.

La navegación únicamente muestra el árbol de categorías.

```
Tea

▼ Shop Tea

    Loose Leaf Tea

    Tea Bags

    Matcha

▼ Tea Type

    Black Tea

    Green Tea

▼ Tea Flavours

    Citrus

    Floral
```

No deben mostrarse imágenes.

---

# Comportamiento

## Apertura

El Mega Menú se abre al hacer hover o focus sobre una categoría del Navbar.

---

## Cambio de categoría

Al cambiar de categoría mediante hover, el contenido debe actualizarse inmediatamente.

No debe cerrarse el Mega Menú.

---

## Cierre

Debe cerrarse cuando

- el cursor abandone completamente el Navbar y el Mega Menú
- el usuario presione Escape
- el usuario haga click fuera del componente

---

# Componentes

```
CategoryNavigation
```

Responsabilidad

- Obtener las categorías.
- Controlar la categoría activa.
- Renderizar Desktop o Mobile.

---

```
MegaMenuDesktop
```

Responsabilidad

Renderizar el panel completo.

---

```
MegaMenuColumn
```

Responsabilidad

Renderizar una subcategoría (Nivel 2).

Cada instancia representa una columna.

---

```
MegaMenuLink
```

Responsabilidad

Renderizar un enlace de Nivel 3 utilizando `next/link`.

---

```
MegaMenuCategoryCard
```

Responsabilidad

Renderizar la última columna.

Debe mostrar:

- Imagen de la categoría principal.
- Nombre.
- Descripción opcional.
- Botón "Ver todos".

---

```
MobileNavigation
```

Responsabilidad

Renderizar el menú móvil utilizando `Sheet` y `Accordion` de shadcn/ui.

---

# Reglas

- No crear estructuras paralelas de navegación.
- No utilizar Navigation Groups.
- No utilizar Navigation Items.
- No duplicar información existente en el catálogo.
- Toda la navegación debe generarse desde el árbol de categorías.
- Cada subcategoría de segundo nivel representa automáticamente una columna del Mega Menú.
- Cada subcategoría de tercer nivel representa un enlace.
- La última columna debe reutilizar la información de la categoría principal.
- En dispositivos móviles no debe renderizarse la última columna.
- Todos los enlaces deben utilizar `next/link`.
- El componente debe ser completamente dinámico y no contener datos hardcodeados.
