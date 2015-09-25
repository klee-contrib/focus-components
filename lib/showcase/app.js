'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('material-design-lite/material');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _i18nextClient = require('i18next-client');

var _i18nextClient2 = _interopRequireDefault(_i18nextClient);

//Import focus components

require('../style');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _focusCore = require('focus-core');

var _focusCore2 = _interopRequireDefault(_focusCore);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _catalog = require('./catalog');

var _catalog2 = _interopRequireDefault(_catalog);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _resources = require('./resources');

var _resources2 = _interopRequireDefault(_resources);

require('./style/template.scss');

require('./style/demo.scss');

// exposing in windows
window.React = _react2['default'];
window.ReactDOM = _reactDom2['default'];
window.Focus = _focusCore2['default'];
window.FocusComponents = _2['default'];
window.moment = _moment2['default'];

document.addEventListener('DOMContentLoaded', function () {
    // Render the showcase
    _i18nextClient2['default'].init({ resStore: _resources2['default'], lng: 'dev' }, function () {
        console.log('Translation correctlyzzz.');
        // render the showcase into the document
        _reactDom2['default'].render(_react2['default'].createElement(
            _layout2['default'],
            { title: 'Component catalog' },
            _react2['default'].createElement(_catalog2['default'], null)
        ), document.querySelector('body'));
    });
});