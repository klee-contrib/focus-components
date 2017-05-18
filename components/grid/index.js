'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies


/**
 * Grid component.
 */

function Grid(_ref) {
    var children = _ref.children,
        className = _ref.className,
        otherProps = _objectWithoutProperties(_ref, ['children', 'className']);

    return _react2.default.createElement(
        'div',
        _extends({ className: 'mdl-grid ' + (className ? className : '') }, otherProps),
        children
    );
}

Grid.propTypes = {};
//Static props.
Grid.displayName = 'Grid';

module.exports = Grid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJHcmlkIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJvdGhlclByb3BzIiwicHJvcFR5cGVzIiwiZGlzcGxheU5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7Ozs2TkFGQTtBQUNBOzs7QUFHQTs7OztBQUlDLFNBQVNBLElBQVQsT0FBb0Q7QUFBQSxRQUFyQ0MsUUFBcUMsUUFBckNBLFFBQXFDO0FBQUEsUUFBM0JDLFNBQTJCLFFBQTNCQSxTQUEyQjtBQUFBLFFBQWJDLFVBQWE7O0FBQ2hELFdBQ0k7QUFBQTtBQUFBLG1CQUFLLDBCQUF1QkQsWUFBWUEsU0FBWixHQUF3QixFQUEvQyxDQUFMLElBQThEQyxVQUE5RDtBQUNLRjtBQURMLEtBREo7QUFLSDs7QUFFRkQsS0FBS0ksU0FBTCxHQUFpQixFQUFqQjtBQUNBO0FBQ0FKLEtBQUtLLFdBQUwsR0FBbUIsTUFBbkI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUJQLElBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNlZSBodHRwOi8vd3d3LmdldG1kbC5pby9jb21wb25lbnRzL2luZGV4Lmh0bWwjbGF5b3V0LXNlY3Rpb24vZ3JpZFxyXG4vL2RlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEdyaWQgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbiBmdW5jdGlvbiBHcmlkKHtjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5vdGhlclByb3BzfSkge1xyXG4gICAgIHJldHVybiAoXHJcbiAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbWRsLWdyaWQgJHtjbGFzc05hbWUgPyBjbGFzc05hbWUgOiAnJ31gfSB7Li4ub3RoZXJQcm9wc30+XHJcbiAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICk7XHJcbiB9XHJcblxyXG5HcmlkLnByb3BUeXBlcyA9IHt9O1xyXG4vL1N0YXRpYyBwcm9wcy5cclxuR3JpZC5kaXNwbGF5TmFtZSA9ICdHcmlkJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZDtcclxuIl19