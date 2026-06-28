import { CartPageClient } from '@/features/cart/CartPageClient';
import type { Metadata } from 'next';
import { BRAND_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `Carrito de compras | ${BRAND_NAME}`,
  description: 'Revisa los productos en tu carrito y procede a realizar tu pedido por WhatsApp.',
  robots: { index: false, follow: false },
};

export default function CarritoPage() {
  return <CartPageClient />;
}
