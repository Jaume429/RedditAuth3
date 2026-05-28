import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <AdSlot placement="footer" />
        <div className="mt-8 flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Plain-English AI building guides.</p>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 font-semibold">
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/editorial-policy">Editorial</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
