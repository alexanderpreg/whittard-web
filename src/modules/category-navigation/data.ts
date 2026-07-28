import type { Category } from './types/category-navigation.types';

export const categoryNavigationData: Category[] = [
  {
    id: 1,
    name: 'Té',
    slug: 'tea',
    image:
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Descubre nuestra colección premium de tés.',
    groups: [
      {
        id: 11,
        name: 'Los más populares',
        slug: 'best-sellers',
        items: [
          { id: 111, name: 'Earl Grey Classic', slug: 'earl-grey-classic', image: '' },
          { id: 112, name: 'English Breakfast', slug: 'english-breakfast', image: '' },
          { id: 113, name: 'Jasmine Green Tea', slug: 'jasmine-green-tea', image: '' },
          { id: 114, name: 'Matcha Premium', slug: 'matcha-premium', image: '' },
        ],
      },
      {
        id: 12,
        name: 'Categorías',
        slug: 'categories',
        items: [
          { id: 121, name: 'Té Negro', slug: 'black-tea', image: '' },
          { id: 122, name: 'Té Verde', slug: 'green-tea', image: '' },
          { id: 123, name: 'Infusiones', slug: 'herbal-tea', image: '' },
          { id: 124, name: 'Edición Limitada', slug: 'limited-edition', image: '' },
        ],
      },
      {
        id: 13,
        name: 'Colecciones',
        slug: 'collections',
        items: [
          { id: 131, name: 'Clásicos', slug: 'classics', image: '' },
          { id: 132, name: 'Ediciones de Temporada', slug: 'seasonal', image: '' },
          { id: 133, name: 'Sets de Regalo', slug: 'gift-sets', image: '' },
          { id: 134, name: 'Pack Iniciación', slug: 'starter-pack', image: '' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Café',
    slug: 'coffee',
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Cafés de especialidad seleccionados de los mejores orígenes.',
    groups: [
      {
        id: 21,
        name: 'Los más populares',
        slug: 'best-sellers',
        items: [
          { id: 211, name: 'Colombia Supremo', slug: 'colombia-supremo', image: '' },
          { id: 212, name: 'Café de Especialidad', slug: 'specialty-coffee', image: '' },
          { id: 213, name: 'Café Molido', slug: 'ground-coffee', image: '' },
          { id: 214, name: 'Café en Grano', slug: 'whole-bean', image: '' },
        ],
      },
      {
        id: 22,
        name: 'Categorías',
        slug: 'categories',
        items: [
          { id: 221, name: 'Tueste Medio', slug: 'medium-roast', image: '' },
          { id: 222, name: 'Tueste Oscuro', slug: 'dark-roast', image: '' },
          { id: 223, name: 'Café Descafeinado', slug: 'decaf', image: '' },
          { id: 224, name: 'Origen Único', slug: 'single-origin', image: '' },
        ],
      },
      {
        id: 23,
        name: 'Colecciones',
        slug: 'collections',
        items: [
          { id: 231, name: 'Mezclas de la Casa', slug: 'house-blends', image: '' },
          { id: 232, name: 'Ediciones Limitadas', slug: 'limited-coffee', image: '' },
          { id: 233, name: 'Regalos de Café', slug: 'coffee-gifts', image: '' },
          { id: 234, name: 'Más Vendidos', slug: 'best-sellers', image: '' },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Chocolate Caliente',
    slug: 'hot-chocolate',
    image:
      'https://images.unsplash.com/photo-1549007994-cb92caebd54f?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Chocolates calientes artesanales para los momentos más dulces.',
    groups: [
      {
        id: 31,
        name: 'Los más populares',
        slug: 'best-sellers',
        items: [
          { id: 311, name: 'Chocolate Caliente Deluxe', slug: 'deluxe-hot-chocolate', image: '' },
          { id: 312, name: 'Chocolate Clásico', slug: 'classic-chocolate', image: '' },
          { id: 313, name: 'Chocolate Blanco', slug: 'white-chocolate', image: '' },
          { id: 314, name: 'Chocolate Instantáneo', slug: 'instant-chocolate', image: '' },
        ],
      },
      {
        id: 32,
        name: 'Descubre',
        slug: 'discover',
        items: [
          { id: 321, name: 'Sabores de Temporada', slug: 'seasonal-flavours', image: '' },
          { id: 322, name: 'Malvaviscos', slug: 'marshmallows', image: '' },
          { id: 323, name: 'Sets de Regalo', slug: 'chocolate-gifts', image: '' },
          { id: 324, name: 'Más Vendidos', slug: 'chocolate-bestsellers', image: '' },
        ],
      },
      {
        id: 33,
        name: 'Colecciones',
        slug: 'collections',
        items: [
          { id: 331, name: 'Clásicos Indulgentes', slug: 'indulgent-classics', image: '' },
          { id: 332, name: 'Opción Vegana', slug: 'vegan-chocolate', image: '' },
          { id: 333, name: 'Lujo', slug: 'luxury-chocolate', image: '' },
          { id: 334, name: 'Cajas Sorpresa', slug: 'surprise-boxes', image: '' },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Regalos',
    slug: 'gifts',
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd97?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Encuentra el regalo perfecto para cualquier ocasión.',
    groups: [
      {
        id: 41,
        name: 'Tipo de regalo',
        slug: 'gift-type',
        items: [
          { id: 411, name: 'Todos los Regalos', slug: 'all-gifts', image: '' },
          { id: 412, name: 'Sets de Té Gourmet', slug: 'gourmet-tea-sets', image: '' },
          { id: 413, name: 'Pack Iniciación', slug: 'gift-starter-pack', image: '' },
          { id: 414, name: 'Regalos de Café', slug: 'coffee-gifts', image: '' },
        ],
      },
      {
        id: 42,
        name: 'Para inspirarte',
        slug: 'inspiration',
        items: [
          { id: 421, name: 'Novedades', slug: 'new-arrivals', image: '' },
          { id: 422, name: 'Regalos bajo S/ 100', slug: 'under-100', image: '' },
          { id: 423, name: 'Regalos de Lujo', slug: 'luxury-gifts', image: '' },
          { id: 424, name: 'Regalos Veganos', slug: 'vegan-gifts', image: '' },
        ],
      },
      {
        id: 43,
        name: 'Colecciones',
        slug: 'collections',
        items: [
          { id: 431, name: 'Lo Mejor de Whittard', slug: 'best-of-whittard', image: '' },
          { id: 432, name: 'Cestas de Regalo', slug: 'gift-baskets', image: '' },
          { id: 433, name: 'Para Bodas', slug: 'wedding', image: '' },
          { id: 434, name: 'Para Empresas', slug: 'corporate', image: '' },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Equipo',
    slug: 'equipment',
    image:
      'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Todo lo necesario para preparar la bebida perfecta.',
    groups: [
      {
        id: 51,
        name: 'Equipos',
        slug: 'machines',
        items: [
          { id: 511, name: 'Teteras', slug: 'teapots', image: '' },
          { id: 512, name: 'Cafeteras', slug: 'coffee-makers', image: '' },
          { id: 513, name: 'Molinos', slug: 'grinders', image: '' },
          { id: 514, name: 'Hervidores', slug: 'kettles', image: '' },
        ],
      },
      {
        id: 52,
        name: 'Descubre',
        slug: 'discover',
        items: [
          { id: 521, name: 'Accesorios para Espresso', slug: 'espresso-accessories', image: '' },
          { id: 522, name: 'Juegos de Servicio', slug: 'serveware', image: '' },
          { id: 523, name: 'Sets de Viaje', slug: 'travel-sets', image: '' },
          { id: 524, name: 'Más Vendidos', slug: 'equipment-bestsellers', image: '' },
        ],
      },
      {
        id: 53,
        name: 'Colecciones',
        slug: 'collections',
        items: [
          { id: 531, name: 'Home Barista', slug: 'home-barista', image: '' },
          { id: 532, name: 'Kits de Iniciación', slug: 'starter-kits', image: '' },
          { id: 533, name: 'Selección Premium', slug: 'premium-selection', image: '' },
          { id: 534, name: 'Herramientas para Regalar', slug: 'gift-tools', image: '' },
        ],
      },
    ],
  },
  {
    id: 6,
    name: 'Galletas y Chocolates',
    slug: 'biscuits-chocolates',
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
    shortDescription: 'Dulces tentaciones para acompañar tus momentos favoritos.',
    groups: [
      {
        id: 61,
        name: 'Productos',
        slug: 'products',
        items: [
          { id: 611, name: 'Galletas', slug: 'biscuits', image: '' },
          { id: 612, name: 'Chocolates', slug: 'chocolates', image: '' },
          { id: 613, name: 'Cookies', slug: 'cookies', image: '' },
          { id: 614, name: 'Cajas de Regalo', slug: 'gift-boxes', image: '' },
        ],
      },
      {
        id: 62,
        name: 'Maridajes',
        slug: 'pairings',
        items: [
          { id: 621, name: 'Para Té', slug: 'for-tea', image: '' },
          { id: 622, name: 'Para Café', slug: 'for-coffee', image: '' },
          { id: 623, name: 'Packs para Compartir', slug: 'sharing-packs', image: '' },
          { id: 624, name: 'Novedades', slug: 'biscuits-new-arrivals', image: '' },
        ],
      },
      {
        id: 63,
        name: 'Colecciones',
        slug: 'collections',
        items: [
          { id: 631, name: 'Lujo', slug: 'biscuits-luxury', image: '' },
          { id: 632, name: 'Favoritos Británicos', slug: 'british-favourites', image: '' },
          { id: 633, name: 'Selección de Chocolates', slug: 'chocolate-selection', image: '' },
          { id: 634, name: 'Surtido de Galletas', slug: 'biscuit-assortment', image: '' },
        ],
      },
    ],
  },
];
