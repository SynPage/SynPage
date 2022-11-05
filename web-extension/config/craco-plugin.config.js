module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            return {
                ...webpackConfig,
                entry: {
                    content: './src/chrome-plugin/contentScript/',
                    background: './src/chrome-plugin/backgroundScript/'
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'chrome/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                }
            }
        },
    }
}
