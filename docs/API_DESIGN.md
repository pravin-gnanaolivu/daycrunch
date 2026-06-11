# DayCrunch — API Design

## Authentication

### POST /api/auth/[...nextauth]
NextAuth.js handlers for sign-in, sign-out, session management.

**Providers:** Credentials, Google OAuth

## Products

### GET /api/products
Query params: `category`, `search`, `sort`, `page`, `limit`

### GET /api/products/[slug]
Returns single product with variants, images, reviews.

### POST /api/products (Admin)
Create product with variants and images.

### PUT /api/products/[id] (Admin)
Update product details.

### DELETE /api/products/[id] (Admin)
Soft-delete product (set isActive: false).

## Orders

### GET /api/orders (Auth required)
Returns user's order history.

### GET /api/orders/[id] (Auth required)
Single order with items and tracking.

### POST /api/orders
Create order from cart (guest or authenticated).

## Payments

### POST /api/payments/create-order
```json
{
  "amount": 1499,
  "customer": { "name", "email", "phone" },
  "items": [{ "productId", "quantity", "price" }]
}
```
Response: `{ orderId, orderNumber, amount, keyId }` or `{ demo: true, orderNumber }`

### POST /api/payments/verify
```json
{
  "razorpay_order_id": "...",
  "razorpay_payment_id": "...",
  "razorpay_signature": "...",
  "orderNumber": "DC-..."
}
```

### POST /api/webhooks/razorpay
Razorpay webhook for payment events. Verifies signature via `X-Razorpay-Signature` header.

## Cart

Managed client-side via Zustand with persistence. Server sync available for authenticated users via:

### GET /api/cart (Auth)
### POST /api/cart (Auth)
### DELETE /api/cart/[itemId] (Auth)

## Newsletter

### POST /api/newsletter
```json
{ "email": "user@example.com" }
```

## Media (Admin)

### POST /api/upload
Multipart form upload to Cloudinary. Returns `{ url, publicId }`.

## Coupons

### POST /api/coupons/validate
```json
{ "code": "CRUNCH10", "subtotal": 999 }
```
Response: `{ valid, discount, discountType }`

## Rate Limiting (Production)

Recommended limits:
- Payment endpoints: 10 req/min per IP
- Auth endpoints: 5 req/min per IP
- General API: 60 req/min per IP
