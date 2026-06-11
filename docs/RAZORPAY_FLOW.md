# DayCrunch — Razorpay Integration Flow

## Overview

DayCrunch uses Razorpay for payment processing supporting UPI, cards, net banking, and wallets.

## Flow

```
Customer clicks "Pay" on Checkout
        │
        ▼
POST /api/payments/create-order
  ├── Validate cart & customer details
  ├── Create order record in database
  └── Create Razorpay order (amount in paise)
        │
        ▼
Open Razorpay Checkout Modal
  ├── Customer selects payment method
  ├── UPI / Card / Net Banking / Wallet
  └── Razorpay processes payment
        │
        ▼
Payment Success Handler (client)
        │
        ▼
POST /api/payments/verify
  ├── Verify HMAC signature
  ├── Update order status → PAID
  └── Clear cart, redirect to confirmation
        │
        ▼
Webhook (server-side backup)
POST /api/webhooks/razorpay
  ├── Verify webhook signature
  └── Handle payment.captured / payment.failed
```

## Demo Mode

When `RAZORPAY_KEY_ID` is not configured, checkout runs in demo mode:
- Order number is generated
- No actual payment processed
- Redirects to order confirmation

## Security

- All amounts calculated server-side
- HMAC SHA256 signature verification
- Webhook signature validation
- CSRF protection via Next.js
- Rate limiting on payment endpoints (recommended for production)

## Supported Methods

- UPI (Google Pay, PhonePe, Paytm, BHIM)
- Credit & Debit Cards (Visa, Mastercard, RuPay)
- Net Banking (all major banks)
- Wallets (Paytm, Mobikwik, etc.)

## Test Cards

Use Razorpay test mode keys and test card `4111 1111 1111 1111` for development.

## Refunds

Process refunds via Razorpay Dashboard or API. Webhook `refund.created` updates order status.
