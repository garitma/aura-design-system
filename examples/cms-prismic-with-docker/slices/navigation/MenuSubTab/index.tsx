import React from "react";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

type SectionGridCardsSlice = SliceComponentProps<Content.MenuTabDocumentDataSlicesSlice>;

const MenuSubTab = ({ slice }:SectionGridCardsSlice) => (
  <section>
    <p>
      This is a navigation slice, it's not meant to be used in Slice Simulator.
    </p>
    <p>
      You can edit it directly in the Navigation components in /components
      folder.
    </p>
    <p>You can add a custom screenshot to help content editors.</p>
  </section>
);

export default MenuSubTab;
