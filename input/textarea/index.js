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
    formatter: _identity2.default,
    unformatter: _identity2.default,
    minLength: 0,
    wrap: 'soft',
    //required: false,
    rows: 6,
    cols: 50
};

/**
* Component standing for an HTML input.
*/
var InputTextarea = (_dec = (0, _material2.default)('inputTextarea'), _dec(_class = function (_Component) {
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
            var _this$props = _this.props;
            var unformatter = _this$props.unformatter;
            var onChange = _this$props.onChange;
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
        var _props = this.props;
        var autoFocus = _props.autoFocus;
        var disabled = _props.disabled;
        var formatter = _props.formatter;
        var maxLength = _props.maxLength;
        var onFocus = _props.onFocus;
        var onClick = _props.onClick;
        var onKeyPress = _props.onKeyPress;
        var error = _props.error;
        var name = _props.name;
        var placeholder = _props.placeholder;
        var style = _props.style;
        var rawValue = _props.value;
        var size = _props.size;
        var type = _props.type;

        var value = formatter(rawValue);
        var pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        var inputProps = { autoFocus: autoFocus, disabled: disabled, onKeyPress: onKeyPress, maxLength: maxLength, onFocus: onFocus, onClick: onClick, id: name, onChange: this._handleInputChange, pattern: pattern, size: size, type: type, value: value };
        var mdlClasses = 'mdl-textfield mdl-js-textfield' + (error ? ' is-invalid' : '');
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
                    _i18next2.default.t(placeholder)
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
}(_react.Component)) || _class);

//Static props.

InputTextarea.displayName = 'InputTextarea';
InputTextarea.defaultProps = defaultProps;
InputTextarea.propTypes = propTypes;

