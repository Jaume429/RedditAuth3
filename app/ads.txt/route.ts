import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const body = siteConfig.adsensePublisherId
    ? `google.com, ${siteConfig.adsensePublisherId}, DIRECT, f08c47fec0942fa0\n`
    : '# Configure NEXT_PUBLIC_ADSENSE_CLIENT to enable Google AdSense ads.txt\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
