# Specification — Manejo de Variantes y Productos Únicos en el PDP

## Contexto y Objetivo

El storefront maneja un catálogo heterogéneo de productos:

1. **Productos Únicos / Simples:** Teteras, tazas, accesorios o paquetes cerrados que NO tienen opciones de selección.
2. **Productos con Variantes Simples o Complejas:** Cafés o tés con selecciones multidimensionales (Peso, Molienda/Presentación) o listas verticales de opciones (Sabores).

El objetivo es que el componente `ProductInfo` y su subcomponente `VariantSelector` sean **100% defensivos y dinámicos**. No se deben crear componentes de página distintos por tipo de producto.

---

## 1. Regla de Renderizado Defensivo (Productos Únicos)

Si un producto no tiene variantes (`variantGroups` es `undefined`, `null` o un array vacío `[]`):

- El componente `VariantSelector` **NO debe renderizarse** en el DOM (debe retornar `null`).
- El layout debe colapsar ese espacio de forma limpia, mostrando directamente:
  `Título` → `Precio` → `Descripción/Resumen` → `ProductActions (Cantidad + CTA)` → `ProductAttributesIcons` (si aplica).

❌ **Incorrecto:** Dejar espacios en blanco, renderizar contenedores vacíos o lanzar errores intentando iterar `.map()` sobre un array inexistente.

---

## 2. Tipos de Variantes y Diseños Soportados

Cuando `variantGroups` contenga datos, `VariantSelector` debe renderizar cada grupo según su propiedad `type`:

### Tipo A: `pills` (Grid de Botones / Tamaño o Peso)

- **Caso de uso:** Selección de peso (ej. `125g`, `250g`, `500g`, `1kg`).
- **Comportamiento:** Botones horizontales compactos.
- **Badges:** Debe soportar badges de descuento flotantes o integrados dentro de la opción (ej. `-10%`).

### Tipo B: `icon-grid` (Grid con Ícono y Texto / Molienda o Presentación)

- **Caso de uso:** Selección de tipo de preparación (ej. `Grano`, `Cafetera`, `Filtro`, `Espresso`, `Turco`).
- **Comportamiento:** Botones tipo tarjeta pequeña que incluyen un ícono vectorial/SVG en la parte superior y la etiqueta abajo.

### Tipo C: `vertical-list` (Lista de Opciones a Ancho Completo / Sabores o Variedades)

- **Caso de uso:** Selección de sabor o variedad en galletas/tés (ej. `Stem Ginger & Lemon`, `Salted Caramel`, `Triple Chocolate`).
- **Comportamiento:** Botones apilados verticalmente que ocupan el 100% del ancho del contenedor. Muestran el nombre de la variante y su precio individual correspondiente.

---

## 3. Modelo de Datos y Tipos (TypeScript)

Los mocks y la API deben alinearse a la siguiente interfaz flexible:

```typescript
export type VariantType = 'pills' | 'icon-grid' | 'vertical-list';

export interface VariantOption {
  id: string;
  label: string; // Ej: "250g", "Grano", "Salted Caramel"
  sublabel?: string; // Ej: "4.4oz"
  price?: number; // Precio específico si la variante altera el costo
  iconUrl?: string; // SVG / Imagen para 'icon-grid'
  discountBadge?: string; // Ej: "-10%"
  isAvailable: boolean; // Control de stock/deshabilitado
}

export interface VariantGroup {
  id: string;
  name: string; // Ej: "Peso", "Presentación", "Flavour"
  type: VariantType;
  options: VariantOption[];
}

// Dentro del tipo Product principal:
export interface Product {
  id: string;
  title: string;
  price: {
    current: number;
    min?: number;
    max?: number;
    currency: string;
  };
  // Propiedad OPCIONAL. Si no existe o viene vacía, el producto es ÚNICO / SIMPLE.
  variantGroups?: VariantGroup[];
}
```
