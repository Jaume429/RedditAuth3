import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Build With Claude Code.',
  alternates: {
    canonical: absoluteUrl('/privacy')
  }
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Privacy</p>
      <h1 className="mt-3 font-serif text-5xl font-bold leading-tight text-ink">Privacy policy</h1>
      <div className="prose-content mt-8">
        <p>
          Build With Claude Code publishes educational content and may use analytics, affiliate links, advertising
          partners, and product links to understand performance and fund the site.
        </p>
        <h2>Information we collect</h2>
        <p>
          We may collect basic usage data such as pages visited, referral sources, device/browser information, and CTA
          interactions. If you contact us, we receive the information you choose to send.
        </p>
        <h2>Advertising and analytics</h2>
        <p>
          If ads or analytics are enabled, third-party providers may use cookies or similar technologies to measure
          performance and personalize or limit advertising. You can control cookies through your browser settings.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy questions, email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </div>
    </section>
  );
}
