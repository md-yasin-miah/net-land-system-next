const features = [
  {
    icon: 'verified',
    title: 'Official Warranty',
    description: '100% Genuine Products',
  },
  {
    icon: 'headset_mic',
    title: 'Expert Support',
    description: 'Certified Tech Engineers',
  },
  {
    icon: 'payments',
    title: 'Corporate Deals',
    description: 'Credit Facility for Firms',
  },
  {
    icon: 'bolt',
    title: 'Express Delivery',
    description: 'Same Day in Dhaka',
  },
];

const FeatureStrip = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-white dark:bg-slate-800 p-3 rounded flex items-center gap-3 border border-slate-100 dark:border-slate-700 shadow-sm"
        >
          <span className="material-symbols-outlined text-primary text-3xl">
            {feature.icon}
          </span>
          <div>
            <h5 className="text-sm font-bold">{feature.title}</h5>
            <p className="text-[10px] text-slate-500">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureStrip;
