var path = require('path')
var webpack = require('webpack')

module.exports = {
    // Главный файл
    entry: './src/main.js',
    output: {
        // Упакованный выходной каталог
        path: path.resolve(__dirname, './dist'),
        // Префикс файла ресурса после упаковки
        publicPath: '/dist/',
        filename: 'build.js'
    },
    resolve: {
        // Расширения опускаются при необходимости, например: require ('module') не требует module.js
        extensions: ['', '.js', '.vue'],
        // Псевдонимы
        alias: {
            components: path.join(__dirname, './src/components')
        }
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    // Обрабатывать файлы с разными суффиксами
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'vue-style-loader!css-loader'
        }, {
            test: /\.less$/,
            loader: 'vue-style-loader!css-loader!less-loader'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file',
            query: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    // Конфигурация webpack-dev-server
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    // WebPack SourceMap
    devtool: '#eval-source-map'
}

// ??? Производственная среда, запустите npm, запустите build, чтобы выполнить здесь
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        // ??? Экологическая переменная
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // Сжатый код
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}