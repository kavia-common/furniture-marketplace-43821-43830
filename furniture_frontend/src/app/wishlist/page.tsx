"use client";
import React, { useEffect, useState } from "react";
import { useWishlist } from "../../lib/useWishlist";
import { Product, fetchProducts } from "../../lib/api";
import ProductCard from "../../components/ProductCard";

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let isMounted = true;
    (async () => {
      try {
        const all = await fetchProducts();
        if (isMounted) {
          setProducts(all.filter((p) => wishlist.includes(p.id)));
        }
      } catch {
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [wishlist]);

  return (
    <main className="container mx-auto px-4 py-8 min-h-[60vh]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">My Wishlist</h1>
        {wishlist.length > 0 && (
          <button
            className="text-sm bg-gray-100 border border-amber-400 rounded px-3 py-1 text-amber-700 hover:bg-amber-50 shadow"
            onClick={clearWishlist}
          >
            Clear wishlist
          </button>
        )}
      </div>
      {loading ? (
        <div className="text-gray-500 py-10 text-center">Loading...</div>
      ) : wishlist.length === 0 ? (
        <div className="flex flex-col items-center py-14 text-center">
          <span className="text-blue-300 text-6xl mb-4">💔</span>
          <div className="text-xl font-semibold mb-1 text-gray-700">Your wishlist is empty</div>
          <div className="text-gray-500">Browse products and add your favorite items!</div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center py-14 text-center">
          <span className="text-blue-300 text-5xl mb-4">😕</span>
          <div className="text-lg mb-1">No matching products found for your wishlist.</div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
