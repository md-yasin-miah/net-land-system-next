import Header from '@/components/e-commerce/Header';
import Footer from '@/components/e-commerce/Footer';
import { ReactNode } from 'react';

interface ECommerceLayoutProps {
  children: ReactNode;
}

const ECommerceLayout = ({ children }: ECommerceLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default ECommerceLayout;