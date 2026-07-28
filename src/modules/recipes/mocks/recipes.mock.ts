import type { RecipeSlide } from '../types/recipes';

export const MOCK_RECIPES: RecipeSlide[] = [
  {
    id: '1',
    imageUrl: '/recipes/imagen-receta.png',
    title: 'Matcha Latte Cremoso',
    description:
      'Aprende a preparar el matcha latte perfecto con nuestra guía paso a paso. Una bebida suave, cremosa y llena de antioxidantes.',
    slug: 'matcha-latte-cremoso',
  },
  {
    id: '2',
    imageUrl: '/recipes/imagen-receta.png',
    title: 'Muffins de Earl Grey',
    description:
      'Deliciosos muffins con el aroma inconfundible del té Earl Grey. Ideales para acompañar tu tarde de té.',
    slug: 'muffins-earl-grey',
  },
  {
    id: '3',
    imageUrl: '/recipes/imagen-receta.png',
    title: 'Chocolate Caliente Especiado',
    description:
      'Una receta indulgente con chocolate negro, canela y un toque de chile. Perfecto para los días fríos.',
    slug: 'chocolate-caliente-especiado',
  },
  {
    id: '4',
    imageUrl: '/recipes/imagen-receta.png',
    title: 'Té Helado de Durazno',
    description:
      'Refrescante té helado con durazno natural y hierbabuena. La bebida perfecta para el verano.',
    slug: 'te-helado-durazno',
  },
];
