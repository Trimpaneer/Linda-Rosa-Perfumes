'use client';

import Link from 'next/link';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { ProductImage } from '@/components/shared/ProductImage';
import { formatPriceCOP } from '@/utils/formatPrice';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} agregado al carrito`, {
      description: formatPriceCOP(product.price),
    });
  };

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 2;

  return (
    <article className="group relative bg-white border border-[#E5E5E5] hover:border-[#C9A84C] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A84C]/5 flex flex-col h-full">


      {/* Imagen */}
      <Link
        href={`/perfumes/${product.slug}`}
        aria-label={`Ver ${product.name}`}
        className="block relative aspect-square overflow-hidden bg-gradient-to-b from-[#F9F9F6] to-[#F5F5F0]"
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Overlay acciones */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/95 backdrop-blur-sm text-[#1A1A1A] text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 flex items-center gap-2 shadow-xl border border-[#E5E5E5]/40 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
            <Eye className="w-3.5 h-3.5 text-[#C9A84C]" /> Ver detalle
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C9A84C] mb-1 font-medium">
          {product.brand}
        </p>
        <Link href={`/perfumes/${product.slug}`} className="flex-1">
          <h3 className="font-heading text-base leading-tight text-[#1A1A1A] hover:text-[#C9A84C] transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Stock status indicator */}
        <div className="flex items-center gap-1.5 mt-2 mb-3">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isOutOfStock
                ? 'bg-red-400'
                : isLowStock
                ? 'bg-amber-500 animate-pulse'
                : 'bg-emerald-500'
            }`}
          />
          <span className="font-sans text-[10px] tracking-wide text-[#777]">
            {isOutOfStock ? 'Agotado' : isLowStock ? `Últimas ${product.stock} unidades` : 'Disponible'}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F0]">
          <p className="font-sans font-semibold text-sm text-[#1A1A1A]">
            {formatPriceCOP(product.price)}
          </p>
          {product.size && (
            <span className="font-sans text-[10px] text-[#aaa]">
              {product.size}
            </span>
          )}
        </div>

        <button
          id={`add-to-cart-${product.id}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={`Agregar ${product.name} al carrito`}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1a1a1a] hover:text-white bg-transparent hover:border-[#1A1A1A] font-medium"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          {isOutOfStock ? 'Agotado' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}
