import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProviderClient } from "@/lib/posthog";
import { Analytics } from "@/components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dennis Vinterfjärd Resume",
  description: "A GitHub-inspired resume",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
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
            {children}
          </PostHogProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