exports.default = InputTextarea;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImNvbHMiLCJudW1iZXIiLCJlcnJvciIsInN0cmluZyIsImZvcm1hdHRlciIsImZ1bmMiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJuYW1lIiwiaXNSZXF1aXJlZCIsIm9uQ2hhbmdlIiwib25LZXlQcmVzcyIsInBsYWNlaG9sZGVyIiwicm93cyIsInR5cGUiLCJ1bmZvcm1hdHRlciIsInZhbHVlIiwib25lT2ZUeXBlIiwid3JhcCIsImRlZmF1bHRQcm9wcyIsIklucHV0VGV4dGFyZWEiLCJnZXRWYWx1ZSIsInByb3BzIiwiZG9tRWwiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJodG1sSW5wdXQiLCJfaGFuZGxlSW5wdXRDaGFuZ2UiLCJldnQiLCJ0YXJnZXQiLCJyZW5kZXIiLCJhdXRvRm9jdXMiLCJkaXNhYmxlZCIsIm9uRm9jdXMiLCJvbkNsaWNrIiwic3R5bGUiLCJyYXdWYWx1ZSIsInNpemUiLCJwYXR0ZXJuIiwiaW5wdXRQcm9wcyIsImlkIiwibWRsQ2xhc3NlcyIsInQiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxVQUFNLGlCQUFVQyxNQURGO0FBRWRDLFdBQU8saUJBQVVDLE1BRkg7QUFHZEMsZUFBVyxpQkFBVUMsSUFIUDtBQUlkQyxlQUFXLGlCQUFVTCxNQUpQO0FBS2RNLGVBQVcsaUJBQVVOLE1BTFA7QUFNZE8sVUFBTSxpQkFBVUwsTUFBVixDQUFpQk0sVUFOVDtBQU9kQyxjQUFVLGlCQUFVTCxJQUFWLENBQWVJLFVBUFg7QUFRZEUsZ0JBQVksaUJBQVVOLElBUlI7QUFTZE8saUJBQWEsaUJBQVVULE1BVFQ7QUFVZDtBQUNBVSxVQUFNLGlCQUFVWixNQVhGO0FBWWRhLFVBQU0saUJBQVVYLE1BWkY7QUFhZFksaUJBQWEsaUJBQVVW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O0FBQXdELHNDQUFRa0MsQ0FBUixDQUFVOUIsV0FBVjtBQUF4RDtBQUZKLGFBREo7QUFLS1YscUJBQVM7QUFBQTtBQUFBLGtCQUFLLFdBQVUsYUFBZixFQUE2QixLQUFJLE9BQWpDO0FBQTBDQTtBQUExQztBQUxkLFNBREo7QUFTSCxLOztXQXhDQ2tCLGE7OztBQTJDTjs7QUFDQUEsY0FBY3VCLFdBQWQsR0FBNEIsZUFBNUI7QUFDQXZCLGNBQWNELFlBQWQsR0FBNkJBLFlBQTdCO0FBQ0FDLGNBQWNyQixTQUFkLEdBQTBCQSxTQUExQjs7a0JBRWVxQixhIiwiZmlsZSI6ImZyLUZSLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBpZGVudGl0eSBmcm9tICdsb2Rhc2gvaWRlbnRpdHknO1xyXG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgY29sczogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgZm9ybWF0dGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG1pbkxlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIG1heExlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgb25LZXlQcmVzczogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIC8vcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgcm93czogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB1bmZvcm1hdHRlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBQcm9wVHlwZXMubnVtYmVyXHJcbiAgICBdKSxcclxuICAgIHdyYXA6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgIGZvcm1hdHRlcjogaWRlbnRpdHksXHJcbiAgICB1bmZvcm1hdHRlcjogaWRlbnRpdHksXHJcbiAgICBtaW5MZW5ndGg6IDAsXHJcbiAgICB3cmFwOiAnc29mdCcsXHJcbiAgICAvL3JlcXVpcmVkOiBmYWxzZSxcclxuICAgIHJvd3M6IDYsXHJcbiAgICBjb2xzOiA1MFxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4qIENvbXBvbmVudCBzdGFuZGluZyBmb3IgYW4gSFRNTCBpbnB1dC5cclxuKi9cclxuQE1EQmVoYXZpb3VyKCdpbnB1dFRleHRhcmVhJylcclxuY2xhc3MgSW5wdXRUZXh0YXJlYSBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgZG9tIHZhbHVlIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgdW5mb3JtYXRlZCBkb20gdmFsdWUuXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3VuZm9ybWF0dGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgZG9tRWwgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuaHRtbElucHV0KTtcclxuICAgICAgICByZXR1cm4gdW5mb3JtYXR0ZXIoZG9tRWwudmFsdWUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgdGhlIGNoYW5nZSBvbiB0aGUgaW5wdXQgdGV4dCwgaXQgb25seSBwcm9wYWdhdGUgdGhlIHZhbHVlLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2dCAtIFRoZSByZWFjdCBET00gZXZlbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZnVuY3Rpb24gb25DaGFubmdlIGZyb20gdGhlIHByb3BzLCBjYWxsZWQuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZUlucHV0Q2hhbmdlID0gKGV2dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt1bmZvcm1hdHRlciwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gZXZ0LnRhcmdldDtcclxuICAgICAgICByZXR1cm4gb25DaGFuZ2UodW5mb3JtYXR0ZXIodmFsdWUpKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICogQGluaGVyaXRkb2NcclxuICAgICogQG92ZXJyaWRlXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYXV0b0ZvY3VzLCBkaXNhYmxlZCwgZm9ybWF0dGVyLCBtYXhMZW5ndGgsIG9uRm9jdXMsIG9uQ2xpY2ssIG9uS2V5UHJlc3MsIGVycm9yLCBuYW1lLCBwbGFjZWhvbGRlciwgc3R5bGUsIHZhbHVlOiByYXdWYWx1ZSwgc2l6ZSwgdHlwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gZm9ybWF0dGVyKHJhd1ZhbHVlKTtcclxuICAgICAgICBjb25zdCBwYXR0ZXJuID0gZXJyb3IgPyAnaGFzRXJyb3InIDogbnVsbDsgLy9hZGQgcGF0dGVybiB0byBvdmVyaWRlIG1kbCBlcnJvciBzdHlsZSB3aGVuIGRpc3BsYXlpbmcgYW4gZm9jdXMgZXJyb3IuXHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9ICB7IGF1dG9Gb2N1cywgZGlzYWJsZWQsIG9uS2V5UHJlc3MsIG1heExlbmd0aCwgb25Gb2N1cywgb25DbGljaywgaWQ6IG5hbWUsIG9uQ2hhbmdlOiB0aGlzLl9oYW5kbGVJbnB1dENoYW5nZSwgcGF0dGVybiwgc2l6ZSwgdHlwZSwgdmFsdWUgfTtcclxuICAgICAgICBjb25zdCBtZGxDbGFzc2VzID0gYG1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZCR7ZXJyb3IgPyAnIGlzLWludmFsaWQnIDogJyd9YDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZXJyb3I9eyEhZXJyb3J9IGRhdGEtZm9jdXM9J2lucHV0LXRleHRhcmVhJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXttZGxDbGFzc2VzfSByZWY9J2lucHV0VGV4dGFyZWEnIHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9faW5wdXQnIHJlZj0naHRtbElucHV0JyB7Li4uaW5wdXRQcm9wc30gLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCcgaHRtbEZvcj17bmFtZX0+e2kxOG5leHQudChwbGFjZWhvbGRlcil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge2Vycm9yICYmIDxkaXYgY2xhc3NOYW1lPSdsYWJlbC1lcnJvcicgcmVmPSdlcnJvcic+e2Vycm9yfTwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbklucHV0VGV4dGFyZWEuZGlzcGxheU5hbWUgPSAnSW5wdXRUZXh0YXJlYSc7XHJcbklucHV0VGV4dGFyZWEuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5JbnB1dFRleHRhcmVhLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0VGV4dGFyZWE7XHJcbiJdfQ==