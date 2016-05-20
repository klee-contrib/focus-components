import React from 'react';

// Dependencies
import builder from 'focus-core/component/builder';
import {history} from 'focus-core/history';

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
    /** inheritedDoc */
    componentWillMount () {
        console.warn('FocusComponents v0.15: this component is deprecated, please use FocusComponents.components.Back');
    },
    render() {
        return (
            <Button
                handleOnClick={() => {history.back()}}
                icon='keyboard_backspace'
                label={this.i18n('button.back')}
                shape={null}
                type='button' />
        );
    }
};

module.exports = builder(buttonBackMixin);
