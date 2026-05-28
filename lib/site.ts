const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const siteConfig = {
  name: 'Build With Claude Code',
  shortName: 'Claude Code for Non-Developers',
  description:
    'Plain-English Claude Code guides for non-developers who want to build useful software with AI.',
  url: siteUrl,
  author: 'Build With Claude',
  productUrl:
    process.env.NEXT_PUBLIC_PRODUCT_URL ||
    'https://buildwithclaude.vercel.app?utm_source=blog&utm_medium=organic&utm_campaign=article',
  adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@example.com'
};

export function absoluteUrl(path = '/') {
  const base = siteConfig.url.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
