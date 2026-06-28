import { products } from '@/data/products';
import { ProductGrid } from '@/features/products/ProductGrid';
import type { Metadata } from 'next';
import { BRAND_NAME, SITE_URL } from '@/constants';

export const metadata: Metadata = {
  title: `Catálogo de Perfumes | ${BRAND_NAME}`,
  description:
    'Explora nuestra colección completa de perfumes originales para mujer, hombre y unisex. Marcas como Lattafa, Armaf, Rasasi y más.',
  alternates: { canonical: `${SITE_URL}/perfumes` },
};

export default function PerfumesPage() {
  // Primero regulares, luego ofertas
  const sorted = [
    ...products.filter((p) => p.type === 'regular'),
    ...products.filter((p) => p.type === 'oferta'),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">
          Inventario disponible
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-[#1A1A1A]">Catálogo de Perfumes</h1>
        <div className="w-12 h-px bg-[#C9A84C] mt-3 mb-4" />
        <p className="font-sans text-sm text-[#888] max-w-lg">
          {products.length} fragancias disponibles · Originales garantizados · Entrega a toda Colombia
        </p>
      </div>

      <ProductGrid products={sorted} />
    </div>
  );
}
