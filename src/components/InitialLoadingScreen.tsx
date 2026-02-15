export function InitialLoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-6 bg-background-light dark:bg-background-dark"
      role="status"
      aria-label="Loading"
    >
      <div
        className="size-12 animate-spin rounded-full border-4 border-slate-200 border-t-primary dark:border-slate-700 dark:border-t-primary"
        aria-hidden
      />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        Loading…
      </p>
    </div>
  );
}
