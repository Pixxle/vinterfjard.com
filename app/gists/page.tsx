import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getAllGists } from '@/lib/gists';
import SharedLayout from '@/components/shared-layout';

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
}

export default async function GistsPage() {
  const gists = getAllGists();

  if (gists.length === 0) {
    return (
      <SharedLayout showNavigation={true}>
        <div className="mb-8">
          <h1 className="mb-4 text-2xl font-bold">Gists</h1>
          <div className="rounded-md border border-gray-700 bg-[#0d1117] p-8 text-center text-gray-400">
            <p className="mb-2">No gists found.</p>
            <p className="text-sm">
              Add markdown files to the{' '}
              <code className="rounded bg-gray-800 px-2 py-1">gists/</code> folder to get started.
            </p>
          </div>
        </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout showNavigation={true}>
      <div className="mb-8">
        <h1 className="mb-6 text-2xl font-bold">Gists</h1>
        <div className="space-y-6">
          {gists.map(gist => (
            <article
              key={gist.slug}
              className="rounded-md border border-gray-700 bg-[#0d1117] p-6 transition-colors hover:border-gray-600"
            >
              <header className="mb-4">
                <h2 className="mb-2 text-xl font-semibold">
                  <Link
                    href={`/gists/${gist.slug}`}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {gist.title}
                  </Link>
                </h2>
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
                        <span key={tag} className="rounded-full bg-gray-800 px-2 py-1 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </header>

              <div className="prose prose-invert max-w-none overflow-hidden">
                <ReactMarkdown
                  components={{
                    // All headers rendered as bold text
                    h1: ({ children }) => (
                      <p className="mb-2 font-bold break-words text-white">{children}</p>
                    ),
                    h2: ({ children }) => (
                      <p className="mb-2 font-bold break-words text-white">{children}</p>
                    ),
                    h3: ({ children }) => (
                      <p className="mb-2 font-bold break-words text-white">{children}</p>
                    ),
                    h4: ({ children }) => (
                      <p className="mb-2 font-bold break-words text-white">{children}</p>
                    ),
                    h5: ({ children }) => (
                      <p className="mb-2 font-bold break-words text-white">{children}</p>
                    ),
                    h6: ({ children }) => (
                      <p className="mb-2 font-bold break-words text-white">{children}</p>
                    ),
                    // Text formatting
                    strong: ({ children }) => (
                      <strong className="font-bold text-white">{children}</strong>
                    ),
                    em: ({ children }) => <em className="text-gray-200 italic">{children}</em>,
                    // Code styling - handle both inline and block
                    code: ({ className, children, ...props }: CodeProps) => {
                      // Detect if it's a code block vs inline code
                      const isCodeBlock =
                        /language-(\w+)/.test(className || '') || String(children).includes('\n');

                      if (!isCodeBlock) {
                        // Inline code
                        return (
                          <code
                            className="rounded bg-gray-800 px-1 py-0.5 font-mono text-sm break-all text-gray-200"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }

                      // Block code
                      return (
                        <div className="my-2 overflow-x-auto rounded bg-gray-900 p-3 text-sm">
                          <code
                            className="block font-mono break-words whitespace-pre-wrap text-gray-200"
                            {...props}
                          >
                            {children}
                          </code>
                        </div>
                      );
                    },
                    // Links
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="break-words text-blue-400 hover:text-blue-300 hover:underline"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                    // Images with responsive styling
                    img: ({ src, alt, title }) => (
                      <img
                        src={src}
                        alt={alt}
                        title={title}
                        className="my-2 h-auto max-w-full rounded-lg border border-gray-700 shadow-lg"
                        loading="lazy"
                      />
                    ),
                    // Paragraphs with proper wrapping
                    p: ({ children }) => (
                      <p className="mb-2 leading-relaxed break-words text-gray-300">{children}</p>
                    ),
                    // Lists with proper wrapping
                    ul: ({ children }) => (
                      <ul className="mb-2 list-disc space-y-1 pl-4 text-gray-300">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-2 list-decimal space-y-1 pl-4 text-gray-300">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed break-words text-gray-300">{children}</li>
                    ),
                  }}
                >
                  {gist.excerpt}
                </ReactMarkdown>
              </div>

              {gist.isLong && (
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <Link
                    href={`/gists/${gist.slug}`}
                    className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"
                  >
                    Read more →
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
}
