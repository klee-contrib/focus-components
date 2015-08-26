// Dependencies

'use strict';

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var i18nBehaviour = require('../i18n/mixin');
var styleBehaviour = require('../../mixin/stylable');
/**
* Label mixin for form.
* @type {Object}
*/
var labelMixin = {
    mixins: [i18nBehaviour, styleBehaviour],
    /** @inheritdoc */
    propTypes: {
        name: types('string').isRequired
    },
    /** @inheritdoc */
    render: function render() {
        var _props = this.props;
        var name = _props.name;
        var style = _props.style;

        return React.createElement(
            'label',
            { className: style.className, htmlFor: name },
            this.i18n(name)
        );
    }
};

module.exports = builder(labelMixin);