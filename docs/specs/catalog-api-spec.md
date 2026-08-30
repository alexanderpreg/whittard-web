# Spec de API — Catálogo y Detalle de Producto

## Objetivo

Este documento describe cómo el frontend (storefront) consume los datos del catálogo y del detalle de producto, para que el backend entienda la estructura que la maqueta espera y arme sus endpoints correctamente.

1. **Listado de catálogo** → `GET /products`
2. **Detalle de producto** → `GET /products/{slug}`

Ambos endpoints son **públicos** (no requieren autenticación, ni cookies ni tokens).

---

## Fuente de verdad: el backend manda

- **El backend es la fuente de verdad.** Solo envía lo que realmente tiene en su base de datos / CMS.
- **La maqueta es una guía visual**, no un contrato rígido. Los campos que aparecen en la maqueta son representativos: muestran _cómo_ se consume cada dato si el backend lo entrega.
- **El frontend es 100% defensivo:** si un campo no viene del backend, el frontend asume que no se envía y trabaja con lo que recibió. No lo renderiza, no inventa datos, no rompe.
- Por lo tanto, **ningún campo de la respuesta es obligatorio** desde la perspectiva del frontend. Este spec indica, para cada campo, cómo lo consume el frontend _si_ el backend lo envía.

> **Regla práctica:** si en la maqueta aparece un campo que el backend no tiene, el backend no lo envía y el frontend se queda con lo que el backend entregue. Lo que manda es el backend.

Los nombres de los campos usados en la respuesta **deben coincidir** con los tipos TypeScript del frontend (`camelCase`).

---

## Convenciones generales

| Regla               | Valor                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Base URL            | `{NEXT_PUBLIC_API_URL}`                                                                    |
| Formato             | `application/json`                                                                         |
| Autenticación       | Ninguna (público)                                                                          |
| Fuente de verdad    | El backend decide qué campos envía. El frontend es defensivo                               |
| Moneda              | Números decimales sin símbolo. El frontend formatea con `formatCurrency` (S/). Ej: `12.95` |
| Naming respuesta    | `camelCase` (idéntico a los tipos TS del frontend)                                         |
| Naming query params | `snake_case`                                                                               |

---

## Mapa de rutas

### Rutas del storefront (públicas) y su API

| Ruta del storefront                  | Página                    | Request que consume                                           |
| ------------------------------------ | ------------------------- | ------------------------------------------------------------- |
| `/catalogo/{category}`               | Listado de catálogo       | `GET /products?category={category}`                           |
| `/catalogo/{category}/{subcategory}` | Listado con subcategoría  | `GET /products?category={category}&subcategory={subcategory}` |
| `/producto/{slug}`                   | Detalle de producto (PDP) | `GET /products/{slug}`                                        |

### Categorías (primer segmento de la URL)

| Slug                  | Nombre                |
| --------------------- | --------------------- |
| `tea`                 | Té                    |
| `coffee`              | Coffee                |
| `hot-chocolate`       | Hot Chocolate         |
| `gifts`               | Gifts                 |
| `equipment`           | Equipment             |
| `biscuits-chocolates` | Biscuits & Chocolates |

### Subcategorías (segundo segmento de la URL → param `subcategory`)

Valores que envía el frontend según la categoría (provienen del menú de navegación):

