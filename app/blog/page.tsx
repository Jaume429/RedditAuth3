import type { Metadata } from 'next';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getAllPosts, paginatePosts } from '@/lib/posts';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog - Claude Code Guides',
  description: 'Browse practical Claude Code tutorials and AI building guides written for non-developers. Learn to ship software with AI assistance.',
  keywords: ['Claude Code', 'blog', 'tutorials', 'AI coding', 'guides', 'software building'],
  alternates: {
    canonical: absoluteUrl('/blog')
  },
  openGraph: {
    type: 'website',
    title: 'Claude Code Blog - Tutorials & Guides for Non-Developers',
    description: 'Browse practical Claude Code tutorials and AI building guides written for non-developers.',
    url: absoluteUrl('/blog'),
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl('/og-image.svg'),
        width: 1200,
        height: 630,
        alt: 'Claude Code Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Blog',
    description: 'Browse practical Claude Code tutorials and AI building guides written for non-developers.',
    images: [absoluteUrl('/og-image.svg')],
    creator: '@BuildWithClaude'
  }
};

export default function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page || '1');
  const pagination = paginatePosts(getAllPosts(), Number.isNaN(page) ? 1 : page, 12);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">The archive</p>
        <h1 className="mt-3 font-serif text-5xl font-bold leading-tight text-ink">Claude Code blog</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Clear, practical articles for using Claude Code to plan, build, test, and publish real projects.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pagination.posts.map((post, index) => (
          <PostCard key={post.slug} post={post} priority={index < 2} />
        ))}
      </div>
      {pagination.totalPages > 1 ? (
        <nav aria-label="Blog pagination" className="mt-10 flex items-center justify-center gap-3">
          {pagination.hasPrevious ? (
            <Link className="rounded-md border border-line px-4 py-3 text-sm font-bold" href={`/blog?page=${pagination.currentPage - 1}`}>
              Previous
            </Link>
          ) : null}
          <span className="text-sm font-semibold text-muted">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          {pagination.hasNext ? (
            <Link className="rounded-md border border-line px-4 py-3 text-sm font-bold" href={`/blog?page=${pagination.currentPage + 1}`}>
              Next
            </Link>
          ) : null}
        </nav>
      ) : null}
    </section>
  );
}
