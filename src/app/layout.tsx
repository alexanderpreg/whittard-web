import { Toaster } from '@/shared/components/custom-ui/toaster/Toaster';
import { avenirLt, elephantDisplay, geistMono, geistSans } from '@/styles/fonts/config';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Whittard Peru',
    template: '%s | Whittard Peru',
  },
  description:
    'Tés, cafés, chocolates y accesorios de Whittard of Chelsea en Perú. Calidad británica desde 1886.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${avenirLt.className} ${elephantDisplay.variable} ${geistSans.variable} ${geistMono.variable} text-brand-primary h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
