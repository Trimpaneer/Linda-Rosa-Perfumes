'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { NAV_LINKS, BRAND_NAME } from '@/constants';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu */}
          <MobileMenu />

          {/* Logo */}
          <Link
            href="/"
            id="navbar-logo"
            className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0"
            aria-label={`${BRAND_NAME} — Ir al inicio`}
          >
            <div className="text-center">
              <span className="font-heading text-lg md:text-xl tracking-[0.2em] text-[#1A1A1A] uppercase">
                Linda Rosa
              </span>
              <div className="w-8 h-px bg-[#C9A84C] mx-auto mt-0.5" />
              <span className="block font-sans text-[8px] tracking-[0.35em] text-[#888] uppercase mt-0.5">
                Perfumes
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-[0.15em] uppercase text-[#1A1A1A] hover:text-[#C9A84C] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Carrito */}
          <Link
            href="/carrito"
            id="navbar-cart"
            aria-label={`Carrito de compras, ${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
            className="relative flex items-center gap-1 p-2 rounded-sm hover:bg-[#F5F5F0] transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-[#1A1A1A]" />
            {totalItems > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A84C] text-white text-[10px] font-medium flex items-center justify-center"
              >
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
