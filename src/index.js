//Generator http://patorjk.com/software/taag/#p=display&h=1&f=Banner4&t=Focus-COMPONENTS
import './style';

const infos = require(`${__PACKAGE_JSON_PATH__}/package.json`);

import components from './components';
import behaviours from './behaviours';
/**
* Display information data for Focus-COMPONENTS
*/
const infosFn = function infos() {
    console.log(
        `
        FOCUS COMPONENTS

        version: ${infos.version}
        focus-components: ${infos.homepage}
        documentation: ${infos.documentation}
        issues: ${infos.bugs.url}
        `
    );
};
module.exports = {
    VERSION: infos.version,
    AUTHORS: infos.author,
    NAME: infos.name,

    /**
    * Display documentation data
    */
    DOCUMENTATION: function() {
        console.log('documentation: http://kleegroup.github.io/focus-components');
        console.log('components available');
        console.table(infos.components);
        console.log(`repository: ${infos.repository.url}`);
        console.log(`issues: ${infos.bugs.url}`);
    },
    common: require('./common'),
    list: require('./list'),
    search: require('./search'),
    page: require('./page'),
    message: require('./message'),
    application: require('./application'),
    infos: infosFn,
    components,
    behaviours
};
