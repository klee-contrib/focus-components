import {translate} from 'focus-core/translation';
let React = require('react');
let searchHeaderMixin = require('./mixin');

export default React.createClass({
    mixins: [searchHeaderMixin],
    render() {
        return (
            <div className='cartridge-search' data-focus='cartridge-search'>
                <h1>{translate('search.cartridge.title')}</h1>
                {this._SearchBarComponent()}
            </div>
        );
    }
});
