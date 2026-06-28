'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';
import { NAV_LINKS } from '@/constants';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        id="mobile-menu-btn"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-sm hover:bg-[#F5F5F0] transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
          <span className="font-heading text-xl tracking-widest">LINDA ROSA</span>
          <button
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="p-2 rounded-sm hover:bg-[#F5F5F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <ul className="flex flex-col px-6 py-8 gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-sans text-sm tracking-widest uppercase text-[#1A1A1A] hover:text-[#C9A84C] transition-colors border-b border-[#E5E5E5]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6">
          <div className="w-8 h-px bg-[#C9A84C] mb-4" />
          <p className="text-xs text-[#666] tracking-wider leading-relaxed">
            Perfumes originales para cada ocasión.
          </p>
        </div>
      </nav>
    </>
  );
}
