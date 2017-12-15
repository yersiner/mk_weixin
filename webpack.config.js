const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PartsCSS = require("./config/parts/loadCSS.js");
const devServer = require("./config/parts/devServer.js");
const PartsImage = require("./config/parts/loadImage.js");
const PartsJs = require("./config/parts/loadJavaScript.js");


const PATHS = {
	app: path.join(__dirname, "mkApp"), //入口文件地址
	build: path.join(__dirname, "public", "mkpublic") //导出文件地址
};

const isVendor = function(module) {
	//chunk模块 自动导入所需要依赖的模块
    return /node_modules/.test(module.resource);
}

const merge = require("webpack-merge");


const commonConfig = merge([{
		// Entries have to resolve to files! They rely on Node
		// convention by default so if a directory contains *index.js*,
		// it resolves to that.
		//disableHostCheck: true,
		entry: {
			app: [PATHS.app],
		},
		output: {
			path: PATHS.build,
			chunkFilename: '[name].[hash].bundle.js',
			//publicPath: '/mkpublic/',
			filename: "[name].[hash].js",
		},
		resolve: {
			alias:{
			    '~': path.resolve(__dirname),
			    'vue$': 'vue/dist/vue.esm.js'
			},
			extensions: ['.js', '.css', '.vue']
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './index.html'
			}),
			//性能优化
			new webpack.WatchIgnorePlugin([
				path.join(__dirname, "node_modules")
			])

		]
	},
	PartsImage.loadFonts({
		options: {
			name: "[name].[ext]",
		}
	}),
	PartsJs.loadJavaScript({ include: PATHS.app }),

]);


//const productionConfig = () => commonConfig;  //生产文件配置
const productionConfig = merge([
	{
	    //entry: {
	    //  vendor: ["vue"],
	    //},
	    
	},
	{
	    performance: {
	      hints: "warning", // "error" or false are valid too
	      maxEntrypointSize: 800000, // in bytes, default 250k
	      maxAssetSize: 1200000, // in bytes
	    },
	},
	PartsJs.extractBundles([
        {
          name: "vendor",
		//使chunk模块 自动导入所需要依赖的模块，不用进行多余的配置
          minChunks: (module, count) => isVendor(module)
        }
    ]),
	PartsCSS.ExtractCSS({
		use: ["css-loader", PartsCSS.autoprefix()]
	}),
	PartsJs.generateSourceMaps({ type: "source-map" }),
	PartsImage.loadImages({
		options: {
			limit: 15000,
			name: "images/[name].[ext]"
		}
	}),
	//PartsJs.clean('build/*.*')
	PartsJs.minifyJavaScript(),
	PartsJs.vueLoader(true),
	PartsCSS.minifyCSS({
	    options: {
	      discardComments: {
	        removeAll: true,
	      },
	      // Run cssnano in safe mode to avoid
	      // potentially unsafe transformations.
	      safe: true,
	    }
	})
]);
const developmentConfig = merge([ //开发文件配置
	devServer({
		host: process.env.HOST, // 默认 to `localhost`
		port: process.env.PORT, // 默认 to 8080
	}),
	PartsJs.generateSourceMaps({ type: "eval-source-map" }),
	PartsCSS.loadCSS(),
	PartsImage.loadImages(),
	PartsJs.vueLoader(false)
])

const vuxLoader = require('vux-loader')

module.exports = env => {
	process.env.BABEL_ENV = env;
	if (env === "production") {
		return merge(commonConfig, productionConfig);
	}
	return merge(commonConfig, developmentConfig);
}