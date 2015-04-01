var builder = require('focus').component.builder;
var React = require('react');
/**
 * Label mixin for form.
 * @type {Object}
 */
var labelMixin = {
    mixins: [require('../i18n/mixin')],
  getDefaultProps: function() {
    return {
      name: undefined,
      key: undefined,
			style: {className: ''}
    };
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
