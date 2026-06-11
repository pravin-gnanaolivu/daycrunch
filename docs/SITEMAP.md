# DayCrunch — Sitemap

```
daycrunch.in/
├── /                           Homepage
├── /shop                       All products (filters, search, sort)
├── /shop/[category]            Category pages
│   ├── /shop/dates
│   ├── /shop/nuts
│   ├── /shop/dry-fruits
│   ├── /shop/dark-chocolates
│   └── /shop/gift-boxes
├── /product/[slug]             Product detail pages
├── /cart                       Shopping cart
├── /checkout                   Checkout & payment
├── /wishlist                   Saved products
├── /about                      About Us
├── /gift-boxes                 Gift boxes landing
├── /corporate                  Corporate orders
├── /blog                       Blog listing
├── /blog/[slug]                Blog posts
├── /faq                        FAQ
├── /contact                    Contact form
├── /account                    Account dashboard
├── /account/login              Sign in
├── /account/register           Create account
├── /account/orders             Order history & tracking
├── /account/addresses          Address management
├── /account/settings           Account settings
├── /privacy                    Privacy policy
├── /terms                      Terms of service
├── /sitemap.xml                Dynamic sitemap
├── /robots.txt                 Robots file
└── /admin/                     Admin panel
    ├── /admin                  Dashboard
    ├── /admin/products         Product management
    ├── /admin/categories       Category management
    ├── /admin/orders           Order management
    ├── /admin/customers        Customer management
    ├── /admin/coupons          Coupon management
    ├── /admin/banners          Banner management
    ├── /admin/media            Media library
    ├── /admin/blog             Blog management
    ├── /admin/analytics        Analytics dashboard
    └── /admin/settings         Site settings
```

## API Routes

```
/api/auth/[...nextauth]         Authentication
/api/payments/create-order      Create Razorpay order
/api/payments/verify            Verify payment signature
/api/webhooks/razorpay          Razorpay webhook handler
/api/newsletter                 Newsletter subscription
/api/products                   Product CRUD
/api/orders                     Order management
/api/upload                     Cloudinary media upload
```
