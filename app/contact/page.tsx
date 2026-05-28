import type { Metadata } from 'next';
import CTAButton from '@/components/CTAButton';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Build With Claude Code for editorial questions, partnerships, and product feedback.',
  alternates: {
    canonical: absoluteUrl('/contact')
  },
  openGraph: {
    title: 'Contact Build With Claude Code',
    description: 'Editorial questions, partnerships, and product feedback.',
    url: absoluteUrl('/contact')
  }
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Contact</p>
      <h1 className="mt-3 font-serif text-5xl font-bold leading-tight text-ink">Talk to the team.</h1>
      <div className="prose-content mt-8">
        <p>
          Send editorial feedback, partnership notes, corrections, or product questions to{' '}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
        <p>
          If you are here because an article helped you plan a project, the toolkit is the fastest next step.
        </p>
      </div>
      <div className="mt-8">
        <CTAButton label="Open the toolkit" utmContent="contact_page" />
      </div>
    </section>
  );
}
