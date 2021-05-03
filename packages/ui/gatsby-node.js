const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    plugins: [new NodePolyfillPlugin()],
  });
};
