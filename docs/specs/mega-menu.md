# Category Navigation

## Objetivo

Este módulo es responsable de toda la navegación principal del ecommerce.

No administra productos.

No administra búsqueda.

No administra filtros globales.

Únicamente permite navegar entre categorías mediante el Header.

---

# Responsabilidades

Este módulo debe proporcionar dos experiencias distintas.

- Desktop
- Mobile

Ambas utilizan exactamente la misma información proveniente del backend.

La diferencia únicamente es la representación visual.

```
CategoryNavigation
│
├── Desktop
│
└── Mobile
```

---

# Desktop

Desktop utiliza un Mega Menu.

Se abre mediante hover sobre una categoría principal.

Debe mostrar:

- categorías
- subcategorías
- sub-subcategorías
- promociones relacionadas

---

# Mobile

Mobile utiliza un menú tipo Accordion.

No existe Mega Menu.

Toda la interacción ocurre mediante click.

Debe implementarse utilizando Accordion de shadcn/ui.

---

# Jerarquía

El sistema trabaja con tres niveles.

Nivel 1

Categoría

Ejemplo

Tea

Coffee

Equipment

---

Nivel 2

Grupo de navegación

Ejemplo

Tea Type

Tea Flavours

Shop Tea

---

Nivel 3

Opciones del grupo

Ejemplo

Black Tea

Green Tea

White Tea

Matcha

---

# Ver todos

Cada grupo debe contener una opción "Ver todos".

Su comportamiento es navegar únicamente utilizando el filtro del nivel superior.

Ejemplo

Tea

↓

Ver todos

↓

/products?category=tea (aqui revisa el filtrado como lo hace?? ayudame porfa como seria???? revisa bien la ruta para donde va uu )

Nunca debe seleccionar filtros secundarios.

---

# Promociones

La última columna del Mega Menu corresponde a promociones.

No pertenece a la navegación.

Debe ser completamente dinámica.

Puede contener

- ninguna promoción
- una promoción
- dos promociones

Cada promoción contiene

- imagen desktop
- imagen mobile
- título
- enlace

Toda la tarjeta es clickeable.

Debe utilizar next/image y next/link.

Si no existen promociones, esta columna no debe renderizarse.

---

# URLs

Todos los enlaces terminan en

/products

La diferencia son los filtros.

Ejemplos

Categoría

/products?category=tea

Subcategoría

/products?category=tea&type=black-tea

Sub-subcategoría

/products?category=tea&type=black-tea&flavour=citrus

---

# Componentes sugeridos

Desktop

```
MegaMenuDesktop

├── MegaMenuColumn

├── MegaMenuGroup

├── MegaMenuLink

├── MegaMenuPromotionColumn

└── PromotionCard
```

Mobile

```
MobileNavigation

├── MobileAccordion

├── MobileGroup

└── MobileLink
```

Los componentes deben tener una única responsabilidad.

---

# shadcn/ui

Utilizar componentes de shadcn/ui cuando aporten valor.

Ejemplos

- Accordion
- ScrollArea
- Separator
- Card
- Skeleton
- AspectRatio

No modificar los componentes base.

Extenderlos mediante composición.

---

# Reglas

- No hardcodear categorías.
- No hardcodear columnas.
- No hardcodear promociones.
- Todo proviene de la API.
- No asumir un número fijo de columnas.
- No asumir un número fijo de promociones.
- Desktop y Mobile consumen exactamente los mismos datos.
- Mantener separada la lógica de negocio de la representación visual.

---

# Resultado esperado

El usuario debe poder navegar desde una categoría principal hasta cualquier sub-subcategoría en un máximo de dos interacciones, manteniendo una jerarquía clara, una experiencia consistente entre Desktop y Mobile y un Mega Menu completamente administrable desde el CMS.

CategoryNavigation/
│
├── AGENTS.md
│
├── CategoryNavigation.tsx
│
├── desktop/
│ ├── MegaMenuDesktop.tsx
│ ├── MegaMenuColumn.tsx
│ ├── MegaMenuPromotionColumn.tsx
│ └── PromotionCard.tsx
│
├── mobile/
│ ├── MobileNavigation.tsx
│ └── MobileAccordion.tsx
│
├── shared/
│ ├── NavigationLink.tsx
│ └── NavigationSeeAll.tsx
│
├── hooks/
│ └── useCategoryNavigation.ts
│
├── types/
│ └── category-navigation.types.ts
│
├── utils/
│ └── buildCategoryNavigationUrl.ts
│
└── CategoryNavigation.tsx
