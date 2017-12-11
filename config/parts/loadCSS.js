const ExtractTextPlugin = require("extract-text-webpack-plugin");

const OptimizeCSSAssetsPlugin = require(
  "optimize-css-assets-webpack-plugin"
);

const cssnano = require("cssnano");

exports.minifyCSS = (op) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: op.options,
      canPrint: false,
    }),
  ],
});

exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
          test: /\.less$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader", options: {
                  sourceMap: true
              }
          }, {
              loader: "less-loader", options: {
                  sourceMap: true
              }
          }]
      }
    ],
  },
});

exports.ExtractCSS =  (option) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    // `allChunks` is needed with CommonsChunkPlugin to extract
    // from extracted chunks as well.
    allChunks: true,
    filename: "css/[name].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: plugin.extract({
            use: option.use,
            publicPath: '/',
            fallback: "style-loader",
          }),
        },{
          test: /\.less/,
          use: plugin.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }],
            publicPath: '/',
            fallback: "style-loader",
          }),
        }
      ],
    },
    plugins: [plugin]
  };
};

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});

