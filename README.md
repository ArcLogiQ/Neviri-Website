# Neviri Website

Marketing website for Neviri Cloud, extracted from the main `frontend` app. Pure marketing — no dashboard, no auth flows. Login / Sign Up links redirect to the central auth host at `https://sng-central.neviri.com/login`.

## Pages

- `/` — landing (Hero, Features, Why Choose Neviri, Testimonials)
- `/about`
- `/solutions`
- `/pricing`
- `/blogs` and `/blogs/[slug]`
- `/support`
- `/terms`, `/privacy`, `/cookie-policy`

## Stack

Next.js 15 (App Router, JSX), Tailwind v4, lucide-react, react-hot-toast.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_API_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required for | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `/blogs`, `/support` | Base URL of the Neviri backend that serves `/api/v1/blog/public` and `/api/v1/support/send-email`. |

Without `NEXT_PUBLIC_API_URL`, the blog list and the support contact form will fail — the rest of the site is fully static.

## What's intentionally not here

- No login / signup / dashboard / payment pages — those live in the main app behind `sng-central.neviri.com`.
- No `src/api/`, `src/data/`, `src/context/` — they were dashboard-only.
- `src/config/api.js` is trimmed to the three endpoints this site actually calls (`blogsAPI.getPublic`, `blogsAPI.getBySlug`, `blogsAPI.addInteraction`, `EMAIL_ENDPOINT.SEND_EMAIL`).
