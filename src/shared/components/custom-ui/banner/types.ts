type BannerType = 'image' | 'video';

interface BannerBase {
  id: string;
  isActive: boolean;
  type: BannerType;
  linkUrl?: string;
}

interface ImageBanner extends BannerBase {
  type: 'image';
  desktopImageUrl: string;
  mobileImageUrl?: string;
}

interface VideoBanner extends BannerBase {
  type: 'video';
  videoUrl: string;
}

export type BannerSlide = ImageBanner | VideoBanner;
