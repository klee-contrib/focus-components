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
    if(!jQuery.fn.daterangepicker){
      console.warn('The jquery daterangepicker plugin should be loaded: see https://github.com/dangrossman/bootstrap-daterangepicker.');
    }
    var component = this;
    jQuery(React.findDOMNode(this)).daterangepicker({
      singleDatePicker: true,
      showDropdowns: true
    }, function(start){ ///*, end, label*/
      component.setState({value: component.props.formatter(start.toDate())});
    });
  }
};


module.exports = builder(inputDateMixin);
