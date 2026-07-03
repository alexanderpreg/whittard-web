import { Heart, MapPin, ShoppingBag, User } from 'lucide-react';

export const utilityNavigationItems = [
  { label: 'Favoritos', href: '/wishlist', icon: Heart, includeSubpath: false },
  { label: 'Tiendas', href: '/stores', icon: MapPin, includeSubpath: false },
  { label: 'Mi cuenta', href: '/account', icon: User, includeSubpath: true },
  { label: 'Carrito', href: '/bag', icon: ShoppingBag, includeSubpath: false },
] as const;

export const categoryNavigationItems = [
  { label: 'Tea', href: '/tea', includeSubpath: false },
  { label: 'Coffee', href: '/coffee', includeSubpath: false },
  { label: 'Hot Chocolate', href: '/hot-chocolate', includeSubpath: false },
  { label: 'Gifts', href: '/gifts', includeSubpath: false },
  { label: 'Equipment', href: '/equipment', includeSubpath: false },
  { label: 'Biscuits & Chocolates', href: '/biscuits-chocolates', includeSubpath: false },
] as const;

export type MegamenuColumn = {
  title: string;
  items: Array<{
    label: string;
    href: string;
  }>;
};

export type MegamenuPromo = {
  href: string;
  imageSrc: string;
};

export type CategoryMegamenu = {
  href: string;
  columns: MegamenuColumn[];
  promos: MegamenuPromo[];
};

