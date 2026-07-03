import { AppImage } from '@/shared/components/custom-ui/app-image';
import Link from 'next/link';

interface LogoProps {
  src: string;
  alt: string;
}

export function Logo({ src, alt }: LogoProps) {
  return (
    <Link href="/" aria-label="Inicio" className="inline-flex">
      <AppImage
        src={src}
        alt={alt}
        className="object-contain"
        width={136}
        height={42}
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
