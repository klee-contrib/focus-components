var builder = require('focus').component.builder;
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
		return (window.i18n && window.i18n.t) ? window.i18n.t(prop) : prop;
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
