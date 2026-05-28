import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How Build With Claude Code creates, reviews, and improves AI-assisted educational content.',
  alternates: {
    canonical: absoluteUrl('/editorial-policy')
  }
};

export default function EditorialPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Editorial Policy</p>
      <h1 className="mt-3 font-serif text-5xl font-bold leading-tight text-ink">How articles are made.</h1>
      <div className="prose-content mt-8">
        <p>
          Build With Claude Code uses AI-assisted workflows to research, draft, structure, and improve educational
          articles. Content is designed to be practical, readable, and useful for non-developers.
        </p>
        <h2>Quality standards</h2>
        <p>
          Articles should answer a clear search intent, include concrete steps or examples, avoid unsupported claims,
          and point readers toward relevant next actions.
        </p>
        <h2>Corrections</h2>
        <p>
          If something is unclear or inaccurate, email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          We review correction requests and update published content when needed.
        </p>
      </div>
    </section>
  );
}
