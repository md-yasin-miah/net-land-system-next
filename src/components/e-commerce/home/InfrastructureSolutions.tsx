import Image from 'next/image';
import Link from 'next/link';

const solutions = [
  {
    title: 'Data Center Design',
    description: 'Consultancy and implementation',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGs-8J6szRqCW6LViuG-rMzW0XyP38lH3-KkQb2F0-Hy0ccmJNeIayPjLBKpNk_cHw7WJEUOIC1S2hmG5IfZEKEqWmeWrCAGhC1JiCAhygtpv3y4S4eynio5eeXmllbIDYMo_XKxMOAVaHcU5AeQPWwt1IYwxE40v3h7robb34pIDR6kmdbsqHL5Z0OfeFiXooZapk30w7DLVNi9Nsi9PtXSVeLmFY708j4qV_-FCa8uZPoiS3yRyJ7ObtKzCFHH04S0eiDBP5R_o',
    alt: 'Data Center',
    href: '/solutions/data-center',
  },
  {
    title: 'Enterprise Wireless',
    description: 'High-density Wi-Fi 7 networking',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPXuQMyVDK8hLj8dyu8zsQ8AWAtHE81-2ndo5qfRLir7P-MkVm1vBqzZrnHw-vR2O33QHCKK1u8sIhxE_RjdheVIIdRtONdzXxEkr3qaEL9CqR0fwzwcHSKQQem_aJgR3BXCQQbpUut0tKgHLVnhClLkIpUWOGoQzG_4nm59I4xkDVIbrZx2vkvl3fjwgiqfS961Arf1bUBwtjfxl6gy9G2mPAVEltoXvQbNvBns82KuLDRbIm80yeU0euQLM6FUiXNJq6WJQH3eE',
    alt: 'Enterprise Wireless',
    href: '/solutions/enterprise-wireless',
  },
  {
    title: 'Structured Cabling',
    description: 'Certified copper and fiber installs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCirPJu6MV5P9fRHZJ8IvjAYRzSb7Z3WDhQyP7H8TLVmc__x9CO6W6a5bYvXO5Qngpe4_snJMNQUtt3xs5PVJT6SeWS4NstRZWyMrFePXb91IdnJErL8S_JlBBsNW3syyKSY7V11orI56qzXfGLQH34XU_5CGT-3NpRgPz1ngEn_zoQAH6v_2mada6Q9zZYVqsrGmCpYpcXIiqo_GmBc1f349SlppDauII4-eIT2l08IFiUMZgT39eTxtb5w04HMELDROPtfqAYMo4',
    alt: 'Structured Cabling',
    href: '/solutions/structured-cabling',
  },
];

const InfrastructureSolutions = () => {
  return (
    <section className="py-4 mb-4">
      <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
        Infrastructure Solutions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((solution) => (
          <Link
            key={solution.title}
            href={solution.href}
            className="relative h-64 rounded-lg overflow-hidden group cursor-pointer block"
          >
            <Image
              src={solution.image}
              alt={solution.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-lg">{solution.title}</h3>
              <p className="text-white/70 text-sm">{solution.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InfrastructureSolutions;
