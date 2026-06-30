import { Barlow, Geist, Geist_Mono, Inter } from 'next/font/google';

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const barlow = Barlow({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // todos los pesos que necesites
  variable: '--font-barlow',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // todos los pesos que necesites
  variable: '--font-inter',
  display: 'swap',
});
// export const boston = localFont({
//   src: [
//     { path: './boston/BostonThin.otf', weight: '100', style: 'normal' },
//     { path: './boston/BostonExtraLight.otf', weight: '200', style: 'normal' },
//     { path: './boston/BostonLight.otf', weight: '300', style: 'normal' },
//     { path: './boston/BostonRegular.otf', weight: '400', style: 'normal' },
//     { path: './boston/BostonSemiBold.otf', weight: '600', style: 'normal' },
//     { path: './boston/BostonBold.otf', weight: '700', style: 'normal' },
//     { path: './boston/BostonHeavy.otf', weight: '800', style: 'normal' },
//     { path: './boston/BostonBlack.otf', weight: '900', style: 'normal' },
//   ],
//   display: 'swap',
// });
