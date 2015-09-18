import {t} from 'i18next';

const Translation = Component => class TranslatedComponent extends Component {
    constructor(props) {
        super(props);
        this.i18n = t;
    }
};


export default Translation;
