# 🚀 GET STARTED - DigitalMarket Setup

Follow these steps in order. Should take **10-15 minutes total**.

---

## STEP 1: DATABASE SETUP (5 minutes)

### 1.1 Open Supabase Console
- Go to: https://app.supabase.com/project/mnwwzzqrzfeffjkqbxfb/sql/new
- You'll see the SQL Editor

### 1.2 Paste Database Schema
- Open `lib/db/setup.sql` from your project
- Copy **ALL** contents
- Paste into Supabase SQL Editor
- Click the green **RUN** button
- Wait for "Success" message

### What This Does:
✅ Creates 4 database tables (users, products, orders, downloads)  
✅ Inserts 10 sample products  
✅ Sets up security policies (RLS)  
✅ Creates indexes  

### Verify Success:
In SQL Editor, run this query:
```sql
SELECT COUNT(*) as product_count FROM products;
```
You should see: **10** products

---

## STEP 2: CREATE STORAGE BUCKET (2 minutes)

### 2.1 Go to Storage
In Supabase:
1. Click **Storage** (left sidebar)
2. Click **Create new bucket**

### 2.2 Configure Bucket
- **Name**: `product-files`
- **Public bucket**: Toggle **ON** (important!)
- Click **Create bucket**

You should see it in your bucket list.

---

## STEP 3: VERIFY ENVIRONMENT (1 minute)

Check `.env.local` has these values:

```
NEXT_PUBLIC_SUPABASE_URL=https://mnwwzzqrzfeffjkqbxfb.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_11sAEkfuFi5Vk37U1n2mZQ_2D3-AsR_
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ If yes → Continue to Step 4
❌ If no → Copy from `.env.example`

---

## STEP 4: START DEVELOPMENT SERVER (1 minute)

### 4.1 Open Terminal
```bash
cd D:\digital_create_website
```

### 4.2 Start Dev Server
```bash
npm run dev
```

You should see:
```
▲ Next.js 16.2.4 (Turbopack)
- Local:         http://localhost:3000
✓ Ready in 11.8s
```

### 4.3 Open Browser
Click or visit: **http://localhost:3000**

---

## STEP 5: EXPLORE YOUR APP! 🎉

### What You Should See:

#### 🏠 Homepage
- Beautiful hero section with blue/purple gradient
- "Browse Collection" button
- 3 feature cards (Secure Payments, Instant Access, Global)
- 6 featured products shown
- Professional footer

#### 📦 Products Page
Click **Browse Collection** or go to `/products`
- See all 10 products
- Professional grid layout
- Product cards with prices
- Click any product to view details

#### 📄 Product Details
Click any product card
- Full product info
- Description
- Features list
- Price
- **"Buy Now" button** (try clicking it!)

#### 🔐 Authentication
Click **"Buy Now"** or **Sign In**
- Enter any email address
- Check your email for magic link
- Click link to sign in
- Try again - now you can continue to checkout!

#### 🎨 Admin Panel (Optional)
First, become admin in Supabase:

1. Go to Supabase SQL Editor
2. Run this query:
```sql
UPDATE users SET is_admin = TRUE WHERE email = 'your-email@example.com';
```
3. Sign out and sign back in
4. Visit **http://localhost:3000/admin**
5. See admin dashboard with stats
6. Go to Products → Add new product!

---

## ✅ VERIFICATION CHECKLIST

As you go through the steps, check these off:

- [ ] Database schema created (10 products in database)
- [ ] Storage bucket "product-files" created
- [ ] `.env.local` has Supabase credentials
- [ ] Dev server running (`npm run dev`)
- [ ] Homepage loads at http://localhost:3000
- [ ] Products page shows 10 products
- [ ] Can click on product and see details
- [ ] "Sign In" button works with email magic link
- [ ] (Optional) Admin panel accessible

---

## 🎨 STYLING FEATURES YOU'LL SEE

✅ **Professional Color Scheme**
- Sky blue primary color (#0284c7)
- Purple secondary color (#7c3aed)
- Smooth gradients everywhere

✅ **Modern Effects**
- Gradient buttons with hover effects
- Card hover animations (lift effect)
- Smooth transitions on everything
- Professional shadows and depth
- Responsive design (works on mobile too)

✅ **Typography**
- Large, clear headings
- Professional spacing
- Easy-to-read body text

---

## 🛠 TROUBLESHOOTING

### "Products not showing"
**Fix:**
1. Did SQL run successfully? Check for "10 products inserted"
2. Refresh page (Ctrl+R or Cmd+R)
3. Check browser console for errors (F12)

### "Can't sign in"
**Fix:**
1. Check your email inbox (not spam)
2. Make sure you're using the email you signed up with
3. Click the magic link from your email

### "Page looks weird/unstyled"
**Fix:**
1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. Stop server (Ctrl+C)
3. Delete .next folder: `rm -rf .next`
4. Restart: `npm run dev`

### "Database connection error"
**Fix:**
1. Check `.env.local` has correct credentials
2. Verify Supabase URL matches
3. Make sure SQL schema ran successfully

### "Dev server won't start"
**Fix:**
1. Make sure Node.js is installed: `node --version`
2. Check ports 3000 is not in use
3. Try: `npm install` then `npm run dev`

---

## 📞 SUPPORT

If something doesn't work:

1. Check **QUICK_START.md** (quick overview)
2. Check **SETUP.md** (detailed guide)
3. Read error messages carefully
4. Check browser console (F12 → Console)
5. Check server logs in terminal

---

## 🎯 NEXT STEPS (After getting it working)

### Optional: Add More Products
1. Go to `/admin`
2. Click "Manage Products"
3. Click "+ New Product"
4. Fill in details and upload a file
5. Product appears immediately on /products!

### Optional: Set Up Payments (Stripe)
1. Get Stripe test keys from stripe.com
2. Add to `.env.local`:
   - `STRIPE_PUBLIC_KEY=pk_test_...`
   - `STRIPE_SECRET_KEY=sk_test_...`
   - `STRIPE_WEBHOOK_SECRET=whsec_...`
3. Now "Buy Now" works!

### Optional: Set Up Emails (Resend)
1. Get Resend API key from resend.com
2. Add to `.env.local`:
   - `RESEND_API_KEY=re_...`
   - `RESEND_FROM_EMAIL=noreply@yourdomain.com`
3. Customers get download links via email!

### Deploy to Vercel
1. Push to GitHub: `git push origin main`
2. Connect repo in vercel.com
3. Set environment variables
4. Deploy with one click!

---

## 📚 Files to Read

- **QUICK_START.md** - 5-minute overview
- **SETUP.md** - Complete setup guide  
- **IMPLEMENTATION_COMPLETE.md** - What's been built
- **README.md** - Full documentation

---

## 🎉 YOU'RE ALL SET!

Your professional digital marketplace is ready to go!

**Start here:** `npm run dev` → http://localhost:3000

Happy selling! 🚀
