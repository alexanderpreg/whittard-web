import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { Text } from '@/shared/components/custom-ui/Text';
import type { TasteHeroContent } from '../types/taste';

interface TasteHeroProps {
  content: TasteHeroContent;
}

export function TasteHero({ content }: TasteHeroProps) {
  const { title, description, badgeImageUrl } = content;

  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="w-full space-y-6 md:max-w-[730px]">
        <Heading
          as="h1"
          variant="heading"
          className="font-brand-elephant text-brand-primary !mt-0 !pt-0 text-3xl tracking-[1px] md:text-[46px] md:leading-[64.4px]"
        >
          {title}
        </Heading>
        <Text
          variant="body"
          className="font-brand-avenir-lt text-brand-secondary text-sm leading-relaxed md:text-base"
        >
          {description}
        </Text>
      </div>

      <div className="flex shrink-0 items-center justify-center">
        <div className="relative size-64 md:h-[353px] md:w-[350px]">
          <AppImage
            src={badgeImageUrl}
            alt="The Whittard Taste Promise badge"
            fill
            sizes="(max-width: 768px) 256px, 350px"
            className="object-contain"
            skeleton={false}
            fallback={
              <div className="border-brand-200 size-full rounded-full border border-dashed" />
            }
          />
        </div>
      </div>
    </div>
  );
}
