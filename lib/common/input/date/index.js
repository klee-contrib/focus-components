//Dependencies.
////http://www.daterangepicker.com/#ex2
'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var inputTextMixin = require('../text').mixin;
var assign = require('object-assign');
/**
 * Input text mixin.
 * @type {Object}
 */
var inputDateMixin = {
    /** @inheritdoc */
    mixins: [inputTextMixin],
    /** @inheritdoc */
    componentDidMount: function componentDidMount() {
        var jQuery = require('jquery');
        var moment = require('moment');
        if (!jQuery.fn.daterangepicker) {
            console.warn('The jquery daterangepicker plugin should be loaded: see https://github.com/dangrossman/bootstrap-daterangepicker.');
        }
        if (!moment) {
            console.warn('The moment library should be loaded: http://http://momentjs.com/');
        }
        var component = this;
        //If the domains set options.
        var propsOptions = this.props.options && this.props.options.dateRangePicker ? this.props.options.dateRangePicker : {};
        //console.log('parentEL............', `div [data-reactid="${React.findDOMNode(this).parentElement.getAttribute('data-reactid')}"]`);
        var dateRangeOptions = assign(propsOptions, {
            //Check if the parentElement is the correct container.
            parentEl: '[data-reactid="' + React.findDOMNode(this).parentElement.getAttribute('data-reactid') + '"]',
            singleDatePicker: true,
            showDropdowns: true
        });
        jQuery(React.findDOMNode(this)).daterangepicker(dateRangeOptions, function (start) {
            ///*, end, label*/
            component.setState({ value: component.props.formatter(start.toDate()) });
        });
    }
};

module.exports = builder(inputDateMixin);