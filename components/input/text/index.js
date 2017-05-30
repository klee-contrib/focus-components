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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJNT0RFIiwiaXNFZGl0IiwicHJvcFR5cGVzIiwiZGlzYWJsZWQiLCJib29sIiwiZXJyb3IiLCJzdHJpbmciLCJuYW1lIiwiaXNSZXF1aXJlZCIsIm9uQ2hhbmdlIiwiZnVuYyIsIm9uS2V5UHJlc3MiLCJwbGFjZWhvbGRlciIsInVuZm9ybWF0dGVyIiwiZm9ybWF0dGVyIiwidHlwZSIsInZhbHVlIiwib25lT2ZUeXBlIiwibnVtYmVyIiwiZGVmYXVsdFByb3BzIiwiSW5wdXRUZXh0IiwiZ2V0VmFsdWUiLCJwcm9wcyIsImRvbUVsIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiaHRtbElucHV0IiwiX2hhbmRsZUlucHV0Q2hhbmdlIiwiZXZ0IiwidGFyZ2V0IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW5wdXRUZXh0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVuZGVyIiwidmFsaWRJbnB1dFByb3BzIiwic3R5bGUiLCJ2YWx1ZVRvRm9ybWF0IiwiaWQiLCJpMThuIiwicGF0dGVybiIsImlucHV0UHJvcHMiLCJyZXF1aXJlZCIsImVycm9ySWQiLCJ2NCIsImNzc0NsYXNzIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsT0FBTyxFQUFDQyxRQUFRLElBQVQsRUFBYjs7QUFFQSxJQUFNQyxZQUFZO0FBQ2RDLGNBQVUsaUJBQVVDLElBRE47QUFFZEMsV0FBTyxpQkFBVUMsTUFGSDtBQUdkQyxVQUFNLGlCQUFVRCxNQUFWLENBQWlCRSxVQUhUO0FBSWRDLGNBQVUsaUJBQVVDLElBQVYsQ0FBZUYsVUFKWDtBQUtkRyxnQkFBWSxpQkFBVUQsSUFMUjtBQU1kRSxpQkFBYSxpQkFBVU4sTUFOVDtBQU9kTyxpQkFBYSxpQkFBVUgsSUFQ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RCxZQUFNRSwrQ0FBNEN4QyxRQUFRLGFBQVIsR0FBd0IsRUFBcEUsQ0FBTjs7QUFFQSxlQUNJO0FBQUE7QUFBQSxjQUFLLFdBQVd3QyxRQUFoQixFQUEwQixjQUFXLFlBQXJDLEVBQWtELEtBQUksV0FBdEQsRUFBa0UsT0FBT1QsS0FBekU7QUFDSSw4REFBTyxXQUFVLHNCQUFqQixFQUF3QyxLQUFJLFdBQTVDLElBQTRESyxVQUE1RCxFQURKO0FBRUs3QiwyQkFBZTtBQUFBO0FBQUEsa0JBQU8sV0FBVSxzQkFBakIsRUFBd0MsU0FBU0wsSUFBakQ7QUFBd0QscUJBQUtnQyxJQUFMLENBQVUzQixXQUFWO0FBQXhELGFBRnBCO0FBR0tQLHFCQUFTO0FBQUE7QUFBQSxrQkFBTSxXQUFVLHNCQUFoQixFQUF1QyxJQUFJc0MsT0FBM0M7QUFBc0QscUJBQUtKLElBQUwsQ0FBVWxDLEtBQVY7QUFBdEQ7QUFIZCxTQURKO0FBT0gsSzs7Ozs7QUFHTDs7QUFDQWUsVUFBVTBCLFdBQVYsR0FBd0IsV0FBeEI7QUFDQTFCLFVBQVVELFlBQVYsR0FBeUJBLFlBQXpCO0FBQ0FDLFVBQVVsQixTQUFWLEdBQXNCQSxTQUF0Qjs7a0JBRWVrQixTIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vZGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQge2lkZW50aXR5fSBmcm9tICdsb2Rhc2gvdXRpbGl0eSc7XHJcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xyXG5cclxuaW1wb3J0IENvbXBvbmVudEJhc2VCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9jb21wb25lbnQtYmFzZSc7XHJcbmltcG9ydCBNREJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuaW1wb3J0IGZpbHRlclByb3BzIGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZpbHRlci1odG1sLWF0dHJpYnV0ZXMnO1xyXG5jb25zdCBNT0RFID0ge2lzRWRpdDogdHJ1ZX07XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgb25LZXlQcmVzczogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHVuZm9ybWF0dGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGZvcm1hdHRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgUHJvcFR5cGVzLm51bWJlclxyXG4gICAgXSlcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGZvcm1hdHRlcjogaWRlbnRpdHksXHJcbiAgICB1bmZvcm1hdHRlcjogaWRlbnRpdHksXHJcbiAgICB0eXBlOiAndGV4dCdcclxufTtcclxuXHJcbi8qKlxyXG4qIENvbXBvbmVudCBzdGFuZGluZyBmb3IgYW4gSFRNTCBpbnB1dC5cclxuKi9cclxuQE1EQmVoYXZpb3VyKCdpbnB1dFRleHQnKVxyXG5AQ29tcG9uZW50QmFzZUJlaGF2aW91clxyXG5jbGFzcyBJbnB1dFRleHQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGRvbSB2YWx1ZSBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHVuZm9ybWF0ZWQgZG9tIHZhbHVlLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt1bmZvcm1hdHRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGRvbUVsID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmh0bWxJbnB1dCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZm9ybWF0dGVyKGRvbUVsLnZhbHVlLCBNT0RFKTtcclxuICAgIH07XHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgbWFpbiBkaXYgZG9lcyBub3QgaG9sZCBhIGlzLWludmFsaWQgY2xhc3Mgd2hlbiB0aGVyZSdzIG5vIGVycm9yXHJcbiAgICAgICAgICAgIC8vIE1ETCBrZWVwcyB0aGUgY2xhc3MgZXZlbiBpZiBSZWFjdCByZW1vdmVzIGl0XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5pbnB1dFRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgdGhlIGNoYW5nZSBvbiB0aGUgaW5wdXQgdGV4dCwgaXQgb25seSBwcm9wYWdhdGUgdGhlIHZhbHVlLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2dCAtIFRoZSByZWFjdCBET00gZXZlbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZnVuY3Rpb24gb25DaGFubmdlIGZyb20gdGhlIHByb3BzLCBjYWxsZWQuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZUlucHV0Q2hhbmdlID0gKGV2dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt1bmZvcm1hdHRlciwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gZXZ0LnRhcmdldDtcclxuICAgICAgICByZXR1cm4gb25DaGFuZ2UodW5mb3JtYXR0ZXIodmFsdWUsIE1PREUpKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAqIEBvdmVycmlkZVxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB2YWxpZElucHV0UHJvcHMgPSBmaWx0ZXJQcm9wcyh0aGlzLnByb3BzKTtcclxuICAgICAgICBjb25zdCB7IGVycm9yLCBzdHlsZSwgaXNSZXF1aXJlZCB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IG5hbWUsIHBsYWNlaG9sZGVyLCB2YWx1ZTogdmFsdWVUb0Zvcm1hdCB9ID0gdmFsaWRJbnB1dFByb3BzO1xyXG5cclxuICAgICAgICB2YWxpZElucHV0UHJvcHMudmFsdWUgPSB0aGlzLnByb3BzLmZvcm1hdHRlcih2YWx1ZVRvRm9ybWF0LCBNT0RFKTtcclxuICAgICAgICB2YWxpZElucHV0UHJvcHMub25DaGFuZ2UgPSB0aGlzLl9oYW5kbGVJbnB1dENoYW5nZTtcclxuICAgICAgICAvLyBUbyBwcmV2ZW50IHJlZ3Jlc3Npb25cclxuICAgICAgICBpZiAodmFsaWRJbnB1dFByb3BzLm5hbWUpIHtcclxuICAgICAgICAgICAgdmFsaWRJbnB1dFByb3BzLmlkID0gdmFsaWRJbnB1dFByb3BzLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWxpZElucHV0UHJvcHMucGxhY2Vob2xkZXIpIHtcclxuICAgICAgICAgICAgdmFsaWRJbnB1dFByb3BzLnBsYWNlaG9sZGVyID0gdGhpcy5pMThuKHZhbGlkSW5wdXRQcm9wcy5wbGFjZWhvbGRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSBlcnJvciA/ICdoYXNFcnJvcicgOiBudWxsOyAvL2FkZCBwYXR0ZXJuIHRvIG92ZXJpZGUgbWRsIGVycm9yIHN0eWxlIHdoZW4gZGlzcGxheWluZyBhbiBmb2N1cyBlcnJvci5cclxuXHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHsuLi52YWxpZElucHV0UHJvcHMsIHBhdHRlcm59O1xyXG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgIGlucHV0UHJvcHMucmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZXJyb3JJZCA9IG51bGw7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlucHV0UHJvcHNbJ2FyaWEtaW52YWxpZCddID0gdHJ1ZTtcclxuICAgICAgICAgICAgZXJyb3JJZCA9IHV1aWQudjQoKTtcclxuICAgICAgICAgICAgaW5wdXRQcm9wc1snYXJpYS1kZXNjcmliZWRieSddID0gZXJyb3JJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY3NzQ2xhc3MgPSBgbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkJHtlcnJvciA/ICcgaXMtaW52YWxpZCcgOiAnJ31gO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzQ2xhc3N9IGRhdGEtZm9jdXM9J2lucHV0LXRleHQnIHJlZj0naW5wdXRUZXh0JyBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9faW5wdXQnIHJlZj0naHRtbElucHV0JyB7Li4uaW5wdXRQcm9wc30gLz5cclxuICAgICAgICAgICAgICAgIHtwbGFjZWhvbGRlciAmJiA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCcgaHRtbEZvcj17bmFtZX0+e3RoaXMuaTE4bihwbGFjZWhvbGRlcil9PC9sYWJlbD59XHJcbiAgICAgICAgICAgICAgICB7ZXJyb3IgJiYgPHNwYW4gY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19lcnJvcicgaWQ9e2Vycm9ySWR9ID57dGhpcy5pMThuKGVycm9yKX08L3NwYW4+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1N0YXRpYyBwcm9wcy5cclxuSW5wdXRUZXh0LmRpc3BsYXlOYW1lID0gJ0lucHV0VGV4dCc7XHJcbklucHV0VGV4dC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbklucHV0VGV4dC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dFRleHQ7XHJcbiJdfQ==