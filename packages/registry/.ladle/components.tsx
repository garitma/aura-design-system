import React from "react";
import type { GlobalProvider } from "@ladle/react";

import "../src/globals.css";

export const Provider: GlobalProvider = ({ children }) => <div>{children}</div>;
