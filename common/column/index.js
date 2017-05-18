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
 * Column component.
 */
var Column = function (_Component) {
    _inherits(Column, _Component);

    function Column(props) {
        _classCallCheck(this, Column);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._className = _this._className.bind(_this);
        return _this;
    }

    Column.prototype.componentWillMount = function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Column\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Column');
    };

    Column.prototype._className = function _className() {
        var _props = this.props,
            size = _props.size,
            className = _props.className;

        if (className) {
            return className;
        }
        var SIZE_CSS = size ? 'mdl-cell--' + size + '-col' : '';
        return 'mdl-cell ' + SIZE_CSS + ' ';
    };
    /** @inheriteDoc */


    Column.prototype.render = function render() {
        var _props2 = this.props,
            children = _props2.children,
            otherProps = _objectWithoutProperties(_props2, ['children']);

        var className = this._className();
        return React.createElement(
            'div',
            _extends({ className: className }, otherProps),
            children
        );
    };

    return Column;
}(Component);

//Static props.


Column.displayName = 'Column';
Column.defaultProps = {
    size: 6
};
Column.propTypes = {
    size: (0, _types2.default)('number'),
    className: (0, _types2.default)('string')
};

module.exports = Column;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJDb21wb25lbnQiLCJDb2x1bW4iLCJwcm9wcyIsIl9jbGFzc05hbWUiLCJiaW5kIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29uc29sZSIsIndhcm4iLCJzaXplIiwiY2xhc3NOYW1lIiwiU0laRV9DU1MiLCJyZW5kZXIiLCJjaGlsZHJlbiIsIm90aGVyUHJvcHMiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7OztBQUpBO0FBQ0E7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtJQUNPQyxTLEdBQWFGLEssQ0FBYkUsUzs7QUFFUDs7O0lBR01DLE07OztBQUNGLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEscURBQ2Ysc0JBQU1BLEtBQU4sQ0FEZTs7QUFFZixjQUFLQyxVQUFMLEdBQWtCLE1BQUtBLFVBQUwsQ0FBZ0JDLElBQWhCLE9BQWxCO0FBRmU7QUFHbEI7O3FCQUNEQyxrQixpQ0FBc0I7QUFDbEJDLGdCQUFRQyxJQUFSLENBQWEseUlBQWI7QUFDSCxLOztxQkFDREosVSx5QkFBYTtBQUFBLHFCQUNpQixLQUFLRCxLQUR0QjtBQUFBLFlBQ0ZNLElBREUsVUFDRkEsSUFERTtBQUFBLFlBQ0lDLFNBREosVUFDSUEsU0FESjs7QUFFVCxZQUFHQSxTQUFILEVBQWM7QUFBRSxtQkFBT0EsU0FBUDtBQUFtQjtBQUNuQyxZQUFNQyxXQUFXRixzQkFBb0JBLElBQXBCLFlBQWlDLEVBQWxEO0FBQ0EsNkJBQW1CRSxRQUFuQjtBQUNILEs7QUFDRDs7O3FCQUNBQyxNLHFCQUFTO0FBQUEsc0JBQzZCLEtBQUtULEtBRGxDO0FBQUEsWUFDRVUsUUFERixXQUNFQSxRQURGO0FBQUEsWUFDZUMsVUFEZjs7QUFFTCxZQUFNSixZQUFZLEtBQUtOLFVBQUwsRUFBbEI7QUFDQSxlQUNJO0FBQUE7QUFBQSx1QkFBSyxXQUFXTSxTQUFoQixJQUErQkksVUFBL0I7QUFDS0Q7QUFETCxTQURKO0FBS0gsSzs7O0VBdkJnQlosUzs7QUEwQnJCOzs7QUFDQUMsT0FBT2EsV0FBUCxHQUFxQixRQUFyQjtBQUNBYixPQUFPYyxZQUFQLEdBQXNCO0FBQ2xCUCxVQUFNO0FBRFksQ0FBdEI7QUFHQVAsT0FBT2UsU0FBUCxHQUFtQjtBQUNmUixVQUFNLHFCQUFNLFFBQU4sQ0FEUztBQUVmQyxlQUFXLHFCQUFNLFFBQU47QUFGSSxDQUFuQjs7QUFLQVEsT0FBT0MsT0FBUCxHQUFpQmpCLE1BQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNlZSBodHRwOi8vd3d3LmdldG1kbC5pby9jb21wb25lbnRzL2luZGV4Lmh0bWwjbGF5b3V0LXNlY3Rpb24vZ3JpZFxyXG4vL2RlcGVuZGVuY2llc1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IHtDb21wb25lbnR9ID0gUmVhY3Q7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbi8qKlxyXG4gKiBDb2x1bW4gY29tcG9uZW50LlxyXG4gKi9cclxuY2xhc3MgQ29sdW1uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuX2NsYXNzTmFtZSA9IHRoaXMuX2NsYXNzTmFtZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0ZvY3VzQ29tcG9uZW50cyB2MC4xNTogdGhlIFxcJ0NvbHVtblxcJyBjb21wb25lbnQgZnJvbSBGb2N1c0NvbXBvbmVudHMuY29tbW9uIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgRm9jdXNDb21wb25lbnRzLmNvbXBvbmVudHMuQ29sdW1uJyk7XHJcbiAgICB9XHJcbiAgICBfY2xhc3NOYW1lKCkge1xyXG4gICAgICAgIGNvbnN0IHtzaXplLCBjbGFzc05hbWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZihjbGFzc05hbWUpIHsgcmV0dXJuIGNsYXNzTmFtZTsgfVxyXG4gICAgICAgIGNvbnN0IFNJWkVfQ1NTID0gc2l6ZSA/IGBtZGwtY2VsbC0tJHtzaXplfS1jb2xgIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGBtZGwtY2VsbCAke1NJWkVfQ1NTfSBgO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0ZURvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuX2NsYXNzTmFtZSgpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHsuLi5vdGhlclByb3BzfT5cclxuICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbkNvbHVtbi5kaXNwbGF5TmFtZSA9ICdDb2x1bW4nO1xyXG5Db2x1bW4uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgc2l6ZTogNlxyXG59O1xyXG5Db2x1bW4ucHJvcFR5cGVzID0ge1xyXG4gICAgc2l6ZTogdHlwZXMoJ251bWJlcicpLFxyXG4gICAgY2xhc3NOYW1lOiB0eXBlcygnc3RyaW5nJylcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29sdW1uO1xyXG4iXX0=