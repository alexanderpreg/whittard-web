import { BaseSection } from './common';

export interface HomeBannerSlide {
  id: number;
  image_desktop: string;
  image_mobile: string;
  title?: string;
  link_url?: string;
}

export interface HomeMainBannerSection extends BaseSection {
  title?: string;
  slides?: HomeBannerSlide[];
}

export interface HomeFeaturesSection extends BaseSection {
  title?: string;
  items?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

// Estructura de respuesta para la página principal
export interface HomePageContent {
  main_banner?: HomeMainBannerSection;
  features?: HomeFeaturesSection;
}
