---

## 🔀 Variantes vs. Especificaciones

Para evitar confusiones en el diseño y en los tipos de datos:

* **Variantes (`VariantSelector`):** Opciones interactivas que el usuario selecciona antes de comprar (Peso, Molienda, Sabor). Cambian el precio, el stock o la imagen. Viven en **`ProductInfo` (Hero)**.
* **Especificaciones (`ProductSpecifications`):** Información técnica de solo lectura (Material, Dimensiones, Cuidados, Capacidad). No cambian el precio ni son interactivas. Viven en la **sección inferior (Accordion/Pestañas)**.

### Reglas para `VariantSelector`:
- **Defensivo:** Si `product.variantGroups` es `undefined` o `[]`, `VariantSelector` **debe retornar `null`** sin dejar espacios en blanco.
- **Soporte de Layouts por tipo:**
  - `pills`: Botones horizontales compactos con badges (ej. Peso: 125g, 250g, 500g [-10%]).
  - `icon-grid`: Botones tipo tarjeta con ícono + texto (ej. Molienda: Grano, Cafetera, Espresso).
  - `vertical-list`: Lista vertical de ancho completo con título de sabor y precio individual.

---

## 🏷️ Badges y Etiquetas de Producto (`ProductAttributeBadges`)

Las etiquetas informativas (ej: _Teabags_, _Vegan Suitable_, _Vegetarian_, _Gift Messaging_, _Organic_) deben manejarse con un **enfoque híbrido**:

1. **Backend (API):** Retorna un array de strings/claves (slugs).
   ```json
   {
     "id": "prod-123",
     "title": "English Breakfast Tea",
     "tags": ["teabags", "vegan", "vegetarian", "gift_messaging"]
   }
   ```
