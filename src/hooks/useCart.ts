'use client';

import { useCartStore } from '@/store/cartStore';

export function useCart() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotalItems = useCartStore((s) => s.getTotalItems);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTotal = useCartStore((s) => s.getTotal);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: getTotalItems(),
    subtotal: getSubtotal(),
    total: getTotal(),
    isEmpty: items.length === 0,
  };
}
