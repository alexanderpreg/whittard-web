# Feature Specification — Product Detail Page (PDP)

## Objetivo

Implementar la Product Detail Page (PDP) del storefront de Whittard siguiendo la arquitectura basada en features del proyecto pensando en el futuro, mantenibilidad y escalabilidad.

La implementación debe ser completamente escalable para soportar múltiples tipos de producto sin duplicar layouts ni componentes.

El objetivo de esta tarea es únicamente la maquetación y arquitectura.
Toda la información provendrá inicialmente de mocks y posteriormente de la API sin modificar la estructura de componentes.

---

## Search Before Create

Antes de crear cualquier:

- componente
- hook
- helper
- util
- type
- constant
- service
- provider
- context

el agente debe buscar si ya existe una implementación equivalente.

Si existe una solución reutilizable, debe utilizarla o extenderla en lugar de crear una nueva.

Solo crear código nuevo cuando no exista una implementación adecuada dentro del proyecto.

# Arquitectura

La implementación debe respetar la arquitectura existente del proyecto.

```
src/
    app/
    modules/
    shared/
```

Toda la lógica del PDP pertenece al módulo:

```
src/modules/products/
```

No deben crearse componentes reutilizables dentro del módulo si pueden vivir en `shared`.

---

# Principios

## 1. Composición sobre duplicación

No crear un componente distinto para cada tipo de producto.

❌ Incorrecto

```
TeaProductPage
CoffeeProductPage
GiftPage
BundlePage
```

✅ Correcto

```
ProductDetailPage

    ProductHero

    ProductSectionRenderer
```

El layout siempre será el mismo.

Lo único que cambia son las secciones que renderiza.

---

## 2. Layout único

Todas las variantes utilizan el mismo layout base.

```
Container

Breadcrumb

Hero

Dynamic Sections

Related Products
```

Nunca duplicar layouts completos.

---

## 3. Renderizado por configuración

Las secciones del producto deben renderizarse dinámicamente.

Ejemplo:

```
sections

bundle

tabs

ingredients

explore

related
```

Cada sección representa un componente independiente.

No utilizar condicionales gigantes dentro del page.

---

## 4. Separación de responsabilidades

El Hero solamente muestra la información principal.

Las secciones inferiores son completamente independientes.

Ejemplo

Hero

↓

Bundle

↓

About

↓

Gift Contents

↓

Explore

↓

Related

Cada bloque debe poder agregarse, quitarse o cambiarse de orden sin modificar el layout principal.

---

# Reutilización

Antes de crear un componente nuevo revisar si ya existe uno reutilizable.

Los siguientes componentes NO deben recrearse.

- Container
- AppImage
- Button
- Carousel
- Product Card
- Tabs
- Accordion
- Badge
- Breadcrumb
- Section Title

Si alguno necesita una pequeña adaptación, extenderlo en lugar de duplicarlo.

---

# Componentes exclusivos del PDP

Estos componentes sí pertenecen al módulo products.

```
ProductHero

ProductGallery

ProductInfo

VariantSelector

BundleSection

GiftContentsSection

IngredientsSection

ProductSpecifications

ProductSectionRenderer
```

---

# Organización

```
products/

    components/

        hero/

        sections/

        layout/

    mocks/

    services/

    types/

    utils/
```

---

# Hero

El Hero debe dividirse en componentes pequeños.

```
ProductHero

    ProductGallery

    ProductInfo
```

ProductInfo contiene únicamente la información del producto.

```
Title

Price

Rating

Variant Selector

Quantity

CTA

Icons

Share
```

No concentrar toda la lógica en un único componente.

---

# Secciones

Cada sección debe ser autocontenida.

Ejemplo

```
BundleSection

AboutSection

GiftContentsSection

ExploreSection

RelatedProductsSection
```

Cada una recibe únicamente los datos que necesita.

No acceder directamente al objeto completo del producto.

---

# ProductSectionRenderer

Crear un componente encargado únicamente de renderizar las secciones.

Su responsabilidad es:

- recorrer las secciones
- seleccionar el componente adecuado
- renderizarlo

No debe contener lógica de negocio.

---

# Datos

Durante esta implementación toda la información provendrá de:

```
products/mocks/
```

No hardcodear datos dentro de componentes.

Todos los componentes reciben props.

Posteriormente solamente cambiará la fuente de datos hacia la API.

---

# Escalabilidad

La arquitectura debe permitir agregar una nueva sección sin modificar:

- ProductPage
- ProductLayout
- ProductHero

El único cambio esperado debería ser:

- crear el nuevo componente
- registrarlo en el renderer

---

# Server / Client Components

Usar Server Components por defecto.

Agregar `"use client"` únicamente cuando sea necesario.

Ejemplos:

Client

- Gallery
- Variant Selector
- Quantity Selector
- Accordion interactivo
- Tabs interactivos

Server

- Product Layout
- Bundle Section
- Explore Section
- Related Products
- Gift Contents

No convertir todo el árbol en Client Components.

---

# Responsabilidades

ProductPage

- obtiene datos
- renderiza ProductDetailPage

ProductDetailPage

- organiza el layout

ProductHero

- renderiza la cabecera

ProductSectionRenderer

- renderiza las secciones dinámicas

Cada sección

- renderiza únicamente su contenido

---

# Resultado esperado

La implementación debe permitir soportar todas las variantes del diseño (producto estándar, variantes, bundles, gift sets y productos con pestañas) utilizando un único layout y componentes altamente reutilizables, manteniendo la separación entre componentes compartidos (`shared`) y componentes específicos del dominio (`modules/products`).
