import Image from 'next/image';
import Link from 'next/link';
import { getAllGists } from '@/lib/gists';

function getPlainTextExcerpt(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
    .replace(/[*_~`>]/g, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\n/g, ' ')
    .trim()
    .slice(0, 180);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Home() {
  const gists = getAllGists();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-14 pb-20">
      <section className="mb-14">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-full border border-white/10">
            <Image
              src="/avatar.jpg"
              alt="Dennis Vinterfjärd"
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
              Dennis Vinterfjärd
            </h1>
            <p className="text-sm text-zinc-400">Stockholm</p>
          </div>
        </div>

        <p className="max-w-2xl text-lg leading-relaxed text-zinc-100">
          I build engineering cultures, push for technical excellence, and think out loud.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
          Thoughts
        </h2>

        {gists.length === 0 ? (
          <p className="text-zinc-400">No posts yet.</p>
        ) : (
          <div className="divide-y divide-white/10 border-b border-white/10">
            {gists.map(gist => {
              const excerpt = getPlainTextExcerpt(gist.content);

              return (
                <article key={gist.slug} className="py-5">
                  <h3 className="text-xl leading-snug font-medium text-zinc-100">
                    <Link href={`/gists/${gist.slug}`} className="hover:text-zinc-300">
                      {gist.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{formatDate(gist.date)}</p>
                  {excerpt && <p className="mt-3 text-zinc-300">{excerpt}</p>}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="pt-6 text-sm text-zinc-400">
        <p>
          If this resonates, say hi at{' '}
          <a href="mailto:dennis@vinterfjard.com" className="text-zinc-200 hover:text-zinc-100">
            dennis@vinterfjard.com
          </a>{' '}
          or on{' '}
          <a
            href="https://linkedin.com/in/dennis-vinterfjärd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:text-zinc-100"
          >
            LinkedIn
          </a>
          .
        </p>
        <div className="mt-5 flex items-center gap-5 text-zinc-500">
          <Link href="/experience" className="hover:text-zinc-300">
            About
          </Link>
        </div>
      </footer>
    </main>
  );
}
