import { OrderForm } from '@/features/checkout/OrderForm';
import type { Metadata } from 'next';
import { BRAND_NAME } from '@/constants';

export const metadata: Metadata = {
  title: `Realizar pedido | ${BRAND_NAME}`,
  description: 'Completa tus datos y envía tu pedido por WhatsApp de forma rápida y segura.',
  robots: { index: false, follow: false },
};

export default function PedidoPage() {
  return <OrderForm />;
}
