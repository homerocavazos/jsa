const path = require("path");

const combinedEntryFiles = () => {

    // Original entry files loaded
    const mainFiles = {
        jsa: "./src/_jsa.js",
    };

    // combine/flatten into One obj
    const entryFiles = { ...mainFiles }
    console.log('Entry Files = ', entryFiles);

    return entryFiles;

};

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    const baseConfig = {
        mode: isProduction ? "production" : "development",
        entry: combinedEntryFiles(),
        resolve: {
            extensions: [".js"],
        },
        devtool: isProduction ? false : "source-map",
        performance: {
            hints: false,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                },
            ],
        },
    };

    // UMD build (for global, CommonJS, AMD)
    const umdConfig = {
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: isProduction ? "[name].umd.min.js" : "[name].umd.js",
            chunkFilename: "[name].js?ver=[chunkhash]",
            publicPath: "/",
            clean: false,
            library: {
                name: ['cba', '[name]'],
                type: 'umd',
            },
        },
    };

    // ES module build (for modern import)
    const esmConfig = {
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: isProduction ? "[name].min.js" : "[name].js",
            chunkFilename: "[name].js?ver=[chunkhash]",
            publicPath: "/",
            clean: false, // Only clean on UMD build to avoid deleting ESM output
            library: {
                type: 'module',
            },
            module: true,
        },
        experiments: {
            outputModule: true,
        },
    };

    return [umdConfig, esmConfig];
};
