'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
        _extends({ className: _className(className, size) }, otherProps),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJfY2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwic2l6ZSIsIlNJWkVfQ1NTIiwiQ29sdW1uIiwiY2hpbGRyZW4iLCJvdGhlclByb3BzIiwiZGlzcGxheU5hbWUiLCJkZWZhdWx0UHJvcHMiLCJwcm9wVHlwZXMiLCJudW1iZXIiLCJzdHJpbmciLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7Ozs2TkFGQTtBQUNBOzs7QUFHQTs7OztBQUlBLFNBQVNBLFVBQVQsQ0FBb0JDLFNBQXBCLEVBQStCQyxJQUEvQixFQUFxQztBQUNqQyxRQUFNQyxXQUFXRCxzQkFBb0JBLElBQXBCLFlBQWlDLEVBQWxEO0FBQ0EseUJBQW1CQyxRQUFuQixVQUErQkYsWUFBWUEsU0FBWixHQUF3QixFQUF2RDtBQUNIOztBQUVELFNBQVNHLE1BQVQsT0FBNEQ7QUFBQSxRQUEzQ0YsSUFBMkMsUUFBM0NBLElBQTJDO0FBQUEsUUFBckNELFNBQXFDLFFBQXJDQSxTQUFxQztBQUFBLFFBQTFCSSxRQUEwQixRQUExQkEsUUFBMEI7QUFBQSxRQUFiQyxVQUFhOztBQUV4RCxXQUNJO0FBQUE7QUFBQSxtQkFBSyxXQUFXTixXQUFXQyxTQUFYLEVBQXNCQyxJQUF0QixDQUFoQixJQUFrREksVUFBbEQ7QUFDS0Q7QUFETCxLQURKO0FBS0g7O0FBRUQ7QUFDQUQsT0FBT0csV0FBUCxHQUFxQixRQUFyQjtBQUNBSCxPQUFPSSxZQUFQLEdBQXNCO0FBQ2xCTixVQUFNO0FBRFksQ0FBdEI7QUFHQUUsT0FBT0ssU0FBUCxHQUFtQjtBQUNmUCxVQUFNLGlCQUFVUSxNQUREO0FBRWZULGVBQVcsaUJBQVVVO0FBRk4sQ0FBbkI7O0FBS0FDLE9BQU9DLE9BQVAsR0FBaUJULE1BQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNlZSBodHRwOi8vd3d3LmdldG1kbC5pby9jb21wb25lbnRzL2luZGV4Lmh0bWwjbGF5b3V0LXNlY3Rpb24vZ3JpZFxyXG4vL2RlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIENvbHVtbiBjb21wb25lbnQuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gX2NsYXNzTmFtZShjbGFzc05hbWUsIHNpemUpIHtcclxuICAgIGNvbnN0IFNJWkVfQ1NTID0gc2l6ZSA/IGBtZGwtY2VsbC0tJHtzaXplfS1jb2xgIDogJyc7XHJcbiAgICByZXR1cm4gYG1kbC1jZWxsICR7U0laRV9DU1N9ICR7Y2xhc3NOYW1lID8gY2xhc3NOYW1lIDogJyd9YDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIENvbHVtbih7c2l6ZSwgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ub3RoZXJQcm9wc30pIHtcclxuXHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e19jbGFzc05hbWUoY2xhc3NOYW1lLCBzaXplKSB9IHsuLi5vdGhlclByb3BzfT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbkNvbHVtbi5kaXNwbGF5TmFtZSA9ICdDb2x1bW4nO1xyXG5Db2x1bW4uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgc2l6ZTogNlxyXG59O1xyXG5Db2x1bW4ucHJvcFR5cGVzID0ge1xyXG4gICAgc2l6ZTogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb2x1bW47XHJcbiJdfQ==