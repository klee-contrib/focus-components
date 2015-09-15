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
    style: {
        title: {
            margin: '15px',
            color: '#372B3F'
        },
        component: {
            padding: '5px'
        }
    },
    /**
    * Render the component.
    * @return {HTML} the rendered component
    */
    render: function render() {
        var _props = this.props;
        var code = _props.code;
        var mainStyle = _props.style;
        var style = this.style;

        var content = undefined;
        try {
            /* eslint-disable */
            content = eval(babel.transform('(function(){' + code + '})()').code);
            /* eslint-enable */
        } catch (e) {
            content = e.toString();
        }

        return React.createElement(
            'div',
            { className: 'mdl-shadow--2dp', style: mainStyle },
            React.createElement(
                'h1',
                { style: style.title },
                'Aperçu du composant'
            ),
            React.createElement('hr', null),
            React.createElement(
                'div',
                { style: style.component },
                content
            )
        );
    }
});

module.exports = LivePreview;