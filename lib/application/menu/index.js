'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var popinProperties = require('../mixin/popin-behaviour').mixin;
var stylabe = require('../../mixin/stylable');
var Icon = require('../../common/icon').component;
var Backbone = require('backbone');
var Button = require('../../common/button/action').component;
var menuMixin = {
  mixins: [stylabe, popinProperties],

  /** @inheritedProps*/
  getDefaultProps: function getDefaultProps() {
    return {
      items: []
    };
  },
  /**
   * Toggle the state of the menu.
   */
  toggle: function toggle() {
    this.setState({ open: !this.state.open });
  },
  /**
   * Render the links of the menu
   */
  _renderMenuItems: function _renderMenuItems() {
    var _this = this,
        _arguments = arguments;

    return this.props.items.map(function (link) {
      var clickHandler = undefined;
      if (link.route !== undefined) {
        clickHandler = function (event) {
          //event.preventDefault();
          link.onClick.call(_this, _arguments);
          Backbone.history.navigate(link.route, true);
        };
      } else {
        clickHandler = link.onClick;
      }
      return React.createElement(
        'li',
        null,
        React.createElement(Button, { handleOnClick: clickHandler, icon: link.icon, label: link.name, option: 'link', shape: 'flat' })
      );
    });
  },
  /** @inheriteddoc */
  render: function render() {
    var className = 'menu menu-' + this.props.direction + ' menu-' + this.props.position + ' menu-' + (this.state.open ? 'open' : '') + ' ' + this._getStyleClassName();
    return React.createElement(
      'nav',
      { className: className, 'data-focus': 'menu' },
      React.createElement('div', { 'data-focus': 'menu-brand' }),
      React.createElement(
        'ul',
        { 'data-focus': 'menu-items' },
        this._renderMenuItems()
      ),
      this.props.children
    );
  }
};

module.exports = builder(menuMixin);