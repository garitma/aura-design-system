import React from "react";
import Accordion from "../molecules/accordion";

export const WithContent = () => (
  <Accordion title="Accordion title">
    Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.
  </Accordion>
);

export const WithHeaderSize = () => (
  <Accordion title="Accordion title" headerSize="h3">
    Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.
  </Accordion>
);
