const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./index.ts",
  mode: NODE_ENV,
  target: "node",
  watch: NODE_ENV === "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ["yarn start:backend"],
        blocking: false,
        parallel: true,
      },
    }),
  ],
};
