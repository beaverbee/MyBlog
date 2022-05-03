/** @type {import('next').NextConfig} */
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  ...withLess(
    withSass({
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
    })
  ),
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;


