/* globals babel */

// Dependencies

const {types} = Focus.component;

const LivePreview = React.createClass({
    displayName: 'LivePreview',
    propTypes: {
        code: types('string'),
        style: types('object')
    },
    /**
    * Render the component.
    * @return {HTML} the rendered component
    */
    render() {
        const {code, style} = this.props;
        let content;
        try {
            /* eslint-disable */
            content = eval(babel.transform(`(function(){${code}})()`).code);
            /* eslint-enable */
        } catch (e) {
            content = e.toString();
        }


        return (
            <div style={style}>
                {content}
            </div>
        );
    }
});

module.exports = LivePreview;
