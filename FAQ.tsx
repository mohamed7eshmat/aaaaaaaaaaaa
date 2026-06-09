import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useApp } from "@/contexts/AppProviders";

const FAQ = () => {
  const { t } = useApp();
  const faqs = [1, 2, 3, 4, 5, 6].map((i) => ({ q: t(`faq.q${i}`), a: t(`faq.a${i}`) }));
  return (
    <section id="faq" className="py-12 sm:py-20 relative">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">{t("faq.kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-bold font-display">
            {t("faq.title.a")} <span className="gradient-text">{t("faq.title.b")}</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="glass-strong rounded-2xl px-6">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="border-border">
              <AccordionTrigger className="text-start font-display font-semibold hover:no-underline text-base sm:text-lg md:text-xl py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
