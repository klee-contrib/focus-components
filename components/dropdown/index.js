'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

var _translation = require('focus-core/translation');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        return _possibleConstructorReturn(this, _Component.call(this, props));
    }

    /**
     * Component will mount
     */


    Dropdown.prototype.componentWillMount = function componentWillMount() {
        this._htmlId = _uuid2.default.v4();
    };

    /**
     * Called when component is mounted.
     */


    Dropdown.prototype.componentDidMount = function componentDidMount() {
        if (0 !== this.props.operationList.length && _reactDom2.default.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(_reactDom2.default.findDOMNode(this.refs.dropdown));
        }
    };

    /**
     * Component will receive props.
     * @param {Object} nextProps the next props
     */


    Dropdown.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (0 !== nextProps.operationList.length && _reactDom2.default.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(_reactDom2.default.findDOMNode(this.refs.dropdown));
        }
    };

    /**
     * Called before component is unmounted.
     */


    Dropdown.prototype.componentWillUnmount = function componentWillUnmount() {
        if (0 !== this.props.operationList.length && _reactDom2.default.findDOMNode(this.refs.dropdown)) {
            componentHandler.downgradeElements(_reactDom2.default.findDOMNode(this.refs.dropdown));
        }
    };

    /**
     * Render the component.
     * @returns  {XML} Htm code.
     */


    Dropdown.prototype.render = function render() {
        var _props = this.props,
            iconProps = _props.iconProps,
            operationList = _props.operationList,
            position = _props.position,
            shape = _props.shape;

        var id = this._htmlId;
        if (0 === operationList.length) {
            return null;
        }
        return _react2.default.createElement(ActionMenu, { id: id, iconProps: iconProps, operationList: operationList, position: position, shape: shape });
    };

    return Dropdown;
}(_react.Component);

