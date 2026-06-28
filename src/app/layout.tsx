import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { Toaster } from '@/components/ui/sonner';
import { BRAND_NAME, BRAND_DESCRIPTION, SITE_URL, SEO_KEYWORDS } from '@/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} | Perfumes Originales en Colombia`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: BRAND_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} | Perfumes Originales en Colombia`,
    description: BRAND_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} — Perfumes originales`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_NAME} | Perfumes Originales en Colombia`,
    description: BRAND_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-[#1A1A1A] antialiased">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
