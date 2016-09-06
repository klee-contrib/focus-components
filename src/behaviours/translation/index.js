import i18next from 'i18next';

const Translation = Component => class TranslatedComponent extends Component {
    constructor(props) {
        super(props);
        this.i18n = i18next.t;
    }
};


export default Translation;