var ActionMenu = function (_React$Component) {
    _inherits(ActionMenu, _React$Component);

    /**
     * Handle action on selected item.
     * @param {function} action Action to call
     * @returns {function} Function called when item is selected.
     * @private
     */

    function ActionMenu(props) {
        _classCallCheck(this, ActionMenu);

        var _this2 = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this2.state = {
            menuVisible: false
        };
        return _this2;
    }

    ActionMenu.prototype._handleAction = function _handleAction(action) {
        var _this3 = this;

        return function () {
            if (_this3.props.operationParam) {
                action(_this3.props.operationParam);
            } else {
                action();
            }
        };
    };

    ActionMenu.prototype._handleButtonClick = function _handleButtonClick() {
        this.setState({ menuVisible: !this.state.menuVisible });
    };

    ActionMenu.prototype.renderMenuItems = function renderMenuItems(menuVisible, operationList) {
        var _this4 = this;

        operationList.map(function (operation, idx) {

            return _react2.default.createElement(
                'li',
                { className: 'mdl-menu__item ' + operation.style, key: idx,
                    onClick: _this4._handleAction(operation.action) },
                (0, _translation.translate)(operation.label)
            );
        });
    };

    ActionMenu.prototype.render = function render() {
        var _this5 = this;

        var menuVisible = this.state.menuVisible;
        var _props2 = this.props,
            id = _props2.id,
            iconProps = _props2.iconProps,
            operationList = _props2.operationList,
            position = _props2.position,
            shape = _props2.shape;

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_button2.default, { icon: iconProps.name, id: id, isJs: true, shape: shape,
                handleOnClick: this._handleButtonClick.bind(this) }),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    { className: 'mdl-menu mdl-menu--bottom-' + position + ' mdl-js-menu mdl-js-ripple-effect',
                        htmlFor: id,
                        ref: 'dropdown' },
                    operationList.map(function (operation, idx) {

                        return _react2.default.createElement(
                            'li',
                            { className: 'mdl-menu__item ' + operation.style, key: idx,
                                onClick: _this5._handleAction(operation.action) },
                            (0, _translation.translate)(operation.label)
                        );
                    })
                )
            )
        );
    };

    return ActionMenu;
}(_react2.default.Component);

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
    position: 'right',
    iconProps: {
        name: 'more_vert'
    },
    shape: 'icon',
    operationList: []
};
Dropdown.propTypes = {
    position: _react.PropTypes.string,
    iconProps: _react.PropTypes.object,
    operationList: _react.PropTypes.array,
    shape: _react.PropTypes.string
};
exports.default = Dropdown;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJEcm9wZG93biIsInByb3BzIiwiY29tcG9uZW50V2lsbE1vdW50IiwiX2h0bWxJZCIsInY0IiwiY29tcG9uZW50RGlkTW91bnQiLCJvcGVyYXRpb25MaXN0IiwibGVuZ3RoIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiZHJvcGRvd24iLCJjb21wb25lbnRIYW5kbGVyIiwidXBncmFkZUVsZW1lbnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJkb3duZ3JhZGVFbGVtZW50cyIsInJlbmRlciIsImljb25Qcm9wcyIsInBvc2l0aW9uIiwic2hhcGUiLCJpZCIsIkFjdGlvbk1lbnUiLCJzdGF0ZSIsIm1lbnVWaXNpYmxlIiwiX2hhbmRsZUFjdGlvbiIsImFjdGlvbiIsIm9wZXJhdGlvblBhcmFtIiwiX2hhbmRsZUJ1dHRvbkNsaWNrIiwic2V0U3RhdGUiLCJyZW5kZXJNZW51SXRlbXMiLCJtYXAiLCJvcGVyYXRpb24iLCJpZHgiLCJzdHlsZSIsImxhYmVsIiwibmFtZSIsImJpbmQiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsInN0cmluZyIsIm9iamVjdCIsImFycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsUTs7O0FBQ0Ysc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxnREFDZixzQkFBTUEsS0FBTixDQURlO0FBRWxCOztBQUVEOzs7Ozt1QkFHQUMsa0IsaUNBQXFCO0FBQ2pCLGFBQUtDLE9BQUwsR0FBZSxlQUFLQyxFQUFMLEVBQWY7QUFDSCxLOztBQUVEOzs7Ozt1QkFHQUMsaUIsZ0NBQW9CO0FBQ2hCLFlBQUksTUFBTSxLQUFLSixLQUFMLENBQVdLLGFBQVgsQ0FB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LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuaW1wb3J0IHt0cmFuc2xhdGV9IGZyb20gJ2ZvY3VzLWNvcmUvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcclxuXHJcbmNsYXNzIERyb3Bkb3duIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tcG9uZW50IHdpbGwgbW91bnRcclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX2h0bWxJZCA9IHV1aWQudjQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIGNvbXBvbmVudCBpcyBtb3VudGVkLlxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBpZiAoMCAhPT0gdGhpcy5wcm9wcy5vcGVyYXRpb25MaXN0Lmxlbmd0aCAmJiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZHJvcGRvd24pKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudEhhbmRsZXIudXBncmFkZUVsZW1lbnQoUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmRyb3Bkb3duKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tcG9uZW50IHdpbGwgcmVjZWl2ZSBwcm9wcy5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBuZXh0UHJvcHMgdGhlIG5leHQgcHJvcHNcclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBpZiAoMCAhPT0gbmV4dFByb3BzLm9wZXJhdGlvbkxpc3QubGVuZ3RoICYmIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kcm9wZG93bikpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZHJvcGRvd24pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYmVmb3JlIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQuXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGlmICgwICE9PSB0aGlzLnByb3BzLm9wZXJhdGlvbkxpc3QubGVuZ3RoICYmIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kcm9wZG93bikpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci5kb3duZ3JhZGVFbGVtZW50cyhSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZHJvcGRvd24pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudC5cclxuICAgICAqIEByZXR1cm5zICB7WE1MfSBIdG0gY29kZS5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpY29uUHJvcHMsIG9wZXJhdGlvbkxpc3QsIHBvc2l0aW9uLCBzaGFwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5faHRtbElkO1xyXG4gICAgICAgIGlmICgwID09PSBvcGVyYXRpb25MaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEFjdGlvbk1lbnUgaWQ9e2lkfSBpY29uUHJvcHM9e2ljb25Qcm9wc30gb3BlcmF0aW9uTGlzdD17b3BlcmF0aW9uTGlzdH0gcG9zaXRpb249e3Bvc2l0aW9ufSBzaGFwZT17c2hhcGV9Lz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmNsYXNzIEFjdGlvbk1lbnUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgYWN0aW9uIG9uIHNlbGVjdGVkIGl0ZW0uXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhY3Rpb24gQWN0aW9uIHRvIGNhbGxcclxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gRnVuY3Rpb24gY2FsbGVkIHdoZW4gaXRlbSBpcyBzZWxlY3RlZC5cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBtZW51VmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBfaGFuZGxlQWN0aW9uKGFjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9wZXJhdGlvblBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24odGhpcy5wcm9wcy5vcGVyYXRpb25QYXJhbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUJ1dHRvbkNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe21lbnVWaXNpYmxlOiAhdGhpcy5zdGF0ZS5tZW51VmlzaWJsZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlck1lbnVJdGVtcyhtZW51VmlzaWJsZSxvcGVyYXRpb25MaXN0KSB7XHJcbiAgICAgICAgb3BlcmF0aW9uTGlzdC5tYXAoKG9wZXJhdGlvbiwgaWR4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtgbWRsLW1lbnVfX2l0ZW0gJHtvcGVyYXRpb24uc3R5bGV9YH0ga2V5PXtpZHh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9oYW5kbGVBY3Rpb24ob3BlcmF0aW9uLmFjdGlvbil9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zbGF0ZShvcGVyYXRpb24ubGFiZWwpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge21lbnVWaXNpYmxlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge2lkLGljb25Qcm9wcywgb3BlcmF0aW9uTGlzdCwgcG9zaXRpb24sIHNoYXBlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gaWNvbj17aWNvblByb3BzLm5hbWV9IGlkPXtpZH0gaXNKcz17dHJ1ZX0gc2hhcGU9e3NoYXBlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVPbkNsaWNrPXt0aGlzLl9oYW5kbGVCdXR0b25DbGljay5iaW5kKHRoaXMpfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXtgbWRsLW1lbnUgbWRsLW1lbnUtLWJvdHRvbS0ke3Bvc2l0aW9ufSBtZGwtanMtbWVudSBtZGwtanMtcmlwcGxlLWVmZmVjdGB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e2lkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2Ryb3Bkb3duJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBvcGVyYXRpb25MaXN0Lm1hcCgob3BlcmF0aW9uLCBpZHgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtgbWRsLW1lbnVfX2l0ZW0gJHtvcGVyYXRpb24uc3R5bGV9YH0ga2V5PXtpZHh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2hhbmRsZUFjdGlvbihvcGVyYXRpb24uYWN0aW9uKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2xhdGUob3BlcmF0aW9uLmxhYmVsKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuRHJvcGRvd24uZGlzcGxheU5hbWUgPSAnRHJvcGRvd24nO1xyXG5Ecm9wZG93bi5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBwb3NpdGlvbjogJ3JpZ2h0JyxcclxuICAgIGljb25Qcm9wczoge1xyXG4gICAgICAgIG5hbWU6ICdtb3JlX3ZlcnQnXHJcbiAgICB9LFxyXG4gICAgc2hhcGU6ICdpY29uJyxcclxuICAgIG9wZXJhdGlvbkxpc3Q6IFtdXHJcbn07XHJcbkRyb3Bkb3duLnByb3BUeXBlcyA9IHtcclxuICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaWNvblByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgb3BlcmF0aW9uTGlzdDogUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgc2hhcGU6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd247XHJcbiJdfQ==