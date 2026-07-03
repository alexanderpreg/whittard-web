'use client';

import { Container } from '@/shared/components/custom-ui/Container';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { Text } from '@/shared/components/custom-ui/Text';
import {
  Carousel,
  CarouselContent,
  CarouselCounter,
  CarouselDots,
  CarouselFraction,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
  CarouselThumbs,
} from '@/shared/components/custom-ui/carousel';

const productImages = [
  {
    id: 'product-hero-1',
    label: 'Front view',
    bg: 'from-emerald-50 via-white to-lime-100',
    focus: 'bg-emerald-300',
  },
  {
    id: 'product-hero-2',
    label: 'Pack detail',
    bg: 'from-amber-50 via-white to-orange-100',
    focus: 'bg-amber-300',
  },
  {
    id: 'product-hero-3',
    label: 'Lifestyle',
    bg: 'from-rose-50 via-white to-pink-100',
    focus: 'bg-rose-300',
  },
];

const promoSlides = [
  {
    id: 'promo-1',
    title: 'Tea Week',
    description: 'Descuento en blends seleccionados para campañas de ecommerce.',
    bg: 'from-slate-950 via-slate-800 to-stone-700',
  },
  {
    id: 'promo-2',
    title: 'New Season',
    description: 'Colecciones nuevas con navegación por dots y contador.',
    bg: 'from-cyan-950 via-sky-800 to-slate-700',
  },
  {
    id: 'promo-3',
    title: 'Gift sets',
    description: 'Un banner reusable que solo cambia contenido por composición.',
    bg: 'from-amber-950 via-orange-800 to-rose-800',
  },
];

const gallerySlides = [
  { id: 'gallery-1', title: 'Packaging', tone: 'bg-stone-200' },
  { id: 'gallery-2', title: 'Serving ritual', tone: 'bg-amber-100' },
  { id: 'gallery-3', title: 'Texture', tone: 'bg-rose-100' },
  { id: 'gallery-4', title: 'Ingredients', tone: 'bg-emerald-100' },
];

const customDotSlides = [
  {
    id: 'custom-1',
    title: 'Stock',
    description: 'Un dot personalizado puede mostrar estado o prioridad.',
    tone: 'bg-sky-100',
  },
  {
    id: 'custom-2',
    title: 'Shipping',
    description: 'El control sigue siendo genérico y sin lógica de negocio.',
    tone: 'bg-violet-100',
  },
  {
    id: 'custom-3',
    title: 'Reviews',
    description: 'Podemos pintar el indicador como queramos.',
    tone: 'bg-amber-100',
  },
  {
    id: 'custom-4',
    title: 'Bundles',
    description: 'La composición manda, no el core.',
    tone: 'bg-emerald-100',
  },
];

const featureCards = [
  {
    title: 'Carousel',
    text: 'Crea contexto, estado y navegación en un solo lugar.',
  },
  {
    title: 'Layout',
    text: 'Solo estructura visual: `Content`, `Item`, `Previous`, `Next`.',
  },
  {
    title: 'Controls',
    text: 'Se conectan por `useCarousel()` y no conocen tipos de negocio.',
  },
];

const brandGroups = [
  {
    id: 'brands-1',
    title: 'Group 1',
    logos: ['Natura', 'Bloom', 'Casa Tea', 'Lumen', 'Aroma'],
  },
  {
    id: 'brands-2',
    title: 'Group 2',
    logos: ['Kinto', 'Café 360', 'North Blend', 'Ruta', 'Senda'],
  },
  {
    id: 'brands-3',
    title: 'Group 3',
    logos: ['Pure Leaf', 'Moka', 'Origen', 'Tierra', 'Montana'],
  },
];

