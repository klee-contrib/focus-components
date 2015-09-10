// Dependencies

'use strict';

var builder = require('focus').component.builder;

// Mixins

var i18nMixin = require('../../../../common/i18n/mixin');

var DefaultEmpty = {
    mixins: [i18nMixin],
    render: function render() {
        return React.createElement(
            'div',
            { 'data-focus': 'empty-result' },
            this.i18n('search.empty')
        );
    }
};

module.exports = builder(DefaultEmpty);