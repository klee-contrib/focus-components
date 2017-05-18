'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var Checkbox = require('../../../components/input/checkbox');
var i18nBehaviour = require('../../i18n/mixin');

var _require = require('lodash/array'),
    pull = _require.pull;

var selectCheckboxMixin = {
    mixins: [i18nBehaviour],
    /**
    * Tag name.
    */
    displayName: 'SelectCheckbox',

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            values: [], // all values
            value: [], // selected values list
            valueKey: 'value', // key for the displayed value
            labelKey: 'label' // key for the displayed label
        };
    },

    /** @inheritdoc */
    propTypes: function propTypes() {
        return {
            values: (0, _types2.default)('array'),
            value: (0, _types2.default)('array'),
            valueKey: (0, _types2.default)('string'),
            labelKey: (0, _types2.default)('string'),
            onChange: (0, _types2.default)('func')
        };
    },


    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            selectedValues: this.props.value
        };
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'select-checkbox\' component from FocusComponents.common is deprecated, please use FocusComponents.components.select.SelectCheckbox');
    },


    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        if (newProps) {
            this.setState({ selectedValues: newProps.value });
        }
    },


    /**
    * Get the value from the select in the DOM.
    * @return {string} value
    */
    getValue: function getValue() {
        return this.state.selectedValues;
    },


    /**
     * Handle a change of value.
     * @param  {[type]} key       the key
     * @param  {[type]} newStatus the new status
     */
    _handleCheckboxChange: function _handleCheckboxChange(key, newStatus) {
        if (this.props.onChange) {
            this.props.onChange(key, newStatus);
            return;
        }
        var selectedValues = this.state.selectedValues;
        if (newStatus) {
            selectedValues.push(key);
        } else {
            pull(selectedValues, key);
        }
        this.setState({ value: selectedValues });
    },

    /**
     * Closure to capture key and checbox status.
     * @param  {[type]} key the key of checkbox
     * @return {[type]} status closure
     */
    _getCheckboxChangeHandler: function _getCheckboxChangeHandler(key) {
        var _this = this;

        return function (status) {
            _this._handleCheckboxChange(key, status);
        };
    },

    /**
     * Render all selection checkbox.
     * @return {ReactDOMNode} list of ReactDomNode
     */
    renderCheckboxes: function renderCheckboxes() {
        var _this2 = this;

        return this.props.values.map(function (val, idx) {
            var value = val[_this2.props.valueKey];
            var label = val[_this2.props.labelKey];
            var isChecked = 0 <= _this2.state.selectedValues.indexOf(value);
            return React.createElement(Checkbox, { key: idx, label: _this2.i18n(label), onChange: _this2._getCheckboxChangeHandler(value), value: isChecked });
        });
    },


    /** @inheritdoc */
    render: function render() {
        return React.createElement(
            'div',
            { 'data-focus': 'select-checkbox' },
            this.renderCheckboxes()
        );
    }
};

