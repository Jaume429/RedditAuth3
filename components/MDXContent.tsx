import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { mdxComponents } from '@/lib/mdx';

type MDXContentProps = {
  source: string;
};

export default async function MDXContent({ source }: MDXContentProps) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    baseUrl: import.meta.url,
    useMDXComponents: () => mdxComponents
  });

  return <Content />;
}
