import React from "react";
import type { GlobalProvider } from "@ladle/react";

import WithIcon from "../../hoc/with-icons";
import "../../static/ladle-styles.css"
import "../../style.css"

export const Provider: GlobalProvider = ({ children }) => (
  <WithIcon>
    {children}
  </WithIcon>
);