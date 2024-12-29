import React from "react";

import Section from "@aura-design/system/section";
import Separator from "@aura-design/system/separator";

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
