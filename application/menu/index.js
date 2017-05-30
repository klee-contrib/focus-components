'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Dependencies

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _history = require('focus-core/history');

var _history2 = _interopRequireDefault(_history);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mixins

var popinProperties = require('../mixin/popin-behaviour').mixin;
var stylabe = require('../../mixin/stylable');

// Components

var Menu = {
    mixins: [stylabe, popinProperties], /** @inheritedProps*/
    /** @inheritedProps*/
    getDefaultProps: function getDefaultProps() {
        return {
            items: []
        };
    },

    /** @inheritedProps*/
    propTypes: {
        code: (0, _types2.default)('array')
    },
    /**
    * Toggle the state of the menu.
    */
    toggle: function toggle() {
        this.setState({ open: !this.state.open });
    },

    /**
    * Render the links of the menu
    */
    _renderMenuItems: function _renderMenuItems() {
        var _this = this,
            _arguments = arguments;

        return this.props.items.map(function (link, idx) {
            var clickHandler = void 0;
            if (link.route !== undefined) {
                clickHandler = function clickHandler() {
                    if (link.onClick) link.onClick.call(_this, _arguments);
                    _history2.default.navigate(link.route, true);
                };
            } else {
                clickHandler = link.onClick;
            }
            var buttonProps = _extends({
                option: 'link',
                shape: 'icon',
                type: 'button'
            }, link);
            return React.createElement(
                'li',
                { key: idx, onClick: clickHandler },
                React.createElement(_button2.default, buttonProps),
                React.createElement(
                    'span',
                    null,
                    link.name
                )
            );
        });
    },

    /** @inheriteddoc */
    render: function render() {
        var _props = this.props,
            direction = _props.direction,
            position = _props.position,
            children = _props.children;

        var className = 'menu menu-' + direction + ' menu-' + position + ' menu-' + (this.state.open ? 'open' : '') + ' ' + this._getStyleClassName();
        return React.createElement(
            'nav',
            { className: className, 'data-focus': 'menu' },
            React.createElement('div', { 'data-focus': 'menu-brand' }),
            React.createElement(
                'ul',
                { 'data-focus': 'menu-items' },
                this._renderMenuItems()
            ),
            children
        );
    }
};

