import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4
    },
    {
      url: absoluteUrl('/editorial-policy'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4
    },
    {
      url: absoluteUrl('/privacy'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: absoluteUrl('/terms'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ];

  const postRoutes = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...postRoutes];
}
