/* globals babel */

// Dependencies

'use strict';

var types = Focus.component.types;

var LivePreview = React.createClass({
    displayName: 'LivePreview',
    propTypes: {
        code: types('string'),
        style: types('object')
    },
    /**
     * Render the component.
     * @return {HTML} the rendered component
     */
    render: function render() {
        var _props = this.props;
        var code = _props.code;
        var style = _props.style;

        var content = undefined;
        try {
            content = eval(babel.transform('(function(){' + code + '})()').code); // eslint-disable-line no-eval
        } catch (err) {
            content = err.toString();
        }
        return React.createElement(
            'div',
            { style: style },
            content
        );
    }
});

module.exports = LivePreview;