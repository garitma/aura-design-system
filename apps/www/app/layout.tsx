import "@/app/globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { IBM_Plex_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aura Design System",
  description:
    "A collection of components built from our team's experience, distributed using the 'shadcn mode'. Built for our team, but you can use it too.",
  openGraph: {
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Aura Design System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph.png"],
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.className} flex flex-col min-h-screen`}>
        <RootProvider search={{ enabled: false }}>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
