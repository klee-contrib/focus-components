/**
 * Mixin used in order to create a popin or a menu.
 * @type {Object}
 */
var PopinProperties = {

  /** @inheritedProps
   *  Default properties.
   * @returns {{direction: string, position: string, links: Array, open: boolean, style: {}}} properties
   */
  getDefaultProps: function getMenuDefaultProps() {
    return {
      direction: 'vertical',//horizontal
      position: 'left', // top, bottom, right, left
      open: false,
      style: {}
    };
  },
  /** @inheritedProps
   * Initial state.
   * @returns {{open: *}} initial state
   */
  getInitialState: function getDefaultState() {
    return {
      open: this.props.open
    };
  }
};

module.exports = {mixin: PopinProperties};