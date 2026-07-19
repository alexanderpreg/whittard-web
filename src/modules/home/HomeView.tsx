import { ProductCarousel } from '@/modules/products/components/product-carousel/ProductCarousel';
import type { ProductCardData } from '@/modules/products/types/productCard';
import { RecipeCarousel } from '@/modules/recipes/components/recipe-carousel/RecipeCarousel';
import type { RecipeSlide } from '@/modules/recipes/types/recipes';
import { Container } from '@/shared/components/custom-ui/Container';
import type { BannerSlide } from '@/shared/components/custom-ui/banner';
import { Banner } from '@/shared/components/custom-ui/banner';
import { CategoriesCarousel } from './components/CarouselCategories';
import { SummerFavorites } from './components/SummerFavorites';
import { CategorySlide } from './types/categories';

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: '1',
    isActive: true,
    type: 'image',
    desktopImageUrl: '/home/banner/portada.jpg',
    mobileImageUrl: '/home/banner/portadamobil.webp',
  },
  {
    id: '2',
    isActive: true,
    type: 'image',
    desktopImageUrl: '/home/banner/portada.jpg',
    mobileImageUrl: '/home/banner/portadamobil.webp',
    linkUrl: 'https://whittard.com/envios',
  },
  // {
  //   id: '3',
  //   isActive: true,
  //   type: 'video',
  //   videoUrl: '/home/banner/video.mp4',
  // },
];

export const CATEGORY_SLIDES: CategorySlide[] = [
  {
    name: 'Tés',
    imageUrl: '/categoria1.png',
    slug: 'tes',
  },
  {
    name: 'Cafés',
    imageUrl: '/categoria1.png',
    slug: 'cafes',
  },
  {
    name: 'Chocolate',
    imageUrl: '/categoria1.png',
    slug: 'chocolate',
  },
  {
    name: 'Regalos',
    imageUrl: '/categoria1.png',
    slug: 'regalos',
  },
  {
    name: 'Chocolate',
    imageUrl: '/categoria1.png',
    slug: 'chocolate21321',
  },
  {
    name: 'Regalos',
    imageUrl: '/categoria1.png',
    slug: 'regalos4343',
  },
  {
    name: 'Regalos',
    imageUrl: '/categoria1.png',
    slug: 'regalo21323s4343',
  },
];

const SUMMER_FAVORITES = {
  imageUrl: '/imagenventasverano.png',
  title: 'Discover NEW Summer Favourites',
  description:
    'From calming infusions and refreshing instant teas to indulgent hot chocolates and buttery biscuits, expect bright tartness, soft florals, and a touch of nostalgic sweetness.',
};
const PRODUCTS: ProductCardData[] = [
  {
    productId: '1',
    variantId: '1a',
    slug: 'earl-grey-classic',
    name: 'Earl Grey Classic',
    price: 45.0,
    promoPrice: 35.0,
    stock: 12,
    image: '/producto1.png',
    rating: 0,
  },
  {
    productId: '2',
    variantId: '2a',
    slug: 'english-breakfast',
    name: 'English Breakfast',
    price: 42.0,
    promoPrice: null,
    stock: 8,
    image: '/producto1.png',
    rating: 4.6,
  },
  {
    productId: '3',
    variantId: '3a',
    slug: 'jasmin-tea',
    name: 'Jasmine Green Tea',
    price: 48.0,
    promoPrice: 38.0,
    stock: 3,
    image: '/producto1.png',
    rating: 4.9,
  },
  {
    productId: '4',
    variantId: '4a',
    slug: 'chamomile-infusion',
    name: 'Manzanilla & Miel',
    price: 38.0,
    promoPrice: null,
    stock: 20,
    image: '/producto1.png',
    rating: 4.5,
  },
  {
    productId: '5',
    variantId: '5a',
    slug: 'matcha-premium',
    name: 'Matcha Premium Ceremonial',
    price: 65.0,
    promoPrice: 55.0,
    stock: 5,
    image: '/producto1.png',
    rating: 4.7,
  },
  {
    productId: '6',
    variantId: '6a',
    slug: 'hot-chocolate-deluxe',
    name: 'Chocolate Caliente Deluxe',
    price: 52.0,
    promoPrice: null,
    stock: 0,
    image: '/producto1.png',
    rating: 4.4,
  },
];

const RECIPES: RecipeSlide[] = [
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

export default function HomeView() {
  return (
    <Container as="main" size="full" className="mb-8 flex-1">
      <Banner slides={BANNER_SLIDES} />
      <Container className="mt-14 space-y-14">
        <CategoriesCarousel slides={CATEGORY_SLIDES} />
        <SummerFavorites content={SUMMER_FAVORITES} />
        <ProductCarousel products={PRODUCTS} title="¿Qué hay de nuevo esta temporada?" />
        <SummerFavorites content={SUMMER_FAVORITES} />
        <RecipeCarousel title="¿Has visto...?" recipes={RECIPES} />
      </Container>
    </Container>
  );
}
