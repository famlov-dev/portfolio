# Nakamura Kazuya Portfolio

A bilingual (English/Japanese) portfolio built with Next.js 15, focused on AI product engineering experience, polished UI, and responsive design.

## Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS
- next-intl (i18n: `en`, `ja`)
- next-themes (light/dark mode)
- Resend + Cloudflare Turnstile (contact form)

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` (or set these in your deploy platform):

- `RESEND_API_KEY`
- `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE`
- `CLOUDFLARE_TURNSTILE_SECRET`

Reference template: `.env.example`.

## Production Validation

```bash
npm run lint
npm run build
```

## Deploy (Vercel Recommended)

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Configure the 3 environment variables above in Project Settings.
4. Deploy.

After deploy, test:
- Contact form submission (Turnstile + Resend)
- Resume download (`/Nakamura-Kazuya-Resume.pdf`)
- Locale switch (`en`/`ja`)
- Theme toggle (light/dark)
