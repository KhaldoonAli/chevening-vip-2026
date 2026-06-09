"use client";

import { useMemo, useState } from "react";

// =====================================================================
// Chevening VIP Coaching, 2026, standalone landing page
// =====================================================================
// Single-page app. All copy in Arabic, RTL. Form submits via fetch to
// /api/submit which emails the application to khaldounbaniali@gmail.com
// via Resend. No database, no separate admin surface, the founder reads
// everything in his inbox.

// =====================================================================
// Copy
// =====================================================================

const COPY = {
  brand: "مُرشد",
  hero: {
    title: "مجموعة شيفنينغ VIP",
    sub: "التوجيه الشخصي المتميز للحصول على منحة شيفنينغ 2026",
    pill: "10 مقاعد فقط, إرشاد فردي مكثف",
  },
  about: {
    title: "عن منحة شيفنينغ 2026",
    dates: {
      title: "مواعيد التقديم على شيفنينغ 2026",
      status: "التقديم غير مفتوح حالياً",
      open: "يفتح التقديم: بداية أغسطس 2026",
      close: "يُغلق التقديم: 7 أكتوبر 2026",
      foot: "ابدأ التحضير من الآن مع مجموعة VIP لتكون جاهزاً يوم الفتح",
    },
    what: {
      title: "ما هي منحة شيفنينغ؟",
      lead: "منحة شيفنينغ هي منحة ماجستير ممولة بالكامل من الحكومة البريطانية, لمدة سنة دراسية واحدة في أي جامعة بريطانية وفي أي تخصص.",
      tiles: [
        { ic: "🎓", t: "رسوم الجامعة كاملة" },
        { ic: "💰", t: "راتب شهري للمعيشة" },
        { ic: "🏥", t: "التأمين الطبي" },
        { ic: "✈️", t: "تذاكر الطيران ذهاباً وإياباً" },
      ],
    },
    elig: {
      title: "شروط الأهلية للتقديم",
      reqs: [
        {
          n: "1",
          h: "الجنسية",
          b: "متاحة لجميع الجنسيات العربية باستثناء دول الخليج الست (السعودية, الإمارات, الكويت, قطر, البحرين, عُمان).",
        },
        {
          n: "2",
          h: "التخرج من البكالوريوس",
          b: "يجب أن يكون المتقدم قد تخرّج من درجة البكالوريوس قبل 7 أكتوبر 2024.",
        },
        {
          n: "3",
          h: "الخبرة العملية",
          b: "خبرة لا تقل عن سنتين (24 شهراً) بعد التخرج.",
          sub: "تشمل الخبرة: عمل بدوام كامل, عمل بدوام جزئي, أو عمل تطوعي.",
        },
      ],
      note: "ملاحظة مهمة: لا يُشترط تقديم اختبار IELTS أو أي اختبار لغة إنجليزية للتقديم على منحة شيفنينغ. الاختبار مطلوب فقط للجامعات بعد قبول المنحة.",
    },
  },
  alert: {
    title: "تنبيه مهم, اقرأ بعناية قبل التقديم",
    p1: "المقاعد محدودة: 10 طلاب فقط | الرسوم: $500 مدفوعة مقدماً | التسجيل حتى نفاد المقاعد.",
    p2: "يُرجى تقديم الطلب فقط إذا كنت موافق على جميع التفاصيل المذكورة أدناه.",
  },
  criteria: {
    title: "المقاعد تنافسية, معايير الاختيار",
    rows: [
      { ic: "⚡", t: "سرعة الاستجابة: الأولوية للمتقدمين الأوائل" },
      { ic: "🎯", t: "الجاهزية: نختار الطلاب الأكثر استعداداً والتزاماً" },
      { ic: "📈", t: "جودة الطلب: اكتمال البيانات ووضوح الأهداف" },
    ],
    foot: "لا تتأخر, المقاعد محدودة والطلب عالٍ",
  },
  mentor: {
    title: "عن المرشد وخبرتنا في شيفنينغ",
    rows: [
      { ic: "🎓", t: "المرشد حاصل على منحة شيفنينغ شخصياً" },
      { ic: "📚", t: "6 سنوات من الخبرة في توجيه طلاب شيفنينغ" },
      { ic: "🏆", t: "معدل النجاح: 1 من كل 3 طلاب يحصل على المنحة سنوياً من استشاراتنا" },
    ],
    disclaimer:
      "تنويه: البرنامج لا يضمن الحصول على المنحة, لكن بناءً على خبرتنا نعرف كيفية إعداد طلب قوي وما يجب فعله لتقديم أفضل طلب ممكن.",
  },
  included: {
    title: "ما تتضمنه مجموعة VIP",
    features: [
      "خطة شخصية مخصصة لملفك",
      "اجتماع فردي كل أسبوعين",
      "تدريب على المقابلة الشخصية",
      "مراجعة شاملة لجميع المستندات",
      "ضمان جودة الطلب 100%",
      "متابعة دورية والإجابة خلال ساعتين عن أي استفسار",
      "استراتيجية اختيار الجامعات والمدن",
      "إرشاد اختيار التخصص المناسب",
      "تطوير المهارات القيادية والشخصية",
      "خطة التحضير من الآن حتى نوفمبر",
      "التحضير لاختبارات اللغة الإنجليزية",
      "بناء الشبكة المهنية والأكاديمية",
    ],
  },
  bonuses: {
    title: "مكافآت إضافية مجانية بقيمة $200",
    boxes: [
      { ic: "📕", t: "الوصول الكامل لكورس شيفنينغ", v: "قيمة: $100, مجاناً لأعضاء VIP" },
      { ic: "🎯", t: "مقابلة تجريبية للمرشحين النهائيين", v: "قيمة: $100, مجاناً لأعضاء VIP" },
    ],
    sum: "المجموع: $500 التوجيه الفردي + $200 مكافآت = $700 بسعر $500 فقط!",
  },
  methodology: {
    title: "منهجية التحضير الشاملة (يوليو, نوفمبر 2026)",
    sub: "خطة العمل الشهرية المفصلة",
    months: [
      {
        h: "يوليو 2026, شهر الأسس",
        accent: "blue",
        items: [
          "تحليل شامل لملفك الأكاديمي والمهني",
          "اختيار التخصص الأمثل بناءً على خلفيتك وأهدافك",
          "وضع قائمة أولية بأفضل 10 جامعات مناسبة",
          "بداية تطوير المهارات القيادية والعمل التطوعي",
        ],
      },
      {
        h: "أغسطس 2026, شهر التخصص",
        accent: "yellow",
        items: [
          "اختيار نهائي للتخصص والجامعات الثلاث",
          "دراسة مفصلة للمدن البريطانية وتكلفة المعيشة",
          "بداية كتابة المقالات الأربعة المطلوبة",
          "تطوير خطة الشبكة المهنية والتواصل",
        ],
      },
      {
        h: "سبتمبر 2026, شهر الكتابة",
        accent: "mint",
        items: [
          "إنهاء جميع المقالات المطلوبة",
          "مراجعة وتحسين السيرة الذاتية",
          "الحصول على خطابات التوصية",
          "التحضير المكثف لاختبار اللغة الإنجليزية",
        ],
      },
      {
        h: "أكتوبر 2026, شهر المراجعة",
        accent: "lavender",
        items: [
          "مراجعة شاملة لجميع الوثائق",
          "تدريب مكثف على المقابلة الشخصية",
          "التأكد من جميع المتطلبات الفنية",
          "المراجعة النهائية قبل التقديم",
        ],
      },
      {
        h: "نوفمبر 2026, شهر التقديم",
        accent: "green",
        items: [
          "تقديم الطلب الرسمي",
          "متابعة حالة الطلب",
          "التحضير لمرحلة ما بعد التقديم",
        ],
      },
    ],
  },
  schedule: {
    title: "الجدول الزمني للبرنامج",
    rows: [
      "يوليو 2026: بداية البرنامج, أول اجتماع فردي",
      "أغسطس 2026: فتح التقديم لمنحة شيفنينغ",
      "نوفمبر 2026: آخر موعد للتقديم, نهاية البرنامج",
    ],
  },
  commit: {
    title: "الالتزام المالي والشروط",
    payTitle: "تفاصيل الدفع والالتزام",
    payItems: [
      "الرسوم: $500 أمريكي (مدفوعة بالكامل مقدماً)",
      "لا يمكن استرداد الرسوم بعد بداية البرنامج في 1 يوليو 2026",
      "نحدد العدد بـ 10 طلاب فقط لضمان إعطاء كل طالب الوقت والاهتمام اللازم للنجاح",
    ],
    checks: [
      "أوافق على دفع رسوم البرنامج $500 مقدماً وأتفهم أنها غير قابلة للاسترداد بعد بداية البرنامج",
      "أتعهد بالحضور لجميع الاجتماعات المقررة كل أسبوعين والالتزام بمتطلبات البرنامج",
      "أؤكد جديتي في التقديم لمنحة شيفنينغ 2026 والاستفادة الكاملة من البرنامج",
      "أتفهم أن البرنامج لا يضمن الحصول على المنحة, لكنه يوفر الخبرة والتوجيه لإعداد أقوى طلب ممكن",
      "أؤكد أنني قرأت وفهمت جميع التفاصيل المذكورة وأوافق على تقديم الطلب بناءً عليها",
    ],
  },
  submit: "إرسال طلب الانضمام لمجموعة VIP",
  sending: "جارٍ الإرسال...",
  success: {
    h: "تم استلام طلبك بنجاح",
    p: "سنتواصل معك خلال 48 ساعة لتأكيد قبولك أو الاعتذار. شكراً لثقتك بنا.",
  },
  footer: "© 2026 مُرشد. جميع الحقوق محفوظة.",
};

