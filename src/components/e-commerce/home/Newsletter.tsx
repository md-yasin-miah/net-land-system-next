const Newsletter = () => {
  return (
    <section className="bg-primary/5 rounded-xl p-8 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-lg">
        <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">
          Stay Ahead in Tech
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Subscribe for exclusive enterprise deals, inventory updates, and networking guides specifically for the Bangladesh market.
        </p>
      </div>
      <div className="flex w-full md:w-auto gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 md:w-80 h-12 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 px-4 focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <button className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded font-bold transition-colors whitespace-nowrap">
          Subscribe Now
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
