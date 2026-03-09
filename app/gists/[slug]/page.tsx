import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getGistBySlug, getGistSlugs } from '@/lib/gists';
import BackButton from '@/components/back-button';
import SharedLayout from '@/components/shared-layout';

interface GistPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
}

export default async function GistPage({ params }: GistPageProps) {
  const { slug } = await params;
  const gist = getGistBySlug(slug);

  if (!gist) {
    notFound();
  }

  return (
    <SharedLayout showNavigation={false}>
      <div className="mb-8">
        {/* Back button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Gist header */}
        <header className="mb-8 border-b border-gray-700 pb-6">
          <h1 className="mb-4 text-3xl font-bold">{gist.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <time dateTime={gist.date}>
              {new Date(gist.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {gist.tags && gist.tags.length > 0 && (
              <div className="flex gap-2">
                {gist.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-gray-800 px-3 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Gist content */}
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              // Headers with proper hierarchy
              h1: ({ children }) => (
                <h1 className="mt-8 mb-6 border-b border-gray-700 pb-3 text-4xl font-bold text-white">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-8 mb-4 text-3xl font-semibold text-white">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-6 mb-3 text-2xl font-semibold text-white">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="mt-4 mb-2 text-xl font-semibold text-gray-200">{children}</h4>
              ),
              h5: ({ children }) => (
                <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-200">{children}</h5>
              ),
              h6: ({ children }) => (
                <h6 className="mt-4 mb-2 text-base font-semibold text-gray-300">{children}</h6>
              ),
              // Text formatting
              strong: ({ children }) => (
                <strong className="font-bold text-white">{children}</strong>
              ),
              em: ({ children }) => <em className="text-gray-200 italic">{children}</em>,
              del: ({ children }) => <del className="text-gray-400 line-through">{children}</del>,
              // Images with responsive styling
              img: ({ src, alt, title }) => (
                <img
                  src={src}
                  alt={alt}
                  title={title}
                  className="my-4 h-auto max-w-full rounded-lg border border-gray-700 shadow-lg"
                  loading="lazy"
                />
              ),
              // Lists with custom styling
              ul: ({ children }) => (
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-300">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 list-decimal space-y-2 pl-6 text-gray-300">{children}</ol>
              ),
              li: ({ children }) => <li className="leading-relaxed text-gray-300">{children}</li>,
              // Tables with responsive design
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto">
                  <table className="min-w-full rounded-lg border border-gray-700">{children}</table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-gray-800">{children}</thead>,
              tbody: ({ children }) => <tbody className="bg-gray-900">{children}</tbody>,
              tr: ({ children }) => <tr className="border-b border-gray-700">{children}</tr>,
              th: ({ children }) => (
                <th className="border-r border-gray-700 px-4 py-3 text-left text-sm font-semibold text-white last:border-r-0">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-r border-gray-700 px-4 py-3 text-sm text-gray-300 last:border-r-0">
                  {children}
                </td>
              ),
              // Paragraphs with proper spacing
              p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-300">{children}</p>,
              // Horizontal rules
              hr: () => <hr className="my-8 border-gray-700" />,
              // Custom styling for code blocks
              code: ({ className, children, ...props }: CodeProps) => {
                // Detect if it's a code block vs inline code
                const isCodeBlock =
                  /language-(\w+)/.test(className || '') || String(children).includes('\n');

                if (!isCodeBlock) {
                  // Inline code
                  return (
                    <code
                      className="rounded bg-gray-800 px-2 py-1 font-mono text-sm text-gray-200"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                // Block code
                return (
                  <div className="my-4 overflow-x-auto rounded-lg border border-gray-700 bg-gray-900 p-4">
                    <code
                      className={`${className} block font-mono text-sm whitespace-pre-wrap text-gray-200`}
                      {...props}
                    >
                      {children}
                    </code>
                  </div>
                );
              },
              // Custom styling for blockquotes
              blockquote: ({ children }) => (
                <blockquote className="my-4 rounded-r-lg border-l-4 border-blue-500 bg-gray-800/50 py-2 pl-4 text-gray-300 italic">
                  {children}
                </blockquote>
              ),
              // Custom styling for links
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {gist.content}
          </ReactMarkdown>
        </article>

        {/* Footer with back link */}
        <footer className="mt-12 border-t border-gray-700 pt-6">
          <BackButton />
        </footer>
      </div>
    </SharedLayout>
  );
}

// Generate static params for all gists
export async function generateStaticParams() {
  const slugs = getGistSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}
