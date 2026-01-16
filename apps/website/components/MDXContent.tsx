import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'

const components = {
  // Add any custom components you want to use in MDX here
  // wrapper: ({ children }: { children: React.ReactNode }) => <div className="prose">{children}</div>,
}

const options = {
  theme: 'one-light',
}

interface MDXContentProps {
  source: string
}

export default async function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, options]],
          },
        }}
      />
    </div>
  )
}
