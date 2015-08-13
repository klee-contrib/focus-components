//Dependencies.
'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var union = require('lodash/array/union');
var uuid = require('uuid');
/**
 * Input text mixin.
 * @type {Object}
 */
var selectTextMixin = {
  mixins: [i18nMixin, stylableMixin],
  /** @inheritdoc */
  getDefaultProps: function getSelectDefaultProps() {
    return {
      multiple: false,
      value: undefined,
      values: [],
      valueKey: 'code',
      labelKey: 'label',
      name: undefined,
      onChange: undefined
    };
  },
  /** @inheritdoc */
  propTypes: {
    multiple: type('bool'),
    value: type(['number', 'string', 'array']),
    values: type('array'),
    valueKey: type('string'),
    labelKey: type('string'),
    name: type('string'),
    onChange: type(['function', 'object'])
  },
  /** @inheritdoc */
  getInitialState: function getInitialStateSelect() {
    return {
      value: this.props.value,
      hasUndefined: this.props.hasUndefined === false ? false : !this.props.value
    };
  },
  /** @inheritdoc */
  componentWillReceiveProps: function selectWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  },
  /**
   * Get the value from the select in the DOM.
   */
  getValue: function getSelectTextValue() {
    return React.findDOMNode(this).value;
  },
  /**
   * Handle the change value of the input.
   * @param {object} event - The sanitize event of input.
   */
  _handleOnChange: function selectOnChange(event) {
    //On change handler.
    if (this.props.onChange) {
      this.props.onChange(event);
    } else {
      //Set the state then call the change handler.
      if (this.props.multiple) {
        var vals = this.state.value;
        vals.push(event.target.value);
        return this.setState({ value: vals });
      }
      return this.setState({ value: event.target.value });
    }
  },
  /**
   * Render options.
   */
  renderOptions: function renderOptions() {
    var _this = this;

    var values = undefined;
    if (this.state.hasUndefined) {
      var _ref;

      values = union([(_ref = {}, _ref[this.props.labelKey] = 'select.unSelected', _ref[this.props.valueKey] = undefined, _ref)], this.props.values);
    } else {
      values = this.props.values;
    }
    return values.map(function (val) {
      var value = val[_this.props.valueKey];
      return React.createElement(
        'option',
        { key: value || uuid.v4(), value: value },
        _this.i18n(val[_this.props.labelKey])
      );
    });
  },
  /**
   * Render an input.
   * @return {DOM} - The dom of an input.
   */
  render: function renderSelect() {
    return React.createElement(
      'select',
      {
        multiple: this.props.multiple,
        value: this.state.value,
        className: this._getStyleClassName(),
        name: this.props.name,
        onChange: this._handleOnChange
      },
      this.renderOptions()
    );
  }
};

module.exports = builder(selectTextMixin);