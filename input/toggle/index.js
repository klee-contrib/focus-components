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
    value: _react.PropTypes.bool.isRequired
};

var defaultProps = {
    value: false
};

var displayName = 'InputToggle';

var InputToggle = (_dec = (0, _material2.default)('mdlHolder'), _dec(_class = function (_Component) {
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
        var _props = this.props;
        var label = _props.label;
        var value = _props.value;

        return _react2.default.createElement(
            'label',
            { className: 'mdl-switch mdl-js-switch mdl-js-ripple-effect', 'data-focus': 'input-toggle', ref: 'mdlHolder' },
            _react2.default.createElement('input', { checked: value, className: 'mdl-switch__input', onChange: this.handleOnChange, ref: 'toggle', type: 'checkbox' }),
            label && _react2.default.createElement(
                'span',
                { className: 'mdl-switch__label' },
                _i18next2.default.t(label)
            )
        );
    };

    return InputToggle;
}(_react.Component)) || _class);


InputToggle.propTypes = propTypes;
InputToggle.defaultProps = defaultProps;
InputToggle.displayName = displayName;

exports.default = InputToggle;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImxhYmVsIiwic3RyaW5nIiwib25DaGFuZ2UiLCJmdW5jIiwiaXNSZXF1aXJlZCIsInZhbHVlIiwiYm9vbCIsImRlZmF1bHRQcm9wcyIsImRpc3BsYXlOYW1lIiwiSW5wdXRUb2dnbGUiLCJnZXRWYWx1ZSIsImRvbUVsZW1lbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJ0b2dnbGUiLCJjaGVja2VkIiwiaGFuZGxlT25DaGFuZ2UiLCJ0YXJnZXQiLCJwcm9wcyIsInJlbmRlciIsInQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxXQUFPLGlCQUFVQyxNQURIO0FBRWRDLGNBQVUsaUJBQVVDLElBQVYsQ0FBZUMsVUFGWDtBQUdkQyxXQUFPLGlCQUFVQyxJQUFWLENBQWVGO0FBSFIsQ0FBbEI7O0FBTUEsSUFBTUcsZUFBZTtBQUNqQkYsV0FBTztBQURVLENBQXJCOztBQUlBLElBQU1HLGNBQWMsYUFBcEI7O0lBR01DLFcsV0FETCx3QkFBUyxXQUFULEM7Y0FDS0EsVzs7YUFBQUEsVzs7OzhCQUFBQSxXOzs7Ozs7Z0pBQ0ZDLFEsR0FBVyxZQUFNO0FBQ2IsZ0JBQU1DLGFBQWEsbUJBQVNDLFdBQVQsQ0FBcUIsTUFBS0MsSUFBTCxDQUFVQyxNQUEvQixDQUFuQjtBQUNBLG1CQUFPSCxXQUFXSSxPQUFsQjtBQUNILFMsUUFFREMsYyxHQUFpQixnQkFBeUI7QUFBQSxnQkFBZEQsT0FBYyxRQUF2QkUsTUFBdUIsQ0FBZEYsT0FBYztBQUFBLGdCQUMvQmIsUUFEK0IsR0FDbkIsTUFBS2dCLEtBRGMsQ0FDL0JoQixRQUQrQjs7QUFFdENBLHFCQUFTYSxPQUFUO0FBQ0gsUzs7O0FBVENOLGUsV0FXRlUsTSxxQkFBUztBQUFBLHFCQUNrQixLQUFLRCxLQUR2QjtBQUFBLFlBQ0VsQixLQURGLFVBQ0VBLEtBREY7QUFBQSxZQUNTSyxLQURULFVBQ1NBLEtBRFQ7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBTyxXQUFVLCtDQUFqQixFQUFpRSxjQUFXLGNBQTVFLEVBQTJGLEtBQUksV0FBL0Y7QUFDSSxxREFBTyxTQUFTQSxLQUFoQixFQUF1QixXQUFVLG1CQUFqQyxFQUFxRCxVQUFVLEtBQUtXLGNBQXBFLEVBQW9GLEtBQUksUUFBeEYsRUFBaUcsTUFBSyxVQUF0RyxHQURKO0FBRUtoQixxQkFBUztBQUFBO0FBQUEsa0JBQU0sV0FBVSxtQkFBaEI7QUFBcUMsa0NBQVFvQixDQUFSLENBQVVwQixLQUFWO0FBQXJDO0FBRmQsU0FESjtBQU1ILEs7O1dBbkJDUyxXOzs7O0FBc0JOQSxZQUFZVixTQUFaLEdBQXdCQSxTQUF4QjtBQUNBVSxZQUFZRixZQUFaLEdBQTJCQSxZQUEzQjtBQUNBRSxZQUFZRCxXQUFaLEdBQTBCQSxXQUExQjs7a0JBRWVDLFciLCJmaWxlIjoiZnItRlIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XHJcbmltcG9ydCBNYXRlcmlhbCBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZFxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdmFsdWU6IGZhbHNlXHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5TmFtZSA9ICdJbnB1dFRvZ2dsZSc7XHJcblxyXG5ATWF0ZXJpYWwoJ21kbEhvbGRlcicpXHJcbmNsYXNzIElucHV0VG9nZ2xlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMudG9nZ2xlKTtcclxuICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5jaGVja2VkO1xyXG4gICAgfTtcclxuXHJcbiAgICBoYW5kbGVPbkNoYW5nZSA9ICh7dGFyZ2V0OiB7Y2hlY2tlZH19KSA9PiB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgb25DaGFuZ2UoY2hlY2tlZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7bGFiZWwsIHZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXN3aXRjaCBtZGwtanMtc3dpdGNoIG1kbC1qcy1yaXBwbGUtZWZmZWN0JyBkYXRhLWZvY3VzPSdpbnB1dC10b2dnbGUnIHJlZj0nbWRsSG9sZGVyJz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjaGVja2VkPXt2YWx1ZX0gY2xhc3NOYW1lPSdtZGwtc3dpdGNoX19pbnB1dCcgb25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9IHJlZj0ndG9nZ2xlJyB0eXBlPSdjaGVja2JveCcgLz5cclxuICAgICAgICAgICAgICAgIHtsYWJlbCAmJiA8c3BhbiBjbGFzc05hbWU9J21kbC1zd2l0Y2hfX2xhYmVsJz57aTE4bmV4dC50KGxhYmVsKX08L3NwYW4+fVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbklucHV0VG9nZ2xlLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuSW5wdXRUb2dnbGUuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5JbnB1dFRvZ2dsZS5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXRUb2dnbGU7XHJcbiJdfQ==