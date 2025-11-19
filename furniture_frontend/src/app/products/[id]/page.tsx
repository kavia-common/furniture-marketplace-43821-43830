import ProductDetailClient from "../../../components/ProductDetailClient";

type PageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: PageProps) {
  return <ProductDetailClient id={params.id} />;
}
