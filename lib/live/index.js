// Dependencies

'use strict';

var types = Focus.component.types;

// Components

var LiveEditor = require('./live-editor');
var LivePreview = require('./live-preview');

var LiveExample = React.createClass({
    displayName: 'LiveExample',
    propTypes: {
        codeText: types('string')
    },
    style: {
        parent: {
            display: 'flex',
            width: '100%'
        },
        editor: {
            flex: '1'
        },
        preview: {
            flex: '1'
        }
    },
    /**
     * Get default props.
     * @return {object} Default props;
     */
    getDefaultProps: function getDefaultProps() {
        return {
            codeText: ''
        };
    },
    /**
     * Get initial state.
     * @return {Object} initial state
     */
    getInitialState: function getInitialState() {
        var codeText = this.props.codeText;

        return { codeText: codeText };
    },
    /**
     * Code change handler.
     * @param  {string} codeText the new code text
     */
    _handleCodeChange: function _handleCodeChange(codeText) {
        this.setState({ codeText: codeText });
    },
    /**
     * Render the component
     * @return {HTML} rendered component
     */
    render: function render() {
        var codeText = this.state.codeText;
        var _handleCodeChange = this._handleCodeChange;
        var style = this.style;

        return React.createElement(
            'div',
            { style: style.parent },
            React.createElement(LiveEditor, { code: codeText, onChange: _handleCodeChange, style: style.editor }),
            React.createElement(LivePreview, { code: codeText, style: style.preview })
        );
    }
});

module.exports = LiveExample;