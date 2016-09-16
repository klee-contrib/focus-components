'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Render the boolean value.
*/
function renderValue(value) {
    var stringValue = value ? 'true' : 'false';
    return _i18next2.default.t('display.checkbox.' + stringValue);
}

function displayCheckbox(_ref) {
    var name = _ref.name;
    var value = _ref.value;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbInJlbmRlclZhbHVlIiwidmFsdWUiLCJzdHJpbmdWYWx1ZSIsInQiLCJkaXNwbGF5Q2hlY2tib3giLCJuYW1lIiwiZGVmYXVsdFByb3BzIiwidW5kZWZpbmVkIiwic3R5bGUiLCJwcm9wVHlwZXMiLCJ0eXBlIiwic3RyaW5nIiwiYm9vbCIsIm9iamVjdCIsImRpc3BsYXlOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR0EsU0FBU0EsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFDeEIsUUFBSUMsY0FBY0QsUUFBUSxNQUFSLEdBQWlCLE9BQW5DO0FBQ0EsV0FBTyxrQkFBUUUsQ0FBUix1QkFBOEJELFdBQTlCLENBQVA7QUFDSDs7QUFFRCxTQUFTRSxlQUFULE9BQXdDO0FBQUEsUUFBZEMsSUFBYyxRQUFkQSxJQUFjO0FBQUEsUUFBUkosS0FBUSxRQUFSQSxLQUFROztBQUNwQyxXQUNJO0FBQUE7QUFBQSxVQUFLLElBQUlJLElBQVQsRUFBZSxNQUFNQSxJQUFyQjtBQUNLTCxvQkFBWUMsS0FBWjtBQURMLEtBREo7QUFLSDs7QUFFREcsZ0JBQWdCRSxZQUFoQixHQUErQjtBQUMzQkwsV0FBT00sU0FEb0I7QUFFM0JGLFVBQU1FLFNBRnFCO0FBRzNCQyxXQUFPO0FBSG9CLENBQS9COztBQU1BSixnQkFBZ0JLLFNBQWhCLEdBQTRCO0FBQ3hCQyxVQUFNLGlCQUFVQyxNQURRO0FBRXhCVixXQUFPLGlCQUFVVyxJQUZPO0FBR3hCUCxVQUFNLGlCQUFVTSxNQUhRO0FBSXhCSCxXQUFPLGlCQUFVSztBQUpPLENBQTVCOztBQU9BVCxnQkFBZ0JVLFdBQWhCLEdBQThCLGlCQUE5Qjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQlosZUFBakIiLCJmaWxlIjoiZnItRlIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XHJcblxyXG4vKipcclxuKiBSZW5kZXIgdGhlIGJvb2xlYW4gdmFsdWUuXHJcbiovXHJcbmZ1bmN0aW9uIHJlbmRlclZhbHVlKHZhbHVlKSB7XHJcbiAgICB2YXIgc3RyaW5nVmFsdWUgPSB2YWx1ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XHJcbiAgICByZXR1cm4gaTE4bmV4dC50KGBkaXNwbGF5LmNoZWNrYm94LiR7c3RyaW5nVmFsdWV9YCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlDaGVja2JveCh7bmFtZSwgdmFsdWV9KSB7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBpZD17bmFtZX0gbmFtZT17bmFtZX0+XHJcbiAgICAgICAgICAgIHtyZW5kZXJWYWx1ZSh2YWx1ZSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5kaXNwbGF5Q2hlY2tib3guZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdmFsdWU6IHVuZGVmaW5lZCxcclxuICAgIG5hbWU6IHVuZGVmaW5lZCxcclxuICAgIHN0eWxlOiB7fVxyXG59O1xyXG5cclxuZGlzcGxheUNoZWNrYm94LnByb3BUeXBlcyA9IHtcclxuICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxufTtcclxuXHJcbmRpc3BsYXlDaGVja2JveC5kaXNwbGF5TmFtZSA9ICdEaXNwbGF5Q2hlY2tib3gnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkaXNwbGF5Q2hlY2tib3g7XHJcbiJdfQ==