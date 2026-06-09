import { useEffect, useState } from "react";
import { useApp } from "@/contexts/AppProviders";
import { Sparkles, Mic } from "lucide-react";
import VoiceCallPanel from "./VoiceCallPanel";

const VoiceWidget = () => {
  const { t } = useApp();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="try-agent" className="py-10 sm:py-16 lg:py-20 relative">
      <div className="container max-w-6xl">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t("widget.kicker")}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-bold font-display">
            {t("widget.title.a")} <span className="gradient-text">{t("widget.title.b")}</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("widget.subtitle")}
          </p>
        </div>

        <div className="glass-strong rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 lg:p-12 glow-violet relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium mb-5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {t("widget.badge")}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold leading-tight">
                {t("widget.cardTitle")}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("widget.cardDesc")}</p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[t("widget.b1"), t("widget.b2"), t("widget.b3")].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              {mounted ? (
                <VoiceCallPanel />
              ) : (
                <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[320px] sm:min-h-[360px] text-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center glow-primary mb-5">
                    <Mic className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">…</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceWidget;
