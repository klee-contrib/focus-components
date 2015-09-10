// Dependencies

'use strict';

var builder = require('focus').component.builder;

var backbone = require('backbone');

// Mixins

var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');

// Components

var Button = require('../action').component;

/**
* Mixin button.
* @type {Object}
*/
var buttonBackMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin],
    /**
    * Get default props
    * @return {Object} default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            back: backbone.history.history.back
        };
    },
    /**
    * Go back to the top of the page.
    */
    goBackHistory: function goBackHistory() {
        backbone.history.history.back();
    },
    /** inheritedDoc */
    render: function render() {
        return React.createElement(Button, {
            handleOnClick: this.goBackHistory,
            icon: 'keyboard_backspace',
            label: this.i18n('button.back'),
            shape: 'fakeShapeToDisplayNothing',
            type: 'icon'
        });
    }
};

module.exports = builder(buttonBackMixin);