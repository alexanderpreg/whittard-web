import { GoogleOAuthProvider } from '@/providers/GoogleOAuthProvider';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <GoogleOAuthProvider>{children}</GoogleOAuthProvider>;
}
