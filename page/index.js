// Dependencies

let React = require('react');
let detailMixin = require('./detail').mixin;

//Function to help page creation.
module.exports = {
  detail: detailMixin,
  search: require('./search'),
  mixin: require('./mixin'),
  /**
   * Helper to creates a detail page.
   * @param {object} config - The page configuration.
   * @returns {object} - The react component associated to the page.
   */
  createDetail: function createDetail(config){
    config = config || {};
    if (config.mixins) {
      config.mixins.push(detailMixin);
    } else {
      config.mixins = [detailMixin];
    }
    return React.createClass(config);
  }
};
