/**
 * @returns {import('next').NextConfig}
 */
module.exports = async () => {
  return {
    output: "standalone",
    reactStrictMode: true,
  };
};
