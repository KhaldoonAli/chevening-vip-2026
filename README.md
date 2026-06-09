# Chevening VIP Coaching, 2026

Standalone microsite for the 2026 Chevening VIP Coaching program.
Arabic only, RTL. Dark glassmorphic theme matching the Murshid brand.
Every submitted application is emailed to khaldounbaniali@gmail.com.

Not connected to murshidagent.com. Lives on its own domain.

## Stack

- Next.js 15 + React 19 + TypeScript
- Resend for transactional email
- No database. Founder reads applications in his inbox.

## Local development

```
npm install
cp .env.example .env.local
# edit .env.local and add your RESEND_API_KEY
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel, click by click

1. Push this folder to a new GitHub repo (the next section walks through it).
2. Open https://vercel.com/new
3. Pick the repo you just pushed.
4. Vercel auto-detects Next.js. Click Deploy.
5. Once deployed, go to Project Settings, Environment Variables, and add:
   - `RESEND_API_KEY` = your Resend API key from https://resend.com/api-keys
   - `FOUNDER_EMAIL` = khaldounbaniali@gmail.com
   - `FROM_EMAIL` = onboarding@resend.dev (or your verified domain)
6. Redeploy from the Vercel dashboard so the new env vars take effect.

Default URL will be something like `chevening-vip-XXXX.vercel.app`. You can attach a custom domain later in Settings, Domains.

## How email submission works

Every time someone clicks "إرسال طلب الانضمام لمجموعة VIP":

1. The form POSTs to `/api/submit`.
2. The route validates all required fields server-side.
3. The route builds an RTL Arabic HTML email with every answer organized into sections.
4. It sends via Resend, from `Chevening VIP <onboarding@resend.dev>`, to `FOUNDER_EMAIL`, with `reply-to` set to the applicant's email so you can reply directly from your inbox.
5. The student sees a green success screen: "تم استلام طلبك بنجاح".

If anything fails, the student sees a red toast at the bottom with the error.

## Updating the page

All copy lives in one place: `src/app/page.tsx`, inside the `COPY` constant near the top. To change a label or add a question, edit there. No CMS, no database migration.
