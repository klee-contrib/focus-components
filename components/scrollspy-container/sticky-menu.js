'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// component default props.
var defaultProps = {
    affix: false,
    affixOffset: 0,
    menuList: []
};

// component props definition.
var propTypes = {
    affix: _react.PropTypes.bool,
    affixOffset: _react.PropTypes.number,
    menuList: _react.PropTypes.array
};

/**
* Sticky menu component.
*/

var StickyMenu = function (_Component) {
    _inherits(StickyMenu, _Component);

    function StickyMenu() {
        _classCallCheck(this, StickyMenu);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    StickyMenu.prototype.render = function render() {
        var _props = this.props,
            affix = _props.affix,
            affixOffset = _props.affixOffset,
            menuList = _props.menuList,
            otherProps = _objectWithoutProperties(_props, ['affix', 'affixOffset', 'menuList']);

        return _react2.default.createElement(
            'nav',
            _extends({ 'data-affix': affix, 'data-focus': 'sticky-menu', 'data-offset': affixOffset }, otherProps),
            _react2.default.createElement(
                'ul',
                null,
                menuList.map(function (menu) {
                    var label = menu.label,
                        nodeId = menu.nodeId,
                        isActive = menu.isActive,
                        onClick = menu.onClick;

                    return _react2.default.createElement(
                        'li',
                        { 'data-active': isActive, key: nodeId, onClick: onClick },
                        label
                    );
                })
            )
        );
    };

    return StickyMenu;
}(_react.Component);

//Static props.


StickyMenu.displayName = 'StickyMenu';
StickyMenu.defaultProps = defaultProps;
StickyMenu.propTypes = propTypes;

exports.default = StickyMenu;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJhZmZpeCIsImFmZml4T2Zmc2V0IiwibWVudUxpc3QiLCJwcm9wVHlwZXMiLCJib29sIiwibnVtYmVyIiwiYXJyYXkiLCJTdGlja3lNZW51IiwicmVuZGVyIiwicHJvcHMiLCJvdGhlclByb3BzIiwibWFwIiwibWVudSIsImxhYmVsIiwibm9kZUlkIiwiaXNBY3RpdmUiLCJvbkNsaWNrIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLGVBQWU7QUFDakJDLFdBQU8sS0FEVTtBQUVqQkMsaUJBQWEsQ0FGSTtBQUdqQkMsY0FBVTtBQUhPLENBQXJCOztBQU1BO0FBQ0EsSUFBTUMsWUFBWTtBQUNkSCxXQUFPLGlCQUFVSSxJQURIO0FBRWRILGlCQUFhLGlCQUFVSSxNQUZUO0FBR2RILGNBQVUsaUJBQVVJO0FBSE4sQ0FBbEI7O0FBTUE7Ozs7SUFHTUMsVTs7Ozs7Ozs7O0FBQ0Y7Ozs7eUJBSUFDLE0scUJBQVM7QUFBQSxxQkFDaUQsS0FBS0MsS0FEdEQ7QUFBQSxZQUNFVCxLQURGLFVBQ0VBLEtBREY7QUFBQSxZQUNTQyxXQURULFVBQ1NBLFdBRFQ7QUFBQSxZQUNzQkMsUUFEdEIsVUFDc0JBLFFBRHRCO0FBQUEsWUFDbUNRLFVBRG5DOztBQUVMLGVBQ0k7QUFBQTtBQUFBLHVCQUFLLGNBQVlWLEtBQWpCLEVBQXdCLGNBQVcsYUFBbkMsRUFBaUQsZUFBYUMsV0FBOUQsSUFBK0VTLFVBQS9FO0FBQ0k7QUFBQTtBQUFBO0FBQ0tSLHlCQUFTUyxHQUFULENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQUEsd0JBQ2JDLEtBRGEsR0FDdUJELElBRHZCLENBQ2JDLEtBRGE7QUFBQSx3QkFDTkMsTUFETSxHQUN1QkYsSUFEdkIsQ0FDTkUsTUFETTtBQUFBLHdCQUNFQyxRQURGLEdBQ3VCSCxJQUR2QixDQUNFRyxRQURGO0FBQUEsd0JBQ1lDLE9BRFosR0FDdUJKLElBRHZCLENBQ1lJLE9BRFo7O0FBRXBCLDJCQUNJO0FBQUE7QUFBQSwwQkFBSSxlQUFhRCxRQUFqQixFQUEyQixLQUFLRCxNQUFoQyxFQUF3QyxTQUFTRSxPQUFqRDtBQUEyREg7QUFBM0QscUJBREo7QUFHSCxpQkFMQTtBQURMO0FBREosU0FESjtBQVlILEs7Ozs7O0FBR0w7OztBQUNBTixXQUFXVSxXQUFYLEdBQXlCLFlBQXpCO0FBQ0FWLFdBQVdSLFlBQVgsR0FBMEJBLFlBQTFCO0FBQ0FRLFdBQVdKLFNBQVgsR0FBdUJBLFNBQXZCOztrQkFFZUksVSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gY29tcG9uZW50IGRlZmF1bHQgcHJvcHMuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGFmZml4OiBmYWxzZSxcclxuICAgIGFmZml4T2Zmc2V0OiAwLFxyXG4gICAgbWVudUxpc3Q6IFtdXHJcbn07XHJcblxyXG4vLyBjb21wb25lbnQgcHJvcHMgZGVmaW5pdGlvbi5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgYWZmaXg6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgYWZmaXhPZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBtZW51TGlzdDogUHJvcFR5cGVzLmFycmF5XHJcbn07XHJcblxyXG4vKipcclxuKiBTdGlja3kgbWVudSBjb21wb25lbnQuXHJcbiovXHJcbmNsYXNzIFN0aWNreU1lbnUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgYSBibG9jayBjb250YWluZXIgYW5kIHRoZSBjaWxkIGNvbnRlbnQgb2YgdGhlIGJsb2NrLlxyXG4gICAgKiBAcmV0dXJuIHtET019IFJlYWN0IERPTSBlbGVtZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHthZmZpeCwgYWZmaXhPZmZzZXQsIG1lbnVMaXN0LCAuLi5vdGhlclByb3BzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPG5hdiBkYXRhLWFmZml4PXthZmZpeH0gZGF0YS1mb2N1cz0nc3RpY2t5LW1lbnUnIGRhdGEtb2Zmc2V0PXthZmZpeE9mZnNldH0gey4uLm90aGVyUHJvcHN9PlxyXG4gICAgICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHttZW51TGlzdC5tYXAoKG1lbnUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge2xhYmVsLCBub2RlSWQsIGlzQWN0aXZlLCBvbkNsaWNrfSA9IG1lbnU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgZGF0YS1hY3RpdmU9e2lzQWN0aXZlfSBrZXk9e25vZGVJZH0gb25DbGljaz17b25DbGlja30+e2xhYmVsfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L25hdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1N0YXRpYyBwcm9wcy5cclxuU3RpY2t5TWVudS5kaXNwbGF5TmFtZSA9ICdTdGlja3lNZW51JztcclxuU3RpY2t5TWVudS5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcblN0aWNreU1lbnUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RpY2t5TWVudTtcclxuIl19