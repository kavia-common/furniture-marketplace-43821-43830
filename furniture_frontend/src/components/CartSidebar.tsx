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
      className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] z-40 transition-transform duration-300 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Shopping Cart"
      tabIndex={-1}
      style={{
        background: "var(--color-surface)",
        borderLeft: "2px solid var(--color-primary)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: "var(--color-primary)" }}
      >
        <h2 className="font-semibold text-lg" style={{ color: "var(--color-primary)" }}>
          Cart
        </h2>
        <button
          className="text-error"
          tabIndex={0}
          onClick={toggleCart}
          aria-label="Close cart"
          style={{ background: "transparent", border: "none", color: "var(--color-error)" }}
        >
          ×
        </button>
      </div>
      <section className="p-4 flex-1 flex flex-col gap-3 overflow-y-auto">
        {cart.length === 0 ? (
          <div style={{ color: "var(--color-text)", opacity: 0.67 }} className="text-center">
            Cart is empty.
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 items-center border-b py-2 last:border-b-0"
              style={{ borderColor: "#e0e7ef" }}
            >
              <div
                className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(90deg, var(--gradient-start), var(--gradient-end))",
                }}
              >
                {item.image ? (
                  <img src={item.image} alt={item.title} className="object-cover h-full w-full" />
                ) : (
                  <span style={{ color: "var(--color-primary)" }}>🪑</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-medium line-clamp-1"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.title}
                </div>
                <div className="text-xs" style={{ color: "var(--color-secondary)" }}>
                  ${item.price} x
                </div>
              </div>
              <input
                type="number"
                className="w-12 px-2 py-1 border rounded radius-md"
                min={1}
                value={item.quantity}
                onChange={e => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                tabIndex={0}
                aria-label={`Quantity for ${item.title}`}
                style={{ borderColor: "var(--color-primary)" }}
              />
              <button
                className="ml-1"
                aria-label="Remove"
                onClick={() => removeFromCart(item.id)}
                style={{ color: "var(--color-error)", fontWeight: 700, fontSize: "1.13em" }}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </section>
      <footer className="p-4 border-t shadow-sm" style={{ borderColor: "#e0e7ef" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium" style={{ color: "var(--color-text)" }}>
            Total:
          </span>
          <span className="font-bold text-lg" style={{ color: "var(--color-primary)" }}>
            ${cartTotal}
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            href="/checkout"
            onClick={toggleCart}
            className="flex-1 font-semibold text-center transition"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              padding: "0.6rem 0",
            }}
          >
            Checkout
          </Link>
          <button
            className="flex-1 text-sm"
            onClick={clearCart}
            disabled={cart.length === 0}
            style={{
              background: "#f3f4f6",
              color: "#64748b",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid #e0e7ef",
              padding: "0.6rem 0",
            }}
          >
            Clear
          </button>
        </div>
      </footer>
    </aside>
  );
};
