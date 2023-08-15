const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
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
    return config;
  },
  output: "export", // for static site generation
  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

module.exports = withContentlayer(nextConfig);
