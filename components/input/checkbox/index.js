'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _filterHtmlAttributes = require('../../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    label: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    onChange: _react.PropTypes.func.isRequired,
    value: _react.PropTypes.bool.isRequired
};

var defaultProps = {
    value: false,
    disabled: false
};

var displayName = 'InputCheckBox';

var InputCheckBox = (_dec = (0, _material2.default)('mdlHolder'), (0, _translation2.default)(_class = _dec(_class = function (_Component) {
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
        }, _this.handleOnChange = function (_ref) {
            var checked = _ref.target.checked;
            var onChange = _this.props.onChange;

            onChange(checked);
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

    InputCheckBox.prototype.render = function render() {
        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);

        var _props = this.props,
            label = _props.label,
            value = _props.value,
            disabled = _props.disabled;


        validInputProps.onChange = this.handleOnChange;
        var inputProps = _extends({}, validInputProps);

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'input-checkbox-container' },
            _react2.default.createElement(
                'label',
                { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox', ref: 'mdlHolder' },
                _react2.default.createElement('input', _extends({ checked: value, className: 'mdl-checkbox__input', disabled: disabled, ref: 'checkbox', type: 'checkbox' }, inputProps)),
                label && _react2.default.createElement(
                    'span',
                    { className: 'mdl-checkbox__label' },
                    this.i18n(label)
                )
            )
        );
    };

    return InputCheckBox;
}(_react.Component)) || _class) || _class);


InputCheckBox.propTypes = propTypes;
InputCheckBox.defaultProps = defaultProps;
InputCheckBox.displayName = displayName;

