//Dependencies.
////http://www.daterangepicker.com/#ex2
let builder = require('focus').component.builder;
let React = require('react');
let inputTextMixin = require('../text').mixin;
let assign = require('object-assign');
/**
 * Input text mixin.
 * @type {Object}
 */
let inputDateMixin = {
    /** @inheritdoc */
    mixins: [inputTextMixin],
    /** @inheritdoc */
    componentDidMount(){
        let jQuery = require('jquery');
        let moment = require('moment');
        if(!jQuery.fn.daterangepicker){
            console.warn('The jquery daterangepicker plugin should be loaded: see https://github.com/dangrossman/bootstrap-daterangepicker.');
        }
        if(!moment){
            console.warn('The moment library should be loaded: http://http://momentjs.com/');
        }
        let component = this;
        //If the domains set options.
        let propsOptions = this.props.options && this.props.options.dateRangePicker ? this.props.options.dateRangePicker : {};
        //console.log('parentEL............', `div [data-reactid="${React.findDOMNode(this).parentElement.getAttribute('data-reactid')}"]`);
        let dateRangeOptions = assign( propsOptions, {
          //Check if the parentElement is the correct container.
          parentEl: `[data-reactid="${React.findDOMNode(this).parentElement.getAttribute('data-reactid')}"]`,
          singleDatePicker: true,
          showDropdowns: true
        });
        jQuery(React.findDOMNode(this)).daterangepicker(dateRangeOptions, (start)=>{ ///*, end, label*/
            component.setState({value: component.props.formatter(start.toDate())});
        });
    }
};


module.exports = builder(inputDateMixin);
