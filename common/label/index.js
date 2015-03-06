var builder = require('focus/component/builder');
var React = require('react');
/**
 * Label mixin for form.
 * @type {Object}
 */
var labelMixin = {
	getDefaultProps: function() {
		return {
			name: undefined,
			key: undefined
		};
	},
	i18n: function(prop) {
		return prop;
	},
	render: function() {
		return ( < label className = {
				this.props.css
			}
			htmlFor = {
				this.props.name
			} > {
				this.i18n(this.props.value)
			} < /label>
		)
	}
};

module.exports = builder(labelMixin);
