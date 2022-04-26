const CracoLessPlugin = require("craco-less");
const webpack = require("webpack");
const npmPackage = require("./package.json");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const { execSync } = require("child_process");
const path = require("path");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

// Get the last commit id/log
const gitFetchCommitIdCommand = "git rev-parse HEAD";

// Execute the command
const fetchGitCommitId = () => {
  try {
    return execSync(gitFetchCommitIdCommand).toString().trim();
  } catch (e) {
    console.error(e);
    return "-1";
  }
};

const todayMoment = moment();

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#27AAE1",
              "@success-color": "#0DDA84",
              "@error-color": "#FF3B3B",
              "@text-color": "fade(#000, 100%)",
              "@menu-item-color": "fade(#000, 100%)",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    plugins: {
      add: [
        // new MonacoWebpackPlugin({
        //   // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        //   languages: ['json'],
        // }),
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin({
          "process.env": {
            PACKAGE_VERSION:
              '"' +
              npmPackage.version +
              "-" +
              todayMoment.format("DDMMYYYY") +
              '"',
            BUILD_NUMBER: '"' + uuidv4() + '"',
            BUILD_DATE: '"' + todayMoment.format("LLL") + '"',
            COMMIT_ID: '"' + fetchGitCommitId() + '"',
          },
        }),        
      ],
    },
  },
  // babel: {
  //   plugins: [["babel-plugin-styled-components"]],
  // },
};
