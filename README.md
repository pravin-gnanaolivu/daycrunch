# DayCrunch

**Crunch Better. Live Better.**

Premium healthy snacking e-commerce platform for the Indian market. Built with Next.js, TypeScript, Tailwind CSS, Prisma, and Razorpay.

## Features

- Modern D2C storefront with vibrant brand design
- Product catalog with search, filters, and sorting
- Product detail pages with variants, reviews, and nutrition info
- Cart, wishlist, and checkout with Razorpay integration
- Guest checkout and user accounts (NextAuth)
- Admin dashboard for products, orders, and content
- SEO optimized with sitemap, schema markup, and meta tags
- Fully responsive, mobile-first design

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion
- **Backend:** Next.js Server Actions & API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (Auth.js v5)
- **Payments:** Razorpay (UPI, Cards, Net Banking)
- **Media:** Cloudinary
- **Hosting:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Start PostgreSQL (Docker)
docker compose up -d

# Push schema & seed database
npm run db:push
npm run db:seed

# Or all-in-one:
npm run db:setup

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Login Credentials (after seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@daycrunch.in | admin123 |
| Customer | priya@email.com | customer123 |

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Project Structure

```
src/
├── app/
│   ├── (store)/          # Public storefront pages
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── components/
│   ├── brand/            # Logo, brand components
│   ├── home/             # Homepage sections
│   ├── layout/           # Header, footer, nav
│   ├── product/          # Product cards, gallery
│   └── ui/               # Design system components
├── lib/                  # Utilities, auth, constants
├── store/                # Zustand state (cart, wishlist)
└── types/                # TypeScript types
docs/                     # Brand guidelines, deployment, SEO
prisma/                   # Database schema & seed
```

## Documentation

- [Brand Guidelines](docs/BRAND_GUIDELINES.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Sitemap](docs/SITEMAP.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [SEO Strategy](docs/SEO_STRATEGY.md)
- [Razorpay Integration](docs/RAZORPAY_FLOW.md)

## Demo Coupons

- `CRUNCH10` — 10% off
- `WELCOME50` — ₹50 off

## License

Private — DayCrunch © 2026
