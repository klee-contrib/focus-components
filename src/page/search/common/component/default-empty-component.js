// Dependencies

let builder = require('focus').component.builder;

// Mixins

let i18nMixin = require('../../../../common/i18n/mixin');

let DefaultEmpty = {
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
