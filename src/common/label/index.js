// Dependencies

let builder = require('focus').component.builder;

/**
* Label mixin for form.
* @type {Object}
*/
let labelMixin = {
    mixins: [require('../i18n/mixin')],
    getDefaultProps: function() {
        return {
            name: undefined,
            key: undefined,
            style: {className: ''},
            isRequired: false,
            requiredChar: ' *',
            isEdit: false
        };
    },
    render: function() {
        return (
            <label className={this.props.style.className} htmlFor={this.props.name}>
                {this.i18n(this.props.name) + (this.props.isRequired && this.props.isEdit ? this.props.requiredChar : '  ')}
            </label>
        );
    }
};

module.exports = builder(labelMixin);
