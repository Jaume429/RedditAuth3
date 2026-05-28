import Link from 'next/link';
import { siteConfig } from '@/lib/site';

type CTAButtonProps = {
  label?: string;
  className?: string;
  utmContent?: string;
};

function productHref(utmContent?: string) {
  if (!utmContent) {
    return siteConfig.productUrl;
  }

  try {
    const url = new URL(siteConfig.productUrl);
    url.searchParams.set('utm_content', utmContent);
    return url.toString();
  } catch {
    return siteConfig.productUrl;
  }
}

export default function CTAButton({ label = 'Start building with Claude', className = '', utmContent }: CTAButtonProps) {
  return (
    <Link
      href={productHref(utmContent)}
      className={`inline-flex min-h-12 items-center justify-center rounded-lg bg-ink px-6 py-3 text-sm font-bold text-paper shadow-md transition-all duration-200 hover:shadow-lg hover:bg-clay focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2 focus:ring-offset-paper ${className}`}
    >
      {label}
    </Link>
  );
}
