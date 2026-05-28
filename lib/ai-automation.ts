import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type AIPostMetadata = {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  author: string;
  coverImage?: string;
  generatedBy?: 'claude' | 'custom';
  generatedAt?: string;
  seoScore?: number;
  status: 'draft' | 'scheduled' | 'published';
  publishedAt?: string;
};

export type AIPost = AIPostMetadata & {
  content: string;
};

const aiQueueDirectory = path.join(process.cwd(), 'content', 'ai-queue');
const publishedPostsDirectory = path.join(process.cwd(), 'content', 'posts');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertSafeSlug(slug: string) {
  if (!slugPattern.test(slug)) {
    throw new Error('Slug must use lowercase letters, numbers, and single hyphens only');
  }
}

function safePostPath(directory: string, slug: string) {
  assertSafeSlug(slug);
  const filePath = path.resolve(directory, `${slug}.mdx`);
  const directoryPath = path.resolve(directory);

  if (!filePath.startsWith(directoryPath + path.sep)) {
    throw new Error('Invalid post path');
  }

  return filePath;
}

function wordCount(content: string) {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

export function scorePostQuality(postData: Pick<AIPost, 'title' | 'description' | 'content' | 'tags'>) {
  let score = 0;
  const words = wordCount(postData.content);
  const h2Count = (postData.content.match(/^#{2}\s+/gm) || []).length;
  const h3Count = (postData.content.match(/^#{3}\s+/gm) || []).length;
  const internalLinks = (postData.content.match(/\]\(\/[^)]+\)/g) || []).length;
  const hasConcreteExamples = /\b(example|checklist|template|step|workflow|prompt)\b/i.test(postData.content);
  const hasFaq = /\bfaq\b|^##\s+Frequently asked questions/im.test(postData.content);

  if (postData.title.length >= 35 && postData.title.length <= 70) score += 15;
  if (postData.description.length >= 110 && postData.description.length <= 160) score += 15;
  if (words >= 900) score += 20;
  else if (words >= 700) score += 12;
  else if (words >= 500) score += 6;
  if (h2Count >= 4) score += 15;
  else if (h2Count >= 2) score += 8;
  if (h3Count >= 2) score += 8;
  if (postData.tags.length >= 2 && postData.tags.length <= 6) score += 8;
  if (internalLinks >= 2) score += 8;
  else if (internalLinks === 1) score += 4;
  if (hasConcreteExamples) score += 8;
  if (hasFaq) score += 3;

  return Math.min(score, 100);
}

function validatePostData(postData: AIPost) {
  assertSafeSlug(postData.slug);

  if (postData.title.trim().length < 20 || postData.title.length > 90) {
    throw new Error('Title must be between 20 and 90 characters');
  }

  if (postData.description.trim().length < 70 || postData.description.length > 180) {
    throw new Error('Description must be between 70 and 180 characters');
  }

  if (wordCount(postData.content) < 500) {
    throw new Error('Content must be at least 500 words before it can enter the queue');
  }

  if (/\\n|TODO|placeholder|lorem ipsum/i.test(postData.content)) {
    throw new Error('Content contains escaped newlines or placeholder text');
  }

  if (!/^#{2}\s+/m.test(postData.content)) {
    throw new Error('Content must include at least one H2 section');
  }
}

function serializePost(frontmatter: Record<string, unknown>, content: string) {
  return matter.stringify(content.trim() + '\n', frontmatter);
}

// Ensure directories exist
export function ensureDirectoriesExist() {
  if (!fs.existsSync(aiQueueDirectory)) {
    fs.mkdirSync(aiQueueDirectory, { recursive: true });
  }
  if (!fs.existsSync(publishedPostsDirectory)) {
    fs.mkdirSync(publishedPostsDirectory, { recursive: true });
  }
}

// Get all posts in queue
export function getQueuedPosts(): AIPost[] {
  ensureDirectoriesExist();

  if (!fs.existsSync(aiQueueDirectory)) {
    return [];
  }

  const files = fs.readdirSync(aiQueueDirectory).filter((f) => f.endsWith('.mdx'));

  return files.map((file) => {
    const fullPath = path.join(aiQueueDirectory, file);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      slug: data.slug || file.replace('.mdx', ''),
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || 'AI Assistant',
      coverImage: data.coverImage,
      generatedBy: data.generatedBy || 'claude',
      generatedAt: data.generatedAt,
      seoScore: data.seoScore || 0,
      status: data.status || 'draft',
      publishedAt: data.publishedAt,
      content
    };
  });
}

// Create new AI-generated post
export function createAIPost(postData: Omit<AIPost, 'publishedAt'>) {
  ensureDirectoriesExist();
  validatePostData(postData);

  const fileName = `${postData.slug}.mdx`;
  const filePath = safePostPath(aiQueueDirectory, postData.slug);

  if (fs.existsSync(filePath) || fs.existsSync(safePostPath(publishedPostsDirectory, postData.slug))) {
    throw new Error(`Post already exists: ${postData.slug}`);
  }

  const frontmatter = {
    title: postData.title,
    description: postData.description,
    date: postData.date,
    slug: postData.slug,
    tags: postData.tags,
    author: postData.author,
    coverImage: postData.coverImage,
    generatedBy: postData.generatedBy || 'claude',
    generatedAt: postData.generatedAt || new Date().toISOString(),
    seoScore: postData.seoScore || 0,
    status: postData.status || 'draft'
  };

  const content = serializePost(frontmatter, postData.content);

  fs.writeFileSync(filePath, content);
  return postData;
}

// Publish queued post to blog
export function publishQueuedPost(slug: string) {
  const queuedFilePath = safePostPath(aiQueueDirectory, slug);

  if (!fs.existsSync(queuedFilePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContent = fs.readFileSync(queuedFilePath, 'utf8');
  const { data, content } = matter(fileContent);
  validatePostData({
    title: data.title || '',
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    slug: data.slug || slug,
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author || 'AI Assistant',
    coverImage: data.coverImage,
    generatedBy: data.generatedBy || 'claude',
    generatedAt: data.generatedAt,
    seoScore: data.seoScore || 0,
    status: data.status || 'draft',
    content
  });

  if ((data.seoScore || 0) < 70) {
    throw new Error('Post must have an SEO score of at least 70 before publishing');
  }

  // Update metadata
  data.status = 'published';
  data.publishedAt = new Date().toISOString();

  const publishedContent = serializePost(data, content);

  // Write to published posts directory
  const publishedFilePath = safePostPath(publishedPostsDirectory, slug);
  fs.writeFileSync(publishedFilePath, publishedContent);

  // Remove from queue
  fs.unlinkSync(queuedFilePath);

  return { slug, status: 'published', publishedAt: data.publishedAt };
}

// Update SEO score
export function updatePostSEOScore(slug: string, score: number, directory: 'queue' | 'posts' = 'queue') {
  const dir = directory === 'queue' ? aiQueueDirectory : publishedPostsDirectory;
  const filePath = safePostPath(dir, slug);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  data.seoScore = score;

  const updatedContent = serializePost(data, content);

  fs.writeFileSync(filePath, updatedContent);
  return { slug, seoScore: score };
}

// Get queued post by slug
export function getQueuedPost(slug: string): AIPost | null {
  const filePath = safePostPath(aiQueueDirectory, slug);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    slug: data.slug || slug,
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author || 'AI Assistant',
    coverImage: data.coverImage,
    generatedBy: data.generatedBy || 'claude',
    generatedAt: data.generatedAt,
    seoScore: data.seoScore || 0,
    status: data.status || 'draft',
    publishedAt: data.publishedAt,
    content
  };
}
