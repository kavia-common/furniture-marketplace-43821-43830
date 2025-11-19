"use client";
import React, { useState } from "react";
import { useCart, formatPrice } from "../lib/useCart";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

/**
 * ProductCard displays furniture info and allows quantity selection and add-to-cart,
 * styled per Ocean Professional theme.
 */
const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  // Price formatting and increment/decrement for inline UX
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg border border-blue-100 transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4 border border-blue-50 shadow"
        style={{ background: "#e0e7ef" }}
      />
      <div className="font-semibold mb-1 text-blue-900 truncate">{product.name}</div>
      <div className="flex items-baseline mb-3 space-x-2">
        <span className="text-blue-700 font-bold text-lg">{formatPrice(product.price)}</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <button
          aria-label="Decrease quantity"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          className={`w-7 h-7 rounded-full border border-blue-200 flex items-center justify-center transition-colors
            ${qty <= 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
        >
          –
        </button>
        <input
          type="number"
          className="w-10 text-center rounded border border-blue-200 text-blue-700 font-bold focus:ring-amber-400"
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
          onClick={() => setQty((q) => Math.min(100, q + 1))}
          className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center border border-blue-200 hover:bg-blue-600 transition-colors"
        >
          +
        </button>
      </div>
      <button
        onClick={() =>
          addToCart(
            { ...product, quantity: qty },
            qty
          )
        }
        className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
