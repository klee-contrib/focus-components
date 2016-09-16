'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _lang = require('lodash/lang');

var _union = require('lodash/union');

var _union2 = _interopRequireDefault(_union);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } //dependencies


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

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select() {
        var _temp, _this, _ret;

        _classCallCheck(this, Select);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getValue = function () {
            var _this$props = _this.props;
            var type = _this$props.type;
            var value = _this$props.value;

            if ((0, _lang.isNull)(value) || (0, _lang.isUndefined)(value) || UNSELECTED_KEY === value) return null;
            return type === 'number' ? +value : value;
        }, _this._handleSelectChange = function (evt) {
            var _this$props2 = _this.props;
            var onChange = _this$props2.onChange;
            var valueParser = _this$props2.valueParser;
            var propsValue = _this$props2.value;
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
        var hasUndefined = _ref.hasUndefined;
        var labelKey = _ref.labelKey;
        var isRequired = _ref.isRequired;
        var value = _ref.value;
        var _ref$values = _ref.values;
        var values = _ref$values === undefined ? [] : _ref$values;
        var valueKey = _ref.valueKey;
        var isActiveProperty = _ref.isActiveProperty;
        var unSelectedLabel = _ref.unSelectedLabel;

        var isRequiredAndNoValue = isRequired && ((0, _lang.isUndefined)(value) || (0, _lang.isNull)(value));
        if (hasUndefined || isRequiredAndNoValue) {
            var _ref2;

            values = (0, _union2.default)([(_ref2 = {}, _defineProperty(_ref2, labelKey, _i18next2.default.t(unSelectedLabel)), _defineProperty(_ref2, valueKey, UNSELECTED_KEY), _ref2)], values);
        }
        return values.filter(function (v) {
            return (0, _lang.isUndefined)(v[isActiveProperty]) || v[isActiveProperty] === true;
        }) // Filter on the
        .map(function (val, idx) {
            var optVal = '' + val[valueKey];
            var elementValue = val[labelKey];
            var optLabel = (0, _lang.isUndefined)(elementValue) || (0, _lang.isNull)(elementValue) ? _i18next2.default.t('input.select.noLabel') : elementValue;
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
        var _props = this.props;
        var autoFocus = _props.autoFocus;
        var error = _props.error;
        var multiple = _props.multiple;
        var name = _props.name;
        var placeholder = _props.placeholder;
        var style = _props.style;
        var value = _props.value;
        var values = _props.values;
        var disabled = _props.disabled;
        var onChange = _props.onChange;
        var size = _props.size;

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
}(_react.Component);

//Static props.


Select.displayName = 'Select';
Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

exports.default = Select;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIlVOU0VMRUNURURfS0VZIiwiX3ZhbHVlUGFyc2VyIiwicHJvcHNWYWx1ZSIsInJhd1ZhbHVlIiwidW5kZWZpbmVkIiwidHlwZSIsInByb3BzIiwicHJvcFR5cGVzIiwiZGlzYWJsZWQiLCJib29sIiwiZXJyb3IiLCJzdHJpbmciLCJoYXNVbmRlZmluZWQiLCJpc0FjdGl2ZVByb3BlcnR5IiwiaXNSZXF1aXJlZCIsImxhYmVsS2V5IiwibXVsdGlwbGUiLCJuYW1lIiwib25DaGFuZ2UiLCJmdW5jIiwicGxhY2Vob2xkZXIiLCJ1blNlbGVjdGVkTGFiZWwiLCJ2YWx1ZSIsIm9uZU9mVHlwZSIsIm51bWJlciIsInZhbHVlS2V5IiwidmFsdWVzIiwiYXJyYXkiLCJkZWZhdWx0UHJvcHMiLCJ2YWx1ZVBhcnNlciIsIlNlbGVjdCIsImdldFZhbHVlIiwiX2hhbmRsZVNlbGVjdENoYW5nZSIsImV2dCIsInRhcmdldCIsImNhbGwiLCJfcmVuZGVyT3B0aW9ucyIsImlzUmVxdWlyZWRBbmROb1ZhbHVlIiwidCIsImZpbHRlciIsInYiLCJtYXAiLCJ2YWwiLCJpZHgiLCJvcHRWYWwiLCJlbGVtZW50VmFsdWUiLCJvcHRMYWJlbCIsInJlbmRlciIsImF1dG9Gb2N1cyIsInN0eWxlIiwic2l6ZSIsInNlbGVjdFByb3BzIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OytlQUxBOzs7QUFNQSxJQUFNQSxpQkFBaUIsZ0JBQXZCO0FBQ0E7Ozs7OztBQU1BLFNBQVNDLFlBQVQsQ0FBc0JDLFVBQXRCLEVBQWtDQyxRQUFsQyxFQUE0QztBQUN4QyxRQUFHSCxtQkFBbUJHLFFBQXRCLEVBQWdDO0FBQzVCLGVBQU9DLFNBQVA7QUFDSDtBQUh1QyxRQUlqQ0MsSUFKaUMsR0FJekIsS0FBS0MsS0FKb0IsQ0FJakNELElBSmlDOztBQUt4QyxXQUFP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RUFBdUJRLGtCQUF2QixFQUFpQ2tDLFVBQWpDLEVBQXBCO0FBQ0EsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLFFBQWhCLEVBQXlCLEtBQUksUUFBN0IsRUFBc0MsY0FBWSxDQUFDeEMsS0FBbkQsRUFBMEQsT0FBT3VDLEtBQWpFO0FBQ0k7QUFBQTtBQUFBLDJCQUFRLE1BQU1oQyxJQUFkLEVBQW9CLFVBQVUsS0FBS2UsbUJBQW5DLEVBQXdELEtBQUksWUFBNUQsRUFBeUUsT0FBT1YsS0FBaEYsSUFBMkY2QixXQUEzRjtBQUNLLHFCQUFLZixjQUFMLENBQW9CLEtBQUs5QixLQUF6QjtBQURMLGFBREo7QUFJS0kscUJBQVM7QUFBQTtBQUFBLGtCQUFLLFdBQVUsYUFBZixFQUE2QixLQUFJLE9BQWpDO0FBQTBDQTtBQUExQztBQUpkLFNBREo7QUFRSCxLOztXQXpEQ29CLE07OztBQTRETjs7O0FBQ0FBLE9BQU9zQixXQUFQLEdBQXFCLFFBQXJCO0FBQ0F0QixPQUFPRixZQUFQLEdBQXNCQSxZQUF0QjtBQUNBRSxPQUFPdkIsU0FBUCxHQUFtQkEsU0FBbkI7O2tCQUVldUIsTSIsImZpbGUiOiJmci1GUi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vZGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZCwgaXNOdWxsLCBpc051bWJlcn0gZnJvbSAnbG9kYXNoL2xhbmcnO1xyXG5pbXBvcnQgdW5pb24gZnJvbSAnbG9kYXNoL3VuaW9uJztcclxuY29uc3QgVU5TRUxFQ1RFRF9LRVkgPSAnVU5TRUxFQ1RFRF9LRVknO1xyXG4vKipcclxuKiBQYXJzZSB0aGUgdmFsdWUuXHJcbiogQHBhcmFtICB7c3RyaW5nIHwgbnVtYmVyfSBwcm9wc1ZhbHVlIC0gVGhlIHZhbHVlIGdpdmVuIGFzIHByb3BzIHRvIHJlYWQgdGhlIHR5cGUuXHJcbiogQHBhcmFtICB7c3RyaW5nfSByYXdWYWx1ZSAgIC0gVGhlIHJhdyBzdHJpbmcgdmFsdWUuXHJcbiogQHJldHVybiB7c3RyaW50IHwgbnVtYmVyfSAgLSBUaGUgcGFyc2VkIHZhbHVlLlxyXG4qL1xyXG5mdW5jdGlvbiBfdmFsdWVQYXJzZXIocHJvcHNWYWx1ZSwgcmF3VmFsdWUpIHtcclxuICAgIGlmKFVOU0VMRUNURURfS0VZID09PSByYXdWYWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7dHlwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIHR5cGUgPT09ICdudW1iZXInID8gK3Jhd1ZhbHVlIDogcmF3VmFsdWU7XHJcbn1cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBoYXNVbmRlZmluZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaXNBY3RpdmVQcm9wZXJ0eTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGlzUmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbGFiZWxLZXk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBtdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdW5TZWxlY3RlZExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgUHJvcFR5cGVzLm51bWJlclxyXG4gICAgXSksXHJcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHZhbHVlczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIGhhc1VuZGVmaW5lZDogdHJ1ZSxcclxuICAgIGlzQWN0aXZlUHJvcGVydHk6ICdpc0FjdGl2ZScsXHJcbiAgICBpc1JlcXVpcmVkOiBmYWxzZSxcclxuICAgIGxhYmVsS2V5OiAnbGFiZWwnLFxyXG4gICAgbXVsdGlwbGU6IGZhbHNlLFxyXG4gICAgdW5TZWxlY3RlZExhYmVsOiAnc2VsZWN0LnVuU2VsZWN0ZWQnLFxyXG4gICAgdmFsdWVzOiBbXSxcclxuICAgIHZhbHVlS2V5OiAnY29kZScsXHJcbiAgICB2YWx1ZVBhcnNlcjogX3ZhbHVlUGFyc2VyXHJcbn07XHJcblxyXG4vKipcclxuKiBDb21wb25lbnQgc3RhbmRpbmcgZm9yIGFuIEhUTUwgaW5wdXQuXHJcbiovXHJcbmNsYXNzIFNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgZG9tIHZhbHVlIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgdW5mb3JtYXRlZCBkb20gdmFsdWUuXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3R5cGUsIHZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGlzTnVsbCh2YWx1ZSkgfHwgaXNVbmRlZmluZWQodmFsdWUpIHx8IFVOU0VMRUNURURfS0VZID09PSB2YWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHR5cGUgPT09ICdudW1iZXInID8gK3ZhbHVlIDogdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgdGhlIGNoYW5nZSBvbiB0aGUgc2VsZWN0LCBpdCBvbmx5IHByb3BhZ2F0ZXMgdGhlIHZhbHVlLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2dCAtIFRoZSByZWFjdCBET00gZXZlbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZnVuY3Rpb24gb25DaGFuZ2UgZnJvbSB0aGUgcHJvcHMsIGNhbGxlZC5cclxuICAgICovXHJcbiAgICBfaGFuZGxlU2VsZWN0Q2hhbmdlID0gKGV2dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZSwgdmFsdWVQYXJzZXIsIHZhbHVlOiBwcm9wc1ZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IGV2dC50YXJnZXQ7XHJcbiAgICAgICAgcmV0dXJuIG9uQ2hhbmdlKHZhbHVlUGFyc2VyLmNhbGwodGhpcywgcHJvcHNWYWx1ZSwgdmFsdWUpKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIGluaGVyaXRkb2MgKi9cclxuICAgIF9yZW5kZXJPcHRpb25zKHtoYXNVbmRlZmluZWQsIGxhYmVsS2V5LCBpc1JlcXVpcmVkLCB2YWx1ZSwgdmFsdWVzID0gW10sIHZhbHVlS2V5LCBpc0FjdGl2ZVByb3BlcnR5LCB1blNlbGVjdGVkTGFiZWx9KSB7XHJcbiAgICAgICAgY29uc3QgaXNSZXF1aXJlZEFuZE5vVmFsdWUgPSBpc1JlcXVpcmVkICYmIChpc1VuZGVmaW5lZCh2YWx1ZSkgfHwgaXNOdWxsKHZhbHVlKSk7XHJcbiAgICAgICAgaWYoaGFzVW5kZWZpbmVkIHx8IGlzUmVxdWlyZWRBbmROb1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlcyA9IHVuaW9uKFxyXG4gICAgICAgICAgICAgICAgW3tbbGFiZWxLZXldOiBpMThuZXh0LnQodW5TZWxlY3RlZExhYmVsKSwgW3ZhbHVlS2V5XTogVU5TRUxFQ1RFRF9LRVl9XSxcclxuICAgICAgICAgICAgICAgIHZhbHVlc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWVzXHJcbiAgICAgICAgLmZpbHRlcih2ID0+IGlzVW5kZWZpbmVkKHZbaXNBY3RpdmVQcm9wZXJ0eV0pIHx8IHZbaXNBY3RpdmVQcm9wZXJ0eV0gPT09IHRydWUpIC8vIEZpbHRlciBvbiB0aGVcclxuICAgICAgICAubWFwKCh2YWwsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRWYWwgPSBgJHt2YWxbdmFsdWVLZXldfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRWYWx1ZSA9IHZhbFtsYWJlbEtleV07XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdExhYmVsID0gaXNVbmRlZmluZWQoZWxlbWVudFZhbHVlKSB8fCBpc051bGwoZWxlbWVudFZhbHVlKSA/IGkxOG5leHQudCgnaW5wdXQuc2VsZWN0Lm5vTGFiZWwnKSA6IGVsZW1lbnRWYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuICg8b3B0aW9uIGtleT17aWR4fSB2YWx1ZT17b3B0VmFsfT57b3B0TGFiZWx9PC9vcHRpb24+KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogQGluaGVyaXRkb2NcclxuICAgICogQG92ZXJyaWRlXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYXV0b0ZvY3VzLCBlcnJvciwgbXVsdGlwbGUsIG5hbWUsIHBsYWNlaG9sZGVyLCBzdHlsZSwgdmFsdWUsIHZhbHVlcywgZGlzYWJsZWQsIG9uQ2hhbmdlLCBzaXplIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdFByb3BzID0geyBhdXRvRm9jdXMsIGRpc2FibGVkLCBtdWx0aXBsZSwgc2l6ZSB9O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc2VsZWN0JyByZWY9J3NlbGVjdCcgZGF0YS12YWxpZD17IWVycm9yfSBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBuYW1lPXtuYW1lfSBvbkNoYW5nZT17dGhpcy5faGFuZGxlU2VsZWN0Q2hhbmdlfSByZWY9J2h0bWxTZWxlY3QnIHZhbHVlPXt2YWx1ZX0gey4uLnNlbGVjdFByb3BzfT5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyT3B0aW9ucyh0aGlzLnByb3BzKX1cclxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAge2Vycm9yICYmIDxkaXYgY2xhc3NOYW1lPSdsYWJlbC1lcnJvcicgcmVmPSdlcnJvcic+e2Vycm9yfTwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcblNlbGVjdC5kaXNwbGF5TmFtZSA9ICdTZWxlY3QnO1xyXG5TZWxlY3QuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5TZWxlY3QucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0O1xyXG4iXX0=