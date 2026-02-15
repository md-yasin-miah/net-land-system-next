import Link from 'next/link';
import { ecommerceSidebarCategories } from '@/lib/menu';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-slate-800 rounded shadow-sm border border-slate-200 dark:border-slate-700 hidden lg:block overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-700">
        <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">
          Hardware Categories
        </h3>
      </div>
      <nav className="flex flex-col">
        {ecommerceSidebarCategories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="px-4 py-2.5 flex items-center justify-between hover:bg-primary/10 hover:text-primary transition-colors text-sm group"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">
                {category.icon}
              </span>
              <span>{category.name}</span>
            </div>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
