import Link from "next/link";
import { Flame } from "lucide-react";
import ProductCard from "../ProductCard";

const products = [
  {
    id: '1',
    brand: 'Mikrotik',
    name: 'MikroTik RB4011iGS+RM 10-Port Gigabit Ethernet Router',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCirPJu6MV5P9fRHZJ8IvjAYRzSb7Z3WDhQyP7H8TLVmc__x9CO6W6a5bYvXO5Qngpe4_snJMNQUtt3xs5PVJT6SeWS4NstRZWyMrFePXb91IdnJErL8S_JlBBsNW3syyKSY7V11orI56qzXfGLQH34XU_5CGT-3NpRgPz1ngEn_zoQAH6v_2mada6Q9zZYVqsrGmCpYpcXIiqo_GmBc1f349SlppDauII4-eIT2l08IFiUMZgT39eTxtb5w04HMELDROPtfqAYMo4',
    price: 21200,
    originalPrice: 24500,
    rating: 4.5,
    reviews: 42,
    specs: ['Quad-core 1.4GHz CPU', '1GB RAM • 10Gbps SFP+'],
    badge: 'SAVE 15%' as const,
    inStock: true,
  },
  {
    id: '2',
    brand: 'Cisco',
    name: 'Cisco Catalyst 2960-L 24 Port Gigabit PoE Switch',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhB5cqdvfA_waj3XaPT_UCmySTP4PuxVqrb1cim0DznfeNM8CcCU8kt4kItNDKNqfVBWNJ_r0JORcoikwwSW5ivnOZnHQaOKZTjwsWv4Skv5jK3szaZWm7ixrdQHjp8W9zKRJdI9wNGfklFX5LyZPoMUb0iX4cXQ3B7lsKPR56a0hIkyNgxvDt2JDH5MtJMiubpAveEscJAJYRLDlnSemfbugm9Tmlzwy9Pi2BsoGdXszXQrz3KxAfLO2i9srhSLbk5TjUzlc4jd8',
    price: 88500,
    rating: 5,
    reviews: 18,
    specs: ['24 x 10/100/1000 Ports', 'PoE Support • 4 SFP Sockets'],
    inStock: true,
  },
  {
    id: '3',
    brand: 'Ubiquiti',
    name: 'UniFi 6 Lite Access Point (U6-Lite)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPXuQMyVDK8hLj8dyu8zsQ8AWAtHE81-2ndo5qfRLir7P-MkVm1vBqzZrnHw-vR2O33QHCKK1u8sIhxE_RjdheVIIdRtONdzXxEkr3qaEL9CqR0fwzwcHSKQQem_aJgR3BXCQQbpUut0tKgHLVnhClLkIpUWOGoQzG_4nm59I4xkDVIbrZx2vkvl3fjwgiqfS961Arf1bUBwtjfxl6gy9G2mPAVEltoXvQbNvBns82KuLDRbIm80yeU0euQLM6FUiXNJq6WJQH3eE',
    price: 14500,
    rating: 4,
    reviews: 124,
    specs: ['Wi-Fi 6 Support', '1.5 Gbps Aggregate Rate'],
    inStock: true,
  },
  {
    id: '4',
    brand: 'TP-Link',
    name: 'TP-Link Archer AX73 AX5400 Dual-Band Router',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAX2CJ0vCEhTKAw3pjqrp2Rm_5AOmPibWLiwJOUww0n3aYwjJeJqnxjEg8HDjpuW2uFbMWXqnSReD7W_ikBzp-WAkCSFGv9wAF8CKR3NNp_tJJN03yioz1DU4eW05vvZb6rcMkzImDAOkUA91vqL1-rcVC3IZwzCO1PteZk8JWdyygb4czK_x1TY-LzZBuqmtmFXpjFBMCqixbFki5Qdxlco2_bZksAjnKEnG0udsBCMRACl7vJLMxaDd3O7TrhQNqsfKHepB9d7uM',
    price: 12200,
    rating: 5,
    reviews: 89,
    specs: ['Wi-Fi 6 speeds 5400Mbps', '6 x High Performance Antennas'],
    badge: 'HOT' as const,
    inStock: true,
  },
  {
    id: '5',
    brand: 'Toten',
    name: 'Toten 42U Server Rack Case 600 x 1000mm',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRixUdikDb7QSE5woYVQpFGe8cZfk2FwQIu1568c4wLNXz5GyR4GmrCaSarQDdspehTB_QAXivaPmZi2b-YVaDLFMEXqiF8W_6hwvKdQd35rnEkAtbbU8ou_3rQUHhGrA5AsuL1N5RUsR1a75opZHKIVwm8CEq84Z2R1ysqr9SUMQFIDTXakkoKCOX_nESm24wb4WeAZDhK7nuVcIukk8To8a7QzenQh6UPH1XBvsEH2OuxbR3504ynhfi-X-aIhxElDUSIGXgC8I',
    price: 45000,
    rating: 4,
    reviews: 9,
    specs: ['High-strength tempered glass', 'Heavy duty castor wheels'],
    inStock: false,
  },
];

const WeeklyDeals = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Flame className="size-6 text-orange-500" />
          Weekly Networking Deals
        </h2>
        <Link href="/deals" className="text-primary font-semibold text-sm hover:underline">
          View All Deals
        </Link>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default WeeklyDeals;