// =====================================================================
// Eligible Arab countries (Gulf 6 excluded per Chevening 2026 rules)
// =====================================================================
const ARAB_COUNTRIES = [
  "الأردن",
  "فلسطين",
  "لبنان",
  "سوريا",
  "العراق",
  "مصر",
  "السودان",
  "ليبيا",
  "تونس",
  "الجزائر",
  "المغرب",
  "موريتانيا",
  "اليمن",
  "جيبوتي",
  "الصومال",
  "جزر القمر",
  "أخرى",
];

// =====================================================================
// Form schema
// =====================================================================

type FormState = Record<string, string | string[]>;

const PERSONAL_FIELDS = [
  { id: "name", label: "الاسم الكامل", req: true, kind: "input" as const },
  { id: "email", label: "البريد الإلكتروني", req: true, kind: "input" as const, type: "email" },
  { id: "phone", label: "رقم الهاتف (مع رمز الدولة)", req: true, kind: "input" as const, placeholder: "+962..." },
  { id: "ig", label: "حساب الإنستغرام", opt: "اختياري", kind: "input" as const, placeholder: "@username أو رابط الحساب" },
  { id: "age", label: "العمر", req: true, kind: "input" as const, type: "number" },
  { id: "nat", label: "الجنسية", req: true, kind: "select-country" as const },
  { id: "res", label: "البلد الحالي للإقامة", req: true, kind: "input" as const },
];

