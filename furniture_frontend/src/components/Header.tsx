"use client";
import Link from "next/link";
import { useCart } from "@/lib/useCart";

export const Header = () => {
  const { cartCount, toggleCart } = useCart();

  return (
    <header className="w-full sticky top-0 z-20 shadow-md bg-surface bg-gradient-main">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-primary tracking-tight">
            🪑 FurniMarket
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/products" className="text-primary font-medium hover:underline">
            Products
          </Link>
          <Link href="/cart" className="relative text-primary font-medium" onClick={toggleCart}>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-secondary text-white rounded-full px-2 text-xs">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/auth/login" className="text-secondary font-semibold hover:underline">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};
