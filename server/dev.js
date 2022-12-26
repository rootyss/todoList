module.exports.plugin = (config) => {
  const FULL_BACKEND_URL = process.env.FULL_BACKEND_URL;

  const port = process.env.PORT;

  config.historyApiFallback = true;

  config.proxy = {
    "/api": {
      target: FULL_BACKEND_URL ?? `http://localhost:${port}`,
    },
  };

  return config;
};
