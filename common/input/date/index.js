var jQuery = require('jquery');
//Dependencies.
var builder = require('focus').component.builder;
var React = require('react');
var inputTextMixin = require('../text').mixin;
var type = require('focus').component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var inputDateMixin = {
  mixins:[inputTextMixin],
  /** @inheritdoc */
  componentDidMount: function inputDateDidMount(){
    var component = this;
    jQuery(this.getDOMNode()).pickadate({
      onSet: function(context) {
        component._handleOnChange(context);
      }
    });
  }
};


module.exports = builder(inputDateMixin);
