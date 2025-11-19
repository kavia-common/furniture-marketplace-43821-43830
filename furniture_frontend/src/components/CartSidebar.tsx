"use client";
import { useCart } from "@/lib/useCart";
import Link from "next/link";

export const CartSidebar = () => {
  const {
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    cartOpen,
  } = useCart();

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-surface shadow-md border-l border-gray-200 z-40 transition-transform duration-300 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Shopping Cart"
      tabIndex={-1}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">Cart</h2>
        <button
          className="text-danger"
          tabIndex={0}
          onClick={toggleCart}
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>
      <section className="p-4 flex-1 flex flex-col gap-3 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="text-gray-500 text-center">Cart is empty.</div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 items-center border-b py-2 last:border-b-0"
            >
              <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden bg-gradient-main flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="object-cover h-full w-full" />
                ) : (
                  <span className="text-gray-400">🪑</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium line-clamp-1">{item.title}</div>
                <div className="text-xs text-gray-400">${item.price} x</div>
              </div>
              <input
                type="number"
                className="w-12 px-2 py-1 border rounded radius-md"
                min={1}
                value={item.quantity}
                onChange={e => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                tabIndex={0}
                aria-label={`Quantity for ${item.title}`}
              />
              <button
                className="text-danger ml-1"
                aria-label="Remove"
                onClick={() => removeFromCart(item.id)}
              >
                🗑
              </button>
            </div>
          ))
        )}
      </section>
      <footer className="p-4 border-t shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">Total:</span>
          <span className="font-bold text-primary text-lg">${cartTotal}</span>
        </div>
        <div className="flex gap-2">
          <Link
            href="/checkout"
            onClick={toggleCart}
            className="flex-1 bg-primary text-white px-3 py-2 radius-md text-center font-semibold transition hover:bg-blue-700"
          >
            Checkout
          </Link>
          <button
            className="flex-1 bg-gray-100 text-gray-600 text-sm px-3 py-2 radius-md border transition hover:bg-gray-50"
            onClick={clearCart}
            disabled={cart.length === 0}
          >
            Clear
          </button>
        </div>
      </footer>
    </aside>
  );
};
