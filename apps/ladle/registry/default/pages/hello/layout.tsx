import type { Metadata } from "next";
import "./globals.css";

import LayoutPancake from "@/components/LayoutPancake";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutPancake>{children}</LayoutPancake>
      </body>
    </html>
  );
}