export const categoryMegamenus: Record<string, CategoryMegamenu> = {
  Tea: {
    href: '/tea',
    columns: [
      {
        title: 'Shop tea',
        items: [
          { label: 'Black Tea', href: '/tea/black-tea' },
          { label: 'Green Tea', href: '/tea/green-tea' },
          { label: 'Herbal Tea', href: '/tea/herbal-tea' },
          { label: 'Tea Bags', href: '/tea/tea-bags' },
        ],
      },
      {
        title: 'Discover',
        items: [
          { label: 'Loose Leaf', href: '/tea/loose-leaf' },
          { label: 'Afternoon Tea', href: '/tea/afternoon-tea' },
          { label: 'Tea Gifts', href: '/gifts/tea-gifts' },
          { label: 'Best Sellers', href: '/tea/best-sellers' },
        ],
      },
      {
        title: 'Collections',
        items: [
          { label: 'Classic Collection', href: '/tea/classic-collection' },
          { label: 'Seasonal Editions', href: '/tea/seasonal-editions' },
          { label: 'Decaf Tea', href: '/tea/decaf-tea' },
          { label: 'Tea Samplers', href: '/tea/samplers' },
        ],
      },
    ],
    promos: [
      {
        href: '/gifts/tea-gifts',
        imageSrc:
          'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/tea/new-in',
        imageSrc:
          'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  Coffee: {
    href: '/coffee',
    columns: [
      {
        title: 'Shop coffee',
        items: [
          { label: 'Whole Bean', href: '/coffee/whole-bean' },
          { label: 'Ground Coffee', href: '/coffee/ground-coffee' },
          { label: 'Espresso', href: '/coffee/espresso' },
          { label: 'Coffee Bags', href: '/coffee/coffee-bags' },
        ],
      },
      {
        title: 'Discover',
        items: [
          { label: 'Dark Roast', href: '/coffee/dark-roast' },
          { label: 'Medium Roast', href: '/coffee/medium-roast' },
          { label: 'Decaf Coffee', href: '/coffee/decaf' },
          { label: 'Coffee Gifts', href: '/gifts/coffee-gifts' },
        ],
      },
      {
        title: 'Collections',
        items: [
          { label: 'House Blends', href: '/coffee/house-blends' },
          { label: 'Single Origin', href: '/coffee/single-origin' },
          { label: 'Limited Editions', href: '/coffee/limited-editions' },
          { label: 'Best Sellers', href: '/coffee/best-sellers' },
        ],
      },
    ],
    promos: [
      {
        href: '/gifts/coffee-gifts',
        imageSrc:
          'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/accessories/brewing',
        imageSrc:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  'Hot Chocolate': {
    href: '/hot-chocolate',
    columns: [
      {
        title: 'Shop hot chocolate',
        items: [
          { label: 'Classic Hot Chocolate', href: '/hot-chocolate/classic' },
          { label: 'Luxury Hot Chocolate', href: '/hot-chocolate/luxury' },
          { label: 'White Hot Chocolate', href: '/hot-chocolate/white' },
          { label: 'Instant Hot Chocolate', href: '/hot-chocolate/instant' },
        ],
      },
      {
        title: 'Discover',
        items: [
          { label: 'Seasonal Flavours', href: '/hot-chocolate/seasonal-flavours' },
          { label: 'Marshmallows', href: '/hot-chocolate/marshmallows' },
          { label: 'Gift Sets', href: '/hot-chocolate/gift-sets' },
          { label: 'Best Sellers', href: '/hot-chocolate/best-sellers' },
        ],
      },
      {
        title: 'Collections',
        items: [
          { label: 'Indulgent Classics', href: '/hot-chocolate/indulgent-classics' },
          { label: 'Vegan Friendly', href: '/hot-chocolate/vegan-friendly' },
          { label: 'Luxury Collection', href: '/hot-chocolate/luxury-collection' },
          { label: 'Treat Boxes', href: '/hot-chocolate/treat-boxes' },
        ],
      },
    ],
    promos: [
      {
        href: '/hot-chocolate',
        imageSrc:
          'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/hot-chocolate/gift-sets',
        imageSrc:
          'https://images.unsplash.com/photo-1549007994-cb92caebd54f?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  Gifts: {
    href: '/gifts',
    columns: [
      {
        title: 'Gift type',
        items: [
          { label: 'All Gifts', href: '/gifts' },
          { label: 'Coffee Gifts', href: '/gifts/coffee-gifts' },
          { label: 'Tea Gifts', href: '/gifts/tea-gifts' },
          { label: 'Hot Chocolate Gifts', href: '/gifts/hot-chocolate-gifts' },
        ],
      },
      {
        title: 'Gifts to inspire',
        items: [
          { label: 'New In', href: '/gifts/new-in' },
          { label: 'Gifts Under £30', href: '/gifts/under-30' },
          { label: 'Luxury Gifts', href: '/gifts/luxury' },
          { label: 'Vegan Gifts', href: '/gifts/vegan' },
        ],
      },
      {
        title: 'Gift collections',
        items: [
          { label: 'Best of British Gifts', href: '/gifts/british' },
          { label: 'Corporate Gifting', href: '/gifts/corporate' },
          { label: "Father's Day Gifts", href: '/gifts/fathers-day' },
          { label: 'Wedding Gifts', href: '/gifts/wedding' },
        ],
      },
    ],
    promos: [
      {
        href: '/gifts/tea-gifts',
        imageSrc:
          'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/gifts/luxury',
        imageSrc:
          'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  Equipment: {
    href: '/equipment',
    columns: [
      {
        title: 'Shop equipment',
        items: [
          { label: 'Tea Makers', href: '/equipment/tea-makers' },
          { label: 'Coffee Brewers', href: '/equipment/coffee-brewers' },
          { label: 'Grinders', href: '/equipment/grinders' },
          { label: 'Kettles', href: '/equipment/kettles' },
        ],
      },
      {
        title: 'Discover',
        items: [
          { label: 'Espresso Tools', href: '/equipment/espresso-tools' },
          { label: 'Serving Gear', href: '/equipment/serving' },
          { label: 'Travel Sets', href: '/equipment/travel-sets' },
          { label: 'Bestsellers', href: '/equipment/best-sellers' },
        ],
      },
      {
        title: 'Collections',
        items: [
          { label: 'Home Barista', href: '/equipment/home-barista' },
          { label: 'Starter Kits', href: '/equipment/starter-kits' },
          { label: 'Premium Picks', href: '/equipment/premium' },
          { label: 'Giftable Tools', href: '/equipment/giftable-tools' },
        ],
      },
    ],
    promos: [
      {
        href: '/equipment/brew-essentials',
        imageSrc:
          'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/equipment/coffee-brewers',
        imageSrc:
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  'Biscuits & Chocolates': {
    href: '/biscuits-chocolates',
    columns: [
      {
        title: 'Shop treats',
        items: [
          { label: 'Biscuits', href: '/biscuits-chocolates/biscuits' },
          { label: 'Chocolates', href: '/biscuits-chocolates/chocolates' },
          { label: 'Cookies', href: '/biscuits-chocolates/cookies' },
          { label: 'Gift Boxes', href: '/biscuits-chocolates/gift-boxes' },
        ],
      },
      {
        title: 'Pairings',
        items: [
          { label: 'For Tea', href: '/biscuits-chocolates/for-tea' },
          { label: 'For Coffee', href: '/biscuits-chocolates/for-coffee' },
          { label: 'Sharing Packs', href: '/biscuits-chocolates/sharing-packs' },
          { label: 'New In', href: '/biscuits-chocolates/new-in' },
        ],
      },
      {
        title: 'Collections',
        items: [
          { label: 'Luxury Treats', href: '/biscuits-chocolates/luxury-treats' },
          { label: 'British Favourites', href: '/biscuits-chocolates/british-favourites' },
          { label: 'Chocolate Collections', href: '/biscuits-chocolates/chocolate-collections' },
          { label: 'Biscuit Assortments', href: '/biscuits-chocolates/biscuit-assortments' },
        ],
      },
    ],
    promos: [
      {
        href: '/biscuits-chocolates/pairings',
        imageSrc:
          'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/biscuits-chocolates/chocolates',
        imageSrc:
          'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  Accessories: {
    href: '/accessories',
    columns: [
      {
        title: 'Shop accessories',
        items: [
          { label: 'Mugs & Cups', href: '/accessories/mugs' },
          { label: 'Brewing Tools', href: '/accessories/brewing' },
          { label: 'Tea Ware', href: '/accessories/tea-ware' },
          { label: 'Gift Bags', href: '/accessories/gift-bags' },
        ],
      },
      {
        title: 'Discover',
        items: [
          { label: 'Travel Mugs', href: '/accessories/travel-mugs' },
          { label: 'Tea Infusers', href: '/accessories/infusers' },
          { label: 'Storage', href: '/accessories/storage' },
          { label: 'Serving Pieces', href: '/accessories/serving' },
        ],
      },
      {
        title: 'Collections',
        items: [
          { label: 'Everyday Essentials', href: '/accessories/everyday' },
          { label: 'Gifting Extras', href: '/accessories/gifting-extras' },
          { label: 'Barista Style', href: '/accessories/barista' },
          { label: 'Best Sellers', href: '/accessories/best-sellers' },
        ],
      },
    ],
    promos: [
      {
        href: '/accessories/brewing',
        imageSrc:
          'https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=900&q=80',
      },
      {
        href: '/accessories/tea-ware',
        imageSrc:
          'https://images.unsplash.com/photo-1518459031867-a89b944bffe3?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
};
