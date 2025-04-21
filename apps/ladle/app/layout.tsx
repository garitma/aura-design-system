import React from "react";

import "@/styles/globals.css";
import Nprogress from "@/components/n-progress";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div>{children}</div>
        <Nprogress />
      </body>
    </html>
  );
}
