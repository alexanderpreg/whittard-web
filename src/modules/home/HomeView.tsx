import { Container } from '@/shared/components/custom-ui/Container';
import type { BannerSlide } from '@/shared/components/custom-ui/banner';
import { Banner } from '@/shared/components/custom-ui/banner';

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
    desktopImageUrl: '/home/banner/banner1.webp',
    mobileImageUrl: '/home/banner/portadamobil.webp',
    linkUrl: 'https://whittard.com/envios',
  },
  {
    id: '3',
    isActive: true,
    type: 'video',
    videoUrl: '/home/banner/video.mp4',
  },
];

export default function HomeView() {
  return (
    <Container as="main" size="full" className="mb-8 flex-1">
      <Banner slides={BANNER_SLIDES} />
    </Container>
  );
}