const ACADEMIC_FIELDS = [
  { id: "degree", label: "درجة البكالوريوس", req: true, kind: "input" as const, placeholder: "مثال: هندسة حاسوب" },
  { id: "gpa", label: "معدل البكالوريوس", req: true, kind: "input" as const, placeholder: "مثال: 3.5/4.0 أو 85%" },
  { id: "uni", label: "جامعة البكالوريوس", req: true, kind: "input" as const },
  { id: "year", label: "سنة التخرج", req: true, kind: "input" as const, type: "number" },
  {
    id: "masters",
    label: "هل لديك درجة ماجستير؟",
    kind: "select" as const,
    options: ["لا", "نعم"],
  },
];

const WORK_FIELDS = [
  {
    id: "years",
    label: "سنوات الخبرة العملية",
    req: true,
    kind: "select" as const,
    options: ["اختر سنوات الخبرة", "أقل من سنة", "1, 2 سنة", "3, 4 سنوات", "5+ سنوات"],
  },
  { id: "job", label: "الوظيفة الحالية", req: true, kind: "input" as const, placeholder: "مثال: مهندس برمجيات, مدرس, محاسب..." },
  {
    id: "jobDesc",
    label: "وصف مختصر لخبرتك المهنية",
    req: true,
    kind: "textarea" as const,
    placeholder: "اذكر أهم المشاريع والإنجازات في عملك...",
  },
];

