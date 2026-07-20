export interface TasteHeroContent {
  title: string;
  description: string;
  badgeImageUrl: string;
}

export interface TasteProductCard {
  imageUrl: string;
  label: string;
  href: string;
}

export interface TastePageData {
  hero: TasteHeroContent;
  cards: TasteProductCard[];
}
