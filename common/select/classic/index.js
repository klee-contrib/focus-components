'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //Dependencies.


var React = require('react');
var ReactDOM = require('react-dom');
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var union = require('lodash/array/union');

var _require = require('lodash/lang'),
    isUndefined = _require.isUndefined,
    isNull = _require.isNull,
    isNumber = _require.isNumber;

var UNSELECTED_KEY = 'UNSELECTED_KEY';

/**
* Input text mixin.
* @type {Object}
*/
var selectMixin = {
    /** @inheritdoc */
    displayName: 'Select',
    /** @inheritdoc */
    mixins: [i18nMixin, stylableMixin],
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            labelKey: 'label',
            multiple: false,
            values: [],
            valueKey: 'code',
            hasUndefined: true,
            disabled: false
        };
    },

    /** @inheritdoc */
    propTypes: {
        multiple: (0, _types2.default)('bool'),
        labelKey: (0, _types2.default)('string'),
        name: (0, _types2.default)('string'),
        isRequired: (0, _types2.default)('bool'),
        onChange: (0, _types2.default)('func'),
        value: (0, _types2.default)(['number', 'string', 'array']),
        values: (0, _types2.default)('array'),
        valueKey: (0, _types2.default)('string'),
        disabled: (0, _types2.default)('bool')
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents 0.7.0: this component is deprecated, please use FocusComponents.components.input.Select');
    },

    /** @inheritdoc */
    getInitialState: function getInitialState() {
        var _props = this.props,
            hasUndefined = _props.hasUndefined,
            value = _props.value,
            values = _props.values,
            valueKey = _props.valueKey,
            isRequired = _props.isRequired;

        var hasValue = !isUndefined(value) && !isNull(value);
        var isRequiredAndHasValue = true === isRequired && hasValue;
        return {
            value: value,
            hasUndefined: false === hasUndefined || isRequiredAndHasValue ? false : true, //!value
            isNumber: values && 0 < values.length && values[0] && values[0][valueKey] && isNumber(values[0][valueKey])
        };
    },

    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    },

    /**
    * Get the value of the component.
    * @return {object} - Return the value of the component.
    */
    getValue: function getValue() {
        var select = this.refs.select;

        var domValue = ReactDOM.findDOMNode(select).value;
        if (domValue === UNSELECTED_KEY) {
            return null;
        }
        return this.state.isNumber ? +domValue : domValue;
    },

    /**
    * Handle the change value of the input.
    * @param {object} event - The sanitize event of input.
    */
    _handleOnChange: function _handleOnChange(event) {
        //On change handler.
        var _props2 = this.props,
            onChange = _props2.onChange,
            multiple = _props2.multiple;

        if (onChange) {
            onChange(event);
        } else {
            var domValue = event.target.value;
            var value = this.state.isNumber ? +domValue : domValue;
            //Set the state then call the change handler.
            if (multiple) {
                var vals = this.state.value;
                vals.push(value);
                return this.setState({ value: vals });
            }
            return this.setState({ value: value });
        }
    },

    /** @inheritdoc */
    renderOptions: function renderOptions() {
        var _this = this;

        var processValues = void 0;
        var _props3 = this.props,
            labelKey = _props3.labelKey,
            valueKey = _props3.valueKey,
            values = _props3.values;
        var hasUndefined = this.state.hasUndefined;

        if (hasUndefined) {
            var _ref;

            processValues = union([(_ref = {}, _defineProperty(_ref, labelKey, 'select.unSelected'), _defineProperty(_ref, valueKey, UNSELECTED_KEY), _ref)], values);
        } else {
            processValues = values;
        }
        return processValues.map(function (val, idx) {
            var value = '' + val[valueKey];
            var label = val[labelKey] || 'select.noLabel';
            return React.createElement(
                'option',
                { key: idx, value: value },
                _this.i18n(label)
            );
        });
    },

    /**
    * Render an input.
    * @return {DOM} - The dom of an input.
    */
    render: function render() {
        var props = this.props,
            state = this.state,
            _getStyleClassName = this._getStyleClassName,
            _handleOnChange = this._handleOnChange;
        var disabled = props.disabled,
            error = props.error,
            multiple = props.multiple,
            name = props.name;
        var value = state.value;

        var disabledProps = disabled ? { disabled: 'disabled' } : {};
        var selectProps = _extends({ multiple: multiple, value: '' + value, name: name, onChange: _handleOnChange, className: _getStyleClassName(), ref: 'select' }, disabledProps);
        return React.createElement(
            'div',
            { 'data-focus': 'select', 'data-valid': !error },
            React.createElement(
                'select',
                selectProps,
                this.renderOptions()
            ),
            error && React.createElement(
                'div',
                { className: 'label-error', ref: 'error' },
                error
            )
        );
    }
};

