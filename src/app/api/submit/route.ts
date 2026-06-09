// POST /api/submit
// =====================================================================
// Receives the full Chevening VIP application from the landing form,
// validates the required fields server-side, and emails it to the
// founder via Resend. No database, no admin UI; every application
// shows up in khaldounbaniali@gmail.com.

import { NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Bag = Record<string, string | string[] | undefined>;
type Body = {
  personal?: Bag;
  academic?: Bag;
  work?: Bag;
  goals?: Bag;
  english?: Bag;
  prep?: Bag;
  extra?: Bag;
};

function val(b: Bag | undefined, k: string): string {
  if (!b) return "";
  const v = b[k];
  if (Array.isArray(v)) return v.join(", ");
  return (v ?? "").toString().trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  if (!value) value = "(لم يُذكر)";
  return `<tr>
    <td style="padding:8px 12px;border:1px solid #2a2f3a;background:#1a1d27;color:#9ca3af;font-weight:600;width:40%;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border:1px solid #2a2f3a;background:#0e0e10;color:#fff;white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`;
}

function section(title: string, rowsHtml: string): string {
  return `<h3 style="color:#22c55e;font-size:18px;margin:24px 0 8px;border-bottom:1px solid #2a2f3a;padding-bottom:6px;">${escapeHtml(title)}</h3>
  <table style="width:100%;border-collapse:collapse;border:1px solid #2a2f3a;font-family:'Tahoma',sans-serif;direction:rtl;text-align:right;">${rowsHtml}</table>`;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Server-side validation, same as the client but defensive
  const required: Array<[string, string]> = [
    ["الاسم الكامل", val(body.personal, "name")],
    ["البريد الإلكتروني", val(body.personal, "email")],
    ["رقم الهاتف", val(body.personal, "phone")],
    ["العمر", val(body.personal, "age")],
    ["الجنسية", val(body.personal, "nat")],
    ["البلد الحالي للإقامة", val(body.personal, "res")],
    ["درجة البكالوريوس", val(body.academic, "degree")],
    ["معدل البكالوريوس", val(body.academic, "gpa")],
    ["جامعة البكالوريوس", val(body.academic, "uni")],
    ["سنة التخرج", val(body.academic, "year")],
    ["الوظيفة الحالية", val(body.work, "job")],
    ["وصف الخبرة المهنية", val(body.work, "jobDesc")],
    ["التخصص المرغوب", val(body.goals, "major")],
    ["أهدافك المهنية", val(body.goals, "career")],
    ["مستوى اللغة الإنجليزية", val(body.english, "engLevel")],
    ["لماذا تريد الانضمام", val(body.extra, "why")],
  ];
  for (const [label, v] of required) {
    if (!v) {
      return Response.json(
        { ok: false, error: `الحقل المطلوب ناقص: ${label}` },
        { status: 400 }
      );
    }
  }

  // Basic email shape check (server side)
  const email = val(body.personal, "email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { ok: false, error: "صيغة البريد الإلكتروني غير صحيحة" },
      { status: 400 }
    );
  }

  // Compose the email body
  const applicantName = val(body.personal, "name");
  const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8" /></head>
<body style="margin:0;background:#0e0e10;color:#fff;font-family:'Tahoma',sans-serif;padding:24px;direction:rtl;text-align:right;">
  <div style="max-width:720px;margin:0 auto;background:#13131a;border:1px solid #2a2f3a;border-radius:14px;padding:24px;">
    <h2 style="color:#22c55e;margin:0 0 16px;font-size:22px;">طلب جديد لمجموعة شيفنينغ VIP, 2026</h2>
    <p style="color:#9ca3af;margin:0 0 12px;font-size:14px;">من: <strong style="color:#fff;">${escapeHtml(applicantName)}</strong></p>

    ${section("المعلومات الشخصية", [
      row("الاسم الكامل", val(body.personal, "name")),
      row("البريد الإلكتروني", val(body.personal, "email")),
      row("رقم الهاتف", val(body.personal, "phone")),
      row("حساب الإنستغرام", val(body.personal, "ig")),
      row("العمر", val(body.personal, "age")),
      row("الجنسية", val(body.personal, "nat")),
      row("البلد الحالي", val(body.personal, "res")),
    ].join(""))}

    ${section("المؤهلات الأكاديمية", [
      row("درجة البكالوريوس", val(body.academic, "degree")),
      row("المعدل", val(body.academic, "gpa")),
      row("الجامعة", val(body.academic, "uni")),
      row("سنة التخرج", val(body.academic, "year")),
      row("هل لديك ماجستير؟", val(body.academic, "masters")),
    ].join(""))}

    ${section("الخبرة المهنية", [
      row("سنوات الخبرة", val(body.work, "years")),
      row("الوظيفة الحالية", val(body.work, "job")),
      row("وصف الخبرة", val(body.work, "jobDesc")),
    ].join(""))}

    ${section("أهداف الدراسة في المملكة المتحدة", [
      row("التخصص المرغوب", val(body.goals, "major")),
      row("الجامعات المفضلة", val(body.goals, "prefUni")),
      row("التكلفة المعيشية مهمة؟", val(body.goals, "costMatters")),
      row("المدن المفضلة", val(body.goals, "prefCity")),
      row("الأهداف المهنية", val(body.goals, "career")),
    ].join(""))}

    ${section("مهارات اللغة الإنجليزية", [
      row("المستوى الحالي", val(body.english, "engLevel")),
      row("اختبار سابق", val(body.english, "engTest")),
    ].join(""))}

    ${section("التحضير والتطوير", [
      row("ماذا تفعل حالياً للتحضير", val(body.prep, "preparing")),
      row("خبرة قيادية/تطوعية", val(body.prep, "lead")),
      row("الشبكة المهنية", val(body.prep, "network")),
      row("نقاط الضعف", val(body.prep, "weak")),
      row("ساعات أسبوعية متاحة", val(body.prep, "hours")),
    ].join(""))}

    ${section("أسئلة إضافية", [
      row("قدّمت من قبل؟", val(body.extra, "appliedBefore")),
      row("لماذا VIP؟", val(body.extra, "why")),
      row("الاستعجال", val(body.extra, "urgency")),
      row("معلومات إضافية", val(body.extra, "more")),
    ].join(""))}

    <p style="margin:24px 0 0;color:#6b7280;font-size:12px;text-align:center;">
      تم استلام هذا الطلب عبر صفحة مجموعة شيفنينغ VIP. كل التزامات المتقدم تم التوقيع عليها قبل الإرسال.
    </p>
  </div>
</body>
</html>`;

  const apiKey = process.env.RESEND_API_KEY;
  const founderEmail = process.env.FOUNDER_EMAIL || "khaldounbaniali@gmail.com";
  const from = process.env.FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    return Response.json(
      { ok: false, error: "إعداد البريد غير مكتمل على الخادم" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: `Chevening VIP <${from}>`,
      to: [founderEmail],
      replyTo: email,
      subject: `طلب جديد للانضمام لمجموعة شيفنينغ VIP, ${applicantName}`,
      html,
    });
    if (error) {
      return Response.json(
        { ok: false, error: error.message || "فشل إرسال البريد" },
        { status: 500 }
      );
    }
  } catch (e) {
    return Response.json(
      { ok: false, error: e instanceof Error ? e.message : "فشل إرسال البريد" },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
