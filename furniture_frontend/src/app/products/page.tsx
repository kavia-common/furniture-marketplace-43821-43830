"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts, Product } from "../../lib/api";
import { Header } from "../../components/Header";
import { CartSidebar } from "../../components/CartSidebar";
import { ProductCard } from "../../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
      <Header />
      <CartSidebar />
      <main className="max-w-7xl mx-auto py-10 px-5 min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-6 text-primary">Browse Furniture</h1>
        {loading && <div className="py-8 text-center text-gray-500">Loading...</div>}
        {error && <div className="py-8 text-center text-red-500">Error: {error}</div>}
        {!loading && !error && products.length === 0 && (
          <div className="py-8 text-center text-gray-400">No products found.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
