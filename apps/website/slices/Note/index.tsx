import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Section from "@/components/ui/Section";

/**
 * Props for `Note`.
 */
export type NoteProps = SliceComponentProps<Content.NoteSlice>;

/**
 * Component for "Note" Slices.
 */
const Note: FC<NoteProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      container="smash"
      className="content"
    >
      <div className="pl-2 border-l-3 border-black-4">
      {isFilled.richText(slice.primary.content) && (
        <PrismicRichText field={slice.primary.content} />
      )}
      </div>
    </Section>
  );
};

export default Note;
