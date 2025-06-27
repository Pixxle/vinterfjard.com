import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProviderClient } from "@/lib/posthog";
import { Analytics } from "@/components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "👋",
  description: "A GitHub-inspired resume",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PostHogProviderClient>
            <Analytics />
            <div className="min-h-screen bg-[#0d1117] text-white">
              <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
            </div>
          </PostHogProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
