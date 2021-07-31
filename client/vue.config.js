const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");

const resolve = (...folder) => {
  return path.resolve(__dirname, "src", ...folder);
};

module.exports = {
  filenameHashing: false,
  publicPath: '/login/public',
  pluginOptions: {
    "style-resources-loader": {
      patterns: [resolve("stylesheet/main.scss")],
      preProcessor: "scss",
    },
    lintStyleOnBuild: false,
    stylelint: {},
  },
  configureWebpack: {
    entry: {
      'theme': resolve('stylesheet/theme.ts')
    },
    resolve: {
      alias: {
        components: resolve("components"),
        assets: resolve("assets"),
      },
    },
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new AssetsPlugin({
        filename: "../server/src/assets.json",
        useCompilerPath: false,
      }),
    ],
  },
};
