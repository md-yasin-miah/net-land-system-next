import Link from 'next/link';

const SideAdBanner = () => {
  return (
    <div className="w-64 hidden xl:flex flex-col gap-4">
      <div className="flex-1 bg-orange-100 rounded border border-orange-200 p-4 flex flex-col justify-between overflow-hidden relative min-h-[200px]">
        <div>
          <h4 className="text-orange-800 font-bold">Clearance Sale</h4>
          <p className="text-xs text-orange-700">Up to 40% off on Cat6 cables</p>
        </div>
        <Link href="/clearance" className="bg-orange-600 text-white py-1.5 rounded text-xs font-bold text-center">
          Shop Deals
        </Link>
        <div className="absolute -bottom-4 -right-4 size-20 bg-orange-200 rounded-full blur-xl opacity-50"></div>
      </div>
      <div className="flex-1 bg-blue-100 rounded border border-blue-200 p-4 flex flex-col justify-between min-h-[200px]">
        <div>
          <h4 className="text-blue-800 font-bold">Free Shipping</h4>
          <p className="text-xs text-blue-700">On all orders above ৳50,000</p>
        </div>
        <span className="material-symbols-outlined text-blue-300 text-4xl self-end">
          local_shipping
        </span>
      </div>
    </div>
  );
};

export default SideAdBanner;