module.exports = (0, _builder2.default)(Menu);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwb3BpblByb3BlcnRpZXMiLCJyZXF1aXJlIiwibWl4aW4iLCJzdHlsYWJlIiwiTWVudSIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsIml0ZW1zIiwicHJvcFR5cGVzIiwiY29kZSIsInRvZ2dsZSIsInNldFN0YXRlIiwib3BlbiIsInN0YXRlIiwiX3JlbmRlck1lbnVJdGVtcyIsInByb3BzIiwibWFwIiwibGluayIsImlkeCIsImNsaWNrSGFuZGxlciIsInJvdXRlIiwidW5kZWZpbmVkIiwib25DbGljayIsImNhbGwiLCJuYXZpZ2F0ZSIsImJ1dHRvblByb3BzIiwib3B0aW9uIiwic2hhcGUiLCJ0eXBlIiwibmFtZSIsInJlbmRlciIsImRpcmVjdGlvbiIsInBvc2l0aW9uIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJfZ2V0U3R5bGVDbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztrUUFBQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFTQTs7Ozs7O0FBUEE7O0FBRUEsSUFBTUEsa0JBQWtCQyxRQUFRLDBCQUFSLEVBQW9DQyxLQUE1RDtBQUNBLElBQU1DLFVBQVVGLFFBQVEsc0JBQVIsQ0FBaEI7O0FBRUE7O0FBSUEsSUFBTUcsT0FBTztBQUNUQyxZQUFRLENBQUNGLE9BQUQsRUFBVUgsZUFBVixDQURDLEVBQzBCO0FBQ25DO0FBQ0FNLG1CQUhTLDZCQUdTO0FBQ2QsZUFBTztBQUNIQyxtQkFBTztBQURKLFNBQVA7QUFHSCxLQVBROztBQVFUO0FBQ0FDLGVBQVc7QUFDUEMsY0FBTSxxQkFBTSxPQUFOO0FBREMsS0FURjtBQVlUOzs7QUFHQUMsVUFmUyxvQkFlQTtBQUNMLGFBQUtDLFFBQUwsQ0FBYyxFQUFDQyxNQUFNLENBQUMsS0FBS0MsS0FBTCxDQUFXRCxJQUFuQixFQUFkO0FBQ0gsS0FqQlE7O0FBa0JUOzs7QUFHQUUsb0JBckJTLDhCQXFCVTtBQUFBO0FBQUE7O0FBQ2YsZUFBTyxLQUFLQyxLQUFMLENBQVdSLEtBQVgsQ0FBaUJTLEdBQWpCLENBQXFCLFVBQUNDLElBQUQsRUFBT0MsR0FBUCxFQUFlO0FBQ3ZDLGdCQUFJQyxxQkFBSjtBQUNBLGdCQUFJRixLQUFLRyxLQUFMLEtBQWVDLFNBQW5CLEVBQThCO0FBQzFCRiwrQkFBZSx3QkFBTTtBQUNqQix3QkFBSUYsS0FBS0ssT0FBVCxFQUFrQkwsS0FBS0ssT0FBTCxDQUFhQyxJQUFiO0FBQ2xCLHNDQUFTQyxRQUFULENBQWtCUCxLQUFLRyxLQUF2QixFQUE4QixJQUE5QjtBQUNILGlCQUhEO0FBSUgsYUFMRCxNQUtPO0FBQ0hELCtCQUFlRixLQUFLSyxPQUFwQjtBQUNIO0FBQ0QsZ0JBQU1HO0FBQ0ZDLHdCQUFRLE1BRE47QUFFRkMsdUJBQU8sTUFGTDtBQUdGQyxzQkFBTTtBQUhKLGVBSUNYLElBSkQsQ0FBTjtBQU1BLG1CQUNJO0FBQUE7QUFBQSxrQkFBSSxLQUFLQyxHQUFULEVBQWMsU0FBU0MsWUFBdkI7QUFDSSxzREFBWU0sV0FBWixDQURKO0FBRUk7QUFBQTtBQUFBO0FBQU9SLHlCQUFLWTtBQUFaO0FBRkosYUFESjtBQU1ILFNBdEJNLENBQVA7QUF1QkgsS0E3Q1E7O0FBOENUO0FBQ0FDLFVBL0NTLG9CQStDQTtBQUFBLHFCQUNtQyxLQUFLZixLQUR4QztBQUFBLFlBQ0VnQixTQURGLFVBQ0VBLFNBREY7QUFBQSxZQUNhQyxRQURiLFVBQ2FBLFFBRGI7QUFBQSxZQUN1QkMsUUFEdkIsVUFDdUJBLFFBRHZCOztBQUVMLFlBQU1DLDJCQUF5QkgsU0FBekIsY0FBMkNDLFFBQTNDLGVBQTRELEtBQUtuQixLQUFMLENBQVdELElBQVgsR0FBa0IsTUFBbEIsR0FBMkIsRUFBdkYsVUFBNkYsS0FBS3VCLGtCQUFMLEVBQW5HO0FBQ0EsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFXRCxTQUFoQixFQUEyQixjQUFXLE1BQXRDO0FBQ0kseUNBQUssY0FBVyxZQUFoQixHQURKO0FBRUk7QUFBQTtBQUFBLGtCQUFJLGNBQVcsWUFBZjtBQUE2QixxQkFBS3BCLGdCQUFMO0FBQTdCLGFBRko7QUFHS21CO0FBSEwsU0FESjtBQU9IO0FBekRRLENBQWI7O0FBNERBRyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRakMsSUFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuXHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgaGlzdG9yaWMgZnJvbSAnZm9jdXMtY29yZS9oaXN0b3J5JztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuXHJcbi8vIE1peGluc1xyXG5cclxuY29uc3QgcG9waW5Qcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vbWl4aW4vcG9waW4tYmVoYXZpb3VyJykubWl4aW47XHJcbmNvbnN0IHN0eWxhYmUgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9zdHlsYWJsZScpO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5cclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2J1dHRvbic7XHJcblxyXG5jb25zdCBNZW51ID0ge1xyXG4gICAgbWl4aW5zOiBbc3R5bGFiZSwgcG9waW5Qcm9wZXJ0aWVzXSwvKiogQGluaGVyaXRlZFByb3BzKi9cclxuICAgIC8qKiBAaW5oZXJpdGVkUHJvcHMqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZWRQcm9wcyovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBjb2RlOiB0eXBlcygnYXJyYXknKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBUb2dnbGUgdGhlIHN0YXRlIG9mIHRoZSBtZW51LlxyXG4gICAgKi9cclxuICAgIHRvZ2dsZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOiAhdGhpcy5zdGF0ZS5vcGVufSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgbGlua3Mgb2YgdGhlIG1lbnVcclxuICAgICovXHJcbiAgICBfcmVuZGVyTWVudUl0ZW1zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcCgobGluaywgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjbGlja0hhbmRsZXI7XHJcbiAgICAgICAgICAgIGlmIChsaW5rLnJvdXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNsaWNrSGFuZGxlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGluay5vbkNsaWNrKSBsaW5rLm9uQ2xpY2suY2FsbCh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcmljLm5hdmlnYXRlKGxpbmsucm91dGUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsaWNrSGFuZGxlciA9IGxpbmsub25DbGljaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBidXR0b25Qcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjogJ2xpbmsnLFxyXG4gICAgICAgICAgICAgICAgc2hhcGU6ICdpY29uJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAgICAgLi4ubGlua1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGxpIGtleT17aWR4fSBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gey4uLmJ1dHRvblByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntsaW5rLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtkaXJlY3Rpb24sIHBvc2l0aW9uLCBjaGlsZHJlbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGBtZW51IG1lbnUtJHtkaXJlY3Rpb259IG1lbnUtJHtwb3NpdGlvbn0gbWVudS0ke3RoaXMuc3RhdGUub3BlbiA/ICdvcGVuJyA6ICcnfSAke3RoaXMuX2dldFN0eWxlQ2xhc3NOYW1lKCl9YDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBkYXRhLWZvY3VzPSdtZW51Jz5cclxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nbWVudS1icmFuZCc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dWwgZGF0YS1mb2N1cz0nbWVudS1pdGVtcyc+e3RoaXMuX3JlbmRlck1lbnVJdGVtcygpfTwvdWw+XHJcbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoTWVudSk7XHJcbiJdfQ==