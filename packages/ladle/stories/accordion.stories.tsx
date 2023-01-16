import React from "react";
import Accordion from "../../components/accordion";

export const WithContent = () => (
  <Accordion title="Accordion title">
    <p>Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.</p>
  </Accordion>
);

export const WithHeaderSize = () => (
  <Accordion title="Accordion title" headerSize="h3">
    <p>Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.</p>
  </Accordion>
);

export const WithColor = () => (
  <Accordion title="Accordion title" color="teal-green">
    <p> Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.</p>
  </Accordion>
);
