import ProductDetailClient from "../../../components/ProductDetailClient";

// Define the Product type to use for both API and mock
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

// Fetch a product by ID (mock or real fetch)
async function fetchProductById(id: string): Promise<Product | undefined> {
  // Try fetching from real API, or fallback to mock data
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ""}/products/${id}/`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("API fetch failed");
    return await res.json();
  } catch {
    // Fallback to mock data
    const products: Product[] = (await import("../../../mock/products.json")).default;
    return products.find((p: Product) => p.id === id);
  }
}

// NEXT.js will provide 'params' by convention, let type be inferred
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProductById(params.id);
  if (!product) return <div className="p-8 text-red-600">Product not found.</div>;
  // Pass product object to ProductDetailClient
  return <ProductDetailClient product={product} />;
}
