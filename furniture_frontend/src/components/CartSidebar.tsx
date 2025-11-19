"use client";
import React from "react";
import { useCart, formatPrice } from "../lib/useCart";

/**
 * CartSidebar displays the current cart items with full controls - increment, decrement,
 * per-item subtotal, cart total, removal, and Ocean Professional theme styling.
 */
const CartSidebar = () => {
  const {
    cartItems,
    incrementItem,
    decrementItem,
    removeFromCart,
    clearCart,
    getItemSubtotal,
    getCartTotal,
  } = useCart();

  return (
    <aside className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl p-6 z-40 flex flex-col border-l border-blue-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 tracking-tight">
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center text-gray-400">
          <span className="material-icons text-4xl mb-2 text-blue-200">shopping_cart</span>
          Cart is empty
        </div>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto space-y-4 pr-1">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 bg-blue-50/40 rounded-xl px-3 py-2 shadow-sm border border-blue-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded border border-blue-200 shadow"
                  style={{ background: "#e0e7ef" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate text-blue-800">{item.name}</div>
                  <div className="text-blue-600 text-sm">{formatPrice(item.price)}</div>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      title="Decrease quantity"
                      aria-label="Decrease quantity"
                      onClick={() => decrementItem(item.id)}
                      disabled={item.quantity <= 1}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border border-blue-200 transition-colors duration-150
                        ${item.quantity <= 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                        }`}
                    >
                      <span className="font-bold pb-0.5" style={{ fontSize: "1.1rem" }}>–</span>
                    </button>
                    <span className="text-blue-900 font-semibold min-w-6 text-center select-none">{item.quantity}</span>
                    <button
                      title="Increase quantity"
                      aria-label="Increase quantity"
                      onClick={() => incrementItem(item.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center border border-blue-200 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-150"
                    >
                      <span className="font-bold pb-0.5" style={{ fontSize: "1.1rem" }}>+</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end ml-2">
                  <div className="text-sm text-blue-800 font-bold whitespace-nowrap">
                    {formatPrice(getItemSubtotal(item.id))}
                  </div>
                  <button
                    title="Remove item"
                    aria-label="Remove item"
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 px-2 py-1 rounded text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t pt-4 border-blue-200">
            <div className="flex justify-between items-center mb-2 font-semibold">
              <span className="text-blue-900">Total</span>
              <span className="text-xl text-amber-500">{formatPrice(getCartTotal())}</span>
            </div>
            <button
              onClick={clearCart}
              className="mt-3 w-full py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold shadow transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default CartSidebar;
