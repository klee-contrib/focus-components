import {t} from 'i18next';

const Translation = Component => class TranslatedComponent extends Component {
    constructor() {
        super();
        this.i18n = t;
    }
};

export default Translation;
