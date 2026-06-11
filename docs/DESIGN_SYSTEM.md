# DayCrunch — Design System

## Spacing Scale

Base unit: 4px. Use Tailwind spacing (`p-4`, `gap-6`, `py-16`).

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-xl` | 12px | Inputs, small cards |
| `rounded-2xl` | 16px | Cards, modals |
| `rounded-3xl` | 24px | Feature sections, hero elements |
| `rounded-full` | 9999px | Buttons, badges, avatars |

## Components

### Buttons
- Primary: Sunset Orange, rounded-full, shadow on hover
- Secondary: Deep Plum
- Outline: Sunset border, fill on hover
- Sizes: sm (h-9), default (h-11), lg (h-13)

### Cards
- White background, `border-gray-100`, subtle shadow
- Hover: elevated shadow + slight translate

### Badges
- Best Seller: Golden Yellow
- New: Pistachio Green
- Sale/Discount: Sunset Orange

### Product Cards
- Aspect-square image
- Quick-add on hover (desktop)
- Sticky add-to-cart (mobile product page)

## Animations

- Page sections: fade-in on scroll (Framer Motion)
- Cards: hover lift (-translate-y-1) + shadow
- Hero elements: floating animation (3s loop)
- Transitions: 200-300ms ease

## Breakpoints

| Name | Width |
|------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

## Tailwind Custom Colors

```css
--color-sunset: #FF6B35;
--color-plum: #5B2A86;
--color-pistachio: #7BC043;
--color-golden: #FFC857;
--color-cream: #FFF8F0;
--color-soft-beige: #F8F4EE;
--color-charcoal: #1F2937;
--color-muted: #6B7280;
```

## Iconography

Lucide React icons. Stroke width default. Size: 16px (inline), 20px (nav), 24px (features).
