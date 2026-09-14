import "@/app/globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { IBM_Plex_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SidebarProvider } from "@/components/layout/contexts/sidebar";
import { DocsI18nProvider } from "@/components/layout/contexts/i18n";
import { siteDescription, siteName, siteOgImage } from "@/utils/site";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.className} flex flex-col min-h-screen`}>
        <RootProvider search={{ enabled: false }}>
          <DocsI18nProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </DocsI18nProvider>
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
