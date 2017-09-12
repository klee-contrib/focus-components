import types from 'focus-core/component/types';

export default {
    /** @inheritedDocs */
    getDefaultProps() {
        return {
            style: { className: '' }
        };
    },
    /** @inheritedDocs */
    propTypes: {
        style: types('object')
    },
    /**
    * Get the className from the style.className props
    * @returns {string} - the className.
    */
    _getStyleClassName: function getStyleClassName() {
        if (this.props.style && this.props.style.className) {
            return this.props.style.className;
        }
        return '';
    }
};
