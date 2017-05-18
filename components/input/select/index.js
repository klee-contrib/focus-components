'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class; //dependencies


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

var _lang = require('lodash/lang');

var _array = require('lodash/array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var UNSELECTED_KEY = 'UNSELECTED_KEY';
/**
* Parse the value.
* @param  {string | number} propsValue - The value given as props to read the type.
* @param  {string} rawValue   - The raw string value.
* @return {strint | number}  - The parsed value.
*/
function _valueParser(propsValue, rawValue) {
    if (UNSELECTED_KEY === rawValue) {
        return undefined;
    }
    var type = this.props.type;

    return type === 'number' ? +rawValue : rawValue;
}
var propTypes = {
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string,
    hasUndefined: _react.PropTypes.bool,
    isActiveProperty: _react.PropTypes.string,
    isRequired: _react.PropTypes.bool,
    labelKey: _react.PropTypes.string,
    multiple: _react.PropTypes.bool,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    placeholder: _react.PropTypes.string,
    unSelectedLabel: _react.PropTypes.string,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    valueKey: _react.PropTypes.string,
    values: _react.PropTypes.array.isRequired
};

var defaultProps = {
    disabled: false,
    hasUndefined: true,
    isActiveProperty: 'isActive',
    isRequired: false,
    labelKey: 'label',
    multiple: false,
    unSelectedLabel: 'select.unSelected',
    values: [],
    valueKey: 'code',
    valueParser: _valueParser
};

/**
* Component standing for an HTML input.
*/

var Select = (0, _componentBase2.default)(_class = function (_Component) {
    _inherits(Select, _Component);

    function Select() {
        var _temp, _this, _ret;

        _classCallCheck(this, Select);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getValue = function () {
            var _this$props = _this.props,
                type = _this$props.type,
                value = _this$props.value;

            if ((0, _lang.isNull)(value) || (0, _lang.isUndefined)(value) || UNSELECTED_KEY === value) return null;
            return type === 'number' ? +value : value;
        }, _this._handleSelectChange = function (evt) {
            var _this$props2 = _this.props,
                onChange = _this$props2.onChange,
                valueParser = _this$props2.valueParser,
                propsValue = _this$props2.value;
            var value = evt.target.value;

            return onChange(valueParser.call(_this, propsValue, value));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
    * Get the dom value of the component.
    * @return {object} - The unformated dom value.
    */


    /**
    * Handle the change on the select, it only propagates the value.
    * @param  {object} evt - The react DOM event.
    * @return {object} - The function onChange from the props, called.
    */


    /** inheritdoc */
    Select.prototype._renderOptions = function _renderOptions(_ref) {
        var _this2 = this;

        var hasUndefined = _ref.hasUndefined,
            labelKey = _ref.labelKey,
            isRequired = _ref.isRequired,
            value = _ref.value,
            _ref$values = _ref.values,
            values = _ref$values === undefined ? [] : _ref$values,
            valueKey = _ref.valueKey,
            isActiveProperty = _ref.isActiveProperty,
            unSelectedLabel = _ref.unSelectedLabel;

        var isRequiredAndNoValue = isRequired && ((0, _lang.isUndefined)(value) || (0, _lang.isNull)(value));
        if (hasUndefined || isRequiredAndNoValue) {
            var _ref2;

            values = (0, _array.union)([(_ref2 = {}, _defineProperty(_ref2, labelKey, this.i18n(unSelectedLabel)), _defineProperty(_ref2, valueKey, UNSELECTED_KEY), _ref2)], values);
        }
        return values.filter(function (v) {
            return (0, _lang.isUndefined)(v[isActiveProperty]) || v[isActiveProperty] === true;
        }) // Filter on the
        .map(function (val, idx) {
            var optVal = '' + val[valueKey];
            var elementValue = val[labelKey];
            var optLabel = (0, _lang.isUndefined)(elementValue) || (0, _lang.isNull)(elementValue) ? _this2.i18n('select.noLabel') : elementValue;
            return _react2.default.createElement(
                'option',
                { key: idx, value: optVal },
                optLabel
            );
        });
    };

    /**
    * @inheritdoc
    * @override
    */


    Select.prototype.render = function render() {
        var _props = this.props,
            autoFocus = _props.autoFocus,
            error = _props.error,
            multiple = _props.multiple,
            name = _props.name,
            placeholder = _props.placeholder,
            style = _props.style,
            value = _props.value,
            values = _props.values,
            disabled = _props.disabled,
            onChange = _props.onChange,
            size = _props.size;

        var selectProps = { autoFocus: autoFocus, disabled: disabled, multiple: multiple, size: size };
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'select', ref: 'select', 'data-valid': !error, style: style },
            _react2.default.createElement(
                'select',
                _extends({ name: name, onChange: this._handleSelectChange, ref: 'htmlSelect', value: value }, selectProps),
                this._renderOptions(this.props)
            ),
            error && _react2.default.createElement(
                'div',
                { className: 'label-error', ref: 'error' },
                error
            )
        );
    };

    return Select;
}(_react.Component)) || _class;

//Static props.


Select.displayName = 'Select';
Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

exports.default = Select;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJVTlNFTEVDVEVEX0tFWSIsIl92YWx1ZVBhcnNlciIsInByb3BzVmFsdWUiLCJyYXdWYWx1ZSIsInVuZGVmaW5lZCIsInR5cGUiLCJwcm9wcyIsInByb3BUeXBlcyIsImRpc2FibGVkIiwiYm9vbCIsImVycm9yIiwic3RyaW5nIiwiaGFzVW5kZWZpbmVkIiwiaXNBY3RpdmVQcm9wZXJ0eSIsImlzUmVxdWlyZWQiLCJsYWJlbEtleSIsIm11bHRpcGxlIiwibmFtZSIsIm9uQ2hhbmdlIiwiZnVuYyIsInBsYWNlaG9sZGVyIiwidW5TZWxlY3RlZExhYmVsIiwidmFsdWUiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJ2YWx1ZUtleSIsInZhbHVlcyIsImFycmF5IiwiZGVmYXVsdFByb3BzIiwidmFsdWVQYXJzZXIiLCJTZWxlY3QiLCJnZXRWYWx1ZSIsIl9oYW5kbGVTZWxlY3RDaGFuZ2UiLCJldnQiLCJ0YXJnZXQiLCJjYWxsIiwiX3JlbmRlck9wdGlvbnMiLCJpc1JlcXVpcmVkQW5kTm9WYWx1ZSIsImkxOG4iLCJmaWx0ZXIiLCJ2IiwibWFwIiwidmFsIiwiaWR4Iiwib3B0VmFsIiwiZWxlbWVudFZhbHVlIiwib3B0TGFiZWwiLCJyZW5kZXIiLCJhdXRvRm9jdXMiLCJzdHlsZSIsInNpemUiLCJzZWxlY3RQcm9wcyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztZQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxpQkFBaUIsZ0JBQXZCO0FBQ0E7Ozs7OztBQU1BLFNBQVNDLFlBQVQsQ0FBc0JDLFVBQXRCLEVBQWtDQyxRQUFsQyxFQUE0QztBQUN4QyxRQUFHSCxtQkFBbUJHLFFBQXRCLEVBQWdDO0FBQzVCLGVBQU9DLFNBQVA7QUFDSDtBQUh1QyxRQUlqQ0MsSUFKaUMsR0FJekIsS0FBS0MsS0FKb0IsQ0FJ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aUNrQyxVQUFqQyxFQUFwQjtBQUNBLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxRQUFoQixFQUF5QixLQUFJLFFBQTdCLEVBQXNDLGNBQVksQ0FBQ3hDLEtBQW5ELEVBQTBELE9BQU91QyxLQUFqRTtBQUNJO0FBQUE7QUFBQSwyQkFBUSxNQUFNaEMsSUFBZCxFQUFvQixVQUFVLEtBQUtlLG1CQUFuQyxFQUF3RCxLQUFJLFlBQTVELEVBQXlFLE9BQU9WLEtBQWhGLElBQTJGNkIsV0FBM0Y7QUFDSyxxQkFBS2YsY0FBTCxDQUFvQixLQUFLOUIsS0FBekI7QUFETCxhQURKO0FBSUtJLHFCQUFTO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGFBQWYsRUFBNkIsS0FBSSxPQUFqQztBQUEwQ0E7QUFBMUM7QUFKZCxTQURKO0FBUUgsSzs7Ozs7QUFHTDs7O0FBQ0FvQixPQUFPc0IsV0FBUCxHQUFxQixRQUFyQjtBQUNBdEIsT0FBT0YsWUFBUCxHQUFzQkEsWUFBdEI7QUFDQUUsT0FBT3ZCLFNBQVAsR0FBbUJBLFNBQW5COztrQkFFZXVCLE0iLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9kZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBDb21wb25lbnRCYXNlQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvY29tcG9uZW50LWJhc2UnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkLCBpc051bGwsIGlzTnVtYmVyfSBmcm9tICdsb2Rhc2gvbGFuZyc7XHJcbmltcG9ydCB7dW5pb259IGZyb20gJ2xvZGFzaC9hcnJheSc7XHJcbmNvbnN0IFVOU0VMRUNURURfS0VZID0gJ1VOU0VMRUNURURfS0VZJztcclxuLyoqXHJcbiogUGFyc2UgdGhlIHZhbHVlLlxyXG4qIEBwYXJhbSAge3N0cmluZyB8IG51bWJlcn0gcHJvcHNWYWx1ZSAtIFRoZSB2YWx1ZSBnaXZlbiBhcyBwcm9wcyB0byByZWFkIHRoZSB0eXBlLlxyXG4qIEBwYXJhbSAge3N0cmluZ30gcmF3VmFsdWUgICAtIFRoZSByYXcgc3RyaW5nIHZhbHVlLlxyXG4qIEByZXR1cm4ge3N0cmludCB8IG51bWJlcn0gIC0gVGhlIHBhcnNlZCB2YWx1ZS5cclxuKi9cclxuZnVuY3Rpb24gX3ZhbHVlUGFyc2VyKHByb3BzVmFsdWUsIHJhd1ZhbHVlKSB7XHJcbiAgICBpZihVTlNFTEVDVEVEX0tFWSA9PT0gcmF3VmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgY29uc3Qge3R5cGV9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiB0eXBlID09PSAnbnVtYmVyJyA/ICtyYXdWYWx1ZSA6IHJhd1ZhbHVlO1xyXG59XHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaGFzVW5kZWZpbmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGlzQWN0aXZlUHJvcGVydHk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBpc1JlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGxhYmVsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbXVsdGlwbGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHVuU2VsZWN0ZWRMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIFByb3BUeXBlcy5udW1iZXJcclxuICAgIF0pLFxyXG4gICAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBoYXNVbmRlZmluZWQ6IHRydWUsXHJcbiAgICBpc0FjdGl2ZVByb3BlcnR5OiAnaXNBY3RpdmUnLFxyXG4gICAgaXNSZXF1aXJlZDogZmFsc2UsXHJcbiAgICBsYWJlbEtleTogJ2xhYmVsJyxcclxuICAgIG11bHRpcGxlOiBmYWxzZSxcclxuICAgIHVuU2VsZWN0ZWRMYWJlbDogJ3NlbGVjdC51blNlbGVjdGVkJyxcclxuICAgIHZhbHVlczogW10sXHJcbiAgICB2YWx1ZUtleTogJ2NvZGUnLFxyXG4gICAgdmFsdWVQYXJzZXI6IF92YWx1ZVBhcnNlclxyXG59O1xyXG5cclxuLyoqXHJcbiogQ29tcG9uZW50IHN0YW5kaW5nIGZvciBhbiBIVE1MIGlucHV0LlxyXG4qL1xyXG5AQ29tcG9uZW50QmFzZUJlaGF2aW91clxyXG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGRvbSB2YWx1ZSBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHVuZm9ybWF0ZWQgZG9tIHZhbHVlLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHt0eXBlLCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc051bGwodmFsdWUpIHx8IGlzVW5kZWZpbmVkKHZhbHVlKSB8fCBVTlNFTEVDVEVEX0tFWSA9PT0gdmFsdWUpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0eXBlID09PSAnbnVtYmVyJyA/ICt2YWx1ZSA6IHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogSGFuZGxlIHRoZSBjaGFuZ2Ugb24gdGhlIHNlbGVjdCwgaXQgb25seSBwcm9wYWdhdGVzIHRoZSB2YWx1ZS5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSBldnQgLSBUaGUgcmVhY3QgRE9NIGV2ZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIGZ1bmN0aW9uIG9uQ2hhbmdlIGZyb20gdGhlIHByb3BzLCBjYWxsZWQuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZVNlbGVjdENoYW5nZSA9IChldnQpID0+IHtcclxuICAgICAgICBjb25zdCB7b25DaGFuZ2UsIHZhbHVlUGFyc2VyLCB2YWx1ZTogcHJvcHNWYWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSBldnQudGFyZ2V0O1xyXG4gICAgICAgIHJldHVybiBvbkNoYW5nZSh2YWx1ZVBhcnNlci5jYWxsKHRoaXMsIHByb3BzVmFsdWUsIHZhbHVlKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBpbmhlcml0ZG9jICovXHJcbiAgICBfcmVuZGVyT3B0aW9ucyh7aGFzVW5kZWZpbmVkLCBsYWJlbEtleSwgaXNSZXF1aXJlZCwgdmFsdWUsIHZhbHVlcyA9IFtdLCB2YWx1ZUtleSwgaXNBY3RpdmVQcm9wZXJ0eSwgdW5TZWxlY3RlZExhYmVsfSkge1xyXG4gICAgICAgIGNvbnN0IGlzUmVxdWlyZWRBbmROb1ZhbHVlID0gaXNSZXF1aXJlZCAmJiAoaXNVbmRlZmluZWQodmFsdWUpIHx8IGlzTnVsbCh2YWx1ZSkpO1xyXG4gICAgICAgIGlmKGhhc1VuZGVmaW5lZCB8fCBpc1JlcXVpcmVkQW5kTm9WYWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZXMgPSB1bmlvbihcclxuICAgICAgICAgICAgICAgIFt7W2xhYmVsS2V5XTogdGhpcy5pMThuKHVuU2VsZWN0ZWRMYWJlbCksIFt2YWx1ZUtleV06IFVOU0VMRUNURURfS0VZfV0sXHJcbiAgICAgICAgICAgICAgICB2YWx1ZXNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlc1xyXG4gICAgICAgIC5maWx0ZXIodiA9PiBpc1VuZGVmaW5lZCh2W2lzQWN0aXZlUHJvcGVydHldKSB8fCB2W2lzQWN0aXZlUHJvcGVydHldID09PSB0cnVlKSAvLyBGaWx0ZXIgb24gdGhlXHJcbiAgICAgICAgLm1hcCgodmFsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0VmFsID0gYCR7dmFsW3ZhbHVlS2V5XX1gO1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50VmFsdWUgPSB2YWxbbGFiZWxLZXldO1xyXG4gICAgICAgICAgICBjb25zdCBvcHRMYWJlbCA9IGlzVW5kZWZpbmVkKGVsZW1lbnRWYWx1ZSkgfHwgaXNOdWxsKGVsZW1lbnRWYWx1ZSkgPyB0aGlzLmkxOG4oJ3NlbGVjdC5ub0xhYmVsJykgOiBlbGVtZW50VmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiAoPG9wdGlvbiBrZXk9e2lkeH0gdmFsdWU9e29wdFZhbH0+e29wdExhYmVsfTwvb3B0aW9uPik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAqIEBvdmVycmlkZVxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGF1dG9Gb2N1cywgZXJyb3IsIG11bHRpcGxlLCBuYW1lLCBwbGFjZWhvbGRlciwgc3R5bGUsIHZhbHVlLCB2YWx1ZXMsIGRpc2FibGVkLCBvbkNoYW5nZSwgc2l6ZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBzZWxlY3RQcm9wcyA9IHsgYXV0b0ZvY3VzLCBkaXNhYmxlZCwgbXVsdGlwbGUsIHNpemUgfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3NlbGVjdCcgcmVmPSdzZWxlY3QnIGRhdGEtdmFsaWQ9eyFlcnJvcn0gc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3QgbmFtZT17bmFtZX0gb25DaGFuZ2U9e3RoaXMuX2hhbmRsZVNlbGVjdENoYW5nZX0gcmVmPSdodG1sU2VsZWN0JyB2YWx1ZT17dmFsdWV9IHsuLi5zZWxlY3RQcm9wc30+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlck9wdGlvbnModGhpcy5wcm9wcyl9XHJcbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIHtlcnJvciAmJiA8ZGl2IGNsYXNzTmFtZT0nbGFiZWwtZXJyb3InIHJlZj0nZXJyb3InPntlcnJvcn08L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5TZWxlY3QuZGlzcGxheU5hbWUgPSAnU2VsZWN0JztcclxuU2VsZWN0LmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuU2VsZWN0LnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDtcclxuIl19