// Components
'use strict';

var React = require('react');
var searchHeaderMixin = require('./mixin');
module.exports = React.createClass({
    displayName: 'exports',

    mixins: [searchHeaderMixin],
    render: function render() {
        return this._SearchBarComponent();
    }
});