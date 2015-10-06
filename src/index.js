//Generator http://patorjk.com/software/taag/#p=display&h=1&f=Banner4&t=Focus-COMPONENTS
const infos = require('../package.json');
import './style';
import components from './components';
/**
* Display information data for Focus-COMPONENTS
*/
const infosFn = function infos(){
    console.log(
        `
        _____   _____   _____   _   _   _____        _____   _____       ___  ___   _____   _____   __   _   _____   __   _   _____   _____
        |  ___| /  _  \\ /  ___| | | | | /  ___/      /  ___| /  _  \\     /   |/   | |  _  \\ /  _  \\ |  \\ | | | ____| |  \\ | | |_   _| /  ___/
        | |__   | | | | | |     | | | | | |___       | |     | | | |    / /|   /| | | |_| | | | | | |   \| |  | |__   |   \\| |   | |   | |___
        |  __|  | | | | | |     | | | | \\___  \\      | |     | | | |   / / |__/ | | |  ___/ | | | | | |\\   | |  __|  | |\\   |   | |   \\___  \\
        | |     | |_| | | |___  | |_| |  ___| |      | |___  | |_| |  / /       | | | |     | |_| | | | \\  | | |___  | | \\  |   | |    ___| |
        |_|     \\_____/ \\_____| \\_____/ /_____/      \\_____| \\_____/ /_/        |_| |_|     \\_____/ |_|  \\_| |_____| |_|  \\_|   |_|   /_____/

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
    DOCUMENTATION: function(){
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
    components
};
