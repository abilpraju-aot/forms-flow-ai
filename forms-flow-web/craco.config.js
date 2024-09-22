const SingleSpaAppcracoPlugin = require("craco-plugin-single-spa-app-aot");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const shouldMinimize = process.env.NODE_ENV === "production";

const singleSpaAppPlugin = {
  plugin: SingleSpaAppcracoPlugin,
  options: {
    orgName: "formsflow",
    projectName: "formsflow-web",
    entry: "src/single-spa-index.js",
    orgPackagesAsExternal: true,
    reactPackagesAsExternal: true,
    minimize: shouldMinimize,
    outputFilename: "forms-flow-web.js",
  },
};

module.exports = {
  plugins: [singleSpaAppPlugin],
  webpack: {
    plugins: [
      new NodePolyfillPlugin(), // Apply the NodePolyfillPlugin here
    ],
  },
  devServer: {
    port: 3004,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
