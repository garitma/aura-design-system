import React from "react";

import { Image } from "../src";
import "../css/style.css";

export default {
  title: "Atoms/Image",
  component: Image
};

const Template = args => <Image {...args} />;

export const Naked = Template.bind({});

Naked.args = {
    src: "http://via.placeholder.com/1140x570"
};