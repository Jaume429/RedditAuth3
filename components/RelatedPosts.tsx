import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-line bg-[#fffaf2] p-5">
      <h2 className="font-serif text-2xl text-ink">Related guides</h2>
      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
            <Link href={`/blog/${post.slug}`} className="font-bold leading-snug text-ink transition hover:text-clay">
              {post.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-muted">{post.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
