import { useApp } from "@/contexts/AppProviders";

const Metrics = () => {
  const { t } = useApp();
  return (
    <section className="py-10 sm:py-16 relative">
      <div className="container max-w-6xl">
        <div className="glass-strong rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-display gradient-text leading-none">
                {t(`met.${i}.v`)}
              </div>
              <div className="mt-3 text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
                {t(`met.${i}.l`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
