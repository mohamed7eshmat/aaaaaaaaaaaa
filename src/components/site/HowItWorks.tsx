import { Plug, BrainCircuit, TrendingUp } from "lucide-react";
import { useApp } from "@/contexts/AppProviders";

const HowItWorks = () => {
  const { t } = useApp();
  const steps = [
    { icon: Plug, title: t("how.s1.t"), desc: t("how.s1.d"), num: "01" },
    { icon: BrainCircuit, title: t("how.s2.t"), desc: t("how.s2.d"), num: "02" },
    { icon: TrendingUp, title: t("how.s3.t"), desc: t("how.s3.d"), num: "03" },
  ];
  return (
    <section id="how" className="py-12 sm:py-20 relative">
      <div className="container max-w-6xl">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">{t("how.kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-bold font-display">
            {t("how.title.a")} <span className="gradient-text">{t("how.title.b")}</span>{t("how.title.c")}
          </h2>
        </div>
        <div className="relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {steps.map((s, i) => (
            <div key={s.title} className="glass-strong rounded-3xl p-8 hover-lift relative group text-center md:text-start">
              <div className="absolute -top-3 -right-3 text-7xl font-bold font-display text-primary/10 group-hover:text-primary/30 transition-colors">{s.num}</div>
              <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary glow-primary mb-6 animate-pulse-glow mx-auto md:mx-0" style={{ animationDelay: `${i * 0.5}s` }}>
                <s.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
