import Header from "@/components/e-commerce/Header";
import Footer from "@/components/e-commerce/Footer";
import CartDrawer from "@/components/e-commerce/CartDrawer";
import { ReduxProvider, CartHydrator } from "@/store/ReduxProvider";
import { ReactNode } from "react";

interface ECommerceLayoutProps {
  children: ReactNode;
}

const ECommerceLayout = ({ children }: ECommerceLayoutProps) => {
  return (
    <ReduxProvider>
      <CartHydrator />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <CartDrawer />
    </ReduxProvider>
  );
};

export default ECommerceLayout;