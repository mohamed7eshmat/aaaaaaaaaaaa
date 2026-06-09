import { useCallback, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { useApp } from "@/contexts/AppProviders";
import { Mic, PhoneCall, PhoneOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AGENT_ID = "agent_5901ks3kdmy3emhsgqqazkx9t2qn";

const VoiceCallPanelInner = () => {
  const { locale } = useApp();
  const [starting, setStarting] = useState(false);

  const conversation = useConversation({
    onError: (err: unknown) => {
      console.error("ElevenLabs error", err);
      toast({
        variant: "destructive",
        title: locale === "ar" ? "تعذّر بدء المكالمة" : "Could not start call",
        description:
          locale === "ar"
            ? "تأكد من السماح بالوصول إلى الميكروفون وحاول مرة أخرى."
            : "Please allow microphone access and try again.",
      });
    },
  });

  const isConnected = conversation.status === "connected";
  const isSpeaking = conversation.isSpeaking;

  const start = useCallback(async () => {
    if (isConnected || starting) return;
    setStarting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: locale === "ar" ? "الميكروفون مطلوب" : "Microphone required",
        description:
          locale === "ar"
            ? "يرجى منح الإذن للميكروفون لبدء المحادثة."
            : "Please allow microphone access to start the conversation.",
      });
    } finally {
      setStarting(false);
    }
  }, [conversation, isConnected, starting, locale]);

  const stop = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[320px] sm:min-h-[360px] text-center">
      <div
        className={`relative h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center glow-primary mb-5 ${
          isConnected ? "animate-pulse-glow" : ""
        }`}
      >
        <Mic className="h-8 w-8 text-primary-foreground" />
        {isConnected && (
          <span className="absolute inset-0 rounded-full ring-2 ring-primary/40 animate-ping" />
        )}
      </div>

      <p className="text-xs uppercase tracking-widest text-muted-foreground/80 mb-1">
        {isConnected
          ? isSpeaking
            ? locale === "ar"
              ? "الوكيل يتحدث…"
              : "Agent speaking…"
            : locale === "ar"
              ? "ينصت إليك…"
              : "Listening…"
          : locale === "ar"
            ? "جاهز للاتصال"
            : "Ready to call"}
      </p>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">
        {isConnected
          ? locale === "ar"
            ? "تحدّث بشكل طبيعي — يمكنك المقاطعة في أي لحظة."
            : "Talk naturally — you can interrupt any time."
          : locale === "ar"
            ? "اضغط الزر بالأسفل لبدء مكالمة صوتية حية مع الوكيل."
            : "Tap the button below to start a live voice conversation."}
      </p>

      {!isConnected ? (
        <Button
          variant="hero"
          size="xl"
          onClick={start}
          disabled={starting}
          className="w-full sm:w-auto"
        >
          {starting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <PhoneCall className="mr-2 h-5 w-5" />
          )}
          {starting
            ? locale === "ar"
              ? "جارٍ الاتصال…"
              : "Connecting…"
            : locale === "ar"
              ? "ابدأ الاتصال الآن"
              : "Start the call now"}
        </Button>
      ) : (
        <Button variant="destructive" size="xl" onClick={stop} className="w-full sm:w-auto">
          <PhoneOff className="mr-2 h-5 w-5" />
          {locale === "ar" ? "إنهاء المكالمة" : "End call"}
        </Button>
      )}

      <p className="mt-4 text-xs text-muted-foreground/70">
        {locale === "ar"
          ? "اسمح بالوصول إلى الميكروفون عند الطلب."
          : "Allow microphone access when prompted."}
      </p>
    </div>
  );
};

const VoiceCallPanel = () => (
  <ConversationProvider>
    <VoiceCallPanelInner />
  </ConversationProvider>
);

export default VoiceCallPanel;
