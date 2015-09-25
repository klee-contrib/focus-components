'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _toggle = require('./toggle');

var _toggle2 = _interopRequireDefault(_toggle);

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

exports['default'] = {
    Checkbox: _checkbox2['default'],
    Date: _date2['default'],
    Text: _text2['default'],
    Toggle: _toggle2['default'],
    Select: _select2['default']
};
module.exports = exports['default'];