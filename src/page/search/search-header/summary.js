// Components
import createReactClass from 'create-react-class';
import searchHeaderMixin from './mixin';

export default createReactClass({
    displayName: 'summary',
    mixins: [searchHeaderMixin],

    render() {
        return this._SearchBarComponent();
    }
});