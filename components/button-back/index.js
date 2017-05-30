'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _history = require('focus-core/history');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
    back: _react.PropTypes.func
};

function ButtonBack(_ref) {
    var back = _ref.back;

    return _react2.default.createElement(_button2.default, {
        handleOnClick: back || _history.back,
        icon: 'keyboard_backspace',
        label: 'button.back',
        shape: null,
        type: 'button'
    });
}

ButtonBack.propTypes = propTypes;

exports.default = ButtonBack;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJiYWNrIiwiZnVuYyIsIkJ1dHRvbkJhY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLFlBQVk7QUFDZEMsVUFBTSxpQkFBVUM7QUFERixDQUFsQjs7QUFJQSxTQUFTQyxVQUFULE9BQTRCO0FBQUEsUUFBUEYsSUFBTyxRQUFQQSxJQUFPOztBQUN4QixXQUNJO0FBQ0ksdUJBQWVBLHFCQURuQjtBQUVJLGNBQUssb0JBRlQ7QUFHSSxlQUFNLGFBSFY7QUFJSSxlQUFPLElBSlg7QUFLSSxjQUFLO0FBTFQsTUFESjtBQVNIOztBQUVERSxXQUFXSCxTQUFYLEdBQXVCQSxTQUF2Qjs7a0JBRWVHLFUiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vYnV0dG9uJztcclxuaW1wb3J0IHtiYWNrIGFzIGRlZmF1bHRCYWNrfSBmcm9tICdmb2N1cy1jb3JlL2hpc3RvcnknO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgYmFjazogUHJvcFR5cGVzLmZ1bmNcclxufTtcclxuXHJcbmZ1bmN0aW9uIEJ1dHRvbkJhY2soe2JhY2t9KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgaGFuZGxlT25DbGljaz17YmFjayB8fCBkZWZhdWx0QmFja31cclxuICAgICAgICAgICAgaWNvbj0na2V5Ym9hcmRfYmFja3NwYWNlJ1xyXG4gICAgICAgICAgICBsYWJlbD0nYnV0dG9uLmJhY2snXHJcbiAgICAgICAgICAgIHNoYXBlPXtudWxsfVxyXG4gICAgICAgICAgICB0eXBlPSdidXR0b24nIFxyXG4gICAgICAgIC8+XHJcbiAgICApO1xyXG59XHJcblxyXG5CdXR0b25CYWNrLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbkJhY2s7XHJcbiJdfQ==