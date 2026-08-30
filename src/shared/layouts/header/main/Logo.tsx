import { AppImage } from '@/shared/components/custom-ui/app-image';
import Link from 'next/link';

interface LogoProps {
  src: string;
  alt: string;
}

export function Logo({ src, alt }: LogoProps) {
  return (
    <Link href="/" aria-label="Inicio" className="inline-flex max-w-25 md:max-w-full">
      <AppImage
        src={src}
        alt={alt}
        className="object-contain"
        width={137}
        height={43}
        skeleton={false}
        fallback={
          <div className="flex h-10.5 w-34 items-center justify-center rounded-md border border-dashed text-xs font-medium">
            Error Logo {alt}
          </div>
        }
      />
    </Link>
  );
}
