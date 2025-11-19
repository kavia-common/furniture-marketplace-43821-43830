"use client";
import Link from "next/link";
import { useCart } from "@/lib/useCart";
import { useWishlist } from "../lib/useWishlist";
import { BsHeart } from "react-icons/bs";

export const Header = () => {
  const { cartCount, toggleCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <header
      className="w-full sticky top-0 z-20 shadow-md bg-surface bg-gradient-main"
      style={{ borderBottom: "2px solid var(--color-primary)" }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            🛑 FurniMarket
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="font-medium hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Products
          </Link>
          <Link
            href="/wishlist"
            className="relative font-medium flex items-center"
            aria-label="Wishlist"
            style={{ color: "var(--color-secondary)", marginRight: "-4px" }}
          >
            <BsHeart size={23} className="mr-1" />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span
                className="absolute -top-2 -right-3 px-2 text-xs"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  borderRadius: "9999px",
                }}
              >
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative font-medium"
            style={{ color: "var(--color-primary)" }}
            onClick={toggleCart}
          >
            <span>Cart</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-3 px-2 text-xs"
                style={{
                  background: "var(--color-secondary)",
                  color: "#fff",
                  borderRadius: "9999px",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/auth/login"
            className="font-semibold hover:underline"
            style={{ color: "var(--color-secondary)" }}
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
