'use strict';

var type = require('focus').component.types;
var referenceMixin = {
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
module.exports = referenceMixin;