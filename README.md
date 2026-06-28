# Linda Rosa Perfumes 🌹

Catálogo e-commerce premium para **Linda Rosa Perfumes** (Colombia). Este sitio web funciona como un catálogo moderno y rápido que permite a los clientes agregar productos al carrito, completar sus datos de envío y enviar el pedido automáticamente formateado por **WhatsApp**.

## Características Clave

- ⚡ **Sin base de datos ni pasarelas de pago**: Toda la información de productos es local, lo que hace al sitio extremadamente rápido, seguro y con costo de mantenimiento de $0 en Vercel.
- 📱 **Diseño Mobile-First Premium**: Inspirado en perfumerías de lujo. Estética minimalista, mucho espacio en blanco y acentos dorados sutiles (`#C9A84C`).
- 🛒 **Carrito de Compras con Zustand**: Persistencia automática del carrito en el dispositivo del cliente (`localStorage`).
- 📝 **Formulario de Pedido Validado**: Implementado con `React Hook Form` y `Zod` para garantizar la correcta recolección de los datos de envío.
- 💬 **Checkout por WhatsApp**: Generación automática de mensajes codificados que envían el resumen de compra y datos del cliente directamente al número oficial.
- 🔍 **Catálogo Interactivo**: Búsqueda en tiempo real, filtros por categoría (Mujer, Hombre, Unisex) y ordenamiento (Menor precio, Mayor precio, Nombre).

---

## 🛠️ Instalación y Desarrollo Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. **Clonar o descargar el proyecto** e ingresar al directorio:
   ```bash
   cd linda-rosa-perfumes
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:
   Copia el archivo `.env.example` como `.env.local`:
   ```bash
   copy .env.example .env.local
   ```
   Asegúrate de que la variable `NEXT_PUBLIC_WHATSAPP_NUMBER` tenga el número oficial sin el símbolo `+` (ejemplo: `573202613152`).

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el sitio.

---

## 🚀 Despliegue en Vercel

El proyecto está diseñado para funcionar en **Vercel** de manera inmediata:

1. Sube tu código a un repositorio de GitHub (o GitLab/Bitbucket).
2. Ve a tu consola de [Vercel](https://vercel.com/) y haz clic en **Add New** -> **Project**.
3. Selecciona tu repositorio.
4. En la sección de **Environment Variables**, agrega las siguientes variables:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `573202613152`
   - `NEXT_PUBLIC_SITE_URL`: La URL final de tu dominio (ejemplo: `https://lindarosaperfumes.vercel.app` o tu dominio personalizado).
5. Haz clic en **Deploy**. ¡Listo! Vercel compilará y desplegará el catálogo en segundos.

---

## ✍️ Gestión de Productos y Negocio

Toda la lógica de inventario, precios y stock se gestiona en un único archivo local: `src/data/products.ts`. Esto evita la necesidad de configurar bases de datos complicadas.

### 1. Agregar un nuevo producto
Abre `src/data/products.ts` y añade un nuevo objeto al array `products` respetando el tipo `Product`:

```typescript
{
  id: 'nuevo-perfume-slug',
  slug: 'nuevo-perfume-slug',
  name: 'Nombre del Perfume',
  brand: 'Marca',
  price: 220000, // Precio en pesos colombianos (COP) sin puntos ni comas
  stock: 5,      // Stock disponible
  category: 'mujer', // Puede ser 'mujer' | 'hombre' | 'unisex'
  type: 'regular',   // Puede ser 'regular' | 'oferta' (para Ofertas 1x1)
  description: 'Descripción elegante de la fragancia...',
  size: '100ml',
  image: '/images/products/nuevo-perfume-slug.webp',
  featured: true, // true si quieres que aparezca en destacados del Home
}
```

### 2. Modificar precios y stock
Para cambiar el precio o el stock de cualquier producto, simplemente localiza el producto en `src/data/products.ts` por su `id` y edita los campos correspondientes:
- **Modificar precio**: cambia el valor numérico en el campo `price`.
- **Modificar stock**: incrementa o disminuye el valor del campo `stock`. Si colocas `stock: 0`, el sistema automáticamente lo marcará como **Agotado** y deshabilitará los botones de agregar al carrito.

### 3. Crear Ofertas 1x1
Si deseas colocar un perfume dentro de la sección especial **"Ofertas 1x1"** de la página de inicio, asegúrate de configurar su propiedad `type` como `'oferta'`:
```typescript
type: 'oferta'
```
Si es un producto normal del catálogo, configúralo como `type: 'regular'`.

### 4. Cambiar el número de WhatsApp oficial
Para cambiar el número de WhatsApp al cual llegan todos los pedidos de los clientes, edita la variable `NEXT_PUBLIC_WHATSAPP_NUMBER` en tu archivo `.env.local` (local) o en la sección **Environment Variables** en el dashboard de tu proyecto en Vercel.
*Nota: El número debe incluir el código del país sin el signo `+` ni espacios (ej. para Colombia: `573202613152`).*

---

## 🖼️ Gestión de Imágenes de Productos

El sitio cuenta con un placeholder elegante por defecto. Si una imagen no existe o falla en cargar, se mostrará un recuadro dorado con la marca `Linda Rosa`.

Para importar e integrar imágenes de productos reales en el formato óptimo `.webp` y tamaño adecuado, se incluye un script automático:

1. Coloca tu imagen origen (puede ser JPG o PNG) en cualquier ubicación.
2. Ejecuta el script especificando la ruta del archivo y el slug del producto al que pertenece:
   ```bash
   node scripts/import-images.mjs C:\descargas\yara.jpg yara-candy-lattafa
   ```
3. El script optimizará la imagen usando `sharp`, la recortará y redimensionará a `800x800` píxeles, la convertirá a `.webp` y la guardará automáticamente en `public/images/products/yara-candy-lattafa.webp`.

Para verificar qué imágenes hacen falta en el inventario actual, ejecuta el script sin argumentos:
```bash
node scripts/import-images.mjs
```

---

## 📈 Rendimiento y Accesibilidad (SEO)

- **Imágenes Optimizadas**: Se utiliza el componente `next/image` con formatos modernos y carga diferida (lazy loading).
- **Semántica HTML**: Uso estricto de etiquetas HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) y jerarquía de encabezados única por página.
- **Accesibilidad**: Etiquetas `aria-label`, estados de foco claros, contraste premium y soporte completo para navegación por teclado.
- **Sitemap & Robots**: Generación dinámica de `sitemap.xml` y `robots.txt` a través de rutas integradas nativamente en Next.js.
