import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider/next";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{ forcedTheme: "dark" }} // or "light"
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
