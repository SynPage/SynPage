module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [env === 'development' &&
                        require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs].filter(Boolean),
                    content: './src/chrome-plugin/contentScript/',
                    background: './src/chrome-plugin/backgroundScript/'
                },
                output: {
                    ...webpackConfig.output,
                    filename: (pathData) => {
                        return pathData.chunk.name === 'main' ? 'static/js/[name].js' : 'chrome/[name].js';
                    },
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                }
            }
        },
    }
}
