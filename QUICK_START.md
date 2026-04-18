# Quick Start Guide - DigitalMarket

Get your marketplace running in 5 minutes!

## Step 1: Set Up Supabase Database

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Open your project: `mnwwzzqrzfeffjkqbxfb`
3. Go to **SQL Editor** → Click **New Query**
4. Copy the entire contents of `lib/db/setup.sql`
5. Paste into the SQL editor
6. Click **Run** (green play button)
7. Wait for success message

### Expected Output:
- Tables created: `users`, `products`, `orders`, `downloads`
- 10 sample products inserted
- All indexes and RLS policies created

## Step 2: Create Storage Bucket

1. In Supabase, go to **Storage** (left sidebar)
2. Click **Create new bucket**
3. Name: `product-files`
4. Toggle **Public bucket** ON
5. Click **Create bucket**

## Step 3: Set Environment Variables

Your `.env.local` already has:
```
NEXT_PUBLIC_SUPABASE_URL=https://mnwwzzqrzfeffjkqbxfb.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_11sAEkfuFi5Vk37U1n2mZQ_2D3-AsR_
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud3d6enFyemZlZmZqa3FieGZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjQ2NDQzNSwiZXhwIjoyMDkyMDQwNDM1fQ.Ca0Vk0qQpVO2iO9ww3U1XkaLIUl6dPmHoadUB9tx2bM
```

✅ **Database is ready!**

## Step 4: Run the Application

```bash
npm run dev
```

Visit: **http://localhost:3000**

You should see:
- ✅ Homepage with featured products
- ✅ 10 sample products displayed
- ✅ Product cards with images and prices
- ✅ Professional styling

## Step 5: Test Product Pages

1. Click on any product card
2. View product details
3. Click "Buy Now" → Redirects to checkout (requires auth)

## Step 6: Test Authentication

1. Click "Sign In" (top right)
2. Enter any email address
3. Check that email for magic link
4. Click link to authenticate
5. Now you can click "Buy Now" on products

## Step 7: View Admin Panel (Optional)

Add yourself as admin in Supabase:

1. Go to **Supabase SQL Editor**
2. Run this query:
```sql
UPDATE users SET is_admin = TRUE WHERE email = 'your-email@example.com';
```
3. Visit `http://localhost:3000/admin`
4. See dashboard with product management

## Troubleshooting

### Products not showing?
- Check: Did SQL run successfully? (Check for 10 products inserted)
- Refresh page
- Check browser console for errors

### Auth not working?
- Make sure you're using the correct email
- Check email spam folder for magic link

### Styling looks weird?
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `npm run dev`

### Can't see "Buy Now" button?
- You need to be authenticated first
- Click "Sign In" at the top right
- Sign in with your email

## What's Included

✅ **10 Professional Products**
- UI Kit
- E-commerce Template  
- Design System
- Mobile App UI Kit
- Landing Page Templates
- Icon Library
- Dashboard Template
- Design Guide PDF
- React Components Library
- Brand Identity Kit

✅ **Professional Styling**
- Modern blue/purple color scheme
- Gradient backgrounds
- Smooth hover effects
- Responsive design
- Professional typography

✅ **Complete Features**
- Product browsing
- Product search
- Authentication
- Shopping cart (Stripe)
- Admin dashboard
- Order management
- Download links

## Next Steps

1. **Add More Products**: Use admin panel to upload your own products
2. **Configure Stripe**: Get test keys from Stripe dashboard
3. **Set Up Email**: Add Resend API key for notifications
4. **Deploy**: Push to GitHub → Deploy to Vercel

## Support

All documentation in:
- `README.md` - Full overview
- `SETUP.md` - Detailed setup guide
- `QUICK_START.md` - This file

Happy selling! 🚀
