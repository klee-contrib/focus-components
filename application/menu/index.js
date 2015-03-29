var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;

var menuMixin = {
  /** @inheritedProps*/
  getDefaultProps: function getMenuDefaultProps(){
    return {
      direction: 'vertical',//horizontal
      position: 'left', // top, bottom, right, left
      links: [],
      open: false
    };
  },
  /** @inheritedProps*/
  getInitialState: function getMenuDefaultState(){
    return {
      open: this.props.open
    };
  },
  /**
   * Toggle the state of the menu.
   */
  toggle: function toggleOpenMenu(){
    this.setState({open: !this.state.open});
  },
  /**
   * Render the links of the menu
   */
 renderLinks: function(){
  return this.props.links.map((link)=>{
    return (
      <a href={link.url}>{link.name}</a>
    );
  });
 },
 /** @inheriteddoc */
 render: function(){
   var className = `menu menu-${this.props.direction} menu-${this.props.position} menu-${this.state.open ? 'open' : ''}`;
   return (
     <nav className={className}>
      <h3>{this.props.title}</h3>
      {this.renderLinks()}
    </nav>
  );
 }
};

module.exports = builder(menuMixin);
