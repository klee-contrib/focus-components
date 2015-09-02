// Dependencies

const {types} = Focus.component;

// Components

const LiveEditor = require('./live-editor');
const LivePreview = require('./live-preview');

const LiveExample = React.createClass({
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
    getDefaultProps() {
        return {
            codeText: ''
        };
    },
    /**
     * Get initial state.
     * @return {Object} initial state
     */
    getInitialState() {
        const {codeText} = this.props;
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
        return (
            <div style={style.parent}>
                <LiveEditor code={codeText} onChange={_handleCodeChange} style={style.editor} />
                <LivePreview code={codeText} style={style.preview} />
            </div>
        );
    }
});

module.exports = LiveExample;
