var type = require('focus-core').component.types;
/**
 * Mixin used in order to create a popin or a menu.
 * @type {Object} - popin behavour mixin
 */
var PopinProperties = {
  /** @inheritdoc */
  getDefaultProps: function getMenuDefaultProps() {
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
  getInitialState: function getDefaultState() {
    return {
      open: this.props.open
    };
  }
};

module.exports = {mixin: PopinProperties};
