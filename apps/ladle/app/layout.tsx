import React from "react";
import Link from "next/link";

import "@/styles/globals.css"
import Nprogress from "@/components/n-progress";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Link href="/fo">Holi</Link>
        <div>{children}</div>
        <Nprogress />
      </body>
    </html>
  );
}
