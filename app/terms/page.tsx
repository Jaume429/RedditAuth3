import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for Build With Claude Code.',
  alternates: {
    canonical: absoluteUrl('/terms')
  }
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Terms</p>
      <h1 className="mt-3 font-serif text-5xl font-bold leading-tight text-ink">Terms of use</h1>
      <div className="prose-content mt-8">
        <p>
          The content on this site is educational and provided as-is. It is not legal, financial, security, or
          professional engineering advice.
        </p>
        <h2>Use of content</h2>
        <p>
          You may read and share links to our articles. Do not republish large portions of the site without permission.
        </p>
        <h2>Product links</h2>
        <p>
          Some links may point to our own products or partners. We may earn revenue from purchases, ads, or referrals.
        </p>
        <h2>Contact</h2>
        <p>
          Questions can be sent to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </div>
    </section>
  );
}
