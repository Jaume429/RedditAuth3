import type { Metadata, Viewport } from 'next';
import './globals.css';
import AdSenseScript from '@/components/AdSenseScript';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StickyCTA from '@/components/StickyCTA';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.shortName,
    template: `%s | ${siteConfig.shortName}`
  },
  description: siteConfig.description,
  keywords: ['Claude Code', 'AI coding', 'non-developers', 'software building', 'AI-assisted development'],
  authors: [{ name: 'Build With Claude', url: siteConfig.url }],
  creator: 'Build With Claude',
  publisher: 'Build With Claude',
  formatDetection: {
    email: false,
    telephone: false,
    address: false
  },
  alternates: {
    canonical: absoluteUrl('/'),
    languages: {
      en: absoluteUrl('/')
    }
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    title: siteConfig.shortName,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: 'en_US',
    images: [
      {
        url: absoluteUrl('/og-image.svg'),
        width: 1200,
        height: 630,
        alt: 'Claude Code for Non-Developers - Build useful software with AI'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.shortName,
    description: siteConfig.description,
    images: [absoluteUrl('/og-image.svg')],
    creator: '@BuildWithClaude'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-paper" href="#main">
          Skip to main content
        </a>
        <AdSenseScript />
        <StickyCTA />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
