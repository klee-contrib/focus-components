'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Render the boolean value.
*/
function renderValue(value) {
    var stringValue = value ? 'true' : 'false';
    return (0, _translation.translate)('display.checkbox.' + stringValue);
}

function displayCheckbox(_ref) {
    var name = _ref.name,
        value = _ref.value;

    return _react2.default.createElement(
        'div',
        { id: name, name: name },
        renderValue(value)
    );
}

displayCheckbox.defaultProps = {
    value: undefined,
    name: undefined,
    style: {}
};

displayCheckbox.propTypes = {
    type: _react.PropTypes.string,
    value: _react.PropTypes.bool,
    name: _react.PropTypes.string,
    style: _react.PropTypes.object
};

displayCheckbox.displayName = 'DisplayCheckbox';

module.exports = displayCheckbox;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZW5kZXJWYWx1ZSIsInZhbHVlIiwic3RyaW5nVmFsdWUiLCJkaXNwbGF5Q2hlY2tib3giLCJuYW1lIiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIiwic3R5bGUiLCJwcm9wVHlwZXMiLCJ0eXBlIiwic3RyaW5nIiwiYm9vbCIsIm9iamVjdCIsImRpc3BsYXlOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBRUE7OztBQUdBLFNBQVNBLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQ3hCLFFBQUlDLGNBQWNELFFBQVEsTUFBUixHQUFpQixPQUFuQztBQUNBLFdBQU8sa0RBQThCQyxXQUE5QixDQUFQO0FBQ0g7O0FBRUQsU0FBU0MsZUFBVCxPQUF3QztBQUFBLFFBQWRDLElBQWMsUUFBZEEsSUFBYztBQUFBLFFBQVJILEtBQVEsUUFBUkEsS0FBUTs7QUFDcEMsV0FDSTtBQUFBO0FBQUEsVUFBSyxJQUFJRyxJQUFULEVBQWUsTUFBTUEsSUFBckI7QUFDS0osb0JBQVlDLEtBQVo7QUFETCxLQURKO0FBS0g7O0FBRURFLGdCQUFnQkUsWUFBaEIsR0FBK0I7QUFDM0JKLFdBQU9LLFNBRG9CO0FBRTNCRixVQUFNRSxTQUZxQjtBQUczQkMsV0FBTztBQUhvQixDQUEvQjs7QUFNQUosZ0JBQWdCSyxTQUFoQixHQUE0QjtBQUN4QkMsVUFBTSxpQkFBVUMsTUFEUTtBQUV4QlQsV0FBTyxpQkFBVVUsSUFGTztBQUd4QlAsVUFBTSxpQkFBVU0sTUFIUTtBQUl4QkgsV0FBTyxpQkFBVUs7QUFKTyxDQUE1Qjs7QUFPQVQsZ0JBQWdCVSxXQUFoQixHQUE4QixpQkFBOUI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUJaLGVBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcblxyXG4vKipcclxuKiBSZW5kZXIgdGhlIGJvb2xlYW4gdmFsdWUuXHJcbiovXHJcbmZ1bmN0aW9uIHJlbmRlclZhbHVlKHZhbHVlKSB7XHJcbiAgICB2YXIgc3RyaW5nVmFsdWUgPSB2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XHJcbiAgICByZXR1cm4gdHJhbnNsYXRlKGBkaXNwbGF5LmNoZWNrYm94LiR7c3RyaW5nVmFsdWV9YCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlDaGVja2JveCh7bmFtZSwgdmFsdWV9KSB7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBpZD17bmFtZX0gbmFtZT17bmFtZX0+XHJcbiAgICAgICAgICAgIHtyZW5kZXJWYWx1ZSh2YWx1ZSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5kaXNwbGF5Q2hlY2tib3guZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdmFsdWU6IHVuZGVmaW5lZCxcclxuICAgIG5hbWU6IHVuZGVmaW5lZCxcclxuICAgIHN0eWxlOiB7fVxyXG59O1xyXG5cclxuZGlzcGxheUNoZWNrYm94LnByb3BUeXBlcyA9IHtcclxuICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxufTtcclxuXHJcbmRpc3BsYXlDaGVja2JveC5kaXNwbGF5TmFtZSA9ICdEaXNwbGF5Q2hlY2tib3gnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5Q2hlY2tib3g7XHJcbiJdfQ==