# Professional Email Setup Guide

## Current Status
✅ Professional email templates created in `lib/email/templates.ts`
⏳ Need to customize Supabase's magic link email

---

## Step 1: Customize Supabase Email Templates

### Go to Email Templates in Supabase

1. Open: https://app.supabase.com/project/mnwwzzqrzfeffjkqbxfb/auth/templates
2. You'll see "Email Templates" section on the left

### Customize Magic Link Email

1. Click on **"Magic Link"** template
2. You should see the default Supabase template
3. **Replace the entire content** with this professional template:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 0;
      }
      .header {
        background: linear-gradient(135deg, #0284c7 0%, #7c3aed 100%);
        color: white;
        padding: 40px 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
      }
      .content {
        padding: 40px 30px;
      }
      .greeting {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #222;
      }
      .message {
        font-size: 14px;
        color: #666;
        margin-bottom: 30px;
        line-height: 1.8;
      }
      .cta-container {
        text-align: center;
        margin: 40px 0;
      }
      .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
        color: white;
        padding: 16px 40px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 4px 6px rgba(2, 132, 199, 0.3);
      }
      .alternative-link {
        background-color: #f0f9ff;
        border-left: 4px solid #0284c7;
        padding: 20px;
        margin: 30px 0;
        border-radius: 4px;
      }
      .alternative-link p {
        margin: 0 0 10px 0;
        font-size: 12px;
        color: #666;
        text-transform: uppercase;
        font-weight: 600;
      }
      .alternative-link code {
        display: block;
        background-color: white;
        padding: 12px;
        margin-top: 10px;
        border-radius: 4px;
        word-break: break-all;
        font-size: 12px;
        color: #0284c7;
        font-family: 'Courier New', monospace;
      }
      .security-note {
        background-color: #fef3c7;
        border-left: 4px solid #f59e0b;
        padding: 15px;
        margin: 30px 0;
        border-radius: 4px;
        font-size: 12px;
        color: #92400e;
      }
      .footer {
        background-color: #f9fafb;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e5e7eb;
      }
      .footer-text {
        font-size: 12px;
        color: #999;
        margin: 0;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div style="font-size: 32px; margin-bottom: 10px;">🎯</div>
        <h1>DigitalMarket</h1>
        <div style="font-size: 14px; opacity: 0.9; margin-top: 10px;">Premium Digital Products Marketplace</div>
      </div>

      <div class="content">
        <div class="greeting">Welcome to DigitalMarket! 👋</div>

        <div class="message">
          Thank you for signing in. Click the button below to verify your email and access your account. This link is valid for 24 hours.
        </div>

        <div class="cta-container">
          <a href="{{ .ConfirmationURL }}" class="cta-button">Verify Your Email</a>
        </div>

        <div class="alternative-link">
          <p>Or copy this link if the button doesn't work:</p>
          <code>{{ .ConfirmationURL }}</code>
        </div>

        <div class="security-note">
          🔒 <strong>Security Tip:</strong> Never share this link with anyone. This link is unique to your account and will expire in 24 hours.
        </div>

        <div class="message" style="margin-top: 30px;">
          If you didn't request this email, you can safely ignore it. Your account is secure.
        </div>
      </div>

      <div class="footer">
        <p class="footer-text">
          © 2026 DigitalMarket. All rights reserved.<br>
          <a href="https://digitalmarket.example.com/privacy" style="color: #0284c7; text-decoration: none;">Privacy Policy</a> •
          <a href="https://digitalmarket.example.com/terms" style="color: #0284c7; text-decoration: none;">Terms of Service</a>
        </p>
      </div>
    </div>
  </body>
</html>
```

### Important: Use This Variable
- Replace your URL with: `{{ .ConfirmationURL }}`
- This is the Supabase variable that generates the actual magic link
- **DO NOT** remove or change this variable!

---

## Step 2: Save Changes

1. Click **Save** button in Supabase
2. You should see a success message
3. Done! ✅

---

## Step 3: Test the New Email

1. Restart your dev server: `npm run dev`
2. Go to http://localhost:3000/login
3. Sign in with a test email
4. Check your inbox
5. You should now see the **professional branded email** instead of the plain Supabase default! 🎉

---

## What You'll Get

The new email includes:
- ✅ **Professional branding** with DigitalMarket logo and colors
- ✅ **Gradient header** with blue/purple theme
- ✅ **Clear call-to-action** button
- ✅ **Fallback link** for email clients that don't render buttons
- ✅ **Security message** warning users not to share the link
- ✅ **Professional footer** with links
- ✅ **Mobile-responsive** design
- ✅ **24-hour expiry** notice

---

## Email Preview

When users receive the magic link email, they'll see:

### Header
```
🎯 DigitalMarket
Premium Digital Products Marketplace
```

### Body
```
Welcome to DigitalMarket! 👋

Thank you for signing in. Click the button below 
to verify your email and access your account.

[Verify Your Email] ← Big blue button

Or copy this link if the button doesn't work:
https://yourapp.com/auth/callback?code=...

🔒 Security Tip: Never share this link...
```

### Footer
```
© 2026 DigitalMarket. All rights reserved.
Privacy Policy • Terms of Service
```

---

## Customization Tips

Want to change something?

1. **Colors**: Change `#0284c7` (blue) and `#7c3aed` (purple) to your brand colors
2. **Logo/Text**: Replace 🎯 emoji with your actual logo (host image on Supabase Storage)
3. **Company Name**: Replace "DigitalMarket" with your actual company name
4. **Footer Links**: Update privacy and terms links to your actual URLs

---

## For Download Emails (Stripe Webhook)

The download link emails are already professional and sent via Resend. When users purchase:

1. Stripe webhook fires
2. App sends professional HTML email via Resend
3. Includes product name, download link, expiry info
4. Uses same branding and styling

---

## Next Steps

✅ Set up professional email templates in Supabase
✅ Test sign-in email
✅ Test purchase/download email
✅ Your marketplace now looks professional end-to-end!

Any questions? Check the templates in `lib/email/templates.ts`
