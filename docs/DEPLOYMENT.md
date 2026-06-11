# DayCrunch — Deployment Guide

## Prerequisites

- Node.js 20+
- PostgreSQL database (Neon, Supabase, or Railway recommended)
- Razorpay account (test + live keys)
- Cloudinary account (optional, for media uploads)
- Vercel account

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Required for production:
- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — Generate with `openssl rand -base64 32`
- `AUTH_URL` — Your production URL
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

Optional:
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth
- `CLOUDINARY_*` — Media uploads
- `NEXT_PUBLIC_GA_ID` — Google Analytics
- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity

## Local Development

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Visit `http://localhost:3000`

## Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npm run db:seed

# Open Prisma Studio
npx prisma studio
```

## Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

```bash
# Or via CLI
npm i -g vercel
vercel
```

## Post-Deployment Checklist

- [ ] Set production `DATABASE_URL`
- [ ] Configure Razorpay webhook: `https://daycrunch.in/api/webhooks/razorpay`
- [ ] Set up Google Analytics & Search Console
- [ ] Configure custom domain (daycrunch.in)
- [ ] Test checkout flow with Razorpay test mode
- [ ] Switch to Razorpay live keys
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Microsoft Clarity for heatmaps

## Razorpay Webhook Events

Configure these events in Razorpay Dashboard:
- `payment.captured`
- `payment.failed`
- `refund.created`

Webhook URL: `POST /api/webhooks/razorpay`

## Performance

Target Lighthouse scores 90+:
- Images optimized via Next.js Image component
- Static generation for product/category pages
- Font subsetting via next/font
- Minimal client-side JavaScript
