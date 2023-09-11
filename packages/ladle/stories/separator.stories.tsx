import React from "react";

import Section from "../../components/section";
import Separator from "../../components/separator";

export const Horizontal = () => (
  <Section>
    <Separator />
  </Section>
);

export const Vertical = () => (
  <Section container="smish">
    <ul className="nav-list">
      <li>Blog</li>
      <li>
        <Separator isVertical />
      </li>
      <li>Docs</li>
    </ul>
  </Section>
);
