import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import { CartProvider } from "@/lib/useCart";
import { WishlistProvider } from "../lib/useWishlist";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "FurniMarket – Modern Furniture Store",
  description: "Shop and discover modern furniture online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-bg text-text min-h-screen">
        <WishlistProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
