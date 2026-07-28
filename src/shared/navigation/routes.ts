import { Heart, MapPin, ShoppingBag, User } from 'lucide-react';

export const utilityNavigationItems = [
  { label: 'Favoritos', href: '/wishlist', icon: Heart, includeSubpath: false },
  { label: 'Tiendas', href: '/stores', icon: MapPin, includeSubpath: false },
  { label: 'Mi cuenta', href: '/account', icon: User, includeSubpath: true },
  { label: 'Carrito', href: '/carrito', icon: ShoppingBag, includeSubpath: false },
] as const;

export const categoryNavigationItems = [
  { label: 'Tea', href: '/catalogo/tea', includeSubpath: true },
  { label: 'Coffee', href: '/catalogo/coffee', includeSubpath: true },
  { label: 'Hot Chocolate', href: '/catalogo/hot-chocolate', includeSubpath: true },
  { label: 'Gifts', href: '/catalogo/gifts', includeSubpath: true },
  { label: 'Equipment', href: '/catalogo/equipment', includeSubpath: true },
  { label: 'Biscuits & Chocolates', href: '/catalogo/biscuits-chocolates', includeSubpath: true },
] as const;

export type MegamenuColumn = {
  title: string;
  items: Array<{
    label: string;
    href: string;
  }>;
};

export type MegamenuPromo = {
  href: string;
  imageSrc: string;
};

export type CategoryMegamenu = {
  href: string;
  columns: MegamenuColumn[];
  promos: MegamenuPromo[];
};

