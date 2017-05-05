'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class; //dependencies


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

var _filterHtmlAttributes = require('../../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

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
            error = _props.error,
            style = _props.style;

        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);

        validInputProps.onChange = this._handleSelectChange;
        var inputProps = _extends({}, validInputProps);

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'select', ref: 'select', 'data-valid': !error, style: style },
            _react2.default.createElement(
                'select',
                _extends({ ref: 'htmlSelect' }, inputProps),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJVTlNFTEVDVEVEX0tFWSIsIl92YWx1ZVBhcnNlciIsInByb3BzVmFsdWUiLCJyYXdWYWx1ZSIsInVuZGVmaW5lZCIsInR5cGUiLCJwcm9wcyIsInByb3BUeXBlcyIsImRpc2FibGVkIiwiYm9vbCIsImVycm9yIiwic3RyaW5nIiwiaGFzVW5kZWZpbmVkIiwiaXNBY3RpdmVQcm9wZXJ0eSIsImlzUmVxdWlyZWQiLCJsYWJlbEtleSIsIm11bHRpcGxlIiwibmFtZSIsIm9uQ2hhbmdlIiwiZnVuYyIsInBsYWNlaG9sZGVyIiwidW5TZWxlY3RlZExhYmVsIiwidmFsdWUiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJ2YWx1ZUtleSIsInZhbHVlcyIsImFycmF5IiwiZGVmYXVsdFByb3BzIiwidmFsdWVQYXJzZXIiLCJTZWxlY3QiLCJnZXRWYWx1ZSIsIl9oYW5kbGVTZWxlY3RDaGFuZ2UiLCJldnQiLCJ0YXJnZXQiLCJjYWxsIiwiX3JlbmRlck9wdGlvbnMiLCJpc1JlcXVpcmVkQW5kTm9WYWx1ZSIsImkxOG4iLCJmaWx0ZXIiLCJ2IiwibWFwIiwidmFsIiwiaWR4Iiwib3B0VmFsIiwiZWxlbWVudFZhbHVlIiwib3B0TGFiZWwiLCJyZW5kZXIiLCJzdHlsZSIsInZhbGlkSW5wdXRQcm9wcyIsImlucHV0UHJvcHMiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7WUFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsaUJBQWlCLGdCQUF2QjtBQUNBOzs7Ozs7QUFNQSxTQUFTQyxZQUFULENBQXNCQyxVQUF0QixFQUFrQ0MsUUFBbEMsRUFBNEM7QUFDeEMsUUFBSUgsbUJBQW1CRyxRQUF2QixFQUFpQztBQUM3QixlQUFPQyxTQUFQO0FBQ0g7QUFIdUMsUUFJakNDLElBSmlDLEdBSXpCLEtBQUtDLEtBSm9CLENBSWpD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NkIsS0FBSSxPQUFqQztBQUEwQ0E7QUFBMUM7QUFKZCxTQURKO0FBUUgsSzs7Ozs7QUFHTDs7O0FBQ0FvQixPQUFPcUIsV0FBUCxHQUFxQixRQUFyQjtBQUNBckIsT0FBT0YsWUFBUCxHQUFzQkEsWUFBdEI7QUFDQUUsT0FBT3ZCLFNBQVAsR0FBbUJBLFNBQW5COztrQkFFZXVCLE0iLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9kZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IENvbXBvbmVudEJhc2VCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9jb21wb25lbnQtYmFzZSc7XHJcbmltcG9ydCBmaWx0ZXJQcm9wcyBmcm9tICcuLi8uLi8uLi91dGlscy9maWx0ZXItaHRtbC1hdHRyaWJ1dGVzJztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZCwgaXNOdWxsfSBmcm9tICdsb2Rhc2gvbGFuZyc7XHJcbmltcG9ydCB7dW5pb259IGZyb20gJ2xvZGFzaC9hcnJheSc7XHJcbmNvbnN0IFVOU0VMRUNURURfS0VZID0gJ1VOU0VMRUNURURfS0VZJztcclxuLyoqXHJcbiogUGFyc2UgdGhlIHZhbHVlLlxyXG4qIEBwYXJhbSAge3N0cmluZyB8IG51bWJlcn0gcHJvcHNWYWx1ZSAtIFRoZSB2YWx1ZSBnaXZlbiBhcyBwcm9wcyB0byByZWFkIHRoZSB0eXBlLlxyXG4qIEBwYXJhbSAge3N0cmluZ30gcmF3VmFsdWUgICAtIFRoZSByYXcgc3RyaW5nIHZhbHVlLlxyXG4qIEByZXR1cm4ge3N0cmludCB8IG51bWJlcn0gIC0gVGhlIHBhcnNlZCB2YWx1ZS5cclxuKi9cclxuZnVuY3Rpb24gX3ZhbHVlUGFyc2VyKHByb3BzVmFsdWUsIHJhd1ZhbHVlKSB7XHJcbiAgICBpZiAoVU5TRUxFQ1RFRF9LRVkgPT09IHJhd1ZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGNvbnN0IHt0eXBlfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gdHlwZSA9PT0gJ251bWJlcicgPyArcmF3VmFsdWUgOiByYXdWYWx1ZTtcclxufVxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGhhc1VuZGVmaW5lZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpc0FjdGl2ZVByb3BlcnR5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaXNSZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBsYWJlbEtleTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG11bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB1blNlbGVjdGVkTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBQcm9wVHlwZXMubnVtYmVyXHJcbiAgICBdKSxcclxuICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdmFsdWVzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgaGFzVW5kZWZpbmVkOiB0cnVlLFxyXG4gICAgaXNBY3RpdmVQcm9wZXJ0eTogJ2lzQWN0aXZlJyxcclxuICAgIGlzUmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgbGFiZWxLZXk6ICdsYWJlbCcsXHJcbiAgICBtdWx0aXBsZTogZmFsc2UsXHJcbiAgICB1blNlbGVjdGVkTGFiZWw6ICdzZWxlY3QudW5TZWxlY3RlZCcsXHJcbiAgICB2YWx1ZXM6IFtdLFxyXG4gICAgdmFsdWVLZXk6ICdjb2RlJyxcclxuICAgIHZhbHVlUGFyc2VyOiBfdmFsdWVQYXJzZXJcclxufTtcclxuXHJcbi8qKlxyXG4qIENvbXBvbmVudCBzdGFuZGluZyBmb3IgYW4gSFRNTCBpbnB1dC5cclxuKi9cclxuQENvbXBvbmVudEJhc2VCZWhhdmlvdXJcclxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBkb20gdmFsdWUgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSB1bmZvcm1hdGVkIGRvbSB2YWx1ZS5cclxuICAgICovXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7dHlwZSwgdmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoaXNOdWxsKHZhbHVlKSB8fCBpc1VuZGVmaW5lZCh2YWx1ZSkgfHwgVU5TRUxFQ1RFRF9LRVkgPT09IHZhbHVlKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ251bWJlcicgPyArdmFsdWUgOiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSB0aGUgY2hhbmdlIG9uIHRoZSBzZWxlY3QsIGl0IG9ubHkgcHJvcGFnYXRlcyB0aGUgdmFsdWUuXHJcbiAgICAqIEBwYXJhbSAge29iamVjdH0gZXZ0IC0gVGhlIHJlYWN0IERPTSBldmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBmdW5jdGlvbiBvbkNoYW5nZSBmcm9tIHRoZSBwcm9wcywgY2FsbGVkLlxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVTZWxlY3RDaGFuZ2UgPSAoZXZ0KSA9PiB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlLCB2YWx1ZVBhcnNlciwgdmFsdWU6IHByb3BzVmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gZXZ0LnRhcmdldDtcclxuICAgICAgICByZXR1cm4gb25DaGFuZ2UodmFsdWVQYXJzZXIuY2FsbCh0aGlzLCBwcm9wc1ZhbHVlLCB2YWx1ZSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogaW5oZXJpdGRvYyAqL1xyXG4gICAgX3JlbmRlck9wdGlvbnMoe2hhc1VuZGVmaW5lZCwgbGFiZWxLZXksIGlzUmVxdWlyZWQsIHZhbHVlLCB2YWx1ZXMgPSBbXSwgdmFsdWVLZXksIGlzQWN0aXZlUHJvcGVydHksIHVuU2VsZWN0ZWRMYWJlbH0pIHtcclxuICAgICAgICBjb25zdCBpc1JlcXVpcmVkQW5kTm9WYWx1ZSA9IGlzUmVxdWlyZWQgJiYgKGlzVW5kZWZpbmVkKHZhbHVlKSB8fCBpc051bGwodmFsdWUpKTtcclxuICAgICAgICBpZiAoaGFzVW5kZWZpbmVkIHx8IGlzUmVxdWlyZWRBbmROb1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlcyA9IHVuaW9uKFxyXG4gICAgICAgICAgICAgICAgW3tbbGFiZWxLZXldOiB0aGlzLmkxOG4odW5TZWxlY3RlZExhYmVsKSwgW3ZhbHVlS2V5XTogVU5TRUxFQ1RFRF9LRVl9XSxcclxuICAgICAgICAgICAgICAgIHZhbHVlc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWVzXHJcbiAgICAgICAgLmZpbHRlcih2ID0+IGlzVW5kZWZpbmVkKHZbaXNBY3RpdmVQcm9wZXJ0eV0pIHx8IHZbaXNBY3RpdmVQcm9wZXJ0eV0gPT09IHRydWUpIC8vIEZpbHRlciBvbiB0aGVcclxuICAgICAgICAubWFwKCh2YWwsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRWYWwgPSBgJHt2YWxbdmFsdWVLZXldfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRWYWx1ZSA9IHZhbFtsYWJlbEtleV07XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdExhYmVsID0gaXNVbmRlZmluZWQoZWxlbWVudFZhbHVlKSB8fCBpc051bGwoZWxlbWVudFZhbHVlKSA/IHRoaXMuaTE4bignc2VsZWN0Lm5vTGFiZWwnKSA6IGVsZW1lbnRWYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuICg8b3B0aW9uIGtleT17aWR4fSB2YWx1ZT17b3B0VmFsfT57b3B0TGFiZWx9PC9vcHRpb24+KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogQGluaGVyaXRkb2NcclxuICAgICogQG92ZXJyaWRlXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtlcnJvciwgc3R5bGV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB2YWxpZElucHV0UHJvcHMgPSBmaWx0ZXJQcm9wcyh0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uQ2hhbmdlID0gdGhpcy5faGFuZGxlU2VsZWN0Q2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7Li4udmFsaWRJbnB1dFByb3BzfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWxlY3QnIHJlZj0nc2VsZWN0JyBkYXRhLXZhbGlkPXshZXJyb3J9IHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IHJlZj0naHRtbFNlbGVjdCcgey4uLmlucHV0UHJvcHN9PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJPcHRpb25zKHRoaXMucHJvcHMpfVxyXG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICB7ZXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9J2xhYmVsLWVycm9yJyByZWY9J2Vycm9yJz57ZXJyb3J9PC9kaXY+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1N0YXRpYyBwcm9wcy5cclxuU2VsZWN0LmRpc3BsYXlOYW1lID0gJ1NlbGVjdCc7XHJcblNlbGVjdC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcblNlbGVjdC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Q7XHJcbiJdfQ==