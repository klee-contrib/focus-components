  //Target
  /*
  <div class="checkbox">
    <label>
      <input type="checkbox"> Checkbox
    </label>
  </div>
   */
  var builder = require('focus/component/builder');
  var React = require('react');
  var type = require('focus/component/types');

  var checkBoxMixin = {
  		/**
  		 * Get the checkbox default attributes.
  		 */
  		getDefaultProps: function getInputDefaultProps() {
  			return {
  				minlength: 0,
  				maxlength: undefined,
  				wrap: "soft",
  				required: false,
  				value: undefined,
  				label: undefined,
  				style: {},
  				rows: undefined,
  				cols: undefined
  			};
  		},
  		/**
  		 * Properties validation.
  		 * @type {Object}
  		 */
  		propTypes: {
  			minlength: type('number'),
  			maxlength: type('number'),
  			wrap: type('string'),
  			required: type('bool'),
  			value: type('string'),
  			label: type('string'),
  			style: type('object'),
  			rows: type('number'),
  			cols: type('number')
  		},
  		getInitialState: function() {
  			return {
  				isChecked: this.props.value
  			};
  		},
  		_onChange: function onChange(event) {
  			if (this.props.onChange) {
  				this.props.onChange(event);
  			}
  		},
  		/**
  		 * Get the value from the input in the DOM.
  		 */
  		getValue: function getValue() {
  			return this.getDOMNode().value;
  		},
  		/**
  		 * Render the Checkbox HTML.
  		 * @return {VirtualDOM} - The virtual DOM of the checkbox.
  		 */
  		render: function renderCheckBox() {
  			return ( < textarea ref = 'textarea'
  				onChange = {
  					this._onChange
  				}
  				cols = {
  					this.props.cols
  				}
  				rows = {
  					this.props.rows
  				}
  				minlength = {
  					this.props.minlength
  				}
  				maxlength = {
  					this.props.maxlength
  				} > {
  					this.props.value
  				} < /textarea>);
  			}
  		};

  		module.exports = builder(checkBoxMixin);
