'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
function Label(_ref) {
    var name = _ref.name,
        text = _ref.text;

    var content = text || name;
    return _react2.default.createElement(
        'label',
        { 'data-focus': 'label', htmlFor: name },
        (0, _translation.translate)(content)
    );
}

Label.propTypes = {
    name: _react.PropTypes.string.isRequired,
    text: _react.PropTypes.string
};

module.exports = Label;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJMYWJlbCIsIm5hbWUiLCJ0ZXh0IiwiY29udGVudCIsInByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7O0FBQ0E7Ozs7QUFGQTtBQUlBLFNBQVNBLEtBQVQsT0FBNkI7QUFBQSxRQUFiQyxJQUFhLFFBQWJBLElBQWE7QUFBQSxRQUFQQyxJQUFPLFFBQVBBLElBQU87O0FBQ3pCLFFBQU1DLFVBQVVELFFBQVFELElBQXhCO0FBQ0EsV0FDSTtBQUFBO0FBQUEsVUFBTyxjQUFXLE9BQWxCLEVBQTBCLFNBQVNBLElBQW5DO0FBQ0ssb0NBQVVFLE9BQVY7QUFETCxLQURKO0FBS0g7O0FBRURILE1BQU1JLFNBQU4sR0FBa0I7QUFDZEgsVUFBTSxpQkFBVUksTUFBVixDQUFpQkMsVUFEVDtBQUVkSixVQUFNLGlCQUFVRztBQUZGLENBQWxCOztBQUtBRSxPQUFPQyxPQUFQLEdBQWlCUixLQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHt0cmFuc2xhdGV9IGZyb20gJ2ZvY3VzLWNvcmUvdHJhbnNsYXRpb24nO1xyXG5cclxuZnVuY3Rpb24gTGFiZWwoe25hbWUsIHRleHR9KSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGV4dCB8fCBuYW1lO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8bGFiZWwgZGF0YS1mb2N1cz1cImxhYmVsXCIgaHRtbEZvcj17bmFtZX0+XHJcbiAgICAgICAgICAgIHt0cmFuc2xhdGUoY29udGVudCl9XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICk7XHJcbn1cclxuXHJcbkxhYmVsLnByb3BUeXBlcyA9IHtcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFiZWw7XHJcbiJdfQ==