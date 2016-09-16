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

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

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

/**
* Component standing for an HTML input.
* https://github.com/CreativeIT/getmdl-select/
*/

var Select = function (_PureComponent) {
    _inherits(Select, _PureComponent);

    function Select(props) {
        var _ref;

        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

        _initialiseProps.call(_this);

        var hasUndefined = props.hasUndefined;
        var isRequired = props.isRequired;
        var labelKey = props.labelKey;
        var value = props.value;
        var _props$values = props.values;
        var values = _props$values === undefined ? [] : _props$values;
        var valueKey = props.valueKey;
        var unSelectedLabel = props.unSelectedLabel;

        var isRequiredAndNoValue = isRequired && ((0, _lang.isUndefined)(value) || (0, _lang.isNull)(value));
        _this.allValues = hasUndefined || isRequiredAndNoValue ? (0, _union2.default)([(_ref = {}, _defineProperty(_ref, labelKey, _i18next2.default.t(unSelectedLabel)), _defineProperty(_ref, valueKey, UNSELECTED_KEY), _ref)], values) : values;
        return _this;
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
    Select.prototype._renderOptions = function _renderOptions(_ref2) {
        var _this2 = this;

        var hasUndefined = _ref2.hasUndefined;
        var labelKey = _ref2.labelKey;
        var isRequired = _ref2.isRequired;
        var value = _ref2.value;
        var _ref2$values = _ref2.values;
        var values = _ref2$values === undefined ? [] : _ref2$values;
        var valueKey = _ref2.valueKey;
        var isActiveProperty = _ref2.isActiveProperty;
        var unSelectedLabel = _ref2.unSelectedLabel;

        return this.allValues.filter(function (v) {
            return (0, _lang.isUndefined)(v[isActiveProperty]) || v[isActiveProperty] === true;
        }) // Filter on the active value only
        .map(function (val, idx) {
            var optVal = '' + val[valueKey];
            var elementValue = val[labelKey];
            var optLabel = (0, _lang.isUndefined)(elementValue) || (0, _lang.isNull)(elementValue) ? _i18next2.default.t('input.select.noLabel') : elementValue;
            var isSelected = optVal === value;
            return _react2.default.createElement(
                'li',
                { key: idx, className: 'mdl-menu__item', 'data-selected': isSelected, 'data-val': optVal, onClick: function onClick() {
                        return _this2._handleSelectChange(optVal);
                    } },
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
        var labelKey = _props.labelKey;
        var name = _props.name;
        var placeholder = _props.placeholder;
        var style = _props.style;
        var value = _props.value;
        var valueKey = _props.valueKey;
        var disabled = _props.disabled;
        var onChange = _props.onChange;
        var size = _props.size;

        var selectProps = { autoFocus: autoFocus, disabled: disabled, size: size };
        var currentValue = (0, _find2.default)(this.allValues, function (o) {
            return o[valueKey] === value;
        });
        var currentLabel = (0, _lang.isUndefined)(currentValue) || (0, _lang.isNull)(currentValue) ? _i18next2.default.t('input.select.noLabel') : currentValue[labelKey];
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'select-mdl', ref: 'select', className: 'mdl-textfield mdl-js-textfield getmdl-select', 'data-valid': !error, style: style },
            _react2.default.createElement('input', _extends({ placeholder: placeholder, className: 'mdl-textfield__input', value: currentLabel, type: 'text', id: name, name: name, readOnly: true, tabIndex: '-1', 'data-val': value, ref: 'htmlSelect' }, selectProps)),
            !disabled && _react2.default.createElement(
                'label',
                { htmlFor: name },
                _react2.default.createElement(
                    'i',
                    { className: 'mdl-icon-toggle__label material-icons' },
                    'keyboard_arrow_down'
                )
            ),
            !disabled && _react2.default.createElement(
                'ul',
                { className: 'mdl-menu mdl-js-menu', htmlFor: name, ref: 'select' },
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
}(_react.PureComponent);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.getValue = function () {
        var _props2 = _this3.props;
        var type = _props2.type;
        var value = _props2.value;

        if ((0, _lang.isNull)(value) || (0, _lang.isUndefined)(value) || UNSELECTED_KEY === value) return null;
        return type === 'number' ? +value : value;
    };

    this._handleSelectChange = function (value) {
        var _props3 = _this3.props;
        var onChange = _props3.onChange;
        var valueParser = _props3.valueParser;
        var propsValue = _props3.value;

        return onChange(valueParser.call(_this3, propsValue, value));
    };
};

Select.displayName = 'Select';
Select.defaultProps = {
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
Select.propTypes = {
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string,
    hasUndefined: _react.PropTypes.bool,
    isActiveProperty: _react.PropTypes.string,
    isRequired: _react.PropTypes.bool,
    labelKey: _react.PropTypes.string,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    placeholder: _react.PropTypes.string,
    unSelectedLabel: _react.PropTypes.string,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    valueKey: _react.PropTypes.string,
    values: _react.PropTypes.array.isRequired
};
exports.default = Select;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIlVOU0VMRUNURURfS0VZIiwiX3ZhbHVlUGFyc2VyIiwicHJvcHNWYWx1ZSIsInJhd1ZhbHVlIiwidW5kZWZpbmVkIiwidHlwZSIsInByb3BzIiwiU2VsZWN0IiwiaGFzVW5kZWZpbmVkIiwiaXNSZXF1aXJlZCIsImxhYmVsS2V5IiwidmFsdWUiLCJ2YWx1ZXMiLCJ2YWx1ZUtleSIsInVuU2VsZWN0ZWRMYWJlbCIsImlzUmVxdWlyZWRBbmROb1ZhbHVlIiwiYWxsVmFsdWVzIiwidCIsIl9yZW5kZXJPcHRpb25zIiwiaXNBY3RpdmVQcm9wZXJ0eSIsImZpbHRlciIsInYiLCJtYXAiLCJ2YWwiLCJpZHgiLCJvcHRWYWwiLCJlbGVtZW50VmFsdWUiLCJvcHRMYWJlbCIsImlzU2VsZWN0ZWQiLCJfaGFuZGxlU2VsZWN0Q2hhbmdlIiwicmVuZGVyIiwiYXV0b0ZvY3VzIiwiZXJyb3IiLCJuYW1lIiwicGxhY2Vob2xkZXIiLCJzdHlsZSIsImRpc2FibGVkIiwib25DaGFuZ2UiLCJzaXplIiwic2VsZWN0UHJvcHMiLCJjdXJyZW50VmFsdWUiLCJvIiwiY3VycmVudExhYmVsIiwiZ2V0VmFsdWUiLCJ2YWx1ZVBhcnNlciIsImNhbGwiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsIm11bHRpcGxlIiwicHJvcFR5cGVzIiwiYm9vbCIsInN0cmluZyIsImZ1bmMiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJhcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OzsrZUFOQTs7O0FBUUEsSUFBTUEsaUJBQWlCLGdCQUF2Qjs7QUFFQTs7Ozs7O0FBTUEsU0FBU0MsWUFBVCxDQUFzQkMsVUFBdEIsRUFBa0NDLFFBQWxDLEVBQTRDO0FBQ3hDLFFBQUdILG1CQUFtQkcsUUFBdEIsRUFBZ0M7QUFDNUIsZUFBT0MsU0FBUDtBQUNIO0FBSHVDLFFB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T0FMUTtBQU1sQnNDLGNBQVUsS0FOUTtBQU9sQmxDLHFCQUFpQixtQkFQQztBQVFsQkYsWUFBUSxFQVJVO0FBU2xCQyxjQUFVLE1BVFE7QUFVbEIrQixpQkFBYTNDO0FBVkssQ0FBdEI7QUFZQU0sT0FBTzBDLFNBQVAsR0FBbUI7QUFDZmIsY0FBVSxpQkFBVWMsSUFETDtBQUVmbEIsV0FBTyxpQkFBVW1CLE1BRkY7QUFHZjNDLGtCQUFjLGlCQUFVMEMsSUFIVDtBQUlmL0Isc0JBQWtCLGlCQUFVZ0MsTUFKYjtBQUtmMUMsZ0JBQVksaUJBQVV5QyxJQUxQO0FBTWZ4QyxjQUFVLGlCQUFVeUMsTUFOTDtBQU9mbEIsVUFBTSxpQkFBVWtCLE1BQVYsQ0FBaUIxQyxVQVBSO0FBUWY0QixjQUFVLGlCQUFVZSxJQUFWLENBQWUzQyxVQVJWO0FBU2Z5QixpQkFBYSxpQkFBVWlCLE1BVFI7QUFVZnJDLHFCQUFpQixpQkFBVXFDLE1BVlo7QUFXZnhDLFdBQU8saUJBQVUwQyxTQUFWLENBQW9CLENBQ3ZCLGlCQUFVRixNQURhLEVBRXZCLGlCQUFVRyxNQUZhLENBQXBCLENBWFE7QUFlZnpDLGNBQVUsaUJBQVVzQyxNQWZMO0FBZ0JmdkMsWUFBUSxpQkFBVTJDLEtBQVYsQ0FBZ0I5QztBQWhCVCxDQUFuQjtrQkFrQmVGLE0iLCJmaWxlIjoiZnItRlIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2RlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHtQdXJlQ29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5pbXBvcnQgZmluZCBmcm9tICdsb2Rhc2gvZmluZCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWQsIGlzTnVsbCwgaXNOdW1iZXJ9IGZyb20gJ2xvZGFzaC9sYW5nJztcclxuaW1wb3J0IHVuaW9uIGZyb20gJ2xvZGFzaC91bmlvbic7XHJcblxyXG5jb25zdCBVTlNFTEVDVEVEX0tFWSA9ICdVTlNFTEVDVEVEX0tFWSc7XHJcblxyXG4vKipcclxuKiBQYXJzZSB0aGUgdmFsdWUuXHJcbiogQHBhcmFtICB7c3RyaW5nIHwgbnVtYmVyfSBwcm9wc1ZhbHVlIC0gVGhlIHZhbHVlIGdpdmVuIGFzIHByb3BzIHRvIHJlYWQgdGhlIHR5cGUuXHJcbiogQHBhcmFtICB7c3RyaW5nfSByYXdWYWx1ZSAgIC0gVGhlIHJhdyBzdHJpbmcgdmFsdWUuXHJcbiogQHJldHVybiB7c3RyaW50IHwgbnVtYmVyfSAgLSBUaGUgcGFyc2VkIHZhbHVlLlxyXG4qL1xyXG5mdW5jdGlvbiBfdmFsdWVQYXJzZXIocHJvcHNWYWx1ZSwgcmF3VmFsdWUpIHtcclxuICAgIGlmKFVOU0VMRUNURURfS0VZID09PSByYXdWYWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7dHlwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIHR5cGUgPT09ICdudW1iZXInID8gK3Jhd1ZhbHVlIDogcmF3VmFsdWU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuKiBDb21wb25lbnQgc3RhbmRpbmcgZm9yIGFuIEhUTUwgaW5wdXQuXHJcbiogaHR0cHM6Ly9naXRodWIuY29tL0NyZWF0aXZlSVQvZ2V0bWRsLXNlbGVjdC9cclxuKi9cclxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICBjb25zdCB7aGFzVW5kZWZpbmVkLCBpc1JlcXVpcmVkLCBsYWJlbEtleSwgdmFsdWUsIHZhbHVlcyA9IFtdLCB2YWx1ZUtleSwgdW5TZWxlY3RlZExhYmVsfSA9IHByb3BzO1xyXG4gICAgICAgIGNvbnN0IGlzUmVxdWlyZWRBbmROb1ZhbHVlID0gaXNSZXF1aXJlZCAmJiAoaXNVbmRlZmluZWQodmFsdWUpIHx8IGlzTnVsbCh2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMuYWxsVmFsdWVzID0gaGFzVW5kZWZpbmVkIHx8IGlzUmVxdWlyZWRBbmROb1ZhbHVlID8gdW5pb24oW3tbbGFiZWxLZXldOiBpMThuZXh0LnQodW5TZWxlY3RlZExhYmVsKSwgW3ZhbHVlS2V5XTogVU5TRUxFQ1RFRF9LRVl9XSwgdmFsdWVzKSA6IHZhbHVlcztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgZG9tIHZhbHVlIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgdW5mb3JtYXRlZCBkb20gdmFsdWUuXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3R5cGUsIHZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGlzTnVsbCh2YWx1ZSkgfHwgaXNVbmRlZmluZWQodmFsdWUpIHx8IFVOU0VMRUNURURfS0VZID09PSB2YWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHR5cGUgPT09ICdudW1iZXInID8gK3ZhbHVlIDogdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgdGhlIGNoYW5nZSBvbiB0aGUgc2VsZWN0LCBpdCBvbmx5IHByb3BhZ2F0ZXMgdGhlIHZhbHVlLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2dCAtIFRoZSByZWFjdCBET00gZXZlbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZnVuY3Rpb24gb25DaGFuZ2UgZnJvbSB0aGUgcHJvcHMsIGNhbGxlZC5cclxuICAgICovXHJcbiAgICBfaGFuZGxlU2VsZWN0Q2hhbmdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlLCB2YWx1ZVBhcnNlciwgdmFsdWU6IHByb3BzVmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gb25DaGFuZ2UodmFsdWVQYXJzZXIuY2FsbCh0aGlzLCBwcm9wc1ZhbHVlLCB2YWx1ZSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogaW5oZXJpdGRvYyAqL1xyXG4gICAgX3JlbmRlck9wdGlvbnMoe2hhc1VuZGVmaW5lZCwgbGFiZWxLZXksIGlzUmVxdWlyZWQsIHZhbHVlLCB2YWx1ZXMgPSBbXSwgdmFsdWVLZXksIGlzQWN0aXZlUHJvcGVydHksIHVuU2VsZWN0ZWRMYWJlbH0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hbGxWYWx1ZXMuZmlsdGVyKHYgPT4gaXNVbmRlZmluZWQodltpc0FjdGl2ZVByb3BlcnR5XSkgfHwgdltpc0FjdGl2ZVByb3BlcnR5XSA9PT0gdHJ1ZSkgLy8gRmlsdGVyIG9uIHRoZSBhY3RpdmUgdmFsdWUgb25seVxyXG4gICAgICAgIC5tYXAoKHZhbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdFZhbCA9IGAke3ZhbFt2YWx1ZUtleV19YDtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudFZhbHVlID0gdmFsW2xhYmVsS2V5XTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0TGFiZWwgPSBpc1VuZGVmaW5lZChlbGVtZW50VmFsdWUpIHx8IGlzTnVsbChlbGVtZW50VmFsdWUpID8gaTE4bmV4dC50KCdpbnB1dC5zZWxlY3Qubm9MYWJlbCcpIDogZWxlbWVudFZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gb3B0VmFsID09PSB2YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxsaSBrZXk9e2lkeH0gY2xhc3NOYW1lPSdtZGwtbWVudV9faXRlbScgZGF0YS1zZWxlY3RlZD17aXNTZWxlY3RlZH0gZGF0YS12YWw9e29wdFZhbH0gb25DbGljaz17KCkgPT4gdGhpcy5faGFuZGxlU2VsZWN0Q2hhbmdlKG9wdFZhbCl9PntvcHRMYWJlbH08L2xpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgKiBAb3ZlcnJpZGVcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRvRm9jdXMsIGVycm9yLCBsYWJlbEtleSwgbmFtZSwgcGxhY2Vob2xkZXIsIHN0eWxlLCB2YWx1ZSwgdmFsdWVLZXksIGRpc2FibGVkLCBvbkNoYW5nZSwgc2l6ZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBzZWxlY3RQcm9wcyA9IHsgYXV0b0ZvY3VzLCBkaXNhYmxlZCwgc2l6ZSB9O1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGZpbmQodGhpcy5hbGxWYWx1ZXMsIChvKSA9PiBvW3ZhbHVlS2V5XSA9PT0gdmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRMYWJlbCA9IGlzVW5kZWZpbmVkKGN1cnJlbnRWYWx1ZSkgfHwgaXNOdWxsKGN1cnJlbnRWYWx1ZSkgPyBpMThuZXh0LnQoJ2lucHV0LnNlbGVjdC5ub0xhYmVsJykgOiBjdXJyZW50VmFsdWVbbGFiZWxLZXldO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc2VsZWN0LW1kbCcgcmVmPSdzZWxlY3QnIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkIGdldG1kbC1zZWxlY3QnIGRhdGEtdmFsaWQ9eyFlcnJvcn0gc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9faW5wdXQnIHZhbHVlPXtjdXJyZW50TGFiZWx9IHR5cGU9J3RleHQnIGlkPXtuYW1lfSBuYW1lPXtuYW1lfSByZWFkT25seSB0YWJJbmRleD0nLTEnIGRhdGEtdmFsPXt2YWx1ZX0gcmVmPSdodG1sU2VsZWN0JyB7Li4uc2VsZWN0UHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICB7IWRpc2FibGVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e25hbWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21kbC1pY29uLXRvZ2dsZV9fbGFiZWwgbWF0ZXJpYWwtaWNvbnMnPmtleWJvYXJkX2Fycm93X2Rvd248L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHshZGlzYWJsZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSdtZGwtbWVudSBtZGwtanMtbWVudScgaHRtbEZvcj17bmFtZX0gcmVmPSdzZWxlY3QnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyT3B0aW9ucyh0aGlzLnByb3BzKX1cclxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAge2Vycm9yICYmIDxkaXYgY2xhc3NOYW1lPSdsYWJlbC1lcnJvcicgcmVmPSdlcnJvcic+e2Vycm9yfTwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuU2VsZWN0LmRpc3BsYXlOYW1lID0gJ1NlbGVjdCc7XHJcblNlbGVjdC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICBoYXNVbmRlZmluZWQ6IHRydWUsXHJcbiAgICBpc0FjdGl2ZVByb3BlcnR5OiAnaXNBY3RpdmUnLFxyXG4gICAgaXNSZXF1aXJlZDogZmFsc2UsXHJcbiAgICBsYWJlbEtleTogJ2xhYmVsJyxcclxuICAgIG11bHRpcGxlOiBmYWxzZSxcclxuICAgIHVuU2VsZWN0ZWRMYWJlbDogJ3NlbGVjdC51blNlbGVjdGVkJyxcclxuICAgIHZhbHVlczogW10sXHJcbiAgICB2YWx1ZUtleTogJ2NvZGUnLFxyXG4gICAgdmFsdWVQYXJzZXI6IF92YWx1ZVBhcnNlclxyXG59O1xyXG5TZWxlY3QucHJvcFR5cGVzID0ge1xyXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBoYXNVbmRlZmluZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaXNBY3RpdmVQcm9wZXJ0eTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGlzUmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbGFiZWxLZXk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdW5TZWxlY3RlZExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgUHJvcFR5cGVzLm51bWJlclxyXG4gICAgXSksXHJcbiAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHZhbHVlczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0O1xyXG4iXX0=