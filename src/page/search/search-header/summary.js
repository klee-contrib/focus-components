// Components
const React = require('react');
const searchHeaderMixin = require('./mixin');

module.exports = React.createClass({
    mixins: [searchHeaderMixin],
    render() {
        return this._SearchBarComponent();
    }
});
