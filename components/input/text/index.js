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
            style = _props.style;
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
        var cssClass = 'mdl-textfield mdl-js-textfield' + (error ? ' is-invalid' : '');

        return _react2.default.createElement(
            'div',
            { className: cssClass, 'data-focus': 'input-text', ref: 'inputText', style: style },
            _react2.default.createElement('input', _extends({ className: 'mdl-textfield__input', ref: 'htmlInput' }, inputProps)),
            _react2.default.createElement(
                'label',
                { className: 'mdl-textfield__label', htmlFor: name },
                this.i18n(placeholder)
            ),
            error && _react2.default.createElement(
                'span',
                { className: 'mdl-textfield__error' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJNT0RFIiwiaXNFZGl0IiwicHJvcFR5cGVzIiwiZGlzYWJsZWQiLCJib29sIiwiZXJyb3IiLCJzdHJpbmciLCJuYW1lIiwiaXNSZXF1aXJlZCIsIm9uQ2hhbmdlIiwiZnVuYyIsIm9uS2V5UHJlc3MiLCJwbGFjZWhvbGRlciIsInVuZm9ybWF0dGVyIiwiZm9ybWF0dGVyIiwidHlwZSIsInZhbHVlIiwib25lT2ZUeXBlIiwibnVtYmVyIiwiZGVmYXVsdFByb3BzIiwiSW5wdXRUZXh0IiwiZ2V0VmFsdWUiLCJwcm9wcyIsImRvbUVsIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiaHRtbElucHV0IiwiX2hhbmRsZUlucHV0Q2hhbmdlIiwiZXZ0IiwidGFyZ2V0IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW5wdXRUZXh0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVuZGVyIiwidmFsaWRJbnB1dFByb3BzIiwic3R5bGUiLCJ2YWx1ZVRvRm9ybWF0IiwiaWQiLCJpMThuIiwicGF0dGVybiIsImlucHV0UHJvcHMiLCJjc3NDbGFzcyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxPQUFPLEVBQUNDLFFBQVEsSUFBVCxFQUFiOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsY0FBVSxpQkFBVUMsSUFETjtBQUVkQyxXQUFPLGlCQUFVQyxNQUZIO0FBR2RDLFVBQU0saUJBQVVELE1BQVYsQ0FBaUJFLFVBSFQ7QUFJZEMsY0FBVSxpQkFBVUMsSUFBVixDQUFlRixVQUpYO0FBS2RHLGdCQUFZLGlCQUFVRCxJQUxSO0FBTWRFLGlCQUFhLGlCQUFVTixNQU5UO0FBT2RPLGlCQUFhLGlCQUFVSCxJQVBUO0FBUWRJLGVBQVcsaUJBQVVKLElBUlA7QUFTZEssVUFB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QUwsQ0FBVTNCLFdBQVY7QUFBeEQsYUFGSjtBQUdLUCxxQkFBUztBQUFBO0FBQUEsa0JBQU0sV0FBVSxzQkFBaEI7QUFBd0MscUJBQUtrQyxJQUFMLENBQVVsQyxLQUFWO0FBQXhDO0FBSGQsU0FESjtBQU9ILEs7Ozs7O0FBR0w7O0FBQ0FlLFVBQVV1QixXQUFWLEdBQXdCLFdBQXhCO0FBQ0F2QixVQUFVRCxZQUFWLEdBQXlCQSxZQUF6QjtBQUNBQyxVQUFVbEIsU0FBVixHQUFzQkEsU0FBdEI7O2tCQUVla0IsUyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2RlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHtpZGVudGl0eX0gZnJvbSAnbG9kYXNoL3V0aWxpdHknO1xyXG5pbXBvcnQgQ29tcG9uZW50QmFzZUJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL2NvbXBvbmVudC1iYXNlJztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgZmlsdGVyUHJvcHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZmlsdGVyLWh0bWwtYXR0cmlidXRlcyc7XHJcbmNvbnN0IE1PREUgPSB7aXNFZGl0OiB0cnVlfTtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBvbktleVByZXNzOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdW5mb3JtYXR0ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgZm9ybWF0dGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBQcm9wVHlwZXMubnVtYmVyXHJcbiAgICBdKVxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgZm9ybWF0dGVyOiBpZGVudGl0eSxcclxuICAgIHVuZm9ybWF0dGVyOiBpZGVudGl0eSxcclxuICAgIHR5cGU6ICd0ZXh0J1xyXG59O1xyXG5cclxuLyoqXHJcbiogQ29tcG9uZW50IHN0YW5kaW5nIGZvciBhbiBIVE1MIGlucHV0LlxyXG4qL1xyXG5ATURCZWhhdmlvdXIoJ2lucHV0VGV4dCcpXHJcbkBDb21wb25lbnRCYXNlQmVoYXZpb3VyXHJcbmNsYXNzIElucHV0VGV4dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgZG9tIHZhbHVlIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgdW5mb3JtYXRlZCBkb20gdmFsdWUuXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3VuZm9ybWF0dGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgZG9tRWwgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuaHRtbElucHV0KTtcclxuICAgICAgICByZXR1cm4gdW5mb3JtYXR0ZXIoZG9tRWwudmFsdWUsIE1PREUpO1xyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB7ZXJyb3J9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBtYWluIGRpdiBkb2VzIG5vdCBob2xkIGEgaXMtaW52YWxpZCBjbGFzcyB3aGVuIHRoZXJlJ3Mgbm8gZXJyb3JcclxuICAgICAgICAgICAgLy8gTURMIGtlZXBzIHRoZSBjbGFzcyBldmVuIGlmIFJlYWN0IHJlbW92ZXMgaXRcclxuICAgICAgICAgICAgdGhpcy5yZWZzLmlucHV0VGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSB0aGUgY2hhbmdlIG9uIHRoZSBpbnB1dCB0ZXh0LCBpdCBvbmx5IHByb3BhZ2F0ZSB0aGUgdmFsdWUuXHJcbiAgICAqIEBwYXJhbSAge29iamVjdH0gZXZ0IC0gVGhlIHJlYWN0IERPTSBldmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBmdW5jdGlvbiBvbkNoYW5uZ2UgZnJvbSB0aGUgcHJvcHMsIGNhbGxlZC5cclxuICAgICovXHJcbiAgICBfaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZ0KSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3VuZm9ybWF0dGVyLCBvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSBldnQudGFyZ2V0O1xyXG4gICAgICAgIHJldHVybiBvbkNoYW5nZSh1bmZvcm1hdHRlcih2YWx1ZSwgTU9ERSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogQGluaGVyaXRkb2NcclxuICAgICogQG92ZXJyaWRlXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkSW5wdXRQcm9wcyA9IGZpbHRlclByb3BzKHRoaXMucHJvcHMpO1xyXG4gICAgICAgIGNvbnN0IHsgZXJyb3IsIHN0eWxlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgbmFtZSwgcGxhY2Vob2xkZXIsIHZhbHVlOiB2YWx1ZVRvRm9ybWF0IH0gPSB2YWxpZElucHV0UHJvcHM7XHJcblxyXG4gICAgICAgIHZhbGlkSW5wdXRQcm9wcy52YWx1ZSA9IHRoaXMucHJvcHMuZm9ybWF0dGVyKHZhbHVlVG9Gb3JtYXQsIE1PREUpO1xyXG4gICAgICAgIHZhbGlkSW5wdXRQcm9wcy5vbkNoYW5nZSA9IHRoaXMuX2hhbmRsZUlucHV0Q2hhbmdlO1xyXG4gICAgICAgIC8vIFRvIHByZXZlbnQgcmVncmVzc2lvblxyXG4gICAgICAgIGlmICh2YWxpZElucHV0UHJvcHMubmFtZSkge1xyXG4gICAgICAgICAgICB2YWxpZElucHV0UHJvcHMuaWQgPSB2YWxpZElucHV0UHJvcHMubmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbGlkSW5wdXRQcm9wcy5wbGFjZWhvbGRlcikge1xyXG4gICAgICAgICAgICB2YWxpZElucHV0UHJvcHMucGxhY2Vob2xkZXIgPSB0aGlzLmkxOG4odmFsaWRJbnB1dFByb3BzLnBsYWNlaG9sZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IGVycm9yID8gJ2hhc0Vycm9yJyA6IG51bGw7IC8vYWRkIHBhdHRlcm4gdG8gb3ZlcmlkZSBtZGwgZXJyb3Igc3R5bGUgd2hlbiBkaXNwbGF5aW5nIGFuIGZvY3VzIGVycm9yLlxyXG5cclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0gey4uLnZhbGlkSW5wdXRQcm9wcywgcGF0dGVybn07XHJcbiAgICAgICAgY29uc3QgY3NzQ2xhc3MgPSBgbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkJHtlcnJvciA/ICcgaXMtaW52YWxpZCcgOiAnJ31gO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzQ2xhc3N9IGRhdGEtZm9jdXM9J2lucHV0LXRleHQnIHJlZj0naW5wdXRUZXh0JyBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9faW5wdXQnIHJlZj0naHRtbElucHV0JyB7Li4uaW5wdXRQcm9wc30gLz5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2xhYmVsJyBodG1sRm9yPXtuYW1lfT57dGhpcy5pMThuKHBsYWNlaG9sZGVyKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAge2Vycm9yICYmIDxzcGFuIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fZXJyb3InPnt0aGlzLmkxOG4oZXJyb3IpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5JbnB1dFRleHQuZGlzcGxheU5hbWUgPSAnSW5wdXRUZXh0JztcclxuSW5wdXRUZXh0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuSW5wdXRUZXh0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0VGV4dDtcclxuIl19