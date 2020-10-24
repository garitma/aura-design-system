import React from "react";

import { Image } from "../src";
import "../stylus/style.css";

export default {
  title: "Atoms/Image",
  component: Image
};

const Template = args => <Image {...args} />;

export const defaultImage = Template.bind({});

defaultImage.args = {
  src:
    "https://images.prismic.io/garitma/5881fad5f6db536e6ed7e4ae980f05c92504d8d0_huele-a-deseo.jpg?auto=compress,format"
};

export const withPlaceholder = Template.bind({});

withPlaceholder.args = {
  src:
    "https://images.prismic.io/garitma/5881fad5f6db536e6ed7e4ae980f05c92504d8d0_huele-a-deseo.jpg?auto=compress,format",
  placeholder:
    "https://images.prismic.io/garitma/5881fad5f6db536e6ed7e4ae980f05c92504d8d0_huele-a-deseo.jpg?auto=compress,format&w=10",
};
