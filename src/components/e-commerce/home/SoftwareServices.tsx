import Link from 'next/link';

const services = [
  {
    icon: 'monitoring',
    title: 'Network Monitoring',
    description: 'Real-time traffic analysis and uptime monitoring.',
    href: '/services/network-monitoring',
  },
  {
    icon: 'cloud',
    title: 'Cloud Management',
    description: 'Centralized control for multi-site deployments.',
    href: '/services/cloud-management',
  },
  {
    icon: 'security',
    title: 'Cybersecurity Suite',
    description: 'Enterprise-grade protection and threat detection.',
    href: '/services/cybersecurity',
  },
  {
    icon: 'support_agent',
    title: 'Enterprise Support',
    description: '24/7 dedicated engineering support for firms.',
    href: '/services/enterprise-support',
  },
];

const SoftwareServices = () => {
  return (
    <section className="py-4">
      <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
        Software & Managed Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center group hover:border-primary transition-colors"
          >
            <span className="material-symbols-outlined text-4xl text-primary mb-4">
              {service.icon}
            </span>
            <h3 className="font-bold mb-2">{service.title}</h3>
            <p className="text-xs text-slate-500">{service.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SoftwareServices;
