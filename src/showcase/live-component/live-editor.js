// Dependencies
const React = require('react');
const {types} = require('focus-core').component;
require('brace');
require('brace/mode/jsx');
require('brace/theme/github');

// Components

const CodeEditor = require('react-ace');

const LiveEditor = React.createClass({
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
    render() {
        const {code, onChange, style: mainStyle} = this.props;
        const {style} = this;
        return (
            <div className='mdl-shadow--2dp' style={mainStyle}>
                <h1 style={style.title}>Code <i>éditable</i></h1>
                <hr/>
                <CodeEditor editorProps={{$blockScrolling: 'Infinity'}} mode='jsx' name='codeEditor' onChange={onChange} theme='github' value={code}/>
            </div>
        );
    }
});

module.exports = LiveEditor;
