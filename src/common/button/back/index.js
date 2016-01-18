import React from 'react';

// Dependencies
import builder from 'focus-core/component/builder';
import Backbone from 'backbone';

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
            back: Backbone.history.history.back
        };
    },
    /**
    * Go back to the top of the page.
    */
    goBackHistory() {
        Backbone.history.history.back();
    },
    /** inheritedDoc */
    render() {
        return (
            <Button
                handleOnClick={this.goBackHistory}
                icon='keyboard_backspace'
                label={this.i18n('button.back')}
                shape={null}
                type='button' />
        );
    }
};

module.exports = builder(buttonBackMixin);
