import { Container } from '@/shared/components/custom-ui/Container';

export default function Header() {
  return (
    <Container as="header" size="full" className="bg-brand-primary text-brand-white">
      <Container className="flex h-20 items-center justify-between">
        <div>{/* Logo */} aqui logo</div>

        <nav aria-label="Navegación principal">{/* Navigation */}</nav>

        <div className="flex items-center gap-4">
          {/* Search */}
          {/* Cart */}
          {/* User */}
        </div>
      </Container>
    </Container>
  );
}
