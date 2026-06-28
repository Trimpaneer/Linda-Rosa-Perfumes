'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { formatPriceCOP } from '@/utils/formatPrice';
import { useCart } from '@/hooks/useCart';
import { ProductImage } from '@/components/shared/ProductImage';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <article className="flex gap-4 py-5 border-b border-[#E5E5E5]" aria-label={product.name}>
      {/* Imagen */}
      <Link href={`/perfumes/${product.slug}`} className="relative w-20 h-20 shrink-0 bg-[#F5EDD6] overflow-hidden">
        <ProductImage src={product.image} alt={product.name} fill />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#C9A84C]">
          {product.brand}
        </p>
        <Link href={`/perfumes/${product.slug}`}>
          <h3 className="font-heading text-base text-[#1A1A1A] hover:text-[#C9A84C] transition-colors leading-tight mt-0.5 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="font-sans text-sm font-semibold text-[#1A1A1A] mt-1">
          {formatPriceCOP(product.price * quantity)}
        </p>

        {/* Cantidad */}
        <div className="flex items-center gap-2 mt-2">
          <button
            id={`qty-minus-${product.id}`}
            onClick={() => updateQuantity(product.id, quantity - 1)}
            aria-label={`Reducir cantidad de ${product.name}`}
            className="w-7 h-7 flex items-center justify-center border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors rounded-sm"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center font-sans text-sm" aria-label={`Cantidad: ${quantity}`}>
            {quantity}
          </span>
          <button
            id={`qty-plus-${product.id}`}
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stock}
            aria-label={`Aumentar cantidad de ${product.name}`}
            className="w-7 h-7 flex items-center justify-center border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors rounded-sm disabled:opacity-30"
          >
            <Plus className="w-3 h-3" />
          </button>

          <button
            id={`remove-${product.id}`}
            onClick={() => removeItem(product.id)}
            aria-label={`Eliminar ${product.name} del carrito`}
            className="ml-2 p-1 text-[#aaa] hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