| Categoría             | Subcategorías (`subcategory`)                                                                                                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tea`                 | `black-tea`, `green-tea`, `herbal-tea`, `limited-edition`, `classics`, `seasonal`, `gift-sets`, `starter-pack`                                                                                                             |
| `coffee`              | `specialty-coffee`, `ground-coffee`, `whole-bean`, `medium-roast`, `dark-roast`, `decaf`, `single-origin`, `house-blends`, `limited-coffee`, `coffee-gifts`                                                                |
| `hot-chocolate`       | `deluxe-hot-chocolate`, `classic-chocolate`, `white-chocolate`, `instant-chocolate`, `seasonal-flavours`, `marshmallows`, `chocolate-gifts`, `indulgent-classics`, `vegan-chocolate`, `luxury-chocolate`, `surprise-boxes` |
| `gifts`               | `all-gifts`, `gourmet-tea-sets`, `gift-starter-pack`, `coffee-gifts`, `new-arrivals`, `under-100`, `luxury-gifts`, `vegan-gifts`, `best-of-whittard`, `gift-baskets`, `wedding`, `corporate`                               |
| `equipment`           | `teapots`, `coffee-makers`, `grinders`, `kettles`, `espresso-accessories`, `serveware`, `travel-sets`, `home-barista`, `starter-kits`, `premium-selection`, `gift-tools`                                                   |
| `biscuits-chocolates` | `biscuits`, `chocolates`, `cookies`, `gift-boxes`, `for-tea`, `for-coffee`, `sharing-packs`, `biscuits-luxury`, `british-favourites`, `chocolate-selection`, `biscuit-assortment`                                          |

> El backend es libre de ignorar las subcategorías que no maneje: si una URL trae `/catalogo/tea/black-tea` y el backend no distingue subcategorías, puede responder lo mismo que `category=tea`. El frontend se adapta a lo que llegue.

---

## Endpoint 1 — Listado de catálogo

### `GET /products`

Devuelve los productos de una categoría (o subcategoría) con filtros, ordenamiento y paginación aplicados en el **backend**.

### Query params

Estos son los parámetros que el frontend **envía** según la interacción del usuario. El backend es libre de ignorar los que no maneje; solo debe devolver los productos que realmente pueda filtrar. Todos son opcionales: el frontend los envía solo cuando el usuario interactúa con la categoría, los filtros o el ordenamiento.

| Parámetro      | Tipo                  | Uso                                 | Descripción                                                                                                          |
| -------------- | --------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `category`     | `string`              | Cuando se navega a una categoría    | Slug de la categoría. Valores válidos: `tea`, `coffee`, `hot-chocolate`, `gifts`, `equipment`, `biscuits-chocolates` |
| `subcategory`  | `string`              | Cuando se navega a una subcategoría | Slug de la subcategoría. Filtra por un subnivel dentro de la categoría. Ej: `black-tea`                              |
| `type`         | `string[]` (repetido) | Cuando se selecciona el filtro      | Facet tipo. Ej: `?type=black&type=green`. `OR` entre valores                                                         |
| `presentation` | `string[]` (repetido) | Cuando se selecciona el filtro      | Facet presentación. Ej: `?presentation=tea-bags&presentation=loose-tea-caddy`                                        |
| `origin`       | `string[]` (repetido) | Cuando se selecciona el filtro      | Facet origen                                                                                                         |
| `nutrition`    | `string[]` (repetido) | Cuando se selecciona el filtro      | Facet nutricional                                                                                                    |
| `flavor`       | `string[]` (repetido) | Cuando se selecciona el filtro      | Facet sabor                                                                                                          |
| `max_price`    | `number`              | Cuando se mueve el slider           | Precio máximo (usa el **precio efectivo**: `promoPrice` si existe, si no `price`)                                    |
| `sort`         | `string`              | Cuando se cambia el orden           | `relevance` (default), `price-asc`, `price-desc`, `rating-desc`                                                      |
| `page`         | `number`              | En paginación                       | Número de página. Default `1`                                                                                        |
| `per_page`     | `number`              | En paginación                       | Ítems por página. Default `12`, máx `48`                                                                             |

**Reglas de filtrado**

- Cada facet es **multi-select** y usa lógica `OR` interno (si selecciono `type=black` y `type=green` trae productos que sean negro **o** verde).
- Entre facets distintas la lógica es `AND`.
- `max_price` compara contra el precio efectivo del producto.
- `subcategory` es **adicional** a `category` (subfiltro).

### Taxonomía de filtros (valores exactos)

Estos son los `value` que usa la maqueta para los query params `type`, `presentation`, `origin`, `nutrition` y `flavor`. El backend debe usar estos **mismos valores** en los query params y en el objeto `facets` de cada producto. Los `label` son los que muestra la UI; si el backend envía valores distintos, los renderiza igual (el frontend usa `label` del response cuando viene en `filters`).

**`type` — Tipo de producto**

| value      | label (maqueta)   | Ejemplo                              |
| ---------- | ----------------- | ------------------------------------ |
| `black`    | Negro             | Earl Grey Classic, English Breakfast |
| `flavored` | Saborizado        | Tés con saborizantes                 |
| `fruit`    | Infusión de fruta | Peach Infusion                       |
| `green`    | Verde             | Jasmine Green Tea                    |
| `herbal`   | Infusión herbal   | Chamomile & Honey, Mint Herbal Tea   |

**`presentation` — Presentación**

| value             | label           |
| ----------------- | --------------- |
| `loose-tea-caddy` | Loose Tea Caddy |
| `loose-tea-pouch` | Loose Tea Pouch |
| `tea-bags`        | Tea Bags        |

**`origin` — Origen**

| value     | label     |
| --------- | --------- |
| `british` | Británico |
| `china`   | China     |
| `europe`  | Europa    |
| `germany` | Alemania  |
| `india`   | India     |

**`nutrition` — Nutricional**

| value     | label    |
| --------- | -------- |
| `organic` | Orgánico |

> El backend puede agregar más valores (ej: `vegan`, `gluten_free`). El frontend los renderiza automáticamente si vienen en `filters`.

**`flavor` — Sabor**

| value    | label      |
| -------- | ---------- |
| `citrus` | Cítrico    |
| `fruity` | Frutado    |
| `malty`  | Malta      |
| `nutty`  | Nuez       |
| `sweet`  | Saborizado |
| `minty`  | Menta      |
| `floral` | Floral     |

### Ejemplo de request

```http
GET /products?category=tea&type=black&presentation=tea-bags&max_price=13&sort=rating-desc&page=1&per_page=12
```

### Ejemplo de respuesta — `200 OK`

```json
{
  "data": [
    {
      "productId": "tea-1",
      "variantId": "tea-1-a",
      "slug": "earl-grey-classic",
      "name": "Earl Grey Classic",
      "price": 12.95,
      "promoPrice": 9.95,
      "stock": 18,
      "image": "https://cdn.whittard.com/earl-grey-classic.jpg",
      "rating": 4.8,
      "category": "Té",
      "facets": {
        "type": ["black"],
        "presentation": ["loose-tea-caddy"],
        "origin": ["china"],
        "nutrition": ["organic"],
        "flavor": ["citrus"]
      }
    }
  ],
  "filters": {
    "price_range": { "min": 8, "max": 15 },
    "type": [
      { "value": "black", "label": "Negro", "count": 3 },
      { "value": "green", "label": "Verde", "count": 1 }
    ],
    "presentation": [
      { "value": "tea-bags", "label": "Tea Bags", "count": 2 },
      { "value": "loose-tea-caddy", "label": "Loose Tea Caddy", "count": 1 }
    ],
    "origin": [
      { "value": "china", "label": "China", "count": 2 },
      { "value": "india", "label": "India", "count": 1 }
    ],
    "nutrition": [{ "value": "organic", "label": "Orgánico", "count": 2 }],
    "flavor": [
      { "value": "citrus", "label": "Cítrico", "count": 2 },
      { "value": "malty", "label": "Malta", "count": 1 }
    ]
  },
  "meta": {
    "total": 42,
    "page": 1,
    "per_page": 12,
    "total_pages": 4,
    "category": { "slug": "tea", "label": "Té" },
    "subcategory": { "slug": "black-tea", "label": "Black Tea" }
  }
}
```

### Diccionario de campos — tarjeta de producto

Cada objeto dentro de `data` consume los siguientes campos **si el backend los envía**. Campo ausente = no se muestra (ej: sin `promoPrice` se muestra solo el precio, sin `rating` no se muestran estrellas).

| Campo        | Tipo             | Descripción                                                                                |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------ |
| `productId`  | `string`         | Identificador único del producto                                                           |
| `variantId`  | `string`         | ID de la **variante por defecto** (la primera). Se usa al agregar al carrito y a favoritos |
| `slug`       | `string`         | Slug para la ruta del detalle `/producto/{slug}`                                           |
| `name`       | `string`         | Nombre del producto                                                                        |
| `price`      | `number`         | Precio regular                                                                             |
| `promoPrice` | `number \| null` | Precio en oferta. `null` si no hay oferta                                                  |
| `stock`      | `number`         | Stock disponible. `0` = agotado. 1–5 = stock bajo                                          |
| `image`      | `string`         | URL de la imagen principal de la tarjeta                                                   |
| `rating`     | `number`         | Puntuación promedio (ej: `4.7`)                                                            |
| `category`   | `string`         | Nombre de la categoría (para breadcrumb)                                                   |
| `facets`     | `object`         | Ver abajo                                                                                  |

**`facets`** — campos que usa el frontend para filtrar. Si el backend no los envía (o envía `[]`), el producto no participa en ese filtro:

| Campo          | Tipo       |
| -------------- | ---------- |
| `type`         | `string[]` |
| `presentation` | `string[]` |
| `origin`       | `string[]` |
| `nutrition`    | `string[]` |
| `flavor`       | `string[]` |

### Diccionario de campos — metadata de filtros

El frontend renderiza el sidebar de filtros con los **valores disponibles y sus conteos** dentro de la categoría/filtros actuales. Cada grupo es un arreglo de:

```json
{ "value": "black", "label": "Negro", "count": 3 }
```

| Campo   | Tipo     | Descripción                         |
| ------- | -------- | ----------------------------------- |
| `value` | `string` | Valor que se envía como query param |
| `label` | `string` | Texto visible                       |
| `count` | `number` | Cantidad de productos que coinciden |

Grupos esperados: `type`, `presentation`, `origin`, `nutrition`, `flavor` y `price_range` (`{ min, max }`).

Si el backend no envía un grupo (ej: no hay `nutrition`), el frontend no renderiza ese bloque de filtros.

> **Nota:** `count` debe respetar los filtros seleccionados por el usuario (facet counts dinámicos), no solo el total de la categoría.

### Paginación

`meta` incluye `total`, `page`, `per_page`, `total_pages`. El frontend muestra "Mostrando X de Y" y "Página N de M". Si el backend no envía `meta`, el frontend degrada y omite ese texto.

### Caso vacío

Si no hay productos que coincidan, devolver `data: []` con `meta.total = 0` y los filtros con `count = 0`. **Nunca devolver 404** por falta de resultados (la UI muestra "No encontramos productos con esos filtros.").

---

## Endpoint 2 — Detalle de producto

### `GET /products/{slug}`

Devuelve la información completa de un producto para el PDP (`/producto/{slug}`).

### Ejemplo de respuesta — `200 OK`

```json
{
  "data": {
    "id": "tea-001",
    "slug": "earl-grey-classic",
    "name": "Earl Grey Classic",
    "tagline": "Un té negro aromatizado con aceite esencial de bergamota",
    "description": "Nuestro Earl Grey Classic es una combinación magistral de tés negros de Sri Lanka y China, aromatizados con aceite natural de bergamota de Calabria.",
    "price": 45.0,
    "promoPrice": 39.0,
    "images": [
      {
        "type": "image",
        "url": "https://cdn.whittard.com/earl-grey-1.jpg",
        "alt": "Earl Grey Classic - Vista frontal"
      },
      {
        "type": "image",
        "url": "https://cdn.whittard.com/earl-grey-2.jpg",
        "alt": "Earl Grey Classic - Detalle"
      }
    ],
    "rating": 4.7,
    "reviewCount": 128,
    "stock": 50,
    "sku": "TEA-EGC-001",
    "category": "Té Negro",
    "badges": ["más vendido"],
    "tags": ["organic", "vegan", "vegetarian", "gift_messaging"],
    "variantGroups": [
      {
        "id": "vg-weight",
        "name": "Peso",
        "type": "pills",
        "options": [
          {
            "id": "opt-001",
            "label": "50g",
            "sublabel": "1.76oz",
            "price": 45.0,
            "discountBadge": "-13%",
            "isAvailable": true
          },
          {
            "id": "opt-002",
            "label": "100g",
            "sublabel": "3.53oz",
            "price": 75.0,
            "isAvailable": true
          }
        ]
      }
    ],
    "related": [
      {
        "productId": "tea-2",
        "variantId": "tea-2-a",
        "slug": "english-breakfast",
        "name": "English Breakfast",
        "price": 12.95,
        "promoPrice": null,
        "stock": 14,
        "image": "https://cdn.whittard.com/english-breakfast.jpg",
        "rating": 4.7
      }
    ]
  }
}
```

### Diccionario de campos

Campos consumidos **si el backend los envía**. Campo ausente = el frontend no renderiza esa sección (ej: sin `variantGroups` no hay selector de variantes, sin `related` no hay carousel).

| Campo           | Tipo             | Descripción                                                                                                              |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `id`            | `string`         | ID del producto. Se usa como `productId` al agregar al carrito/favoritos                                                 |
| `slug`          | `string`         | Slug de la ruta                                                                                                          |
| `name`          | `string`         | Nombre                                                                                                                   |
| `tagline`       | `string`         | Frase corta (usada como meta description del PDP)                                                                        |
| `description`   | `string`         | Descripción larga                                                                                                        |
| `price`         | `number`         | Precio regular                                                                                                           |
| `promoPrice`    | `number \| null` | Precio de oferta. `null` sin oferta                                                                                      |
| `images`        | `Media[]`        | Galería. Ver `Media` abajo                                                                                               |
| `rating`        | `number`         | Puntuación promedio                                                                                                      |
| `reviewCount`   | `number`         | Cantidad de reseñas                                                                                                      |
| `stock`         | `number`         | Stock                                                                                                                    |
| `sku`           | `string`         | SKU interno                                                                                                              |
| `category`      | `string`         | Nombre de la categoría (breadcrumb)                                                                                      |
| `badges`        | `string[]`       | Etiquetas visibles. Ej: `"más vendido"`, `"nuevo"`, `"edición limitada"`, `"oferta"`, `"sin teína"`                      |
| `tags`          | `string[]`       | Opcional. Etiquetas técnicas (SEO/allergens). Ej: `"organic"`, `"vegan"`, `"gluten_free"`                                |
| `variantGroups` | `VariantGroup[]` | Opcional. **Si no existe o viene vacío, el producto es único/simple**                                                    |
| `related`       | `Card[]`         | Opcional. Productos para el carousel "También te puede gustar" (mismo shape que las tarjetas del catálogo, sin `facets`) |

**`Media`** — puede ser imagen o video:

```ts
type Media =
  | { type: 'image'; url: string; alt: string }
  | { type: 'video'; url: string; alt?: string };
