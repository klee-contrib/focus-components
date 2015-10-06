const prodConfBuilder = require('webpack-focus').productionConfig;
const focusComponentsConf = require('./webpack.config.dev');
focusComponentsConf.externals = {
    'focus-core': 'FocusCore',
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment',
    jquery: 'jQuery',
    backbone: 'Backbone',
    numeral: 'numeral',
    'i18next-client': 'i18n'
};
const prodConf = prodConfBuilder(focusComponentsConf);
module.exports = prodConf;
