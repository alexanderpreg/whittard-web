export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterContact = {
  label: string;
  value: string;
  href: string;
};

export type FooterSocial = {
  label: string;
  href: string;
  icon: string;
};

export type FooterPayment = {
  label: string;
  icon: string;
};

export const footerColumns: FooterColumn[] = [
  {
    title: 'Menú',
    links: [
      { label: 'Té', href: '/tea' },
      { label: 'Café', href: '/coffee' },
      { label: 'Chocolate Caliente', href: '/hot-chocolate' },
      { label: 'Regalos', href: '/gifts' },
      { label: 'Equipos', href: '/equipment' },
      { label: 'Galletas y Chocolate', href: '/biscuits-chocolates' },
    ],
  },
  {
    title: 'Información',
    links: [
      { label: 'Historia', href: '/about' },
      { label: 'Tiendas', href: '/stores' },
      { label: 'Recetas', href: '/recipes' },
      { label: 'The Whittard Taste', href: '/taste' },
      { label: 'Mi Cuenta', href: '/account' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Contacto', href: '/contact' },
      { label: 'Libro de Reclamaciones', href: '/claims-book' },
      { label: 'Términos y Condiciones', href: '/terms' },
      { label: 'Delivery and Returns', href: '/delivery-and-returns' },
      { label: 'Preguntas y Respuestas', href: '/faq' },
      { label: 'Políticas de Privacidad', href: '/privacy-policy' },
    ],
  },
];

export const footerContacts: FooterContact[] = [
  { label: 'Teléfono', value: '+51 999 999 999', href: 'tel:+51999999999' },
  { label: 'Correo', value: 'branding@onza.com', href: 'mailto:branding@onza.com' },
  {
    label: 'Dirección',
    value: 'Av. Mariscal La Mar 326, Miraflores - Lima, Perú',
    href: 'https://maps.google.com/?q=Av.%20Mariscal%20La%20Mar%20326,%20Miraflores%20-%20Lima,%20Per%C3%BA',
  },
];

export const footerSocials: FooterSocial[] = [
  { label: 'Facebook', href: 'https://facebook.com', icon: '/social-icons/facebook.svg' },
  { label: 'Instagram', href: 'https://instagram.com', icon: '/social-icons/instagram.svg' },
  { label: 'YouTube', href: 'https://youtube.com', icon: '/social-icons/youtube.svg' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: '/social-icons/tiktok.svg' },
  { label: 'X', href: 'https://twitter.com', icon: '/social-icons/twitter.svg' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: '/social-icons/linkedin.svg' },
  { label: 'WhatsApp', href: 'https://wa.me/51999999999', icon: '/social-icons/whatsapp.svg' },
];

export const footerPayments: FooterPayment[] = [
  { label: 'Mastercard', icon: '/medios-payment/master-card.svg' },
  { label: 'Visa', icon: '/medios-payment/visa.svg' },
  { label: 'Diners Club', icon: '/medios-payment/dinners.svg' },
  { label: 'American Express', icon: '/medios-payment/american-express.svg' },
  { label: 'Plin', icon: '/medios-payment/plin.svg' },
  { label: 'Yape', icon: '/medios-payment/yape.svg' },
];
