'use strict';

var React = require('react');
var builder = require('focus').component.builder;
var Icon = require('../../icon').component;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var scrollTo = require('../../mixin/scroll').scrollTo;
var backbone = require('backbone');

/**
 * Mixin button.
 * @type {Object}
 */
var buttonBackMixin = {
  /** inheritedDoc */
  mixins: [i18nMixin, stylableMixin],
  getDefaultProps: function getDefaultProps() {
    return {
      back: backbone.history.history.back
    };
  },
  /**
   * Go back to the top of the page.
   */
  goBackHistory: function goBackHistory() {
    backbone.history.history.back();
  },
  /** inheritedDoc */
  render: function render() {
    return React.createElement(
      'button',
      { 'data-focus': 'button-back', className: 'btn btn-link', onClick: this.goBackHistory },
      React.createElement(Icon, { name: 'navigation-arrow-back', prefix: 'mdi-' }),
      this.i18n('button.back')
    );
  }
};

module.exports = builder(buttonBackMixin);