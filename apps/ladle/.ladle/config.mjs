/** @type {import('@ladle/react').UserConfig} */

export default {
  outDir: "./build/dist",
  addons: {
    theme: {
      enabled: false,
      defaultState: "light",
    },
  },
  addons: {
    a11y: {
      enabled: true,
    },
  },
};
