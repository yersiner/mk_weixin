const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");

const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");


exports.loadJavaScript = (path) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.include,
        use: "babel-loader"
      }
    ]
  }
});

exports.generateSourceMaps = (types) => ({
  devtool: types.type,
});

exports.extractBundles = (bundles) => ({
  plugins: bundles.map(
    bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
  ),
});

exports.clean = (path) => ({
  plugins: [new CleanWebpackPlugin([path])],
});


exports.minifyJavaScript = () => ({
  plugins: [new UglifyWebpackPlugin()],
});


//vue 相关处理
const getLoader = (prodFlag, less) => {
  var loaders = [{
    loader: 'css-loader'
  }];
  if(less === 'less') {
    loaders.push({
      loader: 'less-loader'
    })
  }

  if(prodFlag) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
    })
  }else {
    return ['vue-style-loader'].concat(loaders)
  }
}

exports.vueLoader = (prodFlag) => {
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
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: getLoader(prodFlag),
              less: getLoader(prodFlag, 'less'),
              js: 'babel-loader'
            },
            postcss: [require("autoprefixer")()],
            extractCSS: prodFlag
          }
        },
      ],
    },
    plugins: [plugin]
  };
};






