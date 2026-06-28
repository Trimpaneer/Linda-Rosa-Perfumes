import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { BRAND_NAME, SITE_URL } from '@/constants';

export const metadata: Metadata = {
  title: `Nosotros | ${BRAND_NAME}`,
  description: 'Conoce la historia de Linda Rosa Perfumes, nuestra pasión por las fragancias y nuestro compromiso con la calidad.',
  alternates: { canonical: `${SITE_URL}/nosotros` },
};

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F5F5F0] py-24 text-center" aria-label="Sobre nosotros">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
            Nuestra historia
          </p>
          <h1 className="font-heading text-5xl text-[#1A1A1A] mb-4">
            Linda Rosa Perfumes
          </h1>
          <div className="gold-divider" />
          <p className="font-sans text-base text-[#666] leading-relaxed mt-4 max-w-xl mx-auto">
            Nacimos con una misión: acercar las mejores fragancias del mundo a cada rincón de Colombia.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mb-3">
              Quiénes somos
            </p>
            <h2 className="font-heading text-3xl text-[#1A1A1A] mb-4">
              Pasión por las fragancias
            </h2>
            <div className="w-8 h-px bg-[#C9A84C] mb-5" />
            <p className="font-sans text-sm text-[#555] leading-relaxed mb-4">
              Linda Rosa Perfumes es una empresa colombiana dedicada a la venta de perfumes originales de las marcas más reconocidas del mundo árabe y occidental. Nuestro inventario incluye joyas olfativas de Lattafa, Armaf, Rasasi, Afnan, y muchas más marcas de prestigio.
            </p>
            <p className="font-sans text-sm text-[#555] leading-relaxed mb-4">
              Creemos que cada persona merece usar una fragancia original que la haga sentir única. Por eso ofrecemos precios accesibles sin sacrificar la autenticidad de cada producto.
            </p>
            <p className="font-sans text-sm text-[#555] leading-relaxed">
              Nuestro proceso es simple: navega por el catálogo, agrega lo que te guste al carrito, y envíanos tu pedido por WhatsApp. Nosotros nos encargamos del resto.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { number: '32+', label: 'Fragancias en inventario' },
              { number: '100%', label: 'Productos originales garantizados' },
              { number: '🇨🇴', label: 'Envíos a toda Colombia' },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-[#C9A84C] pl-6 py-2">
                <p className="font-heading text-3xl text-[#1A1A1A]">{stat.number}</p>
                <p className="font-sans text-xs text-[#888] tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Lo que nos mueve</p>
          <h2 className="font-heading text-3xl text-white mb-4">Nuestros valores</h2>
          <div className="w-8 h-px bg-[#C9A84C] mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Autenticidad', desc: 'Solo vendemos perfumes 100% originales, sin copias ni imitaciones. Tu confianza es lo más valioso.' },
              { title: 'Calidad', desc: 'Trabajamos con marcas reconocidas mundialmente para garantizarte la mejor experiencia olfativa.' },
              { title: 'Cercanía', desc: 'Atendemos cada pedido de forma personalizada por WhatsApp. Somos cercanos, confiables y siempre disponibles.' },
            ].map((val) => (
              <div key={val.title} className="text-left">
                <div className="w-8 h-px bg-[#C9A84C] mb-4" />
                <h3 className="font-heading text-xl text-white mb-2">{val.title}</h3>
                <p className="font-sans text-xs text-[#888] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl text-[#1A1A1A] mb-4">¿Listo para elegir tu fragancia?</h2>
          <div className="w-10 h-px bg-[#C9A84C] mx-auto mb-6" />
          <p className="font-sans text-sm text-[#888] mb-8">
            Explora nuestro catálogo y encuentra el perfume que mejor te representa.
          </p>
          <Link
            href="/perfumes"
            id="nosotros-cta"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#C9A84C] transition-colors"
          >
            Ver catálogo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
