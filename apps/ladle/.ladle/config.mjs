/** @type {import('@ladle/react').UserConfig} */

export default {
  defaultStory: "aa--welcome",
  appendToHead:
    '<link rel="canonical" href="https://ladle.auradesignsystem.com/">',
  outDir: "./build/dist",
  addons: {
    theme: {
      enabled: false,
      defaultState: "light",
    },
    
  },
};
