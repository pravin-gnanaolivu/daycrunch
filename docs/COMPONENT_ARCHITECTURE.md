# DayCrunch — Component Architecture

## Layout Components

```
AnnouncementBar          # Rotating promo messages
Header                   # Logo, nav, search, cart, wishlist
Footer                   # Links, newsletter, social, contact
Logo                     # Brand mark with DAY/CRUNCH colors
```

## Homepage Sections

```
HeroSection              # Main banner with CTAs
TrustBadges              # Secure payment, delivery badges
CategoriesSection        # Category grid with emojis
BestSellersSection       # Product grid (reusable)
WhyChooseSection         # 4 benefit cards
LifestyleSection         # Brand story split layout
GiftingSection           # Gift boxes promo (plum gradient)
TestimonialsSection      # Customer reviews
InstagramSection         # Social grid
NewsletterSection        # Email capture CTA
```

## Product Components

```
ProductCard              # Grid card with quick-add, wishlist
ProductPageClient        # Full PDP with gallery, variants, reviews
```

## UI Primitives (Design System)

```
Button                   # 6 variants, 4 sizes
Input                    # Form input with focus ring
Badge                    # Status/label badges
Card                     # Container with header/content
Label                    # Form labels
```

## State Management (Zustand)

```
cart-store               # Cart items, coupons, totals (persisted)
wishlist-store           # Saved product IDs (persisted)
recently-viewed-store    # Last 12 viewed products (persisted)
```

## Data Layer

```
mock-data.ts             # Development product catalog (8 products)
db.ts                    # Prisma client (PostgreSQL)
auth.ts                  # NextAuth configuration
razorpay.ts              # Payment integration (lazy init)
constants.ts             # Brand colors, categories, config
utils.ts                 # cn(), formatPrice(), slugify()
```

## Route Groups

```
(store)/                 # Public storefront (header + footer layout)
admin/                   # Admin panel (sidebar layout)
api/                     # REST API routes
```

## Page Patterns

- **Static pages:** About, FAQ, Contact, Corporate
- **SSG pages:** Product `[slug]`, Category `[slug]`
- **Client pages:** Shop (filters), Cart, Checkout, Wishlist
- **Hybrid:** Homepage (server components + client hero animation)
