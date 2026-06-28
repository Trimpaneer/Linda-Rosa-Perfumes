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

  return (
    <article className="group relative bg-white border border-[#E5E5E5] overflow-hidden hover-lift">
      {/* Badge oferta */}
      {product.type === 'oferta' && (
        <div className="absolute top-3 left-3 z-10 bg-[#C9A84C] text-white text-[9px] tracking-[0.15em] uppercase px-2 py-1 font-sans">
          Oferta 1x1
        </div>
      )}

      {/* Imagen */}
      <Link
        href={`/perfumes/${product.slug}`}
        aria-label={`Ver ${product.name}`}
        className="block relative aspect-square overflow-hidden bg-[#F5EDD6]"
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay acciones */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white text-[#1A1A1A] text-xs tracking-widest uppercase px-4 py-2 flex items-center gap-2 shadow-lg">
            <Eye className="w-3 h-3" /> Ver detalle
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1">
          {product.brand}
        </p>
        <Link href={`/perfumes/${product.slug}`}>
          <h3 className="font-heading text-base leading-tight text-[#1A1A1A] hover:text-[#C9A84C] transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-3">
          <p className="font-sans font-semibold text-sm text-[#1A1A1A]">
            {formatPriceCOP(product.price)}
          </p>
          <span className={`text-[10px] tracking-wide ${product.stock <= 2 ? 'text-amber-600' : 'text-[#888]'}`}>
            {isOutOfStock ? 'Agotado' : product.stock <= 2 ? `Últimas ${product.stock}` : `Stock: ${product.stock}`}
          </span>
        </div>

        <button
          id={`add-to-cart-${product.id}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={`Agregar ${product.name} al carrito`}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          {isOutOfStock ? 'Agotado' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}
