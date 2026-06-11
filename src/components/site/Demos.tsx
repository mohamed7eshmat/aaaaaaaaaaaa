import { Button } from "@/components/ui/button";
import { Pause, Play, Stethoscope, Wind, HardHat, Scale } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/contexts/AppProviders";

import dental2 from "@/assets/dental-2.mp3.asset.json";
import dental3 from "@/assets/dental-3.mp3.asset.json";
import clinic from "@/assets/clinic.mp3.asset.json";
import airHvac from "@/assets/air-conditional-hvac.mp3.asset.json";
import constHvac from "@/assets/construction-hvac.mp3.asset.json";
import lawFirm from "@/assets/law-firm.mp3.asset.json";
import lawFirm2 from "@/assets/law-firm-2.mp3.asset.json";

type Demo = {
  id: string;
  icon: any;
  src: string;
  category: { en: string; ar: string };
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
};

const demos: Demo[] = [
  {
    id: "clinic",
    icon: Stethoscope,
    src: clinic.url,
    category: { en: "Healthcare", ar: "الرعاية الصحية" },
    title: { en: "Medical Clinic — Patient Intake", ar: "عيادة طبية — استقبال المرضى" },
    desc: {
      en: "Bilingual agent handling a clinic call: triage, booking, and confirmation.",
      ar: "وكيل ثنائي اللغة يدير مكالمة عيادة: فرز، حجز، وتأكيد.",
    },
  },
  {
    id: "dental2",
    icon: Stethoscope,
    src: dental2.url,
    category: { en: "Dental", ar: "طب الأسنان" },
    title: { en: "Dental Clinic — Appointment Booking", ar: "عيادة أسنان — حجز موعد" },
    desc: {
      en: "Agent qualifies a patient and books the next available appointment.",
      ar: "الوكيل يؤهّل المريض ويحجز أقرب موعد متاح.",
    },
  },
  {
    id: "dental3",
    icon: Stethoscope,
    src: dental3.url,
    category: { en: "Dental", ar: "طب الأسنان" },
    title: { en: "Dental Clinic — Follow-up & Reschedule", ar: "عيادة أسنان — متابعة وإعادة جدولة" },
    desc: {
      en: "Handles a follow-up call, reschedules and confirms via SMS.",
      ar: "يتعامل مع مكالمة متابعة، يعيد الجدولة، ويؤكّد عبر رسالة نصية.",
    },
  },
  {
    id: "airHvac",
    icon: Wind,
    src: airHvac.url,
    category: { en: "HVAC & Air Conditioning", ar: "تكييف وتبريد" },
    title: { en: "AC Service Request", ar: "طلب صيانة تكييف" },
    desc: {
      en: "Captures the issue, quotes a service window, and books the technician.",
      ar: "يستوعب المشكلة، يحدّد وقت الخدمة، ويحجز الفني.",
    },
  },
  {
    id: "constHvac",
    icon: HardHat,
    src: constHvac.url,
    category: { en: "Construction & HVAC", ar: "مقاولات وتكييف" },
    title: { en: "Project Inquiry — Construction", ar: "استفسار مشروع — مقاولات" },
    desc: {
      en: "Qualifies a project lead, captures scope, and routes to the right team.",
      ar: "يؤهّل عميل مشروع، يحدّد النطاق، ويحوّل للفريق المناسب.",
    },
  },
  {
    id: "law1",
    icon: Scale,
    src: lawFirm.url,
    category: { en: "Legal", ar: "خدمات قانونية" },
    title: { en: "Law Firm — Multilingual Intake", ar: "مكتب محاماة — استقبال بالعربية" },
    desc: {
      en: "Multilingual agent handling a sensitive legal inquiry with empathy.",
      ar: "وكيل عربي يدير استفسارًا قانونيًا حساسًا باحترام واحترافية.",
    },
  },
  {
    id: "law2",
    icon: Scale,
    src: lawFirm2.url,
    category: { en: "Legal", ar: "خدمات قانونية" },
    title: { en: "Law Firm — Case Qualification", ar: "مكتب محاماة — تأهيل قضية" },
    desc: {
      en: "Qualifies a potential client and schedules a consultation.",
      ar: "يؤهّل عميلًا محتملًا ويحدّد موعد استشارة.",
    },
  },
];

const formatTime = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

const DemoCard = ({
  demo,
  isPlaying,
  onPlay,
}: {
  demo: Demo;
  isPlaying: boolean;
  onPlay: (audio: HTMLAudioElement | null) => void;
}) => {
  const { locale } = useApp();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isPlaying && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      onPlay(a);
      a.play().catch(() => {});
    } else {
      a.pause();
      onPlay(null);
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-4 sm:p-6 lg:p-7 hover-lift group relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium">
            <demo.icon className="h-3.5 w-3.5 text-primary" />
            {demo.category[locale]}
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {formatTime(current)} / {formatTime(duration)}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-display font-bold mb-2">{demo.title[locale]}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{demo.desc[locale]}</p>

        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="shrink-0 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center glow-primary group-hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-primary-foreground" />
            ) : (
              <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
            )}
          </button>
          <div className="flex-1">
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={demo.src}
          preload="none"
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            const a = e.currentTarget;
            setCurrent(a.currentTime);
            setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
          }}
          onEnded={() => {
            setProgress(0);
            setCurrent(0);
            onPlay(null);
          }}
        />
      </div>
    </div>
  );
};

const Demos = () => {
  const { t } = useApp();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const INITIAL = 6;
  const [visible, setVisible] = useState(INITIAL);

  const handlePlay = (id: string) => (audio: HTMLAudioElement | null) => {
    if (audio && currentAudioRef.current && currentAudioRef.current !== audio) {
      currentAudioRef.current.pause();
    }
    currentAudioRef.current = audio;
    setPlayingId(audio ? id : null);
  };

  const shown = demos.slice(0, visible);
  const hasMore = visible < demos.length;

  return (
    <section id="demos" className="py-10 sm:py-16 lg:py-20 relative">
      <div className="container max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">{t("demos.kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-bold font-display">
            {t("demos.title.a")} <span className="gradient-text">{t("demos.title.b")}</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">{t("demos.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {shown.map((d) => (
            <DemoCard
              key={d.id}
              demo={d}
              isPlaying={playingId === d.id}
              onPlay={handlePlay(d.id)}
            />
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          {hasMore && (
            <Button variant="glass" size="lg" onClick={() => setVisible((v) => Math.min(v + 3, demos.length))}>
              {t("demos.loadMore")}
            </Button>
          )}
          <Button asChild variant="hero" size="lg">
            <a href="#contact">{t("demos.custom")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Demos;
