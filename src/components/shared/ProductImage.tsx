'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-[#F5EDD6] ${className}`}
        aria-label={`Imagen no disponible para ${alt}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80 80"
          className="w-16 h-16 opacity-40"
          fill="none"
        >
          <rect width="80" height="80" rx="4" fill="#E8D5A3" />
          <path
            d="M40 20C34.5 20 30 24.5 30 30C30 33.5 31.7 36.6 34.3 38.5L22 56H58L45.7 38.5C48.3 36.6 50 33.5 50 30C50 24.5 45.5 20 40 20Z"
            fill="#C9A84C"
            fillOpacity="0.6"
          />
          <circle cx="40" cy="30" r="6" fill="#C9A84C" fillOpacity="0.8" />
          <path d="M30 56L40 42L50 56" stroke="#C9A84C" strokeWidth="1.5" strokeOpacity="0.5" />
          <text x="40" y="70" textAnchor="middle" fontSize="8" fill="#C9A84C" fontFamily="serif">
            LINDA ROSA
          </text>
        </svg>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      priority={priority}
    />
  );
}
