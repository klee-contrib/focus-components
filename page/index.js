//Dependency
var React = require('react');
var detailMixin = require('./detail').mixin;

//Function to help page creation.
module.exports = {
  detail: detailMixin,
  search: require('./search'),
  /**
   * Helper to creates a detail page.
   * @param {object} config - The page configtration.
   * @returns {object} - The react component associated to the page.
   */
  createDetail: function createDetail(config){
    config = config || {};
    if(config.mixins !== undefined){
      config.mixins.push(detailMixin);
    } else {
      config.mixins = [detailMixin];
    }
    return React.createClass(config);
  }
};
