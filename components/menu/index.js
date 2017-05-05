'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _history = require('focus-core/history');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function MenuItems(props) {
    var items = props.items,
        LinkComponent = props.LinkComponent,
        navigate = props.navigate;

    return _react2.default.createElement(
        'div',
        null,
        _renderItemsList(items, LinkComponent, navigate)
    );
}
MenuItems.propTypes = {
    items: _react.PropTypes.array
};

function _renderItemsList(items, LinkComponent, navigate) {
    return items.map(function (link, idx) {
        return _react2.default.createElement(
            'li',
            { key: idx },
            _renderButton(link, LinkComponent, navigate),
            _react2.default.createElement(
                'span',
                null,
                link.name
            )
        );
    });
}

//Todo: refactor into component
function _renderButton(menuButton, LinkComponent, navigate) {
    menuButton.shape = 'icon';
    menuButton.type = 'button';

    var buttonProps = {
        shape: 'icon',
        type: 'button'
    };

    var route = menuButton.route,
        option = menuButton.option,
        otherProps = _objectWithoutProperties(menuButton, ['route', 'option']);

    var menuButtonProps = _extends({}, buttonProps, otherProps);
    var clickHandler = void 0;

    if (menuButton.route !== undefined) {
        //React router case
        if (LinkComponent) {
            //Todo: check menButton onClick use
            return _react2.default.createElement(
                LinkComponent,
                { to: menuButton.route, style: { color: 'white' } },
                _react2.default.createElement(_button2.default, menuButtonProps)
            );
        }
        //Backbone case
        clickHandler = function clickHandler() {
            if (menuButton.onClick) menuButton.onClick();
            navigate(menuButton.route, true);
        };
        return _react2.default.createElement(_button2.default, _extends({}, menuButtonProps, { onClick: clickHandler }));
    }
    //No route => Both the same treatement.
    return _react2.default.createElement(_button2.default, _extends({}, menuButtonProps, { onClick: menuButton.onClick }));
}

// default props
var defaultProps = {
    items: [],
    LinkComponent: undefined,
    MenuItems: MenuItems,
    navigate: _history.navigate
};

// props types
var propTypes = {
    navigate: _react.PropTypes.func,
    items: _react.PropTypes.array,
    handleBrandClick: _react.PropTypes.func,
    LinkComponent: _react.PropTypes.func,
    MenuItems: _react.PropTypes.func
};

function MenuLeft(props) {
    var direction = props.direction,
        handleBrandClick = props.handleBrandClick,
        position = props.position,
        children = props.children,
        items = props.items,
        LinkComponent = props.LinkComponent,
        navigate = props.navigate,
        MenuItems = props.MenuItems,
        otherProps = _objectWithoutProperties(props, ['direction', 'handleBrandClick', 'position', 'children', 'items', 'LinkComponent', 'navigate', 'MenuItems']);

    var itemRenderProps = { LinkComponent: LinkComponent, navigate: navigate };
    var hasBrandClickHandler = !!handleBrandClick;

    return _react2.default.createElement(
        'nav',
        _extends({ 'data-focus': 'menu-left' }, otherProps),
        _react2.default.createElement('div', { 'data-focus': 'menu-brand', 'data-click': hasBrandClickHandler, onClick: function onClick() {
                return handleBrandClick && handleBrandClick();
            } }),
        _react2.default.createElement(
            'ul',
            { 'data-focus': 'menu-items' },
            _react2.default.createElement(MenuItems, _extends({ items: items }, itemRenderProps))
        ),
        children
    );
}

// Static props.
MenuLeft.defaultProps = defaultProps;
MenuLeft.propTypes = propTypes;

