-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS downloads CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  product_id UUID NOT NULL REFERENCES products(id),
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  amount_paid INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Downloads table
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  download_token VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_stripe_session ON orders(stripe_session_id);
CREATE INDEX idx_downloads_order_id ON downloads(order_id);

-- Row Level Security

-- Users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own record" ON users
  FOR SELECT USING (auth.uid()::uuid = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    auth.uid()::uuid IN (SELECT id FROM users WHERE is_admin = TRUE)
  );

-- Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable" ON products
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert products" ON products
  FOR INSERT WITH CHECK (
    auth.uid()::uuid IN (SELECT id FROM users WHERE is_admin = TRUE)
  );

CREATE POLICY "Only admins can update products" ON products
  FOR UPDATE USING (
    auth.uid()::uuid IN (SELECT id FROM users WHERE is_admin = TRUE)
  );

CREATE POLICY "Only admins can delete products" ON products
  FOR DELETE USING (
    auth.uid()::uuid IN (SELECT id FROM users WHERE is_admin = TRUE)
  );

-- Orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid()::uuid = user_id);

CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    auth.uid()::uuid IN (SELECT id FROM users WHERE is_admin = TRUE)
  );

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid()::uuid = user_id);

-- Downloads
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own downloads" ON downloads
  FOR SELECT USING (
    auth.uid()::uuid = (SELECT user_id FROM orders WHERE id = order_id)
  );

CREATE POLICY "System can insert downloads" ON downloads
  FOR INSERT WITH CHECK (true);

-- INSERT SAMPLE PRODUCTS
INSERT INTO products (title, slug, description, price, file_url) VALUES
(
  'UI Kit - Modern Components',
  'ui-kit-modern-components',
  'A comprehensive collection of 200+ modern UI components for web design. Includes buttons, cards, forms, navigation, modals, and more. Perfect for designers and developers looking to speed up their workflow.',
  2999,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/ui-kit.zip'
),
(
  'E-commerce Website Template',
  'ecommerce-website-template',
  'Complete Next.js + Tailwind CSS e-commerce template. Fully functional with product catalog, shopping cart, checkout, and admin dashboard. Perfect for launching your online store quickly.',
  4999,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/ecommerce-template.zip'
),
(
  'Figma Design System',
  'figma-design-system',
  'Professional design system in Figma with 500+ components. Includes color tokens, typography scale, spacing system, and complete documentation. Ideal for scaling your design process.',
  3499,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/design-system.fig'
),
(
  'Mobile App UI Kit',
  'mobile-app-ui-kit',
  'iOS and Android mobile UI kit with 150+ screens and components. Includes common patterns like authentication, onboarding, profiles, and payments. Ready for immediate use.',
  1999,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/mobile-ui.zip'
),
(
  'Landing Page Templates Collection',
  'landing-page-templates-collection',
  'Pack of 15 high-converting landing page templates. Built with React, Tailwind CSS, and Framer Motion. Perfect for SaaS, startups, and products. Fully customizable.',
  2499,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/landing-pages.zip'
),
(
  'Icon Library - 5000+ Icons',
  'icon-library-5000-icons',
  'Extensive icon library with 5000+ icons in SVG and PNG formats. Available in multiple styles: outline, filled, and duo-tone. Perfect for any web or app project.',
  1499,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/icon-library.zip'
),
(
  'Dashboard Template Pro',
  'dashboard-template-pro',
  'Professional admin dashboard template built with React and TypeScript. Includes 20+ pages, data tables, charts, analytics, and user management. Production-ready code.',
  5999,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/dashboard-pro.zip'
),
(
  'Web Design Principles Guide',
  'web-design-principles-guide',
  'Comprehensive PDF guide covering modern web design principles. Includes best practices, case studies, and practical tips. 150+ pages with illustrations and examples.',
  999,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/design-guide.pdf'
),
(
  'React Components Library',
  'react-components-library',
  'Pre-built React components library with TypeScript support. Includes 50+ components with documentation and Storybook integration. Save months of development time.',
  3999,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/react-library.zip'
),
(
  'Brand Identity Kit Template',
  'brand-identity-kit-template',
  'Complete brand identity template including logo variations, color palette, typography, imagery guidelines, and brand guidelines document. Fully editable in Adobe Suite.',
  2499,
  'https://mnwwzzqrzfeffjkqbxfb.supabase.co/storage/v1/object/public/product-files/brand-kit.zip'
);

-- Verify inserted products
SELECT COUNT(*) as total_products FROM products;
SELECT id, title, slug, price FROM products ORDER BY created_at DESC;
