const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  target: "serverless",
  images: {
    loader: "imgix",
    path: "",
    deviceSizes: [320, 420, 768, 1024, 1200],
  },
});
