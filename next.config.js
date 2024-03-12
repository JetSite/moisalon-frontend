const path = require("path");
const webpack = require("webpack");

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname);
    return config;
  },
};
