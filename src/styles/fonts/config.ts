import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const barlow = Barlow({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   variable: '--font-barlow',
//   display: 'swap',
// });

// export const inter = Inter({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   variable: '--font-inter',
//   display: 'swap',
// });

export const avenirLt = localFont({
  src: [
    { path: './avenir-lt/Avenir LT Std 35 Light.otf', weight: '300', style: 'normal' },
    { path: './avenir-lt/Avenir LT Std 45 Book.otf', weight: '400', style: 'normal' },
    { path: './avenir-lt/Avenir LT Std 65 Medium.otf', weight: '500', style: 'normal' },
    { path: './avenir-lt/Avenir LT Std 85 Heavy.otf', weight: '800', style: 'normal' },
  ],
  variable: '--font-avenir-lt',
  display: 'swap',
});

export const elephantDisplay = localFont({
  src: [{ path: './elephant/Elephant-PersonalUse.ttf', weight: '400', style: 'normal' }],
  variable: '--font-elephant-display',
  display: 'swap',
});
