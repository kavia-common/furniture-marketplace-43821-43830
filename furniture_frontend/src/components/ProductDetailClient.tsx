"use client";

import React, { useEffect, useState } from "react";
import { fetchProductById, Product } from "../lib/api";
import Link from "next/link";
import { useCart } from "@/lib";

export default function ProductDetailClient({ id }: { id: string }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((item) => {
        if (!ignore) setProduct(item);
      })
      .catch((err) => {
        if (!ignore) setError(err.message || "Failed to fetch product.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, [id]);

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
  if (!product) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 rounded-xl shadow-lg bg-white flex flex-col md:flex-row gap-8"
         style={{ background: "linear-gradient(to bottom right, #2563EB10, #F9FAFB 80%)" }}
         >
      <div className="md:w-1/2 flex items-center justify-center">
        {product.image ? (
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
