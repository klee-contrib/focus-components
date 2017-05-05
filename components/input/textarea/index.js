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
                _react2.default.createElement(
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJjb2xzIiwibnVtYmVyIiwiZXJyb3IiLCJzdHJpbmciLCJmb3JtYXR0ZXIiLCJmdW5jIiwibWluTGVuZ3RoIiwibWF4TGVuZ3RoIiwibmFtZSIsImlzUmVxdWlyZWQiLCJvbkNoYW5nZSIsIm9uS2V5UHJlc3MiLCJwbGFjZWhvbGRlciIsInJvd3MiLCJ0eXBlIiwidW5mb3JtYXR0ZXIiLCJ2YWx1ZSIsIm9uZU9mVHlwZSIsIndyYXAiLCJkZWZhdWx0UHJvcHMiLCJJbnB1dFRleHRhcmVhIiwiZ2V0VmFsdWUiLCJwcm9wcyIsImRvbUVsIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiaHRtbElucHV0IiwiX2hhbmRsZUlucHV0Q2hhbmdlIiwiZXZ0IiwidGFyZ2V0IiwicmVuZGVyIiwidmFsaWRJbnB1dFByb3BzIiwic3R5bGUiLCJwYXR0ZXJuIiwibWRsQ2xhc3NlcyIsInVuZGVmaW5lZCIsImlucHV0UHJvcHMiLCJpMThuIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDZEMsVUFBTSxpQkFBVUMsTUFERjtBQUVkQyxXQUFPLGlCQUFVQyxNQUZIO0FBR2RDLGVBQVcsaUJBQVVDLElBSFA7QUFJZEMsZUFBVyxpQkFBVUwsTUFKUDtBQUtkTSxlQUFXLGlCQUFVTixNQUxQO0FBTWRPLFVBQU0saUJBQVVMLE1BQVYsQ0FBaUJNLFVBTlQ7QUFPZEMsY0FBVSxpQkFBVUwsSUFBVixDQUFlSSxVQVBYO0FBUWRFLGdCQUFZLGlCQUFVTixJQVJSO0FBU2RPLGlCQUFhLGlCQUFVVCxNQVRUO0FBVWQ7QUFDQVUsVUFBTSxpQkFBVVosTUFYRjtBQVlkYSxVQUFNLGlCQUFVWCxNQVpGO0FBYWRZLGlCQUFhLGlCQUFVVixJQWJUO0FB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Qjs7a0JBRWVxQixhIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQge2lkZW50aXR5fSBmcm9tICdsb2Rhc2gvdXRpbGl0eSc7XHJcbmltcG9ydCBDb21wb25lbnRCYXNlQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvY29tcG9uZW50LWJhc2UnO1xyXG5pbXBvcnQgTURCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmltcG9ydCBmaWx0ZXJQcm9wcyBmcm9tICcuLi8uLi8uLi91dGlscy9maWx0ZXItaHRtbC1hdHRyaWJ1dGVzJztcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGNvbHM6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGZvcm1hdHRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBtaW5MZW5ndGg6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBtYXhMZW5ndGg6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIG9uS2V5UHJlc3M6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAvL3JlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIHJvd3M6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdW5mb3JtYXR0ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgUHJvcFR5cGVzLm51bWJlclxyXG4gICAgXSksXHJcbiAgICB3cmFwOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB0eXBlOiAndGV4dCcsXHJcbiAgICBmb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgdW5mb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgbWluTGVuZ3RoOiAwLFxyXG4gICAgd3JhcDogJ3NvZnQnLFxyXG4gICAgLy9yZXF1aXJlZDogZmFsc2UsXHJcbiAgICByb3dzOiA2LFxyXG4gICAgY29sczogNTBcclxufTtcclxuXHJcblxyXG4vKipcclxuKiBDb21wb25lbnQgc3RhbmRpbmcgZm9yIGFuIEhUTUwgaW5wdXQuXHJcbiovXHJcbkBNREJlaGF2aW91cignaW5wdXRUZXh0YXJlYScpXHJcbkBDb21wb25lbnRCYXNlQmVoYXZpb3VyXHJcbmNsYXNzIElucHV0VGV4dGFyZWEgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGRvbSB2YWx1ZSBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHVuZm9ybWF0ZWQgZG9tIHZhbHVlLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt1bmZvcm1hdHRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGRvbUVsID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmh0bWxJbnB1dCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZm9ybWF0dGVyKGRvbUVsLnZhbHVlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogSGFuZGxlIHRoZSBjaGFuZ2Ugb24gdGhlIGlucHV0IHRleHQsIGl0IG9ubHkgcHJvcGFnYXRlIHRoZSB2YWx1ZS5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSBldnQgLSBUaGUgcmVhY3QgRE9NIGV2ZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIGZ1bmN0aW9uIG9uQ2hhbm5nZSBmcm9tIHRoZSBwcm9wcywgY2FsbGVkLlxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVJbnB1dENoYW5nZSA9IChldnQpID0+IHtcclxuICAgICAgICBjb25zdCB7dW5mb3JtYXR0ZXIsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IGV2dC50YXJnZXQ7XHJcbiAgICAgICAgcmV0dXJuIG9uQ2hhbmdlKHVuZm9ybWF0dGVyKHZhbHVlKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAqIEBvdmVycmlkZVxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB2YWxpZElucHV0UHJvcHMgPSBmaWx0ZXJQcm9wcyh0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgICAgY29uc3Qge2Zvcm1hdHRlciwgZXJyb3J9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7bmFtZSwgc3R5bGUsIHBsYWNlaG9sZGVyLCB2YWx1ZX0gPSB2YWxpZElucHV0UHJvcHM7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSBlcnJvciA/ICdoYXNFcnJvcicgOiBudWxsOyAvL2FkZCBwYXR0ZXJuIHRvIG92ZXJpZGUgbWRsIGVycm9yIHN0eWxlIHdoZW4gZGlzcGxheWluZyBhbiBmb2N1cyBlcnJvci5cclxuICAgICAgICBjb25zdCBtZGxDbGFzc2VzID0gYG1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZCR7ZXJyb3IgPyAnIGlzLWludmFsaWQnIDogJyd9YDtcclxuXHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLnZhbHVlID0gZm9ybWF0dGVyKHZhbHVlKSA9PT0gdW5kZWZpbmVkIHx8IGZvcm1hdHRlcih2YWx1ZSkgPT09IG51bGwgPyAnJyA6IGZvcm1hdHRlcih2YWx1ZSk7XHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uQ2hhbmdlID0gdGhpcy5faGFuZGxlSW5wdXRDaGFuZ2UgXHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHsuLi52YWxpZElucHV0UHJvcHMsIHBhdHRlcm59O1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXJyb3I9eyEhZXJyb3J9IGRhdGEtZm9jdXM9J2lucHV0LXRleHRhcmVhJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXttZGxDbGFzc2VzfSByZWY9J2lucHV0VGV4dGFyZWEnIHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9faW5wdXQnIHJlZj0naHRtbElucHV0JyB7Li4uaW5wdXRQcm9wc30gLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCcgaHRtbEZvcj17bmFtZX0+e3RoaXMuaTE4bihwbGFjZWhvbGRlcil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge2Vycm9yICYmIDxkaXYgY2xhc3NOYW1lPSdsYWJlbC1lcnJvcicgcmVmPSdlcnJvcic+e2Vycm9yfTwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbklucHV0VGV4dGFyZWEuZGlzcGxheU5hbWUgPSAnSW5wdXRUZXh0YXJlYSc7XHJcbklucHV0VGV4dGFyZWEuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5JbnB1dFRleHRhcmVhLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0VGV4dGFyZWE7XHJcbiJdfQ==