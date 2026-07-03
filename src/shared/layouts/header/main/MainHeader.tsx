import { Container } from '@/shared/components/custom-ui/Container';

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
      <div className="hidden max-w-xs flex-1 lg:block">
        <Search />
      </div>
      <Logo src="/logo-whittard.png" alt="Whittard" />

      <UtilityNavigation />
    </Container>
  );
}
