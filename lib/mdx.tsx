import Image from 'next/image';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import type { MDXComponents } from 'mdx/types';
import CTAInline from '@/components/CTAInline';

export const mdxComponents: MDXComponents = {
  a: ({ href = '', children }) => {
    const isInternal = href.startsWith('/');

    if (isInternal) {
      return <Link href={href}>{children}</Link>;
    }

    return (
      <a href={href} rel="nofollow noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  },
  img: ({ src = '', alt = '' }) => (
    <Image
      src={String(src)}
      alt={String(alt)}
      width={1200}
      height={675}
      className="my-8 rounded-lg border border-line object-cover"
      loading="lazy"
      sizes="(min-width: 1024px) 760px, 100vw"
    />
  ),
  CTAInline,
  AdSlot
};