```

**`VariantGroup`** — cada grupo de variantes:

| Campo     | Tipo              | Descripción                                                             |
| --------- | ----------------- | ----------------------------------------------------------------------- |
| `id`      | `string`          | ID del grupo                                                            |
| `name`    | `string`          | Título del grupo. Ej: `"Peso"`, `"Presentación"`                        |
| `type`    | `string`          | Render del selector. Valores: `pills` \| `icon-grid` \| `vertical-list` |
| `options` | `VariantOption[]` | Opciones del grupo                                                      |

**`VariantOption`**:

| Campo           | Tipo      | Descripción                                                      |
| --------------- | --------- | ---------------------------------------------------------------- |
| `id`            | `string`  | ID de la variante (se usa como `variantId` en carrito/favoritos) |
| `label`         | `string`  | Ej: `"50g"`                                                      |
| `sublabel`      | `string?` | Ej: `"1.76oz"`                                                   |
| `price`         | `number?` | Precio de la variante (si difiere del base)                      |
| `iconUrl`       | `string?` | Icono para `icon-grid`                                           |
| `discountBadge` | `string?` | Ej: `"-13%"`                                                     |
| `isAvailable`   | `boolean` | Si está disponible. `false` deshabilita la opción                |

### Variantes

- El selector de variantes es **100% dinámico y defensivo**: si `variantGroups` no viene o viene `[]`, no se renderiza selector (producto simple).
- Puede haber 1 o N grupos. Si el backend entrega `variantGroups` con estructura distinta, el frontend se adapta a lo que reciba.
- El `stock` del producto y el `price` de la variante seleccionada se actualizan según la opción elegida. Si el backend no expone stock/precio por variante, se usa el del producto.

### SEO

El frontend construye la metadata con `name` (title) y `tagline` (description). Si el backend no envía `tagline`, se omite la description. Si el backend entrega un bloque `seo` (title, description, ogImage), el frontend lo puede consumir. (Opcional.)

---

## Códigos de error

| Código | Cuándo                                              | Respuesta esperada                                        |
| ------ | --------------------------------------------------- | --------------------------------------------------------- |
| `400`  | Query params inválidos (ej: `sort=xyz`, `page=abc`) | `{ "message": "..." }`                                    |
| `404`  | `GET /products/{slug}` con slug inexistente         | `{ "message": "Product not found" }`                      |
| `422`  | `category` inválido o faltante en el listado        | `{ "message": "...", "errors": { "category": ["..."] } }` |
| `500`  | Error interno                                       | Mensaje genérico                                          |

**Reglas**

- Una búsqueda sin resultados **NO** es 404 → devuelve `200` con `data: []`.
- Un `category` desconocido en el listado **sí** es un error de validación (422) porque el frontend solo navega a categorías válidas.
- Todos los errores devuelven un objeto `{ "message": string }`.
- Si el backend no valida algún query param (ej: no soporta `sort`), simplemente lo ignora y devuelve el default. El frontend respeta lo que llegue.

---

## Resumen para el backend

1. `GET /products` → lista paginada con `data`, `filters` (conteos) y `meta` de paginación.
2. `GET /products/{slug}` → detalle con galería, variantes y relacionados.
3. Ambos son públicos, sin auth.
4. **El backend es la fuente de verdad:** solo envía lo que realmente tiene. La maqueta es solo la guía de consumo.
5. **El frontend es defensivo:** si un campo no viene, se omite y la UI sigue funcionando. No es necesario implementar campos que no existan en el backend.
6. Los nombres de los campos que sí se envíen deben ser `camelCase` e idénticos a los tipos del frontend (`ProductCardData`, `CatalogProduct`, `ProductDetail`, `VariantGroup`, `VariantOption`, `ProductMedia`).
7. Precio efectivo para filtros: `promoPrice ?? price`.
8. `null` (no `0`/`""`) cuando no hay oferta.
9. `variantGroups` ausente o vacío = producto simple.
