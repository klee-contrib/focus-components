'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filterHtmlAttributes = require('../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies


/**
 * Column component.
 */

function _className(className, size) {
    var SIZE_CSS = size ? 'mdl-cell--' + size + '-col' : '';
    return 'mdl-cell ' + SIZE_CSS + ' ' + (className ? className : '');
};

function Column(_ref) {
    var size = _ref.size,
        className = _ref.className,
        children = _ref.children,
        otherProps = _objectWithoutProperties(_ref, ['size', 'className', 'children']);

    return _react2.default.createElement(
        'div',
        _extends({ className: _className(className, size) }, (0, _filterHtmlAttributes2.default)(otherProps)),
        children
    );
}

//Static props.
Column.displayName = 'Column';
Column.defaultProps = {
    size: 6
};
Column.propTypes = {
    size: _react.PropTypes.number,
    className: _react.PropTypes.string
};

module.exports = Column;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJfY2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwic2l6ZSIsIlNJWkVfQ1NTIiwiQ29sdW1uIiwiY2hpbGRyZW4iLCJvdGhlclByb3BzIiwiZGlzcGxheU5hbWUiLCJkZWZhdWx0UHJvcHMiLCJwcm9wVHlwZXMiLCJudW1iZXIiLCJzdHJpbmciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7OzZOQUhBO0FBQ0E7OztBQUlBOzs7O0FBSUEsU0FBU0EsVUFBVCxDQUFvQkMsU0FBcEIsRUFBK0JDLElBQS9CLEVBQXFDO0FBQ2pDLFFBQU1DLFdBQVdELHNCQUFvQkEsSUFBcEIsWUFBaUMsRUFBbEQ7QUFDQSx5QkFBbUJDLFFBQW5CLFVBQStCRixZQUFZQSxTQUFaLEdBQXdCLEVBQXZEO0FBQ0g7O0FBRUQsU0FBU0csTUFBVCxPQUE0RDtBQUFBLFFBQTNDRixJQUEyQyxRQUEzQ0EsSUFBMkM7QUFBQSxRQUFyQ0QsU0FBcUMsUUFBckNBLFNBQXFDO0FBQUEsUUFBMUJJLFFBQTBCLFFBQTFCQSxRQUEwQjtBQUFBLFFBQWJDLFVBQWE7O0FBRXhELFdBQ0k7QUFBQTtBQUFBLG1CQUFLLFdBQVdOLFdBQVdDLFNBQVgsRUFBc0JDLElBQXRCLENBQWhCLElBQWtELG9DQUFZSSxVQUFaLENBQWxEO0FBQ0tEO0FBREwsS0FESjtBQUtIOztBQUVEO0FBQ0FELE9BQU9HLFdBQVAsR0FBcUIsUUFBckI7QUFDQUgsT0FBT0ksWUFBUCxHQUFzQjtBQUNsQk4sVUFBTTtBQURZLENBQXRCO0FBR0FFLE9BQU9LLFNBQVAsR0FBbUI7QUFDZlAsVUFBTSxpQkFBVVEsTUFERDtBQUVmVCxlQUFXLGlCQUFVVTtBQUZOLENBQW5COztBQUtBQyxPQUFPQyxPQUFQLEdBQWlCVCxNQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZWUgaHR0cDovL3d3dy5nZXRtZGwuaW8vY29tcG9uZW50cy9pbmRleC5odG1sI2xheW91dC1zZWN0aW9uL2dyaWRcclxuLy9kZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGZpbHRlclByb3BzIGZyb20gJy4uLy4uL3V0aWxzL2ZpbHRlci1odG1sLWF0dHJpYnV0ZXMnO1xyXG5cclxuLyoqXHJcbiAqIENvbHVtbiBjb21wb25lbnQuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gX2NsYXNzTmFtZShjbGFzc05hbWUsIHNpemUpIHtcclxuICAgIGNvbnN0IFNJWkVfQ1NTID0gc2l6ZSA/IGBtZGwtY2VsbC0tJHtzaXplfS1jb2xgIDogJyc7XHJcbiAgICByZXR1cm4gYG1kbC1jZWxsICR7U0laRV9DU1N9ICR7Y2xhc3NOYW1lID8gY2xhc3NOYW1lIDogJyd9YDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIENvbHVtbih7c2l6ZSwgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ub3RoZXJQcm9wc30pIHtcclxuXHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e19jbGFzc05hbWUoY2xhc3NOYW1lLCBzaXplKSB9IHsuLi5maWx0ZXJQcm9wcyhvdGhlclByb3BzKX0+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5Db2x1bW4uZGlzcGxheU5hbWUgPSAnQ29sdW1uJztcclxuQ29sdW1uLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHNpemU6IDZcclxufTtcclxuQ29sdW1uLnByb3BUeXBlcyA9IHtcclxuICAgIHNpemU6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29sdW1uO1xyXG4iXX0=