import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { useApp } from "@/contexts/AppProviders";

const Pricing = () => {
  const { t } = useApp();
  const bullets = [
    t("pricing.flex.b1"),
    t("pricing.flex.b2"),
    t("pricing.flex.b3"),
    t("pricing.flex.b4"),
    t("pricing.flex.b5"),
  ];

  return (
    <section id="pricing" className="py-12 sm:py-20 relative">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t("pricing.kicker")}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-bold font-display">
            {t("pricing.flex.title.a")}{" "}
            <span className="gradient-text">{t("pricing.flex.title.b")}</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.flex.note")}
          </p>
        </div>

        <div className="relative glass-strong rounded-3xl p-8 sm:p-12 glow-primary overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Sparkles className="h-3 w-3" /> {t("pricing.flex.badge")}
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl font-display font-bold leading-tight">
                {t("pricing.flex.heading")}
              </h3>
              <p className="mt-3 text-muted-foreground">{t("pricing.flex.desc")}</p>
              <Button asChild variant="hero" size="lg" className="mt-6">
                <a href="#contact">
                  {t("pricing.flex.cta")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                </a>
              </Button>
            </div>

            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <span className="text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
