"use client";
import { useEffect, useState } from "react";
import { ProductGrid, Product } from "@/components/ProductCard";
import { apiGet } from "@/lib/api";
import { Header } from "@/components/Header";
import { CartSidebar } from "@/components/CartSidebar";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiGet<Product[]>("products/")
      .then(setProducts)
      .catch((e) => setErr(e?.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <CartSidebar />
      <main className="max-w-7xl mx-auto py-10 px-5 min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-6 text-primary">Browse Furniture</h1>
        {loading && <div>Loading...</div>}
        {err && <div className="text-danger">{err}</div>}
        <ProductGrid products={products} />
      </main>
    </>
  );
}
