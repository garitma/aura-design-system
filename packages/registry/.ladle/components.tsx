import React from "react";
import type { GlobalProvider } from "@ladle/react";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";
import { ThemeColorSwitcher } from "../registry/default/components/ThemeColorSwitcher";

export const Provider: GlobalProvider = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <div>
      <div className="fixed top-1 right-1 z-[9999]">
        <ThemeColorSwitcher />
      </div>
      {children}
    </div>
  </ThemeProvider>
);
