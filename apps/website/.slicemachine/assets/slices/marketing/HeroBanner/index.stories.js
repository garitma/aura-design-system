import MyComponent from "../../../../../slices/marketing/HeroBanner";

export default {
  title: "slices/marketing/HeroBanner",
};

export const _Default = () => (
  <MyComponent
    slice={{
      variation: "default",
      version: "sktwi1xtmkfgx8626",
      items: [{}],
      primary: {
        title: [{ type: "heading1", text: "Strike", spans: [] }],
        description: [
          {
            type: "paragraph",
            text: "Laborum ullamco laborum ut elit nulla enim. Enim dolore velit ex ex. Minim ullamco aliqua Lorem magna cillum tempor aliquip dolore minim enim.",
            spans: [],
          },
        ],
        image: {
          dimensions: { width: 3456, height: 4320 },
          alt: null,
          copyright: null,
          url: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a",
        },
        button_label: "funny",
        button_link: { link_type: "Web", url: "https://slicemachine.dev" },
      },
      id: "_Default",
      slice_type: "hero_banner",
    }}
  />
);
_Default.storyName = "";
