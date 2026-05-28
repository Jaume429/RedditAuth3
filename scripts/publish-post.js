#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const postsDir = path.join(process.cwd(), 'content', 'posts');

function parseArgs(argv) {
  const data = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (!arg.startsWith('--')) {
      continue;
    }

    const key = arg.slice(2);
    const next = argv[i + 1];

    if (!next || next.startsWith('--')) {
      data[key] = true;
    } else {
      data[key] = next;
      i += 1;
    }
  }

  if (data.payload) {
    return { ...JSON.parse(data.payload), ...data };
  }

  return data;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map(String).map((tag) => tag.trim()).filter(Boolean);
  }

  return String(tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function yamlString(value) {
  return `"${String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function buildFrontmatter(article) {
  const title = article.title;
  const slug = article.slug || slugify(title);
  const description =
    article.description ||
    String(article.content || '')
      .replace(/[#*_`>\[\]()]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 155);
  const date = article.date || new Date().toISOString();
  const tags = normalizeTags(article.tags);
  const author = article.author || 'Build With Claude';
  const coverImage = article.coverImage || '/covers/claude-code-workflow.svg';

  return `---\ntitle: ${yamlString(title)}\ndescription: ${yamlString(description)}\ndate: ${yamlString(date)}\nslug: ${yamlString(slug)}\ntags: [${tags.map(yamlString).join(', ')}]\nauthor: ${yamlString(author)}\ncoverImage: ${yamlString(coverImage)}\n---\n\n`;
}

function main() {
  const article = parseArgs(process.argv.slice(2));

  if (!article.title || !article.content) {
    console.error('Usage: node scripts/publish-post.js --title "..." --content "..." --tags "tag one, tag two"');
    console.error('Optional: --description "..." --slug "..." --author "..." --date "..." --coverImage "/covers/image.svg"');
    process.exit(1);
  }

  fs.mkdirSync(postsDir, { recursive: true });

  const slug = article.slug || slugify(article.title);
  const filePath = path.join(postsDir, `${slug}.mdx`);

  if (fs.existsSync(filePath) && article.overwrite !== true && article.overwrite !== 'true') {
    console.error(`Post already exists: ${filePath}`);
    console.error('Pass --overwrite true to replace it.');
    process.exit(1);
  }

  const mdx = `${buildFrontmatter({ ...article, slug })}${String(article.content).trim()}\n`;
  fs.writeFileSync(filePath, mdx, 'utf8');
  console.log(JSON.stringify({ ok: true, slug, file: filePath }, null, 2));
}

main();
