import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <article className="hover-lift group overflow-hidden rounded-lg border border-line bg-[#fffaf2] shadow-soft">
      {post.coverImage ? (
        <Link href={`/blog/${post.slug}`} aria-label={post.title} className="block overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={900}
            height={506}
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </Link>
      ) : null}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-moss">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h2 className="mt-3 font-serif text-2xl leading-tight text-ink">
          <Link href={`/blog/${post.slug}`} className="transition-colors duration-200 group-hover:text-clay">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{post.description}</p>
        <div className="mt-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          <time dateTime={post.date}>
            {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(post.date))}
          </time>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  );
}
