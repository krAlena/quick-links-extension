const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")
const WebpackBar = require('webpackbar');

const env = process.env.ENV || 'production';
const isDev = env === 'development';

module.exports = {
    entry: {
        'js/popup': path.resolve(__dirname, './src/popup.js'),
    },
    mode: "production",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceMap: isDev,
                        presets: [['@babel/preset-env', {
                            useBuiltIns: 'usage',
                            corejs: {version: '3.9'}
                        }], '@babel/react'],
                        plugins: [
                            [
                                "@babel/plugin-proposal-decorators",
                                {"decoratorsBeforeExport": true}
                            ],
                            '@babel/plugin-transform-object-rest-spread',
                            '@babel/plugin-transform-class-properties',
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-transform-regenerator',
                            "@babel/plugin-transform-computed-properties",
                        ],
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/, // to match .sass, .scss, and .css files
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      // https://webpack.js.org/loaders/css-loader#importloaders
                      importLoaders: 2,
                    },
                  },
                  "postcss-loader",
                  "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/dist'
                    }
                },
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
              exclude: /node_modules/,
              test: /\.css$/i,
               use: [
                  "style-loader",
                  "css-loader"
               ]
            },
        ],
    },
    plugins: [
        new WebpackBar(),
        new CopyPlugin({
            patterns: [
                {from: path.join(__dirname, `./manifest.json`), to: path.join(__dirname, './dist/manifest.json')},
                {from: path.join(__dirname, `./src/contentScript.js`), to: path.join(__dirname, './dist/contentScript.js')},
                {from: path.join(__dirname, `./src/background.js`), to: path.join(__dirname, './dist/background.js')},
            ]
        }),
        // ...getHtmlPlugins(["popup"]),
    ],
    devServer: {
        index: "index.html",
        port: 8089,
        contentBase: path.join(__dirname, 'dist/'),
        liveReload: true,
        progress: true,
        inline: true,
        hot: true,
        proxy: {}
    },
    resolve: {
        extensions: [".js"],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    output: {
        path: path.join(__dirname, "dist/"),
    },
};

// function getHtmlPlugins(chunks) {
//     return chunks.map(
//         (chunk) =>
//             new HTMLPlugin({
//                 title: "React extension",
//                 filename: `${chunk}.html`,
//                 chunks: [chunk],
//             })
//     );
// }