const GOALS_FIELDS = [
  {
    id: "major",
    label: "التخصص المرغوب دراسته في المملكة المتحدة",
    req: true,
    kind: "input" as const,
    placeholder: "مثال: إدارة الأعمال, هندسة الذكاء الاصطناعي, السياسة العامة...",
    helper: "سنساعدك في اختيار التخصص الأمثل بناءً على خلفيتك وأهدافك المستقبلية",
  },
  {
    id: "prefUni",
    label: "الجامعات المفضلة",
    opt: "اختياري",
    kind: "textarea" as const,
    placeholder: "اذكر أسماء الجامعات التي تفضل الدراسة بها...",
    helper: "سنرشدك لاختيار أفضل 3 جامعات تناسب ملفك ومناطق مناسبة للمعيشة",
  },
  {
    id: "costMatters",
    label: "هل التكلفة المعيشية مهمة في اختيارك؟",
    kind: "select" as const,
    options: ["لا, الأولوية لجودة التعليم", "نعم, إلى حد ما", "نعم, جداً"],
  },
  {
    id: "prefCity",
    label: "المدن المفضلة للدراسة",
    kind: "select" as const,
    options: ["لا توجد أفضلية محددة", "لندن", "إدنبرة", "مانشستر", "أوكسفورد", "كامبريدج", "أخرى"],
  },
  {
    id: "career",
    label: "أهدافك المهنية بعد التخرج",
    req: true,
    kind: "textarea" as const,
    placeholder: "كيف ستساهم هذه الدراسة في تطوير مسيرتك المهنية وخدمة بلدك؟",
    helper: "سنساعدك في ربط أهدافك بالتخصص والجامعة المناسبة",
  },
];

const ENGLISH_FIELDS = [
  {
    id: "engLevel",
    label: "مستوى اللغة الإنجليزية الحالي",
    req: true,
    kind: "select" as const,
    options: ["اختر مستواك", "مبتدئ", "متوسط", "متقدم", "متقن"],
    helper: "سنضع خطة لتحسين مستواك خلال السنة القادمة",
  },
  {
    id: "engTest",
    label: "هل خضعت لأي اختبار لغة إنجليزية؟",
    kind: "select" as const,
    options: ["لم أخضع لأي اختبار بعد", "IELTS", "TOEFL", "Duolingo", "أخرى"],
    helper: "لا داعي للقلق إن لم تختبر, ستحتاجه فقط للجامعات في 2027",
  },
];

const PREP_FIELDS = [
  {
    id: "preparing",
    label: "ما الذي تفعله حالياً للتحضير لطلب شيفنينغ؟",
    kind: "textarea" as const,
    placeholder: "مثال: تحسين اللغة الإنجليزية, العمل التطوعي, القراءة عن التخصص المرغوب...",
  },
  {
    id: "lead",
    label: "خبرة قيادية أو تطوعية",
    kind: "select" as const,
    options: ["لا توجد خبرة قيادية أو تطوعية", "خبرة محدودة", "خبرة متوسطة", "خبرة قوية"],
    helper: "سنساعدك في تطوير الخبرات القيادية المطلوبة",
  },
  {
    id: "network",
    label: "مستوى الشبكة المهنية",
    kind: "select" as const,
    options: ["شبكة محدودة", "شبكة متوسطة", "شبكة قوية"],
    helper: "سنعلمك كيف تبني شبكة مهنية قوية",
  },
  {
    id: "weak",
    label: "ما نقاط الضعف في ملفك التي تشعر أنها تحتاج تطوير؟",
    kind: "checks" as const,
    checks: ["الخبرة القيادية", "اللغة الإنجليزية", "بناء الشبكات", "العمل التطوعي", "مهارات المقابلة", "كتابة المقالات"],
    helper: "سنضع خطة مخصصة لتقوية كل نقطة ضعف في ملفك",
  },
  {
    id: "hours",
    label: "كم ساعة أسبوعياً يمكنك تخصيصها للتحضير لشيفنينغ؟",
    req: true,
    kind: "select" as const,
    options: ["اختر عدد الساعات", "5 ساعات", "10 ساعات", "15, 20 ساعة", "25+ ساعة"],
    helper: "سنصمم جدولك الشخصي بناءً على وقتك المتاح",
  },
];

