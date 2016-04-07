import  from 'react';

// Dependencies
import builder from 'focus-core/component/builder';
import historic from 'focus-core/history';

// Mixins
const i18nMixin = require('../../i18n/mixin');
import {translate} from 'focus-core/translation';

// Components
const ButtonAction = require('../action');

import React {Component} from 'react';

const ButtonBack = ({label, name, type, value}) => {
    return (
        <Button
            handleOnClick={() => {historic.history.back()}}
            icon='keyboard_backspace'
            label={translate('button.back')}
            shape={null}
            type='button' />
    );
};

export default ButtonBack;
