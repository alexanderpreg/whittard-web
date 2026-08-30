import { LoginView } from '@/modules/auth/LoginView';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense>
      <LoginView />
    </Suspense>
  );
}
