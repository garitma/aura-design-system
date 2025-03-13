import React from "react";
import type { GlobalProvider } from "@ladle/react";

import "../styles/globals.css";

export const Provider: GlobalProvider = ({ children }) => <div>{children}</div>;
