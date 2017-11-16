const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "[name].bundle.css"
});
process.traceDeprecation = true;
module.exports = {
        context: __dirname,
            entry: {
                main: ['./js/main.js']
        },
    output: {
        filename: '[name].bundle.js',
        publicPath: "/dist/",
        path: __dirname + '/dist'
    },
        module: {
    rules: [
        {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['babel-preset-es2015'].map(require.resolve)
                }
            },
        // {
        //     test: /\.css$/,
        //     use: ExtractTextPlugin.extract({
        //         fallback: "style-loader",
        //         use: "css-loader"
        //     })
        // },
        {
            test: /\.html$/,
            loader: "html-loader"
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        // {
        //     test: /\.scss$/,
        //     loader: extractSass.extract(['css-loader','sass-loader'])
        // },

        { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
        { test: /\.(ttf|eot)$/, loader: 'file-loader' },
    ]
},
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 9000,
        watchContentBase: true,
        watchOptions: {
            poll: true
        },
        historyApiFallback: true,
        historyApiFallback: {
            // rewrites: [
            //     { from: /^\/tacos/, to: '/index.html' },
            // ],
            index: '/index.html',
        },

        // proxy: {
        //     "/tacos/bus": {
        //         target: "http://localhost:9000",
        //         pathRewrite: { '^/tacos': '' },
        //     }
        // },

    },
plugins: [
    // extractSass,
    // new ExtractTextPlugin("main.bundle.css")
],
    externals: {
        foundation: 'Foundation',
        jquery: 'jQuery'
    }
};