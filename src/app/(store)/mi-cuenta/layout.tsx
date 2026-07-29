import { AccountBreadcrumb } from '@/modules/mi-cuenta/components/AccountBreadcrumb';
import { AccountSidebar } from '@/modules/mi-cuenta/components/AccountSidebar';
import { Container } from '@/shared/components/custom-ui/Container';

export default function MiCuentaLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container as="main" className="py-6 md:pt-6 md:pb-10">
      <AccountBreadcrumb />

      <div className="flex gap-8 md:gap-10">
        <div className="w-full max-w-xs">
          <AccountSidebar />
        </div>

        <div className="w-full">{children}</div>
      </div>
    </Container>
  );
}
