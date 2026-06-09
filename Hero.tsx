import { Button } from "@/components/ui/button";
import { Calculator, Mic, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/contexts/AppProviders";

const Hero = () => {
  const { t } = useApp();
  const ROTATING = [t("hero.rotate.0"), t("hero.rotate.1"), t("hero.rotate.2"), t("hero.rotate.3")];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setIdx((x) => (x + 1) % ROTATING.length), 2200);
    return () => clearInterval(i);
  }, [ROTATING.length]);

  return (
    <section className="relative pt-10 pb-14 sm:pt-16 sm:pb-24 overflow-hidden">
      <div className="container relative z-10 text-center max-w-6xl">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-6 sm:mb-8 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          {t("hero.badge")}
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.15] sm:leading-[1.05] tracking-tight animate-fade-in-up">
          <span className="block">{t("hero.line1")}</span>
          <span className="block mt-2">{t("hero.line2")}</span>
          <span className="block mt-2 h-[1.25em] sm:h-[1.15em] relative">
            <span key={idx} className="gradient-text whitespace-nowrap animate-fade-in-up inline-block">
              {ROTATING[idx]}
            </span>
          </span>
        </h1>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <Button asChild variant="hero" size="xl">
            <a href="#try-agent"><Mic className="mr-2 h-5 w-5" /> {t("hero.cta.book")}</a>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href="#calculator"><Calculator className="mr-2 h-5 w-5" /> {t("hero.cta.calc")}</a>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-2xl p-6 sm:p-7 text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text font-display leading-none">{t(`hero.stat.${i}.v`)}</div>
              <div className="text-sm sm:text-base text-muted-foreground mt-3 uppercase tracking-wider">{t(`hero.stat.${i}.l`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
