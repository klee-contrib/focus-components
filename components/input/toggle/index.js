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
        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);
        var label = validInputProps.label,
            value = validInputProps.value;


        validInputProps.onChange = this.handleOnChange;
        validInputProps.checked = value;
        var inputProps = _extends({}, validInputProps);

        return _react2.default.createElement(
            'label',
            { className: 'mdl-switch mdl-js-switch mdl-js-ripple-effect', 'data-focus': 'input-toggle', ref: 'mdlHolder' },
            _react2.default.createElement('input', _extends({ className: 'mdl-switch__input', ref: 'toggle', type: 'checkbox' }, inputProps)),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJsYWJlbCIsInN0cmluZyIsIm9uQ2hhbmdlIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJ2YWx1ZSIsImJvb2wiLCJkZWZhdWx0UHJvcHMiLCJkaXNwbGF5TmFtZSIsIklucHV0VG9nZ2xlIiwiZ2V0VmFsdWUiLCJkb21FbGVtZW50IiwiZmluZERPTU5vZGUiLCJyZWZzIiwidG9nZ2xlIiwiY2hlY2tlZCIsImhhbmRsZU9uQ2hhbmdlIiwidGFyZ2V0IiwicHJvcHMiLCJyZW5kZXIiLCJ2YWxpZElucHV0UHJvcHMiLCJpbnB1dFByb3BzIiwiaTE4biJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxXQUFPLGlCQUFVQyxNQURIO0FBRWRDLGNBQVUsaUJBQVVDLElBQVYsQ0FBZUMsVUFGWDtBQUdkQyxXQUFPLGlCQUFVQyxJQUFWLENBQWVGO0FBSFIsQ0FBbEI7O0FBTUEsSUFBTUcsZUFBZTtBQUNqQkYsV0FBTztBQURVLENBQXJCOztBQUlBLElBQU1HLGNBQWMsYUFBcEI7O0lBSU1DLFcsV0FETCx3QkFBUyxXQUFULEM7Ozs7Ozs7Ozs7OztnSkFFR0MsUSxHQUFXLFlBQU07QUFDYixnQkFBTUMsYUFBYSxtQkFBU0MsV0FBVCxDQUFxQixNQUFLQyxJQUFMLENBQVVDLE1BQS9CLENBQW5CO0FBQ0EsbUJBQU9ILFdBQVdJLE9BQWxCO0FBQ0gsUyxRQUVEQyxjLEdBQWlCLGdCQUF5QjtBQUFBLGdCQUFkRCxPQUFjLFFBQXZCRSxNQUF1QixDQUFkRixPQUFjO0FBQUEsZ0JBQy9CYixRQUQrQixHQUNuQixNQUFLZ0IsS0FEYyxDQUMvQmhCLFFBRCtCOztBQUV0Q0EscUJBQVNhLE9BQVQ7QUFDSCxTOzs7MEJBRURJLE0scUJBQVM7QUFDTCxZQUFNQyxrQkFBa0Isb0NBQVksS0FBS0YsS0FBakIsQ0FBeEI7QUFESyxZQUVFbEIsS0FGRixHQUVrQm9CLGVBRmxCLENBRUVwQixLQUZGO0FBQUEsWUFFU0ssS0FGVCxHQUVrQmUsZUFGbEIsQ0FFU2YsS0FGVDs7O0FBSUxlLHdCQUFnQmxCLFFBQWhCLEdBQTJCLEtBQUtjLGNBQWhDO0FBQ0FJLHdCQUFnQkwsT0FBaEIsR0FBMEJWLEtBQTFCO0FBQ0EsWUFBTWdCLDBCQUFpQkQsZUFBakIsQ0FBTjs7QUFFQSxlQUNJO0FBQUE7QUFBQSxjQUFPLFdBQVUsK0NBQWpCLEVBQWlFLGNBQVcsY0FBNUUsRUFBMkYsS0FBSSxXQUEvRjtBQUNJLDhEQUFPLFdBQVUsbUJBQWpCLEVBQXFDLEtBQUksUUFBekMsRUFBa0QsTUFBSyxVQUF2RCxJQUFzRUMsVUFBdEUsRUFESjtBQUVLckIscUJBQVM7QUFBQTtBQUFBLGtCQUFNLFdBQVUsbUJBQWhCO0FBQXFDLHFCQUFLc0IsSUFBTCxDQUFVdEIsS0FBVjtBQUFyQztBQUZkLFNBREo7QUFNSCxLOzs7Ozs7QUFHTFMsWUFBWVYsU0FBWixHQUF3QkEsU0FBeEI7QUFDQVUsWUFBWUYsWUFBWixHQUEyQkEsWUFBM0I7QUFDQUUsWUFBWUQsV0FBWixHQUEwQkEsV0FBMUI7O2tCQUVlQyxXIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCBNYXRlcmlhbCBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuaW1wb3J0IGZpbHRlclByb3BzIGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZpbHRlci1odG1sLWF0dHJpYnV0ZXMnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB2YWx1ZTogZmFsc2VcclxufTtcclxuXHJcbmNvbnN0IGRpc3BsYXlOYW1lID0gJ0lucHV0VG9nZ2xlJztcclxuXHJcbkBUcmFuc2xhdGlvblxyXG5ATWF0ZXJpYWwoJ21kbEhvbGRlcicpXHJcbmNsYXNzIElucHV0VG9nZ2xlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMudG9nZ2xlKTtcclxuICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5jaGVja2VkO1xyXG4gICAgfTtcclxuXHJcbiAgICBoYW5kbGVPbkNoYW5nZSA9ICh7dGFyZ2V0OiB7Y2hlY2tlZH19KSA9PiB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgb25DaGFuZ2UoY2hlY2tlZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB2YWxpZElucHV0UHJvcHMgPSBmaWx0ZXJQcm9wcyh0aGlzLnByb3BzKTtcclxuICAgICAgICBjb25zdCB7bGFiZWwsIHZhbHVlfSA9IHZhbGlkSW5wdXRQcm9wcztcclxuXHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uQ2hhbmdlID0gdGhpcy5oYW5kbGVPbkNoYW5nZTtcclxuICAgICAgICB2YWxpZElucHV0UHJvcHMuY2hlY2tlZCA9IHZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7Li4udmFsaWRJbnB1dFByb3BzfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXN3aXRjaCBtZGwtanMtc3dpdGNoIG1kbC1qcy1yaXBwbGUtZWZmZWN0JyBkYXRhLWZvY3VzPSdpbnB1dC10b2dnbGUnIHJlZj0nbWRsSG9sZGVyJz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J21kbC1zd2l0Y2hfX2lucHV0JyByZWY9J3RvZ2dsZScgdHlwZT0nY2hlY2tib3gnIHsuLi5pbnB1dFByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAge2xhYmVsICYmIDxzcGFuIGNsYXNzTmFtZT0nbWRsLXN3aXRjaF9fbGFiZWwnPnt0aGlzLmkxOG4obGFiZWwpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuSW5wdXRUb2dnbGUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5JbnB1dFRvZ2dsZS5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbklucHV0VG9nZ2xlLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dFRvZ2dsZTtcclxuIl19