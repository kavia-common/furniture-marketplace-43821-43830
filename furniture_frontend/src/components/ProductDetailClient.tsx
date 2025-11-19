"use client";
import React, { useState } from "react";
import { useCart, formatPrice } from "../lib/useCart";
import { useWishlist } from "../lib/useWishlist";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import type { Product } from "../lib/api";

const ProductDetailClient = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-96 h-96 object-cover rounded-lg shadow-lg border border-blue-200 mb-8 md:mb-0"
        style={{ background: "#e0e7ef" }}
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h1 className="text-4xl font-bold mb-3 text-blue-900">{product.name}</h1>
          <button
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => toggleWishlist(product.id)}
            className={`rounded-full p-2 border-2 transition-colors duration-100 ml-2 shadow-sm
              ${wishlisted
                ? "bg-blue-50 border-blue-600 text-blue-600"
                : "bg-gray-100 border-gray-200 text-gray-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
              }`}
          >
            {wishlisted ? <BsHeartFill className="text-blue-600" size={23} /> : <BsHeart size={23} />}
            <span className="sr-only">
              {wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            </span>
          </button>
        </div>
        <div className="text-blue-700 font-bold text-2xl mb-4">{formatPrice(product.price)}</div>
        <div className="mb-7 text-gray-800">{product.description}</div>

        <div className="flex items-center gap-3 mb-7">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty(q => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center border border-blue-200 text-lg transition-colors
              ${qty <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
          >
            –
          </button>
          <input
            type="number"
            className="w-12 text-center rounded border border-blue-200 text-blue-700 font-bold focus:ring-amber-400"
            value={qty}
            min={1}
            max={100}
            aria-label="Quantity"
            onChange={e => {
              const v = Math.max(1, Math.floor(Number(e.target.value) || 1));
              setQty(v);
            }}
          />
          <button
            aria-label="Increase quantity"
            onClick={() => setQty(q => Math.min(100, q + 1))}
            className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center border border-blue-200 hover:bg-blue-600 transition-colors"
          >
            +
          </button>
        </div>

        <button
          onClick={() => addToCart({ ...product, quantity: qty }, qty)}
          className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailClient;
