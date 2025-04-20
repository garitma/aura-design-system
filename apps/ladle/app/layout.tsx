import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
