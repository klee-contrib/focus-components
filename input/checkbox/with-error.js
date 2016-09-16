'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _material = require('../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    label: _react.PropTypes.string,
    onChange: _react.PropTypes.func.isRequired,
    value: _react.PropTypes.bool.isRequired,
    error: _react.PropTypes.string
};

var defaultProps = {
    value: false
};

var InputCheckBoxWithError = (_dec = (0, _material2.default)('mdlHolder'), _dec(_class = function (_Component) {
    _inherits(InputCheckBoxWithError, _Component);

    function InputCheckBoxWithError() {
        var _temp, _this, _ret;

        _classCallCheck(this, InputCheckBoxWithError);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getValue = function () {
            var domElement = _reactDom2.default.findDOMNode(_this.refs.checkbox);
            return domElement.checked;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    InputCheckBoxWithError.prototype.componentDidUpdate = function componentDidUpdate() {
        var value = this.props.value;

        var method = value ? 'add' : 'remove';
        var node = _reactDom2.default.findDOMNode(this.refs.mdlHolder);
        if (node) {
            node.classList[method]('is-checked');
        }
    };

    InputCheckBoxWithError.prototype.handleOnChange = function handleOnChange(_ref) {
        var checked = _ref.target.checked;
        var onChange = this.props.onChange;

        onChange(checked);
    };

    InputCheckBoxWithError.prototype.render = function render() {
        var _props = this.props;
        var label = _props.label;
        var value = _props.value;
        var error = _props.error;

        return _react2.default.createElement(
            'div',
            { 'data-error': !!error, 'data-focus': 'input-checkbox-with-error-container' },
            _react2.default.createElement(
                'label',
                { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox', ref: 'mdlHolder' },
                _react2.default.createElement('input', { checked: value, className: 'mdl-checkbox__input', onChange: this.handleOnChange.bind(this), ref: 'checkbox', type: 'checkbox' }),
                label && _react2.default.createElement(
                    'span',
                    { className: 'mdl-checkbox__label' },
                    _i18next2.default.t(label)
                ),
                error && _react2.default.createElement(
                    'span',
                    { className: 'input-checkbox__error' },
                    _i18next2.default.t(error)
                )
            )
        );
    };

    return InputCheckBoxWithError;
}(_react.Component)) || _class);


InputCheckBoxWithError.displayName = 'InputCheckBoxWithError';
InputCheckBoxWithError.propTypes = propTypes;
InputCheckBoxWithError.defaultProps = defaultProps;
exports.default = InputCheckBoxWithError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImxhYmVsIiwic3RyaW5nIiwib25DaGFuZ2UiLCJmdW5jIiwiaXNSZXF1aXJlZCIsInZhbHVlIiwiYm9vbCIsImVycm9yIiwiZGVmYXVsdFByb3BzIiwiSW5wdXRDaGVja0JveFdpdGhFcnJvciIsImdldFZhbHVlIiwiZG9tRWxlbWVudCIsImZpbmRET01Ob2RlIiwicmVmcyIsImNoZWNrYm94IiwiY2hlY2tlZCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByb3BzIiwibWV0aG9kIiwibm9kZSIsIm1kbEhvbGRlciIsImNsYXNzTGlzdCIsImhhbmRsZU9uQ2hhbmdlIiwidGFyZ2V0IiwicmVuZGVyIiwidCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDZEMsV0FBTyxpQkFBVUMsTUFESDtBQUVkQyxjQUFVLGlCQUFVQyxJQUFWLENBQWVDLFVBRlg7QUFHZEMsV0FBTyxpQkFBVUMsSUFBVixDQUFlRixVQUhSO0FBSWRHLFdBQU8saUJBQVVOO0FBSkgsQ0FBbEI7O0FBT0EsSUFBTU8sZUFBZTtBQUNqQkgsV0FBTztBQURVLENBQXJCOztJQUtNSSxzQixXQURMLHdCQUFTLFdBQVQsQztjQUNLQSxzQjs7YUFBQUEsc0I7Ozs4QkFBQUEsc0I7Ozs7OztnSkFDRkMsUSxHQUFXLFlBQU07QUFDYixnQkFBTUMsYUFBYSxtQkFBU0MsV0FBVCxDQUFxQixNQUFLQyxJQUFMLENBQVVDLFFBQS9CLENBQW5CO0FBQ0EsbUJBQU9ILFdBQVdJLE9BQWxCO0FBQ0gsUzs7O0FBSkNOLDBCLFdBTUZPLGtCLGlDQUFxQjtBQUFBLFlBQ1ZYLEtBRFUsR0FDRCxLQUFLWSxLQURKLENBQ1ZaLEtBRFU7O0FBRWpCLFlBQU1hLFNBQVNiLFFBQVEsS0FBUixHQUFnQixRQUEvQjtBQUNBLFlBQU1jLE9BQU8sbUJBQVNQLFdBQVQsQ0FBcUIsS0FBS0MsSUFBTCxDQUFVTyxTQUEvQixDQUFiO0FBQ0EsWUFBSUQsSUFBSixFQUFVO0FBQ05BLGlCQUFLRSxTQUFMLENBQWVILE1BQWYsRUFBdUIsWUFBdkI7QUFDSDtBQUNKLEs7O0FBYkNULDBCLFdBZUZhLGMsaUNBQW9DO0FBQUEsWUFBWFAsT0FBVyxRQUFwQlEsTUFBb0IsQ0FBWFIsT0FBVztBQUFBLFlBQ3pCYixRQUR5QixHQUNiLEtBQUtlLEtBRFEsQ0FDekJmLFFBRHlCOztBQUVoQ0EsaUJBQVNhLE9BQVQ7QUFDSCxLOztBQWxCQ04sMEIsV0FvQkZlLE0scUJBQVM7QUFBQSxxQkFDeUIsS0FBS1AsS0FEOUI7QUFBQSxZQUNFakIsS0FERixVQUNFQSxLQURGO0FBQUEsWUFDU0ssS0FEVCxVQUNTQSxLQURUO0FBQUEsWUFDZ0JFLEtBRGhCLFVBQ2dCQSxLQURoQjs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVksQ0FBQyxDQUFDQSxLQUFuQixFQUEwQixjQUFXLHFDQUFyQztBQUNJO0FBQUE7QUFBQSxrQkFBTyxXQUFXLG1EQUFsQixFQUF1RSxjQUFXLGdCQUFsRixFQUFtRyxLQUFJLFdBQXZHO0FBQ0kseURBQU8sU0FBU0YsS0FBaEIsRUFBdUIsV0FBVSxxQkFBakMsRUFBdUQsVUFBWSxLQUFLaUIsY0FBakIsTUFBWSxJQUFaLENBQXZELEVBQXdGLEtBQUksVUFBNUYsRUFBdUcsTUFBSyxVQUE1RyxHQURKO0FBRUt0Qix5QkFBUztBQUFBO0FBQUEsc0JBQU0sV0FBVSxxQkFBaEI7QUFBdUMsc0NBQVF5QixDQUFSLENBQVV6QixLQUFWO0FBQXZDLGlCQUZkO0FBR0tPLHlCQUFTO0FBQUE7QUFBQSxzQkFBTSxXQUFVLHVCQUFoQjtBQUF5QyxzQ0FBUWtCLENBQVIsQ0FBVWxCLEtBQVY7QUFBekM7QUFIZDtBQURKLFNBREo7QUFTSCxLOztXQS9CQ0Usc0I7Ozs7QUFrQ05BLHVCQUF1QmlCLFdBQXZCLEdBQXFDLHdCQUFyQztBQUNBakIsdUJBQXVCVixTQUF2QixHQUFtQ0EsU0FBbkM7QUFDQVUsdUJBQXVCRCxZQUF2QixHQUFzQ0EsWUFBdEM7a0JBQ2VDLHNCIiwiZmlsZSI6ImZyLUZSLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZ1xyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdmFsdWU6IGZhbHNlXHJcbn07XHJcblxyXG5ATWF0ZXJpYWwoJ21kbEhvbGRlcicpXHJcbmNsYXNzIElucHV0Q2hlY2tCb3hXaXRoRXJyb3IgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZG9tRWxlbWVudCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5jaGVja2JveCk7XHJcbiAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQuY2hlY2tlZDtcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHZhbHVlID8gJ2FkZCcgOiAncmVtb3ZlJztcclxuICAgICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLm1kbEhvbGRlcik7XHJcbiAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3RbbWV0aG9kXSgnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVPbkNoYW5nZSh7dGFyZ2V0OiB7Y2hlY2tlZH19KSB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgb25DaGFuZ2UoY2hlY2tlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtsYWJlbCwgdmFsdWUsIGVycm9yfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWVycm9yPXshIWVycm9yfSBkYXRhLWZvY3VzPSdpbnB1dC1jaGVja2JveC13aXRoLWVycm9yLWNvbnRhaW5lcic+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXsnbWRsLWNoZWNrYm94IG1kbC1qcy1jaGVja2JveCBtZGwtanMtcmlwcGxlLWVmZmVjdCd9IGRhdGEtZm9jdXM9J2lucHV0LWNoZWNrYm94JyByZWY9J21kbEhvbGRlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNoZWNrZWQ9e3ZhbHVlfSBjbGFzc05hbWU9J21kbC1jaGVja2JveF9faW5wdXQnIG9uQ2hhbmdlPXs6OnRoaXMuaGFuZGxlT25DaGFuZ2V9IHJlZj0nY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94Jy8+XHJcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsICYmIDxzcGFuIGNsYXNzTmFtZT0nbWRsLWNoZWNrYm94X19sYWJlbCc+e2kxOG5leHQudChsYWJlbCl9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3IgJiYgPHNwYW4gY2xhc3NOYW1lPSdpbnB1dC1jaGVja2JveF9fZXJyb3InPntpMThuZXh0LnQoZXJyb3IpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5JbnB1dENoZWNrQm94V2l0aEVycm9yLmRpc3BsYXlOYW1lID0gJ0lucHV0Q2hlY2tCb3hXaXRoRXJyb3InO1xyXG5JbnB1dENoZWNrQm94V2l0aEVycm9yLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuSW5wdXRDaGVja0JveFdpdGhFcnJvci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbmV4cG9ydCBkZWZhdWx0IElucHV0Q2hlY2tCb3hXaXRoRXJyb3I7XHJcbiJdfQ==