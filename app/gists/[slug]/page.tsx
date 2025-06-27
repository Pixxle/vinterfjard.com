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
              // Custom styling for code blocks
              code: ({ node, inline, className, children, ...props }) => {
                if (inline) {
                  return (
                    <code
                      className="bg-gray-800 px-2 py-1 rounded text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
              // Custom styling for blockquotes
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-300">
                  {children}
                </blockquote>
              ),
              // Custom styling for links
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-400 hover:text-blue-300 hover:underline"
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