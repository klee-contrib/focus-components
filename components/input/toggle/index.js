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
    value: _react.PropTypes.bool.isRequired
};

var defaultProps = {
    value: false
};

var displayName = 'InputToggle';

var InputToggle = (_dec = (0, _material2.default)('mdlHolder'), (0, _translation2.default)(_class = _dec(_class = function (_Component) {
    _inherits(InputToggle, _Component);

    function InputToggle() {
        var _temp, _this, _ret;

        _classCallCheck(this, InputToggle);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getValue = function () {
            var domElement = _reactDom2.default.findDOMNode(_this.refs.toggle);
            return domElement.checked;
        }, _this.handleOnChange = function (_ref) {
            var checked = _ref.target.checked;
            var onChange = _this.props.onChange;

            onChange(checked);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    InputToggle.prototype.render = function render() {
        var _props = this.props,
            label = _props.label,
            value = _props.value;

        return _react2.default.createElement(
            'label',
            { className: 'mdl-switch mdl-js-switch mdl-js-ripple-effect', 'data-focus': 'input-toggle', ref: 'mdlHolder' },
            _react2.default.createElement('input', { checked: value, className: 'mdl-switch__input', onChange: this.handleOnChange, ref: 'toggle', type: 'checkbox' }),
            label && _react2.default.createElement(
                'span',
                { className: 'mdl-switch__label' },
                this.i18n(label)
            )
        );
    };

    return InputToggle;
}(_react.Component)) || _class) || _class);


InputToggle.propTypes = propTypes;
InputToggle.defaultProps = defaultProps;
InputToggle.displayName = displayName;

exports.default = InputToggle;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJsYWJlbCIsInN0cmluZyIsIm9uQ2hhbmdlIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJ2YWx1ZSIsImJvb2wiLCJkZWZhdWx0UHJvcHMiLCJkaXNwbGF5TmFtZSIsIklucHV0VG9nZ2xlIiwiZ2V0VmFsdWUiLCJkb21FbGVtZW50IiwiZmluZERPTU5vZGUiLCJyZWZzIiwidG9nZ2xlIiwiY2hlY2tlZCIsImhhbmRsZU9uQ2hhbmdlIiwidGFyZ2V0IiwicHJvcHMiLCJyZW5kZXIiLCJpMThuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDZEMsV0FBTyxpQkFBVUMsTUFESDtBQUVkQyxjQUFVLGlCQUFVQyxJQUFWLENBQWVDLFVBRlg7QUFHZEMsV0FBTyxpQkFBVUMsSUFBVixDQUFlRjtBQUhSLENBQWxCOztBQU1BLElBQU1HLGVBQWU7QUFDakJGLFdBQU87QUFEVSxDQUFyQjs7QUFJQSxJQUFNRyxjQUFjLGFBQXBCOztJQUlNQyxXLFdBREwsd0JBQVMsV0FBVCxDOzs7Ozs7Ozs7Ozs7Z0pBRUdDLFEsR0FBVyxZQUFNO0FBQ2IsZ0JBQU1DLGFBQWEsbUJBQVNDLFdBQVQsQ0FBcUIsTUFBS0MsSUFBTCxDQUFVQyxNQUEvQixDQUFuQjtBQUNBLG1CQUFPSCxXQUFXSSxPQUFsQjtBQUNILFMsUUFFREMsYyxHQUFpQixnQkFBeUI7QUFBQSxnQkFBZEQsT0FBYyxRQUF2QkUsTUFBdUIsQ0FBZEYsT0FBYztBQUFBLGdCQUMvQmIsUUFEK0IsR0FDbkIsTUFBS2dCLEtBRGMsQ0FDL0JoQixRQUQrQjs7QUFFdENBLHFCQUFTYSxPQUFUO0FBQ0gsUzs7OzBCQUVESSxNLHFCQUFTO0FBQUEscUJBQ2tCLEtBQUtELEtBRHZCO0FBQUEsWUFDRWxCLEtBREYsVUFDRUEsS0FERjtBQUFBLFlBQ1NLLEtBRFQsVUFDU0EsS0FEVDs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFPLFdBQVUsK0NBQWpCLEVBQWlFLGNBQVcsY0FBNUUsRUFBMkYsS0FBSSxXQUEvRjtBQUNJLHFEQUFPLFNBQVNBLEtBQWhCLEVBQXVCLFdBQVUsbUJBQWpDLEVBQXFELFVBQVUsS0FBS1csY0FBcEUsRUFBb0YsS0FBSSxRQUF4RixFQUFpRyxNQUFLLFVBQXRHLEdBREo7QUFFS2hCLHFCQUFTO0FBQUE7QUFBQSxrQkFBTSxXQUFVLG1CQUFoQjtBQUFxQyxxQkFBS29CLElBQUwsQ0FBVXBCLEtBQVY7QUFBckM7QUFGZCxTQURKO0FBTUgsSzs7Ozs7O0FBR0xTLFlBQVlWLFNBQVosR0FBd0JBLFNBQXhCO0FBQ0FVLFlBQVlGLFlBQVosR0FBMkJBLFlBQTNCO0FBQ0FFLFlBQVlELFdBQVosR0FBMEJBLFdBQTFCOztrQkFFZUMsVyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHZhbHVlOiBmYWxzZVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheU5hbWUgPSAnSW5wdXRUb2dnbGUnO1xyXG5cclxuQFRyYW5zbGF0aW9uXHJcbkBNYXRlcmlhbCgnbWRsSG9sZGVyJylcclxuY2xhc3MgSW5wdXRUb2dnbGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZG9tRWxlbWVudCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy50b2dnbGUpO1xyXG4gICAgICAgIHJldHVybiBkb21FbGVtZW50LmNoZWNrZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGhhbmRsZU9uQ2hhbmdlID0gKHt0YXJnZXQ6IHtjaGVja2VkfX0pID0+IHtcclxuICAgICAgICBjb25zdCB7b25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBvbkNoYW5nZShjaGVja2VkKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtsYWJlbCwgdmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtc3dpdGNoIG1kbC1qcy1zd2l0Y2ggbWRsLWpzLXJpcHBsZS1lZmZlY3QnIGRhdGEtZm9jdXM9J2lucHV0LXRvZ2dsZScgcmVmPSdtZGxIb2xkZXInPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNoZWNrZWQ9e3ZhbHVlfSBjbGFzc05hbWU9J21kbC1zd2l0Y2hfX2lucHV0JyBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX0gcmVmPSd0b2dnbGUnIHR5cGU9J2NoZWNrYm94JyAvPlxyXG4gICAgICAgICAgICAgICAge2xhYmVsICYmIDxzcGFuIGNsYXNzTmFtZT0nbWRsLXN3aXRjaF9fbGFiZWwnPnt0aGlzLmkxOG4obGFiZWwpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuSW5wdXRUb2dnbGUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5JbnB1dFRvZ2dsZS5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbklucHV0VG9nZ2xlLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dFRvZ2dsZTtcclxuIl19