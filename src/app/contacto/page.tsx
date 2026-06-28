import Link from 'next/link';
import type { Metadata } from 'next';
import { BRAND_NAME, SITE_URL } from '@/constants';
import { getWhatsAppContactURL } from '@/utils/generateWhatsAppMessage';

export const metadata: Metadata = {
  title: `Contacto | ${BRAND_NAME}`,
  description: 'Contáctanos por WhatsApp para hacer tu pedido o resolver cualquier duda sobre nuestros perfumes originales.',
  alternates: { canonical: `${SITE_URL}/contacto` },
};

export default function ContactoPage() {
  const waUrl = getWhatsAppContactURL();
  const waGeneral = getWhatsAppContactURL('¡Hola! Tengo una consulta sobre Linda Rosa Perfumes. 🌹');

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F5F5F0] py-24 text-center" aria-label="Contacto">
        <div className="max-w-2xl mx-auto px-4">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">
            Estamos para ti
          </p>
          <h1 className="font-heading text-5xl text-[#1A1A1A] mb-4">Contacto</h1>
          <div className="gold-divider" />
          <p className="font-sans text-sm text-[#666] mt-4 leading-relaxed">
            La forma más rápida de contactarnos es por WhatsApp. Te respondemos de inmediato.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info de contacto */}
          <div>
            <h2 className="font-heading text-2xl text-[#1A1A1A] mb-2">Información de contacto</h2>
            <div className="w-8 h-px bg-[#C9A84C] mb-6" />

            <div className="space-y-6">
              {/* WhatsApp */}
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">
                  WhatsApp — Principal
                </p>
                <Link
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp-link"
                  className="flex items-center gap-3 group"
                  aria-label="Contactar por WhatsApp al +57 320 261 3152"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-[#1A1A1A] group-hover:text-[#C9A84C] transition-colors">
                      +57 320 261 3152
                    </p>
                    <p className="font-sans text-xs text-[#888]">Lunes a sábado · 8am – 8pm</p>
                  </div>
                </Link>
              </div>

              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">
                  Horario de atención
                </p>
                <p className="font-sans text-sm text-[#555]">
                  Lunes a Sábado<br />8:00 AM – 8:00 PM<br />
                  <span className="text-[#888] text-xs">Hora Colombia (COT)</span>
                </p>
              </div>

              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2">
                  Cobertura de envíos
                </p>
                <p className="font-sans text-sm text-[#555]">
                  Toda Colombia 🇨🇴<br />
                  <span className="text-[#888] text-xs">Coordinamos la entrega por WhatsApp</span>
                </p>
              </div>
            </div>
          </div>

          {/* Formulario simple */}
          <div>
            <h2 className="font-heading text-2xl text-[#1A1A1A] mb-2">Escríbenos</h2>
            <div className="w-8 h-px bg-[#C9A84C] mb-6" />
            <p className="font-sans text-sm text-[#888] mb-6 leading-relaxed">
              Para consultas rápidas, pedidos o asesoría personalizada, el camino más directo es siempre WhatsApp.
            </p>

            <Link
              href={waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-cta-whatsapp"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1da851] text-white text-xs tracking-[0.2em] uppercase py-4 transition-colors mb-4 font-sans"
              aria-label="Escribir por WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Abrir WhatsApp
            </Link>

            <div className="bg-[#F5EDD6] border border-[#E8D5A3] p-4">
              <p className="font-sans text-xs text-[#7A6130] leading-relaxed">
                🌹 Al hacer clic se abrirá WhatsApp con un mensaje predeterminado. Puedes editarlo antes de enviarlo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
