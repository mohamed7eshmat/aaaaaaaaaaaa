import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowRight, Loader2, TrendingDown } from "lucide-react";
import { useApp } from "@/contexts/AppProviders";

const schema = z.object({
  missedCalls: z.number().min(0).max(100000),
  dealValue: z.number().min(0).max(10000000),
  conversionRate: z.number().min(0).max(100),
});

const WHATSAPP = "https://wa.me/16066137832";
const WEBHOOK = "https://hook.us2.make.com/jf58llwjm4zv8rlh3o5quj47291dr949";

const Calculator = () => {
  const { toast } = useToast();
  const { t } = useApp();
  const [missedCalls, setMissedCalls] = useState(150);
  const [dealValue, setDealValue] = useState(500);
  const [conversionRate, setConversionRate] = useState(25);
  const [submitting, setSubmitting] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const results = useMemo(() => {
    const lostLeads = missedCalls;
    const potentialBookings = Math.round(missedCalls * (conversionRate / 100));
    const monthlyLoss = potentialBookings * dealValue;
    const missedOpportunities = Math.round(missedCalls * 12);
    return { lostLeads, potentialBookings, monthlyLoss, missedOpportunities };
  }, [missedCalls, dealValue, conversionRate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ missedCalls, dealValue, conversionRate });
    if (!parsed.success) {
      toast({ title: t("cta.toast.invalid.t"), description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, ...results, source: "mujeb_calculator", timestamp: new Date().toISOString() }),
      });
      setRevealed(true);
      toast({ title: t("cta.toast.received.t"), description: t("cta.toast.received.d") });
    } catch {
      toast({ title: t("cta.toast.fail.t"), description: t("cta.toast.fail.d"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-10 sm:py-16 lg:py-20 relative">
      <div className="container max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">{t("calc.kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-bold font-display">
            {t("calc.title.a")} <span className="gradient-text">{t("calc.title.b")}</span> {t("calc.title.c")}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong rounded-3xl sm:rounded-[2rem] p-2 sm:p-2 glow-violet max-w-3xl lg:max-w-none mx-auto">
          <div className="grid lg:grid-cols-2 gap-2">
            <div className="order-1 p-4 sm:p-8 lg:p-10 space-y-5 sm:space-y-6">
              <SliderField label={t("calc.missed")} value={missedCalls} setValue={setMissedCalls} min={0} max={2000} step={10} suffix=" calls" />
              <SliderField label={t("calc.deal")} value={dealValue} setValue={setDealValue} min={50} max={10000} step={50} prefix="$" />
              <SliderField label={t("calc.conv")} value={conversionRate} setValue={setConversionRate} min={1} max={100} step={1} suffix="%" />
            </div>

            <div className="order-2 relative rounded-2xl sm:rounded-[1.75rem] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4 sm:p-8 lg:p-10 border border-border overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
              <div className="relative">
                <h3 className="text-lg sm:text-2xl font-display font-bold mb-4 sm:mb-6 text-center lg:text-start">{t("calc.snapshot")}</h3>
                <div className={`text-center py-5 sm:py-6 mb-4 sm:mb-6 glass rounded-2xl px-3 ${revealed ? "animate-scale-in" : ""}`}>
                  <div className="text-[11px] sm:text-xs uppercase tracking-widest text-muted-foreground">{t("calc.monthly")}</div>
                  <div className="mt-2 text-[clamp(1.5rem,9vw,3.75rem)] font-bold font-display gradient-text leading-tight tabular-nums break-words">
                    ${results.monthlyLoss.toLocaleString()}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs text-muted-foreground break-words">≈ ${(results.monthlyLoss * 12).toLocaleString()} {t("calc.perYear")}</div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <ResultStat label={t("calc.lostLeads")} value={results.lostLeads.toLocaleString()} />
                  <ResultStat label={t("calc.potBookings")} value={results.potentialBookings.toLocaleString()} />
                  <ResultStat label={t("calc.missedYr")} value={results.missedOpportunities.toLocaleString()} />
                </div>
              </div>
            </div>

            <div className="order-3 lg:col-span-2 px-4 pb-4 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
              <div className="grid sm:grid-cols-2 gap-3">
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <TrendingDown className="mr-2 h-4 w-4" />}
                  {t("calc.submit")}
                </Button>
                <Button asChild variant="glass" size="lg" className="w-full">
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">{t("sticky.whatsapp")}</a>
                </Button>
              </div>
              <Button asChild variant="glass" size="lg" className="w-full mt-3">
                <a href="#contact">{t("calc.bookCall")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" /></a>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const SliderField = ({ label, value, setValue, min, max, step, prefix = "", suffix = "" }: any) => (
  <div>
    <div className="flex items-center justify-between mb-2 gap-2">
      <Label className="text-sm">{label}</Label>
      <span className="font-display font-semibold text-primary text-sm sm:text-base">{prefix}{value.toLocaleString()}{suffix}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))}
      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary" />
  </div>
);

const ResultStat = ({ label, value }: { label: string; value: string }) => (
  <div className="glass rounded-xl p-2 sm:p-4 text-center min-w-0">
    <div className="text-base sm:text-2xl font-bold font-display text-primary tabular-nums break-words leading-tight">{value}</div>
    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground mt-1 leading-tight break-words">{label}</div>
  </div>
);

export default Calculator;
