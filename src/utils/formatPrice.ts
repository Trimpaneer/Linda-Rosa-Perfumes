/**
 * Formatea un número como precio en pesos colombianos.
 * Ejemplo: 210000 → "$210.000 COP"
 */
export function formatPriceCOP(price: number): string {
  return (
    '$' +
    price.toLocaleString('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) +
    ' COP'
  );
}
