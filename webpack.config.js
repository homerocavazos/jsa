const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// JS entry for UMD/ESM
const jsEntry = { jsa: "./src/_jsa.js" };

// CSS-only entry
const cssEntry = {
	'jsa-themes': "./src/scss/jsa.themes.scss",
	'jsa-demo': "./src/scss/jsa.demo.scss"
};

module.exports = (env, argv) => {
	const isProduction = argv.mode === "production";

	const baseConfig = {
		mode: isProduction ? "production" : "development",
		resolve: {
			extensions: [".js", ".scss"],
		},
		devtool: isProduction ? false : "source-map",
		performance: {
			hints: false,
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass'),
								sassOptions: {
									includePaths: [path.resolve(__dirname, 'src/scss')],
									outputStyle: 'compressed',
								},
							},
						}
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].min.css',
			}),
		],
	};

	// UMD build (for global, CommonJS, AMD)
	const umdConfig = {
		...baseConfig,
		entry: jsEntry,
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: isProduction ? "[name].umd.min.js" : "[name].umd.js",
			chunkFilename: "[name].js?ver=[chunkhash]",
			publicPath: "/",
			clean: true,
			library: {
				name: ['cba', '[name]'],
				type: 'umd',
			},
		},
	};

	// ES module build (for modern import)
	const esmConfig = {
		...baseConfig,
		entry: jsEntry,
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: isProduction ? "[name].min.js" : "[name].js",
			chunkFilename: "[name].js?ver=[chunkhash]",
			publicPath: "/",
			clean: true, // Only clean on UMD build to avoid deleting ESM output
			library: {
				type: 'module',
			},
			module: true,
		},
		experiments: {
			outputModule: true,
		},
	};

	// CSS-only build
	const cssConfig = {
		...baseConfig,
		entry: cssEntry,
		output: {
			path: path.resolve(__dirname, "dist"),
			publicPath: "/",
			clean: false,
		},
		// Only emit CSS, not JS
		optimization: {
			emitOnErrors: false,
		},
		// ...existing code...
	};

	return [umdConfig, esmConfig, cssConfig];
};
