import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS Starter Kit",
  description:
    "A modern, production-ready Next.js 15 starter kit with premium design, smooth animations, and enterprise-grade features.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Framer Motion",
  ],
  authors: [{ name: "bennbatuu.com" }],
  creator: "bennbatuu.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextjs-starter-kit.bennbatuu.com",
    title: "NextJS Starter Kit",
    description:
      "A modern, production-ready Next.js 15 starter kit with premium design, smooth animations, and enterprise-grade features.",
    siteName: "NextJS Starter Kit",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextJS Starter Kit",
    description:
      "A modern, production-ready Next.js 15 starter kit with premium design, smooth animations, and enterprise-grade features.",
    creator: "@bennbatuu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system">
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
