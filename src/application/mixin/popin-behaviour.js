import type from 'focus-core/component/types';

/**
 * Mixin used in order to create a popin or a menu.
 * @type {Object} - popin behavour mixin
 */
let PopinProperties = {
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
