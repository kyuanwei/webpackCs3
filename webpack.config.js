	
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('css/index.css');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry:{
		index:__dirname + "/src/js/index.js",
		// more:[__dirname +'/src/js/a.js',__dirname + '/src/js/b.js'],
		v:["jquery"]
	},
	output:{
		path:__dirname + "/assets/",
		filename:"js/[name].js", // 此处的[name]会使打包后的文件名根据入口文件来确定
			// index.js 生产 index.js, jquery 打包成 v.js(new webpack.optimize.CommonsChunkPlugin({})使用) 
		publicPath:"http://192.168.0.100:3333/assets"
	},
	devServer:{
		contentBase:"./",
		host:"192.168.0.100",
		port:"3333",
		hot:true,
		inline:true
	},
	module:{
		loaders:[
			// {
			// 	test:/\.css$/,
			// 	loader:"style-loader!css-loader"
			// },
			{
				test:/\.css$/,
				loader:extractCSS.extract({fallbackLoader:"style-loader",loader:"css-loader"})
			},
			{
				test:/\.less$/,
				loader:"style!css!less"
			},
			{
				test:/\.json$/,
				loader:"json-loader"
			},
			{
				test:/\.png|.jpg|.jpeg$/,
				loader:"file-loader?limit=5000&name=/images/[hash:8].[name].[ext]"
				// loader:"url-loader?limit=5000&name=/images/[hash:8].[name].[ext]"
				// 以上两条语句的作用都是一样的,但file-loader用途更广，一般用file-loader
			},
			{
				test:/\.html$/,
				loader:"html-loader"
			}
		]
	},
	// externals:{
 	//       'jquery':'window.jquery'
	//   },
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.ProvidePlugin({
 	 	//       $: "jquery",
	 	//       jQuery: 'jquery',
	 	//       'window.jQuery': 'jquery',
	 	//       'window.$': 'jquery',
		// }),
		extractCSS,
		new HtmlWebpackPlugin({
			title:"keys",
			filename:"../index.html",
			template:__dirname+"/src/tpl/index.html",
			// inject:"html",
			info:"hello tpll"
		}),
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		}),
		new webpack.ProvidePlugin({
			$:"jquery"  // 引入全局的 jquery 
		}),
		new webpack.optimize.CommonsChunkPlugin({name:"v",filename:"lib/jquery.min.js"}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	names:['c '],
		// })
	],
	
	// externals:{ // cdn 方式引入 jquery
	// 	jquery:"http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"
	// },

		// resolve 选项需要重新学习
	// resolve:{ // 外部资源扩展
	// 	// root: 'E:/excise/extend/' ,   // 外部资源所在的文件夹的绝对路径
	// 	extensions:[' ','.js'],     // 外部资源的文件扩展名
	// 	alias:{
	// 		appAdd:'js/add.js'         // 外部资源别名
	// 	}
	// },

	// watch:true

}