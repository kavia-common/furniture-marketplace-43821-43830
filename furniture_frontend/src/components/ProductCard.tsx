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
    <div
      className="card mb-4 flex flex-col h-full" // card picks up style from globals.css
      style={{
        background: "var(--color-surface)",
        color: "var(--color-text)",
        border: "1.5px solid #e0e7ef",
      }}
    >
      <Link href={`/products/${product.id}`} className="flex flex-col gap-2 group">
        <div
          className="aspect-video rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            background:
              "linear-gradient(90deg, var(--gradient-start), var(--gradient-end))",
          }}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-full group-hover:scale-105 transition"
              loading="lazy"
              style={{ background: "var(--gradient-end)" }}
            />
          ) : (
            <span className="text-4xl" style={{ color: "var(--color-primary)" }}>
              🛑
            </span>
          )}
        </div>
        <h2
          className="text-lg font-semibold truncate group-hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          {renderTitle()}
        </h2>
      </Link>
      <div
        className="my-1 text-[0.97rem] min-h-[2.2em]"
        style={{ color: "#64748b" }}
      >
        {renderDescription()}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span
          className="text-xl font-bold"
          style={{ color: "var(--color-secondary)" }}
        >
          ${product.price}
        </span>
        <Link
          href={`/products/${product.id}`}
          className="text-sm underline"
          style={{ color: "var(--color-primary)" }}
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
        className="mt-3 py-2 px-4 w-full font-medium shadow transition-colors"
        style={{
          background: "var(--color-primary)",
          color: "#fff",
          borderRadius: "0.5rem",
        }}
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
