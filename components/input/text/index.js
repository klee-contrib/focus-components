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
            type = _props.type;

        var value = formatter(rawValue, MODE);
        var pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        var inputProps = { autoFocus: autoFocus, disabled: disabled, onKeyDown: onKeyDown, onKeyPress: onKeyPress, onBlur: onBlur, maxLength: maxLength, onFocus: onFocus, onClick: onClick, id: name, onChange: this._handleInputChange, pattern: pattern, size: size, type: type, value: !value ? '' : value };
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
            _react2.default.createElement(
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJNT0RFIiwiaXNFZGl0IiwicHJvcFR5cGVzIiwiZGlzYWJsZWQiLCJib29sIiwiZXJyb3IiLCJzdHJpbmciLCJuYW1lIiwiaXNSZXF1aXJlZCIsIm9uQ2hhbmdlIiwiZnVuYyIsIm9uS2V5UHJlc3MiLCJwbGFjZWhvbGRlciIsInVuZm9ybWF0dGVyIiwiZm9ybWF0dGVyIiwidHlwZSIsInZhbHVlIiwib25lT2ZUeXBlIiwibnVtYmVyIiwiZGVmYXVsdFByb3BzIiwiSW5wdXRUZXh0IiwiZ2V0VmFsdWUiLCJwcm9wcyIsImRvbUVsIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiaHRtbElucHV0IiwiX2hhbmRsZUlucHV0Q2hhbmdlIiwiZXZ0IiwidGFyZ2V0IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW5wdXRUZXh0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVuZGVyIiwiYXV0b0ZvY3VzIiwib25CbHVyIiwibWF4TGVuZ3RoIiwib25Gb2N1cyIsIm9uQ2xpY2siLCJvbktleURvd24iLCJzdHlsZSIsInJhd1ZhbHVlIiwic2l6ZSIsInBhdHRlcm4iLCJpbnB1dFByb3BzIiwiaWQiLCJlcnJvcklkIiwidjQiLCJjc3NDbGFzcyIsImkxOG4iLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxFQUFFQyxRQUFRLElBQVYsRUFBYjs7QUFFQSxJQUFNQyxZQUFZO0FBQ2RDLGNBQVUsaUJBQVVDLElBRE47QUFFZEMsV0FBTyxpQkFBVUMsTUFGSDtBQUdkQyxVQUFNLGlCQUFVRCxNQUFWLENBQWlCRSxVQUhUO0FBSWRDLGNBQVUsaUJBQVVDLElBQVYsQ0FBZUYsVUFKWDtBQUtkRyxnQkFBWSxpQkFBVUQsSUFMUjtBQU1kRSxpQkFBYSxpQkFB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SkMsT0FBTyxDQUFDQSxLQUFELEdBQVMsRUFBVCxHQUFjQSxLQUExSyxFQUFwQjtBQUNBLFlBQUkrQixVQUFVLElBQWQ7QUFDQSxZQUFJMUMsS0FBSixFQUFXO0FBQ1B3Qyx1QkFBVyxjQUFYLElBQTZCLElBQTdCO0FBQ0FFLHNCQUFVLGVBQUtDLEVBQUwsRUFBVjtBQUNBSCx1QkFBVyxrQkFBWCxJQUFpQ0UsT0FBakM7QUFDSDtBQUNELFlBQU1FLCtDQUE0QzVDLFFBQVEsYUFBUixHQUF3QixFQUFwRSxDQUFOO0FBQ0EsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFXNEMsUUFBaEIsRUFBMEIsY0FBVyxZQUFyQyxFQUFrRCxLQUFJLFdBQXRELEVBQWtFLE9BQU9SLEtBQXpFO0FBQ0ksOERBQU8sV0FBVSxzQkFBakIsRUFBd0MsS0FBSSxXQUE1QyxJQUE0REksVUFBNUQsRUFESjtBQUVJO0FBQUE7QUFBQSxrQkFBTyxXQUFVLHNCQUFqQixFQUF3QyxTQUFTdEMsSUFBakQ7QUFBd0QscUJBQUsyQyxJQUFMLENBQVV0QyxXQUFWO0FBQXhELGFBRko7QUFHS1AscUJBQVM7QUFBQTtBQUFBLGtCQUFNLFdBQVUsc0JBQWhCLEVBQXVDLElBQUkwQyxPQUEzQztBQUFzRCxxQkFBS0csSUFBTCxDQUFVN0MsS0FBVjtBQUF0RDtBQUhkLFNBREo7QUFPSCxLOzs7OztBQUdMOztBQUNBZSxVQUFVK0IsV0FBVixHQUF3QixXQUF4QjtBQUNBL0IsVUFBVUQsWUFBVixHQUF5QkEsWUFBekI7QUFDQUMsVUFBVWxCLFNBQVYsR0FBc0JBLFNBQXRCOztrQkFFZWtCLFMiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9kZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgaWRlbnRpdHkgfSBmcm9tICdsb2Rhc2gvdXRpbGl0eSc7XHJcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xyXG5cclxuaW1wb3J0IENvbXBvbmVudEJhc2VCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9jb21wb25lbnQtYmFzZSc7XHJcbmltcG9ydCBNREJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuXHJcbmNvbnN0IE1PREUgPSB7IGlzRWRpdDogdHJ1ZSB9O1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIG9uS2V5UHJlc3M6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB1bmZvcm1hdHRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBmb3JtYXR0ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIFByb3BUeXBlcy5udW1iZXJcclxuICAgIF0pXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBmb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgdW5mb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgdHlwZTogJ3RleHQnXHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHN0YW5kaW5nIGZvciBhbiBIVE1MIGlucHV0LlxyXG4gKi9cclxuQE1EQmVoYXZpb3VyKCdpbnB1dFRleHQnKVxyXG5AQ29tcG9uZW50QmFzZUJlaGF2aW91clxyXG5jbGFzcyBJbnB1dFRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBkb20gdmFsdWUgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgdW5mb3JtYXRlZCBkb20gdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt1bmZvcm1hdHRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGRvbUVsID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmh0bWxJbnB1dCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZm9ybWF0dGVyKGRvbUVsLnZhbHVlLCBNT0RFKTtcclxuICAgIH07XHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgbWFpbiBkaXYgZG9lcyBub3QgaG9sZCBhIGlzLWludmFsaWQgY2xhc3Mgd2hlbiB0aGVyZSdzIG5vIGVycm9yXHJcbiAgICAgICAgICAgIC8vIE1ETCBrZWVwcyB0aGUgY2xhc3MgZXZlbiBpZiBSZWFjdCByZW1vdmVzIGl0XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5pbnB1dFRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIHRoZSBjaGFuZ2Ugb24gdGhlIGlucHV0IHRleHQsIGl0IG9ubHkgcHJvcGFnYXRlIHRoZSB2YWx1ZS5cclxuICAgICAqIEBwYXJhbSAge29iamVjdH0gZXZ0IC0gVGhlIHJlYWN0IERPTSBldmVudC5cclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZnVuY3Rpb24gb25DaGFubmdlIGZyb20gdGhlIHByb3BzLCBjYWxsZWQuXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVJbnB1dENoYW5nZSA9IChldnQpID0+IHtcclxuICAgICAgICBjb25zdCB7dW5mb3JtYXR0ZXIsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IGV2dC50YXJnZXQ7XHJcbiAgICAgICAgcmV0dXJuIG9uQ2hhbmdlKHVuZm9ybWF0dGVyKHZhbHVlLCBNT0RFKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYXV0b0ZvY3VzLCBvbkJsdXIsIGRpc2FibGVkLCBmb3JtYXR0ZXIsIHVuZm9ybWF0dGVyLCBtYXhMZW5ndGgsIG9uRm9jdXMsIG9uQ2xpY2ssIG9uS2V5RG93biwgb25LZXlQcmVzcywgZXJyb3IsIG5hbWUsIHBsYWNlaG9sZGVyLCBzdHlsZSwgdmFsdWU6IHJhd1ZhbHVlLCBzaXplLCB0eXBlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBmb3JtYXR0ZXIocmF3VmFsdWUsIE1PREUpO1xyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSBlcnJvciA/ICdoYXNFcnJvcicgOiBudWxsOyAvL2FkZCBwYXR0ZXJuIHRvIG92ZXJpZGUgbWRsIGVycm9yIHN0eWxlIHdoZW4gZGlzcGxheWluZyBhbiBmb2N1cyBlcnJvci5cclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0gIHsgYXV0b0ZvY3VzLCBkaXNhYmxlZCwgb25LZXlEb3duLCBvbktleVByZXNzLCBvbkJsdXIsIG1heExlbmd0aCwgb25Gb2N1cywgb25DbGljaywgaWQ6IG5hbWUsIG9uQ2hhbmdlOiB0aGlzLl9oYW5kbGVJbnB1dENoYW5nZSwgcGF0dGVybiwgc2l6ZSwgdHlwZSwgdmFsdWU6ICF2YWx1ZSA/ICcnIDogdmFsdWV9O1xyXG4gICAgICAgIGxldCBlcnJvcklkID0gbnVsbDtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgaW5wdXRQcm9wc1snYXJpYS1pbnZhbGlkJ10gPSB0cnVlO1xyXG4gICAgICAgICAgICBlcnJvcklkID0gdXVpZC52NCgpO1xyXG4gICAgICAgICAgICBpbnB1dFByb3BzWydhcmlhLWRlc2NyaWJlZGJ5J10gPSBlcnJvcklkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjc3NDbGFzcyA9IGBtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGQke2Vycm9yID8gJyBpcy1pbnZhbGlkJyA6ICcnfWA7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzc0NsYXNzfSBkYXRhLWZvY3VzPSdpbnB1dC10ZXh0JyByZWY9J2lucHV0VGV4dCcgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2lucHV0JyByZWY9J2h0bWxJbnB1dCcgey4uLmlucHV0UHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCcgaHRtbEZvcj17bmFtZX0+e3RoaXMuaTE4bihwbGFjZWhvbGRlcil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIHtlcnJvciAmJiA8c3BhbiBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2Vycm9yJyBpZD17ZXJyb3JJZH0gPnt0aGlzLmkxOG4oZXJyb3IpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5JbnB1dFRleHQuZGlzcGxheU5hbWUgPSAnSW5wdXRUZXh0JztcclxuSW5wdXRUZXh0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuSW5wdXRUZXh0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0VGV4dDtcclxuIl19