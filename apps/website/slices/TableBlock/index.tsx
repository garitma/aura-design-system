import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicTable } from "@prismicio/react";

import Section from "@/components/ui/Section";
import ScrollArea from "@/components/ui/ScrollArea";

/**
 * Props for `TableBlock`.
 */
export type TableBlockProps = SliceComponentProps<Content.TableBlockSlice>;

/**
 * Component for "TableBlock" Slices.
 */
const TableBlock: FC<TableBlockProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      container="smash"
      className="content"
    >
      {isFilled.table(slice.primary.content) && (
        <ScrollArea rootProps={{ className: "w-full border-1 border-black-3 rounded-1 overflow-hidden" }}>
          <PrismicTable field={slice.primary.content} />
        </ScrollArea>
      )}
    </Section>
  );
};

export default TableBlock;
