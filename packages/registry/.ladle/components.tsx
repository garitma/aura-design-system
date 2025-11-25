import React from "react";
import type { GlobalProvider } from "@ladle/react";

import "../styles/globals.css";
import { ThemeColorSwitcher } from "../registry/default/components/ThemeColorSwitcher";

export const Provider: GlobalProvider = ({ children }) => (
  <div>
    <div className="fixed top-1 right-1 z-[9999]">
      <ThemeColorSwitcher />
    </div>
    {children}
  </div>
);
