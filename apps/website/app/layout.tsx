import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import "@/app/globals.css";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Nprogress from "@/components/common/Nprocess";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <div className="page-pancake">
            <Header />
            <div>{children}</div>
            <Footer />
          </div>
          <PrismicPreview repositoryName={repositoryName} />
        </main>
        <Nprogress />
      </body>
    </html>
  );
}
