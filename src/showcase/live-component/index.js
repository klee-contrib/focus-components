// Dependencies

const {types} = Focus.component;
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
            marginRight: '10px',
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
            <div style={style.parent}>
                <h1 style={style.name}>{name}</h1>
                <h2 style={style.version}>{version}</h2>
                {keywords.map((keyword, idx) => {
                    return <span key={idx} style={style.keyword}><b>{keyword.toUpperCase()}</b></span>;
                })}
                <div style={style.description}>{description}</div>
                <div style={style.previewZone}>
                    <LiveEditor code={codeText} onChange={debounce(_handleCodeChange, 100)} style={style.editor} />
                    <LivePreview code={codeText} style={style.preview} />
                </div>
            </div>
        );
    }
});

module.exports = LiveExample;