export const categoryMegamenus: Record<string, CategoryMegamenu> = {
  Tea: {
    href: '/catalogo/tea',
    columns: [
      {
        title: 'Los más populares',
        items: [
          { label: 'Earl Grey Classic', href: '/producto/earl-grey-classic' },
          { label: 'English Breakfast', href: '/producto/english-breakfast' },
          { label: 'Jasmine Green Tea', href: '/producto/jasmine-green-tea' },
          { label: 'Matcha Premium', href: '/producto/matcha-premium' },
        ],
      },
      {
        title: 'Categorías',
        items: [
          { label: 'Té Negro', href: '/catalogo/tea' },
          { label: 'Té Verde', href: '/catalogo/tea' },
          { label: 'Infusiones', href: '/catalogo/tea' },
          { label: 'Edición Limitada', href: '/catalogo/tea' },
        ],
      },
      {
        title: 'Colecciones',
        items: [
          { label: 'Clásicos', href: '/catalogo/tea' },
          { label: 'Ediciones de Temporada', href: '/catalogo/tea' },
          { label: 'Sets de Regalo', href: '/producto/set-te-gourmet' },
          { label: 'Pack Iniciación', href: '/producto/pack-iniciacion-te' },
        ],
      },
    ],
    promos: [
      {
        href: '/catalogo/tea',
        imageSrc:
          'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/catalogo/tea',
        imageSrc:
          'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  Coffee: {
    href: '/catalogo/coffee',
    columns: [
      {
        title: 'Los más populares',
        items: [
          { label: 'Colombia Supremo', href: '/producto/colombia-supremo' },
          { label: 'Café de Especialidad', href: '/catalogo/coffee' },
          { label: 'Café Molido', href: '/catalogo/coffee' },
          { label: 'Café en Grano', href: '/catalogo/coffee' },
        ],
      },
      {
        title: 'Categorías',
        items: [
          { label: 'Tueste Medio', href: '/catalogo/coffee' },
          { label: 'Tueste Oscuro', href: '/catalogo/coffee' },
          { label: 'Café Descafeinado', href: '/catalogo/coffee' },
          { label: 'Origen Único', href: '/catalogo/coffee' },
        ],
      },
      {
        title: 'Colecciones',
        items: [
          { label: 'Mezclas de la Casa', href: '/catalogo/coffee' },
          { label: 'Ediciones Limitadas', href: '/catalogo/coffee' },
          { label: 'Regalos de Café', href: '/catalogo/gifts' },
          { label: 'Más Vendidos', href: '/catalogo/coffee' },
        ],
      },
    ],
    promos: [
      {
        href: '/catalogo/coffee',
        imageSrc:
          'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/catalogo/coffee',
        imageSrc:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  'Hot Chocolate': {
    href: '/catalogo/hot-chocolate',
    columns: [
      {
        title: 'Los más populares',
        items: [
          { label: 'Chocolate Caliente Deluxe', href: '/producto/hot-chocolate-deluxe' },
          { label: 'Chocolate Clásico', href: '/catalogo/hot-chocolate' },
          { label: 'Chocolate Blanco', href: '/catalogo/hot-chocolate' },
          { label: 'Chocolate Instantáneo', href: '/catalogo/hot-chocolate' },
        ],
      },
      {
        title: 'Descubre',
        items: [
          { label: 'Sabores de Temporada', href: '/catalogo/hot-chocolate' },
          { label: 'Malvaviscos', href: '/catalogo/hot-chocolate' },
          { label: 'Sets de Regalo', href: '/catalogo/gifts' },
          { label: 'Más Vendidos', href: '/catalogo/hot-chocolate' },
        ],
      },
      {
        title: 'Colecciones',
        items: [
          { label: 'Clásicos Indulgentes', href: '/catalogo/hot-chocolate' },
          { label: 'Opción Vegana', href: '/catalogo/hot-chocolate' },
          { label: 'Lujo', href: '/catalogo/hot-chocolate' },
          { label: 'Cajas Sorpresa', href: '/catalogo/hot-chocolate' },
        ],
      },
    ],
    promos: [
      {
        href: '/catalogo/hot-chocolate',
        imageSrc:
          'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/catalogo/hot-chocolate',
        imageSrc:
          'https://images.unsplash.com/photo-1549007994-cb92caebd54f?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  Gifts: {
    href: '/catalogo/gifts',
    columns: [
      {
        title: 'Tipo de regalo',
        items: [
          { label: 'Todos los Regalos', href: '/catalogo/gifts' },
          { label: 'Sets de Té Gourmet', href: '/producto/set-te-gourmet' },
          { label: 'Pack Iniciación', href: '/producto/pack-iniciacion-te' },
          { label: 'Regalos de Café', href: '/catalogo/coffee' },
        ],
      },
      {
        title: 'Para inspirarte',
        items: [
          { label: 'Novedades', href: '/catalogo/gifts' },
          { label: 'Regalos bajo S/ 100', href: '/catalogo/gifts' },
          { label: 'Regalos de Lujo', href: '/catalogo/gifts' },
          { label: 'Regalos Veganos', href: '/catalogo/gifts' },
        ],
      },
      {
        title: 'Colecciones',
        items: [
          { label: 'Lo Mejor de Whittard', href: '/catalogo/gifts' },
          { label: 'Cestas de Regalo', href: '/catalogo/gifts' },
          { label: 'Para Bodas', href: '/catalogo/gifts' },
          { label: 'Para Empresas', href: '/catalogo/gifts' },
        ],
      },
    ],
    promos: [
      {
        href: '/catalogo/gifts',
        imageSrc:
          'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/catalogo/gifts',
        imageSrc:
          'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  Equipment: {
    href: '/catalogo/equipment',
    columns: [
      {
        title: 'Equipos',
        items: [
          { label: 'Teteras', href: '/catalogo/equipment' },
          { label: 'Cafeteras', href: '/catalogo/equipment' },
          { label: 'Molinos', href: '/catalogo/equipment' },
          { label: 'Hervidores', href: '/catalogo/equipment' },
        ],
      },
      {
        title: 'Descubre',
        items: [
          { label: 'Accesorios para Espresso', href: '/catalogo/equipment' },
          { label: 'Juegos de Servicio', href: '/catalogo/equipment' },
          { label: 'Sets de Viaje', href: '/catalogo/equipment' },
          { label: 'Más Vendidos', href: '/catalogo/equipment' },
        ],
      },
      {
        title: 'Colecciones',
        items: [
          { label: 'Home Barista', href: '/catalogo/equipment' },
          { label: 'Kits de Iniciación', href: '/catalogo/equipment' },
          { label: 'Selección Premium', href: '/catalogo/equipment' },
          { label: 'Herramientas para Regalar', href: '/catalogo/equipment' },
        ],
      },
    ],
    promos: [
      {
        href: '/catalogo/equipment',
        imageSrc:
          'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/catalogo/equipment',
        imageSrc:
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  'Biscuits & Chocolates': {
    href: '/catalogo/biscuits-chocolates',
    columns: [
      {
        title: 'Productos',
        items: [
          { label: 'Galletas', href: '/catalogo/biscuits-chocolates' },
          { label: 'Chocolates', href: '/catalogo/biscuits-chocolates' },
          { label: 'Cookies', href: '/catalogo/biscuits-chocolates' },
          { label: 'Cajas de Regalo', href: '/catalogo/gifts' },
        ],
      },
      {
        title: 'Maridajes',
        items: [
          { label: 'Para Té', href: '/catalogo/biscuits-chocolates' },
          { label: 'Para Café', href: '/catalogo/biscuits-chocolates' },
          { label: 'Packs para Compartir', href: '/catalogo/biscuits-chocolates' },
          { label: 'Novedades', href: '/catalogo/biscuits-chocolates' },
        ],
      },
      {
        title: 'Colecciones',
        items: [
          { label: 'Lujo', href: '/catalogo/biscuits-chocolates' },
          { label: 'Favoritos Británicos', href: '/catalogo/biscuits-chocolates' },
          { label: 'Selección de Chocolates', href: '/catalogo/biscuits-chocolates' },
          { label: 'Surtido de Galletas', href: '/catalogo/biscuits-chocolates' },
        ],
      },
    ],
    promos: [
      {
        href: '/catalogo/biscuits-chocolates',
        imageSrc:
          'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/catalogo/biscuits-chocolates',
        imageSrc:
          'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
};
