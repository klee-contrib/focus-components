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
        var style = _props.style;

        return React.createElement(CodeEditor, { editorProps: { $blockScrolling: 'Infinity' }, mode: 'jsx', name: 'codeEditor', onChange: onChange, style: style, theme: 'github', value: code });
    }
});

module.exports = LiveEditor;