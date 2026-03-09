import ReadmeSection from '@/components/readme-section';
import CompactGistList from '@/components/compact-gist-list';
import SharedLayout from '@/components/shared-layout';

export default function Home() {
  return (
    <SharedLayout>
      <ReadmeSection />
      <CompactGistList />
    </SharedLayout>
  );
}
