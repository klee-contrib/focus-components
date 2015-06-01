var type = require('focus').component.types;
module.exports = {
  /** @inheritedDocs */
  getDefaultProps: function getStyllableDefaultProps(){
    return {
      style: {className: ''}
    };
  },
  /**
   * Get the className from the style.className props
   * @returns {string} - the className.
   */
  _getStyleClassName: function getStyleClassName(){
    if(this.props.style && this.props.style.className){
      return this.props.style.className;
    }
    return '';
  }
};
