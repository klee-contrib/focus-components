//Dependencies.
var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var union = require('lodash/array/union')

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
      name: undefined
    };
  },
  /** @inheritdoc */
  propTypes: {
    multiple: type('bool'),
    value: type(['number', 'string']),
    values: type('array'),
    valueKey: type('string'),
    labelKey: type('string'),
    name: type('string')
  },
  /** @inheritdoc */
  getInitialState: function getInitialStateSelect() {
    return {
      value: this.props.value,
      hasUndefined : this.props.hasUndefined === false ? false : !this.props.value
    };
  },
  /** @inheritdoc */
  componentWillReceiveProps: function selectWillReceiveProps(newProps){
    this.setState({value: newProps.value});
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
  _handleOnChange: function selectOnChange(event){
    //On change handler.
    if(this.props.onChange){
      this.props.onChange(event);
    }else {
      //Set the state then call the change handler.
      this.setState({value: event.target.value});
    }
  },
  /**
   * Render options.
   */
  renderOptions: function renderOptions(){
    let values;
    if(this.state.hasUndefined){
      values = union(
        [{[this.props.labelKey]: 'select.unSelected', [this.props.valueKey]: undefined}],
        this.props.values
      );
    }else{
      values = this.props.values;
    }
    return values.map((val)=>{
      var value = val[this.props.valueKey];
      return(
        <option key={value} value={value}>
          {this.i18n(val[this.props.labelKey])}
        </option>
    );
    });
  },
  /**
   * Render an input.
   * @return {DOM} - The dom of an input.
   */
  render: function renderSelect() {
    return (
      <select
        multiple={this.props.multiple}
        value={this.state.value}
        className={this._getStyleClassName()}
        name={this.props.name}
        onChange={this._handleOnChange}
      >
        {this.renderOptions()}
      </select>
    );
  }
};


module.exports = builder(selectTextMixin);
