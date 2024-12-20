const path = require("path");

function resolvePath(p) {
    return path.resolve(__dirname, p)
}

const config = {
    // These are the entry point of our library. We tell webpack to use the name we assign later, when creating the bundle.
    // We also use the name to filter the second entry point for applying code minification via UglifyJS
    entry: {
        'manifold': ['./src/index.ts']
    },
    // The output defines how and where we want the bundles. The special value `[name]` in `filename` tells Webpack to use the name we defined above.
    // We target a UMD and name it manifold. When including the bundle in the browser it will be accessible at `window.manifold`
    output: {
        path: resolvePath('dist-umd'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'manifold',
        umdNamedDefine: true
    },
    node: {
        net: 'empty'
    },
    // Add resolve for `tsx` and `ts` files, otherwise Webpack would
    // only look for common JavaScript file extension (.js)
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // Activate source maps for the bundles in order to preserve the original
    // source when the user debugs the application
    //devtool: 'source-map',
    optimization: {
        minimize: true
    },
    // Webpack doesn't understand TypeScript files and a loader is needed.
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}

if (process.env.NODE_WEBPACK_LIBRARY_PATH) {
    config.output.path = resolvePath(process.env.NODE_WEBPACK_LIBRARY_PATH);
}

if (process.env.NODE_WEBPACK_LIBRARY_TARGET) {
    config.output.libraryTarget = process.env.NODE_WEBPACK_LIBRARY_TARGET;
}

module.exports = config;
