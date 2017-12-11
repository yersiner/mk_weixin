exports.loadImages = (op) => {
  var op = op || {}
  return {
    module: {
      rules: [{
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: "url-loader",
          options: op.options
        }
      }]
    }
  }
};

exports.loadFonts = (op) => {
  var op = op || {}
  return {
    module: {
      rules: [{
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "file-loader",
          options: op.options
        }
      }]
    }
  }
};