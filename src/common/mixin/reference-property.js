import type from 'focus-core/component/types';
const referenceMixin = {
  /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
        /**
         * Size of the label in the grid system.
         * @type {Number}
         */
            reference: {}
        };
    },

  /** @inheritdoc */
    propTypes: {
        reference: type('object')
    },

  /**
   * @returns {object} -
   */
    _getReference: function getReference() {
        return this.props.reference;
    }
};
export default referenceMixin;
