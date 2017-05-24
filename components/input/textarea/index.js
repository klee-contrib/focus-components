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
        var _props = this.props,
            autoFocus = _props.autoFocus,
            disabled = _props.disabled,
            formatter = _props.formatter,
            maxLength = _props.maxLength,
            onFocus = _props.onFocus,
            onClick = _props.onClick,
            onKeyPress = _props.onKeyPress,
            error = _props.error,
            name = _props.name,
            placeholder = _props.placeholder,
            style = _props.style,
            rawValue = _props.value,
            size = _props.size,
            type = _props.type;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJjb2xzIiwibnVtYmVyIiwiZXJyb3IiLCJzdHJpbmciLCJmb3JtYXR0ZXIiLCJmdW5jIiwibWluTGVuZ3RoIiwibWF4TGVuZ3RoIiwibmFtZSIsImlzUmVxdWlyZWQiLCJvbkNoYW5nZSIsIm9uS2V5UHJlc3MiLCJwbGFjZWhvbGRlciIsInJvd3MiLCJ0eXBlIiwidW5mb3JtYXR0ZXIiLCJ2YWx1ZSIsIm9uZU9mVHlwZSIsIndyYXAiLCJkZWZhdWx0UHJvcHMiLCJJbnB1dFRleHRhcmVhIiwiZ2V0VmFsdWUiLCJwcm9wcyIsImRvbUVsIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiaHRtbElucHV0IiwiX2hhbmRsZUlucHV0Q2hhbmdlIiwiZXZ0IiwidGFyZ2V0IiwicmVuZGVyIiwiYXV0b0ZvY3VzIiwiZGlzYWJsZWQiLCJvbkZvY3VzIiwib25DbGljayIsInN0eWxlIiwicmF3VmFsdWUiLCJzaXplIiwicGF0dGVybiIsImlucHV0UHJvcHMiLCJpZCIsIm1kbENsYXNzZXMiLCJpMThuIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2RDLFVBQU0saUJBQVVDLE1BREY7QUFFZEMsV0FBTyxpQkFBVUMsTUFGSDtBQUdkQyxlQUFXLGlCQUFVQyxJQUhQO0FBSWRDLGVBQVcsaUJBQVVMLE1BSlA7QUFLZE0sZUFBVyxpQkFBVU4sTUFMUDtBQU1kTyxVQUFNLGlCQUFVTCxNQUFWLENBQWlCTSxVQU5UO0FBT2RDLGNBQVUsaUJBQVVMLElBQVYsQ0FBZUksVUFQWDtBQVFkRSxnQkFBWSxpQkFBVU4sSUFSUjtBQVNkTyxpQkFBYSxpQkFBVVQsTUFUVDtBQVVkO0FBQ0FVLFVBQU0saUJBQVVaLE1BWEY7QUFZZGEsVUFBTSxpQkFBVVgsTUFa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RCx5QkFBS2tDLElBQUwsQ0FBVTlCLFdBQVY7QUFBeEQ7QUFGcEIsYUFESjtBQUtLVixxQkFBUztBQUFBO0FBQUEsa0JBQUssV0FBVSxhQUFmLEVBQTZCLEtBQUksT0FBakM7QUFBMENBO0FBQTFDO0FBTGQsU0FESjtBQVNILEs7Ozs7O0FBR0w7O0FBQ0FrQixjQUFjdUIsV0FBZCxHQUE0QixlQUE1QjtBQUNBdkIsY0FBY0QsWUFBZCxHQUE2QkEsWUFBN0I7QUFDQUMsY0FBY3JCLFNBQWQsR0FBMEJBLFNBQTFCOztrQkFFZXFCLGEiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgaWRlbnRpdHkgfSBmcm9tICdsb2Rhc2gvdXRpbGl0eSc7XHJcbmltcG9ydCBDb21wb25lbnRCYXNlQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvY29tcG9uZW50LWJhc2UnO1xyXG5pbXBvcnQgTURCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBjb2xzOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBmb3JtYXR0ZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgbWluTGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgbWF4TGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBvbktleVByZXNzOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgLy9yZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICByb3dzOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHVuZm9ybWF0dGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIFByb3BUeXBlcy5udW1iZXJcclxuICAgIF0pLFxyXG4gICAgd3JhcDogUHJvcFR5cGVzLnN0cmluZ1xyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdHlwZTogJ3RleHQnLFxyXG4gICAgZm9ybWF0dGVyOiBpZGVudGl0eSxcclxuICAgIHVuZm9ybWF0dGVyOiBpZGVudGl0eSxcclxuICAgIG1pbkxlbmd0aDogMCxcclxuICAgIHdyYXA6ICdzb2Z0JyxcclxuICAgIC8vcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgcm93czogNixcclxuICAgIGNvbHM6IDUwXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiogQ29tcG9uZW50IHN0YW5kaW5nIGZvciBhbiBIVE1MIGlucHV0LlxyXG4qL1xyXG5ATURCZWhhdmlvdXIoJ2lucHV0VGV4dGFyZWEnKVxyXG5AQ29tcG9uZW50QmFzZUJlaGF2aW91clxyXG5jbGFzcyBJbnB1dFRleHRhcmVhIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBkb20gdmFsdWUgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSB1bmZvcm1hdGVkIGRvbSB2YWx1ZS5cclxuICAgICovXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7dW5mb3JtYXR0ZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBkb21FbCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5odG1sSW5wdXQpO1xyXG4gICAgICAgIHJldHVybiB1bmZvcm1hdHRlcihkb21FbC52YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSB0aGUgY2hhbmdlIG9uIHRoZSBpbnB1dCB0ZXh0LCBpdCBvbmx5IHByb3BhZ2F0ZSB0aGUgdmFsdWUuXHJcbiAgICAqIEBwYXJhbSAge29iamVjdH0gZXZ0IC0gVGhlIHJlYWN0IERPTSBldmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBmdW5jdGlvbiBvbkNoYW5uZ2UgZnJvbSB0aGUgcHJvcHMsIGNhbGxlZC5cclxuICAgICovXHJcbiAgICBfaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZXZ0KSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3VuZm9ybWF0dGVyLCBvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSBldnQudGFyZ2V0O1xyXG4gICAgICAgIHJldHVybiBvbkNoYW5nZSh1bmZvcm1hdHRlcih2YWx1ZSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgKiBAb3ZlcnJpZGVcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRvRm9jdXMsIGRpc2FibGVkLCBmb3JtYXR0ZXIsIG1heExlbmd0aCwgb25Gb2N1cywgb25DbGljaywgb25LZXlQcmVzcywgZXJyb3IsIG5hbWUsIHBsYWNlaG9sZGVyLCBzdHlsZSwgdmFsdWU6IHJhd1ZhbHVlLCBzaXplLCB0eXBlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBmb3JtYXR0ZXIocmF3VmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSBlcnJvciA/ICdoYXNFcnJvcicgOiBudWxsOyAvL2FkZCBwYXR0ZXJuIHRvIG92ZXJpZGUgbWRsIGVycm9yIHN0eWxlIHdoZW4gZGlzcGxheWluZyBhbiBmb2N1cyBlcnJvci5cclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0geyBhdXRvRm9jdXMsIGRpc2FibGVkLCBvbktleVByZXNzLCBtYXhMZW5ndGgsIG9uRm9jdXMsIG9uQ2xpY2ssIGlkOiBuYW1lLCBvbkNoYW5nZTogdGhpcy5faGFuZGxlSW5wdXRDaGFuZ2UsIHBhdHRlcm4sIHNpemUsIHR5cGUsIHZhbHVlIH07XHJcbiAgICAgICAgY29uc3QgbWRsQ2xhc3NlcyA9IGBtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGQke2Vycm9yID8gJyBpcy1pbnZhbGlkJyA6ICcnfWA7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWVycm9yPXshIWVycm9yfSBkYXRhLWZvY3VzPSdpbnB1dC10ZXh0YXJlYSc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17bWRsQ2xhc3Nlc30gcmVmPSdpbnB1dFRleHRhcmVhJyBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2lucHV0JyByZWY9J2h0bWxJbnB1dCcgey4uLmlucHV0UHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAge3BsYWNlaG9sZGVyICYmIDxsYWJlbCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2xhYmVsJyBodG1sRm9yPXtuYW1lfT57dGhpcy5pMThuKHBsYWNlaG9sZGVyKX08L2xhYmVsPn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge2Vycm9yICYmIDxkaXYgY2xhc3NOYW1lPSdsYWJlbC1lcnJvcicgcmVmPSdlcnJvcic+e2Vycm9yfTwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbklucHV0VGV4dGFyZWEuZGlzcGxheU5hbWUgPSAnSW5wdXRUZXh0YXJlYSc7XHJcbklucHV0VGV4dGFyZWEuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5JbnB1dFRleHRhcmVhLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0VGV4dGFyZWE7XHJcbiJdfQ==