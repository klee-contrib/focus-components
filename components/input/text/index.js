'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class; //dependencies


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utility = require('lodash/utility');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var MODE = { isEdit: true };

var propTypes = {
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    onKeyPress: _react.PropTypes.func,
    placeholder: _react.PropTypes.string,
    unformatter: _react.PropTypes.func,
    formatter: _react.PropTypes.func,
    type: _react.PropTypes.string,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

var defaultProps = {
    disabled: false,
    formatter: _utility.identity,
    unformatter: _utility.identity,
    type: 'text'
};

/**
 * Component standing for an HTML input.
 */
var InputText = (_dec = (0, _material2.default)('inputText'), _dec(_class = (0, _componentBase2.default)(_class = function (_Component) {
    _inherits(InputText, _Component);

    function InputText() {
        var _temp, _this, _ret;

        _classCallCheck(this, InputText);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getValue = function () {
            var unformatter = _this.props.unformatter;

            var domEl = _reactDom2.default.findDOMNode(_this.refs.htmlInput);
            return unformatter(domEl.value, MODE);
        }, _this._handleInputChange = function (evt) {
            var _this$props = _this.props,
                unformatter = _this$props.unformatter,
                onChange = _this$props.onChange;
            var value = evt.target.value;

            return onChange(unformatter(value, MODE));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Get the dom value of the component.
     * @return {object} - The unformated dom value.
     */


    InputText.prototype.componentDidUpdate = function componentDidUpdate() {
        var error = this.props.error;

        if (!error) {
            // Make sure that the main div does not hold a is-invalid class when there's no error
            // MDL keeps the class even if React removes it
            this.refs.inputText.classList.remove('is-invalid');
        }
    };
    /**
     * Handle the change on the input text, it only propagate the value.
     * @param  {object} evt - The react DOM event.
     * @return {object} - The function onChannge from the props, called.
     */


    /**
     * @inheritdoc
     * @override
    */
    InputText.prototype.render = function render() {
        var _props = this.props,
            autoFocus = _props.autoFocus,
            onBlur = _props.onBlur,
            disabled = _props.disabled,
            formatter = _props.formatter,
            unformatter = _props.unformatter,
            maxLength = _props.maxLength,
            onFocus = _props.onFocus,
            onClick = _props.onClick,
            onKeyDown = _props.onKeyDown,
            onKeyPress = _props.onKeyPress,
            error = _props.error,
            name = _props.name,
            placeholder = _props.placeholder,
            style = _props.style,
            rawValue = _props.value,
            size = _props.size,
            type = _props.type,
            isRequired = _props.isRequired;

        var value = formatter(rawValue, MODE);
        var pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        var inputProps = { autoFocus: autoFocus, disabled: disabled, onKeyDown: onKeyDown, onKeyPress: onKeyPress, onBlur: onBlur, maxLength: maxLength, onFocus: onFocus, onClick: onClick, id: name, onChange: this._handleInputChange, pattern: pattern, size: size, type: type, value: !value ? '' : value };
        if (isRequired) {
            inputProps.required = true;
        }
        var errorId = null;
        if (error) {
            inputProps['aria-invalid'] = true;
            errorId = _uuid2.default.v4();
            inputProps['aria-describedby'] = errorId;
        }
        var cssClass = 'mdl-textfield mdl-js-textfield' + (error ? ' is-invalid' : '');
        return _react2.default.createElement(
            'div',
            { className: cssClass, 'data-focus': 'input-text', ref: 'inputText', style: style },
            _react2.default.createElement('input', _extends({ className: 'mdl-textfield__input', ref: 'htmlInput' }, inputProps)),
            placeholder && _react2.default.createElement(
                'label',
                { className: 'mdl-textfield__label', htmlFor: name },
                this.i18n(placeholder)
            ),
            error && _react2.default.createElement(
                'span',
                { className: 'mdl-textfield__error', id: errorId },
                this.i18n(error)
            )
        );
    };

    return InputText;
}(_react.Component)) || _class) || _class);

//Static props.

InputText.displayName = 'InputText';
InputText.defaultProps = defaultProps;
InputText.propTypes = propTypes;

exports.default = InputText;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJNT0RFIiwiaXNFZGl0IiwicHJvcFR5cGVzIiwiZGlzYWJsZWQiLCJib29sIiwiZXJyb3IiLCJzdHJpbmciLCJuYW1lIiwiaXNSZXF1aXJlZCIsIm9uQ2hhbmdlIiwiZnVuYyIsIm9uS2V5UHJlc3MiLCJwbGFjZWhvbGRlciIsInVuZm9ybWF0dGVyIiwiZm9ybWF0dGVyIiwidHlwZSIsInZhbHVlIiwib25lT2ZUeXBlIiwibnVtYmVyIiwiZGVmYXVsdFByb3BzIiwiSW5wdXRUZXh0IiwiZ2V0VmFsdWUiLCJwcm9wcyIsImRvbUVsIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiaHRtbElucHV0IiwiX2hhbmRsZUlucHV0Q2hhbmdlIiwiZXZ0IiwidGFyZ2V0IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW5wdXRUZXh0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVuZGVyIiwiYXV0b0ZvY3VzIiwib25CbHVyIiwibWF4TGVuZ3RoIiwib25Gb2N1cyIsIm9uQ2xpY2siLCJvbktleURvd24iLCJzdHlsZSIsInJhd1ZhbHVlIiwic2l6ZSIsInBhdHRlcm4iLCJpbnB1dFByb3BzIiwiaWQiLCJyZXF1aXJlZCIsImVycm9ySWQiLCJ2NCIsImNzc0NsYXNzIiwiaTE4biIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPLEVBQUVDLFFBQVEsSUFBVixFQUFiOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsY0FBVSxpQkFBVUMsSUFETjtBQUVkQyxXQUFPLGlCQUFVQyxNQUZIO0FBR2RDLFVBQU0saUJBQVVELE1BQVYsQ0FBaUJFLFVBSFQ7QUFJZEMsY0FBVSxpQkFBVUMsSUFBVixDQUFlRixVQUpYO0FBS2RHLGdCQUFZLGlCQUFVRCxJQUxSO0FBTWRF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SWlCLGdCQUFoSSxFQUF5SUQsVUFBekksRUFBK0k1QixVQUEvSSxFQUFxSkMsT0FBTyxDQUFDQSxLQUFELEdBQVMsRUFBVCxHQUFjQSxLQUExSyxFQUFuQjtBQUNBLFlBQUlSLFVBQUosRUFBZ0I7QUFDWnFDLHVCQUFXRSxRQUFYLEdBQXNCLElBQXRCO0FBQ0g7QUFDRCxZQUFJQyxVQUFVLElBQWQ7QUFDQSxZQUFJM0MsS0FBSixFQUFXO0FBQ1B3Qyx1QkFBVyxjQUFYLElBQTZCLElBQTdCO0FBQ0FHLHNCQUFVLGVBQUtDLEVBQUwsRUFBVjtBQUNBSix1QkFBVyxrQkFBWCxJQUFpQ0csT0FBakM7QUFDSDtBQUNELFlBQU1FLCtDQUE0QzdDLFFBQVEsYUFBUixHQUF3QixFQUFwRSxDQUFOO0FBQ0EsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFXNkMsUUFBaEIsRUFBMEIsY0FBVyxZQUFyQyxFQUFrRCxLQUFJLFdBQXRELEVBQWtFLE9BQU9ULEtBQXpFO0FBQ0ksOERBQU8sV0FBVSxzQkFBakIsRUFBd0MsS0FBSSxXQUE1QyxJQUE0REksVUFBNUQsRUFESjtBQUVLakMsMkJBQWU7QUFBQTtBQUFBLGtCQUFPLFdBQVUsc0JBQWpCLEVBQXdDLFNBQVNMLElBQWpEO0FBQXdELHFCQUFLNEMsSUFBTCxDQUFVdkMsV0FBVjtBQUF4RCxhQUZwQjtBQUdLUCxxQkFBUztBQUFBO0FBQUEsa0JBQU0sV0FBVSxzQkFBaEIsRUFBdUMsSUFBSTJDLE9BQTNDO0FBQXNELHFCQUFLRyxJQUFMLENBQVU5QyxLQUFWO0FBQXREO0FBSGQsU0FESjtBQU9ILEs7Ozs7O0FBR0w7O0FBQ0FlLFVBQVVnQyxXQUFWLEdBQXdCLFdBQXhCO0FBQ0FoQyxVQUFVRCxZQUFWLEdBQXlCQSxZQUF6QjtBQUNBQyxVQUFVbEIsU0FBVixHQUFzQkEsU0FBdEI7O2tCQUVla0IsUyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2RlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJ2xvZGFzaC91dGlsaXR5JztcclxuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XHJcblxyXG5pbXBvcnQgQ29tcG9uZW50QmFzZUJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL2NvbXBvbmVudC1iYXNlJztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5cclxuY29uc3QgTU9ERSA9IHsgaXNFZGl0OiB0cnVlIH07XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgb25LZXlQcmVzczogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHVuZm9ybWF0dGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGZvcm1hdHRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgUHJvcFR5cGVzLm51bWJlclxyXG4gICAgXSlcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGZvcm1hdHRlcjogaWRlbnRpdHksXHJcbiAgICB1bmZvcm1hdHRlcjogaWRlbnRpdHksXHJcbiAgICB0eXBlOiAndGV4dCdcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgc3RhbmRpbmcgZm9yIGFuIEhUTUwgaW5wdXQuXHJcbiAqL1xyXG5ATURCZWhhdmlvdXIoJ2lucHV0VGV4dCcpXHJcbkBDb21wb25lbnRCYXNlQmVoYXZpb3VyXHJcbmNsYXNzIElucHV0VGV4dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGRvbSB2YWx1ZSBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSB1bmZvcm1hdGVkIGRvbSB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3VuZm9ybWF0dGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgZG9tRWwgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuaHRtbElucHV0KTtcclxuICAgICAgICByZXR1cm4gdW5mb3JtYXR0ZXIoZG9tRWwudmFsdWUsIE1PREUpO1xyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB7ZXJyb3J9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBtYWluIGRpdiBkb2VzIG5vdCBob2xkIGEgaXMtaW52YWxpZCBjbGFzcyB3aGVuIHRoZXJlJ3Mgbm8gZXJyb3JcclxuICAgICAgICAgICAgLy8gTURMIGtlZXBzIHRoZSBjbGFzcyBldmVuIGlmIFJlYWN0IHJlbW92ZXMgaXRcclxuICAgICAgICAgICAgdGhpcy5yZWZzLmlucHV0VGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgdGhlIGNoYW5nZSBvbiB0aGUgaW5wdXQgdGV4dCwgaXQgb25seSBwcm9wYWdhdGUgdGhlIHZhbHVlLlxyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBldnQgLSBUaGUgcmVhY3QgRE9NIGV2ZW50LlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBmdW5jdGlvbiBvbkNoYW5uZ2UgZnJvbSB0aGUgcHJvcHMsIGNhbGxlZC5cclxuICAgICAqL1xyXG4gICAgX2hhbmRsZUlucHV0Q2hhbmdlID0gKGV2dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt1bmZvcm1hdHRlciwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gZXZ0LnRhcmdldDtcclxuICAgICAgICByZXR1cm4gb25DaGFuZ2UodW5mb3JtYXR0ZXIodmFsdWUsIE1PREUpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRvRm9jdXMsIG9uQmx1ciwgZGlzYWJsZWQsIGZvcm1hdHRlciwgdW5mb3JtYXR0ZXIsIG1heExlbmd0aCwgb25Gb2N1cywgb25DbGljaywgb25LZXlEb3duLCBvbktleVByZXNzLCBlcnJvciwgbmFtZSwgcGxhY2Vob2xkZXIsIHN0eWxlLCB2YWx1ZTogcmF3VmFsdWUsIHNpemUsIHR5cGUsIGlzUmVxdWlyZWQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBmb3JtYXR0ZXIocmF3VmFsdWUsIE1PREUpO1xyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSBlcnJvciA/ICdoYXNFcnJvcicgOiBudWxsOyAvL2FkZCBwYXR0ZXJuIHRvIG92ZXJpZGUgbWRsIGVycm9yIHN0eWxlIHdoZW4gZGlzcGxheWluZyBhbiBmb2N1cyBlcnJvci5cclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0geyBhdXRvRm9jdXMsIGRpc2FibGVkLCBvbktleURvd24sIG9uS2V5UHJlc3MsIG9uQmx1ciwgbWF4TGVuZ3RoLCBvbkZvY3VzLCBvbkNsaWNrLCBpZDogbmFtZSwgb25DaGFuZ2U6IHRoaXMuX2hhbmRsZUlucHV0Q2hhbmdlLCBwYXR0ZXJuLCBzaXplLCB0eXBlLCB2YWx1ZTogIXZhbHVlID8gJycgOiB2YWx1ZSB9O1xyXG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgIGlucHV0UHJvcHMucmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZXJyb3JJZCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlucHV0UHJvcHNbJ2FyaWEtaW52YWxpZCddID0gdHJ1ZTtcclxuICAgICAgICAgICAgZXJyb3JJZCA9IHV1aWQudjQoKTtcclxuICAgICAgICAgICAgaW5wdXRQcm9wc1snYXJpYS1kZXNjcmliZWRieSddID0gZXJyb3JJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY3NzQ2xhc3MgPSBgbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkJHtlcnJvciA/ICcgaXMtaW52YWxpZCcgOiAnJ31gO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3NDbGFzc30gZGF0YS1mb2N1cz0naW5wdXQtdGV4dCcgcmVmPSdpbnB1dFRleHQnIHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19pbnB1dCcgcmVmPSdodG1sSW5wdXQnIHsuLi5pbnB1dFByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAge3BsYWNlaG9sZGVyICYmIDxsYWJlbCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2xhYmVsJyBodG1sRm9yPXtuYW1lfT57dGhpcy5pMThuKHBsYWNlaG9sZGVyKX08L2xhYmVsPn1cclxuICAgICAgICAgICAgICAgIHtlcnJvciAmJiA8c3BhbiBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2Vycm9yJyBpZD17ZXJyb3JJZH0gPnt0aGlzLmkxOG4oZXJyb3IpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5JbnB1dFRleHQuZGlzcGxheU5hbWUgPSAnSW5wdXRUZXh0JztcclxuSW5wdXRUZXh0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuSW5wdXRUZXh0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0VGV4dDtcclxuIl19