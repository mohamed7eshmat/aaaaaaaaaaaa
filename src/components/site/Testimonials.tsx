import { Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/contexts/AppProviders";

const ITEMS_EN = [
  { name: "Sarah M.", role: "Dental Clinic Owner", quote: "Mujeb booked dozens of new patients in our first month. It pays for itself within weeks." },
  { name: "Omar K.", role: "Real Estate CEO", quote: "Our AI agent qualifies leads in multiple languages flawlessly. We stopped losing weekend inquiries entirely." },
  { name: "James C.", role: "Auto Service Manager", quote: "Setup was quick. Now every after-hours call becomes a booking. ROI was obvious within weeks." },
  { name: "Layla H.", role: "Aesthetics Founder", quote: "Indistinguishable from a top-tier human receptionist. Clients keep complimenting the professionalism." },
  { name: "Daniel R.", role: "Law Firm Partner", quote: "We used to miss 30% of inbound calls. With Mujeb it's effectively zero — every lead gets a real conversation." },
  { name: "Hana S.", role: "Med Spa Owner", quote: "Bookings went up by more than half in two months. The voice quality is genuinely impressive." },
  { name: "Khaled A.", role: "Property Manager", quote: "Tenants get instant answers 24/7 and our team finally focuses on real work instead of phone tag." },
  { name: "Mira T.", role: "Veterinary Clinic", quote: "Pet owners love it. The agent handles bookings and basic questions exactly like our front desk would." },
  { name: "Ethan B.", role: "Home Services CEO", quote: "Every missed call used to mean a lost job. Mujeb turned weekends into our highest-booking days." },
  { name: "Yara N.", role: "Boutique Hotel Owner", quote: "Reservations no longer slip through the cracks. The agent even upsells room categories naturally." },
  { name: "Marcus P.", role: "Fitness Studio Founder", quote: "Trial sign-ups doubled. The AI handles objections better than half the humans I've hired." },
  { name: "Noor F.", role: "Beauty Clinic Director", quote: "Indistinguishable from a real receptionist — and it never calls in sick. Best operations decision this year." },
];

const ITEMS_AR = [
  { name: "سارة م.", role: "مالكة عيادة أسنان", quote: "حجز مُجيب لنا عشرات المرضى الجدد في أول شهر. يستردّ تكلفته خلال أسابيع." },
  { name: "عمر ك.", role: "الرئيس التنفيذي لشركة عقارية", quote: "وكيلنا يؤهّل العملاء بالعربية والإنجليزية باحتراف. لم نعد نخسر استفسارات الإجازات." },
  { name: "جيمس س.", role: "مدير خدمات سيارات", quote: "الإعداد كان سريعًا. كل مكالمة بعد ساعات العمل تتحول لحجز. العائد واضح خلال أسابيع." },
  { name: "ليلى ح.", role: "مؤسِّسة عيادة تجميل", quote: "لا يمكن تمييزه عن موظف استقبال محترف. العملاء يثنون باستمرار على المهنية." },
  { name: "دانيال ر.", role: "شريك في مكتب محاماة", quote: "كنا نفوّت 30% من المكالمات. مع مُجيب تقريبًا صفر — كل عميل يحصل على محادثة حقيقية." },
  { name: "هناء ش.", role: "مالكة سبا طبي", quote: "الحجوزات ارتفعت بأكثر من النصف في شهرين. جودة الصوت مذهلة فعلًا." },
  { name: "خالد ع.", role: "مدير عقارات", quote: "المستأجرون يحصلون على ردود فورية 24/7، وفريقنا أخيرًا يركّز على العمل الحقيقي." },
  { name: "ميرا ت.", role: "عيادة بيطرية", quote: "أصحاب الحيوانات يحبّونه. الوكيل يتعامل مع الحجوزات والاستفسارات تمامًا كموظفي الاستقبال." },
  { name: "إيثان ب.", role: "مدير شركة خدمات منزلية", quote: "كل مكالمة فائتة كانت تعني وظيفة ضائعة. مُجيب حوّل الإجازات لأكثر أيامنا حجزًا." },
  { name: "يارا ن.", role: "مالكة فندق بوتيك", quote: "لم تعد الحجوزات تضيع. الوكيل حتى يقترح ترقيات الغرف بشكل طبيعي." },
  { name: "ماركوس ب.", role: "مؤسس استوديو لياقة", quote: "تجارب الاشتراكات تضاعفت. الذكاء يتعامل مع الاعتراضات أفضل من نصف من وظّفتهم." },
  { name: "نور ف.", role: "مديرة عيادة تجميل", quote: "لا يُفرّق عن موظف استقبال حقيقي — ولا يمرض أبدًا. أفضل قرار تشغيلي هذا العام." },
];

const SET = 4;

const Testimonials = () => {
  const { t, locale } = useApp();
  const items = locale === "ar" ? ITEMS_AR : ITEMS_EN;
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setSeed((s) => s + 1), 6000);
    return () => clearInterval(i);
  }, []);

  const visible = useMemo(() => {
    const start = (seed * SET) % items.length;
    return Array.from({ length: SET }, (_, i) => items[(start + i) % items.length]);
  }, [seed, items]);

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">{t("tst.kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-bold font-display">
            {t("tst.title.a")} <span className="gradient-text">{t("tst.title.b")}</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {visible.map((tItem, idx) => (
            <div key={`${seed}-${idx}`} className="glass-strong rounded-2xl p-7 hover-lift animate-fade-in">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg leading-relaxed">"{tItem.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground">
                  {tItem.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{tItem.name}</div>
                  <div className="text-xs text-muted-foreground">{tItem.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
