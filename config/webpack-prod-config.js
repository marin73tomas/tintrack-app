const HtmlWebpackPlugin = require("html-webpack-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const paths = require("./paths.js");

module.exports = {
    entry: paths.appIndexJs,
    output: {
        filename: 'bundle.js',
        path: paths.appPublic,
        publicPath: "/"
    },
    mode: "production",
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            Popper: 'popper.js',
            jQuery: 'jquery',
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
        }),
        new HtmlWebpackPlugin({
            favicon: paths.appFavIcon,
            template: paths.appTemplate
        }),
        new PrettierPlugin({
            parser: "babel",
            printWidth: 80,             // Specify the length of line that the printer will wrap on.
            tabWidth: 4,                // Specify the number of spaces per indentation-level.
            useTabs: true,              // Indent lines with tabs instead of spaces.
            bracketSpacing: true,
            extensions: [ ".js", ".jsx" ],
            jsxBracketSameLine: true,
            semi: true,                 // Print semicolons at the ends of statements.
            encoding: 'utf-8'
        })
    ],
    module: {
        rules: [
            {
                // look for js, jsx files
                test: /\.(js|jsx)$/,
                // in the src directory
                include: path.resolve(paths.appJavaScripSource),
                // exclude node_modules
                exclude: /(node_modules)/,
                use: [
                    {
                        // babel for transpiling js files
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    },
                    {
                        // eslint for code linting
                        loader: "eslint-loader",
                        options: {
                            enforce: "pre"
                        }
                    }
                ]
            },
            {
                // look for css, scss files
                test: /\.(css|scss)$/,
                // in the src directory
                include: [paths.appStyles, /(node_modules)/],
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]"
                            },
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                // handle image files
                test: /\.(png|svg|jpeg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            },
            {
                // handle font files
                test: /\.woff($|\?)|\.woff2($|\?)\.ttf($|\?)\.eot($|\?)/,
                use: [
                    {
                        loader: "file-loader"
                    }
                ]
            }
        ]
    },
};