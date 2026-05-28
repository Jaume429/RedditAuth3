type AdSlotProps = {
  placement: 'homepage-hero-bottom' | 'article-header' | 'mid-article' | 'sidebar' | 'footer';
  className?: string;
};

const labels = {
  'homepage-hero-bottom': 'Homepage sponsor slot',
  'article-header': 'Article header ad',
  'mid-article': 'Mid article ad',
  sidebar: 'Sidebar ad',
  footer: 'Footer ad'
};

export default function AdSlot({ placement, className = '' }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = process.env[`NEXT_PUBLIC_ADSENSE_SLOT_${placement.toUpperCase().replace(/-/g, '_')}`];
  const adsEnabled = Boolean(client?.startsWith('ca-pub-') && slot);

  return (
    <aside
      aria-label={labels[placement]}
      className={`flex min-h-28 items-center justify-center rounded-lg border border-dashed border-line bg-white/45 p-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-muted ${className}`}
      data-ad-placement={placement}
    >
      {adsEnabled ? (
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <span>Reserved sponsor placement</span>
      )}
    </aside>
  );
}
