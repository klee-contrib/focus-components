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
      key: undefined,
			style: {className: ''}
    };
  },
  i18n: function translateLabel(prop) {
    return (window.i18n && window.i18n.t) ? window.i18n.t(prop) : prop;
  },
  render: function() {
    return (
      <label className={this.props.style.className} htmlFor={this.props.name}>
        {this.i18n(this.props.name)}
      </label>
    );
  }
};

module.exports = builder(labelMixin);
