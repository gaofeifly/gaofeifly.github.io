const path = require('path');

module.exports = {
	mode: 'production',
	entry:'./src/index.js',
	output:{
		filename:'main.js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				query:{presets:['es2015']}
			},
			{
				test:/\.san$/,
				use:[
					'san-loader'
				]
			}
		]
	}
};