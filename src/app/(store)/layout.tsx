import Footer from '@/shared/layouts/footer/Footer';
import Header from '@/shared/layouts/header/Header';

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
