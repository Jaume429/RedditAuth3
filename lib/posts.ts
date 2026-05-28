import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  author: string;
  coverImage?: string;
};

export type Post = PostFrontmatter & {
  content: string;
  readingTime: string;
  excerpt: string;
};

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.map(String).filter(Boolean);
  }

  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function getPostFiles() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));
}

function postFromFile(fileName: string): Post {
  const fullPath = path.join(postsDirectory, fileName);
  const file = fs.readFileSync(fullPath, 'utf8');
  const { data, content, excerpt } = matter(file, { excerpt: true });
  const fallbackSlug = fileName.replace(/\.mdx?$/, '');

  return {
    title: String(data.title || fallbackSlug),
    description: String(data.description || excerpt || ''),
    date: String(data.date || new Date().toISOString()),
    slug: String(data.slug || fallbackSlug),
    tags: normalizeTags(data.tags),
    author: String(data.author || 'Build With Claude'),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    content,
    readingTime: readingTime(content).text,
    excerpt: String(excerpt || data.description || '')
  };
}

export function getAllPosts(): Post[] {
  return getPostFiles()
    .map(postFromFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((post) => post.slug === slug) || null;
}

export function getRelatedPosts(post: Post, limit = 4): Post[] {
  const tagSet = new Set(post.tags);

  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.reduce((score, tag) => score + (tagSet.has(tag) ? 1 : 0), 0)
    }))
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, limit)
    .map(({ post: relatedPost }) => relatedPost);
}

export function paginatePosts(posts: Post[], page = 1, perPage = 12) {
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    posts: posts.slice(start, start + perPage),
    currentPage,
    totalPages,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages
  };
}
