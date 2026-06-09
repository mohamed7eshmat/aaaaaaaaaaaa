import { useApp } from "@/contexts/AppProviders";
import { MessageCircle, PhoneCall } from "lucide-react";

const WHATSAPP_NUMBER = "16066137832"; // international format without +
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const StickyMobileCTA = () => {
  const { t, locale } = useApp();
  const waLabel = t("sticky.whatsapp");
  const waAria = locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp";
  const callAria = locale === "ar" ? "ابدأ مكالمة صوتية" : "Start a voice call";
  const callLabel = locale === "ar" ? "اتصل بالوكيل" : "Call Agent";

  return (
    <>
      {/* WhatsApp — bottom left */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={waAria}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[60] inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-2xl ring-2 ring-white/20 h-14 w-14 sm:h-auto sm:w-auto sm:px-4 sm:py-3 justify-center sm:text-sm font-medium hover:scale-[1.03] transition-transform"
      >
        <MessageCircle className="h-7 w-7 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">{waLabel}</span>
      </a>

      {/* Voice agent — bottom right, themed */}
      <a
        href="#try-agent"
        aria-label={callAria}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground shadow-2xl ring-2 ring-white/20 glow-primary h-14 w-14 sm:h-auto sm:w-auto sm:px-4 sm:py-3 justify-center sm:text-sm font-semibold hover:scale-[1.03] transition-transform animate-pulse-glow"
      >
        <PhoneCall className="h-7 w-7 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">{callLabel}</span>
      </a>
    </>
  );
};

export default StickyMobileCTA;
