import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchProductBySlug } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PRODUCT_CONTENT } from "@/lib/product-content";
import { CopyButton } from "./copy-button";

/* ─── Rendered template mockups keyed by pageKey ─── */
function TemplateMockup({ pageKey }: { pageKey: string }) {
	if (pageKey === "ecom-home") {
		return (
			<div className="border-2 border-slate-200 rounded-xl overflow-hidden text-xs bg-white shadow-sm">
				{/* Nav */}
				<div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
					<span className="font-bold text-sm">ShopName</span>
					<div className="flex gap-4 text-slate-300 text-xs">
						<span>Home</span><span>Shop</span><span>About</span><span>Contact</span>
					</div>
					<div className="flex gap-2">
						<span className="px-3 py-1 border border-slate-600 rounded text-xs">Sign In</span>
						<span className="px-3 py-1 bg-teal-600 rounded text-xs">Cart (2)</span>
					</div>
				</div>
				{/* Hero */}
				<div className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-8 py-10 text-center">
					<p className="text-xs font-semibold uppercase tracking-widest text-teal-100 mb-2">Summer Collection 2025</p>
					<h2 className="text-2xl font-extrabold mb-3">Discover Premium Products<br />Delivered to Your Door</h2>
					<p className="text-teal-100 text-xs mb-5 max-w-sm mx-auto">Browse our hand-picked selection of high-quality products with free shipping on orders over $50.</p>
					<div className="flex gap-3 justify-center">
						<button className="px-5 py-2 bg-white text-teal-700 rounded-lg font-bold text-xs hover:bg-teal-50">Shop Now</button>
						<button className="px-5 py-2 border border-white/50 text-white rounded-lg text-xs">View Deals</button>
					</div>
				</div>
				{/* Featured products strip */}
				<div className="px-6 py-6">
					<p className="font-bold text-slate-800 mb-4 text-sm">Featured Products</p>
					<div className="grid grid-cols-3 gap-3">
						{[
							{ name: "Wireless Headphones", price: "$79.99", tag: "Best Seller" },
							{ name: "Leather Wallet", price: "$34.99", tag: "New" },
							{ name: "Running Shoes", price: "$119.99", tag: "Sale" },
						].map((p) => (
							<div key={p.name} className="border border-slate-200 rounded-lg overflow-hidden">
								<div className="h-16 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xl">🛍️</div>
								<div className="p-2">
									<span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">{p.tag}</span>
									<p className="text-xs font-semibold text-slate-800 mt-1 leading-tight">{p.name}</p>
									<p className="text-xs font-bold text-emerald-700 mt-0.5">{p.price}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* Newsletter */}
				<div className="bg-emerald-50 border-t border-emerald-100 px-6 py-5 text-center">
					<p className="font-bold text-slate-800 text-sm mb-1">Get 10% Off Your First Order</p>
					<p className="text-xs text-slate-500 mb-3">Subscribe for exclusive deals and new arrivals.</p>
					<div className="flex gap-2 max-w-xs mx-auto">
						<input readOnly value="your@email.com" className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-400" />
						<button className="px-4 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold">Subscribe</button>
					</div>
				</div>
				{/* Footer */}
				<div className="bg-slate-900 text-slate-400 px-6 py-4 text-center text-[10px]">
					© 2025 ShopName · Privacy Policy · Terms of Service · Contact Us
				</div>
			</div>
		);
	}

	if (pageKey === "ecom-shop") {
		return (
			<div className="border-2 border-slate-200 rounded-xl overflow-hidden text-xs bg-white shadow-sm">
				<div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between">
					<span className="font-bold text-sm">ShopName</span>
					<span className="px-3 py-1 bg-teal-600 rounded text-xs">Cart (2)</span>
				</div>
				<div className="flex">
					{/* Sidebar filters */}
					<div className="w-36 border-r border-slate-200 p-3 flex-shrink-0">
						<p className="font-bold text-slate-700 mb-3">Filters</p>
						<p className="font-semibold text-slate-600 text-[10px] uppercase tracking-wide mb-1.5">Category</p>
						{["All", "Electronics", "Clothing", "Accessories", "Home & Garden"].map((c) => (
							<label key={c} className="flex items-center gap-1.5 mb-1 cursor-pointer">
								<input type="checkbox" readOnly className="w-3 h-3 accent-teal-600" checked={c === "All"} />
								<span className="text-slate-600">{c}</span>
							</label>
						))}
						<p className="font-semibold text-slate-600 text-[10px] uppercase tracking-wide mt-3 mb-1.5">Price Range</p>
						<div className="space-y-1">
							{["Under $25", "$25 – $50", "$50 – $100", "Over $100"].map((r) => (
								<label key={r} className="flex items-center gap-1.5 cursor-pointer">
									<input type="radio" readOnly name="price" className="w-3 h-3 accent-teal-600" />
									<span className="text-slate-600">{r}</span>
								</label>
							))}
						</div>
					</div>
					{/* Main grid */}
					<div className="flex-1 p-3">
						<div className="flex items-center justify-between mb-3">
							<p className="text-slate-500">Showing <strong className="text-slate-800">24</strong> products</p>
							<select className="border border-slate-200 rounded px-2 py-1 text-[10px]">
								<option>Sort: Newest</option>
							</select>
						</div>
						<div className="grid grid-cols-3 gap-2.5">
							{[
								{ name: "Wireless Headphones", price: "$79.99", rating: "4.8" },
								{ name: "Leather Wallet", price: "$34.99", rating: "4.6" },
								{ name: "Running Shoes", price: "$119.99", rating: "4.9" },
								{ name: "Sunglasses", price: "$49.99", rating: "4.5" },
								{ name: "Smart Watch", price: "$199.99", rating: "4.7" },
								{ name: "Coffee Maker", price: "$89.99", rating: "4.4" },
							].map((p) => (
								<div key={p.name} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition">
									<div className="h-14 bg-gradient-to-br from-slate-100 to-teal-50 flex items-center justify-center text-lg">🛍️</div>
									<div className="p-2">
										<p className="text-[10px] font-semibold text-slate-800 leading-tight">{p.name}</p>
										<p className="text-[10px] text-amber-500 mt-0.5">★ {p.rating}</p>
										<p className="text-xs font-bold text-emerald-700 mt-0.5">{p.price}</p>
										<button className="mt-1.5 w-full py-1 bg-teal-600 text-white rounded text-[10px] font-semibold">Add to Cart</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (pageKey === "ecom-product") {
		return (
			<div className="border-2 border-slate-200 rounded-xl overflow-hidden text-xs bg-white shadow-sm">
				<div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between">
					<span className="font-bold text-sm">ShopName</span>
					<span className="text-slate-400 text-xs">Home &rsaquo; Shop &rsaquo; Electronics &rsaquo; Wireless Headphones</span>
					<span className="px-3 py-1 bg-teal-600 rounded text-xs">Cart (2)</span>
				</div>
				<div className="flex gap-0">
					{/* Product image */}
					<div className="w-48 flex-shrink-0 bg-gradient-to-br from-slate-100 to-teal-50 flex items-center justify-center text-6xl p-6">
						🎧
					</div>
					{/* Product info */}
					<div className="flex-1 p-5 border-l border-slate-200">
						<p className="text-[10px] font-semibold text-teal-600 uppercase tracking-wide mb-1">Electronics · Headphones</p>
						<h3 className="text-base font-extrabold text-slate-900 mb-1">Premium Wireless Headphones</h3>
						<p className="text-amber-500 text-[10px] mb-2">★★★★★ 4.8 · 243 reviews</p>
						<p className="text-xl font-extrabold text-emerald-700 mb-1">$79.99</p>
						<p className="text-[10px] text-green-600 font-semibold mb-3">In Stock — Ships within 24 hours</p>
						<p className="text-[10px] text-slate-600 mb-4 leading-relaxed">
							Experience rich, detailed sound with 40-hour battery life. Bluetooth 5.3, active noise cancellation, and foldable design for travel.
						</p>
						{/* Options */}
						<p className="text-[10px] font-semibold text-slate-700 mb-1.5">Color</p>
						<div className="flex gap-2 mb-3">
							{["#1e293b", "#0f766e", "#7c3aed", "#dc2626"].map((c) => (
								<div key={c} className="w-5 h-5 rounded-full border-2 border-white shadow" style={{ background: c }} />
							))}
						</div>
						<div className="flex gap-2">
							<button className="flex-1 py-2 bg-teal-600 text-white rounded-lg font-bold text-xs">Add to Cart</button>
							<button className="px-3 py-2 border border-slate-300 rounded-lg text-xs">♡ Wishlist</button>
						</div>
					</div>
				</div>
				{/* Reviews strip */}
				<div className="border-t border-slate-200 px-5 py-4">
					<p className="font-bold text-slate-800 mb-2 text-xs">Customer Reviews</p>
					<div className="grid grid-cols-2 gap-2">
						{[
							{ name: "Sarah M.", text: "Best headphones I have owned. Sound quality is incredible!", stars: 5 },
							{ name: "James R.", text: "Great build quality. Battery life is exactly as advertised.", stars: 5 },
						].map((r) => (
							<div key={r.name} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
								<p className="text-amber-500 text-[10px]">{"★".repeat(r.stars)}</p>
								<p className="text-[10px] text-slate-700 italic mt-0.5">&ldquo;{r.text}&rdquo;</p>
								<p className="text-[10px] font-semibold text-slate-500 mt-1">— {r.name}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (pageKey === "ecom-cart") {
		return (
			<div className="border-2 border-slate-200 rounded-xl overflow-hidden text-xs bg-white shadow-sm">
				<div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between">
					<span className="font-bold text-sm">ShopName</span>
					<span className="text-slate-300 text-xs">Shopping Cart (3 items)</span>
				</div>
				<div className="flex gap-0">
					{/* Cart items */}
					<div className="flex-1 p-4 border-r border-slate-200 space-y-3">
						{[
							{ name: "Premium Wireless Headphones", price: 79.99, qty: 1, emoji: "🎧" },
							{ name: "Leather Wallet — Brown", price: 34.99, qty: 2, emoji: "👜" },
							{ name: "Running Shoes — Size 10", price: 119.99, qty: 1, emoji: "👟" },
						].map((item) => (
							<div key={item.name} className="flex items-center gap-3 pb-3 border-b border-slate-100 last:border-0">
								<div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">{item.emoji}</div>
								<div className="flex-1">
									<p className="font-semibold text-slate-800 leading-tight">{item.name}</p>
									<p className="text-slate-500 text-[10px]">${item.price.toFixed(2)} each</p>
								</div>
								<div className="flex items-center gap-1 border border-slate-200 rounded-lg px-2 py-1">
									<button className="text-slate-400">−</button>
									<span className="w-4 text-center font-semibold">{item.qty}</span>
									<button className="text-slate-400">+</button>
								</div>
								<p className="font-bold text-emerald-700 w-12 text-right">${(item.price * item.qty).toFixed(2)}</p>
								<button className="text-red-400 text-xs ml-1">✕</button>
							</div>
						))}
					</div>
					{/* Order summary */}
					<div className="w-44 p-4 bg-slate-50 flex-shrink-0">
						<p className="font-bold text-slate-800 mb-3">Order Summary</p>
						<div className="space-y-1.5 text-[10px] text-slate-600">
							<div className="flex justify-between"><span>Subtotal (4 items)</span><span>$269.96</span></div>
							<div className="flex justify-between text-green-600"><span>Discount (SAVE10)</span><span>−$27.00</span></div>
							<div className="flex justify-between"><span>Shipping</span><span className="text-green-600">Free</span></div>
							<div className="flex justify-between"><span>Tax (8%)</span><span>$19.44</span></div>
						</div>
						<div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-bold text-slate-900">
							<span>Total</span><span>$262.40</span>
						</div>
						<button className="mt-3 w-full py-2 bg-teal-600 text-white rounded-lg font-bold text-xs">Checkout →</button>
						<p className="text-[10px] text-slate-400 text-center mt-1.5">🔒 Secure SSL Checkout</p>
					</div>
				</div>
			</div>
		);
	}

	if (pageKey === "ecom-checkout") {
		return (
			<div className="border-2 border-slate-200 rounded-xl overflow-hidden text-xs bg-white shadow-sm">
				<div className="bg-slate-900 text-white px-4 py-2.5 text-center">
					<span className="font-bold text-sm">ShopName</span>
					<span className="text-slate-400 text-xs ml-4">🔒 Secure Checkout</span>
				</div>
				<div className="flex">
					{/* Form */}
					<div className="flex-1 p-4 border-r border-slate-200 space-y-3">
						<p className="font-bold text-slate-800">Shipping Information</p>
						<div className="grid grid-cols-2 gap-2">
							{["First Name", "Last Name", "Email Address", "Phone Number"].map((label) => (
								<div key={label}>
									<p className="text-[10px] text-slate-500 mb-0.5">{label}</p>
									<div className="border border-slate-300 rounded-lg px-2 py-1.5 text-slate-400 bg-slate-50"></div>
								</div>
							))}
						</div>
						<div>
							<p className="text-[10px] text-slate-500 mb-0.5">Street Address</p>
							<div className="border border-slate-300 rounded-lg px-2 py-1.5 text-slate-400 bg-slate-50"></div>
						</div>
						<div className="grid grid-cols-3 gap-2">
							{["City", "State", "ZIP Code"].map((label) => (
								<div key={label}>
									<p className="text-[10px] text-slate-500 mb-0.5">{label}</p>
									<div className="border border-slate-300 rounded-lg px-2 py-1.5 bg-slate-50"></div>
								</div>
							))}
						</div>
						<p className="font-bold text-slate-800 pt-1">Payment</p>
						<div className="border-2 border-teal-500 rounded-xl p-3 bg-teal-50">
							<p className="text-teal-700 font-semibold text-[10px] mb-2">💳 Card Details (powered by Stripe)</p>
							<div className="space-y-1.5">
								<div className="border border-slate-300 rounded-lg px-2 py-1.5 bg-white text-slate-400">**** **** **** 4242</div>
								<div className="grid grid-cols-2 gap-2">
									<div className="border border-slate-300 rounded-lg px-2 py-1.5 bg-white text-slate-400">MM / YY</div>
									<div className="border border-slate-300 rounded-lg px-2 py-1.5 bg-white text-slate-400">CVC</div>
								</div>
							</div>
						</div>
						<button className="w-full py-2.5 bg-teal-600 text-white rounded-xl font-bold">Place Order — $262.40</button>
					</div>
					{/* Summary */}
					<div className="w-40 p-4 bg-slate-50 flex-shrink-0">
						<p className="font-bold text-slate-800 mb-2">Your Order</p>
						{[
							{ name: "Wireless Headphones", price: "$79.99", emoji: "🎧" },
							{ name: "Leather Wallet ×2", price: "$69.98", emoji: "👜" },
							{ name: "Running Shoes", price: "$119.99", emoji: "👟" },
						].map((i) => (
							<div key={i.name} className="flex items-center gap-1.5 mb-2">
								<span>{i.emoji}</span>
								<div className="flex-1"><p className="text-[10px] leading-tight">{i.name}</p></div>
								<p className="text-[10px] font-semibold text-emerald-700">{i.price}</p>
							</div>
						))}
						<div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-[10px]">
							<span>Total</span><span>$262.40</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (pageKey === "ecom-success") {
		return (
			<div className="border-2 border-slate-200 rounded-xl overflow-hidden text-xs bg-white shadow-sm">
				<div className="bg-slate-900 text-white px-4 py-2.5 text-center">
					<span className="font-bold text-sm">ShopName</span>
				</div>
				<div className="px-8 py-10 text-center bg-gradient-to-b from-green-50 to-white">
					<div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">✓</div>
					<h3 className="text-lg font-extrabold text-slate-900 mb-1">Order Confirmed!</h3>
					<p className="text-slate-500 text-xs mb-1">Thank you for your purchase, Sarah.</p>
					<p className="text-slate-400 text-[10px] mb-5">Order #SN-2025-08741 · Confirmation sent to sarah@example.com</p>
					<div className="bg-white border border-slate-200 rounded-xl p-4 text-left max-w-xs mx-auto mb-5">
						<p className="font-bold text-slate-700 mb-2 text-xs">Order Summary</p>
						{[
							{ name: "Wireless Headphones", price: "$79.99", emoji: "🎧" },
							{ name: "Leather Wallet ×2", price: "$69.98", emoji: "👜" },
							{ name: "Running Shoes", price: "$119.99", emoji: "👟" },
						].map((i) => (
							<div key={i.name} className="flex items-center gap-2 mb-1.5">
								<span>{i.emoji}</span>
								<span className="flex-1 text-[10px]">{i.name}</span>
								<span className="text-[10px] font-semibold text-emerald-700">{i.price}</span>
							</div>
						))}
						<div className="border-t mt-2 pt-2 flex justify-between font-bold text-[10px]">
							<span>Total Charged</span><span>$262.40</span>
						</div>
					</div>
					<p className="text-[10px] text-slate-500 mb-4">Estimated delivery: <strong>April 21–23, 2025</strong></p>
					<div className="flex gap-2 justify-center">
						<button className="px-4 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold">Track Order</button>
						<button className="px-4 py-1.5 border border-slate-300 text-slate-700 rounded-lg text-xs">Continue Shopping</button>
					</div>
				</div>
				<div className="bg-slate-900 text-slate-400 px-6 py-3 text-center text-[10px]">
					© 2025 ShopName · Need help? Contact support@shopname.com
				</div>
			</div>
		);
	}

	return null;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const product = await fetchProductBySlug(slug).catch(() => null);
	if (!product) return { title: "Product Not Found" };
	return {
		title: `${product.title} - DigitalMarket`,
		description: product.description,
		openGraph: { title: product.title, description: product.description, type: "website" },
	};
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = await fetchProductBySlug(slug).catch(() => null);
	if (!product) notFound();

	const content = PRODUCT_CONTENT[slug] ?? {
		emoji: "📦",
		gradient: "from-blue-400 to-purple-600",
		accentColor: "text-blue-600",
		accentBg: "bg-blue-50",
		accentBorder: "border-blue-200",
		tagline: product.description ?? "",
		highlights: ["Instant download after purchase", "Lifetime access", "High-quality files"],
		codeSnippets: [],
		colorPalette: undefined,
		templatePreviews: undefined,
	};

	const priceDisplay = `$${(product.price / 100).toFixed(2)}`;

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
			<Link href="/products" className="text-blue-600 hover:underline mb-8 inline-block">
				&larr; Back to Products
			</Link>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
				{/* LEFT: Main content */}
				<div className="lg:col-span-2 space-y-8">

					{/* Hero banner */}
					<div className={`aspect-video bg-gradient-to-br ${content.gradient} rounded-2xl
						flex flex-col items-center justify-center overflow-hidden shadow-xl relative`}>
						<div className="absolute inset-0 bg-black/10" />
						<div className="relative text-center px-8">
							<div className="text-8xl mb-4 drop-shadow-lg">{content.emoji}</div>
							<p className="text-white text-2xl font-extrabold drop-shadow mb-2">{product.title}</p>
							<p className="text-white/85 text-base max-w-md mx-auto">{content.tagline}</p>
						</div>
					</div>

					{/* What's Inside */}
					<div className={`rounded-2xl p-8 border ${content.accentBorder} ${content.accentBg}`}>
						<h2 className="font-extrabold text-2xl mb-5 flex items-center gap-3">
							<span className="text-3xl">{content.emoji}</span>
							What&apos;s Inside This Product
						</h2>
						<ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{content.highlights.map((h, i) => (
								<li key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-white">
									<span className={`${content.accentColor} font-bold text-lg mt-0.5 flex-shrink-0`}>&#10003;</span>
									<span className="text-slate-700 text-sm font-medium">{h}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Template Previews — shown for products that include page templates */}
					{content.templatePreviews && content.templatePreviews.length > 0 && (
						<div className="bg-white rounded-2xl p-8 border border-slate-200">
							<h2 className="font-extrabold text-2xl mb-2">🖥️ Page Templates Included</h2>
							<p className="text-slate-500 text-sm mb-6">
								Every page is fully built and ready to customise — just swap in your branding and products.
							</p>
							<div className="space-y-8">
								{content.templatePreviews.map((tp) => (
									<div key={tp.pageKey}>
										<div className="flex items-start justify-between mb-3">
											<div>
												<h3 className="font-bold text-slate-900 text-base">{tp.title}</h3>
												<p className="text-slate-500 text-sm">{tp.description}</p>
											</div>
											<span className={`text-xs font-bold px-2 py-0.5 rounded-md ${content.accentBg} ${content.accentColor} border ${content.accentBorder} flex-shrink-0 ml-4`}>
												Template
											</span>
										</div>
										<TemplateMockup pageKey={tp.pageKey} />
									</div>
								))}
							</div>
						</div>
					)}

					{/* Color Palette */}
					{content.colorPalette && content.colorPalette.length > 0 && (
						<div className="bg-white rounded-2xl p-8 border border-slate-200">
							<h2 className="font-extrabold text-2xl mb-2">🎨 Colour Palette</h2>
							<p className="text-slate-500 text-sm mb-6">
								All colours used in this product — copy the hex codes directly into your project.
							</p>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
								{content.colorPalette.map((c) => (
									<div key={c.hex}>
										<div className="h-20 rounded-xl shadow-sm border border-slate-100" style={{ backgroundColor: c.hex }} />
										<div className="mt-2">
											<p className="text-xs font-semibold text-slate-700">{c.name}</p>
											<div className="flex items-center gap-1">
												<p className="text-xs text-slate-500 font-mono">{c.hex}</p>
												<CopyButton code={c.hex} compact />
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Code Snippets */}
					{content.codeSnippets.length > 0 && (
						<div className="bg-white rounded-2xl p-8 border border-slate-200">
							<h2 className="font-extrabold text-2xl mb-2">💻 Ready-to-Use Code</h2>
							<p className="text-slate-500 text-sm mb-6">
								Copy these snippets directly into your project — no modifications needed.
							</p>
							<div className="space-y-6">
								{content.codeSnippets.map((snippet, i) => (
									<div key={i}>
										<div className="flex items-center gap-3 mb-2">
											<span className={`text-xs font-bold uppercase tracking-widest ${content.accentColor}
												px-2 py-0.5 rounded-md ${content.accentBg} border ${content.accentBorder}`}>
												{snippet.language}
											</span>
											<span className="text-sm font-semibold text-slate-700">{snippet.label}</span>
										</div>
										<div className="relative rounded-xl overflow-hidden">
											<div className="bg-slate-900 px-4 py-3 text-xs text-slate-400 font-mono
												border-b border-slate-700 flex items-center justify-between">
												<span>{snippet.label}</span>
												<CopyButton code={snippet.code} />
											</div>
											<pre className="bg-slate-950 text-slate-100 text-xs font-mono p-5 overflow-x-auto
												leading-relaxed max-h-96 whitespace-pre">
												{snippet.code}
											</pre>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Key Features */}
					<div className="bg-white rounded-2xl p-8 border border-slate-200">
						<h2 className="font-extrabold text-2xl mb-6">✨ Key Features</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{[
								{ icon: "📦", title: "Well Organised", desc: "Clear folder structure with naming conventions" },
								{ icon: "🎨", title: "Fully Customisable", desc: "Edit colours, fonts, and layouts to match your brand" },
								{ icon: "⚡", title: "Production Ready", desc: "High-quality, optimised files ready to ship" },
								{ icon: "📖", title: "Documented", desc: "Includes usage guides and code comments" },
								{ icon: "♿", title: "Accessible", desc: "Follows WCAG accessibility guidelines" },
								{ icon: "🔄", title: "Free Updates", desc: "Get all future improvements at no extra cost" },
							].map((f) => (
								<Card key={f.title} className="hover:shadow-md transition-shadow">
									<h4 className="font-semibold mb-2 flex items-center gap-3 text-base">
										<span className="text-2xl">{f.icon}</span> {f.title}
									</h4>
									<p className="text-slate-500 text-sm">{f.desc}</p>
								</Card>
							))}
						</div>
					</div>
				</div>

				{/* RIGHT: Sticky sidebar */}
				<div>
					<div className="sticky top-6 space-y-5">

						{/* Price + CTA */}
						<div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
							<h1 className="text-2xl font-extrabold mb-1 text-slate-900">{product.title}</h1>
							<p className="text-sm text-slate-500 mb-4">{content.tagline}</p>
							<div className="mb-5">
								<span className={`text-5xl font-extrabold ${content.accentColor}`}>{priceDisplay}</span>
								<span className="text-slate-400 text-sm ml-2">one-time</span>
							</div>
							<p className="text-sm text-slate-500 mb-5">
								<span className="block">&#10003; Instant download after purchase</span>
								<span className="block">&#10003; Lifetime access to all files</span>
								<span className="block">&#10003; Free future updates</span>
							</p>
							<Link href={`/checkout/${product.id}`} className="block">
								<Button size="lg" className="w-full text-base font-bold py-5">
									Buy Now &mdash; {priceDisplay}
								</Button>
							</Link>
							<p className="text-slate-400 text-xs text-center mt-3">
								🔒 Secure checkout powered by Stripe
							</p>
						</div>

						{/* Description */}
						<Card>
							<h3 className="font-bold mb-3 text-slate-900">📋 Description</h3>
							<p className="text-slate-600 leading-relaxed text-sm">{product.description}</p>
						</Card>

						{/* What You Get */}
						<Card>
							<h3 className="font-bold mb-4 text-slate-900">🎁 What You Get</h3>
							<ul className="space-y-2.5 text-sm">
								{[
									"Instant download after purchase",
									"Lifetime access to all files",
									"High-quality optimised files",
									"24-hour secure download link",
									"Free updates if available",
								].map((item) => (
									<li key={item} className="flex items-start gap-2.5">
										<span className={`${content.accentColor} font-bold flex-shrink-0`}>&#10003;</span>
										<span className="text-slate-700">{item}</span>
									</li>
								))}
							</ul>
						</Card>

						{/* Guarantee */}
						<div className={`rounded-xl p-4 border-2 ${content.accentBorder} ${content.accentBg}`}>
							<p className="text-xs text-slate-800">
								<span className="font-bold block mb-1">🛡️ 7-Day Money-Back Guarantee</span>
								Not satisfied? Full refund within 7 days &mdash; no questions asked.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

