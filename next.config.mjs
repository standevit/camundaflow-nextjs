/** @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true
};

export default nextConfig;
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.html$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;

