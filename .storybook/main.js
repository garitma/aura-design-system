module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  typescript: {
    reactDocgen: false,
  },
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
};
