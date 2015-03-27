var React = require('react');
var builder = require('focus').component.builder;
var Img = require('../../img').component;

/**/
var buttonMixin = {
		getDefaultProps: function getInputDefaultProps() {
			return {
				type: 'submit',
				action: undefined,
				isPressed: false,
				style: {},
                label: undefined,
                imgSrc: undefined
			};
		},
		handleOnClick: function handleButtonOnclick() {
			if (this.props.handleOnClick) {
				return this.props.handleOnClick.apply(this, arguments);
			}
			if (!this.props.action || !this.action[this.props.action]) {
				 console.warn('Your button action is not implemented');
				return;
			}
			return this.action[this.props.action].apply(this, arguments);

		},
		getInitialState: function () {
			return {
				isPressed: this.props.isPressed
			};
		},
		_className: function buttonClassName () {
			return "btn btn-raised " + (this.props.style.className ? "btn-" + this.props.style.className : "");
		},
		renderPressedButton: function () {
			return ( <button>Loading...</button>);
        },
        /**
         * Render the button.
         * @return {[type]} [description]
         */
        render: function renderInput() {
            if (this.state.isPressed) {
                return this.renderPressedButton();
            }
            if(this.props.imgSrc) {
                return <Img src={this.props.imgSrc} onClick={this.handleOnClick} />;
            }
            return ( <button href="javascript:void(0)" onClick={this.handleOnClick} type={this.props.type} className={this._className()} >{this.props.label}</button>);
        }
};

module.exports = builder(buttonMixin);
