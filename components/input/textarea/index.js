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
    unformatter: _react.PropTypes.func,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    wrap: _react.PropTypes.string
};

var defaultProps = {
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

        // Label and type not allowed on element textarea
        delete inputProps.label;
        delete inputProps.type;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJjb2xzIiwibnVtYmVyIiwiZXJyb3IiLCJzdHJpbmciLCJmb3JtYXR0ZXIiLCJmdW5jIiwibWluTGVuZ3RoIiwibWF4TGVuZ3RoIiwibmFtZSIsImlzUmVxdWlyZWQiLCJvbkNoYW5nZSIsIm9uS2V5UHJlc3MiLCJwbGFjZWhvbGRlciIsInJvd3MiLCJ1bmZvcm1hdHRlciIsInZhbHVlIiwib25lT2ZUeXBlIiwid3JhcCIsImRlZmF1bHRQcm9wcyIsIklucHV0VGV4dGFyZWEiLCJnZXRWYWx1ZSIsInByb3BzIiwiZG9tRWwiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJodG1sSW5wdXQiLCJfaGFuZGxlSW5wdXRDaGFuZ2UiLCJldnQiLCJ0YXJnZXQiLCJyZW5kZXIiLCJ2YWxpZElucHV0UHJvcHMiLCJzdHlsZSIsInBhdHRlcm4iLCJtZGxDbGFzc2VzIiwidW5kZWZpbmVkIiwiaW5wdXRQcm9wcyIsImxhYmVsIiwidHlwZSIsImkxOG4iLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxVQUFNLGlCQUFVQyxNQURGO0FBRWRDLFdBQU8saUJBQVVDLE1BRkg7QUFHZEMsZUFBVyxpQkFBVUMsSUFIUDtBQUlkQyxlQUFXLGlCQUFVTCxNQUpQO0FBS2RNLGVBQVcsaUJBQVVOLE1BTFA7QUFNZE8sVUFBTSxpQkFBVUwsTUFBVixDQUFpQk0sVUFOVDtBQU9kQyxjQUFVLGlCQUFVTCxJQUFWLENBQWVJLFVBUFg7QUFRZEUsZ0JBQVksaUJBQVVOLElBUlI7QUFTZE8saUJBQWEsaUJBQVVULE1BVFQ7QUFVZDtBQUNBVSxVQUFNLGlCQUFVWixNQVhGO0FBWWRhLGlCQUFhLGlCQUFVVCxJQVpUO0FBYWRVLFdBQU8saUJBQVVD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Q0FDLGNBQWNwQixTQUFkLEdBQTBCQSxTQUExQjs7a0JBRWVvQixhIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnbG9kYXNoL3V0aWxpdHknO1xyXG5pbXBvcnQgQ29tcG9uZW50QmFzZUJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL2NvbXBvbmVudC1iYXNlJztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgZmlsdGVyUHJvcHMgZnJvbSAnLi4vLi4vLi4vdXRpbHMvZmlsdGVyLWh0bWwtYXR0cmlidXRlcyc7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBjb2xzOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBmb3JtYXR0ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgbWluTGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgbWF4TGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBvbktleVByZXNzOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgLy9yZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByb3dzOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgdW5mb3JtYXR0ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgUHJvcFR5cGVzLm51bWJlclxyXG4gICAgXSksXHJcbiAgICB3cmFwOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBmb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgdW5mb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgbWluTGVuZ3RoOiAwLFxyXG4gICAgd3JhcDogJ3NvZnQnLFxyXG4gICAgLy9yZXF1aXJlZDogZmFsc2UsXHJcbiAgICByb3dzOiA2LFxyXG4gICAgY29sczogNTBcclxufTtcclxuXHJcblxyXG4vKipcclxuKiBDb21wb25lbnQgc3RhbmRpbmcgZm9yIGFuIEhUTUwgaW5wdXQuXHJcbiovXHJcbkBNREJlaGF2aW91cignaW5wdXRUZXh0YXJlYScpXHJcbkBDb21wb25lbnRCYXNlQmVoYXZpb3VyXHJcbmNsYXNzIElucHV0VGV4dGFyZWEgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGRvbSB2YWx1ZSBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHVuZm9ybWF0ZWQgZG9tIHZhbHVlLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt1bmZvcm1hdHRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGRvbUVsID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmh0bWxJbnB1dCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZm9ybWF0dGVyKGRvbUVsLnZhbHVlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogSGFuZGxlIHRoZSBjaGFuZ2Ugb24gdGhlIGlucHV0IHRleHQsIGl0IG9ubHkgcHJvcGFnYXRlIHRoZSB2YWx1ZS5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSBldnQgLSBUaGUgcmVhY3QgRE9NIGV2ZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIGZ1bmN0aW9uIG9uQ2hhbm5nZSBmcm9tIHRoZSBwcm9wcywgY2FsbGVkLlxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVJbnB1dENoYW5nZSA9IChldnQpID0+IHtcclxuICAgICAgICBjb25zdCB7dW5mb3JtYXR0ZXIsIG9uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IGV2dC50YXJnZXQ7XHJcbiAgICAgICAgcmV0dXJuIG9uQ2hhbmdlKHVuZm9ybWF0dGVyKHZhbHVlKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAqIEBvdmVycmlkZVxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB2YWxpZElucHV0UHJvcHMgPSBmaWx0ZXJQcm9wcyh0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgICAgY29uc3Qge2Zvcm1hdHRlciwgZXJyb3J9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7bmFtZSwgc3R5bGUsIHBsYWNlaG9sZGVyLCB2YWx1ZX0gPSB2YWxpZElucHV0UHJvcHM7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSBlcnJvciA/ICdoYXNFcnJvcicgOiBudWxsOyAvL2FkZCBwYXR0ZXJuIHRvIG92ZXJpZGUgbWRsIGVycm9yIHN0eWxlIHdoZW4gZGlzcGxheWluZyBhbiBmb2N1cyBlcnJvci5cclxuICAgICAgICBjb25zdCBtZGxDbGFzc2VzID0gYG1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZCR7ZXJyb3IgPyAnIGlzLWludmFsaWQnIDogJyd9YDtcclxuXHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLnZhbHVlID0gZm9ybWF0dGVyKHZhbHVlKSA9PT0gdW5kZWZpbmVkIHx8IGZvcm1hdHRlcih2YWx1ZSkgPT09IG51bGwgPyAnJyA6IGZvcm1hdHRlcih2YWx1ZSk7XHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uQ2hhbmdlID0gdGhpcy5faGFuZGxlSW5wdXRDaGFuZ2VcclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0geyAuLi52YWxpZElucHV0UHJvcHMsIHBhdHRlcm4gfTtcclxuXHJcbiAgICAgICAgLy8gTGFiZWwgYW5kIHR5cGUgbm90IGFsbG93ZWQgb24gZWxlbWVudCB0ZXh0YXJlYVxyXG4gICAgICAgIGRlbGV0ZSBpbnB1dFByb3BzLmxhYmVsO1xyXG4gICAgICAgIGRlbGV0ZSBpbnB1dFByb3BzLnR5cGU7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1lcnJvcj17ISFlcnJvcn0gZGF0YS1mb2N1cz0naW5wdXQtdGV4dGFyZWEnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e21kbENsYXNzZXN9IHJlZj0naW5wdXRUZXh0YXJlYScgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19pbnB1dCcgcmVmPSdodG1sSW5wdXQnIHsuLi5pbnB1dFByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHtwbGFjZWhvbGRlciAmJiA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCcgaHRtbEZvcj17bmFtZX0+e3RoaXMuaTE4bihwbGFjZWhvbGRlcil9PC9sYWJlbD59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT0nbGFiZWwtZXJyb3InIHJlZj0nZXJyb3InPntlcnJvcn08L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5JbnB1dFRleHRhcmVhLmRpc3BsYXlOYW1lID0gJ0lucHV0VGV4dGFyZWEnO1xyXG5JbnB1dFRleHRhcmVhLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuSW5wdXRUZXh0YXJlYS5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dFRleHRhcmVhO1xyXG4iXX0=