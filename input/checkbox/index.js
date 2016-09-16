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

var InputCheckBox = (_dec = (0, _material2.default)('mdlHolder'), _dec(_class = function (_Component) {
    _inherits(InputCheckBox, _Component);

    function InputCheckBox() {
        var _temp, _this, _ret;

        _classCallCheck(this, InputCheckBox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getValue = function () {
            var domElement = _reactDom2.default.findDOMNode(_this.refs.checkbox);
            return domElement.checked;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    InputCheckBox.prototype.componentDidUpdate = function componentDidUpdate() {
        var value = this.props.value;

        var method = value ? 'add' : 'remove';
        var node = _reactDom2.default.findDOMNode(this.refs.mdlHolder);
        if (node) {
            node.classList[method]('is-checked');
        }
    };

    InputCheckBox.prototype.handleOnChange = function handleOnChange(_ref) {
        var checked = _ref.target.checked;
        var onChange = this.props.onChange;

        onChange(checked);
    };

    InputCheckBox.prototype.render = function render() {
        var _props = this.props;
        var label = _props.label;
        var value = _props.value;
        var disabled = _props.disabled;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'input-checkbox-container' },
            _react2.default.createElement(
                'label',
                { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox', ref: 'mdlHolder' },
                _react2.default.createElement('input', { checked: value, className: 'mdl-checkbox__input', disabled: disabled, onChange: this.handleOnChange.bind(this), ref: 'checkbox', type: 'checkbox' }),
                label && _react2.default.createElement(
                    'span',
                    { className: 'mdl-checkbox__label' },
                    _i18next2.default.t(label)
                )
            )
        );
    };

    return InputCheckBox;
}(_react.Component)) || _class);


InputCheckBox.displayName = 'InputCheckBox';
InputCheckBox.propTypes = {
    label: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    onChange: _react.PropTypes.func.isRequired,
    value: _react.PropTypes.bool.isRequired
};
InputCheckBox.defaultProps = {
    value: false,
    disabled: false
};
exports.default = InputCheckBox;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIklucHV0Q2hlY2tCb3giLCJnZXRWYWx1ZSIsImRvbUVsZW1lbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJjaGVja2JveCIsImNoZWNrZWQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJ2YWx1ZSIsInByb3BzIiwibWV0aG9kIiwibm9kZSIsIm1kbEhvbGRlciIsImNsYXNzTGlzdCIsImhhbmRsZU9uQ2hhbmdlIiwidGFyZ2V0Iiwib25DaGFuZ2UiLCJyZW5kZXIiLCJsYWJlbCIsImRpc2FibGVkIiwidCIsImRpc3BsYXlOYW1lIiwicHJvcFR5cGVzIiwic3RyaW5nIiwiYm9vbCIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUlNQSxhLFdBREwsd0JBQVMsV0FBVCxDO2NBQ0tBLGE7O2FBQUFBLGE7Ozs4QkFBQUEsYTs7Ozs7O2dKQUNGQyxRLEdBQVcsWUFBTTtBQUNiLGdCQUFNQyxhQUFhLG1CQUFTQyxXQUFULENBQXFCLE1BQUtDLElBQUwsQ0FBVUMsUUFBL0IsQ0FBbkI7QUFDQSxtQkFBT0gsV0FBV0ksT0FBbEI7QUFDSCxTOzs7QUFKQ04saUIsV0FNRk8sa0IsaUNBQXFCO0FBQUEsWUFDVkMsS0FEVSxHQUNELEtBQUtDLEtBREosQ0FDVkQsS0FEVTs7QUFFakIsWUFBTUUsU0FBU0YsUUFBUSxLQUFSLEdBQWdCLFFBQS9CO0FBQ0EsWUFBTUcsT0FBTyxtQkFBU1IsV0FBVCxDQUFxQixLQUFLQyxJQUFMLENBQVVRLFNBQS9CLENBQWI7QUFDQSxZQUFJRCxJQUFKLEVBQVU7QUFDTkEsaUJBQUtFLFNBQUwsQ0FBZUgsTUFBZixFQUF1QixZQUF2QjtBQUNIO0FBQ0osSzs7QUFiQ1YsaUIsV0FlRmMsYyxpQ0FBb0M7QUFBQSxZQUFYUixPQUFXLFFBQXBCUyxNQUFvQixDQUFYVCxPQUFXO0FBQUEsWUFDekJVLFFBRHlCLEdBQ2IsS0FBS1AsS0FEUSxDQUN6Qk8sUUFEeUI7O0FBRWhDQSxpQkFBU1YsT0FBVDtBQUNILEs7O0FBbEJDTixpQixXQW9CRmlCLE0scUJBQVM7QUFBQSxxQkFDNEIsS0FBS1IsS0FEakM7QUFBQSxZQUNFUyxLQURGLFVBQ0VBLEtBREY7QUFBQSxZQUNTVixLQURULFVBQ1NBLEtBRFQ7QUFBQSxZQUNnQlcsUUFEaEIsVUFDZ0JBLFFBRGhCOztBQUVMLGVBQ0U7QUFBQTtBQUFBLGNBQUssY0FBVywwQkFBaEI7QUFDRTtBQUFBO0FBQUEsa0JBQU8sV0FBVyxtREFBbEIsRUFBdUUsY0FBVyxnQkFBbEYsRUFBbUcsS0FBSSxXQUF2RztBQUNJLHlEQUFPLFNBQVNYLEtBQWhCLEVBQXVCLFdBQVUscUJBQWpDLEVBQXVELFVBQVVXLFFBQWpFLEVBQTJFLFVBQVksS0FBS0wsY0FBakIsTUFBWSxJQUFaLENBQTNFLEVBQTRHLEtBQUksVUFBaEgsRUFBMkgsTUFBSyxVQUFoSSxHQURKO0FBRUtJLHlCQUFTO0FBQUE7QUFBQSxzQkFBTSxXQUFVLHFCQUFoQjtBQUF1QyxzQ0FBUUUsQ0FBUixDQUFVRixLQUFWO0FBQXZDO0FBRmQ7QUFERixTQURGO0FBUUgsSzs7V0E5QkNsQixhOzs7O0FBa0NOQSxjQUFjcUIsV0FBZCxHQUE0QixlQUE1QjtBQUNBckIsY0FBY3NCLFNBQWQsR0FBMEI7QUFDdEJKLFdBQU8saUJBQVVLLE1BREs7QUFFdEJKLGNBQVUsaUJBQVVLLElBRkU7QUFHdEJSLGNBQVUsaUJBQVVTLElBQVYsQ0FBZUMsVUFISDtBQUl0QmxCLFdBQU8saUJBQVVnQixJQUFWLENBQWVFO0FBSkEsQ0FBMUI7QUFNQTFCLGNBQWMyQixZQUFkLEdBQTZCO0FBQ3pCbkIsV0FBTyxLQURrQjtBQUV6QlcsY0FBVTtBQUZlLENBQTdCO2tCQUllbkIsYSIsImZpbGUiOiJmci1GUi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcclxuaW1wb3J0IE1hdGVyaWFsIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5cclxuXHJcbkBNYXRlcmlhbCgnbWRsSG9sZGVyJylcclxuY2xhc3MgSW5wdXRDaGVja0JveCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBkb21FbGVtZW50ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmNoZWNrYm94KTtcclxuICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5jaGVja2VkO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdmFsdWUgPyAnYWRkJyA6ICdyZW1vdmUnO1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWRsSG9sZGVyKTtcclxuICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdFttZXRob2RdKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBoYW5kbGVPbkNoYW5nZSh7dGFyZ2V0OiB7Y2hlY2tlZH19KSB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgb25DaGFuZ2UoY2hlY2tlZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7bGFiZWwsIHZhbHVlLCBkaXNhYmxlZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2lucHV0LWNoZWNrYm94LWNvbnRhaW5lcic+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9eydtZGwtY2hlY2tib3ggbWRsLWpzLWNoZWNrYm94IG1kbC1qcy1yaXBwbGUtZWZmZWN0J30gZGF0YS1mb2N1cz0naW5wdXQtY2hlY2tib3gnIHJlZj0nbWRsSG9sZGVyJz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjaGVja2VkPXt2YWx1ZX0gY2xhc3NOYW1lPSdtZGwtY2hlY2tib3hfX2lucHV0JyBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2hhbmdlPXs6OnRoaXMuaGFuZGxlT25DaGFuZ2V9IHJlZj0nY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94Jy8+XHJcbiAgICAgICAgICAgICAgICB7bGFiZWwgJiYgPHNwYW4gY2xhc3NOYW1lPSdtZGwtY2hlY2tib3hfX2xhYmVsJz57aTE4bmV4dC50KGxhYmVsKX08L3NwYW4+fVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5JbnB1dENoZWNrQm94LmRpc3BsYXlOYW1lID0gJ0lucHV0Q2hlY2tCb3gnO1xyXG5JbnB1dENoZWNrQm94LnByb3BUeXBlcyA9IHtcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxyXG59O1xyXG5JbnB1dENoZWNrQm94LmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHZhbHVlOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBJbnB1dENoZWNrQm94O1xyXG4iXX0=