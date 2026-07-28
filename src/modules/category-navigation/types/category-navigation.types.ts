export interface NavigationItem {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface NavigationGroup {
  id: number;
  name: string;
  slug: string;
  items: NavigationItem[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  shortDescription?: string;
  groups: NavigationGroup[];
}