const EXTRA_FIELDS = [
  {
    id: "appliedBefore",
    label: "هل قدمت من قبل لمنحة شيفنينغ؟",
    kind: "select" as const,
    options: ["لا, هذه المرة الأولى", "نعم, مرة واحدة", "نعم, أكثر من مرة"],
  },
  {
    id: "why",
    label: "لماذا تريد الانضمام لمجموعة VIP؟ (100, 200 كلمة)",
    req: true,
    kind: "textarea" as const,
    placeholder: "اشرح دوافعك للانضمام للمجموعة وكيف ستستفيد من التوجيه الفردي...",
    count: true,
  },
  {
    id: "urgency",
    label: "ما مدى استعجالك للحصول على المنحة؟",
    kind: "select" as const,
    options: ["يجب أن أحصل على المنحة هذا العام فقط", "أفضّل هذا العام لكن يمكن المحاولة العام القادم", "لا استعجال محدد"],
    helper: "هذا يساعدنا في تحديد كثافة وسرعة خطة التحضير",
  },
  {
    id: "more",
    label: "معلومات إضافية ترغب في ذكرها",
    opt: "اختياري",
    kind: "textarea" as const,
    placeholder: "أي معلومات أخرى قد تساعد في تقييم طلبك...",
  },
];

// =====================================================================
// Field renderer
// =====================================================================

type Field = {
  id: string;
  label: string;
  req?: boolean;
  opt?: string;
  kind: "input" | "textarea" | "select" | "select-country" | "checks";
  type?: string;
  placeholder?: string;
  options?: string[];
  checks?: string[];
  helper?: string;
  count?: boolean;
};

