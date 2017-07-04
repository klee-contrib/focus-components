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

var _filterHtmlAttributes = require('../../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

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
        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);
        var _props = this.props,
            error = _props.error,
            style = _props.style,
            isRequired = _props.isRequired;
        var name = validInputProps.name,
            placeholder = validInputProps.placeholder,
            valueToFormat = validInputProps.value;


        validInputProps.value = this.props.formatter(valueToFormat, MODE);
        validInputProps.onChange = this._handleInputChange;
        // To prevent regression
        if (validInputProps.name) {
            validInputProps.id = validInputProps.name;
        }
        if (validInputProps.placeholder) {
            validInputProps.placeholder = this.i18n(validInputProps.placeholder);
        }
        var pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.

        var inputProps = _extends({}, validInputProps, { pattern: pattern });
        // Label is not valid on input
        delete inputProps.label;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJNT0RFIiwiaXNFZGl0IiwicHJvcFR5cGVzIiwiZGlzYWJsZWQiLCJib29sIiwiZXJyb3IiLCJzdHJpbmciLCJuYW1lIiwiaXNSZXF1aXJlZCIsIm9uQ2hhbmdlIiwiZnVuYyIsIm9uS2V5UHJlc3MiLCJwbGFjZWhvbGRlciIsInVuZm9ybWF0dGVyIiwiZm9ybWF0dGVyIiwidHlwZSIsInZhbHVlIiwib25lT2ZUeXBlIiwibnVtYmVyIiwiZGVmYXVsdFByb3BzIiwiSW5wdXRUZXh0IiwiZ2V0VmFsdWUiLCJwcm9wcyIsImRvbUVsIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiaHRtbElucHV0IiwiX2hhbmRsZUlucHV0Q2hhbmdlIiwiZXZ0IiwidGFyZ2V0IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW5wdXRUZXh0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVuZGVyIiwidmFsaWRJbnB1dFByb3BzIiwic3R5bGUiLCJ2YWx1ZVRvRm9ybWF0IiwiaWQiLCJpMThuIiwicGF0dGVybiIsImlucHV0UHJvcHMiLCJsYWJlbCIsInJlcXVpcmVkIiwiZXJyb3JJZCIsInY0IiwiY3NzQ2xhc3MiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxPQUFPLEVBQUVDLFFBQVEsSUFBVixFQUFiOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsY0FBVSxpQkFBVUMsSUFETjtBQUVkQyxXQUFPLGlCQUFVQyxNQUZIO0FBR2RDLFVBQU0saUJBQVVELE1BQVYsQ0FBaUJFLFVBSFQ7QUFJZEMsY0FBVSxpQkFBVUMsSUFBVixDQUFlRixVQUpYO0FBS2RHLGdCQUFZLGlCQUFVRCxJQUxSO0FBTWRFLGlCQUFhLGlCQUFVTixNQU5UO0FBT2RPLGlCQUFhLGlC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Q0FKLHVCQUFXLGtCQUFYLElBQWlDRyxPQUFqQztBQUNIO0FBQ0QsWUFBTUUsK0NBQTRDekMsUUFBUSxhQUFSLEdBQXdCLEVBQXBFLENBQU47O0FBRUEsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFXeUMsUUFBaEIsRUFBMEIsY0FBVyxZQUFyQyxFQUFrRCxLQUFJLFdBQXRELEVBQWtFLE9BQU9WLEtBQXpFO0FBQ0ksOERBQU8sV0FBVSxzQkFBakIsRUFBd0MsS0FBSSxXQUE1QyxJQUE0REssVUFBNUQsRUFESjtBQUVLN0IsMkJBQWU7QUFBQTtBQUFBLGtCQUFPLFdBQVUsc0JBQWpCLEVBQXdDLFNBQVNMLElBQWpEO0FBQXdELHFCQUFLZ0MsSUFBTCxDQUFVM0IsV0FBVjtBQUF4RCxhQUZwQjtBQUdLUCxxQkFBUztBQUFBO0FBQUEsa0JBQU0sV0FBVSxzQkFBaEIsRUFBdUMsSUFBSXVDLE9BQTNDO0FBQXNELHFCQUFLTCxJQUFMLENBQVVsQyxLQUFWO0FBQXREO0FBSGQsU0FESjtBQU9ILEs7Ozs7O0FBR0w7O0FBQ0FlLFVBQVUyQixXQUFWLEdBQXdCLFdBQXhCO0FBQ0EzQixVQUFVRCxZQUFWLEdBQXlCQSxZQUF6QjtBQUNBQyxVQUFVbEIsU0FBVixHQUFzQkEsU0FBdEI7O2tCQUVla0IsUyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2RlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJ2xvZGFzaC91dGlsaXR5JztcclxuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XHJcblxyXG5pbXBvcnQgQ29tcG9uZW50QmFzZUJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL2NvbXBvbmVudC1iYXNlJztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgZmlsdGVyUHJvcHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZmlsdGVyLWh0bWwtYXR0cmlidXRlcyc7XHJcbmNvbnN0IE1PREUgPSB7IGlzRWRpdDogdHJ1ZSB9O1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIG9uS2V5UHJlc3M6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB1bmZvcm1hdHRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBmb3JtYXR0ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIFByb3BUeXBlcy5udW1iZXJcclxuICAgIF0pXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBmb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgdW5mb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgdHlwZTogJ3RleHQnXHJcbn07XHJcblxyXG4vKipcclxuKiBDb21wb25lbnQgc3RhbmRpbmcgZm9yIGFuIEhUTUwgaW5wdXQuXHJcbiovXHJcbkBNREJlaGF2aW91cignaW5wdXRUZXh0JylcclxuQENvbXBvbmVudEJhc2VCZWhhdmlvdXJcclxuY2xhc3MgSW5wdXRUZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBkb20gdmFsdWUgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSB1bmZvcm1hdGVkIGRvbSB2YWx1ZS5cclxuICAgICovXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7dW5mb3JtYXR0ZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBkb21FbCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5odG1sSW5wdXQpO1xyXG4gICAgICAgIHJldHVybiB1bmZvcm1hdHRlcihkb21FbC52YWx1ZSwgTU9ERSk7XHJcbiAgICB9O1xyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHtlcnJvcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG1haW4gZGl2IGRvZXMgbm90IGhvbGQgYSBpcy1pbnZhbGlkIGNsYXNzIHdoZW4gdGhlcmUncyBubyBlcnJvclxyXG4gICAgICAgICAgICAvLyBNREwga2VlcHMgdGhlIGNsYXNzIGV2ZW4gaWYgUmVhY3QgcmVtb3ZlcyBpdFxyXG4gICAgICAgICAgICB0aGlzLnJlZnMuaW5wdXRUZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogSGFuZGxlIHRoZSBjaGFuZ2Ugb24gdGhlIGlucHV0IHRleHQsIGl0IG9ubHkgcHJvcGFnYXRlIHRoZSB2YWx1ZS5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSBldnQgLSBUaGUgcmVhY3QgRE9NIGV2ZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIGZ1bmN0aW9uIG9uQ2hhbm5nZSBmcm9tIHRoZSBwcm9wcywgY2FsbGVkLlxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVJbnB1dENoYW5nZSA9IChldnQpID0+IHtcclxuICAgICAgICBjb25zdCB7dW5mb3JtYXR0ZXIsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IGV2dC50YXJnZXQ7XHJcbiAgICAgICAgcmV0dXJuIG9uQ2hhbmdlKHVuZm9ybWF0dGVyKHZhbHVlLCBNT0RFKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgKiBAb3ZlcnJpZGVcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRJbnB1dFByb3BzID0gZmlsdGVyUHJvcHModGhpcy5wcm9wcyk7XHJcbiAgICAgICAgY29uc3QgeyBlcnJvciwgc3R5bGUsIGlzUmVxdWlyZWQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBuYW1lLCBwbGFjZWhvbGRlciwgdmFsdWU6IHZhbHVlVG9Gb3JtYXQgfSA9IHZhbGlkSW5wdXRQcm9wcztcclxuXHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLnZhbHVlID0gdGhpcy5wcm9wcy5mb3JtYXR0ZXIodmFsdWVUb0Zvcm1hdCwgTU9ERSk7XHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uQ2hhbmdlID0gdGhpcy5faGFuZGxlSW5wdXRDaGFuZ2U7XHJcbiAgICAgICAgLy8gVG8gcHJldmVudCByZWdyZXNzaW9uXHJcbiAgICAgICAgaWYgKHZhbGlkSW5wdXRQcm9wcy5uYW1lKSB7XHJcbiAgICAgICAgICAgIHZhbGlkSW5wdXRQcm9wcy5pZCA9IHZhbGlkSW5wdXRQcm9wcy5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsaWRJbnB1dFByb3BzLnBsYWNlaG9sZGVyKSB7XHJcbiAgICAgICAgICAgIHZhbGlkSW5wdXRQcm9wcy5wbGFjZWhvbGRlciA9IHRoaXMuaTE4bih2YWxpZElucHV0UHJvcHMucGxhY2Vob2xkZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXR0ZXJuID0gZXJyb3IgPyAnaGFzRXJyb3InIDogbnVsbDsgLy9hZGQgcGF0dGVybiB0byBvdmVyaWRlIG1kbCBlcnJvciBzdHlsZSB3aGVuIGRpc3BsYXlpbmcgYW4gZm9jdXMgZXJyb3IuXHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7IC4uLnZhbGlkSW5wdXRQcm9wcywgcGF0dGVybiB9O1xyXG4gICAgICAgIC8vIExhYmVsIGlzIG5vdCB2YWxpZCBvbiBpbnB1dFxyXG4gICAgICAgIGRlbGV0ZSBpbnB1dFByb3BzLmxhYmVsO1xyXG5cclxuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xyXG4gICAgICAgICAgICBpbnB1dFByb3BzLnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVycm9ySWQgPSBudWxsO1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICBpbnB1dFByb3BzWydhcmlhLWludmFsaWQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgIGVycm9ySWQgPSB1dWlkLnY0KCk7XHJcbiAgICAgICAgICAgIGlucHV0UHJvcHNbJ2FyaWEtZGVzY3JpYmVkYnknXSA9IGVycm9ySWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNzc0NsYXNzID0gYG1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZCR7ZXJyb3IgPyAnIGlzLWludmFsaWQnIDogJyd9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzc0NsYXNzfSBkYXRhLWZvY3VzPSdpbnB1dC10ZXh0JyByZWY9J2lucHV0VGV4dCcgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2lucHV0JyByZWY9J2h0bWxJbnB1dCcgey4uLmlucHV0UHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICB7cGxhY2Vob2xkZXIgJiYgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fbGFiZWwnIGh0bWxGb3I9e25hbWV9Pnt0aGlzLmkxOG4ocGxhY2Vob2xkZXIpfTwvbGFiZWw+fVxyXG4gICAgICAgICAgICAgICAge2Vycm9yICYmIDxzcGFuIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fZXJyb3InIGlkPXtlcnJvcklkfSA+e3RoaXMuaTE4bihlcnJvcil9PC9zcGFuPn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbklucHV0VGV4dC5kaXNwbGF5TmFtZSA9ICdJbnB1dFRleHQnO1xyXG5JbnB1dFRleHQuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5JbnB1dFRleHQucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXRUZXh0O1xyXG4iXX0=