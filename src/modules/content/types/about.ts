import { BaseSection } from './common';

export interface AboutHeroSection extends BaseSection {
  title?: string;
  subtitle?: string;
  banner_image?: string;
}

export interface AboutHistorySection extends BaseSection {
  title?: string;
  content?: string;
  image?: string;
  mission?: string;
  vision?: string;
}

export interface AboutValueItem {
  id: number;
  icon?: string;
  title: string;
  description: string;
}

export interface AboutValuesSection extends BaseSection {
  title?: string;
  subtitle?: string;
  values?: AboutValueItem[];
}

export interface AboutStatItem {
  id: number;
  value: string;
  label: string;
}

export interface AboutStatsSection extends BaseSection {
  stats?: AboutStatItem[];
}

// Interfaz principal mapeada según los identifiers de las secciones en la BD
export interface AboutPageContent {
  hero_nosotros?: AboutHeroSection;
  nuestra_historia?: AboutHistorySection;
  valores?: AboutValuesSection;
  estadisticas?: AboutStatsSection;
}
