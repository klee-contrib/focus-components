'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DisplayTextArea = function DisplayTextArea(_ref) {
    var value = _ref.value;
    return _react2.default.createElement(
        'div',
        { 'data-focus': 'display-textarea' },
        value
    );
};

var propTypes = {
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};
DisplayTextArea.propTypes = propTypes;

exports.default = DisplayTextArea;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJEaXNwbGF5VGV4dEFyZWEiLCJ2YWx1ZSIsInByb3BUeXBlcyIsIm9uZU9mVHlwZSIsInN0cmluZyIsIm51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLGtCQUFrQixTQUFsQkEsZUFBa0I7QUFBQSxRQUFFQyxLQUFGLFFBQUVBLEtBQUY7QUFBQSxXQUNwQjtBQUFBO0FBQUEsVUFBSyxjQUFXLGtCQUFoQjtBQUNLQTtBQURMLEtBRG9CO0FBQUEsQ0FBeEI7O0FBTUEsSUFBTUMsWUFBWTtBQUNkRCxXQUFPLGlCQUFVRSxTQUFWLENBQW9CLENBQ3ZCLGlCQUFVQyxNQURhLEVBRXZCLGlCQUFVQyxNQUZhLENBQXBCO0FBRE8sQ0FBbEI7QUFNQUwsZ0JBQWdCRSxTQUFoQixHQUE0QkEsU0FBNUI7O2tCQUVlRixlIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBEaXNwbGF5VGV4dEFyZWEgPSAoe3ZhbHVlfSkgPT4gKFxyXG4gICAgPGRpdiBkYXRhLWZvY3VzPSdkaXNwbGF5LXRleHRhcmVhJz5cclxuICAgICAgICB7dmFsdWV9XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIFByb3BUeXBlcy5udW1iZXJcclxuICAgIF0pXHJcbn1cclxuRGlzcGxheVRleHRBcmVhLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERpc3BsYXlUZXh0QXJlYTtcclxuIl19