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

var _identity = require('lodash/identity');

var _identity2 = _interopRequireDefault(_identity);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _material = require('../../behaviours/material');

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
    formatter: _identity2.default,
    unformatter: _identity2.default,
    type: 'text'
};

/**
 * Component standing for an HTML input.
 */
var InputText = (_dec = (0, _material2.default)('inputText'), _dec(_class = function (_Component) {
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
            var _this$props = _this.props;
            var unformatter = _this$props.unformatter;
            var onChange = _this$props.onChange;
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
        var _props = this.props;
        var autoFocus = _props.autoFocus;
        var disabled = _props.disabled;
        var formatter = _props.formatter;
        var maxLength = _props.maxLength;
        var onFocus = _props.onFocus;
        var onClick = _props.onClick;
        var onKeyDown = _props.onKeyDown;
        var onKeyPress = _props.onKeyPress;
        var error = _props.error;
        var name = _props.name;
        var placeholder = _props.placeholder;
        var style = _props.style;
        var rawValue = _props.value;
        var size = _props.size;
        var type = _props.type;

        var value = formatter(rawValue, MODE);
        var pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        var inputProps = { autoFocus: autoFocus, disabled: disabled, onKeyDown: onKeyDown, onKeyPress: onKeyPress, maxLength: maxLength, onFocus: onFocus, onClick: onClick, id: name, onChange: this._handleInputChange, pattern: pattern, size: size, type: type, value: value };
        var cssClass = 'mdl-textfield mdl-js-textfield' + (error ? ' is-invalid' : '');
        return _react2.default.createElement(
            'div',
            { className: cssClass, 'data-focus': 'input-text', ref: 'inputText', style: style },
            _react2.default.createElement('input', _extends({ className: 'mdl-textfield__input', ref: 'htmlInput' }, inputProps)),
            _react2.default.createElement(
                'label',
                { className: 'mdl-textfield__label', htmlFor: name },
                _i18next2.default.t(placeholder)
            ),
            error && _react2.default.createElement(
                'span',
                { className: 'mdl-textfield__error' },
                _i18next2.default.t(error)
            )
        );
    };

    return InputText;
}(_react.Component)) || _class);

//Static props.

InputText.displayName = 'InputText';
InputText.defaultProps = defaultProps;
InputText.propTypes = propTypes;

