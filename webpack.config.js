const configBuilder = require('webpack-focus').configBuilder;
const path = require('path');

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
        preLoaders: [
            {
                test: /material-design-lite\/material/,
                loader: 'exports?componentHandler'
            }
        ]
    }
};
module.exports = configBuilder(customConfig);
