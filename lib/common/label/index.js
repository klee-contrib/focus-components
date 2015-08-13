// Dependencies

'use strict';

var builder = require('focus').component.builder;

/**
* Label mixin for form.
* @type {Object}
*/
var labelMixin = {
    mixins: [require('../i18n/mixin')],
    getDefaultProps: function getDefaultProps() {
        return {
            name: undefined,
            key: undefined,
            style: { className: '' },
            isRequired: false,
            requiredChar: ' *',
            isEdit: false
        };
    },
    render: function render() {
        return React.createElement(
            'label',
            { className: this.props.style.className, htmlFor: this.props.name },
            this.i18n(this.props.name) + (this.props.isRequired && this.props.isEdit ? this.props.requiredChar : '  ')
        );
    }
};

module.exports = builder(labelMixin);