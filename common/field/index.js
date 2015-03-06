var builder = require('focus/component/builder');
var React = require('react');
var Input = require('../input/text').component;
var Label = require('../label').component;
var FieldMixin = {
		/**
		 * Get field default properties.
		 */
		getDefaultProps: function getFieldDefaultProps() {
			return {
				hasLabel: true,
				labelSize: 3,
				type: 'text',
				value: undefined,
				name: undefined
			};
		},
		/**
		 * Get the css class of the field component.
		 */
		_className: function() {
			var stateClass = this.props.error ? "has-feedback has-error" : "";
			return "form-group " + stateClass;
		},
		label: function() {
				if (this.props.hasLabel) {
					var labelClassName = "control-label col-sm-" + this.props.labelSize;
					return ( < label className = {
							labelClassName
						}
						name = {
							this.props.name
						}
						key = {
							this.props.name
						} > {
							this.props.name
						} < /label>);
					}
				},
				/**
				 * Validate the field.
				 * @return {object} - undefined if valid, {name: "errors"} if not valid.
				 */
				validate: function() {
						return this.refs['input'].validate();
					},
					/**
					 * Get the value from the field.
					 */
					getValue: function() {
						return this.refs['input'].getValue();
					},
					input: function() {
						var inputClassName = "form-control col-sm-" + (12 - this.props.labelSize);
						var addOn = () => {
							""
						};
						var feedBack = () => {
							""
						};
						return ( < div className = "input-group" >
							< Input style = {
								{
									class: inputClassName
								}
							}
							id = {
								this.props.name
							}
							name = {
								this.props.name
							}
							value = {
								this.props.value
							}
							type = {
								this.props.type
							}
							ref = "input" / >
							< /div>
						);
					},
					error: function() {
						if (this.props.error) {
							return (
								/*<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>*/
								< span className = "help-block" > {
									this.props.error
								} < /span>
							)
						}
					},
					help: function() {
						if (this.props.help) {
							return ( < span className = "help-block" > {
									this.props.help
								} < /span>);
							}
						},
						render: function renderField() {
							return ( < div className = {
									this._className()
								} > {
									this.label()
								} {
									this.input()
								} {
									this.help()
								} {
									this.error()
								} < /div>);
							}
						};
						module.exports = builder(FieldMixin);
