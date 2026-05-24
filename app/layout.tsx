import type React from 'react';
import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { PostHogProviderClient } from '@/lib/posthog';
import { Analytics } from '@/components/analytics';

const inter = Inter({ subsets: ['latin'] });

const waveEmojiIcon =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👋</text></svg>',
  );

export const metadata = {
  title: '👋',
  description: 'A GitHub-inspired resume',
  icons: {
    icon: waveEmojiIcon,
    shortcut: waveEmojiIcon,
    apple: waveEmojiIcon,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PostHogProviderClient>
            <Analytics />
            <div className="min-h-screen bg-[#0d1117] text-white">
              <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
            </div>
          </PostHogProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
