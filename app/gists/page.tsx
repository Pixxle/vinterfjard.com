import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getAllGists } from "@/lib/gists";
import SharedLayout from "@/components/shared-layout";

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
}

export default async function GistsPage() {
  const gists = getAllGists();

  if (gists.length === 0) {
    return (
      <SharedLayout showNavigation={false}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Gists</h1>
          <div className="rounded-md border border-gray-700 bg-[#0d1117] p-8 text-center text-gray-400">
            <p className="mb-2">No gists found.</p>
            <p className="text-sm">
              Add markdown files to the{" "}
              <code className="bg-gray-800 px-2 py-1 rounded">gists/</code>{" "}
              folder to get started.
            </p>
          </div>
        </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout showNavigation={false}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Gists</h1>
        <div className="space-y-6">
          {gists.map((gist) => (
            <article
              key={gist.slug}
              className="rounded-md border border-gray-700 bg-[#0d1117] p-6 hover:border-gray-600 transition-colors"
            >
              <header className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/gists/${gist.slug}`}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {gist.title}
                  </Link>
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <time dateTime={gist.date}>
                    {new Date(gist.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {gist.tags && gist.tags.length > 0 && (
                    <div className="flex gap-2">
                      {gist.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 rounded-full text-xs"
                        >
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
                      <p className="font-bold text-white mb-2 break-words">
                        {children}
                      </p>
                    ),
                    h2: ({ children }) => (
                      <p className="font-bold text-white mb-2 break-words">
                        {children}
                      </p>
                    ),
                    h3: ({ children }) => (
                      <p className="font-bold text-white mb-2 break-words">
                        {children}
                      </p>
                    ),
                    h4: ({ children }) => (
                      <p className="font-bold text-white mb-2 break-words">
                        {children}
                      </p>
                    ),
                    h5: ({ children }) => (
                      <p className="font-bold text-white mb-2 break-words">
                        {children}
                      </p>
                    ),
                    h6: ({ children }) => (
                      <p className="font-bold text-white mb-2 break-words">
                        {children}
                      </p>
                    ),
                    // Text formatting
                    strong: ({ children }) => (
                      <strong className="font-bold text-white">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-200">{children}</em>
                    ),
                    // Code styling - handle both inline and block
                    code: ({ className, children, ...props }: CodeProps) => {
                      // Detect if it's a code block vs inline code
                      const isCodeBlock = /language-(\w+)/.test(className || '') || 
                                          String(children).includes('\n');
                      
                      if (!isCodeBlock) {
                        // Inline code
                        return (
                          <code
                            className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-gray-200 break-all"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }
                      
                      // Block code
                      return (
                        <div className="bg-gray-900 p-3 rounded overflow-x-auto my-2 text-sm">
                          <code
                            className="text-gray-200 font-mono break-words whitespace-pre-wrap block"
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
                        className="text-blue-400 hover:text-blue-300 hover:underline break-words"
                        target={href?.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {children}
                      </a>
                    ),
                    // Paragraphs with proper wrapping
                    p: ({ children }) => (
                      <p className="mb-2 text-gray-300 leading-relaxed break-words">
                        {children}
                      </p>
                    ),
                    // Lists with proper wrapping
                    ul: ({ children }) => (
                      <ul className="list-disc pl-4 mb-2 space-y-1 text-gray-300">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-4 mb-2 space-y-1 text-gray-300">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300 leading-relaxed break-words">
                        {children}
                      </li>
                    ),
                  }}
                >
                  {gist.excerpt}
                </ReactMarkdown>
              </div>

              {gist.isLong && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <Link
                    href={`/gists/${gist.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
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
