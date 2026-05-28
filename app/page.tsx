import type { Metadata } from 'next';
import AdSlot from '@/components/AdSlot';
import CTAButton from '@/components/CTAButton';
import OrganizationJsonLd from '@/components/OrganizationJsonLd';
import PostCard from '@/components/PostCard';
import TopographicBlobAnimation from '@/components/TopographicBlobAnimation';
import { getAllPosts } from '@/lib/posts';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Claude Code Guides for Non-Developers',
  description:
    'Learn Claude Code in plain English with practical guides for founders, operators, and creators who want to build without becoming full-time developers.',
  keywords: ['Claude Code', 'AI coding', 'no-code', 'non-developers', 'AI-assisted development', 'software building'],
  alternates: {
    canonical: absoluteUrl('/')
  },
  openGraph: {
    type: 'website',
    title: 'Claude Code Guides for Non-Developers',
    description: siteConfig.description,
    url: absoluteUrl('/'),
    siteName: siteConfig.name,
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
    title: 'Claude Code Guides for Non-Developers',
    description: siteConfig.description,
    images: [absoluteUrl('/og-image.svg')],
    creator: '@BuildWithClaude'
  }
};

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 6);

  return (
    <>
      <OrganizationJsonLd />
      <section className="border-b border-line bg-gradient-to-br from-paper via-paper to-[#fafaf8] relative overflow-hidden">
        <TopographicBlobAnimation />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.5fr_0.5fr] lg:px-6 lg:py-24 relative z-10 lg:items-start">
          <div>
            <p className="animate-slideInLeft text-xs font-bold uppercase tracking-widest text-clay">Claude Code, Translated</p>
            <h1 className="mt-6 animate-slideUp max-w-3xl font-serif text-6xl font-bold leading-[1.1] text-ink sm:text-7xl lg:text-7xl" style={{ animationDelay: '0.1s' }}>
              Build useful software with AI, even if you do not code.
            </h1>
            <p className="mt-8 animate-slideUp max-w-2xl text-lg leading-relaxed text-muted" style={{ animationDelay: '0.2s' }}>
              Practical Claude Code tutorials, workflows, prompts, and publishing playbooks for non-developers turning ideas into working products.
            </p>
            <div className="mt-10 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <CTAButton label="Try the main toolkit" utmContent="homepage_hero" />
            </div>
          </div>
          <div className="animate-slideInRight">
            <img 
              src="/hero-start-here.jpg" 
              alt="Developer working with AI to build software" 
              className="w-full h-auto lg:h-[520px] rounded-2xl shadow-lg object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="hover-lift rounded-xl border border-line bg-paper/50 backdrop-blur-sm">
            <AdSlot placement="homepage-hero-bottom" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="animate-slideInLeft text-xs font-bold uppercase tracking-widest text-clay">Latest Articles</p>
            <h2 className="mt-3 animate-slideUp font-serif text-5xl font-bold text-ink" style={{ animationDelay: '0.1s' }}>Fresh Claude Code guides</h2>
          </div>
          <a className="group transition-smooth text-sm font-bold text-clay underline-offset-4 hover:underline" href="/blog">
            View all articles <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <div key={post.slug} className="animate-slideUp" style={{ animationDelay: `${0.15 + index * 0.05}s` }}>
              <PostCard post={post} priority={index < 2} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
