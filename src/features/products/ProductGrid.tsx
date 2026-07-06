'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Product, Category } from '@/types';
import { ProductCard } from './ProductCard';
import { Input } from '@/components/ui/input';

interface ProductGridProps {
  products: Product[];
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'mujer', label: 'Mujer' },
  { value: 'hombre', label: 'Hombre' },
  { value: 'unisex', label: 'Unisex' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Relevancia' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'name', label: 'Nombre A-Z' },
];

export function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat') as Category | null;

  const [category, setCategory] = useState<Category | 'all'>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');

  useEffect(() => {
    if (catParam && ['mujer', 'hombre', 'unisex'].includes(catParam)) {
      setCategory(catParam);
    } else {
      setCategory('all');
    }
  }, [catParam]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'es'));
        break;
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <section aria-label="Catálogo de perfumes">
      {/* Controles */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" aria-hidden="true" />
          <Input
            id="product-search"
            type="search"
            placeholder="Buscar por nombre o marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar productos"
            className="pl-9 border-[#E5E5E5] focus-visible:ring-[#C9A84C] font-sans text-sm"
          />
        </div>

        {/* Filtros y orden */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Categorías */}
          <div role="group" aria-label="Filtrar por categoría" className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                id={`filter-${cat.value}`}
                onClick={() => setCategory(cat.value)}
                aria-pressed={category === cat.value}
                className={`px-4 py-1.5 text-xs tracking-[0.15em] uppercase border transition-all duration-200 ${
                  category === cat.value
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#E5E5E5] hover:border-[#1A1A1A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Ordenar */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#888]" aria-hidden="true" />
            <select
              id="product-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              aria-label="Ordenar productos"
              className="text-xs tracking-wide border border-[#E5E5E5] bg-white text-[#1A1A1A] px-2 py-1.5 focus:outline-none focus:border-[#C9A84C] font-sans"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Conteo */}
      <p className="text-xs text-[#888] tracking-wide mb-6" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-heading text-2xl text-[#888] mb-2">Sin resultados</p>
          <p className="text-sm text-[#aaa]">Intenta con otro término o categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
