import { useCartItemCount } from '@/modules/cart/hooks/useCart';
import { Container } from '@/shared/components/custom-ui/Container';
import { ActiveLink } from '@/shared/navigation/ActiveLink';
import { utilityNavigationItems } from '@/shared/navigation/routes';

export function UtilityNavigation() {
  const cartCount = useCartItemCount();

  return (
    <Container
      as="nav"
      size="full"
      aria-label="Navegación de utilidades"
      className="hidden w-full max-w-fit lg:block"
    >
      <ul className="flex w-full items-center gap-8">
        {utilityNavigationItems.map((item) => {
          const Icon = item.icon;
          const isCart = item.href === '/carrito';

          return (
            <li key={item.href}>
              <ActiveLink
                href={item.href}
                className="group text-brand-white/90 flex items-center gap-2 text-xs font-medium uppercase transition-opacity hover:opacity-80"
                activeClassName="text-brand-white"
                includeSubpath={item.includeSubpath}
              >
                <span>{item.label}</span>
                <div className="relative">
                  <Icon strokeWidth={1.5} className="size-4.5" />
                  {isCart && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-amber-400 text-[10px] leading-none font-bold text-white">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
              </ActiveLink>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
