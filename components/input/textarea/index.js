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

var propTypes = {
    cols: _react.PropTypes.number,
    error: _react.PropTypes.string,
    formatter: _react.PropTypes.func,
    minLength: _react.PropTypes.number,
    maxLength: _react.PropTypes.number,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    onKeyPress: _react.PropTypes.func,
    placeholder: _react.PropTypes.string,
    //required: PropTypes.bool,
    rows: _react.PropTypes.number,
    type: _react.PropTypes.string,
    unformatter: _react.PropTypes.func,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    wrap: _react.PropTypes.string
};

var defaultProps = {
    type: 'text',
    formatter: _utility.identity,
    unformatter: _utility.identity,
    minLength: 0,
    wrap: 'soft',
    //required: false,
    rows: 6,
    cols: 50
};

/**
* Component standing for an HTML input.
*/
var InputTextarea = (_dec = (0, _material2.default)('inputTextarea'), _dec(_class = (0, _componentBase2.default)(_class = function (_Component) {
    _inherits(InputTextarea, _Component);

    function InputTextarea() {
        var _temp, _this, _ret;

        _classCallCheck(this, InputTextarea);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getValue = function () {
            var unformatter = _this.props.unformatter;

            var domEl = _reactDom2.default.findDOMNode(_this.refs.htmlInput);
            return unformatter(domEl.value);
        }, _this._handleInputChange = function (evt) {
            var _this$props = _this.props,
                unformatter = _this$props.unformatter,
                onChange = _this$props.onChange;
            var value = evt.target.value;

            return onChange(unformatter(value));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
    * Get the dom value of the component.
    * @return {object} - The unformated dom value.
    */

    /**
    * Handle the change on the input text, it only propagate the value.
    * @param  {object} evt - The react DOM event.
    * @return {object} - The function onChannge from the props, called.
    */


    /**
    * @inheritdoc
    * @override
    */
    InputTextarea.prototype.render = function render() {
        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);

        var _props = this.props,
            formatter = _props.formatter,
            error = _props.error;
        var name = validInputProps.name,
            style = validInputProps.style,
            placeholder = validInputProps.placeholder,
            value = validInputProps.value;


        var pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        var mdlClasses = 'mdl-textfield mdl-js-textfield' + (error ? ' is-invalid' : '');

        validInputProps.value = formatter(value) === undefined || formatter(value) === null ? '' : formatter(value);
        validInputProps.onChange = this._handleInputChange;
        var inputProps = _extends({}, validInputProps, { pattern: pattern });

        return _react2.default.createElement(
            'div',
            { 'data-error': !!error, 'data-focus': 'input-textarea' },
            _react2.default.createElement(
                'div',
                { className: mdlClasses, ref: 'inputTextarea', style: style },
                _react2.default.createElement('textarea', _extends({ className: 'mdl-textfield__input', ref: 'htmlInput' }, inputProps)),
                placeholder && _react2.default.createElement(
                    'label',
                    { className: 'mdl-textfield__label', htmlFor: name },
                    this.i18n(placeholder)
                )
            ),
            error && _react2.default.createElement(
                'div',
                { className: 'label-error', ref: 'error' },
                error
            )
        );
    };

    return InputTextarea;
}(_react.Component)) || _class) || _class);

//Static props.

InputTextarea.displayName = 'InputTextarea';
InputTextarea.defaultProps = defaultProps;
InputTextarea.propTypes = propTypes;

exports.default = InputTextarea;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJjb2xzIiwibnVtYmVyIiwiZXJyb3IiLCJzdHJpbmciLCJmb3JtYXR0ZXIiLCJmdW5jIiwibWluTGVuZ3RoIiwibWF4TGVuZ3RoIiwibmFtZSIsImlzUmVxdWlyZWQiLCJvbkNoYW5nZSIsIm9uS2V5UHJlc3MiLCJwbGFjZWhvbGRlciIsInJvd3MiLCJ0eXBlIiwidW5mb3JtYXR0ZXIiLCJ2YWx1ZSIsIm9uZU9mVHlwZSIsIndyYXAiLCJkZWZhdWx0UHJvcHMiLCJJbnB1dFRleHRhcmVhIiwiZ2V0VmFsdWUiLCJwcm9wcyIsImRvbUVsIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiaHRtbElucHV0IiwiX2hhbmRsZUlucHV0Q2hhbmdlIiwiZXZ0IiwidGFyZ2V0IiwicmVuZGVyIiwidmFsaWRJbnB1dFByb3BzIiwic3R5bGUiLCJwYXR0ZXJuIiwibWRsQ2xhc3NlcyIsInVuZGVmaW5lZCIsImlucHV0UHJvcHMiLCJpMThuIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDZEMsVUFBTSxpQkFBVUMsTUFERjtBQUVkQyxXQUFPLGlCQUFVQyxNQUZIO0FBR2RDLGVBQVcsaUJBQVVDLElBSFA7QUFJZEMsZUFBVyxpQkFBVUwsTUFKUDtBQUtkTSxlQUFXLGlCQUFVTixNQUxQO0FBTWRPLFVBQU0saUJBQVVMLE1BQVYsQ0FBaUJNLFVBTlQ7QUFPZEMsY0FBVSxpQkFBVUwsSUFBVixDQUFlSSxVQVBYO0FBUWRFLGdCQUFZLGlCQUFVTixJQVJSO0FBU2RPLGlCQUFhLGlCQUFVVCxNQVRUO0FBVWQ7QUFDQVUsVUFBTSxpQkFBVVosTUFYRjtBQVlkYSxVQUFNLGlCQUFVWCxNQVpGO0FBYWRZLGlCQUFhLGlCQUFVVixJQWJUO0FB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MEJBLFNBQTFCOztrQkFFZXFCLGEiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7aWRlbnRpdHl9IGZyb20gJ2xvZGFzaC91dGlsaXR5JztcclxuaW1wb3J0IENvbXBvbmVudEJhc2VCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9jb21wb25lbnQtYmFzZSc7XHJcbmltcG9ydCBNREJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuaW1wb3J0IGZpbHRlclByb3BzIGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZpbHRlci1odG1sLWF0dHJpYnV0ZXMnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgY29sczogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgZm9ybWF0dGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG1pbkxlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIG1heExlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgb25LZXlQcmVzczogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIC8vcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgcm93czogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB1bmZvcm1hdHRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBQcm9wVHlwZXMubnVtYmVyXHJcbiAgICBdKSxcclxuICAgIHdyYXA6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgIGZvcm1hdHRlcjogaWRlbnRpdHksXHJcbiAgICB1bmZvcm1hdHRlcjogaWRlbnRpdHksXHJcbiAgICBtaW5MZW5ndGg6IDAsXHJcbiAgICB3cmFwOiAnc29mdCcsXHJcbiAgICAvL3JlcXVpcmVkOiBmYWxzZSxcclxuICAgIHJvd3M6IDYsXHJcbiAgICBjb2xzOiA1MFxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4qIENvbXBvbmVudCBzdGFuZGluZyBmb3IgYW4gSFRNTCBpbnB1dC5cclxuKi9cclxuQE1EQmVoYXZpb3VyKCdpbnB1dFRleHRhcmVhJylcclxuQENvbXBvbmVudEJhc2VCZWhhdmlvdXJcclxuY2xhc3MgSW5wdXRUZXh0YXJlYSBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgZG9tIHZhbHVlIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgdW5mb3JtYXRlZCBkb20gdmFsdWUuXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3VuZm9ybWF0dGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgZG9tRWwgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuaHRtbElucHV0KTtcclxuICAgICAgICByZXR1cm4gdW5mb3JtYXR0ZXIoZG9tRWwudmFsdWUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgdGhlIGNoYW5nZSBvbiB0aGUgaW5wdXQgdGV4dCwgaXQgb25seSBwcm9wYWdhdGUgdGhlIHZhbHVlLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2dCAtIFRoZSByZWFjdCBET00gZXZlbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZnVuY3Rpb24gb25DaGFubmdlIGZyb20gdGhlIHByb3BzLCBjYWxsZWQuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZUlucHV0Q2hhbmdlID0gKGV2dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt1bmZvcm1hdHRlciwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gZXZ0LnRhcmdldDtcclxuICAgICAgICByZXR1cm4gb25DaGFuZ2UodW5mb3JtYXR0ZXIodmFsdWUpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogQGluaGVyaXRkb2NcclxuICAgICogQG92ZXJyaWRlXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkSW5wdXRQcm9wcyA9IGZpbHRlclByb3BzKHRoaXMucHJvcHMpO1xyXG5cclxuICAgICAgICBjb25zdCB7Zm9ybWF0dGVyLCBlcnJvcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtuYW1lLCBzdHlsZSwgcGxhY2Vob2xkZXIsIHZhbHVlfSA9IHZhbGlkSW5wdXRQcm9wcztcclxuXHJcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IGVycm9yID8gJ2hhc0Vycm9yJyA6IG51bGw7IC8vYWRkIHBhdHRlcm4gdG8gb3ZlcmlkZSBtZGwgZXJyb3Igc3R5bGUgd2hlbiBkaXNwbGF5aW5nIGFuIGZvY3VzIGVycm9yLlxyXG4gICAgICAgIGNvbnN0IG1kbENsYXNzZXMgPSBgbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkJHtlcnJvciA/ICcgaXMtaW52YWxpZCcgOiAnJ31gO1xyXG5cclxuICAgICAgICB2YWxpZElucHV0UHJvcHMudmFsdWUgPSBmb3JtYXR0ZXIodmFsdWUpID09PSB1bmRlZmluZWQgfHwgZm9ybWF0dGVyKHZhbHVlKSA9PT0gbnVsbCA/ICcnIDogZm9ybWF0dGVyKHZhbHVlKTtcclxuICAgICAgICB2YWxpZElucHV0UHJvcHMub25DaGFuZ2UgPSB0aGlzLl9oYW5kbGVJbnB1dENoYW5nZSBcclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0gey4uLnZhbGlkSW5wdXRQcm9wcywgcGF0dGVybn07XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1lcnJvcj17ISFlcnJvcn0gZGF0YS1mb2N1cz0naW5wdXQtdGV4dGFyZWEnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e21kbENsYXNzZXN9IHJlZj0naW5wdXRUZXh0YXJlYScgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19pbnB1dCcgcmVmPSdodG1sSW5wdXQnIHsuLi5pbnB1dFByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHtwbGFjZWhvbGRlciAmJiA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCcgaHRtbEZvcj17bmFtZX0+e3RoaXMuaTE4bihwbGFjZWhvbGRlcil9PC9sYWJlbD59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT0nbGFiZWwtZXJyb3InIHJlZj0nZXJyb3InPntlcnJvcn08L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5JbnB1dFRleHRhcmVhLmRpc3BsYXlOYW1lID0gJ0lucHV0VGV4dGFyZWEnO1xyXG5JbnB1dFRleHRhcmVhLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuSW5wdXRUZXh0YXJlYS5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dFRleHRhcmVhO1xyXG4iXX0=