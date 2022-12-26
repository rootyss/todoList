/* eslint-disable @typescript-eslint/no-var-requires */
const {
  override,
  addWebpackPlugin,
  overrideDevServer,
} = require("customize-cra");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const appName = "ToDo";

const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";

const webpack = override(
  (config) => {
    config.resolve.fallback = {
      path: require.resolve("path-browserify"),
    };

    config.ignoreWarnings = [
      function ignoreSourcemapsloaderWarnings(warning) {
        return (
          warning.module?.resource?.includes("node_modules") &&
          warning.details?.includes("source-map-loader")
        );
      },
    ];

    return config;
  },
  addWebpackPlugin(
    new FaviconsWebpackPlugin({
      logo: "./src/appInfo/logo.svg",
      cache: true,
      favicons: {
        appName,
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          favicons: true,
          windows: false,
          yandex: true,
        },
      },
    }),
  ),
  environment === "production" &&
    addWebpackPlugin(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
      }),
    ),
);

const devServer =
  environment === "development"
    ? overrideDevServer(require("./server/dev").plugin)
    : undefined;

module.exports = { webpack, devServer };
