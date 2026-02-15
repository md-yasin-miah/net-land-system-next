import Link from "next/link";
import { Activity, Cloud, ShieldCheck, HeadphonesIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services: { icon: LucideIcon; title: string; description: string; href: string }[] = [
  {
    icon: Activity,
    title: "Network Monitoring",
    description: "Real-time traffic analysis and uptime monitoring.",
    href: "/services/network-monitoring",
  },
  {
    icon: Cloud,
    title: "Cloud Management",
    description: "Centralized control for multi-site deployments.",
    href: "/services/cloud-management",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Suite",
    description: "Enterprise-grade protection and threat detection.",
    href: "/services/cybersecurity",
  },
  {
    icon: HeadphonesIcon,
    title: "Enterprise Support",
    description: "24/7 dedicated engineering support for firms.",
    href: "/services/enterprise-support",
  },
];

const SoftwareServices = () => {
  return (
    <section className="py-4">
      <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
        Software & Managed Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
          <Link
            key={service.title}
            href={service.href}
            className="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-6 text-center transition-colors group hover:border-primary dark:border-slate-700 dark:bg-slate-800"
          >
            <Icon className="mb-4 size-10 text-primary" />
            <h3 className="font-bold mb-2">{service.title}</h3>
            <p className="text-xs text-slate-500">{service.description}</p>
          </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SoftwareServices;
