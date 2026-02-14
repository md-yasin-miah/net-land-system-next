import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Router,
  Database,
  FileText,
  Download,
  History,
  Terminal,
  BookOpen,
} from "lucide-react";
import { Routes } from "@/lib/routes";
import FaqCompatibilitySearch from "@/components/faq/FaqCompatibilitySearch";

const SUB_CATEGORIES = [
  { href: "#", label: "Hardware Interop", active: true },
  { href: "#", label: "End-of-Life Notices", active: false },
  { href: "#", label: "Legacy Support", active: false },
  { href: "#", label: "Vendor Whitelists", active: false },
];

const BRAND_GUIDES = [
  {
    name: "Cisco Systems",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq5b6XwcgyCV-xM3Aovq3wPBWDG0j4qt6_UIzUrrOKSWRjv7-7mr0YHdPDCsAZpGk_7dJD-Tulw71sMI8Q_W4yUJdQYKPZTuEN6FEfPrB93PYWg7tKVKubMJejTOE3TbcsFGiwnySAGt28-6qqPWgD6H7WtBUQBLi8pvcKu7MuOVyuyXIwLis93Bk5Q8O-j22jnDTqXYIWu2TfQcCxiESiVGmK3hm70vG4vkib9WoLhtanAgom9NmkzGzpweyWnX9Kfh24Ef-xJ-I",
    links: [
      { label: "Catalyst Switch Matrices", href: "#" },
      { label: "SFP/SFP+ Support List", href: "#" },
      { label: "Meraki MS series interop", href: "#" },
    ],
  },
  {
    name: "Juniper Networks",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAexZQhUJ86klxoBTK08Tybr7mchlMwLN-esQxE0m12m0vIvns31-Vn9mh0SgaFOPQhvs0nKGsvk--2mBBXOWyWzuLAg2-diadsxVhaUHiDPexKuMmr_Q5RnIs10m8RDAAAgGZJehJY9NmstOPWTARnmTkNqgOAQlWpsOQZeouxfU7Pxdqg4IQ4grehRoSFpuBqnn496t8mD1mbSE0DZ8DNz6ckjHbJu6eZUsVvK6QVQxcisVZlJ_gXuJzHDy6qG2x2q3F6SbJ6L2s",
    links: [
      { label: "EX/QFX Series Matrices", href: "#" },
      { label: "Junos OS Versioning", href: "#" },
      { label: "Transceiver Compatibility", href: "#" },
    ],
  },
  {
    name: "MikroTik",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa26Ajxf_eV7C1a0y_ulqez9hm5XVkYzhH3m6Oghc9C1nbHW6cgmhyHRiPVgDitJy_tTPTFCL4XZ4bILF0NrVX4Rc9wXiMzgjTUxK1cPwOKrmxzkmUaZfUIq74K8xpohsETjthtUy7FD-nwHJJ7Avf0RruUigdXn_bdn1EBe8JzUGPJ-rdzYm2_SkHRfwZyEnj7Ml-rBhp7K-C1hJzb27S-Jb5y1CzjA9v4jk2YtYAk-1MQeYk2WUlDTeHmBL1KGkrhj8nmhJSxxA",
    links: [
      { label: "RouterOS Hardware Req.", href: "#" },
      { label: "SFP Module Support List", href: "#" },
      { label: "CCR Series Performance", href: "#" },
    ],
  },
];

const FIRMWARE_ROWS = [
  { family: "Cisco Catalyst 9300", version: "v17.9.4a (Gold)", date: "Oct 12, 2023", size: "742 MB", status: "Stable" },
  { family: "Juniper Junos OS", version: "v23.2R1", date: "Sep 28, 2023", size: "1.2 GB", status: "New" },
  { family: "MikroTik RouterOS v7", version: "v7.11.2", date: "Oct 19, 2023", size: "24 MB", status: "Critical" },
  { family: "Cisco Nexus 9000", version: "v10.3(2)F", date: "Aug 15, 2023", size: "890 MB", status: "Legacy" },
];

