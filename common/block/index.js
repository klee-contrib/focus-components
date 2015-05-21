var React = require('react');
var builder = require('focus').component.builder
var Title = require('../title').component;
var i18nMixin = require('../i18n').mixin;
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var blockMixin = {
  mixins: [i18nMixin],
  getDefaultProps: function(){
    return {
      style: {},
      renderActions: function(){
        return ; // override this to add actions.
      }
    }
  },
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function(){
    if(this.props.title){
      return this.i18n(this.props.title);
    }
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock(){
    return(
      <div className={`${this.props.style.className}`} data-focus='block'>
        <header>
          <Title id={this.props.style.titleId} title={this.heading()} />
          <!-- actions -->
        </header>
        <content>
          {this.props.children}
        </content>
      </div>
    );
  }
}
module.exports = builder(blockMixin);
