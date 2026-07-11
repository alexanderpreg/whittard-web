'use client';
import { useScrollTop } from '@/lib/hooks/useScrollTop';
import { cn } from '@/lib/utils';
import { Container } from '@/shared/components/custom-ui/Container';
import { CategoryNavigation } from './CategoryNavigation/CategoryNavigation';
import MainHeader from './main/MainHeader';
import { PromotionBar } from './promotion-bar/PromotionBar';
import UtilityBar from './utility-bar/UtilityBar';

export default function Header() {
  const isAtTop = useScrollTop(0);

  return (
    <Container as="header" size="full" className="bg-brand-primary z-sticky sticky top-0">
      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-200 ease-out',
          isAtTop ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <PromotionBar />
        </div>
      </div>
      <UtilityBar />
      <MainHeader />
      <CategoryNavigation />
    </Container>
  );
}
