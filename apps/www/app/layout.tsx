import "@/app/globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Gabarito } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SidebarProvider } from "@/components/layout/contexts/sidebar";
import { DocsI18nProvider } from "@/components/layout/contexts/i18n";
import { AuraThemeProvider } from "@/components/theme/AuraThemeProvider";
import { AURA_THEME_BOOT_SCRIPT } from "@/lib/aura-theme-boot";
import { siteDescription, siteName, siteOgImage } from "@/utils/site";

const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
});

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    siteName,
    images: [siteOgImage],
  },
  // Images, title and description are inherited per page from `openGraph`.
  twitter: {
    card: "summary_large_image",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={gabarito.variable} suppressHydrationWarning>
      <body className="font-sans flex flex-col min-h-screen">
        <Script id="aura-theme-colors" strategy="beforeInteractive">
          {AURA_THEME_BOOT_SCRIPT}
        </Script>
        <RootProvider search={{ enabled: false }}>
          <AuraThemeProvider>
            <DocsI18nProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </DocsI18nProvider>
          </AuraThemeProvider>
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
