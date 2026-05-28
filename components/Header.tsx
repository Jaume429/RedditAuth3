import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import CTAButton from '@/components/CTAButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <Link href="/" className="font-serif text-lg font-bold text-ink">
          {siteConfig.shortName}
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm font-medium text-muted">
          <Link className="transition hover:text-ink" href="/blog">
            Blog
          </Link>
          <Link className="transition hover:text-ink" href="/about">
            About
          </Link>
          <Link className="transition hover:text-ink" href="/contact">
            Contact
          </Link>
        </nav>
        <CTAButton label="Open the toolkit" utmContent="header_button" />
      </div>
    </header>
  );
}
