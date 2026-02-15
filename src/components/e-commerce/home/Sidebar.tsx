import Link from "next/link";
import { ChevronRight, Wifi, Boxes, Building2, Server, Cable, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ecommerceSidebarCategories } from "@/lib/menu";

const categoryIconMap: Record<string, LucideIcon> = {
  router: Wifi,
  switch: Boxes,
  wifi: Wifi,
  business_center: Building2,
  dns: Server,
  cable: Cable,
  shelves: Package,
};

const Sidebar = () => {
  return (
    <aside className="hidden w-64 overflow-hidden rounded border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:block">
      <div className="border-b border-slate-100 p-4 dark:border-slate-700">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Hardware Categories
        </h3>
      </div>
      <nav className="flex flex-col">
        {ecommerceSidebarCategories.map((category) => {
          const Icon = categoryIconMap[category.icon] ?? Boxes;
          return (
            <Link
              key={category.name}
              href={category.href}
              className="group flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <div className="flex items-center gap-3">
                <Icon className="size-5 shrink-0 text-slate-400 group-hover:text-primary" />
                <span>{category.name}</span>
              </div>
              <ChevronRight className="size-4 shrink-0 text-slate-400" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
