// Dependencies
const React = require('react');
const {types} = require('focus-core').component;
const {debounce} = require('lodash/function');

// Components

const LiveEditor = require('./live-editor');
const LivePreview = require('./live-preview');

const LiveExample = React.createClass({
    displayName: 'LiveExample',
    propTypes: {
        component: types('object')
    },
    style: {
        name: {
            fontSize: '3em',
            marginLeft: '-5px',
            marginBottom: '0'
        },
        version: {
            fontSize: '1em',
            marginTop: '-18px',
            marginBottom: '0',
            color: 'grey'
        },
        keyword: {
            margin: '5px'
        },
        description: {
            fontSize: '1.2em',
            marginTop: '20px',
            marginBottom: '20px'
        },
        previewZone: {
            display: 'flex',
            width: '100%'
        },
        editor: {
            width: '50%',
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            zIndex: '10000',
            minHeight: '0'
        },
        showcase: {
            height: '100%',
            //backgroundColor: 'blue'
        },
        preview: {
            flex: '1'
        }
    },
    /**
     * Get default props.
     * @return {object} Default props;
     */
    getDefaultProps() {
        return {
            component: {}
        };
    },
    /**
     * Get initial state.
     * @return {Object} initial state
     */
    getInitialState() {
        const {component: {code: codeText}} = this.props;
        return {codeText};
    },
    /**
     * Code change handler.
     * @param  {string} codeText the new code text
     */
    _handleCodeChange(codeText) {
        this.setState({codeText});
    },
    /**
     * Render the component
     * @return {HTML} rendered component
     */
    render() {
        const {codeText} = this.state;
        const {_handleCodeChange, style} = this;
        const {component: {name, description, version, keywords}} = this.props;
        return (
            <div data-focus="showcase" style={style.showcase}>
                <LiveEditor code={codeText} name={name} onChange={debounce(_handleCodeChange, 100)} style={style.editor} version={version} />
                <LivePreview code={codeText} />
            </div>
        );
    }
});

module.exports = LiveExample;
