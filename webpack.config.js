const TerserPlugin = require('terser-webpack-plugin');

module.exports = (options) => {
  return {
    ...options,
    externals: [],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ],
    },
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
  };
};
