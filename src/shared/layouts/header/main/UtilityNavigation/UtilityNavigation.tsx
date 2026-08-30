'use client';

import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { useCartItemCount } from '@/modules/cart/hooks/useCart';
import { Container } from '@/shared/components/custom-ui/Container';
import { UserAvatar } from '@/shared/components/custom-ui/UserAvatar';
import { ActiveLink } from '@/shared/navigation/ActiveLink';
import { utilityNavigationItems } from '@/shared/navigation/routes';

export function UtilityNavigation() {
  const cartCount = useCartItemCount();
  const { isAuthenticated, user, picture } = useAuthStore();

  return (
    <Container
      as="nav"
      size="full"
      aria-label="Navegación de utilidades"
      className="w-full max-w-fit"
    >
      <ul className="flex w-full items-center gap-4 sm:gap-8">
        {utilityNavigationItems.map((item) => {
          const Icon = item.icon;
          const isCart = item.href === '/carrito';
          const isAccount = item.href === '/mi-cuenta';

          return (
            <li key={item.href}>
              <ActiveLink
                href={item.href}
                className="group text-brand-white/90 flex items-center gap-2 text-xs font-medium uppercase transition-opacity hover:opacity-80"
                activeClassName="text-brand-white"
                includeSubpath={item.includeSubpath}
              >
                <span className="hidden lg:block">{item.label}</span>
                <div className="relative">
                  {isAccount && isAuthenticated && user ? (
                    <UserAvatar
                      name={user.name}
                      image={picture}
                      size="sm"
                      className="border-brand-white/50"
                      fallbackClassName="text-brand-white bg-brand-primary/80 text-[10px]"
                    />
                  ) : (
                    <Icon strokeWidth={1.5} className="size-4.5" />
                  )}
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
