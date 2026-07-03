import { Container } from '@/shared/components/custom-ui/Container';
import { ActiveLink } from '@/shared/navigation/ActiveLink';
import { utilityNavigationItems } from '@/shared/navigation/routes';

export function UtilityNavigation() {
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

          return (
            <li key={item.href}>
              <ActiveLink
                href={item.href}
                className="group text-brand-white/90 flex items-center gap-2 text-xs font-medium uppercase transition-opacity hover:opacity-80"
                activeClassName="text-brand-white"
                includeSubpath={item.includeSubpath}
              >
                <span>{item.label}</span>
                <Icon strokeWidth={1.5} className="size-4.5" />
              </ActiveLink>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
