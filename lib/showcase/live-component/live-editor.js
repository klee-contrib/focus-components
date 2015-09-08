// Dependencies

'use strict';

var types = Focus.component.types;

require('brace');
require('brace/mode/jsx');
require('brace/theme/github');

// Components

var CodeEditor = require('react-ace');

var LiveEditor = React.createClass({
    displayName: 'LiveEditor',
    style: {
        title: {
            margin: '15px',
            color: '#372B3F'
        }
    },
    propTypes: {
        code: types('string'),
        onChange: types('func'),
        style: types('object')
    },
    /**
    * Render the component.
    * @return {HTML} the rendered component
    */
    render: function render() {
        var _props = this.props;
        var code = _props.code;
        var onChange = _props.onChange;
        var mainStyle = _props.style;
        var style = this.style;

        return React.createElement(
            'div',
            { className: 'mdl-shadow--2dp', style: mainStyle },
            React.createElement(
                'h1',
                { style: style.title },
                'Code ',
                React.createElement(
                    'i',
                    null,
                    'éditable'
                )
            ),
            React.createElement('hr', null),
            React.createElement(CodeEditor, { editorProps: { $blockScrolling: 'Infinity' }, mode: 'jsx', name: 'codeEditor', onChange: onChange, theme: 'github', value: code })
        );
    }
});

module.exports = LiveEditor;