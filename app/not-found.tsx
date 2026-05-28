import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center lg:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">404</p>
      <h1 className="mt-3 font-serif text-5xl font-bold text-ink">This page is not here.</h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        The article may have moved, or the URL may be mistyped.
      </p>
      <Link className="mt-8 inline-flex rounded-md bg-ink px-5 py-3 text-sm font-bold text-paper" href="/blog">
        Browse articles
      </Link>
    </section>
  );
}
