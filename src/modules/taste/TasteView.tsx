import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { TasteHero } from './components/TasteHero';
import { TasteProductGrid } from './components/TasteProductGrid';
import type { TastePageData } from './types/taste';

const TASTE_BREADCRUMBS = [{ label: 'Home', href: '/' }, { label: 'The Whittard Taste Promise' }];

const TASTE_DATA: TastePageData = {
  hero: {
    title: 'The Whittard Taste Promise',
    description:
      'La vida debería estar llena de sabor, y queremos que disfrutes sin preocupaciones de las mezclas y sabores únicos que hemos elaborado. Si nuestros productos no cumplen con tus expectativas, avísanos y lo solucionaremos, ya sea mediante nuestro asesoramiento experto sobre la preparación, cambiando el producto o reembolsándote el importe total. Solo tienes que incluir la confirmación de tu pedido o el albarán de entrega si realizas la devolución por correo o si visitas una de nuestras tiendas. Así podrás probar algo nuevo sin riesgo de decepcionarte.',
    badgeImageUrl: '/taste/whittard-circle.png',
  },
  cards: [
    {
      imageUrl: '/taste/cardTaste1.png',
      label: 'Comprar Té',
      href: '/tea',
    },
    {
      imageUrl: '/taste/cardTaste2.png',
      label: 'Comprar Café',
      href: '/coffee',
    },
    {
      imageUrl: '/taste/cardTaste3.png',
      label: 'Comprar Chocolate',
      href: '/hot-chocolate',
    },
  ],
};

export function TasteView() {
  return (
    <Container as="main" className="mt-10 mb-14 flex w-full flex-1 flex-col gap-6">
      <PageBreadcrumb items={TASTE_BREADCRUMBS} />

      <TasteHero content={TASTE_DATA.hero} />

      {/* 3. Grid de productos separado manualmente para mantener el diseño limpio */}
      <div className="pt-10">
        <TasteProductGrid cards={TASTE_DATA.cards} />
      </div>
    </Container>
  );
}
