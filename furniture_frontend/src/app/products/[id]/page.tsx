import ProductDetailClient from "../../../components/ProductDetailClient";
import { fetchProductById, Product } from "../../../lib/api";

// PUBLIC_INTERFACE
export default async function Page({ params }: { params: { id: string } }) {
  const product: Product | null = await fetchProductById(params.id);
  if (!product) {
    return <div className="p-8 text-red-600">Product not found.</div>;
  }
  return <ProductDetailClient product={product} />;
}
