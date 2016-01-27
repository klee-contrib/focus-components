import {translate} from 'focus-core/translation';

const Translation = Component => class TranslatedComponent extends Component {
    constructor(props) {
        super(props);
        this.i18n = translate;
    }
};


export default Translation;
