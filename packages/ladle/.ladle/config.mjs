export default {
  appendToHead:
    `<link rel="canonical" href="https://ladle.auradesignsystem.com/">
    <!-- Fathom - beautiful, simple website analytics -->
    <script src="https://cdn.usefathom.com/script.js" data-spa="auto" data-site="JULYXFEP" defer></script>
    <!-- / Fathom -->
    `,
  outDir: "./build/dist",
  addons: {
    theme: {
      enabled: false,
      defaultState: "light",
    },
  },
};
