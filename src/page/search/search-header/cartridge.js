import {translate} from 'focus-core/translation';
var React = require('react');
var searchHeaderMixin = require('./mixin');
module.exports = React.createClass({
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
