import Link from 'next/link';
import WorkExperienceSection from '@/components/work-experience-section';
import ContributionGraph from '@/components/contribution-graph';
import { getUserContributions } from '@/lib/github';
import { GITHUB_USERNAME } from '@/lib/env';

// Temporary toggle: set to `true` to show contributions again.
const SHOW_CONTRIBUTIONS = false;

interface ContributionsData {
  totalContributions: number;
  weeks: Array<{
    contributionDays: Array<{
      date: string;
      contributionCount: number;
      contributionLevel: string;
    }>;
  }>;
}

const defaultContributions: ContributionsData = {
  totalContributions: 0,
  weeks: [],
};

export default async function ExperiencePage() {
  const contributions = SHOW_CONTRIBUTIONS
    ? await getUserContributions(GITHUB_USERNAME).catch(error => {
        console.error('Error fetching GitHub contributions data:', error);
        return null;
      })
    : null;

  const safeContributions = contributions || defaultContributions;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-14">
      <section className="mb-14">
        <h1 className="mb-3 text-2xl font-semibold tracking-tight text-zinc-100">Background</h1>
      </section>

      <WorkExperienceSection />

      {SHOW_CONTRIBUTIONS && (
        <section className="mb-14">
          <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
            Contributions
          </h2>
          <div className="mb-3 text-sm text-zinc-400">
            {safeContributions.totalContributions} contributions in the last 12 months
          </div>
          <div className="border-y border-white/10 py-4">
            <ContributionGraph contributions={safeContributions} minimal />
          </div>
        </section>
      )}

      <footer className="mt-14 pt-6 text-sm text-zinc-400">
        <div className="flex items-center gap-5 text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">
            Writings
          </Link>
        </div>
      </footer>
    </main>
  );
}
