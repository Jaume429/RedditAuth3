import Script from 'next/script';
import { siteConfig } from '@/lib/site';

export default function AdSenseScript() {
  if (!siteConfig.adsensePublisherId.startsWith('ca-pub-')) {
    return null;
  }

  return (
    <Script
      id="adsense-loader"
      strategy="lazyOnload"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsensePublisherId}`}
      crossOrigin="anonymous"
    />
  );
}
