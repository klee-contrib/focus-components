'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {
    formatter: function formatter(data) {
        return data;
    }
};

var propTypes = {
    formatter: _react.PropTypes.func,
    name: _react.PropTypes.string,
    style: _react.PropTypes.object,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

//v2 : replace div by span
function DisplayText(_ref) {
    var formatter = _ref.formatter,
        style = _ref.style,
        value = _ref.value;

    return _react2.default.createElement(
        'div',
        { className: style },
        formatter(value)
    );
}

//Static props.
DisplayText.displayName = 'DisplayText';
DisplayText.defaultProps = defaultProps;
DisplayText.propTypes = propTypes;

exports.default = DisplayText;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJmb3JtYXR0ZXIiLCJkYXRhIiwicHJvcFR5cGVzIiwiZnVuYyIsIm5hbWUiLCJzdHJpbmciLCJzdHlsZSIsIm9iamVjdCIsInZhbHVlIiwib25lT2ZUeXBlIiwibnVtYmVyIiwiRGlzcGxheVRleHQiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLGVBQWU7QUFDakJDLGVBQVcsbUJBQUNDLElBQUQ7QUFBQSxlQUFVQSxJQUFWO0FBQUE7QUFETSxDQUFyQjs7QUFJQSxJQUFNQyxZQUFZO0FBQ2RGLGVBQVcsaUJBQVVHLElBRFA7QUFFZEMsVUFBTSxpQkFBVUMsTUFGRjtBQUdkQyxXQUFPLGlCQUFVQyxNQUhIO0FBSWRDLFdBQU8saUJBQVVDLFNBQVYsQ0FBb0IsQ0FBQyxpQkFBVUosTUFBWCxFQUFtQixpQkFBVUssTUFBN0IsQ0FBcEI7QUFKTyxDQUFsQjs7QUFPQTtBQUNBLFNBQVNDLFdBQVQsT0FBZ0Q7QUFBQSxRQUExQlgsU0FBMEIsUUFBMUJBLFNBQTBCO0FBQUEsUUFBZk0sS0FBZSxRQUFmQSxLQUFlO0FBQUEsUUFBUkUsS0FBUSxRQUFSQSxLQUFROztBQUM1QyxXQUNJO0FBQUE7QUFBQSxVQUFLLFdBQVdGLEtBQWhCO0FBQXdCTixrQkFBVVEsS0FBVjtBQUF4QixLQURKO0FBR0g7O0FBRUQ7QUFDQUcsWUFBWUMsV0FBWixHQUEwQixhQUExQjtBQUNBRCxZQUFZWixZQUFaLEdBQTJCQSxZQUEzQjtBQUNBWSxZQUFZVCxTQUFaLEdBQXdCQSxTQUF4Qjs7a0JBRWVTLFciLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgICBmb3JtYXR0ZXI6IChkYXRhKSA9PiBkYXRhXG59O1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gICAgZm9ybWF0dGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG59O1xuXG4vL3YyIDogcmVwbGFjZSBkaXYgYnkgc3BhblxuZnVuY3Rpb24gRGlzcGxheVRleHQoe2Zvcm1hdHRlciwgc3R5bGUsIHZhbHVlfSkge1xuICAgIHJldHVybihcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlfT57Zm9ybWF0dGVyKHZhbHVlKX08L2Rpdj5cbiAgICApO1xufVxuXG4vL1N0YXRpYyBwcm9wcy5cbkRpc3BsYXlUZXh0LmRpc3BsYXlOYW1lID0gJ0Rpc3BsYXlUZXh0JztcbkRpc3BsYXlUZXh0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbkRpc3BsYXlUZXh0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgRGlzcGxheVRleHQ7XG4iXX0=