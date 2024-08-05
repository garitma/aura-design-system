import MyComponent from "../../../../../slices/marketing/SectionPoerty";

export default {
  title: "slices/marketing/SectionPoerty",
};

export const _Default = () => (
  <MyComponent
    slice={{
      variation: "default",
      version: "sktwi1xtmkfgx8626",
      items: [{}],
      primary: {
        title: [{ type: "heading1", text: "Finish", spans: [] }],
        description: [
          {
            type: "paragraph",
            text: "Ad ad dolore labore non voluptate in elit eiusmod ut ipsum incididunt. Velit excepteur sunt ex proident non proident tempor anim voluptate laboris. Aute anim ullamco aliquip minim quis reprehenderit culpa deserunt.",
            spans: [],
          },
        ],
        image: {
          dimensions: { width: 4024, height: 4024 },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1607582278043-57198ac8da43",
        },
        caption: [
          {
            type: "paragraph",
            text: "Consequat ea id occaecat consequat dolore dolore ullamco. Incididunt ex non dolor commodo culpa sunt.",
            spans: [],
          },
        ],
        button_label: "suddenly",
        button_link: { link_type: "Web", url: "http://google.com" },
      },
      id: "_Default",
      slice_type: "section_poerty",
    }}
  />
);
_Default.storyName = "";
