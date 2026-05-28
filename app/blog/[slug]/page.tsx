import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSlot from '@/components/AdSlot';
import ArticleJsonLd from '@/components/ArticleJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CTAButton from '@/components/CTAButton';
import MDXContent from '@/components/MDXContent';
import RelatedPosts from '@/components/RelatedPosts';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { absoluteUrl } from '@/lib/site';

type PageProps = {
  params: {
    slug: string;
  };
};

function contentWithArticleCTA(content: string) {
  const paragraphs = content.split(/\n{2,}/);
  let paragraphCount = 0;
  const output: string[] = [];
  let insertedCTA = false;
  let insertedAd = false;

  for (const block of paragraphs) {
    output.push(block);

    if (block.trim().startsWith('<') === false && block.trim().length > 0) {
      paragraphCount += 1;
    }

    if (!insertedCTA && paragraphCount === 3) {
      output.push('<CTAInline />');
      insertedCTA = true;
    }

    if (!insertedAd && paragraphCount === 6) {
      output.push('<AdSlot placement="mid-article" />');
      insertedAd = true;
    }
  }

  return output.join('\n\n');
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const url = absoluteUrl(`/blog/${post.slug}`);
  const images = post.coverImage ? [{ url: absoluteUrl(post.coverImage), width: 1200, height: 675, alt: post.title }] : [];

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags, 'Claude Code', 'AI coding', 'software development'],
    authors: [{ name: post.author }],
    creator: post.author,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images,
      siteName: 'Claude Code for Non-Developers'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [absoluteUrl(post.coverImage)] : undefined,
      creator: '@BuildWithClaude'
    }
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const breadcrumbs = [
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Blog', url: absoluteUrl('/blog') },
    { name: post.title, url: absoluteUrl(`/blog/${post.slug}`) }
  ];

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <article className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[minmax(0,760px)_320px] lg:px-6">
        <div>
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm font-semibold text-muted">
            <Link className="underline-offset-4 hover:text-ink hover:underline" href="/">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link className="underline-offset-4 hover:text-ink hover:underline" href="/blog">
              Blog
            </Link>
          </nav>

          <header>
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.14em] text-moss">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[0.98] text-ink sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-xl leading-8 text-muted">{post.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-muted">
              <span>{post.author}</span>
              <span aria-hidden="true">/</span>
              <time dateTime={post.date}>
                {new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(post.date))}
              </time>
              <span aria-hidden="true">/</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          <AdSlot placement="article-header" className="mt-8" />

          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={675}
              priority
              sizes="(min-width: 1024px) 760px, 100vw"
              className="mt-8 aspect-[16/9] rounded-lg border border-line object-cover"
            />
          ) : null}

          <div className="prose-content mt-10 max-w-none">
            <MDXContent source={contentWithArticleCTA(post.content)} />
          </div>

          <section className="mt-12 rounded-lg border border-line bg-[#fffaf2] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-clay">Next step</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-ink">Turn the article into a shipping workflow.</h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Use the toolkit to move from reading about Claude Code to planning, building, checking, and publishing a real project.
            </p>
            <CTAButton className="mt-5" label="Open the toolkit" utmContent={`article_footer_${post.slug}`} />
          </section>

        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <AdSlot placement="sidebar" />
          <RelatedPosts posts={relatedPosts} />
        </aside>
      </article>
    </>
  );
}
