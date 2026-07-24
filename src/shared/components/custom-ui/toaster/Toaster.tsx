'use client';

import { Toaster as SonnerToaster } from 'sonner';

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <SonnerToaster
      richColors
      closeButton
      position="top-right"
      toastOptions={{
        style: {
          fontFamily: 'var(--font-avenir-lt), Avenir, sans-serif',
          fontSize: '0.875rem',
        },
      }}
      {...props}
    />
  );
}
