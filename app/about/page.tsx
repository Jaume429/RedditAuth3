import type { Metadata } from 'next';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Build With Claude Code, a plain-English learning site for non-developers using AI to build software.',
  alternates: {
    canonical: absoluteUrl('/about')
  },
  openGraph: {
    title: 'About',
    description: 'Plain-English Claude Code guidance for non-developers.',
    url: absoluteUrl('/about')
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About',
    description: 'Plain-English Claude Code guidance for non-developers.'
  }
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">About</p>
      <h1 className="mt-3 font-serif text-5xl font-bold leading-tight text-ink">Software building, without the fog.</h1>
      <div className="prose-content mt-8">
        <p>
          Build With Claude Code helps non-developers use AI coding tools with confidence. The goal is simple:
          explain the workflow clearly enough that founders, creators, operators, and curious beginners can ship useful
          tools without drowning in engineering vocabulary.
        </p>
        <p>
          Articles focus on practical decisions: what to ask Claude Code, how to review generated files, how to publish
          safely, and how to turn repeatable workflows into real products.
        </p>
        <p>
          The site can use AI-assisted drafting, but every publishing workflow should be checked against our{' '}
          <Link href="/editorial-policy">editorial policy</Link> before content goes live.
        </p>
      </div>
      <div className="mt-8">
        <CTAButton utmContent="about_page" />
      </div>
    </section>
  );
}
