'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utility = require('lodash/utility');

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

var _translation = require('../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

var Dropdown = (0, _translation2.default)(_class = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
        var _temp, _this, _ret;

        _classCallCheck(this, Dropdown);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            visible: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Dropdown.prototype.componentWillMount = function componentWillMount() {
        this._htmlId = (0, _utility.uniqueId)('focus-dropdown');
    };

    Dropdown.prototype.componentDidMount = function componentDidMount() {
        document.addEventListener('click', this._handleDocumentClick.bind(this));
    };

    Dropdown.prototype.componentWillUnmount = function componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick);
    };

    Dropdown.prototype._handleDocumentClick = function _handleDocumentClick(_ref) {
        var target = _ref.target;
        var visible = this.state.visible;

        if (visible) {
            var dropdownElement = _reactDom2.default.findDOMNode(this.refs.parent);
            if (!isDescendant(dropdownElement, target)) {
                this.setState({ visible: false });
            }
        }
    };

    Dropdown.prototype._handleIconClick = function _handleIconClick() {
        this.setState({ visible: !this.state.visible });
    };

    Dropdown.prototype._operationActionWrapper = function _operationActionWrapper(action) {
        var _this2 = this;

        return function () {
            action();
            _this2.setState({ visible: false });
        };
    };

    Dropdown.prototype.render = function render() {
        var _this3 = this;

        var _props = this.props,
            _props$iconProps = _props.iconProps,
            name = _props$iconProps.name,
            iconLibrary = _props$iconProps.iconLibrary,
            operationList = _props.operationList,
            shape = _props.shape,
            openDirection = _props.openDirection,
            buttonType = _props.buttonType;
        var visible = this.state.visible;

        var id = this._htmlId;
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'icon-dropdown', ref: 'parent' },
            _react2.default.createElement(_button2.default, {
                id: id,
                shape: shape,
                icon: name,
                iconLibrary: iconLibrary,
                handleOnClick: this._handleIconClick.bind(this),
                type: buttonType
            }),
            visible && _react2.default.createElement(
                'div',
                { 'data-focus': 'dropdown-menu', 'data-position': openDirection, ref: 'dropdown' },
                operationList.map(function (_ref2, idx) {
                    var label = _ref2.label,
                        action = _ref2.action;
                    return _react2.default.createElement(
                        'div',
                        { key: idx, 'data-role': 'dropdown-item', onClick: _this3._operationActionWrapper(action) },
                        _this3.i18n(label)
                    );
                })
            )
        );
    };

    return Dropdown;
}(_react.Component)) || _class;

