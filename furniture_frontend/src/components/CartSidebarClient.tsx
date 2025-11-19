"use client";
import dynamic from "next/dynamic";

const CartSidebar = dynamic(() => import("./CartSidebar"), { ssr: false });

/**
 * Client-only wrapper for CartSidebar to maintain provider context.
 * PUBLIC_INTERFACE
 */
export default function CartSidebarClient() {
  return <CartSidebar />;
}
