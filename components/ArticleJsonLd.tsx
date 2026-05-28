import { absoluteUrl, siteConfig } from '@/lib/site';
import type { Post } from '@/lib/posts';

export default function ArticleJsonLd({ post }: { post: Post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: [
      {
        '@type': 'Person',
        name: post.author,
        url: absoluteUrl('/about')
      }
    ],
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.png')
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${post.slug}`)
    },
    image: post.coverImage
      ? [
          {
            '@type': 'ImageObject',
            url: absoluteUrl(post.coverImage),
            width: 1200,
            height: 675
          }
        ]
      : undefined,
    keywords: post.tags.join(', ')
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  );
}
