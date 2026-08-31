import { buildSeoMetadata } from '@/lib/seo';
import { TasteView } from '@/modules/taste/TasteView';

export const metadata = buildSeoMetadata({
  defaults: {
    title: 'The Whittard Taste Promise',
    description:
      'Descubre The Whittard Taste Promise y la calidad de nuestros tés, cafés y chocolates.',
  },
});

export default function Page() {
  return <TasteView />;
}
