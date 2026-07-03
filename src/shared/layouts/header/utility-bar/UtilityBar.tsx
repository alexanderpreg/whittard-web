import { AppImage } from '@/shared/components/custom-ui/app-image/AppImage';
import { Container } from '@/shared/components/custom-ui/Container';

export default function UtilityBar() {
  return (
    <Container size="full" className="border-brand-200 bg-brand-white border-b">
      <Container
        as="div"
        size="container"
        className="text-brand-primary flex h-9 items-center justify-between gap-3 px-4 text-center text-sm font-medium"
      >
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <AppImage
            src="/delivery-van.png"
            alt="Whittard"
            width={36}
            height={28}
            skeleton={false}
            className="w-9 object-contain"
          />
          <span className="truncate">Delivery Gratis a partir de S/100</span>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <AppImage
            src="/icon-whittard.png"
            alt="Whittard"
            width={36}
            height={28}
            skeleton={false}
            className="w-9 object-contain"
          />
          <span className="truncate">Explora The Whittard Taste Promise</span>
        </div>
      </Container>
    </Container>
  );
}