exports.default = InputText;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIk1PREUiLCJpc0VkaXQiLCJwcm9wVHlwZXMiLCJkaXNhYmxlZCIsImJvb2wiLCJlcnJvciIsInN0cmluZyIsIm5hbWUiLCJpc1JlcXVpcmVkIiwib25DaGFuZ2UiLCJmdW5jIiwib25LZXlQcmVzcyIsInBsYWNlaG9sZGVyIiwidW5mb3JtYXR0ZXIiLCJmb3JtYXR0ZXIiLCJ0eXBlIiwidmFsdWUiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJkZWZhdWx0UHJvcHMiLCJJbnB1dFRleHQiLCJnZXRWYWx1ZSIsInByb3BzIiwiZG9tRWwiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJodG1sSW5wdXQiLCJfaGFuZGxlSW5wdXRDaGFuZ2UiLCJldnQiLCJ0YXJnZXQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJpbnB1dFRleHQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJyZW5kZXIiLCJhdXRvRm9jdXMiLCJtYXhMZW5ndGgiLCJvbkZvY3VzIiwib25DbGljayIsIm9uS2V5RG93biIsInN0eWxlIiwicmF3VmFsdWUiLCJzaXplIiwicGF0dGVybiIsImlucHV0UHJvcHMiLCJpZCIsImNzc0NsYXNzIiwidCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxPQUFPLEVBQUNDLFFBQVEsSUFBVCxFQUFiOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsY0FBVSxpQkFBVUMsSUFETjtBQUVkQyxXQUFPLGlCQUFVQyxNQUZIO0FBR2RDLFVBQU0saUJBQVVELE1BQVYsQ0FBaUJFLFVBSFQ7QUFJZEMsY0FBVSxpQkFBVUMsSUFBVixDQUFlRixVQUpYO0FBS2RHLGdCQUFZLGlCQUFVRCxJQUxSO0FBTWRFLGlCQUFhLGlCQUFVTixNQU5UO0FBT2RPLGlCQUFhLGlCQUFVSCxJQVBUO0FBUWRJLGVBQVcsaUJBQVVKLElB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QUFXeUMsUUFBaEIsRUFBMEIsY0FBVyxZQUFyQyxFQUFrRCxLQUFJLFdBQXRELEVBQWtFLE9BQU9OLEtBQXpFO0FBQ0ksOERBQU8sV0FBVSxzQkFBakIsRUFBd0MsS0FBSSxXQUE1QyxJQUE0REksVUFBNUQsRUFESjtBQUVJO0FBQUE7QUFBQSxrQkFBTyxXQUFVLHNCQUFqQixFQUF3QyxTQUFTckMsSUFBakQ7QUFBd0Qsa0NBQVF3QyxDQUFSLENBQVVuQyxXQUFWO0FBQXhELGFBRko7QUFHS1AscUJBQVM7QUFBQTtBQUFBLGtCQUFNLFdBQVUsc0JBQWhCO0FBQXdDLGtDQUFRMEMsQ0FBUixDQUFVMUMsS0FBVjtBQUF4QztBQUhkLFNBREo7QUFPSCxLOztXQTlDQ2UsUzs7O0FBaUROOztBQUNBQSxVQUFVNEIsV0FBVixHQUF3QixXQUF4QjtBQUNBNUIsVUFBVUQsWUFBVixHQUF5QkEsWUFBekI7QUFDQUMsVUFBVWxCLFNBQVYsR0FBc0JBLFNBQXRCOztrQkFFZWtCLFMiLCJmaWxlIjoiZnItRlIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2RlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IGlkZW50aXR5IGZyb20gJ2xvZGFzaC9pZGVudGl0eSc7XHJcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5pbXBvcnQgTURCZWhhdmlvdXIgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmNvbnN0IE1PREUgPSB7aXNFZGl0OiB0cnVlfTtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBvbktleVByZXNzOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdW5mb3JtYXR0ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgZm9ybWF0dGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBQcm9wVHlwZXMubnVtYmVyXHJcbiAgICBdKVxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgZm9ybWF0dGVyOiBpZGVudGl0eSxcclxuICAgIHVuZm9ybWF0dGVyOiBpZGVudGl0eSxcclxuICAgIHR5cGU6ICd0ZXh0J1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCBzdGFuZGluZyBmb3IgYW4gSFRNTCBpbnB1dC5cclxuICovXHJcbkBNREJlaGF2aW91cignaW5wdXRUZXh0JylcclxuY2xhc3MgSW5wdXRUZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZG9tIHZhbHVlIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHVuZm9ybWF0ZWQgZG9tIHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7dW5mb3JtYXR0ZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBkb21FbCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5odG1sSW5wdXQpO1xyXG4gICAgICAgIHJldHVybiB1bmZvcm1hdHRlcihkb21FbC52YWx1ZSwgTU9ERSk7XHJcbiAgICB9O1xyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHtlcnJvcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG1haW4gZGl2IGRvZXMgbm90IGhvbGQgYSBpcy1pbnZhbGlkIGNsYXNzIHdoZW4gdGhlcmUncyBubyBlcnJvclxyXG4gICAgICAgICAgICAvLyBNREwga2VlcHMgdGhlIGNsYXNzIGV2ZW4gaWYgUmVhY3QgcmVtb3ZlcyBpdFxyXG4gICAgICAgICAgICB0aGlzLnJlZnMuaW5wdXRUZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSB0aGUgY2hhbmdlIG9uIHRoZSBpbnB1dCB0ZXh0LCBpdCBvbmx5IHByb3BhZ2F0ZSB0aGUgdmFsdWUuXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2dCAtIFRoZSByZWFjdCBET00gZXZlbnQuXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIGZ1bmN0aW9uIG9uQ2hhbm5nZSBmcm9tIHRoZSBwcm9wcywgY2FsbGVkLlxyXG4gICAgICovXHJcbiAgICBfaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZ0KSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3VuZm9ybWF0dGVyLCBvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSBldnQudGFyZ2V0O1xyXG4gICAgICAgIHJldHVybiBvbkNoYW5nZSh1bmZvcm1hdHRlcih2YWx1ZSwgTU9ERSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBvdmVycmlkZVxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGF1dG9Gb2N1cywgZGlzYWJsZWQsIGZvcm1hdHRlciwgbWF4TGVuZ3RoLCBvbkZvY3VzLCBvbkNsaWNrLCBvbktleURvd24sIG9uS2V5UHJlc3MsIGVycm9yLCBuYW1lLCBwbGFjZWhvbGRlciwgc3R5bGUsIHZhbHVlOiByYXdWYWx1ZSwgc2l6ZSwgdHlwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZm9ybWF0dGVyKHJhd1ZhbHVlLCBNT0RFKTtcclxuICAgICAgICBjb25zdCBwYXR0ZXJuID0gZXJyb3IgPyAnaGFzRXJyb3InIDogbnVsbDsgLy9hZGQgcGF0dGVybiB0byBvdmVyaWRlIG1kbCBlcnJvciBzdHlsZSB3aGVuIGRpc3BsYXlpbmcgYW4gZm9jdXMgZXJyb3IuXHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9ICB7IGF1dG9Gb2N1cywgZGlzYWJsZWQsIG9uS2V5RG93bixvbktleVByZXNzLCBtYXhMZW5ndGgsIG9uRm9jdXMsIG9uQ2xpY2ssIGlkOiBuYW1lLCBvbkNoYW5nZTogdGhpcy5faGFuZGxlSW5wdXRDaGFuZ2UsIHBhdHRlcm4sIHNpemUsIHR5cGUsIHZhbHVlIH07XHJcbiAgICAgICAgY29uc3QgY3NzQ2xhc3MgPSBgbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkJHtlcnJvciA/ICcgaXMtaW52YWxpZCcgOiAnJ31gO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3NDbGFzc30gZGF0YS1mb2N1cz0naW5wdXQtdGV4dCcgcmVmPSdpbnB1dFRleHQnIHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19pbnB1dCcgcmVmPSdodG1sSW5wdXQnIHsuLi5pbnB1dFByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fbGFiZWwnIGh0bWxGb3I9e25hbWV9PntpMThuZXh0LnQocGxhY2Vob2xkZXIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICB7ZXJyb3IgJiYgPHNwYW4gY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19lcnJvcic+e2kxOG5leHQudChlcnJvcil9PC9zcGFuPn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbklucHV0VGV4dC5kaXNwbGF5TmFtZSA9ICdJbnB1dFRleHQnO1xyXG5JbnB1dFRleHQuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5JbnB1dFRleHQucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXRUZXh0O1xyXG4iXX0=