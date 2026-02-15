import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const features = [
  '48 x 10/25-Gbps SFP28 ports',
  '6 x 40/100-Gbps QSFP28 uplink ports',
  '3.6-Tbps bandwidth capacity',
  'Low-latency, high-density L2/L3 switching',
];

const FeaturedProduct = () => {
  return (
    <section className="bg-slate-900 text-white rounded-lg overflow-hidden flex flex-col lg:flex-row items-center border border-slate-800">
      <div className="lg:w-1/2 p-8 lg:p-12">
        <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
          Professional Grade
        </span>
        <h2 className="text-3xl font-bold mb-6">
          Cisco Nexus 9300 Cloud Scale Switch
        </h2>
        <ul className="space-y-3 mb-8 text-slate-400">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckCircle className="size-5 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/products/cisco-nexus-9300"
            className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded font-bold transition-colors"
          >
            Add to Cart
          </Link>
          <Link
            href="/products/cisco-nexus-9300/details"
            className="border border-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded font-bold transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="lg:w-1/2 bg-slate-800 flex items-center justify-center p-12">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhB5cqdvfA_waj3XaPT_UCmySTP4PuxVqrb1cim0DznfeNM8CcCU8kt4kItNDKNqfVBWNJ_r0JORcoikwwSW5ivnOZnHQaOKZTjwsWv4Skv5jK3szaZWm7ixrdQHjp8W9zKRJdI9wNGfklFX5LyZPoMUb0iX4cXQ3B7lsKPR56a0hIkyNgxvDt2JDH5MtJMiubpAveEscJAJYRLDlnSemfbugm9Tmlzwy9Pi2BsoGdXszXQrz3KxAfLO2i9srhSLbk5TjUzlc4jd8"
          alt="Cisco Nexus 9300"
          width={400}
          height={300}
          className="max-w-full h-auto drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default FeaturedProduct;
