/**
 * Product-specific content map.
 * Keys match the `slug` column in the products table.
 * Each entry defines a unique visual identity, copyable code snippets,
 * feature list, included files, and color theme for the detail page.
 */

export interface CodeSnippet {
  label: string;
  language: string;
  code: string;
}

export interface ProductContent {
  emoji: string;
  gradient: string;       // Tailwind gradient classes for the hero image
  accentColor: string;    // Tailwind text-* class for accent
  accentBg: string;       // Tailwind bg-* class for light tint
  accentBorder: string;   // Tailwind border-* class
  tagline: string;
  highlights: string[];   // bullet points shown in "What's Inside"
  codeSnippets: CodeSnippet[];
  colorPalette?: { name: string; hex: string }[];
  /** Visual template page mockup definitions — used by e-commerce / landing page products */
  templatePreviews?: { title: string; description: string; pageKey: string }[];
}

// Slug → content
export const PRODUCT_CONTENT: Record<string, ProductContentData> = {
  /* ───────────────────────────────────────── 1. UI Kit ── */
  "ui-kit-modern-components": {
    emoji: "🎨",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    accentColor: "text-indigo-600",
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-200",
    tagline: "200+ production-ready UI components in one kit",
    highlights: [
      "200+ components: buttons, cards, badges, modals, forms, tables",
      "10 colour themes (light + dark) ready to toggle",
      "Figma source file + HTML/CSS/React versions",
      "Accessible — WCAG 2.1 AA compliant",
      "Tailwind CSS utility classes included",
      "Responsive breakpoints for mobile, tablet, desktop",
    ],
    colorPalette: [
      { name: "Primary Blue",   hex: "#3B82F6" },
      { name: "Indigo",         hex: "#6366F1" },
      { name: "Purple",         hex: "#8B5CF6" },
      { name: "Success Green",  hex: "#22C55E" },
      { name: "Warning Amber",  hex: "#F59E0B" },
      { name: "Danger Red",     hex: "#EF4444" },
      { name: "Neutral 900",    hex: "#0F172A" },
      { name: "Neutral 50",     hex: "#F8FAFC" },
    ],
    codeSnippets: [
      {
        label: "Primary Button",
        language: "html",
        code: `<button class="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold
  hover:bg-indigo-700 active:scale-95 transition-all shadow-md">
  Get Started
</button>`,
      },
      {
        label: "Gradient Button",
        language: "html",
        code: `<button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600
  text-white rounded-xl font-semibold hover:opacity-90 shadow-lg">
  Buy Now
</button>`,
      },
      {
        label: "Outline Button",
        language: "html",
        code: `<button class="px-6 py-3 border-2 border-indigo-600 text-indigo-600
  rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
  Learn More
</button>`,
      },
      {
        label: "React Component",
        language: "tsx",
        code: `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost:   "text-indigo-600 hover:bg-indigo-50",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5", lg: "px-7 py-3.5 text-lg" };
  return <button className={\`\${base} \${variants[variant]} \${sizes[size]} \${className}\`} {...props} />;
}`,
      },
      {
        label: "Card Component",
        language: "tsx",
        code: `export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={\`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm
        hover:shadow-md transition-shadow \${className}\`}
      {...props}
    >
      {children}
    </div>
  );
}`,
      },
    ],
  },

  /* ──────────────────────── 2. E-commerce Template ── */
  "ecommerce-website-template": {
    emoji: "🛒",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    accentColor: "text-emerald-700",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    tagline: "Full Next.js e-commerce app — launch your store in a day",
    highlights: [
      "Complete Next.js 14 + Tailwind CSS source code — fully editable",
      "15 pre-built page templates: Home, Shop, Product, Cart, Checkout, Order Confirmation, About, Contact, Blog, FAQ, Login, Sign Up, Account, Admin Dashboard, 404",
      "Stripe payment integration wired up out of the box",
      "Supabase database + authentication pre-configured",
      "Admin panel: manage products, orders, customers",
      "SEO-ready: Open Graph, sitemap, structured data",
      "Mobile-first responsive design — looks great on all screen sizes",
    ],
    colorPalette: [
      { name: "Brand Teal",    hex: "#14B8A6" },
      { name: "Emerald",       hex: "#10B981" },
      { name: "Stripe Blue",   hex: "#635BFF" },
      { name: "Dark Navy",     hex: "#0F172A" },
      { name: "Light Mint",    hex: "#ECFDF5" },
      { name: "Accent Amber",  hex: "#F59E0B" },
    ],
    codeSnippets: [
      {
        label: "Product Card Component",
        language: "tsx",
        code: `// components/ProductCard.tsx
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={\`/product/\${product.slug}\`}>
      <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden
        hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="aspect-[4/3] bg-gradient-to-br from-teal-400 to-emerald-600
          flex items-center justify-center text-6xl">
          {product.emoji ?? "🛍️"}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-slate-900 mb-1 text-lg">{product.title}</h3>
          <p className="text-sm text-slate-500 line-clamp-2 mb-4">{product.description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-2xl font-bold text-emerald-700">
              \${(product.price / 100).toFixed(2)}
            </span>
            <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold
              rounded-lg hover:bg-emerald-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}`,
      },
      {
        label: "Shopping Cart Hook",
        language: "tsx",
        code: `// hooks/useCart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem { id: string; title: string; price: number; quantity: number }
interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === item.id);
          if (existing) {
            return { items: s.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
          }
          return { items: [...s.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);`,
      },
      {
        label: "Stripe Checkout Session",
        language: "ts",
        code: `// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { items } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((item: { title: string; price: number; quantity: number }) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.price,           // price in cents
        product_data: { name: item.title },
      },
      quantity: item.quantity,
    })),
    success_url: \`\${process.env.NEXT_PUBLIC_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_URL}/cart\`,
  });

  return NextResponse.json({ url: session.url });
}`,
      },
      {
        label: "Fetch Products (Server Action)",
        language: "ts",
        code: `// actions/products.ts
"use server";
import { createServerClient } from "@/lib/supabase/server";

export async function fetchProducts(options?: {
  search?: string;
  category?: string;
  sortBy?: "price_asc" | "price_desc" | "newest";
}) {
  const supabase = await createServerClient();
  let query = supabase.from("products").select("*");

  if (options?.search) {
    query = query.ilike("title", \`%\${options.search}%\`);
  }
  if (options?.category) {
    query = query.eq("category", options.category);
  }
  if (options?.sortBy === "price_asc")  query = query.order("price", { ascending: true });
  if (options?.sortBy === "price_desc") query = query.order("price", { ascending: false });
  if (options?.sortBy === "newest")     query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}`,
      },
    ],
    templatePreviews: [
      { title: "Homepage", description: "Hero banner, featured products, testimonials, newsletter signup", pageKey: "ecom-home" },
      { title: "Shop / Product Listing", description: "Grid of products with search, category filter, and sort controls", pageKey: "ecom-shop" },
      { title: "Product Detail", description: "Product image, description, price, Add to Cart button, reviews section", pageKey: "ecom-product" },
      { title: "Shopping Cart", description: "Cart items, quantity controls, order summary, proceed to checkout", pageKey: "ecom-cart" },
      { title: "Checkout", description: "Shipping address form, payment via Stripe, order review", pageKey: "ecom-checkout" },
      { title: "Order Confirmation", description: "Success message, order number, download links or delivery info", pageKey: "ecom-success" },
    ],
  },

  /* ──────────────────────────── 3. Figma Design System ── */
  "figma-design-system": {
    emoji: "✏️",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    accentColor: "text-violet-700",
    accentBg: "bg-violet-50",
    accentBorder: "border-violet-200",
    tagline: "500+ Figma components with token-based design system",
    highlights: [
      "500+ components organised in Figma (auto-layout, variants)",
      "Full design token system: colour, typography, spacing, shadow",
      "Figma variables mapped to CSS custom properties",
      "Dark-mode variant library built in",
      "Component documentation page included",
      "Typography scale (heading / body / caption)",
      "Grid & layout guidelines with column systems",
    ],
    colorPalette: [
      { name: "Violet 600",  hex: "#7C3AED" },
      { name: "Purple 500",  hex: "#A855F7" },
      { name: "Fuchsia 400", hex: "#E879F9" },
      { name: "Indigo 900",  hex: "#1E1B4B" },
      { name: "Neutral 100", hex: "#F3F4F6" },
      { name: "White",       hex: "#FFFFFF" },
    ],
    codeSnippets: [
      {
        label: "CSS Design Tokens",
        language: "css",
        code: `:root {
  /* Colors */
  --color-primary:    #7C3AED;
  --color-primary-lt: #EDE9FE;
  --color-secondary:  #A855F7;
  --color-surface:    #FFFFFF;
  --color-on-surface: #1E1B4B;

  /* Typography */
  --font-sans:   "Inter", sans-serif;
  --font-display:"Space Grotesk", sans-serif;
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base:  1rem;
  --text-lg:    1.125rem;
  --text-xl:    1.25rem;
  --text-2xl:   1.5rem;
  --text-4xl:   2.25rem;

  /* Spacing scale (4px base) */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,.10);
  --shadow-lg: 0 10px 32px rgba(0,0,0,.15);
}`,
      },
      {
        label: "Tailwind Config (matching tokens)",
        language: "ts",
        code: `// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          light:   "#EDE9FE",
          dark:    "#5B21B6",
        },
        secondary: "#A855F7",
      },
      fontFamily: {
        sans:    ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,.10)",
        hero: "0 10px 32px rgba(0,0,0,.15)",
      },
    },
  },
};
export default config;`,
      },
    ],
  },

  /* ────────────────────────── 4. Mobile App UI Kit ── */
  "mobile-app-ui-kit": {
    emoji: "📱",
    gradient: "from-pink-400 via-rose-500 to-orange-400",
    accentColor: "text-rose-600",
    accentBg: "bg-rose-50",
    accentBorder: "border-rose-200",
    tagline: "150+ mobile screens for iOS & Android apps",
    highlights: [
      "150+ screens: onboarding, auth, home, profile, settings, payments",
      "iOS (SF Pro) & Android (Material 3) variants",
      "React Native + Expo component code included",
      "Gesture-friendly tap targets (48px minimum)",
      "Safe-area inset utilities ready to drop in",
      "Dark mode versions of every screen",
    ],
    colorPalette: [
      { name: "Rose 500",    hex: "#F43F5E" },
      { name: "Orange 400",  hex: "#FB923C" },
      { name: "Pink 300",    hex: "#F9A8D4" },
      { name: "Dark BG",     hex: "#18181B" },
      { name: "Surface",     hex: "#FAFAFA" },
      { name: "Muted Text",  hex: "#71717A" },
    ],
    codeSnippets: [
      {
        label: "React Native Button",
        language: "tsx",
        code: `import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  variant?: "primary" | "outline";
  onPress: () => void;
}

export function AppButton({ title, variant = "primary", onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.base, variant === "outline" ? styles.outline : styles.primary]}
    >
      <Text style={[styles.label, variant === "outline" && styles.outlineLabel]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base:         { borderRadius: 14, paddingVertical: 14, paddingHorizontal: 24, alignItems: "center" },
  primary:      { backgroundColor: "#F43F5E" },
  outline:      { borderWidth: 2, borderColor: "#F43F5E", backgroundColor: "transparent" },
  label:        { fontSize: 16, fontWeight: "600", color: "#fff" },
  outlineLabel: { color: "#F43F5E" },
});`,
      },
      {
        label: "Safe Area Screen Wrapper",
        language: "tsx",
        code: `import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export function Screen({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <SafeAreaView style={[styles.screen, dark && styles.dark]}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FAFAFA" },
  dark:   { backgroundColor: "#18181B" },
});`,
      },
    ],
  },

  /* ─────────────────── 5. Landing Page Templates ── */
  "landing-page-templates-collection": {
    emoji: "🚀",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    accentColor: "text-sky-700",
    accentBg: "bg-sky-50",
    accentBorder: "border-sky-200",
    tagline: "15 high-converting landing pages — copy, paste, launch",
    highlights: [
      "15 distinct templates: SaaS, startup, product, agency, portfolio",
      "React + Tailwind CSS + Framer Motion animations",
      "Hero, Features, Pricing, Testimonials, CTA, Footer sections",
      "A/B variant headlines included per template",
      "Email capture form with validation",
      "Perfect Lighthouse score (100/100 perf)",
    ],
    colorPalette: [
      { name: "Sky 500",    hex: "#0EA5E9" },
      { name: "Blue 600",   hex: "#2563EB" },
      { name: "Indigo 700", hex: "#4338CA" },
      { name: "Off-White",  hex: "#F0F9FF" },
      { name: "Slate 900",  hex: "#0F172A" },
      { name: "Amber CTA",  hex: "#F59E0B" },
    ],
    codeSnippets: [
      {
        label: "Hero Section",
        language: "tsx",
        code: `export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-100 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold
          text-sky-700 tracking-wide uppercase mb-6">
          New · Version 2.0 just shipped
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
          Ship your product<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
            10× faster
          </span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Pre-built landing pages, components, and animations.
          Copy the code. Customise. Launch today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#buy" className="px-8 py-4 bg-sky-600 text-white rounded-2xl font-bold
            text-lg hover:bg-sky-700 shadow-xl shadow-sky-200 transition">
            Get 15 Templates — $24
          </a>
          <a href="#demo" className="px-8 py-4 border-2 border-slate-300 text-slate-700
            rounded-2xl font-bold text-lg hover:border-sky-400 transition">
            Live Preview →
          </a>
        </div>
      </div>
    </section>
  );
}`,
      },
      {
        label: "Pricing Card",
        language: "tsx",
        code: `export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div className={\`rounded-3xl border-2 p-8 text-center transition hover:shadow-2xl
      \${plan.featured ? "border-sky-500 bg-sky-600 text-white" : "border-slate-200 bg-white"}\`}>
      <p className="text-sm font-semibold uppercase tracking-widest mb-2">{plan.name}</p>
      <p className="text-5xl font-extrabold mb-1">\${plan.price}</p>
      <p className="text-sm opacity-75 mb-8">/month billed annually</p>
      <ul className="space-y-3 mb-10 text-left">
        {plan.features.map(f => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <span className="text-green-400 font-bold">✓</span> {f}
          </li>
        ))}
      </ul>
      <button className={\`w-full rounded-2xl py-3 font-bold
        \${plan.featured ? "bg-white text-sky-600 hover:bg-sky-50" : "bg-sky-600 text-white hover:bg-sky-700"}\`}>
        {plan.cta}
      </button>
    </div>
  );
}`,
      },
    ],
  },

  /* ────────────────────────── 6. Icon Library ── */
  "icon-library-5000-icons": {
    emoji: "🔷",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    accentColor: "text-orange-600",
    accentBg: "bg-orange-50",
    accentBorder: "border-orange-200",
    tagline: "5,000+ icons in SVG & PNG — outline, filled, duo-tone",
    highlights: [
      "5,000+ icons across 20+ categories",
      "3 styles per icon: outline, filled, duo-tone",
      "SVG (scalable) + PNG @1× @2× @3×",
      "Sprite sheet included for performance",
      "React icon components auto-generated",
      "Search-friendly naming convention",
      "Free to use in commercial projects",
    ],
    codeSnippets: [
      {
        label: "SVG Icon (inline)",
        language: "html",
        code: `<!-- Outline style, 24x24 -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
  viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
  <path d="M2 17l10 5 10-5"/>
  <path d="M2 12l10 5 10-5"/>
</svg>`,
      },
      {
        label: "React Icon Wrapper",
        language: "tsx",
        code: `interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;      // e.g. "layers"
  size?: number;
  style?: "outline" | "filled" | "duotone";
}

export function Icon({ name, size = 24, style = "outline", className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-label={name}
      {...props}
    >
      <use href={\`/icons/sprite-\${style}.svg#\${name}\`} />
    </svg>
  );
}

// Usage:
// <Icon name="layers" size={32} style="filled" className="text-orange-500" />`,
      },
      {
        label: "CSS Sprite Usage",
        language: "css",
        code: `/* Sprite-based icons (no JS needed) */
.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("/icons/sprite-outline.svg");
  background-repeat: no-repeat;
}

/* Individual icon positions */
.icon-layers  { background-position: 0px    0px; }
.icon-home    { background-position: -24px  0px; }
.icon-star    { background-position: -48px  0px; }
.icon-heart   { background-position: -72px  0px; }
.icon-search  { background-position: -96px  0px; }`,
      },
    ],
  },

  /* ──────────────────────── 7. Dashboard Template Pro ── */
  "dashboard-template-pro": {
    emoji: "📊",
    gradient: "from-slate-700 via-slate-800 to-gray-900",
    accentColor: "text-slate-700",
    accentBg: "bg-slate-50",
    accentBorder: "border-slate-300",
    tagline: "20-page React + TypeScript admin dashboard, production-ready",
    highlights: [
      "20+ pages: overview, analytics, users, orders, settings, reports",
      "Recharts-powered data visualisations (line, bar, pie, area)",
      "Data table with sorting, pagination, bulk actions",
      "Role-based access control (RBAC) setup",
      "Dark + light mode toggle wired up",
      "REST API integration layer (axios + react-query)",
      "TypeScript strict mode — zero any",
    ],
    colorPalette: [
      { name: "Slate 900",  hex: "#0F172A" },
      { name: "Slate 700",  hex: "#334155" },
      { name: "Slate 200",  hex: "#E2E8F0" },
      { name: "Cyan 500",   hex: "#06B6D4" },
      { name: "Green 500",  hex: "#22C55E" },
      { name: "Red 500",    hex: "#EF4444" },
    ],
    codeSnippets: [
      {
        label: "Stat Card Component",
        language: "tsx",
        code: `interface StatCardProps {
  title: string;
  value: string | number;
  change: number;          // percentage, positive = up
  icon: React.ReactNode;
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  const isUp = change >= 0;
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200
      dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
        <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{value}</p>
      <p className={\`text-xs font-semibold \${isUp ? "text-green-600" : "text-red-500"}\`}>
        {isUp ? "▲" : "▼"} {Math.abs(change)}% from last month
      </p>
    </div>
  );
}`,
      },
      {
        label: "Data Table (sortable)",
        language: "tsx",
        code: `"use client";
import { useState } from "react";

type SortDir = "asc" | "desc";

export function DataTable<T extends Record<string, unknown>>({
  columns, data,
}: {
  columns: { key: keyof T; label: string }[];
  data: T[];
}) {
  const [sortKey, setSortKey] = useState<keyof T>(columns[0].key);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted = [...data].sort((a, b) => {
    const va = String(a[sortKey]), vb = String(b[sortKey]);
    return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const toggle = (key: keyof T) => {
    if (key === sortKey) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  return (
    <table className="w-full text-sm">
      <thead className="bg-slate-50 dark:bg-slate-900">
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}
              onClick={() => toggle(col.key)}
              className="px-4 py-3 text-left font-semibold text-slate-600 cursor-pointer
                hover:text-cyan-600 select-none">
              {col.label} {sortKey === col.key ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => (
          <tr key={i} className="border-t border-slate-100 dark:border-slate-800
            hover:bg-slate-50 dark:hover:bg-slate-800/50">
            {columns.map(col => (
              <td key={String(col.key)} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}`,
      },
    ],
  },

  /* ─────────────────── 8. Web Design Principles Guide ── */
  "web-design-principles-guide": {
    emoji: "📖",
    gradient: "from-lime-400 via-green-500 to-emerald-600",
    accentColor: "text-green-700",
    accentBg: "bg-green-50",
    accentBorder: "border-green-200",
    tagline: "150-page visual guide to modern web design — illustrated",
    highlights: [
      "150+ pages covering layout, typography, colour theory, UX patterns",
      "50+ real-world before/after design case studies",
      "Typography pairing cheat sheets (Google Fonts)",
      "Colour palette generator formulas",
      "Responsive grid system guide",
      "Accessibility (WCAG) quick-reference card",
      "Instant PDF download — readable on any device",
    ],
    colorPalette: [
      { name: "Forest Green", hex: "#166534" },
      { name: "Lime 400",    hex: "#A3E635" },
      { name: "Emerald 500", hex: "#10B981" },
      { name: "Warm White",  hex: "#FAFAF9" },
      { name: "Stone 700",   hex: "#44403C" },
      { name: "Amber 400",   hex: "#FBBF24" },
    ],
    codeSnippets: [
      {
        label: "Typography Scale (CSS)",
        language: "css",
        code: `/* Modular Scale — ratio 1.25 (Major Third) */
:root {
  --step--2: clamp(0.64rem,  0.60rem + 0.20vw, 0.72rem);
  --step--1: clamp(0.80rem,  0.75rem + 0.25vw, 0.90rem);
  --step-0:  clamp(1.00rem,  0.94rem + 0.31vw, 1.13rem);  /* base */
  --step-1:  clamp(1.25rem,  1.17rem + 0.39vw, 1.41rem);
  --step-2:  clamp(1.56rem,  1.46rem + 0.49vw, 1.76rem);
  --step-3:  clamp(1.95rem,  1.83rem + 0.61vw, 2.20rem);
  --step-4:  clamp(2.44rem,  2.29rem + 0.77vw, 2.75rem);
  --step-5:  clamp(3.05rem,  2.86rem + 0.96vw, 3.43rem);
}

body    { font-size: var(--step-0); line-height: 1.65; }
h1      { font-size: var(--step-5); line-height: 1.10; }
h2      { font-size: var(--step-4); line-height: 1.15; }
h3      { font-size: var(--step-3); line-height: 1.25; }`,
      },
      {
        label: "60-30-10 Color Rule",
        language: "css",
        code: `/* 60-30-10 rule: dominant / secondary / accent */
:root {
  /* 60% — dominant (backgrounds, large areas) */
  --color-60: #FAFAF9;   /* warm white */
  /* 30% — secondary (text, UI surfaces) */
  --color-30: #44403C;   /* warm dark */
  /* 10% — accent (CTAs, highlights) */
  --color-10: #10B981;   /* emerald */
}

body       { background: var(--color-60); color: var(--color-30); }
h1, h2, h3 { color: var(--color-30); }
.btn-cta   { background: var(--color-10); color: #fff; }
a          { color: var(--color-10); }`,
      },
    ],
  },

  /* ───────────────────── 9. React Components Library ── */
  "react-components-library": {
    emoji: "⚛️",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    accentColor: "text-sky-700",
    accentBg: "bg-sky-50",
    accentBorder: "border-sky-200",
    tagline: "50+ TypeScript React components with Storybook + docs",
    highlights: [
      "50+ components: inputs, selects, modals, toasts, tooltips, popovers",
      "Full TypeScript types + JSDoc comments",
      "Storybook stories for every component",
      "Unit tests with Vitest + Testing Library",
      "Accessible — ARIA roles, keyboard nav, focus traps",
      "Tree-shakeable ESM build",
      "Zero runtime CSS-in-JS — plain Tailwind classes",
    ],
    colorPalette: [
      { name: "Cyan 500",    hex: "#06B6D4" },
      { name: "Sky 600",     hex: "#0284C7" },
      { name: "Blue 700",    hex: "#1D4ED8" },
      { name: "Slate 50",    hex: "#F8FAFC" },
      { name: "Slate 900",   hex: "#0F172A" },
      { name: "Focus Ring",  hex: "#38BDF8" },
    ],
    codeSnippets: [
      {
        label: "Modal Component",
        language: "tsx",
        code: `import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus & close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Panel */}
      <div ref={dialogRef} tabIndex={-1}
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl
          outline-none focus:ring-2 focus:ring-sky-400">
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}`,
      },
      {
        label: "Toast Notification Hook",
        language: "tsx",
        code: `import { useState, useCallback } from "react";

interface Toast { id: string; message: string; type: "success" | "error" | "info" }

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = crypto.randomUUID();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  }, []);

  const ToastContainer = () => (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id}
          className={\`px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg
            animate-in slide-in-from-right
            \${t.type === "success" ? "bg-green-600" : t.type === "error" ? "bg-red-600" : "bg-sky-600"}\`}>
          {t.message}
        </div>
      ))}
    </div>
  );

  return { toast, ToastContainer };
}

// Usage:
// const { toast, ToastContainer } = useToast();
// toast("Saved!", "success");
// <ToastContainer />`,
      },
    ],
  },

  /* ──────────────────── 10. Brand Identity Kit ── */
  "brand-identity-kit-template": {
    emoji: "🎯",
    gradient: "from-yellow-400 via-orange-500 to-pink-500",
    accentColor: "text-orange-700",
    accentBg: "bg-orange-50",
    accentBorder: "border-orange-200",
    tagline: "Complete brand identity — logo, colours, type, guidelines",
    highlights: [
      "Logo variations: primary, secondary, icon-only, horizontal, stacked",
      "Brand colour palette with hex, RGB, CMYK, Pantone codes",
      "Typography pairing guide with licensing info",
      "Brand guidelines PDF (spacing, clear space, misuse examples)",
      "Social media kit: profile pics, banners, story templates",
      "Editable in Adobe Illustrator, Photoshop, and Figma",
      "Business card + letterhead templates included",
    ],
    colorPalette: [
      { name: "Brand Yellow",  hex: "#FCD34D" },
      { name: "Warm Orange",   hex: "#F97316" },
      { name: "Brand Pink",    hex: "#EC4899" },
      { name: "Ink Black",     hex: "#1C1917" },
      { name: "Cream White",   hex: "#FFFBEB" },
      { name: "Cool Gray",     hex: "#9CA3AF" },
    ],
    codeSnippets: [
      {
        label: "CSS Brand Variables",
        language: "css",
        code: `/* ── Brand Identity Tokens ── */
:root {
  /* Core palette */
  --brand-primary:    #F97316;  /* Warm Orange */
  --brand-secondary:  #EC4899;  /* Pink */
  --brand-accent:     #FCD34D;  /* Yellow */
  --brand-dark:       #1C1917;  /* Ink Black */
  --brand-light:      #FFFBEB;  /* Cream */

  /* Typography */
  --font-heading: "Plus Jakarta Sans", sans-serif;
  --font-body:    "DM Sans", sans-serif;

  /* Logo clear-space rule: minimum = cap-height of the "B" */
  --logo-clear-space: 1.5rem;

  /* Gradient (use sparingly — CTAs, hero) */
  --brand-gradient: linear-gradient(135deg, #FCD34D 0%, #F97316 50%, #EC4899 100%);
}

.btn-brand {
  background: var(--brand-gradient);
  color: #fff;
  font-family: var(--font-heading);
  font-weight: 700;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  letter-spacing: 0.02em;
}`,
      },
      {
        label: "Social Media Sizes (reference)",
        language: "ts",
        code: `// Brand social media dimension reference
export const SOCIAL_SIZES = {
  // Profile pictures
  instagramProfile:  { w: 320,  h: 320  },
  twitterProfile:    { w: 400,  h: 400  },
  linkedInProfile:   { w: 400,  h: 400  },
  facebookProfile:   { w: 170,  h: 170  },
  // Banners / covers
  twitterBanner:     { w: 1500, h: 500  },
  linkedInBanner:    { w: 1584, h: 396  },
  facebookCover:     { w: 820,  h: 312  },
  youtubeCover:      { w: 2560, h: 1440 },
  // Post templates
  instagramSquare:   { w: 1080, h: 1080 },
  instagramPortrait: { w: 1080, h: 1350 },
  instagramStory:    { w: 1080, h: 1920 },
  linkedInPost:      { w: 1200, h: 627  },
} as const;`,
      },
    ],
  },
};

// Runtime type alias used above (avoid circular import)
export type ProductContentData = ProductContent;
