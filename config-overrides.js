/* eslint-disable @typescript-eslint/no-var-requires */
const {
    override,
    addWebpackPlugin,
} = require("customize-cra");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const appName = "ToDo";

const IS_PROD = process.env.NODE_ENV !== "development";
//const IS_DEV = process.env.NODE_ENV === "development";

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
    IS_PROD &&
    addWebpackPlugin(
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
        }),
    ),
);
module.exports = { webpack };
