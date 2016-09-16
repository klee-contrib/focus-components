'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

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
    var formatter = _ref.formatter;
    var style = _ref.style;
    var value = _ref.value;

    var formattedValue = _i18next2.default.t(formatter(value));
    return _react2.default.createElement(
        'div',
        { className: style },
        formattedValue
    );
}

//Static props.
DisplayText.displayName = 'DisplayText';
DisplayText.defaultProps = defaultProps;
DisplayText.propTypes = propTypes;

exports.default = DisplayText;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRQcm9wcyIsImZvcm1hdHRlciIsImRhdGEiLCJwcm9wVHlwZXMiLCJmdW5jIiwibmFtZSIsInN0cmluZyIsInN0eWxlIiwib2JqZWN0IiwidmFsdWUiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJEaXNwbGF5VGV4dCIsImZvcm1hdHRlZFZhbHVlIiwidCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxlQUFlO0FBQ2pCQyxlQUFXLG1CQUFDQyxJQUFEO0FBQUEsZUFBVUEsSUFBVjtBQUFBO0FBRE0sQ0FBckI7O0FBSUEsSUFBTUMsWUFBWTtBQUNkRixlQUFXLGlCQUFVRyxJQURQO0FBRWRDLFVBQU0saUJBQVVDLE1BRkY7QUFHZEMsV0FBTyxpQkFBVUMsTUFISDtBQUlkQyxXQUFPLGlCQUFVQyxTQUFWLENBQW9CLENBQUMsaUJBQVVKLE1BQVgsRUFBbUIsaUJBQVVLLE1BQTdCLENBQXBCO0FBSk8sQ0FBbEI7O0FBT0E7QUFDQSxTQUFTQyxXQUFULE9BQWdEO0FBQUEsUUFBMUJYLFNBQTBCLFFBQTFCQSxTQUEwQjtBQUFBLFFBQWZNLEtBQWUsUUFBZkEsS0FBZTtBQUFBLFFBQVJFLEtBQVEsUUFBUkEsS0FBUTs7QUFDNUMsUUFBTUksaUJBQWlCLGtCQUFRQyxDQUFSLENBQVViLFVBQVVRLEtBQVYsQ0FBVixDQUF2QjtBQUNBLFdBQ0k7QUFBQTtBQUFBLFVBQUssV0FBV0YsS0FBaEI7QUFBd0JNO0FBQXhCLEtBREo7QUFHSDs7QUFFRDtBQUNBRCxZQUFZRyxXQUFaLEdBQTBCLGFBQTFCO0FBQ0FILFlBQVlaLFlBQVosR0FBMkJBLFlBQTNCO0FBQ0FZLFlBQVlULFNBQVosR0FBd0JBLFNBQXhCOztrQkFFZVMsVyIsImZpbGUiOiJmci1GUi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGZvcm1hdHRlcjogKGRhdGEpID0+IGRhdGFcclxufTtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGZvcm1hdHRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxyXG59O1xyXG5cclxuLy92MiA6IHJlcGxhY2UgZGl2IGJ5IHNwYW5cclxuZnVuY3Rpb24gRGlzcGxheVRleHQoe2Zvcm1hdHRlciwgc3R5bGUsIHZhbHVlfSkge1xyXG4gICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSBpMThuZXh0LnQoZm9ybWF0dGVyKHZhbHVlKSk7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlfT57Zm9ybWF0dGVkVmFsdWV9PC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG4vL1N0YXRpYyBwcm9wcy5cclxuRGlzcGxheVRleHQuZGlzcGxheU5hbWUgPSAnRGlzcGxheVRleHQnO1xyXG5EaXNwbGF5VGV4dC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbkRpc3BsYXlUZXh0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERpc3BsYXlUZXh0O1xyXG4iXX0=