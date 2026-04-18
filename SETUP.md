# DigitalMarket - Setup Guide

Complete step-by-step guide to set up the digital product sales platform.

## Part 1: Initial Project Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
```

You'll fill in these variables in the following steps.

## Part 2: Supabase Setup

### 1. Create a Supabase Project
- Go to [supabase.com](https://supabase.com)
- Click "New Project"
- Fill in project name, database password, region
- Wait for project to initialize

### 2. Get Your API Keys
- In Supabase dashboard, go to Settings → API
- Copy these values to .env.local:
  - `NEXT_PUBLIC_SUPABASE_URL` → URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon/public key
  - `SUPABASE_SERVICE_ROLE_KEY` → service_role key (secret)

### 3. Create Database Tables
- In Supabase, go to SQL Editor
- Click "New Query"
- Copy entire contents of `lib/db/schema.sql`
- Paste into editor and click "Run"
- Wait for success message

### 4. Create Storage Bucket
- Go to Storage in Supabase sidebar
- Click "New Bucket"
- Name: `product-files`
- Public (toggle on)
- Click "Create bucket"

### 5. Create Admin User
- Go to Authentication → Users
- Click "Add user" or use invite link
- Create an account with your admin email
- Note the user ID (UUID)
- Go to SQL Editor → New Query
- Run:
```sql
INSERT INTO users (id, email, is_admin) 
VALUES ('<user-uuid>', 'your-email@example.com', true)
ON CONFLICT (id) DO UPDATE SET is_admin = true;
```

## Part 3: Stripe Setup

### 1. Create Stripe Account
- Go to [stripe.com](https://stripe.com)
- Sign up for account
- Verify email

### 2. Get API Keys
- In Stripe Dashboard → Developers → API keys
- Copy to .env.local:
  - `STRIPE_PUBLIC_KEY` → Publishable key
  - `STRIPE_SECRET_KEY` → Secret key

### 3. Create Webhook Endpoint
- In Stripe Dashboard → Developers → Webhooks
- Click "Add endpoint"
- Endpoint URL: `http://localhost:3000/api/webhooks/stripe` (for local testing)
  - For production: `https://your-domain.com/api/webhooks/stripe`
- Events to listen: `checkout.session.completed`
- Click "Create endpoint"
- Click the endpoint to view details
- Copy Signing secret to .env.local:
  - `STRIPE_WEBHOOK_SECRET` → Signing secret

### 4. Test Payment Method
- Use card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

## Part 4: Resend Email Setup

### 1. Create Resend Account
- Go to [resend.com](https://resend.com)
- Sign up for account

### 2. Get API Key
- Go to API Keys
- Create new API key
- Copy to .env.local:
  - `RESEND_API_KEY` → Your API key

### 3. Verify Sending Domain
- In Resend → Domains
- Add your domain or use default Resend domain
- Follow verification steps
- Copy to .env.local:
  - `RESEND_FROM_EMAIL` → noreply@yourdomain.com (or yourdomain@resend.dev)

## Part 5: Complete .env.local

Your `.env.local` should now look like:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx...

STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=your-email@example.com
```

## Part 6: Local Testing

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Authentication
- Visit `http://localhost:3000/signup`
- Enter your email
- Check your email for magic link
- Click link to sign in

### 3. Test Admin Panel
- After signing in, visit `http://localhost:3000/admin`
- If you set up the admin user correctly, you'll see the dashboard
- Go to "Manage Products"
- Click "New Product"
- Fill in details and upload a test file
- Click "Create Product"

### 4. Test Product Page
- Go to `/products`
- Click on your test product
- Verify details display correctly

### 5. Test Payment Flow
- Click "Buy Now" on the product
- You should be redirected to Stripe checkout
- Use test card: 4242 4242 4242 4242
- Use any future date for expiry
- Use any 3-digit number for CVC
- Complete checkout
- You should see success page
- Check console for webhook confirmation
- Check your email for download link

### 6. Test Download Link
- Click the download link in email
- Should validate token and redirect to file
- Should download or preview file

## Part 7: Production Deployment

### 1. Switch to Production Keys
In your environment variables:
- Switch Stripe keys from `sk_test_*` to `sk_live_*`
- Switch `STRIPE_PUBLIC_KEY` to production publishable key

### 2. Deploy to Vercel
```bash
git push origin main
```
- Connect your repo in Vercel
- Add all environment variables to Vercel project settings
- Deploy!

### 3. Update Stripe Webhook
- In Stripe Dashboard → Webhooks
- Update webhook endpoint URL to production: `https://your-domain.com/api/webhooks/stripe`
- Or create new endpoint for production

### 4. Verify Production Setup
- Visit your production domain
- Sign up with test email
- Create a product
- Test full payment flow with production Stripe test card
- Verify email is received
- Verify download link works

### 5. Final Checks
- [ ] All environment variables set correctly
- [ ] Database tables created with RLS
- [ ] Stripe webhook configured
- [ ] Admin user can access dashboard
- [ ] Payment flow works end-to-end
- [ ] Emails send with download links
- [ ] Downloads expire after 24 hours
- [ ] HTTPS enabled (automatic with Vercel)

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Make sure .env.local exists in root directory
- Check variable names match exactly
- Restart dev server

### Stripe webhook not firing
- Make sure webhook secret is correct
- Check webhook URL is accessible
- Monitor webhook deliveries in Stripe dashboard
- Check server logs for errors

### Emails not sending
- Verify Resend API key is correct
- Check sender domain is verified
- Look at Resend dashboard for delivery status
- Check spam folder

### Downloads not working
- Verify product-files bucket exists in Supabase
- Check file was uploaded successfully
- Verify download token hasn't expired (24hr limit)
- Check Supabase Storage permissions

### Can't access admin panel
- Make sure user is marked as admin in database
- Verify user ID matches in users table
- Check email whitelist setting
- Try signing out and back in

## Support

For help:
1. Check error messages in browser console
2. Check server logs in terminal
3. Monitor webhook deliveries in Stripe
4. Check email delivery in Resend dashboard
5. Review Supabase logs for database errors
