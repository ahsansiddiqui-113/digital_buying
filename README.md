# DigitalMarket - Digital Product Sales Platform

A production-ready Next.js 14 application for selling digital downloadable products worldwide.

## Features

- 🛒 **Product Catalog**: Browse and purchase digital products
- 💳 **Stripe Integration**: Secure payment processing
- 📧 **Email Notifications**: Auto-send download links via Resend
- 🔐 **Secure Downloads**: Time-limited download tokens (24hrs)
- 👥 **User Authentication**: Magic link email auth via Supabase
- 🏢 **Admin Panel**: Manage products and orders
- 🌍 **SEO Optimized**: Dynamic metadata and structured data
- 📦 **File Storage**: Supabase Storage for product files

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Stripe account
- Resend account

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create .env.local:**
```bash
cp .env.example .env.local
```
Fill in your Supabase, Stripe, and Resend credentials.

3. **Set up database:**
   - Run SQL from `lib/db/schema.sql` in Supabase
   - Create `product-files` storage bucket
   - Mark your user as admin

4. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
ADMIN_EMAIL=
```

## Project Structure

```
app/                    # Pages and routes
├── (marketing)/        # Public pages
├── (auth)/            # Auth pages
├── (checkout)/        # Checkout flow
├── (admin)/           # Admin dashboard
└── api/               # API routes

components/            # React components
lib/                   # Utilities and clients
actions/              # Server actions
types/                # TypeScript types
```

## Key Routes

- `/` - Home page
- `/products` - Product listing
- `/product/[slug]` - Product detail
- `/checkout/[id]` - Stripe checkout
- `/login`, `/signup` - Authentication
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order history

## Payment Flow

1. Customer views product → Click "Buy Now"
2. Authenticates with email magic link
3. Redirected to Stripe checkout
4. Completes payment
5. Webhook creates order in database
6. Email sent with 24-hour download link
7. Customer downloads file

## Deployment

### Deploy to Vercel

```bash
git push origin main
# Connect repo in Vercel dashboard
# Set environment variables
# Deploy!
```

After deployment:
- Update Stripe webhook URL
- Switch to production API keys
- Test payment flow

## Database

Uses PostgreSQL via Supabase with:
- **users** - User accounts
- **products** - Digital products
- **orders** - Customer purchases
- **downloads** - Download tokens (24hr expiry)

All tables have Row Level Security enabled.

## Tech Stack

- Next.js 14 (App Router, Server Components)
- TypeScript
- Tailwind CSS
- Supabase (DB, Auth, Storage)
- Stripe (Payments)
- Resend (Email)

## Security

- ✅ Database-level access control (RLS)
- ✅ Time-limited download tokens
- ✅ Secure file storage in Supabase
- ✅ Webhook signature verification
- ✅ Server-side authentication
- ✅ Environment variable protection
