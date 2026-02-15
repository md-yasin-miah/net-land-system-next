import { BadgeCheck, Headphones, CreditCard, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BadgeCheck,
    title: "Official Warranty",
    description: "100% Genuine Products",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Certified Tech Engineers",
  },
  {
    icon: CreditCard,
    title: "Corporate Deals",
    description: "Credit Facility for Firms",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    description: "Same Day in Dhaka",
  },
];

const FeatureStrip = () => {
  return (
    <div className="grid grid-cols-2 gap-4 py-2 md:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
        <div
          key={feature.title}
          className="flex items-center gap-3 rounded border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <Icon className="size-8 shrink-0 text-primary" />
          <div>
            <h5 className="text-sm font-bold">{feature.title}</h5>
            <p className="text-[10px] text-slate-500">{feature.description}</p>
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default FeatureStrip;
