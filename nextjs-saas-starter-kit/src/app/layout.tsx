import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { ConditionalLayout } from "@/components/layout/conditional-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SaaS Starter Kit",
  description:
    "A comprehensive SaaS starter kit with subscription management, billing, and admin dashboard.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "SaaS",
    "Stripe",
    "Prisma",
    "Tailwind CSS",
    "shadcn/ui",
  ],
  authors: [{ name: "bennbatuu.com" }],
  creator: "bennbatuu.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextjs-saas-starter-kit.bennbatuu.com",
    title: "SaaS Starter Kit",
    description:
      "A comprehensive SaaS starter kit with subscription management, billing, and admin dashboard.",
    siteName: "SaaS Starter Kit",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Starter Kit",
    description:
      "A comprehensive SaaS starter kit with subscription management, billing, and admin dashboard.",
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
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider defaultTheme="system">
          <AuthProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
