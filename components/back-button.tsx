'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}
