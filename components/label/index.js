'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
function Label(_ref) {
    var name = _ref.name,
        text = _ref.text,
        isRequired = _ref.isRequired;

    var content = text || name;
    return _react2.default.createElement(
        'label',
        { 'data-focus': 'label', htmlFor: name },
        (0, _translation.translate)(content) + (isRequired ? '\u202F*' : '')
    );
}

Label.propTypes = {
    name: _react.PropTypes.string.isRequired,
    text: _react.PropTypes.string
};

module.exports = Label;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJMYWJlbCIsIm5hbWUiLCJ0ZXh0IiwiaXNSZXF1aXJlZCIsImNvbnRlbnQiLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7O0FBQ0E7Ozs7QUFGQTtBQUlBLFNBQVNBLEtBQVQsT0FBeUM7QUFBQSxRQUF6QkMsSUFBeUIsUUFBekJBLElBQXlCO0FBQUEsUUFBbkJDLElBQW1CLFFBQW5CQSxJQUFtQjtBQUFBLFFBQWJDLFVBQWEsUUFBYkEsVUFBYTs7QUFDckMsUUFBTUMsVUFBVUYsUUFBUUQsSUFBeEI7QUFDQSxXQUNJO0FBQUE7QUFBQSxVQUFPLGNBQVcsT0FBbEIsRUFBMEIsU0FBU0EsSUFBbkM7QUFDSyxvQ0FBVUcsT0FBVixLQUFzQkQsYUFBYSxTQUFiLEdBQXlCLEVBQS9DO0FBREwsS0FESjtBQUtIOztBQUVESCxNQUFNSyxTQUFOLEdBQWtCO0FBQ2RKLFVBQU0saUJBQVVLLE1BQVYsQ0FBaUJILFVBRFQ7QUFFZEQsVUFBTSxpQkFBVUk7QUFGRixDQUFsQjs7QUFLQUMsT0FBT0MsT0FBUCxHQUFpQlIsS0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcblxyXG5mdW5jdGlvbiBMYWJlbCh7bmFtZSwgdGV4dCwgaXNSZXF1aXJlZH0pIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0ZXh0IHx8IG5hbWU7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxsYWJlbCBkYXRhLWZvY3VzPVwibGFiZWxcIiBodG1sRm9yPXtuYW1lfT5cclxuICAgICAgICAgICAge3RyYW5zbGF0ZShjb250ZW50KSArIChpc1JlcXVpcmVkID8gJ1xcdTIwMmYqJyA6ICcnKX1cclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgKTtcclxufVxyXG5cclxuTGFiZWwucHJvcFR5cGVzID0ge1xyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbDtcclxuIl19