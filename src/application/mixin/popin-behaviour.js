import type from 'focus-core/component/types';

/**
 * Mixin used in order to create a popin or a menu.
 * @type {Object} - popin behavour mixin
 */
let PopinProperties = {
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please wrap content inside a popin instead');
    },
    /** @inheritdoc */
    getDefaultProps() {
        return {
            direction: 'vertical',//horizontal
            position: 'left', // top, bottom, right, left
            open: false
        };
    },
    /** @inheritdoc */
    propTypes: {
        open: type('bool')
    },
    /** @inheritdoc */
    getInitialState() {
        return {
            open: this.props.open
        };
    }
};

export { PopinProperties as mixin };
export default { mixin: PopinProperties };
