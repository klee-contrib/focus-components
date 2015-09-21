// Dependencies

const {builder} = require('focus-core').component;
const backbone = require('backbone');

// Mixins

const i18nMixin = require('../../i18n/mixin');
const stylableMixin = require('../../../mixin/stylable');

// Components

const Button = require('../action').component;

/**
* Mixin button.
* @type {Object}
*/
const buttonBackMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin],
    /**
    * Get default props
    * @return {Object} default props
    */
    getDefaultProps(){
        return {
            back: backbone.history.history.back
        };
    },
    /**
    * Go back to the top of the page.
    */
    goBackHistory() {
        backbone.history.history.back();
    },
    /** inheritedDoc */
    render() {
        return (
            <Button
                handleOnClick={this.goBackHistory}
                icon='keyboard_backspace'
                label={this.i18n('button.back')}
                shape='fakeShapeToDisplayNothing'
                type='icon'
                />
        );
    }
};

module.exports = builder(buttonBackMixin);
