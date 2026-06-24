// components/ui/Loading.tsx
import { cn } from '@/lib/utils/shadcn-cn';
import styles from '../../styles/Loading.module.css';

const SIZES = {
  sm: 'w-8 h-8',
  md: 'w-20 h-20',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
} as const;

type Size = keyof typeof SIZES;

const ButterflyIcon = ({ size = 'md' }: { size?: Size }) => (
  <div className={cn('relative flex items-center justify-center p-2.5', SIZES[size])}>
    <svg viewBox="0 0 100 100" className={cn('absolute inset-0 h-full w-full', styles.spinner)}>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="60 200"
        strokeLinecap="round"
        className="text-green-500/30"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="120 200"
        strokeLinecap="round"
        className="text-daryza-green-oficial"
        fill="none"
      />
    </svg>
    <svg
      viewBox="0 0 249 194"
      className="relative z-10 h-2/3 w-2/3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M246.93 30.6903C242.91 10.7303 225.84 -1.65972 205.51 0.180282C192.08 1.40028 179.69 8.32028 169.63 17.3003C144.26 39.9503 127.36 72.0403 124.04 105.85C120.72 72.0403 103.82 39.9403 78.45 17.3003C68.39 8.33028 56 1.40028 42.57 0.180282C22.25 -1.65972 5.16997 10.7303 1.15997 30.6903C-1.83003 45.5403 1.19997 61.6803 7.49997 75.3103C12.89 86.9703 19.81 99.8903 31.68 106.01C41.18 110.91 53.58 110.73 62.49 104.58C62.49 104.58 25.99 129.07 33.48 160.94C37.48 177.98 52.44 190.49 69.5 193.17C88.31 196.12 106.28 185.59 114.07 168.32C119.53 156.21 122.79 143.63 124.05 130.62C125.31 143.63 128.57 156.21 134.03 168.32C141.82 185.59 159.79 196.12 178.6 193.17C195.66 190.5 210.61 177.98 214.62 160.94C222.11 129.07 185.61 104.58 185.61 104.58C194.52 110.72 206.93 110.91 216.42 106.01C228.29 99.8903 235.21 86.9703 240.6 75.3103C246.9 61.6803 249.93 45.5503 246.94 30.6903"
        fill="#13A538"
      />
    </svg>
  </div>
);

interface LoadingProps {
  size?: Size;
  className?: string;
  showText?: boolean;
}

export const LoadingUi = ({ size = 'md', className, showText = true }: LoadingProps) => (
  <div
    style={{ opacity: 0 }} // ✅ empieza invisible hasta que fadeIn lo muestra
    className={cn('flex flex-col items-center justify-center space-y-2', styles.fadeIn, className)}
  >
    <div className="relative">
      <div className="absolute inset-0 animate-pulse rounded-full bg-green-400/10 blur-2xl" />
      <ButterflyIcon size={size} />
    </div>

    {showText && (
      <div
        className={cn(
          'text-darysa-gris-900 text-sm font-medium tracking-[0.2em]',
          styles.loadingtext,
        )}
      >
        <p>Cargando</p>
      </div>
    )}
  </div>
);
