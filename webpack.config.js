const configBuilder = require('webpack-focus').configBuilder;
const customConfig = {
    externals: {
        'focus-core': 'FocusCore',
        react: 'React',
        'react-dom': 'ReactDOM',
        moment: 'moment',
        jquery: 'jQuery',
        numeral: 'numeral',
        'i18next-client': 'i18n'
    },
    module: {
        loaders: [
            {
                test: /material-design-lite\/material.js$/,
                loader: DEV ? 'react-hot!babel!exports?componentHandler' : 'babel!exports?componentHandler',
                include: [
                    path.resolve(process.cwd(), BABELIFIED_PATH)
                ]
            }
        ]
    }
};

module.exports = configBuilder(customConfig);
