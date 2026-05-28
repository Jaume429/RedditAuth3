import { absoluteUrl, siteConfig } from '@/lib/site';

export default function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo.png'),
    description: siteConfig.description,
    sameAs: [
      'https://twitter.com/BuildWithClaude',
      'https://www.linkedin.com/company/build-with-claude'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: absoluteUrl('/about')
    }
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
