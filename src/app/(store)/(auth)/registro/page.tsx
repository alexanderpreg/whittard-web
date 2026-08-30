import { RegisterView } from '@/modules/auth/RegisterView';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense>
      <RegisterView />
    </Suspense>
  );
}
