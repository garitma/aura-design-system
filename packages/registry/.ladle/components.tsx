import React from "react";
import type { GlobalProvider } from "@ladle/react";

import "../styles/globals.css";
import { ThemeColorSwitcher } from "../registry/default/components/ThemeColorSwitcher";

export const Provider: GlobalProvider = ({ children }) => (
  <div>
    <ThemeColorSwitcher />
    {children}
  </div>
);
