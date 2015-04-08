var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var PopinProperties = require('../mixin/popin-behaviour').mixin;

var menuMixin = {
  mixins: [PopinProperties],

  /** @inheritedProps*/
  getDefaultProps: function getMenuDefaultProps() {
    return {
      links: []
    };
  },
  /**
   * Toggle the state of the menu.
   */
  toggle: function toggleOpenMenu() {
    this.setState({open: !this.state.open});
  },
  /**
   * Render the links of the menu
   */
  renderLinks: function () {
    return this.props.links.map((link)=> {
      return (
        <a href={link.url}>{link.name}</a>
      );
    });
  },
  renderTitle: function(){
    return <h3>{this.props.title}</h3>;
  },
  /** @inheriteddoc */
  render: function () {
    var className = `menu menu-${this.props.direction} menu-${this.props.position} menu-${this.state.open ? 'open' : ''}`;
    return (
      <nav className={className}>
      {this.renderTitle()}
      {this.renderContent()}
      </nav>
    );
  }
};

module.exports = builder(menuMixin);
