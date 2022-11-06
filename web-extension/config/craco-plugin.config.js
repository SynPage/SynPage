const path = require('path')

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            return {
                ...webpackConfig,
                entry: {
                    main: './src/chrome-plugin/popover',
                    content: './src/chrome-plugin/contentScript/',
                    background: './src/chrome-plugin/backgroundScript/'
                },
                output: {
                    ...webpackConfig.output,
                    path: path.resolve("chrome"),
                    filename: '[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                }
            }
        },
    }
}