exports.default = MenuLeft;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJNZW51SXRlbXMiLCJwcm9wcyIsIml0ZW1zIiwiTGlua0NvbXBvbmVudCIsIm5hdmlnYXRlIiwiX3JlbmRlckl0ZW1zTGlzdCIsInByb3BUeXBlcyIsImFycmF5IiwibWFwIiwibGluayIsImlkeCIsIl9yZW5kZXJCdXR0b24iLCJuYW1lIiwibWVudUJ1dHRvbiIsInNoYXBlIiwidHlwZSIsImJ1dHRvblByb3BzIiwicm91dGUiLCJvcHRpb24iLCJvdGhlclByb3BzIiwibWVudUJ1dHRvblByb3BzIiwiY2xpY2tIYW5kbGVyIiwidW5kZWZpbmVkIiwiY29sb3IiLCJvbkNsaWNrIiwiZGVmYXVsdFByb3BzIiwiZnVuYyIsImhhbmRsZUJyYW5kQ2xpY2siLCJNZW51TGVmdCIsImRpcmVjdGlvbiIsInBvc2l0aW9uIiwiY2hpbGRyZW4iLCJpdGVtUmVuZGVyUHJvcHMiLCJoYXNCcmFuZENsaWNrSGFuZGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLFNBQVNBLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQUEsUUFDZkMsS0FEZSxHQUNtQkQsS0FEbkIsQ0FDZkMsS0FEZTtBQUFBLFFBQ1JDLGFBRFEsR0FDbUJGLEtBRG5CLENBQ1JFLGFBRFE7QUFBQSxRQUNPQyxRQURQLEdBQ21CSCxLQURuQixDQUNPRyxRQURQOztBQUV0QixXQUNJO0FBQUE7QUFBQTtBQUFNQyx5QkFBaUJILEtBQWpCLEVBQXdCQyxhQUF4QixFQUF1Q0MsUUFBdkM7QUFBTixLQURKO0FBR0g7QUFDREosVUFBVU0sU0FBVixHQUFzQjtBQUNsQkosV0FBTyxpQkFBVUs7QUFEQyxDQUF0Qjs7QUFJQSxTQUFTRixnQkFBVCxDQUEwQkgsS0FBMUIsRUFBaUNDLGFBQWpDLEVBQWdEQyxRQUFoRCxFQUEwRDtBQUN0RCxXQUFPRixNQUFNTSxHQUFOLENBQVUsVUFBQ0MsSUFB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QkFBekMsRUFBK0QsU0FBUztBQUFBLHVCQUFNTixvQkFBb0JBLGtCQUExQjtBQUFBLGFBQXhFLEdBREo7QUFFSTtBQUFBO0FBQUEsY0FBSSxjQUFXLFlBQWY7QUFBNEIsMENBQUMsU0FBRCxhQUFXLE9BQU96QixLQUFsQixJQUE2QjhCLGVBQTdCO0FBQTVCLFNBRko7QUFHS0Q7QUFITCxLQURKO0FBT0g7O0FBRUQ7QUFDQUgsU0FBU0gsWUFBVCxHQUF3QkEsWUFBeEI7QUFDQUcsU0FBU3RCLFNBQVQsR0FBcUJBLFNBQXJCOztrQkFFZXNCLFEiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7bmF2aWdhdGV9IGZyb20gJ2ZvY3VzLWNvcmUvaGlzdG9yeSc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL2J1dHRvbic7XG5cbmZ1bmN0aW9uIE1lbnVJdGVtcyhwcm9wcykge1xuICAgIGNvbnN0IHtpdGVtcywgTGlua0NvbXBvbmVudCwgbmF2aWdhdGV9ID0gcHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj57X3JlbmRlckl0ZW1zTGlzdChpdGVtcywgTGlua0NvbXBvbmVudCwgbmF2aWdhdGUpfTwvZGl2PlxuICAgICk7XG59XG5NZW51SXRlbXMucHJvcFR5cGVzID0ge1xuICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlcbn1cblxuZnVuY3Rpb24gX3JlbmRlckl0ZW1zTGlzdChpdGVtcywgTGlua0NvbXBvbmVudCwgbmF2aWdhdGUpIHtcbiAgICByZXR1cm4gaXRlbXMubWFwKChsaW5rLCBpZHgpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsaSBrZXk9e2lkeH0+XG4gICAgICAgICAgICAgICAge19yZW5kZXJCdXR0b24obGluaywgTGlua0NvbXBvbmVudCwgbmF2aWdhdGUpfVxuICAgICAgICAgICAgICAgIDxzcGFuPntsaW5rLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgKTtcbiAgICB9KTtcbn1cblxuLy9Ub2RvOiByZWZhY3RvciBpbnRvIGNvbXBvbmVudFxuZnVuY3Rpb24gX3JlbmRlckJ1dHRvbihtZW51QnV0dG9uLCBMaW5rQ29tcG9uZW50LCBuYXZpZ2F0ZSkge1xuICAgIG1lbnVCdXR0b24uc2hhcGUgPSAnaWNvbic7XG4gICAgbWVudUJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG5cbiAgICBjb25zdCBidXR0b25Qcm9wcyA9IHtcbiAgICAgICAgc2hhcGU6ICdpY29uJyxcbiAgICAgICAgdHlwZTogJ2J1dHRvbidcbiAgICB9XG5cbiAgICBjb25zdCB7cm91dGUsIG9wdGlvbiwgLi4ub3RoZXJQcm9wc30gPSBtZW51QnV0dG9uO1xuICAgIGNvbnN0IG1lbnVCdXR0b25Qcm9wcyA9IHsuLi5idXR0b25Qcm9wcywgLi4ub3RoZXJQcm9wc307XG4gICAgbGV0IGNsaWNrSGFuZGxlcjtcblxuICAgIGlmKG1lbnVCdXR0b24ucm91dGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvL1JlYWN0IHJvdXRlciBjYXNlXG4gICAgICAgIGlmKExpbmtDb21wb25lbnQpe1xuICAgICAgICAgICAgLy9Ub2RvOiBjaGVjayBtZW5CdXR0b24gb25DbGljayB1c2VcbiAgICAgICAgICAgIHJldHVybiA8TGlua0NvbXBvbmVudCB0bz17bWVudUJ1dHRvbi5yb3V0ZX0gc3R5bGU9e3tjb2xvcjogJ3doaXRlJ319PjxCdXR0b24gIHsuLi5tZW51QnV0dG9uUHJvcHN9Lz48L0xpbmtDb21wb25lbnQ+XG4gICAgICAgIH1cbiAgICAgICAgLy9CYWNrYm9uZSBjYXNlXG4gICAgICAgIGNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmKG1lbnVCdXR0b24ub25DbGljaykgbWVudUJ1dHRvbi5vbkNsaWNrKCk7XG4gICAgICAgICAgICBuYXZpZ2F0ZShtZW51QnV0dG9uLnJvdXRlLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIDxCdXR0b24gey4uLm1lbnVCdXR0b25Qcm9wc30gb25DbGljaz17Y2xpY2tIYW5kbGVyfS8+XG5cbiAgICB9XG4gICAgLy9ObyByb3V0ZSA9PiBCb3RoIHRoZSBzYW1lIHRyZWF0ZW1lbnQuXG4gICAgcmV0dXJuIDxCdXR0b24gey4uLm1lbnVCdXR0b25Qcm9wc30gb25DbGljaz17bWVudUJ1dHRvbi5vbkNsaWNrfS8+XG59XG5cbi8vIGRlZmF1bHQgcHJvcHNcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpdGVtczogW10sXG4gICAgTGlua0NvbXBvbmVudDogdW5kZWZpbmVkLFxuICAgIE1lbnVJdGVtcyxcbiAgICBuYXZpZ2F0ZVxufTtcblxuLy8gcHJvcHMgdHlwZXNcbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgICBuYXZpZ2F0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheSxcbiAgICBoYW5kbGVCcmFuZENsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBMaW5rQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBNZW51SXRlbXM6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5mdW5jdGlvbiBNZW51TGVmdChwcm9wcykge1xuICAgIGNvbnN0IHtkaXJlY3Rpb24sIGhhbmRsZUJyYW5kQ2xpY2ssIHBvc2l0aW9uLCBjaGlsZHJlbiwgaXRlbXMsIExpbmtDb21wb25lbnQsIG5hdmlnYXRlLCBNZW51SXRlbXMsIC4uLm90aGVyUHJvcHN9ID0gcHJvcHM7XG4gICAgY29uc3QgaXRlbVJlbmRlclByb3BzID0ge0xpbmtDb21wb25lbnQsIG5hdmlnYXRlfTtcbiAgICBjb25zdCBoYXNCcmFuZENsaWNrSGFuZGxlciA9ICEhaGFuZGxlQnJhbmRDbGljaztcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxuYXYgZGF0YS1mb2N1cz0nbWVudS1sZWZ0JyB7Li4ub3RoZXJQcm9wc30+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J21lbnUtYnJhbmQnIGRhdGEtY2xpY2s9e2hhc0JyYW5kQ2xpY2tIYW5kbGVyfSBvbkNsaWNrPXsoKSA9PiBoYW5kbGVCcmFuZENsaWNrICYmIGhhbmRsZUJyYW5kQ2xpY2soKX0gLz5cbiAgICAgICAgICAgIDx1bCBkYXRhLWZvY3VzPSdtZW51LWl0ZW1zJz48TWVudUl0ZW1zIGl0ZW1zPXtpdGVtc30gey4uLml0ZW1SZW5kZXJQcm9wc30vPjwvdWw+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvbmF2PlxuICAgICk7XG59XG5cbi8vIFN0YXRpYyBwcm9wcy5cbk1lbnVMZWZ0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcbk1lbnVMZWZ0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgTWVudUxlZnQ7XG4iXX0=