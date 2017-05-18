'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _material = require('../../../behaviours/material');

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

var InputCheckBoxWithError = (_dec = (0, _material2.default)('mdlHolder'), (0, _translation2.default)(_class = _dec(_class = function (_Component) {
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
        var _props = this.props,
            label = _props.label,
            value = _props.value,
            error = _props.error;

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
                    this.i18n(label)
                ),
                error && _react2.default.createElement(
                    'span',
                    { className: 'input-checkbox__error' },
                    this.i18n(error)
                )
            )
        );
    };

    return InputCheckBoxWithError;
}(_react.Component)) || _class) || _class);


InputCheckBoxWithError.displayName = 'InputCheckBoxWithError';
InputCheckBoxWithError.propTypes = propTypes;
InputCheckBoxWithError.defaultProps = defaultProps;
exports.default = InputCheckBoxWithError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJsYWJlbCIsInN0cmluZyIsIm9uQ2hhbmdlIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJ2YWx1ZSIsImJvb2wiLCJlcnJvciIsImRlZmF1bHRQcm9wcyIsIklucHV0Q2hlY2tCb3hXaXRoRXJyb3IiLCJnZXRWYWx1ZSIsImRvbUVsZW1lbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJjaGVja2JveCIsImNoZWNrZWQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcm9wcyIsIm1ldGhvZCIsIm5vZGUiLCJtZGxIb2xkZXIiLCJjbGFzc0xpc3QiLCJoYW5kbGVPbkNoYW5nZSIsInRhcmdldCIsInJlbmRlciIsImkxOG4iLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2RDLFdBQU8saUJBQVVDLE1BREg7QUFFZEMsY0FBVSxpQkFBVUMsSUFBVixDQUFlQyxVQUZYO0FBR2RDLFdBQU8saUJBQVVDLElBQVYsQ0FBZUYsVUFIUjtBQUlkRyxXQUFPLGlCQUFVTjtBQUpILENBQWxCOztBQU9BLElBQU1PLGVBQWU7QUFDakJILFdBQU87QUFEVSxDQUFyQjs7SUFNTUksc0IsV0FETCx3QkFBUyxXQUFULEM7Ozs7Ozs7Ozs7OztnSkFFR0MsUSxHQUFXLFlBQU07QUFDYixnQkFBTUMsYUFBYSxtQkFBU0MsV0FBVCxDQUFxQixNQUFLQyxJQUFMLENBQVVDLFFBQS9CLENBQW5CO0FBQ0EsbUJBQU9ILFdBQVdJLE9BQWxCO0FBQ0gsUzs7O3FDQUVEQyxrQixpQ0FBcUI7QUFBQSxZQUNWWCxLQURVLEdBQ0QsS0FBS1ksS0FESixDQUNWWixLQURVOztBQUVqQixZQUFNYSxTQUFTYixRQUFRLEtBQVIsR0FBZ0IsUUFBL0I7QUFDQSxZQUFNYyxPQUFPLG1CQUFTUCxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVU8sU0FBL0IsQ0FBYjtBQUNBLFlBQUlELElBQUosRUFBVTtBQUNOQSxpQkFBS0UsU0FBTCxDQUFlSCxNQUFmLEVBQXVCLFlBQXZCO0FBQ0g7QUFDSixLOztxQ0FFREksYyxpQ0FBb0M7QUFBQSxZQUFYUCxPQUFXLFFBQXBCUSxNQUFvQixDQUFYUixPQUFXO0FBQUEsWUFDekJiLFFBRHlCLEdBQ2IsS0FBS2UsS0FEUSxDQUN6QmYsUUFEeUI7O0FBRWhDQSxpQkFBU2EsT0FBVDtBQUNILEs7O3FDQUVEUyxNLHFCQUFTO0FBQUEscUJBQ3lCLEtBQUtQLEtBRDlCO0FBQUEsWUFDRWpCLEtBREYsVUFDRUEsS0FERjtBQUFBLFlBQ1NLLEtBRFQsVUFDU0EsS0FEVDtBQUFBLFlBQ2dCRSxLQURoQixVQUNnQkEsS0FEaEI7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFZLENBQUMsQ0FBQ0EsS0FBbkIsRUFBMEIsY0FBVyxxQ0FBckM7QUFDSTtBQUFBO0FBQUEsa0JBQU8sV0FBVyxtREFBbEIsRUFBdUUsY0FBVyxnQkFBbEYsRUFBbUcsS0FBSSxXQUF2RztBQUNJLHlEQUFPLFNBQVNGLEtBQWhCLEVBQXVCLFdBQVUscUJBQWpDLEVBQXVELFVBQVksS0FBS2lCLGNBQWpCLE1BQVksSUFBWixDQUF2RCxFQUF3RixLQUFJLFVBQTVGLEVBQXVHLE1BQUssVUFBNUcsR0FESjtBQUVLdEIseUJBQVM7QUFBQTtBQUFBLHNCQUFNLFdBQVUscUJBQWhCO0FBQXVDLHlCQUFLeUIsSUFBTCxDQUFVekIsS0FBVjtBQUF2QyxpQkFGZDtBQUdLTyx5QkFBUztBQUFBO0FBQUEsc0JBQU0sV0FBVSx1QkFBaEI7QUFBeUMseUJBQUtrQixJQUFMLENBQVVsQixLQUFWO0FBQXpDO0FBSGQ7QUFESixTQURKO0FBU0gsSzs7Ozs7O0FBR0xFLHVCQUF1QmlCLFdBQXZCLEdBQXFDLHdCQUFyQztBQUNBakIsdUJBQXVCVixTQUF2QixHQUFtQ0EsU0FBbkM7QUFDQVUsdUJBQXVCRCxZQUF2QixHQUFzQ0EsWUFBdEM7a0JBQ2VDLHNCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCBNYXRlcmlhbCBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB2YWx1ZTogZmFsc2VcclxufTtcclxuXHJcbkBUcmFuc2xhdGlvblxyXG5ATWF0ZXJpYWwoJ21kbEhvbGRlcicpXHJcbmNsYXNzIElucHV0Q2hlY2tCb3hXaXRoRXJyb3IgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZG9tRWxlbWVudCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5jaGVja2JveCk7XHJcbiAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQuY2hlY2tlZDtcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHZhbHVlID8gJ2FkZCcgOiAncmVtb3ZlJztcclxuICAgICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLm1kbEhvbGRlcik7XHJcbiAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3RbbWV0aG9kXSgnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVPbkNoYW5nZSh7dGFyZ2V0OiB7Y2hlY2tlZH19KSB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgb25DaGFuZ2UoY2hlY2tlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtsYWJlbCwgdmFsdWUsIGVycm9yfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWVycm9yPXshIWVycm9yfSBkYXRhLWZvY3VzPSdpbnB1dC1jaGVja2JveC13aXRoLWVycm9yLWNvbnRhaW5lcic+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXsnbWRsLWNoZWNrYm94IG1kbC1qcy1jaGVja2JveCBtZGwtanMtcmlwcGxlLWVmZmVjdCd9IGRhdGEtZm9jdXM9J2lucHV0LWNoZWNrYm94JyByZWY9J21kbEhvbGRlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNoZWNrZWQ9e3ZhbHVlfSBjbGFzc05hbWU9J21kbC1jaGVja2JveF9faW5wdXQnIG9uQ2hhbmdlPXs6OnRoaXMuaGFuZGxlT25DaGFuZ2V9IHJlZj0nY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94Jy8+XHJcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsICYmIDxzcGFuIGNsYXNzTmFtZT0nbWRsLWNoZWNrYm94X19sYWJlbCc+e3RoaXMuaTE4bihsYWJlbCl9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3IgJiYgPHNwYW4gY2xhc3NOYW1lPSdpbnB1dC1jaGVja2JveF9fZXJyb3InPnt0aGlzLmkxOG4oZXJyb3IpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5JbnB1dENoZWNrQm94V2l0aEVycm9yLmRpc3BsYXlOYW1lID0gJ0lucHV0Q2hlY2tCb3hXaXRoRXJyb3InO1xyXG5JbnB1dENoZWNrQm94V2l0aEVycm9yLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuSW5wdXRDaGVja0JveFdpdGhFcnJvci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbmV4cG9ydCBkZWZhdWx0IElucHV0Q2hlY2tCb3hXaXRoRXJyb3I7XHJcbiJdfQ==