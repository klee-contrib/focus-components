// Dependencies

const {types} = Focus.component;
require('brace');
require('brace/mode/jsx');
require('brace/theme/github');

// Components

const CodeEditor = require('react-ace');

const LiveEditor = React.createClass({
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
    render() {
        const {code, onChange, style} = this.props;
        return (
            <CodeEditor editorProps={{$blockScrolling: 'Infinity'}} mode='jsx' name='codeEditor' onChange={onChange} style={style} theme='github' value={code}/>
        );
    }
});

module.exports = LiveEditor;
