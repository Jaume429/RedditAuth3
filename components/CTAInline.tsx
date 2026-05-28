import CTAButton from '@/components/CTAButton';

export default function CTAInline() {
  return (
    <section className="my-8 rounded-lg border border-line bg-[#fffaf2] p-5 shadow-soft">
      <p className="m-0 text-sm font-bold uppercase tracking-[0.12em] text-clay">Build without waiting on a developer</p>
      <h2 className="mt-2 font-serif text-2xl leading-tight text-ink">Turn a Claude Code idea into a working product faster.</h2>
      <p className="mt-3 text-base leading-7 text-muted">
        Get the practical workflow, prompts, and publishing checklist built for non-developers.
      </p>
      <CTAButton className="mt-4" label="Get the workflow" utmContent="inline_article_cta" />
    </section>
  );
}
