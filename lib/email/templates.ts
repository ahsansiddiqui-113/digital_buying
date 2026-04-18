export function magicLinkEmail(magicLink: string) {
  return `
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
          .logo {
            font-size: 14px;
            opacity: 0.9;
            margin-top: 10px;
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
            transition: box-shadow 0.3s;
            box-shadow: 0 4px 6px rgba(2, 132, 199, 0.3);
          }
          .cta-button:hover {
            box-shadow: 0 10px 15px rgba(2, 132, 199, 0.4);
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
            overflow-x: auto;
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
          .footer-link {
            color: #0284c7;
            text-decoration: none;
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
          .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 30px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div style="font-size: 32px; margin-bottom: 10px;">🎯</div>
            <h1>DigitalMarket</h1>
            <div class="logo">Premium Digital Products Marketplace</div>
          </div>

          <!-- Content -->
          <div class="content">
            <div class="greeting">Welcome to DigitalMarket! 👋</div>

            <div class="message">
              Thank you for signing in. Click the button below to verify your email and access your account. This link is valid for 24 hours.
            </div>

            <!-- CTA Button -->
            <div class="cta-container">
              <a href="${magicLink}" class="cta-button">Verify Your Email</a>
            </div>

            <div class="divider"></div>

            <!-- Alternative Link -->
            <div class="alternative-link">
              <p>Or copy this link if the button doesn't work:</p>
              <code>${magicLink}</code>
            </div>

            <!-- Security Note -->
            <div class="security-note">
              🔒 <strong>Security Tip:</strong> Never share this link with anyone. This link is unique to your account and will expire in 24 hours.
            </div>

            <div class="message" style="margin-top: 30px;">
              If you didn't request this email, you can safely ignore it. Your account is secure.
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p class="footer-text">
              © 2026 DigitalMarket. All rights reserved.<br>
              <a href="https://digitalmarket.example.com/privacy" class="footer-link">Privacy Policy</a> •
              <a href="https://digitalmarket.example.com/terms" class="footer-link">Terms of Service</a>
            </p>
            <p class="footer-text" style="margin-top: 15px; font-size: 11px; color: #ccc;">
              You received this email because you tried to sign in to DigitalMarket.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function downloadLinkEmail(
  productTitle: string,
  downloadLink: string,
  expiresIn: string
) {
  return `
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
          .product-info {
            background-color: #f0f9ff;
            border-left: 4px solid #0284c7;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .product-title {
            font-size: 16px;
            font-weight: 600;
            color: #0284c7;
            margin: 0;
          }
          .cta-container {
            text-align: center;
            margin: 40px 0;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
            color: white;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: box-shadow 0.3s;
            box-shadow: 0 4px 6px rgba(22, 163, 74, 0.3);
          }
          .cta-button:hover {
            box-shadow: 0 10px 15px rgba(22, 163, 74, 0.4);
          }
          .warning {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 13px;
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
          }
          .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 30px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div style="font-size: 32px; margin-bottom: 10px;">🎉</div>
            <h1>Your Download is Ready!</h1>
          </div>

          <!-- Content -->
          <div class="content">
            <div class="greeting">Thank you for your purchase! 🎁</div>

            <div class="message">
              Your digital product is ready to download. Click the button below to get your file instantly.
            </div>

            <!-- Product Info -->
            <div class="product-info">
              <p class="product-title">📦 ${productTitle}</p>
            </div>

            <!-- CTA Button -->
            <div class="cta-container">
              <a href="${downloadLink}" class="cta-button">Download Now</a>
            </div>

            <div class="divider"></div>

            <!-- Warning -->
            <div class="warning">
              ⏰ <strong>Important:</strong> This download link expires in ${expiresIn}. Please download your file within this timeframe.
            </div>

            <div class="message">
              Keep this email for your records. If you have any questions or issues, feel free to contact our support team.
            </div>
          </div>

          <!-- Footer -->
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
  `;
}

export function orderConfirmationEmail(
  customerName: string,
  productTitle: string,
  price: number
) {
  return `
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
          .order-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .order-table tr {
            border-bottom: 1px solid #e5e7eb;
          }
          .order-table td {
            padding: 15px;
            font-size: 14px;
          }
          .order-table tr:last-child {
            border-bottom: 2px solid #0284c7;
            font-weight: 600;
            background-color: #f0f9ff;
          }
          .label {
            color: #666;
          }
          .value {
            text-align: right;
            color: #222;
            font-weight: 500;
          }
          .success-badge {
            display: inline-block;
            background-color: #d1fae5;
            color: #065f46;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 20px;
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
          }
          .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 30px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div style="font-size: 32px; margin-bottom: 10px;">✅</div>
            <h1>Order Confirmation</h1>
          </div>

          <!-- Content -->
          <div class="content">
            <div class="greeting">Hi ${customerName}! 👋</div>

            <div>
              <span class="success-badge">✓ Order Confirmed</span>
            </div>

            <div class="message">
              Thank you for your purchase! Your order has been received and processed successfully. You'll receive a download link shortly.
            </div>

            <!-- Order Table -->
            <table class="order-table">
              <tr>
                <td class="label">Product</td>
                <td class="value">${productTitle}</td>
              </tr>
              <tr>
                <td class="label">Order Total</td>
                <td class="value">$${(price / 100).toFixed(2)}</td>
              </tr>
            </table>

            <div class="divider"></div>

            <div class="message">
              <strong>What's Next?</strong><br>
              • Check your email for the download link<br>
              • Download your digital product<br>
              • Keep this order confirmation for your records
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p class="footer-text">
              © 2026 DigitalMarket. All rights reserved.<br>
              <a href="https://digitalmarket.example.com/privacy" style="color: #0284c7; text-decoration: none;">Privacy Policy</a> •
              <a href="https://digitalmarket.example.com/support" style="color: #0284c7; text-decoration: none;">Support</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
