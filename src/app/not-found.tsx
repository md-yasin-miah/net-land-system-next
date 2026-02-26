import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light px-6 py-12 text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 flex size-24 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FileQuestion className="size-12" strokeWidth={1.5} />
        </div>

        {/* 404 badge */}
        <p className="mb-2 font-mono text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          The page you’re looking for doesn’t exist or has been moved. Check the
          URL or head back to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="shadow-sm">
            <Link href={Routes.home}>Go to homepage</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={Routes.support.index}>Support</Link>
          </Button>
        </div>

        {/* Optional: back link */}
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-500">
          <Link
            href={Routes.home}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Net Land System Bangladesh
          </Link>
        </p>
      </div>
    </div>
  );
}
