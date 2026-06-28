'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Minus, Plus } from 'lucide-react';
import { Product } from '@/types';
import { ProductImage } from '@/components/shared/ProductImage';
import { ProductCard } from '@/features/products/ProductCard';
import { formatPriceCOP } from '@/utils/formatPrice';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { CATEGORY_LABELS } from '@/constants';

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, quantity);
    toast.success(`${product.name} agregado al carrito`, {
      description: `${quantity} × ${formatPriceCOP(product.price)}`,
    });
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ol className="flex items-center gap-2 text-xs font-sans text-[#888]">
          <li><Link href="/" className="hover:text-[#C9A84C] transition-colors">Inicio</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/perfumes" className="hover:text-[#C9A84C] transition-colors">Perfumes</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-[#1A1A1A]" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Imagen */}
          <div className="relative aspect-square bg-[#F5EDD6] overflow-hidden">
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-contain p-8"
            />
            {product.type === 'oferta' && (
              <div className="absolute top-4 left-4 bg-[#C9A84C] text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 font-sans">
                Oferta 1×1
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">
              {product.brand} · {CATEGORY_LABELS[product.category]}
            </p>
            <h1 className="font-heading text-3xl md:text-4xl text-[#1A1A1A] leading-tight mb-3">
              {product.name}
            </h1>
            <div className="w-10 h-px bg-[#C9A84C] mb-5" />

            <p className="font-sans text-2xl font-semibold text-[#1A1A1A] mb-1">
              {formatPriceCOP(product.price)}
            </p>
            {product.size && (
              <p className="font-sans text-xs text-[#888] tracking-wide mb-5">
                Presentación: {product.size}
              </p>
            )}

            <p className="font-sans text-sm text-[#555] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`w-2 h-2 rounded-full ${product.stock > 2 ? 'bg-green-400' : product.stock > 0 ? 'bg-amber-400' : 'bg-red-400'}`}
              />
              <span className="font-sans text-xs text-[#666] tracking-wide">
                {product.stock === 0
                  ? 'Agotado'
                  : product.stock <= 2
                  ? `Solo ${product.stock} disponible${product.stock > 1 ? 's' : ''}`
                  : `${product.stock} en stock`}
              </span>
            </div>

            {/* Cantidad */}
            {product.stock > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-[#888]">Cantidad</span>
                <div className="flex items-center border border-[#E5E5E5]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Reducir cantidad"
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F0] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-sans text-sm" aria-label={`Cantidad: ${quantity}`}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    aria-label="Aumentar cantidad"
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F0] transition-colors disabled:opacity-30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <button
              id={`detail-add-to-cart-${product.id}`}
              onClick={handleAdd}
              disabled={product.stock === 0}
              aria-label={`Agregar ${product.name} al carrito`}
              className="flex items-center justify-center gap-2 w-full bg-[#1A1A1A] text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-[#C9A84C] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed mb-3"
            >
              <ShoppingBag className="w-4 h-4" />
              {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            </button>

            <Link
              href="/carrito"
              className="flex items-center justify-center w-full border border-[#E5E5E5] text-xs tracking-[0.2em] uppercase py-3.5 hover:border-[#1A1A1A] transition-colors font-sans text-[#666] hover:text-[#1A1A1A]"
            >
              Ver carrito
            </Link>
          </div>
        </div>

        {/* Productos relacionados */}
        {related.length > 0 && (
          <section className="mt-20" aria-label="Productos relacionados">
            <div className="mb-8">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">También te puede gustar</p>
              <h2 className="font-heading text-2xl text-[#1A1A1A]">Fragancias relacionadas</h2>
              <div className="w-8 h-px bg-[#C9A84C] mt-2" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
