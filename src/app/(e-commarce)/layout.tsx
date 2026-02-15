import Header from "@/components/e-commerce/Header";
import Footer from "@/components/e-commerce/Footer";
import CartDrawer from "@/components/e-commerce/CartDrawer";
import { ReactNode } from "react";

interface ECommerceLayoutProps {
  children: ReactNode;
}

const ECommerceLayout = ({ children }: ECommerceLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ECommerceLayout;