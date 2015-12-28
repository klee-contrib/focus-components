// Dependencies
const React = require('react');
const builder = require('focus-core').component.builder;

// Mixins
const i18nMixin = require('../../../../common/i18n/mixin');

const DefaultEmpty = {
    mixins: [i18nMixin],
    render() {
        return (
                <div data-focus='empty-result'>
                    {this.i18n('search.empty')}
                </div>
            );
    }
};

module.exports = builder(DefaultEmpty);