function CvField({
  f,
  value,
  onChange,
}: {
  f: Field;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
}) {
  return (
    <div className="chev-field">
      <label className="chev-label">
        {f.req && <span className="req">*</span>}
        {f.opt && <span className="opt">({f.opt})</span>}
        {f.label}
      </label>
      {f.kind === "input" && (
        <input
          className="chev-input"
          type={f.type || "text"}
          placeholder={f.placeholder || ""}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {f.kind === "textarea" && (
        <textarea
          className="chev-textarea"
          placeholder={f.placeholder || ""}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {f.kind === "select" && (
        <select
          className="chev-select"
          value={(value as string) || (f.options ? f.options[0] : "")}
          onChange={(e) => onChange(e.target.value)}
        >
          {f.options?.map((o, i) => (
            <option key={i} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
      {f.kind === "select-country" && (
        <select
          className="chev-select"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">اختر...</option>
          {ARAB_COUNTRIES.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}
      {f.kind === "checks" && (
        <div className="chev-check-grid">
          {f.checks?.map((c, i) => {
            const arr = Array.isArray(value) ? value : [];
            const on = arr.includes(c);
            return (
              <div
                key={i}
                className={"chev-cbox" + (on ? " is-on" : "")}
                onClick={() => {
                  const next = on ? arr.filter((x) => x !== c) : [...arr, c];
                  onChange(next);
                }}
              >
                <span className="box">{on ? "✓" : ""}</span>
                <span>{c}</span>
              </div>
            );
          })}
        </div>
      )}
      {f.count && (
        <div className="chev-count">
          {((value as string) || "").length} / 1500
        </div>
      )}
      {f.helper && <div className="chev-helper">{f.helper}</div>}
    </div>
  );
}

function FormSection({
  title,
  banner,
  fields,
  values,
  setValues,
}: {
  title: string;
  banner?: string;
  fields: Field[];
  values: FormState;
  setValues: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  return (
    <div className="chev-form-sub">
      <h3>{title}</h3>
      {banner && <div className="chev-info-banner">{banner}</div>}
      {fields.map((f) => (
        <CvField
          key={f.id}
          f={f}
          value={values[f.id]}
          onChange={(v) => setValues((s) => ({ ...s, [f.id]: v }))}
        />
      ))}
    </div>
  );
}

// =====================================================================
// Page
// =====================================================================

export default function Page() {
  const [personal, setPersonal] = useState<FormState>({});
  const [academic, setAcademic] = useState<FormState>({});
  const [work, setWork] = useState<FormState>({});
  const [goals, setGoals] = useState<FormState>({});
  const [english, setEnglish] = useState<FormState>({});
  const [prep, setPrep] = useState<FormState>({});
  const [extra, setExtra] = useState<FormState>({});
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allChecked = useMemo(() => checks.every(Boolean), [checks]);

  async function submit() {
    if (!allChecked || submitting) return;
    setError(null);

    // Minimal client-side validation (server re-validates)
    const required = [
      ["الاسم الكامل", personal.name],
      ["البريد الإلكتروني", personal.email],
      ["رقم الهاتف", personal.phone],
      ["العمر", personal.age],
      ["الجنسية", personal.nat],
      ["البلد الحالي للإقامة", personal.res],
      ["درجة البكالوريوس", academic.degree],
      ["معدل البكالوريوس", academic.gpa],
      ["جامعة البكالوريوس", academic.uni],
      ["سنة التخرج", academic.year],
      ["الوظيفة الحالية", work.job],
      ["وصف الخبرة المهنية", work.jobDesc],
      ["التخصص المرغوب", goals.major],
      ["أهدافك المهنية", goals.career],
      ["مستوى اللغة الإنجليزية", english.engLevel],
      ["لماذا تريد الانضمام", extra.why],
    ];
    for (const [label, val] of required) {
      if (!val || (typeof val === "string" && val.trim().length === 0)) {
        setError(`الحقل المطلوب ناقص: ${label}`);
        return;
      }
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personal, academic, work, goals, english, prep, extra }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "تعذّر إرسال الطلب. حاول مرة أخرى.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setError("تعذّر الاتصال بالخادم. تأكد من اتصالك بالإنترنت.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="chev">
        <div className="chev-wrap">
          <div className="chev-success">
            <div className="chev-success-mark">✓</div>
            <h2>{COPY.success.h}</h2>
            <p>{COPY.success.p}</p>
            <div className="chev-logo">{COPY.brand}</div>
          </div>
          <div className="chev-foot">{COPY.footer}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="chev">
      <div className="chev-wrap">
        {/* Hero */}
        <section className="chev-hero">
          <div className="chev-logo">{COPY.brand}</div>
          <h1>{COPY.hero.title}</h1>
          <p>{COPY.hero.sub}</p>
          <span className="chev-pill-yellow">⭐ {COPY.hero.pill}</span>
        </section>

        {/* About: dates, what, eligibility */}
        <section className="chev-about">
          <h2 className="chev-about-h">{COPY.about.title}</h2>

          <div className="chev-card is-gold">
            <h2>📅 {COPY.about.dates.title}</h2>
            <div className="chev-status-banner">⏰ {COPY.about.dates.status}</div>
            <div className="chev-dates-grid">
              <div className="chev-date is-open">🟢 {COPY.about.dates.open}</div>
              <div className="chev-date is-close">🔴 {COPY.about.dates.close}</div>
            </div>
            <div className="chev-dates-foot">{COPY.about.dates.foot}</div>
          </div>

          <div className="chev-card is-blue">
            <h2>🏆 {COPY.about.what.title}</h2>
            <p className="chev-lead">{COPY.about.what.lead}</p>
            <div className="chev-covers">
              {COPY.about.what.tiles.map((t, i) => (
                <div key={i} className="chev-cover">
                  <span className="chev-cover-ic">{t.ic}</span>
                  <div className="chev-cover-t">{t.t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="chev-card is-green">
            <h2>✅ {COPY.about.elig.title}</h2>
            <div className="chev-reqs">
              {COPY.about.elig.reqs.map((r, i) => (
                <div key={i} className="chev-req">
                  <span className="chev-req-num">{r.n}</span>
                  <div className="chev-req-body">
                    <h4>{r.h}</h4>
                    <p>{r.b}</p>
                    {r.sub && <div className="chev-req-sub">{r.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="chev-note-strip">
              <span className="chev-ic">✅</span>
              <span>{COPY.about.elig.note}</span>
            </div>
          </div>
        </section>

        {/* Alert */}
        <div className="chev-card is-red">
          <h2>⚠️ {COPY.alert.title}</h2>
          <p>{COPY.alert.p1}</p>
          <p>{COPY.alert.p2}</p>
        </div>

        {/* Criteria */}
        <div className="chev-card is-orange">
          <h2>🏆 {COPY.criteria.title}</h2>
          <ul className="chev-rows">
            {COPY.criteria.rows.map((r, i) => (
              <li key={i} className="chev-row">
                <span className="chev-ic">{r.ic}</span>
                <span>{r.t}</span>
              </li>
            ))}
          </ul>
          <div className="chev-foot-line">⏰ {COPY.criteria.foot}</div>
        </div>

        {/* Mentor */}
        <div className="chev-card is-purple">
          <h2>🎓 {COPY.mentor.title}</h2>
          <ul className="chev-rows">
            {COPY.mentor.rows.map((r, i) => (
              <li key={i} className="chev-row">
                <span className="chev-ic">{r.ic}</span>
                <span>{r.t}</span>
              </li>
            ))}
          </ul>
          <div className="chev-disclaimer">{COPY.mentor.disclaimer}</div>
        </div>

        {/* Included */}
        <div className="chev-card is-mint">
          <h2>🎯 {COPY.included.title}</h2>
          <div className="chev-feat-grid">
            {COPY.included.features.map((f, i) => (
              <div key={i} className="chev-feat">
                <span className="chev-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bonuses */}
        <div className="chev-card is-teal">
          <h2>🎁 {COPY.bonuses.title}</h2>
          <div className="chev-bonus-grid">
            {COPY.bonuses.boxes.map((b, i) => (
              <div key={i} className="chev-bonus">
                <span className="chev-bonus-ic">{b.ic}</span>
                <div className="chev-bonus-t">{b.t}</div>
                <div className="chev-bonus-v">{b.v}</div>
              </div>
            ))}
          </div>
          <div className="chev-bonus-sum">{COPY.bonuses.sum}</div>
        </div>

        {/* Methodology */}
        <div className="chev-card is-peach">
          <h2>📚 {COPY.methodology.title}</h2>
          <div className="chev-method-sub-title">📅 {COPY.methodology.sub}</div>
          <div className="chev-months">
            {COPY.methodology.months.map((m, i) => (
              <div key={i} className={`chev-month is-${m.accent}`}>
                <h4>{m.h}</h4>
                <ul>
                  {m.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="chev-card is-neutral">
          <h2>📅 {COPY.schedule.title}</h2>
          <div className="chev-sched">
            {COPY.schedule.rows.map((r, i) => (
              <div key={i} className="chev-sched-row">📅 {r}</div>
            ))}
          </div>
        </div>

        {/* Form sections */}
        <FormSection title="📋 المعلومات الشخصية" fields={PERSONAL_FIELDS} values={personal} setValues={setPersonal} />
        <FormSection title="📋 المؤهلات الأكاديمية" fields={ACADEMIC_FIELDS} values={academic} setValues={setAcademic} />
        <FormSection title="📋 الخبرة المهنية" fields={WORK_FIELDS} values={work} setValues={setWork} />
        <FormSection title="📋 أهداف الدراسة في المملكة المتحدة" fields={GOALS_FIELDS} values={goals} setValues={setGoals} />
        <FormSection
          title="📋 مهارات اللغة الإنجليزية"
          banner="📢 معلومة مهمة عن اللغة الإنجليزية: شيفنينغ لا تتطلب اختبار لغة إنجليزية للتقديم! سنقدم طلبك كاملاً بدون أي متطلب للغة الإنجليزية. اختبار اللغة مطلوب فقط للجامعات في يوليو 2027 (بعد سنة كاملة من الآن)"
          fields={ENGLISH_FIELDS}
          values={english}
          setValues={setEnglish}
        />
        <FormSection title="📋 التحضير والتطوير الشخصي" fields={PREP_FIELDS} values={prep} setValues={setPrep} />
        <FormSection title="📋 أسئلة إضافية" fields={EXTRA_FIELDS} values={extra} setValues={setExtra} />

        {/* Commitment */}
        <div className="chev-form-sub">
          <h3>📋 {COPY.commit.title}</h3>
          <div className="chev-pay-info">
            <h4>💰 {COPY.commit.payTitle}</h4>
            <ul>
              {COPY.commit.payItems.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="chev-commit-list">
            {COPY.commit.checks.map((c, i) => (
              <div
                key={i}
                className={"chev-commit" + (checks[i] ? " is-on" : "")}
                onClick={() => setChecks((arr) => arr.map((v, j) => (j === i ? !v : v)))}
              >
                <span className="box">{checks[i] ? "✓" : ""}</span>
                <span>
                  <span style={{ color: "var(--c-red)", marginInlineEnd: 4 }}>*</span>
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          className={"chev-submit" + (allChecked && !submitting ? "" : " is-disabled")}
          disabled={!allChecked || submitting}
          onClick={submit}
        >
          {submitting ? COPY.sending : `🚀 ${COPY.submit}`}
        </button>

        <div className="chev-foot">{COPY.footer}</div>

        {error && <div className="chev-error">{error}</div>}
      </div>
    </div>
  );
}
