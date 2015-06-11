var React = require('react');
var builder = require('focus').component.builder
//var i18nMixin = require('../i18n').mixin;
var StickyNavigation = require('../sticky-navigation').component
var type = require('focus').component.types;
var stylable = require('../../mixin/stylable')
/**
 * Mixin used in order to create a Detail.
 * @type {Object}
 */
var detailMixin = {
  mixins: [stylable],
  /** @inheritedDoc */
  getDefaultProps: function getDetailDefaultProps(){
    return {
      /**
       * Activate the presence of the sticky navigation component.
       * @type {Boolean}
       */
      navigation: true
    }
  },
  /** @inheritedDoc */
  propTypes: {
    navigation: type('bool')
  },
  /**
   * Render the navigation component if the props navigation is true.
   * @returns {Object} - The jsx component.
   */
  renderNavigation: function(){
    if(this.props.navigation){
      return <StickyNavigation/>;
    } return;
  },
  /** @inheritedDoc */
  render: function renderDetail(){
    return(
      <div className={`${this._getStyleClassName()}`}  data-focus='detail'>
        {this.renderNavigation()}
        <div data-focus='detail-content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
module.exports = builder(detailMixin);
