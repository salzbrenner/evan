const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    appDir: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    // config.module.rules.push({
    //   test: /\.(glsl|vs|fs|vert|frag)$/,
    //   exclude: /node_modules/,
    //   use: ["raw-loader", "glslify-loader"],
    // });
    // config.module.rules.push({
    //   test: /\.mdx?$/,
    //   use: [
    //     {
    //       loader: "@mdx-js/loader",
    //       /** @type {import('@mdx-js/loader').Options} */
    //       options: {},
    //     },
    //   ],
    // });
    return config;
  },
  output: "export", // for static site generation
  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

module.exports = withContentlayer(nextConfig);
