const configBuilder = require('webpack-focus').configBuilder;
const customConfig = {
    externals: {
        'focus-core': 'FocusCore',
        react: 'React',
        'react-dom': 'ReactDOM',
        moment: 'moment',
        jquery: 'jQuery',
        backbone: 'Backbone',
        numeral: 'numeral',
        'i18next-client': 'i18n'
    }
};

module.exports = configBuilder(customConfig);
