import React from "react";
import type { GlobalProvider } from "@ladle/react";
import { Toaster, toast } from "sonner";

import "../styles/globals.css";

export const Provider: GlobalProvider = ({ children }) => (
  <div>
    {" "}
    <Toaster position="top-center" richColors/>
    {children}
  </div>
);
