export type Category = 'mujer' | 'hombre' | 'unisex';
export type ProductType = 'regular';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number; // COP sin puntos, ej: 210000
  stock: number;
  category: Category;
  type: ProductType;
  description: string;
  size?: string; // ej: "100ml"
  image: string; // "/images/products/nombre.webp"
  featured?: boolean;
  available?: boolean; // controla visibilidad sin eliminar el producto
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormData {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
  barrio: string;
  ciudad: string;
  departamento: string;
}
