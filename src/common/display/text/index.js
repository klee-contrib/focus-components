//Dependencies.
import builder from 'focus-core/component/builder';
import React, { PropTypes } from 'react';
import i18nBehaviour from '../../i18n/mixin';

/**
* Input text mixin.
* @type {Object}
*/
const displayTextMixin = {
    mixins: [i18nBehaviour],
    displayName: 'DeprecatedDisplayText',
    /** @inheritdoc */
    getDefaultProps() {
        return {
            formatter: (data) => data
        };
    },
    /** @inheritdoc */
    propTypes: {
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        style: PropTypes.object
    },
    /**
    * Render the value.
    * @return {string} The formated value.
    */
    renderValue() {
        const { formatter, value } = this.props;
        return formatter(value);
    },
    /** @inheritdoc */
    render() {
        return (
            <div {...this.props}>
                {this.renderValue()}
            </div>
        );
    }
};

const { mixin, component } = builder(displayTextMixin);
export { mixin, component };
export default { mixin, component };
