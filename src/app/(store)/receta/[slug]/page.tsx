import { MOCK_RECIPES } from '@/modules/recipes/mocks/recipes.mock';
import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { AppImage } from '@/shared/components/custom-ui/app-image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug);
  if (!recipe) return {};

  return {
    title: `${recipe.title} — Whittard`,
    description: recipe.description,
  };
}

export async function generateStaticParams() {
  return MOCK_RECIPES.map((recipe) => ({ slug: recipe.slug }));
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug);

  if (!recipe) notFound();

  return (
    <Container as="main" className="py-6 md:py-10">
      <PageBreadcrumb
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Recetas', href: '/' },
          { label: recipe.title },
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-3xl">
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xs">
          <AppImage
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            skeleton={false}
          />
        </div>

        <h1 className="font-brand-elephant mb-4 text-3xl text-gray-900 md:text-4xl">
          {recipe.title}
        </h1>

        <p className="text-lg leading-relaxed text-gray-600">{recipe.description}</p>
      </div>
    </Container>
  );
}
