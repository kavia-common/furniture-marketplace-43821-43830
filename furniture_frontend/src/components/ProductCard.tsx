"use client";
import Link from "next/link";
import React from "react";
import { useCart } from "@/lib";

export type Product = {
  id: number | string;
  title: string;
  price: number;
  description?: string;
  image?: string | null;
};

type Props = {
  product: Product;
  highlightTerm?: string;
  getHighlightedText?: (text: string, highlight: string) => React.ReactNode;
};

export const ProductCard = ({
  product,
  highlightTerm = "",
  getHighlightedText,
}: Props) => {
  const { addToCart } = useCart();

  const renderTitle = () =>
    highlightTerm && getHighlightedText
      ? getHighlightedText(product.title, highlightTerm)
      : product.title;

  const renderDescription = () =>
    product.description && highlightTerm && getHighlightedText
      ? getHighlightedText(product.description, highlightTerm)
      : product.description;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full transition hover:shadow-lg border border-blue-50">
      <Link href={`/products/${product.id}`} className="flex flex-col gap-2 group">
        <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-tr from-blue-500/10 to-gray-50 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-full group-hover:scale-105 transition"
              loading="lazy"
              style={{ background: "#f9fafb" }}
            />
          ) : (
            <span className="text-4xl text-blue-300">
              🛑
            </span>
          )}
        </div>
        <h2 className="text-lg font-semibold text-blue-900 truncate group-hover:underline">
          {renderTitle()}
        </h2>
      </Link>
      <div className="my-1 text-[0.97rem] text-gray-500 min-h-[2.2em]">
        {renderDescription()}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xl font-bold text-yellow-600">${product.price}</span>
        <Link
          href={`/products/${product.id}`}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          View
        </Link>
      </div>
      <button
        onClick={() =>
          addToCart({
            ...product,
            name: product.title,
            price: product.price,
            description: product.description,
            image: product.image,
          })
        }
        className="mt-3 py-2 px-4 w-full bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Add to Cart
      </button>
    </div>
  );
};

type GridProps = {
  products: Product[];
};

export const ProductGrid = ({ products }: GridProps) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
);
