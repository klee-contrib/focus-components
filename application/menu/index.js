var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var popinProperties = require('../mixin/popin-behaviour').mixin;
var stylabe =  require('../../mixin/stylable');
var Icon = require('../../common/icon').component;
var Backbone = require('backbone');
var Button = require('../../common/button/action').component;
var menuMixin = {
  mixins: [stylabe, popinProperties],

  /** @inheritedProps*/
  getDefaultProps() {
    return {
      items: []
    };
  },
  /**
   * Toggle the state of the menu.
   */
  toggle(){
    this.setState({open: !this.state.open});
  },
  /**
   * Render the links of the menu
   */
  _renderMenuItems(){
    return this.props.items.map((link)=> {
      let clickHandler;
      if(link.route !== undefined ){
        clickHandler = (event)=>{
          //event.preventDefault();
          link.onClick.call(this, arguments);
          Backbone.history.navigate(link.route, true);
        };
      }else{
        clickHandler = link.onClick;
      }
      return (
        <li><Button handleOnClick={clickHandler} icon={link.icon} label={link.name} option="link" shape="flat" /></li>
      );
    });
  },
  /** @inheriteddoc */
  render(){
    var className = `menu menu-${this.props.direction} menu-${this.props.position} menu-${this.state.open ? 'open' : ''} ${this._getStyleClassName()}`;
    return (
      <nav className={className} data-focus='menu'>
        <div data-focus='menu-brand'></div>
        <ul data-focus='menu-items'>
          {this._renderMenuItems()}
        </ul>
        {this.props.children}
      </nav>
    );
  }
};

module.exports = builder(menuMixin);
