const path = require("path")
const test2 = require("./loaders/test2")
const CopyrightWebapckPlugin = require('./plugins/copyright-webpack-plugins')

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./dist")
    },
    resolveLoader: {
        modules: ["node_modules", './loaders'] //先到node_modules找，找不到就去loaders文件夾下面找
    },
    module: {
        rules: [
            // {
            //     test:/\.js$/,
            //     use:[
            //     {
            //         loader:path.resolve(__dirname,'./loaders/replaceLoaderAsync.js'),
            //         options:{
            //             name:222
            //         }
            //     },
            //     {
            //         loader:path.resolve(__dirname,'./loaders/replaceLoader.js'),
            //         options:{
            //             name:'kkb'
            //         }
            //     }],
            // },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'replaceLoader.js',
                        options: {
                            name: 'kkb'
                        }
                    },
                    {
                        loader: 'replaceLoaderAsync',
                        options: {
                            name: 222
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                use: ['test1', 'test2'],
            },
            {
                test: /\.js$/,
                use: ['test3'],
            },
            // {
            //     test: /\.js$/,
            //     use: ['styleLoader'],
            // }
        ]
    },
    plugins: [
        new CopyrightWebapckPlugin({
            name: "hello"
        })
    ]
}