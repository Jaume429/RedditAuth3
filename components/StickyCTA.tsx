import CTAButton from '@/components/CTAButton';

export default function StickyCTA() {
  return (
    <div className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <p className="text-sm font-semibold text-ink">
          Claude Code for non-developers: ship practical software with AI guidance.
        </p>
        <CTAButton label="Open the toolkit" className="w-full sm:w-auto" utmContent="sticky_top_bar" />
      </div>
    </div>
  );
}
