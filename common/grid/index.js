'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
var React = require('react');
var Component = React.Component;

/**
 * Grid component.
 */
var Grid = function (_Component) {
    _inherits(Grid, _Component);

    function Grid(props) {
        _classCallCheck(this, Grid);

        return _possibleConstructorReturn(this, _Component.call(this, props));
    }

    Grid.prototype.componentWillMount = function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Grid\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Grid');
    };
    /** @inheriteDoc */


    Grid.prototype.render = function render() {
        var _props = this.props,
            children = _props.children,
            otherProps = _objectWithoutProperties(_props, ['children']);

        return React.createElement(
            'div',
            _extends({ className: 'mdl-grid' }, otherProps),
            children
        );
    };

    return Grid;
}(Component);

Grid.propTypes = {};

//Static props.
Grid.displayName = 'Grid';
module.exports = Grid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJDb21wb25lbnQiLCJHcmlkIiwicHJvcHMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb25zb2xlIiwid2FybiIsInJlbmRlciIsImNoaWxkcmVuIiwib3RoZXJQcm9wcyIsInByb3BUeXBlcyIsImRpc3BsYXlOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7O0FBSkE7QUFDQTtBQUNBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkO0lBQ09DLFMsR0FBYUYsSyxDQUFiRSxTOztBQUVQOzs7SUFHTUMsSTs7O0FBQ0Ysa0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxnREFDZixzQkFBTUEsS0FBTixDQURlO0FBRWxCOzttQkFDREMsa0IsaUNBQXNCO0FBQ2xCQyxnQkFBUUMsSUFBUixDQUFhLHFJQUFiO0FBQ0gsSztBQUNEOzs7bUJBQ0FDLE0scUJBQVM7QUFBQSxxQkFDNkIsS0FBS0osS0FEbEM7QUFBQSxZQUNFSyxRQURGLFVBQ0VBLFFBREY7QUFBQSxZQUNlQyxVQURmOztBQUVMLGVBQ0k7QUFBQTtBQUFBLHVCQUFLLFdBQVUsVUFBZixJQUE4QkEsVUFBOUI7QUFDS0Q7QUFETCxTQURKO0FBS0gsSzs7O0VBZmNQLFM7O0FBa0JuQkMsS0FBS1EsU0FBTCxHQUFpQixFQUFqQjs7QUFFQTtBQUNBUixLQUFLUyxXQUFMLEdBQW1CLE1BQW5CO0FBQ0FDLE9BQU9DLE9BQVAsR0FBaUJYLElBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNlZSBodHRwOi8vd3d3LmdldG1kbC5pby9jb21wb25lbnRzL2luZGV4Lmh0bWwjbGF5b3V0LXNlY3Rpb24vZ3JpZFxyXG4vL2RlcGVuZGVuY2llc1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IHtDb21wb25lbnR9ID0gUmVhY3Q7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbi8qKlxyXG4gKiBHcmlkIGNvbXBvbmVudC5cclxuICovXHJcbmNsYXNzIEdyaWQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignRm9jdXNDb21wb25lbnRzIHYwLjE1OiB0aGUgXFwnR3JpZFxcJyBjb21wb25lbnQgZnJvbSBGb2N1c0NvbXBvbmVudHMuY29tbW9uIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgRm9jdXNDb21wb25lbnRzLmNvbXBvbmVudHMuR3JpZCcpO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0ZURvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtZ3JpZCcgey4uLm90aGVyUHJvcHN9PlxyXG4gICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5HcmlkLnByb3BUeXBlcyA9IHt9O1xyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbkdyaWQuZGlzcGxheU5hbWUgPSAnR3JpZCc7XHJcbm1vZHVsZS5leHBvcnRzID0gR3JpZDtcclxuIl19