Dropdown.propTypes = {
    openDirection: _react.PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right'])
};
Dropdown.defaultProps = {
    openDirection: 'bottom-left',
    iconProps: {
        name: 'more_vert',
        iconLibrary: 'material'
    },
    shape: 'fab',
    operationList: [],
    buttonType: 'submit'
};
exports.default = Dropdown;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpc0Rlc2NlbmRhbnQiLCJwYXJlbnQiLCJjaGlsZCIsIm5vZGUiLCJwYXJlbnROb2RlIiwiRHJvcGRvd24iLCJzdGF0ZSIsInZpc2libGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJfaHRtbElkIiwiY29tcG9uZW50RGlkTW91bnQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfaGFuZGxlRG9jdW1lbnRDbGljayIsImJpbmQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJkcm9wZG93bkVsZW1lbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJzZXRTdGF0ZSIsIl9oYW5kbGVJY29uQ2xpY2siLCJfb3BlcmF0aW9uQWN0aW9uV3JhcHBlciIsImFjdGlvbiIsInJlbmRlciIsInByb3BzIiwiaWNvblByb3BzIiwibmFtZSIsImljb25MaWJyYXJ5Iiwib3BlcmF0aW9uTGlzdCIsInNoYXBlIiwib3BlbkRpcmVjdGlvbiIsImJ1dHRvblR5cGUiLCJpZCIsIm1hcCIsImlkeCIsImxhYmVsIiwiaTE4biIsInByb3BUeXBlcyIsIm9uZU9mIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUdBLFNBQVNBLFlBQVQsQ0FBc0JDLE1BQXRCLEVBQThCQyxLQUE5QixFQUFxQztBQUNqQyxRQUFJQyxPQUFPRCxNQUFNRSxVQUFqQjtBQUNBLFdBQU9ELFFBQVEsSUFBZixFQUFxQjtBQUNqQixZQUFJQSxRQUFRRixNQUFaLEVBQW9CO0FBQ2hCLG1CQUFPLElBQVA7QUFDSDtBQUNERSxlQUFPQSxLQUFLQyxVQUFaO0FBQ0g7QUFDRCxXQUFPLEtBQVA7QUFDSDs7SUFFS0MsUTs7Ozs7Ozs7Ozs7O2dKQWdCRkMsSyxHQUFRO0FBQ0pDLHFC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QUFXO0FBQ1BDLGNBQU0sV0FEQztBQUVQQyxxQkFBYTtBQUZOLEtBRk87QUFNbEJFLFdBQU8sS0FOVztBQU9sQkQsbUJBQWUsRUFQRztBQVFsQkcsZ0JBQVk7QUFSTSxDO2tCQXdFWDVCLFEiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7dW5pcXVlSWR9IGZyb20gJ2xvZGFzaC91dGlsaXR5JztcclxuXHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idXR0b24nO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcblxyXG5cclxuZnVuY3Rpb24gaXNEZXNjZW5kYW50KHBhcmVudCwgY2hpbGQpIHtcclxuICAgIGxldCBub2RlID0gY2hpbGQucGFyZW50Tm9kZTtcclxuICAgIHdoaWxlIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuQFRyYW5zbGF0aW9uXHJcbmNsYXNzIERyb3Bkb3duIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgb3BlbkRpcmVjdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCddKSxcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICBvcGVuRGlyZWN0aW9uOiAnYm90dG9tLWxlZnQnLFxyXG4gICAgICAgIGljb25Qcm9wczoge1xyXG4gICAgICAgICAgICBuYW1lOiAnbW9yZV92ZXJ0JyxcclxuICAgICAgICAgICAgaWNvbkxpYnJhcnk6ICdtYXRlcmlhbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNoYXBlOiAnZmFiJyxcclxuICAgICAgICBvcGVyYXRpb25MaXN0OiBbXSxcclxuICAgICAgICBidXR0b25UeXBlOiAnc3VibWl0J1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5faHRtbElkID0gdW5pcXVlSWQoJ2ZvY3VzLWRyb3Bkb3duJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVEb2N1bWVudENsaWNrLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlRG9jdW1lbnRDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZURvY3VtZW50Q2xpY2soe3RhcmdldH0pIHtcclxuICAgICAgICBjb25zdCB7dmlzaWJsZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmICh2aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duRWxlbWVudCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5wYXJlbnQpO1xyXG4gICAgICAgICAgICBpZiAoIWlzRGVzY2VuZGFudChkcm9wZG93bkVsZW1lbnQsIHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Zpc2libGU6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZUljb25DbGljaygpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2aXNpYmxlOiAhdGhpcy5zdGF0ZS52aXNpYmxlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX29wZXJhdGlvbkFjdGlvbldyYXBwZXIoYWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Zpc2libGU6IGZhbHNlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7aWNvblByb3BzOiB7bmFtZSwgaWNvbkxpYnJhcnl9LCBvcGVyYXRpb25MaXN0LCBzaGFwZSwgb3BlbkRpcmVjdGlvbiwgYnV0dG9uVHlwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHt2aXNpYmxlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLl9odG1sSWQ7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdpY29uLWRyb3Bkb3duJyByZWY9J3BhcmVudCc+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e2lkfVxyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlPXtzaGFwZX1cclxuICAgICAgICAgICAgICAgICAgICBpY29uPXtuYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgIGljb25MaWJyYXJ5PXtpY29uTGlicmFyeX1cclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVPbkNsaWNrPXt0aGlzLl9oYW5kbGVJY29uQ2xpY2suYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtidXR0b25UeXBlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICB7dmlzaWJsZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nZHJvcGRvd24tbWVudScgZGF0YS1wb3NpdGlvbj17b3BlbkRpcmVjdGlvbn0gcmVmPSdkcm9wZG93bic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcGVyYXRpb25MaXN0Lm1hcCgoe2xhYmVsLCBhY3Rpb259LCBpZHgpID0+ICg8ZGl2IGtleT17aWR4fSBkYXRhLXJvbGU9J2Ryb3Bkb3duLWl0ZW0nIG9uQ2xpY2s9e3RoaXMuX29wZXJhdGlvbkFjdGlvbldyYXBwZXIoYWN0aW9uKX0+e3RoaXMuaTE4bihsYWJlbCl9PC9kaXY+KSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd247XHJcbiJdfQ==