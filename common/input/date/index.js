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
  mixins: [inputTextMixin],
  /** @inheritdoc */
  componentDidMount: function inputDateDidMount(){
    var component = this;
    jQuery(React.findDOMNode(this)).daterangepicker({
      singleDatePicker: true,
      showDropdowns: true
    }, function(start){ ///*, end, label*/
      component.setState({value: start.format('L')});
    });
  }
};


module.exports = builder(inputDateMixin);
