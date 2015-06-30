var jQuery = require('jquery');
//Dependencies.
////http://www.daterangepicker.com/#ex2
var builder = require('focus').component.builder;
var React = require('react');
var inputTextMixin = require('../text').mixin;
let assign = require('object-assign');
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
    //If the domains set options.
    let propsOptions = this.props.options && this.props.options.dateRangePicker ? this.props.options.dateRangePicker : {};
    console.log('parentEL............', `div [data-reactid="${React.findDOMNode(this).getAttribute('data-reactid')}"]`);
    let dateRangeOptions = assign( propsOptions, {
      parentEl: `div [data-reactid="${React.findDOMNode(this).getAttribute('data-reactid')}"]`,
      singleDatePicker: true,
      showDropdowns: true
    });
    jQuery(React.findDOMNode(this)).daterangepicker(dateRangeOptions, function(start){ ///*, end, label*/
      component.setState({value: component.props.formatter(start.toDate())});
    });
  }
};


module.exports = builder(inputDateMixin);
