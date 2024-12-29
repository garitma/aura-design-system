import React from "react";
import type { GlobalProvider } from "@ladle/react";

import "../styles/main.css";
import "../styles/global.css";
import "@aura-design/system/main.css";

export const Provider: GlobalProvider = ({ children }) => <div>{children}</div>;
