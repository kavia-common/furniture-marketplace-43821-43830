"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/lib";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  image?: string;
  // Add other fields as needed
}

export default function ProductDetailPage({ params }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/products/${params.id}/`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error(`Product not found`);
        }
        const data = await res.json();
        if (!ignore) setProduct(data);
      } catch (err) {
        const errorMsg =
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message?: string }).message || "Failed to fetch product."
            : "Failed to fetch product.";
        if (!ignore) setError(errorMsg);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchData();
    return () => { ignore = true; };
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-blue-600 animate-pulse">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600">
        <span className="font-semibold mb-2">Error</span>
        <span>{error}</span>
        <Link href="/products" className="mt-4 text-blue-700 underline hover:text-blue-900 transition">
          Back to Products
        </Link>
      </div>
    );
  }
  if (!product) return null;

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 rounded-xl shadow-lg bg-white flex flex-col md:flex-row gap-8"
         style={{ background: "linear-gradient(to bottom right, #2563EB10, #F9FAFB 80%)" }}
         >
      <div className="md:w-1/2 flex items-center justify-center">
        {product.image ? (
          // Use next/image in a real build for optimization
          <img
            src={product.image}
            alt={product.name}
            className="object-contain rounded-lg shadow-md border border-blue-100 max-h-80 w-full"
            style={{ background: "#F9FAFB" }}
          />
        ) : (
          <div className="bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg h-72 w-full text-7xl">
            ?
          </div>
        )}
      </div>
      <div className="md:w-1/2 flex flex-col justify-between min-w-0">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">{product.name}</h1>
          <p className="text-lg mb-2 text-gray-500">${product.price?.toFixed(2)}</p>
          {product.description && (
            <p className="text-gray-700 mb-6">{product.description}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => addToCart(product)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            data-testid="add-to-cart-btn"
          >
            Add to Cart
          </button>
          <Link
            href="/products"
            className="text-sm text-blue-700 hover:text-blue-900 underline transition self-start mt-2"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
