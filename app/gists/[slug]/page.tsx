import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { getGistBySlug, getGistSlugs } from "@/lib/gists";
import SharedLayout from "@/components/shared-layout";

interface GistPageProps {
  params: {
    slug: string;
  };
}

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
}

export default async function GistPage({ params }: GistPageProps) {
  const gist = getGistBySlug(params.slug);

  if (!gist) {
    notFound();
  }

  return (
    <SharedLayout showNavigation={false}>
      <div className="mb-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/gists"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gists
          </Link>
        </div>

        {/* Gist header */}
        <header className="mb-8 pb-6 border-b border-gray-700">
          <h1 className="text-3xl font-bold mb-4">{gist.title}</h1>
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
                    className="px-3 py-1 bg-gray-800 rounded-full text-xs"
                  >
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
                <h1 className="text-4xl font-bold mb-6 mt-8 text-white border-b border-gray-700 pb-3">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold mb-4 mt-8 text-white">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold mb-3 mt-6 text-white">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-xl font-semibold mb-2 mt-4 text-gray-200">
                  {children}
                </h4>
              ),
              h5: ({ children }) => (
                <h5 className="text-lg font-semibold mb-2 mt-4 text-gray-200">
                  {children}
                </h5>
              ),
              h6: ({ children }) => (
                <h6 className="text-base font-semibold mb-2 mt-4 text-gray-300">
                  {children}
                </h6>
              ),
              // Text formatting
              strong: ({ children }) => (
                <strong className="font-bold text-white">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="italic text-gray-200">
                  {children}
                </em>
              ),
              del: ({ children }) => (
                <del className="line-through text-gray-400">
                  {children}
                </del>
              ),
              // Images with responsive styling
              img: ({ src, alt, title }) => (
                <img
                  src={src}
                  alt={alt}
                  title={title}
                  className="max-w-full h-auto rounded-lg shadow-lg border border-gray-700 my-4"
                  loading="lazy"
                />
              ),
              // Lists with custom styling
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-300 leading-relaxed">
                  {children}
                </li>
              ),
              // Tables with responsive design
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full border border-gray-700 rounded-lg">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-800">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className="bg-gray-900">
                  {children}
                </tbody>
              ),
              tr: ({ children }) => (
                <tr className="border-b border-gray-700">
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left text-sm font-semibold text-white border-r border-gray-700 last:border-r-0">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 text-sm text-gray-300 border-r border-gray-700 last:border-r-0">
                  {children}
                </td>
              ),
              // Paragraphs with proper spacing
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed text-gray-300">
                  {children}
                </p>
              ),
              // Horizontal rules
              hr: () => (
                <hr className="my-8 border-gray-700" />
              ),
              // Custom styling for code blocks
              code: ({ className, children, ...props }: CodeProps) => {
                // Detect if it's a code block vs inline code
                const isCodeBlock = /language-(\w+)/.test(className || '') || 
                                    String(children).includes('\n');
                
                if (!isCodeBlock) {
                  // Inline code
                  return (
                    <code
                      className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-200"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                
                // Block code
                return (
                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700">
                    <code className={`${className} text-gray-200 font-mono text-sm block whitespace-pre-wrap`} {...props}>
                      {children}
                    </code>
                  </div>
                );
              },
              // Custom styling for blockquotes
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 bg-gray-800/50 rounded-r-lg py-2 my-4">
                  {children}
                </blockquote>
              ),
              // Custom styling for links
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
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
        <footer className="mt-12 pt-6 border-t border-gray-700">
          <Link
            href="/gists"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all gists
          </Link>
        </footer>
      </div>
    </SharedLayout>
  );
}

// Generate static params for all gists
export async function generateStaticParams() {
  const slugs = getGistSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}