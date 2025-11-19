import { Header } from "@/components/Header";
import { CartSidebar } from "@/components/CartSidebar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <CartSidebar />
      <main className="flex flex-col items-center justify-center py-32 bg-bg min-h-[60vh]">
        <h1 className="text-4xl font-extrabold text-primary mb-4">
          Welcome to FurniMarket
        </h1>
        <p className="mb-6 text-lg text-gray-500">
          Discover, shop, and furnish your space with modern, professional style.
        </p>
        <Link
          href="/products"
          className="bg-primary text-white px-8 py-3 radius-md font-semibold text-lg shadow-md hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </main>
    </>
  );
}
