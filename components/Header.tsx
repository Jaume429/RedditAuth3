import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Header() {
  return (
    <header className="border-b border-line/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 lg:px-6">
        <Link href="/" className="font-serif text-xl font-bold leading-none text-ink">
          {siteConfig.shortName}
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm font-semibold text-muted">
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
      </div>
    </header>
  );
}
