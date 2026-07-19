import type { RecipeSlide } from '@/modules/recipes/types/recipes';
import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { Text } from '@/shared/components/custom-ui/Text';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: RecipeSlide;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 pb-1">
      <div className="relative aspect-video w-full overflow-hidden rounded-xs">
        <AppImage
          src={recipe.imageUrl}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-400 ease-out hover:scale-105"
          skeleton={false}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 text-center">
        <Heading as="h3" variant="cardTitle" className="line-clamp-2">
          {recipe.title}
        </Heading>

        <Text variant="body" className="line-clamp-2">
          {recipe.description}
        </Text>

        <Link
          href={`/receta/${recipe.slug}`}
          className="border-brand-primary text-brand-primary hover:bg-brand-primary inline-flex h-10 w-full items-center justify-center rounded-xs border bg-transparent px-6 text-sm font-medium tracking-widest transition-colors hover:text-white"
        >
          Mira esta Receta
        </Link>
      </div>
    </article>
  );
}