exports.default = InputCheckBox;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJsYWJlbCIsInN0cmluZyIsImRpc2FibGVkIiwiYm9vbCIsIm9uQ2hhbmdlIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJ2YWx1ZSIsImRlZmF1bHRQcm9wcyIsImRpc3BsYXlOYW1lIiwiSW5wdXRDaGVja0JveCIsImdldFZhbHVlIiwiZG9tRWxlbWVudCIsImZpbmRET01Ob2RlIiwicmVmcyIsImNoZWNrYm94IiwiY2hlY2tlZCIsImhhbmRsZU9uQ2hhbmdlIiwidGFyZ2V0IiwicHJvcHMiLCJjb21wb25lbnREaWRVcGRhdGUiLCJtZXRob2QiLCJub2RlIiwibWRsSG9sZGVyIiwiY2xhc3NMaXN0IiwicmVuZGVyIiwidmFsaWRJbnB1dFByb3BzIiwiaW5wdXRQcm9wcyIsImkxOG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDZEMsV0FBTyxpQkFBVUMsTUFESDtBQUVkQyxjQUFVLGlCQUFVQyxJQUZOO0FBR2RDLGNBQVUsaUJBQVVDLElBQVYsQ0FBZUMsVUFIWDtBQUlkQyxXQUFPLGlCQUFVSixJQUFWLENBQWVHO0FBSlIsQ0FBbEI7O0FBT0EsSUFBTUUsZUFBZTtBQUNqQkQsV0FBTyxLQURVO0FBRWpCTCxjQUFVO0FBRk8sQ0FBckI7O0FBS0EsSUFBTU8sY0FBYyxlQUFwQjs7SUFJTUMsYSxXQURMLHdCQUFTLFdBQVQsQzs7Ozs7Ozs7Ozs7O2dKQUVHQyxRLEdBQVcsWUFBTTtBQUNiLGdCQUFNQyxhQUFhLG1CQUFTQyxXQUFULENBQXFCLE1BQUtDLElBQUwsQ0FBVUMsUUFBL0IsQ0FBbkI7QUFDQSxtQkFBT0gsV0FBV0ksT0FBbEI7QUFDSCxTLFFBV0RDLGMsR0FBaUIsZ0JBQXlCO0FBQUEsZ0JBQWRELE9BQWMsUUFBdkJFLE1BQXVCLENBQWRGLE9BQWM7QUFBQSxnQkFDL0JaLFFBRCtCLEdBQ25CLE1BQUtlLEtBRGMsQ0FDL0JmLFFBRCtCOztBQUV0Q0EscUJBQVNZLE9BQVQ7QUFDSCxTOzs7NEJBWkRJLGtCLGlDQUFxQjtBQUFBLFlBQ1ZiLEtBRFUsR0FDRCxLQUFLWSxLQURKLENBQ1ZaLEtBRFU7O0FBRWpCLFlBQU1jLFNBQVNkLFFBQVEsS0FBUixHQUFnQixRQUEvQjtBQUNBLFlBQU1lLE9BQU8sbUJBQVNULFdBQVQsQ0FBcUIsS0FBS0MsSUFBTCxDQUFVUyxTQUEvQixDQUFiO0FBQ0EsWUFBSUQsSUFBSixFQUFVO0FBQ05BLGlCQUFLRSxTQUFMLENBQWVILE1BQWYsRUFBdUIsWUFBdkI7QUFDSDtBQUNKLEs7OzRCQU9ESSxNLHFCQUFTO0FBQ0wsWUFBTUMsa0JBQWtCLG9DQUFZLEtBQUtQLEtBQWpCLENBQXhCOztBQURLLHFCQUc0QixLQUFLQSxLQUhqQztBQUFBLFlBR0VuQixLQUhGLFVBR0VBLEtBSEY7QUFBQSxZQUdTTyxLQUhULFVBR1NBLEtBSFQ7QUFBQSxZQUdnQkwsUUFIaEIsVUFHZ0JBLFFBSGhCOzs7QUFLTHdCLHdCQUFnQnRCLFFBQWhCLEdBQTJCLEtBQUthLGNBQWhDO0FBQ0EsWUFBTVUsMEJBQWlCRCxlQUFqQixDQUFOOztBQUVBLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVywwQkFBaEI7QUFDSTtBQUFBO0FBQUEsa0JBQU8sV0FBVyxtREFBbEIsRUFBdUUsY0FBVyxnQkFBbEYsRUFBbUcsS0FBSSxXQUF2RztBQUNJLGtFQUFPLFNBQVNuQixLQUFoQixFQUF1QixXQUFVLHFCQUFqQyxFQUF1RCxVQUFVTCxRQUFqRSxFQUEyRSxLQUFJLFVBQS9FLEVBQTBGLE1BQUssVUFBL0YsSUFBOEd5QixVQUE5RyxFQURKO0FBRUszQix5QkFBUztBQUFBO0FBQUEsc0JBQU0sV0FBVSxxQkFBaEI7QUFBdUMseUJBQUs0QixJQUFMLENBQVU1QixLQUFWO0FBQXZDO0FBRmQ7QUFESixTQURKO0FBUUgsSzs7Ozs7O0FBR0xVLGNBQWNYLFNBQWQsR0FBMEJBLFNBQTFCO0FBQ0FXLGNBQWNGLFlBQWQsR0FBNkJBLFlBQTdCO0FBQ0FFLGNBQWNELFdBQWQsR0FBNEJBLFdBQTVCOztrQkFFZUMsYSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmltcG9ydCBmaWx0ZXJQcm9wcyBmcm9tICcuLi8uLi8uLi91dGlscy9maWx0ZXItaHRtbC1hdHRyaWJ1dGVzJztcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdmFsdWU6IGZhbHNlLFxyXG4gICAgZGlzYWJsZWQ6IGZhbHNlXHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5TmFtZSA9ICdJbnB1dENoZWNrQm94JztcclxuXHJcbkBUcmFuc2xhdGlvblxyXG5ATWF0ZXJpYWwoJ21kbEhvbGRlcicpXHJcbmNsYXNzIElucHV0Q2hlY2tCb3ggZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZG9tRWxlbWVudCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5jaGVja2JveCk7XHJcbiAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQuY2hlY2tlZDtcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHZhbHVlID8gJ2FkZCcgOiAncmVtb3ZlJztcclxuICAgICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLm1kbEhvbGRlcik7XHJcbiAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3RbbWV0aG9kXSgnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVPbkNoYW5nZSA9ICh7dGFyZ2V0OiB7Y2hlY2tlZH19KSA9PiB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgb25DaGFuZ2UoY2hlY2tlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkSW5wdXRQcm9wcyA9IGZpbHRlclByb3BzKHRoaXMucHJvcHMpO1xyXG5cclxuICAgICAgICBjb25zdCB7bGFiZWwsIHZhbHVlLCBkaXNhYmxlZH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICB2YWxpZElucHV0UHJvcHMub25DaGFuZ2UgPSB0aGlzLmhhbmRsZU9uQ2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7Li4udmFsaWRJbnB1dFByb3BzfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdpbnB1dC1jaGVja2JveC1jb250YWluZXInPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17J21kbC1jaGVja2JveCBtZGwtanMtY2hlY2tib3ggbWRsLWpzLXJpcHBsZS1lZmZlY3QnfSBkYXRhLWZvY3VzPSdpbnB1dC1jaGVja2JveCcgcmVmPSdtZGxIb2xkZXInPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjaGVja2VkPXt2YWx1ZX0gY2xhc3NOYW1lPSdtZGwtY2hlY2tib3hfX2lucHV0JyBkaXNhYmxlZD17ZGlzYWJsZWR9IHJlZj0nY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94JyB7Li4uaW5wdXRQcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbCAmJiA8c3BhbiBjbGFzc05hbWU9J21kbC1jaGVja2JveF9fbGFiZWwnPnt0aGlzLmkxOG4obGFiZWwpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5JbnB1dENoZWNrQm94LnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuSW5wdXRDaGVja0JveC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbklucHV0Q2hlY2tCb3guZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0Q2hlY2tCb3g7XHJcbiJdfQ==