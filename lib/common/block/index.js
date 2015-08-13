'use strict';

var React = require('react');
var builder = require('focus').component.builder;
var Title = require('../title').component;
var i18nMixin = require('../i18n').mixin;
var uuid = require('uuid').v4;
var trim = require('lodash/string/trim');
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var blockMixin = {
  mixins: [i18nMixin],
  getDefaultProps: function getDefaultProps() {
    return {
      style: {},
      actions: function actions() {
        return; // override this to add actions.
      }
    };
  },
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function heading() {
    if (this.props.title) {
      return this.i18n(this.props.title);
    }
  },
  _buildId: function _buildId() {
    return window.location.hash.slice(1) + '/' + trim(this.heading().toLowerCase()); //.replace('/', '_');
  },
  /**
   * ClassName of the button.
   */
  _className: function buttonClassName() {
    return this.props.style.className ? this.props.style.className : '';
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock() {
    return React.createElement(
      'div',
      { className: this._className(), 'data-focus': 'block' },
      React.createElement(
        'header',
        null,
        React.createElement(Title, { id: this._buildId(), title: this.heading() }),
        React.createElement(
          'div',
          { className: 'actions' },
          this.props.actions()
        )
      ),
      React.createElement(
        'div',
        { className: 'block-content' },
        this.props.children
      )
    );
  }
};
module.exports = builder(blockMixin);