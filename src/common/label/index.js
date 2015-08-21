// Dependencies

const {builder, types} = require('focus').component;
const i18nBehaviour = require('../i18n/mixin');
const styleBehaviour = require('../../mixin/stylable');
/**
* Label mixin for form.
* @type {Object}
*/
const labelMixin = {
    mixins: [i18nBehaviour, styleBehaviour],
    /** @inheritdoc */
    propTypes: {
        name: types('string').isRequired
    },
    /** @inheritdoc */
    render() {
        const {name, style} = this.props;
        return (
            <label className={style.className} htmlFor={name}>
                {this.i18n(name)}
            </label>
        );
    }
};

module.exports = builder(labelMixin);
