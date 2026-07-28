import { MenuIcon } from 'lucide-react';

import { Container } from '@/shared/components/custom-ui/Container';
import { Button } from '@/shared/components/shadcn-ui/button';
import { SheetTrigger } from '@/shared/components/shadcn-ui/sheet';

import { Logo } from './Logo';
import { Search } from './search/Search';
import { UtilityNavigation } from './UtilityNavigation/UtilityNavigation';

export default function MainHeader() {
  return (
    <Container
      as="div"
      size="container"
      className="flex h-20 items-center justify-between gap-4 lg:gap-8"
    >
      <div className="flex flex-1 items-center gap-2 lg:max-w-xs">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-brand-white lg:hidden"
            aria-label="Abrir menú de navegación"
          >
            <MenuIcon strokeWidth={1.5} className="size-6" />
          </Button>
        </SheetTrigger>
        <div className="hidden flex-1 lg:block">
          <Search />
        </div>
      </div>
      <Logo src="/logo-whittard.png" alt="Whittard" />
      <UtilityNavigation />
    </Container>
  );
}
