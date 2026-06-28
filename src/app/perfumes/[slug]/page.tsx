import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, products } from '@/data/products';
import { ProductDetail } from '@/features/products/ProductDetail';
import type { Metadata } from 'next';
import { BRAND_NAME, SITE_URL } from '@/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | ${BRAND_NAME}`,
    description: product.description,
    alternates: { canonical: `${SITE_URL}/perfumes/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${BRAND_NAME}`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);

  return <ProductDetail product={product} related={related} />;
}
