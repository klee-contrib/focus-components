// Components
let React = require('react');
let searchHeaderMixin = require('./mixin');
module.exports = React.createClass({
    mixins: [searchHeaderMixin],
    render() {
        return this._SearchBarComponent();
    }
});
