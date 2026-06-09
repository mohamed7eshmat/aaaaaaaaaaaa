import { MessageCircle, Zap, Globe, Activity, Clock, Rocket } from "lucide-react";
import { useApp } from "@/contexts/AppProviders";

const WhyChoose = () => {
  const { t } = useApp();
  const features = [
    { icon: MessageCircle, title: t("why.f1.t"), desc: t("why.f1.d") },
    { icon: Zap, title: t("why.f2.t"), desc: t("why.f2.d") },
    { icon: Globe, title: t("why.f3.t"), desc: t("why.f3.d") },
    { icon: Activity, title: t("why.f4.t"), desc: t("why.f4.d") },
    { icon: Clock, title: t("why.f5.t"), desc: t("why.f5.d") },
    { icon: Rocket, title: t("why.f6.t"), desc: t("why.f6.d") },
  ];
  return (
    <section id="why" className="py-12 sm:py-20 relative">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">{t("why.kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-bold font-display">
            {t("why.title.a")} <span className="gradient-text">{t("why.title.b")}</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-strong rounded-2xl p-7 hover-lift group text-center sm:text-start">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary mb-5 group-hover:scale-110 transition-transform mx-auto sm:mx-0">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
