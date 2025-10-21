import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { loadSettings } from "@/lib/settings";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = loadSettings();
    return {
      title: settings.general.siteName || "Dev Portfolio CMS",
      description: settings.general.siteDescription || "Headless JSON CMS for Portfolio Management",
      icons: settings.general.favicon ? {
        icon: settings.general.favicon,
        shortcut: settings.general.favicon,
        apple: settings.general.favicon,
      } : {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
      },
    };
  } catch (error) {
    console.error("Error loading settings for metadata:", error);
    return {
      title: "Dev Portfolio CMS",
      description: "Headless JSON CMS for Portfolio Management",
      icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          defaultTheme="system"
          storageKey="dev-portfolio-cms-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
