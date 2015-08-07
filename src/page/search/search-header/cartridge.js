// Components
var searchHeaderMixin = require('./mixin');
var React = require('react');
module.exports = React.createClass({
  mixins: [searchHeaderMixin],
  render() {
      return (
          <div className='cartridge-search' data-focus='cartridge-search'>
            <h1>{this.i18n('search.cartridge.title')}</h1>
            {this._SearchBarComponent()}
          </div>
      );
  }
});
