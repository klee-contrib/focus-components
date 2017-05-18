'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

var _translation = require('../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var _require = require('lodash/utility'),
    uniqueId = _require.uniqueId;

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
        this._htmlId = uniqueId('focus-dropdown');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwidW5pcXVlSWQiLCJpc0Rlc2NlbmRhbnQiLCJwYXJlbnQiLCJjaGlsZCIsIm5vZGUiLCJwYXJlbnROb2RlIiwiRHJvcGRvd24iLCJzdGF0ZSIsInZpc2libGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJfaHRtbElkIiwiY29tcG9uZW50RGlkTW91bnQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfaGFuZGxlRG9jdW1lbnRDbGljayIsImJpbmQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0YXJnZXQiLCJkcm9wZG93bkVsZW1lbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJzZXRTdGF0ZSIsIl9oYW5kbGVJY29uQ2xpY2siLCJfb3BlcmF0aW9uQWN0aW9uV3JhcHBlciIsImFjdGlvbiIsInJlbmRlciIsInByb3BzIiwiaWNvblByb3BzIiwibmFtZSIsImljb25MaWJyYXJ5Iiwib3BlcmF0aW9uTGlzdCIsInNoYXBlIiwib3BlbkRpcmVjdGlvbiIsImJ1dHRvblR5cGUiLCJpZCIsIm1hcCIsImlkeCIsImxhYmVsIiwiaTE4biIsInByb3BUeXBlcyIsIm9uZU9mIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztlQUNtQkEsUUFBUSxnQkFBUixDO0lBQVpDLFEsWUFBQUEsUTs7QUFFUCxTQUFTQyxZQUFULENBQXNCQyxNQUF0QixFQUE4QkMsS0FBOUIsRUFBcUM7QUFDakMsUUFBSUMsT0FBT0QsTUFBTUUsVUFBakI7QUFDQSxXQUFPRCxRQUFRLElBQWYsRUFBcUI7QUFDakIsWUFBSUEsUUFBUUYsTUFBWixFQUFvQjtBQUNoQixtQkFBTyxJQUFQO0FBQ0g7QUFDREUsZUFBT0EsS0FBS0MsVUFBWjtBQUNIO0FBQ0QsV0FBTyxL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QztBQURqQm5DLFEsQ0FLS29DLFksR0FBZTtBQUNsQlQsbUJBQWUsYUFERztBQUVsQkwsZUFBVztBQUNQQyxjQUFNLFdBREM7QUFFUEMscUJBQWE7QUFGTixLQUZPO0FBTWxCRSxXQUFPLEtBTlc7QUFPbEJELG1CQUFlLEVBUEc7QUFRbEJHLGdCQUFZO0FBUk0sQztrQkF3RVg1QixRIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5jb25zdCB7dW5pcXVlSWR9ID0gcmVxdWlyZSgnbG9kYXNoL3V0aWxpdHknKTtcclxuXHJcbmZ1bmN0aW9uIGlzRGVzY2VuZGFudChwYXJlbnQsIGNoaWxkKSB7XHJcbiAgICBsZXQgbm9kZSA9IGNoaWxkLnBhcmVudE5vZGU7XHJcbiAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbkBUcmFuc2xhdGlvblxyXG5jbGFzcyBEcm9wZG93biBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgICAgIG9wZW5EaXJlY3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnXSksXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgb3BlbkRpcmVjdGlvbjogJ2JvdHRvbS1sZWZ0JyxcclxuICAgICAgICBpY29uUHJvcHM6IHtcclxuICAgICAgICAgICAgbmFtZTogJ21vcmVfdmVydCcsXHJcbiAgICAgICAgICAgIGljb25MaWJyYXJ5OiAnbWF0ZXJpYWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGFwZTogJ2ZhYicsXHJcbiAgICAgICAgb3BlcmF0aW9uTGlzdDogW10sXHJcbiAgICAgICAgYnV0dG9uVHlwZTogJ3N1Ym1pdCdcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX2h0bWxJZCA9IHVuaXF1ZUlkKCdmb2N1cy1kcm9wZG93bicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlRG9jdW1lbnRDbGljay5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVEb2N1bWVudENsaWNrKHt0YXJnZXR9KSB7XHJcbiAgICAgICAgY29uc3Qge3Zpc2libGV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAodmlzaWJsZSkge1xyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93bkVsZW1lbnQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMucGFyZW50KTtcclxuICAgICAgICAgICAgaWYgKCFpc0Rlc2NlbmRhbnQoZHJvcGRvd25FbGVtZW50LCB0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2aXNpYmxlOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVJY29uQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmlzaWJsZTogIXRoaXMuc3RhdGUudmlzaWJsZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9vcGVyYXRpb25BY3Rpb25XcmFwcGVyKGFjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2aXNpYmxlOiBmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2ljb25Qcm9wczoge25hbWUsIGljb25MaWJyYXJ5fSwgb3BlcmF0aW9uTGlzdCwgc2hhcGUsIG9wZW5EaXJlY3Rpb24sIGJ1dHRvblR5cGV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmlzaWJsZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5faHRtbElkO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0naWNvbi1kcm9wZG93bicgcmVmPSdwYXJlbnQnPlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGlkPXtpZH1cclxuICAgICAgICAgICAgICAgICAgICBzaGFwZT17c2hhcGV9XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj17bmFtZX1cclxuICAgICAgICAgICAgICAgICAgICBpY29uTGlicmFyeT17aWNvbkxpYnJhcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlT25DbGljaz17dGhpcy5faGFuZGxlSWNvbkNsaWNrLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT17YnV0dG9uVHlwZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAge3Zpc2libGUgJiZcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2Ryb3Bkb3duLW1lbnUnIGRhdGEtcG9zaXRpb249e29wZW5EaXJlY3Rpb259IHJlZj0nZHJvcGRvd24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7b3BlcmF0aW9uTGlzdC5tYXAoKHtsYWJlbCwgYWN0aW9ufSwgaWR4KSA9PiAoPGRpdiBrZXk9e2lkeH0gZGF0YS1yb2xlPSdkcm9wZG93bi1pdGVtJyBvbkNsaWNrPXt0aGlzLl9vcGVyYXRpb25BY3Rpb25XcmFwcGVyKGFjdGlvbil9Pnt0aGlzLmkxOG4obGFiZWwpfTwvZGl2PikpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duO1xyXG4iXX0=