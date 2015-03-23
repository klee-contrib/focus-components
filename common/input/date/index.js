var jQuery = require('jquery');
//Dependencies.
////http://www.daterangepicker.com/#ex2
var builder = require('focus').component.builder;
var React = require('react');
var inputTextMixin = require('../text').mixin;

/**
 * Input text mixin.
 * @type {Object}
 */
var inputDateMixin = {
  /** @inheritdoc */
  mixins:[inputTextMixin],
  /** @inheritdoc */
  componentDidMount: function inputDateDidMount(){
    var component = this;
    jQuery(this.getDOMNode()).pickadate({
      /**
       * Handler called when the date change its value.
       * @param {object} context - The event triggered by the plugin.
       */
      onSet: function onSetDate(context) {
        component._handleOnChange(context);
      }
    });
  }
};


module.exports = builder(inputDateMixin);
