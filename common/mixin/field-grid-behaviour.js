const gridSize = 12;

var fieldGridBehaviourMixin = {
  getDefaultProps: function(){
      return {
        /**
         * Size of the label in the grid system.
         * @type {Number}
         */
        labelSize: 2
      };
  },
  /**
   * Get the label gridClass.
   * @returns {string} - The label gridSize.
   */
  _getLabelGridClassName: function getLabelClassName(){
    return `col-sm-${this.props.labelSize}`;
  },
  /**
   * Get the content class Name.
   * @returns {string} - The content gridSize.
   */
  _getContentGridClassName: function getContentClassName(){
    return `col-sm-${gridSize - this.props.labelSize}`;
  },
  /**
   * Get the content offset className.
   * @returns {string} - The label gridSize.
   */
  _getContentOffsetClassName: function getContentOffsetClassName(){
    return `col-sm-offset-${this.props.labelSize}`;
  }
};
module.exports = fieldGridBehaviourMixin;
