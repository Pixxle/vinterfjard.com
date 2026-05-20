import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getGistBySlug, getGistSlugs } from '@/lib/gists';

interface GistPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default async function GistPage({ params }: GistPageProps) {
  const { slug } = await params;
  const gist = getGistBySlug(slug);

  if (!gist) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-14">
      <nav className="mb-10 flex items-center gap-5 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          Writings Home
        </Link>
      </nav>

      <header className="mb-10 border-b border-white/10 pb-8">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-100">{gist.title}</h1>
        <p className="mt-3 text-sm text-zinc-500">{formatDate(gist.date)}</p>
      </header>

      <article className="prose prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h2 className="mt-10 mb-4 text-3xl font-semibold leading-snug text-zinc-100">{children}</h2>
            ),
            h2: ({ children }) => (
              <h2 className="mt-10 mb-4 text-2xl font-semibold leading-snug text-zinc-100">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-8 mb-3 text-xl font-semibold leading-snug text-zinc-100">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="mt-6 mb-3 text-lg font-semibold leading-snug text-zinc-100">{children}</h4>
            ),
            p: ({ children }) => <p className="mb-5 leading-relaxed text-zinc-300">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold text-zinc-100">{children}</strong>,
            em: ({ children }) => <em className="italic text-zinc-300">{children}</em>,
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-zinc-100 underline decoration-zinc-500 underline-offset-4 hover:decoration-zinc-200"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="mb-5 list-disc space-y-2 pl-6 text-zinc-300 marker:text-zinc-500">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-5 list-decimal space-y-2 pl-6 text-zinc-300 marker:text-zinc-500">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="my-6 border-l-2 border-white/20 pl-4 italic text-zinc-300">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="my-10 border-white/10" />,
            code: ({ className, children, ...props }: CodeProps) => {
              const isCodeBlock =
                /language-(\w+)/.test(className || '') || String(children).includes('\n');

              if (!isCodeBlock) {
                return (
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-zinc-100" {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <div className="my-6 overflow-x-auto rounded-md border border-white/10 bg-[#0d1117] p-4">
                  <code
                    className={`${className} block text-sm leading-relaxed whitespace-pre-wrap text-zinc-200`}
                    {...props}
                  >
                    {children}
                  </code>
                </div>
              );
            },
            img: ({ src, alt, title }) => (
              <img
                src={src}
                alt={alt}
                title={title}
                className="my-6 h-auto max-w-full rounded-md border border-white/10"
                loading="lazy"
              />
            ),
          }}
        >
          {gist.content}
        </ReactMarkdown>
      </article>

      <footer className="mt-14 border-t border-white/10 pt-6 text-sm text-zinc-500">
        <div className="flex items-center gap-5">
          <Link href="/" className="hover:text-zinc-300">
            Writings Home
          </Link>
        </div>
      </footer>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = getGistSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}