module.exports = (0, _builder2.default)(selectCheckboxMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJDaGVja2JveCIsImkxOG5CZWhhdmlvdXIiLCJwdWxsIiwic2VsZWN0Q2hlY2tib3hNaXhpbiIsIm1peGlucyIsImRpc3BsYXlOYW1lIiwiZ2V0RGVmYXVsdFByb3BzIiwidmFsdWVzIiwidmFsdWUiLCJ2YWx1ZUtleSIsImxhYmVsS2V5IiwicHJvcFR5cGVzIiwib25DaGFuZ2UiLCJnZXRJbml0aWFsU3RhdGUiLCJzZWxlY3RlZFZhbHVlcyIsInByb3BzIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29uc29sZSIsIndhcm4iLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV3UHJvcHMiLCJzZXRTdGF0ZSIsImdldFZhbHVlIiwic3RhdGUiLCJfaGFuZGxlQ2hlY2tib3hDaGFuZ2UiLCJrZXkiLCJuZXdTdGF0dXMiLCJwdXNoIiwiX2dldENoZWNrYm94Q2hhbmdlSGFuZGxlciIsInN0YXR1cyIsInJlbmRlckNoZWNrYm94ZXMiLCJtYXAiLCJ2YWwiLCJpZHgiLCJsYWJlbCIsImlzQ2hlY2tlZCIsImluZGV4T2YiLCJpMThuIiwicmVuZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU1DLFdBQVdELFFBQVEsb0NBQVIsQ0FBakI7QUFDQSxJQUFNRSxnQkFBZ0JGLFFBQVEsa0JBQVIsQ0FBdEI7O2VBQ2VBLFFBQVEsY0FBUixDO0lBQVJHLEksWUFBQUEsSTs7QUFFUCxJQUFNQyxzQkFBc0I7QUFDeEJDLFlBQVEsQ0FBQ0gsYUFBRCxDQURnQjtBQUV4Qjs7O0FBR0FJLGlCQUFhLGdCQUxXOztBQU94QjtBQUNBQyxtQkFSd0IsNkJBUU47QUFDZCxlQUFPO0FBQ0hDLG9CQUFRLEVBREwsRUFDUztBQUNaQyxtQkFBTyxFQUZKLEVB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b21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBDaGVja2JveCA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvY2hlY2tib3gnKTtcclxuY29uc3QgaTE4bkJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL2kxOG4vbWl4aW4nKTtcclxuY29uc3Qge3B1bGx9ID0gcmVxdWlyZSgnbG9kYXNoL2FycmF5Jyk7XHJcblxyXG5jb25zdCBzZWxlY3RDaGVja2JveE1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbaTE4bkJlaGF2aW91cl0sXHJcbiAgICAvKipcclxuICAgICogVGFnIG5hbWUuXHJcbiAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdTZWxlY3RDaGVja2JveCcsXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWVzOiBbXSwgLy8gYWxsIHZhbHVlc1xyXG4gICAgICAgICAgICB2YWx1ZTogW10sIC8vIHNlbGVjdGVkIHZhbHVlcyBsaXN0XHJcbiAgICAgICAgICAgIHZhbHVlS2V5OiAndmFsdWUnLCAvLyBrZXkgZm9yIHRoZSBkaXNwbGF5ZWQgdmFsdWVcclxuICAgICAgICAgICAgbGFiZWxLZXk6ICdsYWJlbCcgLy8ga2V5IGZvciB0aGUgZGlzcGxheWVkIGxhYmVsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZXM6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHlwZXMoJ2FycmF5JyksXHJcbiAgICAgICAgICAgIHZhbHVlS2V5OiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgICAgIGxhYmVsS2V5OiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiB0eXBlcygnZnVuYycpXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZXM6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdGb2N1c0NvbXBvbmVudHMgdjAuMTU6IHRoZSBcXCdzZWxlY3QtY2hlY2tib3hcXCcgY29tcG9uZW50IGZyb20gRm9jdXNDb21wb25lbnRzLmNvbW1vbiBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIEZvY3VzQ29tcG9uZW50cy5jb21wb25lbnRzLnNlbGVjdC5TZWxlY3RDaGVja2JveCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcclxuICAgICAgICBpZihuZXdQcm9wcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZFZhbHVlczogbmV3UHJvcHMudmFsdWV9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIHNlbGVjdCBpbiB0aGUgRE9NLlxyXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IHZhbHVlXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIG9mIHZhbHVlLlxyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBrZXkgICAgICAgdGhlIGtleVxyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBuZXdTdGF0dXMgdGhlIG5ldyBzdGF0dXNcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZUNoZWNrYm94Q2hhbmdlKGtleSwgbmV3U3RhdHVzKSB7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGtleSwgbmV3U3RhdHVzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZXM7XHJcbiAgICAgICAgaWYobmV3U3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVzLnB1c2goa2V5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwdWxsKHNlbGVjdGVkVmFsdWVzLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogc2VsZWN0ZWRWYWx1ZXN9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIENsb3N1cmUgdG8gY2FwdHVyZSBrZXkgYW5kIGNoZWNib3ggc3RhdHVzLlxyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBrZXkgdGhlIGtleSBvZiBjaGVja2JveFxyXG4gICAgICogQHJldHVybiB7W3R5cGVdfSBzdGF0dXMgY2xvc3VyZVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q2hlY2tib3hDaGFuZ2VIYW5kbGVyKGtleSkge1xyXG4gICAgICAgIHJldHVybiAoc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNoZWNrYm94Q2hhbmdlKGtleSwgc3RhdHVzKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGFsbCBzZWxlY3Rpb24gY2hlY2tib3guXHJcbiAgICAgKiBAcmV0dXJuIHtSZWFjdERPTU5vZGV9IGxpc3Qgb2YgUmVhY3REb21Ob2RlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNoZWNrYm94ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmFsdWVzLm1hcCgodmFsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2YWxbdGhpcy5wcm9wcy52YWx1ZUtleV07XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdmFsW3RoaXMucHJvcHMubGFiZWxLZXldO1xyXG4gICAgICAgICAgICBjb25zdCBpc0NoZWNrZWQgPSAwIDw9IHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZXMuaW5kZXhPZih2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Q2hlY2tib3gga2V5PXtpZHh9IGxhYmVsPXt0aGlzLmkxOG4obGFiZWwpfSBvbkNoYW5nZT17dGhpcy5fZ2V0Q2hlY2tib3hDaGFuZ2VIYW5kbGVyKHZhbHVlKX0gdmFsdWU9e2lzQ2hlY2tlZH0gLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWxlY3QtY2hlY2tib3gnPlxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hlY2tib3hlcygpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKHNlbGVjdENoZWNrYm94TWl4aW4pO1xyXG4iXX0=