module.exports = (0, _builder2.default)(selectMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJSZWFjdERPTSIsImkxOG5NaXhpbiIsInN0eWxhYmxlTWl4aW4iLCJ1bmlvbiIsImlzVW5kZWZpbmVkIiwiaXNOdWxsIiwiaXNOdW1iZXIiLCJVTlNFTEVDVEVEX0tFWSIsInNlbGVjdE1peGluIiwiZGlzcGxheU5hbWUiLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJsYWJlbEtleSIsIm11bHRpcGxlIiwidmFsdWVzIiwidmFsdWVLZXkiLCJoYXNVbmRlZmluZWQiLCJkaXNhYmxlZCIsInByb3BUeXBlcyIsIm5hbWUiLCJpc1JlcXVpcmVkIiwib25DaGFuZ2UiLCJ2YWx1ZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbnNvbGUiLCJ3YXJuIiwiZ2V0SW5pdGlhbFN0YXRlIiwicHJvcHMiLCJoYXNWYWx1ZSIsImlzUmVxdWlyZWRBbmRIYXNWYWx1ZSIsImxlbmd0aCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXdQcm9wcyIsInNldFN0YXRlIiwiZ2V0VmFsdWUiLCJzZWxlY3QiLCJyZWZzIiwiZG9tVmFsdWUiLCJmaW5kRE9NTm9kZSIsInN0YXRlIiwiX2hhbmRsZU9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWxzIiwicHVzaCIsInJlbmRlck9wdGlvbnMiLCJwcm9jZXNzVmFsdWVzIiwibWFwIiwidmFsIiwiaWR4IiwibGFiZWwiLCJpMThuIiwicmVuZGVyIiwiX2dldFN0eWxlQ2xhc3NOYW1lIiwiZXJyb3IiLCJkaXNhYmxlZFByb3BzIiwic2VsZWN0UHJvcHMiLCJjbGFzc05hbWUiLCJyZWYiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tOQUZBOzs7QUFHQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU1DLFdBQVdELFFBQVEsV0FBUixDQUFqQjtB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QUFaO0FBQ0MscUJBQUtYLGFBQUw7QUFERCxhQURBO0FBSUNTLHFCQUFTO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGFBQWYsRUFBNkIsS0FBSSxPQUFqQztBQUEwQ0E7QUFBMUM7QUFKVixTQURKO0FBUUg7QUFsSGUsQ0FBcEI7O0FBcUhBSyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRcEQsV0FBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY2llcy5cclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxuY29uc3QgaTE4bk1peGluID0gcmVxdWlyZSgnLi4vLi4vaTE4bi9taXhpbicpO1xyXG5jb25zdCBzdHlsYWJsZU1peGluID0gcmVxdWlyZSgnLi4vLi4vLi4vbWl4aW4vc3R5bGFibGUnKTtcclxuY29uc3QgdW5pb24gPSByZXF1aXJlKCdsb2Rhc2gvYXJyYXkvdW5pb24nKTtcclxuY29uc3Qge2lzVW5kZWZpbmVkLCBpc051bGwsIGlzTnVtYmVyfSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nJyk7XHJcblxyXG5jb25zdCBVTlNFTEVDVEVEX0tFWSA9ICdVTlNFTEVDVEVEX0tFWSc7XHJcblxyXG4vKipcclxuKiBJbnB1dCB0ZXh0IG1peGluLlxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmNvbnN0IHNlbGVjdE1peGluID0ge1xyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ1NlbGVjdCcsXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIG1peGluczogW2kxOG5NaXhpbiwgc3R5bGFibGVNaXhpbl0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYWJlbEtleTogJ2xhYmVsJyxcclxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZXM6IFtdLFxyXG4gICAgICAgICAgICB2YWx1ZUtleTogJ2NvZGUnLFxyXG4gICAgICAgICAgICBoYXNVbmRlZmluZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBtdWx0aXBsZTogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBsYWJlbEtleTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIG5hbWU6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBpc1JlcXVpcmVkOiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIG9uQ2hhbmdlOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIHZhbHVlOiB0eXBlcyhbJ251bWJlcicsICdzdHJpbmcnLCAnYXJyYXknXSksXHJcbiAgICAgICAgdmFsdWVzOiB0eXBlcygnYXJyYXknKSxcclxuICAgICAgICB2YWx1ZUtleTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIGRpc2FibGVkOiB0eXBlcygnYm9vbCcpXHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignRm9jdXNDb21wb25lbnRzIDAuNy4wOiB0aGlzIGNvbXBvbmVudCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIEZvY3VzQ29tcG9uZW50cy5jb21wb25lbnRzLmlucHV0LlNlbGVjdCcpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHtoYXNVbmRlZmluZWQsIHZhbHVlLCB2YWx1ZXMsIHZhbHVlS2V5LCBpc1JlcXVpcmVkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgaGFzVmFsdWUgPSAhaXNVbmRlZmluZWQodmFsdWUpICYmICFpc051bGwodmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IGlzUmVxdWlyZWRBbmRIYXNWYWx1ZSA9IHRydWUgPT09IGlzUmVxdWlyZWQgJiYgaGFzVmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICBoYXNVbmRlZmluZWQ6IGZhbHNlID09PSBoYXNVbmRlZmluZWQgfHwgaXNSZXF1aXJlZEFuZEhhc1ZhbHVlID8gZmFsc2UgOiB0cnVlLCAvLyF2YWx1ZVxyXG4gICAgICAgICAgICBpc051bWJlcjogdmFsdWVzICYmIDAgPCB2YWx1ZXMubGVuZ3RoICYmIHZhbHVlc1swXSAmJiB2YWx1ZXNbMF1bdmFsdWVLZXldICYmIGlzTnVtYmVyKHZhbHVlc1swXVt2YWx1ZUtleV0pXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV3UHJvcHMudmFsdWV9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gUmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIGNvbnN0IHtzZWxlY3R9ID0gdGhpcy5yZWZzO1xyXG4gICAgICAgIGNvbnN0IGRvbVZhbHVlID0gUmVhY3RET00uZmluZERPTU5vZGUoc2VsZWN0KS52YWx1ZTtcclxuICAgICAgICBpZihkb21WYWx1ZSA9PT0gVU5TRUxFQ1RFRF9LRVkpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pc051bWJlciA/ICtkb21WYWx1ZSA6IGRvbVZhbHVlO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgdGhlIGNoYW5nZSB2YWx1ZSBvZiB0aGUgaW5wdXQuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBzYW5pdGl6ZSBldmVudCBvZiBpbnB1dC5cclxuICAgICovXHJcbiAgICBfaGFuZGxlT25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAvL09uIGNoYW5nZSBoYW5kbGVyLlxyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZSwgbXVsdGlwbGV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZihvbkNoYW5nZSkge1xyXG4gICAgICAgICAgICBvbkNoYW5nZShldmVudCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBkb21WYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnN0YXRlLmlzTnVtYmVyID8gK2RvbVZhbHVlIDogZG9tVmFsdWU7XHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBzdGF0ZSB0aGVuIGNhbGwgdGhlIGNoYW5nZSBoYW5kbGVyLlxyXG4gICAgICAgICAgICBpZihtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHMgPSB0aGlzLnN0YXRlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdmFscy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsc30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICByZW5kZXJPcHRpb25zKCkge1xyXG4gICAgICAgIGxldCBwcm9jZXNzVmFsdWVzO1xyXG4gICAgICAgIGNvbnN0IHtsYWJlbEtleSwgdmFsdWVLZXksIHZhbHVlc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtoYXNVbmRlZmluZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZihoYXNVbmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJvY2Vzc1ZhbHVlcyA9IHVuaW9uKFxyXG4gICAgICAgICAgICAgICAgW3tbbGFiZWxLZXldOiAnc2VsZWN0LnVuU2VsZWN0ZWQnLCBbdmFsdWVLZXldOiBVTlNFTEVDVEVEX0tFWX1dLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVzXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHByb2Nlc3NWYWx1ZXMgPSB2YWx1ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9jZXNzVmFsdWVzLm1hcCgodmFsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBgJHt2YWxbdmFsdWVLZXldfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdmFsW2xhYmVsS2V5XSB8fCAnc2VsZWN0Lm5vTGFiZWwnO1xyXG4gICAgICAgICAgICByZXR1cm4gPG9wdGlvbiBrZXk9e2lkeH0gdmFsdWU9e3ZhbHVlfT57dGhpcy5pMThuKGxhYmVsKX08L29wdGlvbj47XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBhbiBpbnB1dC5cclxuICAgICogQHJldHVybiB7RE9NfSAtIFRoZSBkb20gb2YgYW4gaW5wdXQuXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGUsIF9nZXRTdHlsZUNsYXNzTmFtZSwgX2hhbmRsZU9uQ2hhbmdlfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3Qge2Rpc2FibGVkLCBlcnJvciwgbXVsdGlwbGUsIG5hbWV9ID0gcHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IHN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGRpc2FibGVkUHJvcHMgPSBkaXNhYmxlZCA/IHtkaXNhYmxlZDogJ2Rpc2FibGVkJ30gOiB7fTtcclxuICAgICAgICBjb25zdCBzZWxlY3RQcm9wcyA9IHsuLi57bXVsdGlwbGUsIHZhbHVlOiBgJHt2YWx1ZX1gLCBuYW1lLCBvbkNoYW5nZTogX2hhbmRsZU9uQ2hhbmdlLCBjbGFzc05hbWU6IF9nZXRTdHlsZUNsYXNzTmFtZSgpLCByZWY6ICdzZWxlY3QnfSwgLi4uZGlzYWJsZWRQcm9wc307XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWxlY3QnIGRhdGEtdmFsaWQ9eyFlcnJvcn0+XHJcbiAgICAgICAgICAgIDxzZWxlY3Qgey4uLnNlbGVjdFByb3BzfT5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVyT3B0aW9ucygpfVxyXG4gICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAge2Vycm9yICYmIDxkaXYgY2xhc3NOYW1lPSdsYWJlbC1lcnJvcicgcmVmPSdlcnJvcic+e2Vycm9yfTwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihzZWxlY3RNaXhpbik7XHJcbiJdfQ==