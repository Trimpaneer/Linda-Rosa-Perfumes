'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartItem } from './CartItem';
import { formatPriceCOP } from '@/utils/formatPrice';

export function CartPageClient() {
  const { items, total, clearCart, isEmpty } = useCart();

  if (isEmpty) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-12 h-12 text-[#E5E5E5] mx-auto mb-6" />
        <h2 className="font-heading text-3xl text-[#1A1A1A] mb-3">Tu carrito está vacío</h2>
        <p className="text-sm text-[#888] mb-8 font-sans">
          Agrega fragancias desde nuestro catálogo para comenzar tu pedido.
        </p>
        <Link
          href="/perfumes"
          id="go-to-catalog-btn"
          className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#C9A84C] transition-colors duration-200"
        >
          Ver catálogo <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-[#1A1A1A]">Tu carrito</h1>
        <div className="w-12 h-px bg-[#C9A84C] mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Lista de items */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <p className="font-sans text-xs tracking-[0.15em] uppercase text-[#888]">
              {items.length} {items.length === 1 ? 'producto' : 'productos'}
            </p>
            <button
              id="clear-cart-btn"
              onClick={clearCart}
              aria-label="Vaciar carrito"
              className="flex items-center gap-1.5 text-xs text-[#aaa] hover:text-red-500 transition-colors font-sans"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Vaciar carrito
            </button>
          </div>

          <div>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-[#F5F5F0] p-6 sticky top-24">
            <h2 className="font-heading text-xl text-[#1A1A1A] mb-4">Resumen del pedido</h2>
            <div className="w-8 h-px bg-[#C9A84C] mb-6" />

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm font-sans">
                  <span className="text-[#666] truncate pr-2">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="text-[#1A1A1A] shrink-0">
                    {formatPriceCOP(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E5E5E5] pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-sans font-medium text-sm text-[#1A1A1A]">Total</span>
                <span className="font-sans font-bold text-[#1A1A1A]">
                  {formatPriceCOP(total)}
                </span>
              </div>
            </div>

            <Link
              href="/pedido"
              id="continue-order-btn"
              className="flex items-center justify-center gap-2 w-full bg-[#1A1A1A] text-white text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-[#C9A84C] transition-colors duration-200"
            >
              Continuar pedido <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/perfumes"
              className="flex items-center justify-center w-full text-xs tracking-[0.15em] uppercase text-[#888] hover:text-[#1A1A1A] transition-colors mt-3 font-sans"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
