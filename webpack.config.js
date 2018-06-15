'use strict';

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "public/app.jsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react"]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: path.join(__dirname, "/"),
        compress: true
    },
    devtool: "source-map"
};