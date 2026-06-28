import Link from 'next/link';
import { ArrowRight, CheckCircle, Package, MessageCircle, Truck } from 'lucide-react';
import { getFeaturedProducts, getOfferProducts } from '@/data/products';
import { ProductCard } from '@/features/products/ProductCard';
import { formatPriceCOP } from '@/utils/formatPrice';
import { getWhatsAppContactURL } from '@/utils/generateWhatsAppMessage';
import type { Metadata } from 'next';
import { BRAND_NAME, BRAND_DESCRIPTION, SITE_URL } from '@/constants';

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Perfumes Originales en Colombia`,
  description: BRAND_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const offers = getOfferProducts();
  const waUrl = getWhatsAppContactURL();

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center bg-[#F5F5F0] overflow-hidden"
        aria-label="Sección principal"
      >
        {/* Decoración geométrica */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-8 w-px h-32 bg-[#C9A84C] opacity-30" />
          <div className="absolute top-16 left-8 w-32 h-px bg-[#C9A84C] opacity-30" />
          <div className="absolute bottom-16 right-8 w-px h-32 bg-[#C9A84C] opacity-30" />
          <div className="absolute bottom-16 right-8 w-32 h-px bg-[#C9A84C] opacity-30" />
        </div>

        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
            Colección Exclusiva · Colombia
          </p>
          <h1 className="font-heading text-5xl md:text-7xl text-[#1A1A1A] leading-[1.1] mb-6">
            Perfumes originales<br />
            <em className="not-italic text-[#C9A84C]">para cada ocasión</em>
          </h1>
          <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-6" />
          <p className="font-sans text-base md:text-lg text-[#666] leading-relaxed mb-10 max-w-xl mx-auto">
            Fragancias exclusivas para mujer, hombre y unisex. <br className="hidden md:block" />
            Directo a tu puerta en toda Colombia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/perfumes"
              id="hero-cta-catalog"
              className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-[#C9A84C] transition-colors duration-300"
            >
              Ver catálogo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-whatsapp"
              className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] text-xs tracking-[0.25em] uppercase px-10 py-4 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" /> Pedir por WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CATEGORÍAS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-label="Categorías de perfumes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Explorar</p>
            <h2 className="section-title text-[#1A1A1A]">Nuestras categorías</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/perfumes?cat=mujer', label: 'Para Ella', emoji: '🌸', desc: 'Fragancias florales, frutales y orientales para la mujer moderna.' },
              { href: '/perfumes?cat=hombre', label: 'Para Él', emoji: '🌿', desc: 'Fragancias especiadas, amaderadas y frescas para el hombre de hoy.' },
              { href: '/perfumes?cat=unisex', label: 'Unisex', emoji: '✨', desc: 'Fragancias sin fronteras que conquistan a todos por igual.' },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                id={`category-${cat.label.toLowerCase().replace(' ', '-')}`}
                className="group relative bg-[#F5F5F0] p-10 text-center hover-lift border border-transparent hover:border-[#E8D5A3] transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{cat.emoji}</span>
                <h3 className="font-heading text-2xl text-[#1A1A1A] mb-2 group-hover:text-[#C9A84C] transition-colors">
                  {cat.label}
                </h3>
                <p className="font-sans text-xs text-[#888] leading-relaxed">{cat.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-sans">
                  Explorar <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTOS DESTACADOS ──────────────────────────────────────── */}
      <section className="py-20 bg-[#F5F5F0]" aria-label="Perfumes destacados">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Selección</p>
            <h2 className="section-title text-[#1A1A1A]">Más populares</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/perfumes"
              id="featured-see-all"
              className="inline-flex items-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
            >
              Ver todos los perfumes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BENEFICIOS ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-label="Por qué elegirnos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Garantía</p>
            <h2 className="section-title text-[#1A1A1A]">¿Por qué Linda Rosa?</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <CheckCircle className="w-8 h-8 text-[#C9A84C]" />, title: 'Productos originales', desc: '100% auténticos, directo de distribuidores oficiales.' },
              { icon: <MessageCircle className="w-8 h-8 text-[#C9A84C]" />, title: 'Atención personalizada', desc: 'Te asesoramos para encontrar tu fragancia ideal.' },
              { icon: <Truck className="w-8 h-8 text-[#C9A84C]" />, title: 'Entrega rápida', desc: 'Enviamos a toda Colombia de forma segura y rápida.' },
              { icon: <Package className="w-8 h-8 text-[#C9A84C]" />, title: 'Pedido fácil', desc: 'Elige, agrega al carrito y envía tu pedido por WhatsApp.' },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center p-6">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="font-heading text-xl text-[#1A1A1A] mb-2">{benefit.title}</h3>
                <p className="font-sans text-xs text-[#888] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OFERTAS 1x1 ───────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1A1A1A]" aria-label="Ofertas 1x1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Promoción especial</p>
            <h2 className="section-title text-white">Ofertas 1×1</h2>
            <div className="gold-divider" />
            <p className="font-sans text-sm text-[#aaa] mt-4 max-w-md mx-auto">
              Fragancias premium a precios especiales. Stock limitado.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {offers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/perfumes"
              id="offers-see-all"
              className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-[#C9A84C] hover:text-white transition-all duration-300"
            >
              Ver todo el catálogo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA WHATSAPP ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F5EDD6]" aria-label="Contacto por WhatsApp">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
            Atención personalizada
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            ¿Necesitas asesoría?
          </h2>
          <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-6" />
          <p className="font-sans text-sm text-[#666] mb-10 max-w-lg mx-auto leading-relaxed">
            Nuestros asesores están disponibles para ayudarte a elegir la fragancia perfecta. Escríbenos y te respondemos de inmediato.
          </p>
          <Link
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="home-cta-whatsapp"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white text-sm tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#1da851] transition-colors duration-300 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Escribir a WhatsApp
          </Link>
        </div>
      </section>
    </>
  );
}
