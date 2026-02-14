import Sidebar from '@/components/e-commerce/home/Sidebar';
import HeroSlider from '@/components/e-commerce/home/HeroSlider';
import SideAdBanner from '@/components/e-commerce/home/SideAdBanner';
import FeatureStrip from '@/components/e-commerce/home/FeatureStrip';
import WeeklyDeals from '@/components/e-commerce/home/WeeklyDeals';
import FeaturedProduct from '@/components/e-commerce/home/FeaturedProduct';
import SoftwareServices from '@/components/e-commerce/home/SoftwareServices';
import InfrastructureSolutions from '@/components/e-commerce/home/InfrastructureSolutions';
import Newsletter from '@/components/e-commerce/home/Newsletter';

const ECommerceHomePage = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-4 flex flex-col gap-6">
      {/* Hero Section with Sidebar */}
      <section className="flex gap-4 min-h-[420px]">
        <Sidebar />
        <HeroSlider />
        <SideAdBanner />
      </section>

      {/* Feature Strip */}
      <FeatureStrip />

      {/* Weekly Networking Deals Section */}
      <WeeklyDeals />

      {/* Featured Product - Cisco Nexus 9300 */}
      <FeaturedProduct />

      {/* Software & Managed Services */}
      <SoftwareServices />

      {/* Infrastructure Solutions */}
      <InfrastructureSolutions />

      {/* Newsletter & Footer Banner */}
      <Newsletter />
    </div>
  );
};

export default ECommerceHomePage;