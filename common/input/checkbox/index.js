//Target
/*
<label>
  <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
</label>
 */
var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;

var checkBoxMixin = {
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      value: undefined,
      label: undefined,
      style: {}
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    value: type('bool'),
    label: type('string'),
    style: type('object')
  },
  getInitialState: function() {
    return {
      isChecked: this.props.value
    };
  },
  _onChange: function onChange(event) {
    this.setState({
      isChecked: !this.state.isChecked
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  /**
   * Get the value from the input in  the DOM.
   */
  getValue: function getValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderCheckBox() {
      return (

          <div className="checkbox">
              <label>
                  <input ref='checkbox'checked={this.state.isChecked} onChange={this._onChange} type="checkbox" />
                  <span className="ripple"></span>
                  <span className="check"></span>
					{this.props.label ? this.props.label : ""}
              </label>
          </div>
      );
  },
  /** @inheritedDoc*/
  componentWillReceiveProps: function checkBoxWillreceiveProps(nextProps) {
    if(nextProps.value !== undefined){
      this.setState({isChecked : nextProps.value});
    }
  }
};

module.exports = builder(checkBoxMixin);