export default function Page() {
  return (
    <Container as="main" className="space-y-14 py-10">
      <section className="space-y-4">
        <Heading as="h1" variant="display">
          Carousel para ecommerce
        </Heading>
        <Text variant="body" className="text-muted-foreground max-w-3xl">
          Esta es una página demo para revisar cómo se vería cada control del carrusel en un
          ecommerce real. Aquí no tocamos el núcleo: solo lo componemos de distintas formas.
        </Text>
      </section>

      <section className="space-y-4">
        <Heading as="h2" variant="heading">
          1. Product Detail
        </Heading>
        <Text variant="small" className="text-muted-foreground max-w-2xl">
          Ejemplo real de detalle de producto con miniaturas, contador, fraction, progreso y zoom al
          hover sobre la imagen principal.
        </Text>

        <Carousel className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="grid gap-6">
            <div className="relative">
              <CarouselContent className="rounded-2xl">
                {productImages.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <div className="group overflow-hidden rounded-3xl border border-black/5 bg-white">
                      <div
                        className={`flex min-h-[420px] items-center justify-center bg-gradient-to-br ${slide.bg} p-8`}
                      >
                        <div className="relative h-[280px] w-[280px] overflow-hidden rounded-[2rem] bg-white/70 shadow-xl">
                          <div
                            className={`absolute inset-6 rounded-[1.75rem] ${slide.focus} opacity-80 blur-2xl transition-transform duration-500 group-hover:scale-110`}
                          />
                          <div className="absolute inset-0 grid place-items-center p-6">
                            <div className="transition-transform duration-500 group-hover:scale-110">
                              <div className="rounded-[1.75rem] bg-white px-6 py-8 shadow-lg">
                                <div className="text-center text-xs font-semibold tracking-[0.35em] text-stone-500 uppercase">
                                  Zoom hover
                                </div>
                                <div className="mt-3 text-center text-4xl font-bold text-stone-900">
                                  {slide.label}
                                </div>
                                <div className="mx-auto mt-4 h-24 w-24 rounded-full bg-gradient-to-br from-stone-900 to-stone-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </div>

            <aside className="space-y-4 rounded-2xl bg-stone-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <CarouselCounter />
                <CarouselFraction />
              </div>

              <CarouselProgress />

              <CarouselThumbs
                items={productImages}
                getKey={(item) => item.id}
                renderThumb={(item, active) => (
                  <div
                    className={`overflow-hidden rounded-2xl border p-3 transition ${
                      active
                        ? 'border-stone-900 bg-white shadow-sm'
                        : 'border-stone-200 bg-white/70'
                    }`}
                  >
                    <div className={`mb-3 h-16 rounded-xl bg-gradient-to-br ${item.bg} p-2`}>
                      <div className="flex h-full items-center justify-center rounded-lg bg-white/60 text-xs font-semibold tracking-[0.2em] text-stone-600 uppercase">
                        {item.label}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-stone-900">{item.label}</div>
                  </div>
                )}
              />
            </aside>
          </div>
        </Carousel>
      </section>

      <section className="space-y-4">
        <Heading as="h2" variant="heading">
          2. Promo Banner
        </Heading>
        <Text variant="small" className="text-muted-foreground max-w-2xl">
          Caso de uso típico para home o landing de ecommerce: banner hero con dots, contador y
          navegación.
        </Text>

        <Carousel className="rounded-3xl border border-black/5 bg-slate-950 p-6 text-white shadow-sm">
          <div className="relative">
            <CarouselContent>
              {promoSlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div
                    className={`flex min-h-[300px] flex-col justify-end rounded-3xl bg-gradient-to-br ${slide.bg} p-8`}
                  >
                    <span className="mb-3 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
                      Campaña
                    </span>
                    <Heading as="h3" variant="subheading" className="text-white">
                      {slide.title}
                    </Heading>
                    <Text as="p" className="mt-2 max-w-xl text-white/80">
                      {slide.description}
                    </Text>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious variant="secondary" />
            <CarouselNext variant="secondary" />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <CarouselCounter className="text-white/70" />
            <CarouselDots className="justify-end" />
          </div>
        </Carousel>
      </section>

      <section className="space-y-4">
        <Heading as="h2" variant="heading">
          3. Gallery Carousel
        </Heading>
        <Text variant="small" className="text-muted-foreground max-w-2xl">
          Ejemplo sencillo para gallery de producto. Aquí mantenemos la UI limpia y el carrusel
          funciona horizontal, que es lo más estable para revisar el layout.
        </Text>

        <Carousel className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="relative">
            <CarouselContent>
              {gallerySlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div
                    className={`flex min-h-[280px] items-center justify-center rounded-3xl ${slide.tone} text-3xl font-semibold text-stone-800`}
                  >
                    {slide.title}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <CarouselFraction />
            <CarouselProgress className="max-w-64" />
          </div>
        </Carousel>
      </section>

      <section className="space-y-4">
        <Heading as="h2" variant="heading">
          4. Custom Dots
        </Heading>
        <Text variant="small" className="text-muted-foreground max-w-2xl">
          Ejemplo de `CarouselDots` con `renderDot`, útil cuando quieres que cada punto muestre un
          estado o una etiqueta.
        </Text>

        <Carousel className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="relative">
            <CarouselContent>
              {customDotSlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div
                    className={`flex min-h-[260px] flex-col justify-end rounded-3xl p-8 ${slide.tone}`}
                  >
                    <Heading as="h3" variant="subheading" className="text-stone-900">
                      {slide.title}
                    </Heading>
                    <Text as="p" className="mt-2 max-w-lg text-stone-700">
                      {slide.description}
                    </Text>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </div>

          <CarouselDots
            className="mt-5 justify-start"
            renderDot={(index, active, goTo) => (
              <button
                key={index}
                type="button"
                onClick={goTo}
                aria-label={`Ir al slide ${index + 1}`}
                aria-current={active}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                  active ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            )}
          />
        </Carousel>
      </section>

      <section className="space-y-4">
        <Heading as="h2" variant="heading">
          5. Brand Logos by Group
        </Heading>
        <Text variant="small" className="text-muted-foreground max-w-2xl">
          Este ejemplo muestra cómo un slide puede contener varios items. Los dots representan cada
          grupo completo, no cada logo individual.
        </Text>

        <Carousel className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="relative">
            <CarouselContent>
              {brandGroups.map((group) => (
                <CarouselItem key={group.id}>
                  <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <Heading as="h3" variant="cardTitle">
                          {group.title}
                        </Heading>
                        <Text variant="small" className="text-muted-foreground">
                          5 logos por slide
                        </Text>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-600 shadow-sm">
                        Group view
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                      {group.logos.map((logo) => (
                        <div
                          key={logo}
                          className="flex h-20 items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white text-sm font-semibold text-stone-700"
                        >
                          {logo}
                        </div>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <CarouselFraction />
            <CarouselDots />
          </div>
        </Carousel>
      </section>

      <section className="space-y-4 rounded-3xl border border-dashed border-black/10 bg-stone-50 p-6">
        <Heading as="h2" variant="heading">
          6. Qué controla cada pieza
        </Heading>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => (
            <div key={card.title} className="rounded-2xl bg-white p-4 shadow-sm">
              <Heading as="h3" variant="cardTitle">
                {card.title}
              </Heading>
              <Text variant="small" className="text-muted-foreground mt-2">
                {card.text}
              </Text>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
