import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {PrismicRichText} from "@prismicio/react"

import Section from "@/components/ui/Section";

/**
 * Props for `FormsDemo`.
 */
export type FormsDemoProps = SliceComponentProps<Content.FormsDemoSlice>;

/**
 * Component for "FormsDemo" Slices.
 */
const FormsDemo: FC<FormsDemoProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
  
    </Section>
  );
};

export default FormsDemo;
