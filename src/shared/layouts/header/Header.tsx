import { Container } from '@/shared/components/custom-ui/Container';
import { CategoryNavigation } from './CategoryNavigation/CategoryNavigation';
import MainHeader from './main/MainHeader';
import { PromotionBar } from './promotion-bar/PromotionBar';
import UtilityBar from './utility-bar/UtilityBar';

export default function Header() {
  return (
    <Container as="header" size="full" className="bg-brand-primary z-sticky sticky top-0">
      <PromotionBar />
      <UtilityBar />
      <MainHeader />
      <CategoryNavigation />
    </Container>
  );
}
