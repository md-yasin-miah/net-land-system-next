import Link from 'next/link';

const HeroSlider = () => {
  return (
    <div className="flex-1 relative rounded overflow-hidden shadow-lg bg-slate-200 min-h-[420px]">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent z-10 p-12 flex flex-col justify-center text-white">
        <span className="bg-orange-500 px-3 py-1 rounded-full text-xs font-bold w-fit mb-4">
          NEW ARRIVAL
        </span>
        <h2 className="text-4xl font-black mb-4 leading-tight">
          Next-Gen Enterprise<br />Wi-Fi 7 Solutions
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-lg">
          Empower your office with ultra-fast connectivity. Now stocking the latest Aruba and Ubiquiti Enterprise APs.
        </p>
        <div className="flex gap-4">
          <Link href="/products/wifi-7" className="bg-white text-primary px-8 py-3 rounded font-bold hover:bg-blue-50 transition-colors">
            Shop Now
          </Link>
          <Link href="/wifi-7-info" className="bg-transparent border border-white px-8 py-3 rounded font-bold hover:bg-white/10 transition-colors">
            Learn More
          </Link>
        </div>
      </div>
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGs-8J6szRqCW6LViuG-rMzW0XyP38lH3-KkQb2F0-Hy0ccmJNeIayPjLBKpNk_cHw7WJEUOIC1S2hmG5IfZEKEqWmeWrCAGhC1JiCAhygtpv3y4S4eynio5eeXmllbIDYMo_XKxMOAVaHcU5AeQPWwt1IYwxE40v3h7robb34pIDR6kmdbsqHL5Z0OfeFiXooZapk30w7DLVNi9Nsi9PtXSVeLmFY708j4qV_-FCa8uZPoiS3yRyJ7ObtKzCFHH04S0eiDBP5R_o')`
        }}
      />
    </div>
  );
};

export default HeroSlider;
