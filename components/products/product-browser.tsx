"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/database";
import { ProductGrid } from "./product-grid";

interface ProductBrowserProps {
  products: Product[];
}

type SortOption = "newest" | "price-low" | "price-high" | "title";
type PriceBand = "all" | "under-20" | "20-50" | "over-50";

export function ProductBrowser({ products }: ProductBrowserProps) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [priceBand, setPriceBand] = useState<PriceBand>("all");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const bySearch = products.filter((product) => {
      if (!normalized) return true;
      return (
        product.title.toLowerCase().includes(normalized) ||
        (product.description || "").toLowerCase().includes(normalized)
      );
    });

    const byPrice = bySearch.filter((product) => {
      const price = product.price / 100;
      if (priceBand === "under-20") return price < 20;
      if (priceBand === "20-50") return price >= 20 && price <= 50;
      if (priceBand === "over-50") return price > 50;
      return true;
    });

    return [...byPrice].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [products, query, sortBy, priceBand]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Search</label>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Price</label>
            <select
              value={priceBand}
              onChange={(event) => setPriceBand(event.target.value as PriceBand)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="all">All prices</option>
              <option value="under-20">Under $20</option>
              <option value="20-50">$20 to $50</option>
              <option value="over-50">Over $50</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Sort By</label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Title: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  );
}
