//Generator http://patorjk.com/software/taag/#p=display&h=1&f=Banner4&t=Focus-COMPONENTS
'use strict';

var infos = require('../package.json');

/**
* Display information data for Focus-COMPONENTS
*/
var infosFn = function infos() {
    console.log('\n        _____   _____   _____   _   _   _____        _____   _____       ___  ___   _____   _____   __   _   _____   __   _   _____   _____\n        |  ___| /  _  \\ /  ___| | | | | /  ___/      /  ___| /  _  \\     /   |/   | |  _  \\ /  _  \\ |  \\ | | | ____| |  \\ | | |_   _| /  ___/\n        | |__   | | | | | |     | | | | | |___       | |     | | | |    / /|   /| | | |_| | | | | | |   | |  | |__   |   \\| |   | |   | |___\n        |  __|  | | | | | |     | | | | \\___  \\      | |     | | | |   / / |__/ | | |  ___/ | | | | | |\\   | |  __|  | |\\   |   | |   \\___  \\\n        | |     | |_| | | |___  | |_| |  ___| |      | |___  | |_| |  / /       | | | |     | |_| | | | \\  | | |___  | | \\  |   | |    ___| |\n        |_|     \\_____/ \\_____| \\_____/ /_____/      \\_____| \\_____/ /_/        |_| |_|     \\_____/ |_|  \\_| |_____| |_|  \\_|   |_|   /_____/\n\n        version: ' + infos.version + '\n        focus-components: ' + infos.homepage + '\n        documentation: ' + infos.documentation + '\n        issues: ' + infos.bugs.url + '\n        ');
};

module.exports = {
    VERSION: infos.version,
    AUTHORS: infos.author,
    NAME: infos.name,

    /**
     * Display documentation data
     */
    DOCUMENTATION: function DOCUMENTATION() {
        console.log('documentation: http://kleegroup.github.io/focus-components');
        console.log('components available');
        console.table(infos.components);
        console.log('repository: ' + infos.repository.url);
        console.log('issues: ' + infos.bugs.url);
    },
    common: require('./common'),
    list: require('./list'),
    search: require('./search'),
    page: require('./page'),
    message: require('./message'),
    application: require('./application'),
    infos: infosFn
};