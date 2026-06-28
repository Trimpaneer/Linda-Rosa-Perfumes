import { CartItem, OrderFormData } from '@/types';
import { formatPriceCOP } from './formatPrice';
import { WHATSAPP_NUMBER } from '@/constants';

/**
 * Genera el mensaje de texto formateado para WhatsApp.
 */
export function generateWhatsAppMessage(
  items: CartItem[],
  formData: OrderFormData
): string {
  const itemLines = items
    .map(
      ({ product, quantity }) =>
        `• ${product.name} x${quantity} = ${formatPriceCOP(product.price * quantity)}`
    )
    .join('\n');

  const total = items.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  const message = `Hola Linda Rosa Perfumes 🌹

Quiero realizar el siguiente pedido:

${itemLines}

💰 *Total del pedido: ${formatPriceCOP(total)}*

📋 Mis datos:
*Nombre:* ${formData.nombre}
*Teléfono:* ${formData.telefono}
*Correo:* ${formData.correo}
*Dirección:* ${formData.direccion}
*Barrio:* ${formData.barrio}
*Ciudad:* ${formData.ciudad}
*Departamento:* ${formData.departamento}

¡Gracias! 🌹`;

  return message;
}

/**
 * Genera la URL de WhatsApp con el mensaje codificado.
 */
export function generateWhatsAppURL(
  items: CartItem[],
  formData: OrderFormData
): string {
  const message = generateWhatsAppMessage(items, formData);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Genera una URL de WhatsApp simple (sin pedido) para el botón flotante.
 */
export function getWhatsAppContactURL(message?: string): string {
  const defaultMessage = message ?? '¡Hola Linda Rosa Perfumes! Quiero más información sobre sus productos. 🌹';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`;
}
