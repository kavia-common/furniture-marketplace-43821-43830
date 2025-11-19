import Link from "next/link";

export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  image?: string | null;
};

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => (
  <div className="bg-surface radius-lg shadow-md p-4 flex flex-col">
    <Link href={`/products/${product.id}`} className="flex flex-col gap-2">
      <div className="aspect-video rounded radius-md overflow-hidden bg-gradient-main flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <span className="text-4xl text-gray-200">🪑</span>
        )}
      </div>
      <h2 className="text-lg font-semibold text-primary truncate">{product.title}</h2>
    </Link>
    <div className="flex items-center justify-between mt-2">
      <span className="text-xl font-bold text-secondary">${product.price}</span>
      <Link
        href={`/products/${product.id}`}
        className="text-blue-600 text-sm hover:underline"
      >
        View
      </Link>
    </div>
  </div>
);

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
