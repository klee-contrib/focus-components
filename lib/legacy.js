'use strict';

var _lodashLang = require('lodash/lang');

var _inputCheckbox = require('./input/checkbox');

var _inputToggle = require('./input/toggle');

var _inputSelect = require('./input/select');

var legacy = {
    common: {
        input: {
            text: { component: InputText, mixin: InputText },
            checkbox: { component: _inputCheckbox.InputCheckbox, mixin: _inputCheckbox.InputCheckbox },
            toggle: { component: _inputToggle.InputToggle, mixin: _inputToggle.InputToggle }
        },
        select: {
            classic: { component: _inputSelect.Select, mixin: _inputSelect.Select }
        }
    }
};