export default function FaqProductCompatibilityPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          <Link href={Routes.faq.index} className="hover:text-primary">
            Help Center
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-primary">Product Compatibility</span>
        </nav>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                Product Compatibility Hub
              </h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Lookup technical compatibility guides, firmware requirements, and hardware
                interoperability matrices for enterprise networking equipment.
              </p>
            </div>
            <div className="w-full lg:max-w-md">
              <FaqCompatibilitySearch />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">
                  Sub-Categories
                </h3>
              </div>
              <nav className="flex flex-col">
                {SUB_CATEGORIES.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-3 text-sm font-semibold flex items-center justify-between border-l-4 transition-colors ${
                      item.active
                        ? "text-primary bg-primary/5 border-primary"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent"
                    }`}
                  >
                    {item.label}
                    <ChevronRight className="size-4" />
                  </Link>
                ))}
              </nav>
            </div>
            <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-primary/20">
              <h3 className="text-lg font-bold mb-2">Need Expert Help?</h3>
              <p className="text-white/80 text-sm mb-6">
                Our technical engineers can verify compatibility for your specific network topology.
              </p>
              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="block w-full bg-white text-primary font-bold py-2.5 rounded-lg text-sm hover:bg-slate-100 transition-colors text-center"
                >
                  Talk to an Engineer
                </Link>
                <Link
                  href="/support"
                  className="block w-full border border-white/30 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-white/10 transition-colors text-center"
                >
                  Request Test
                </Link>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Router className="size-5 text-primary" />
                Hardware Compatibility Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BRAND_GUIDES.map((brand) => (
                  <div
                    key={brand.name}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{brand.name}</h3>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {brand.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary flex items-center gap-1"
                          >
                            <FileText className="size-4 shrink-0" />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="#"
                      className="mt-auto text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1 hover:underline"
                    >
                      View All {brand.name} Guides
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Download className="size-5 text-primary" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Firmware & Driver Updates
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-medium">Last updated: Oct 24, 2023</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-4 py-3">
                        Product Family
                      </th>
                      <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-4 py-3">
                        Version
                      </th>
                      <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-4 py-3">
                        Release Date
                      </th>
                      <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-4 py-3">
                        Size
                      </th>
                      <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-4 py-3">
                        Status
                      </th>
                      <th className="text-right text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FIRMWARE_ROWS.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="font-bold text-slate-800 dark:text-white px-4 py-3">
                          {row.family}
                        </td>
                        <td className="font-mono text-slate-600 dark:text-slate-400 px-4 py-3">
                          {row.version}
                        </td>
                        <td className="text-slate-500 px-4 py-3">{row.date}</td>
                        <td className="text-slate-500 px-4 py-3">{row.size}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              row.status === "Stable"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : row.status === "New"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  : row.status === "Critical"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                    : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="text-right px-4 py-3">
                          <button
                            type="button"
                            className="text-primary hover:text-primary/80 p-1"
                            aria-label="Download"
                          >
                            <Download className="size-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  className="text-xs font-bold text-slate-500 hover:text-primary uppercase tracking-widest flex items-center gap-1 mx-auto"
                >
                  <History className="size-4" />
                  See Full Update History
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="#"
                className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex items-start gap-4 hover:border-primary/40 transition-colors group"
              >
                <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors flex items-center justify-center shrink-0">
                  <Terminal className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    Compatibility Test Bench
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Submit a request to have our lab run a specific hardware combination test.
                  </p>
                </div>
              </Link>
              <Link
                href="#"
                className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex items-start gap-4 hover:border-primary/40 transition-colors group"
              >
                <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors flex items-center justify-center shrink-0">
                  <BookOpen className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    Documentation Library
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Access full whitepapers, case studies on interoperability, and architectural
                    blueprints.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
