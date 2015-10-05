// Dependencies

const {builder, types} = require('focus-core').component;
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
        name: types('string').isRequired,
        text: types('string')
    },
    /** @inheritdoc */
    render() {
        const {name, text, style} = this.props;
        const content = text || name;
        return (
            <label className={style.className} data-focus="label" htmlFor={name}>
                {this.i18n(content)}
            </label>
        );
    }
};

module.exports = builder(labelMixin);
