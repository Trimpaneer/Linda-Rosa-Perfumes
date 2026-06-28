/**
 * Convierte un texto en slug URL-amigable.
 * Ejemplo: "Yara Candy Lattafa" → "yara-candy-lattafa"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina acentos
    .replace(/[^a-z0-9\s-]/g, '')    // elimina caracteres especiales
    .trim()
    .replace(/\s+/g, '-')            // espacios a guiones
    .replace(/-+/g, '-');            // elimina guiones dobles
}
