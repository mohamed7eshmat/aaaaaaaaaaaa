import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";
import { CalendarCheck, Loader2, CheckCircle2 } from "lucide-react";
import { useApp } from "@/contexts/AppProviders";

const WEBHOOK = "https://hook.us2.make.com/jf58llwjm4zv8rlh3o5quj47291dr949";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().max(1000).optional(),
});

const CTASection = () => {
  const { toast } = useToast();
  const { t } = useApp();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: t("cta.toast.invalid.t"), description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, source: "mujeb_contact_form", timestamp: new Date().toISOString() }),
      });
      setDone(true);
      toast({ title: t("cta.toast.received.t"), description: t("cta.toast.received.d") });
    } catch {
      toast({ title: t("cta.toast.fail.t"), description: t("cta.toast.fail.d"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 sm:py-20 relative">
      <div className="container max-w-6xl">
        <div className="relative glass-strong rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 overflow-hidden glow-primary">
          <div className="absolute inset-0 bg-gradient-hero opacity-10 animate-gradient" />
          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight">
                {t("cta.title.a")} <span className="gradient-text">{t("cta.title.b")}</span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground">{t("cta.subtitle")}</p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[t("cta.b1"), t("cta.b2"), t("cta.b3")].map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> {x}
                  </li>
                ))}
              </ul>
            </div>

            {done ? (
              <div className="glass rounded-2xl p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-display font-bold">{t("cta.thanks")}, {form.name.split(" ")[0]}!</h3>
                <p className="mt-2 text-muted-foreground">{t("cta.thanksDesc")}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="glass rounded-2xl p-5 sm:p-6 md:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="c-name">{t("cta.f.name")}</Label>
                    <Input id="c-name" value={form.name} onChange={update("name")} maxLength={100} required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="c-phone">{t("cta.f.phone")}</Label>
                    <Input id="c-phone" type="tel" value={form.phone} onChange={update("phone")} maxLength={30} required className="mt-1.5" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="c-email">{t("cta.f.email")}</Label>
                    <Input id="c-email" type="email" value={form.email} onChange={update("email")} maxLength={255} required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="c-company">{t("cta.f.company")}</Label>
                    <Input id="c-company" value={form.company} onChange={update("company")} maxLength={120} className="mt-1.5" placeholder={t("cta.f.companyOpt")} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="c-message">{t("cta.f.message")}</Label>
                  <Textarea id="c-message" value={form.message} onChange={update("message")} maxLength={1000} rows={3} className="mt-1.5" placeholder={t("cta.f.messagePh")} />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CalendarCheck className="mr-2 h-4 w-4" />}
                  {t("cta.f.submit")}
                </Button>
                <p className="text-[11px] text-muted-foreground text-center">{t("cta.f.disclaimer")}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
