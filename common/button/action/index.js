var React = require('react');
var builder = require('focus/component/builder');
/**/
var buttonMixin = {
		getDefaultProps: function getInputDefaultProps() {
			return {
				type: 'submit',
				action: undefined,
				isPressed: false,
				style: {}
			};
		},
		handleOnClick: function handleButtonOnclick() {
			if (this.props.handleOnClick) {
				return this.props.handleOnClick.apply(this, arguments);
			}
			if (!this.props.action || !this.action[this.props.action]) {
				return console.warn('Your button action is not implemented');
			}
			return this.action[this.props.action].apply(this, arguments);

		},
		getInitialState: function () {
			return {
				isPressed: this.props.isPressed
			};
		},
		_className: function buttonClassName () {
			return "btn " + (this.props.style.className ? "btn-" + this.props.style.className : "");
		},
		renderPressedButton: function () {
			return ( <button> Loading... < /button>);
				},
				/**
				 * Render the button.
				 * @return {[type]} [description]
				 */
				render: function renderInput() {
					if (this.state.isPressed) {
						return this.renderPressedButton();
					}
					return ( < button onClick = {
							this.handleOnClick
						}
						type = {
							this.props.type
						}
						className = {
							this._className()
						} > {
							this.props.label
						} < /button>
					);
				}
		};


		module.exports = builder(buttonMixin);
