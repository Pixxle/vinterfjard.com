import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { getAllGists } from '@/lib/gists';

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getPlainTextExcerpt(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '') // code blocks (before backtick stripping)
    .replace(/^#{1,6}\s+/gm, '') // headings
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links -> text
    .replace(/[*_~`>]/g, '') // inline formatting
    .replace(/\n{2,}/g, ' ') // collapse newlines
    .replace(/\n/g, ' ')
    .trim()
    .slice(0, 200);
}

export default function CompactGistList() {
  const gists = getAllGists();

  if (gists.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-base font-medium">Gists</h3>
      <div className="space-y-6">
        {gists.map(gist => {
          const readingTime = getReadingTime(gist.content);
          const excerpt = getPlainTextExcerpt(gist.content);

          return (
            <div key={gist.slug} className="rounded-md border border-gray-700 bg-[#0d1117] p-5">
              <Link
                href={`/gists/${gist.slug}`}
                className="text-lg font-semibold text-[#f78166] hover:underline"
              >
                {gist.title}
              </Link>
              <div className="mt-1 flex items-center gap-1 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <time dateTime={gist.date}>
                  {new Date(gist.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
                <span className="mx-1">&bull;</span>
                <span>{readingTime} min read</span>
              </div>
              {excerpt && <p className="mt-3 text-sm leading-relaxed text-gray-300">{excerpt}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
