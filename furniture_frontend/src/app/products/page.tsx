"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { fetchProducts, Product } from "../../lib/api";
import { Header } from "../../components/Header";
import CartSidebar from "../../components/CartSidebar";
import ProductCard from "../../components/ProductCard";

/**
 * Escape RegExp special characters for highlighting
 */
const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Debounce hook for input
 */
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

/**
 * Products page with debounced search bar and client-side filtering/highlighting.
 */
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data: Product[]) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return products;
    const term = debouncedSearch.trim().toLowerCase();
    return products.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const desc = product.description?.toLowerCase() || "";
      return title.includes(term) || desc.includes(term);
    });
  }, [products, debouncedSearch]);

  // Highlights search matches in string minimally
  const getHighlightedText = useCallback(
    (text: string, highlight: string) => {
      if (!highlight) return text;
      const re = new RegExp(`(${escapeRegExp(highlight)})`, "gi");
      return text.split(re).map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark
            key={i}
            className="bg-yellow-200 text-blue-900 px-0.5 rounded"
            style={{ backgroundColor: "#FDE68A" }}
          >
            {part}
          </mark>
        ) : (
          part
        )
      );
    },
    []
  );

  return (
    <>
      <Header />
      <CartSidebar />
      <main className="max-w-7xl mx-auto py-10 px-5 min-h-[60vh]" style={{ background: "#f9fafb" }}>
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Browse Furniture</h1>
        <section className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            aria-label="Search products"
            type="text"
            placeholder="Search products by title or description..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 py-2 px-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 shadow transition"
            style={{
              minWidth: "220px",
              borderColor: "#2563EB",
              color: "#111827",
              background: "#fff",
            }}
          />
        </section>
        {loading && <div className="py-8 text-center text-gray-500">Loading...</div>}
        {error && <div className="py-8 text-center text-red-500">Error: {error}</div>}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="w-full text-center py-12 text-lg text-gray-400 font-medium">
            <span>
              {searchInput.length
                ? <>No products found for <span className="text-blue-700">&quot;{debouncedSearch}&quot;</span>.</>
                : "No products available."}
            </span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              highlightTerm={debouncedSearch}
              getHighlightedText={getHighlightedText}
            />
          ))}
        </div>
      </main>
    </>
  );
}
