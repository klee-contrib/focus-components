// Components
'use strict';

var searchHeaderMixin = require('./mixin');
var React = require('react');
module.exports = React.createClass({
  displayName: 'exports',

  mixins: [searchHeaderMixin],
  render: function render() {
    return React.createElement(
      'div',
      { className: 'cartridge-search', 'data-focus': 'cartridge-search' },
      React.createElement(
        'h1',
        null,
        this.i18n('search.cartridge.title')
      ),
      this._SearchBarComponent()
    );
  }
});