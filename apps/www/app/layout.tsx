import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { IBM_Plex_Sans } from 'next/font/google';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.className} flex flex-col min-h-screen`}>
        <RootProvider
          theme={{ forcedTheme: "dark" }} // or "light"
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
