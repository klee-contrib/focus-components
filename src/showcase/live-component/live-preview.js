/* globals babel */

// Dependencies

const {types} = Focus.component;

const LivePreview = React.createClass({
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
    render() {
        const {code, style: mainStyle} = this.props;
        const {style} = this;
        let content;
        try {
            /* eslint-disable */
            content = eval(babel.transform(`(function(){${code}})()`).code);
            /* eslint-enable */
        } catch (e) {
            content = e.toString();
        }

        return (
            <div className='mdl-shadow--2dp' style={mainStyle}>
                <h1 style={style.title}>Aperçu du composant</h1>
                <hr/>
                <div style={style.component}>
                    {content}
                </div>
            </div>
        );
    }
});

module.exports = LivePreview;
