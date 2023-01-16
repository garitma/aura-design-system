import MyComponent from "../../../../../slices/marketing/SectionHeading";

export default {
  title: "slices/marketing/SectionHeading",
};

export const _DefaultSlice = () => (
  <MyComponent
    slice={{
      variation: "default-slice",
      version: "sktwi1xtmkfgx8626",
      items: [{}],
      primary: {
        title: [{ type: "heading1", text: "Ancient", spans: [] }],
        description: [
          {
            type: "paragraph",
            text: "Tempor irure aliquip deserunt mollit laboris amet enim exercitation reprehenderit. Consectetur sit minim cillum occaecat voluptate qui eu aliquip amet et ad exercitation ullamco nostrud mollit.",
            spans: [],
          },
        ],
        color: "green",
        align: "right-text",
      },
      slice_type: "hero_section_split",
      id: "_DefaultSlice",
    }}
  />
);
_DefaultSlice.storyName = "";
