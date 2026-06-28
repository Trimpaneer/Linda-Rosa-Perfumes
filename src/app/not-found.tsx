import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada | Linda Rosa Perfumes',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Error 404</p>
        <h1 className="font-heading text-6xl md:text-8xl text-[#1A1A1A] mb-4">404</h1>
        <div className="w-12 h-px bg-[#C9A84C] mx-auto mb-6" />
        <p className="font-sans text-base text-[#888] mb-8 max-w-sm mx-auto leading-relaxed">
          La página que buscas no existe o fue movida. Regresa al inicio o explora nuestro catálogo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-[#C9A84C] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Ir al inicio
          </Link>
          <Link
            href="/perfumes"
            className="inline-flex items-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
