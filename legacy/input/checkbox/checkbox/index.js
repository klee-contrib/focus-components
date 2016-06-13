'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var i18nBehaviour = require('../../i18n/mixin');
var fieldGridBehaviour = require('../../mixin/field-grid-behaviour');
var mdlBehaviour = require('../../mixin/mdl-behaviour');

var _require = require('lodash/lang');

var isUndefined = _require.isUndefined;


var checkBoxMixin = {
    mixins: [i18nBehaviour, fieldGridBehaviour, mdlBehaviour],

    /**
    * Tag name.
    */
    displayName: 'input-checkbox',

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            value: false
        };
    },

    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        value: (0, _types2.default)('bool'),
        label: (0, _types2.default)('string'),
        onChange: (0, _types2.default)('func')
    },
    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ isChecked: newProps.value });
    },

    /** @inheritDoc */
    getInitialState: function getInitialState() {
        var value = this.props.value;

        return {
            isChecked: isUndefined(value) ? false : value
        };
    },

    /**
    * Executed actions on change event.
    * @param  {event} event
    */
    _onChange: function _onChange() {
        var _this = this;

        this.setState({
            isChecked: !this.state.isChecked
        }, function () {
            if (_this.props.onChange) {
                _this.props.onChange(_this.state.isChecked);
            }
        });
    },

    /**
    * Get the value from the input in  the DOM.
    * @returns The DOM node value.
    */
    getValue: function getValue() {
        return this.state.isChecked;
    },

    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render: function render() {
        var isChecked = this.state.isChecked;
        var label = this.props.label;

        var checkedProps = isChecked ? { checked: 'checked' } : {};
        var inputProps = _extends({ className: 'mdl-checkbox__input', onChange: this._onChange, type: 'checkbox' }, checkedProps);
        return React.createElement(
            'label',
            { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox' },
            React.createElement('input', inputProps),
            label && React.createElement(
                'span',
                { className: 'mdl-checkbox__label' },
                this.i18n(label)
            )
        );
    }
};

module.exports = (0, _builder2.default)(checkBoxMixin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBQ0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTSxnQkFBZ0IsUUFBUSxrQkFBUixDQUF0QjtBQUNBLElBQU0scUJBQXFCLFFBQVEsa0NBQVIsQ0FBM0I7QUFDQSxJQUFNLGVBQWUsUUFBUSwyQkFBUixDQUFyQjs7ZUFDc0IsUUFBUSxhQUFSLEM7O0lBQWYsVyxZQUFBLFc7OztBQUdQLElBQU0sZ0JBQWdCO0FBQ2xCLFlBQVEsQ0FBQyxhQUFELEVBQWdCLGtCQUFoQixFQUFvQyxZQUFwQyxDQURVOzs7OztBQU1sQixpQkFBYSxnQkFOSzs7O0FBU2xCLG1CQVRrQiw2QkFTQTtBQUNkLGVBQU87QUFDSCxtQkFBTztBQURKLFNBQVA7QUFHSCxLQWJpQjs7Ozs7O0FBa0JsQixlQUFXO0FBQ1AsZUFBTyxxQkFBTSxNQUFOLENBREE7QUFFUCxlQUFPLHFCQUFNLFFBQU4sQ0FGQTtBQUdQLGtCQUFVLHFCQUFNLE1BQU47QUFISCxLQWxCTzs7QUF3QmxCLDZCQXhCa0IscUNBd0JRLFFBeEJSLEVBd0JrQjtBQUNoQyxhQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVcsU0FBUyxLQUFyQixFQUFkO0FBQ0gsS0ExQmlCOzs7QUE0QmxCLG1CQTVCa0IsNkJBNEJBO0FBQUEsWUFDUCxLQURPLEdBQ0UsS0FBSyxLQURQLENBQ1AsS0FETzs7QUFFZCxlQUFPO0FBQ0gsdUJBQVcsWUFBWSxLQUFaLElBQXFCLEtBQXJCLEdBQTZCO0FBRHJDLFNBQVA7QUFHSCxLQWpDaUI7Ozs7OztBQXNDbEIsYUF0Q2tCLHVCQXNDTjtBQUFBOztBQUNSLGFBQUssUUFBTCxDQUFjO0FBQ1YsdUJBQVcsQ0FBQyxLQUFLLEtBQUwsQ0FBVztBQURiLFNBQWQsRUFFRyxZQUFNO0FBQ0wsZ0JBQUcsTUFBSyxLQUFMLENBQVcsUUFBZCxFQUF3QjtBQUNwQixzQkFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixNQUFLLEtBQUwsQ0FBVyxTQUEvQjtBQUNIO0FBQ0osU0FORDtBQU9ILEtBOUNpQjs7Ozs7O0FBbURsQixZQW5Ea0Isc0JBbURQO0FBQ1AsZUFBTyxLQUFLLEtBQUwsQ0FBVyxTQUFsQjtBQUNILEtBckRpQjs7Ozs7O0FBMERsQixVQTFEa0Isb0JBMERUO0FBQUEsWUFDRSxTQURGLEdBQ2UsS0FBSyxLQURwQixDQUNFLFNBREY7QUFBQSxZQUVFLEtBRkYsR0FFVyxLQUFLLEtBRmhCLENBRUUsS0FGRjs7QUFHTCxZQUFNLGVBQWUsWUFBWSxFQUFDLFNBQVMsU0FBVixFQUFaLEdBQW1DLEVBQXhEO0FBQ0EsWUFBTSxzQkFBaUIsRUFBQyxXQUFXLHFCQUFaLEVBQW1DLFVBQVUsS0FBSyxTQUFsRCxFQUE2RCxNQUFNLFVBQW5FLEVBQWpCLEVBQW9HLFlBQXBHLENBQU47QUFDQSxlQUNJO0FBQUE7WUFBQSxFQUFPLFdBQVUsbURBQWpCLEVBQXFFLGNBQVcsZ0JBQWhGO1lBQ0ksNkJBQVcsVUFBWCxDQURKO1lBRUssU0FDRztBQUFBO2dCQUFBLEVBQU0sV0FBVSxxQkFBaEI7Z0JBQXVDLEtBQUssSUFBTCxDQUFVLEtBQVY7QUFBdkM7QUFIUixTQURKO0FBUUg7QUF2RWlCLENBQXRCOztBQTBFQSxPQUFPLE9BQVAsR0FBaUIsdUJBQVEsYUFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBpMThuQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vaTE4bi9taXhpbicpO1xyXG5jb25zdCBmaWVsZEdyaWRCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9maWVsZC1ncmlkLWJlaGF2aW91cicpO1xyXG5jb25zdCBtZGxCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9tZGwtYmVoYXZpb3VyJyk7XHJcbmNvbnN0IHtpc1VuZGVmaW5lZH0gPSByZXF1aXJlKCdsb2Rhc2gvbGFuZycpO1xyXG5cclxuXHJcbmNvbnN0IGNoZWNrQm94TWl4aW4gPSB7XHJcbiAgICBtaXhpbnM6IFtpMThuQmVoYXZpb3VyLCBmaWVsZEdyaWRCZWhhdmlvdXIsIG1kbEJlaGF2aW91cl0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFRhZyBuYW1lLlxyXG4gICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnaW5wdXQtY2hlY2tib3gnLFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFByb3BlcnRpZXMgdmFsaWRhdGlvbi5cclxuICAgICogQHR5cGUge09iamVjdH1cclxuICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICB2YWx1ZTogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBsYWJlbDogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIG9uQ2hhbmdlOiB0eXBlcygnZnVuYycpXHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNDaGVja2VkOiBuZXdQcm9wcy52YWx1ZX0pO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogaXNVbmRlZmluZWQodmFsdWUpID8gZmFsc2UgOiB2YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEV4ZWN1dGVkIGFjdGlvbnMgb24gY2hhbmdlIGV2ZW50LlxyXG4gICAgKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcclxuICAgICovXHJcbiAgICBfb25DaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzQ2hlY2tlZDogIXRoaXMuc3RhdGUuaXNDaGVja2VkXHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuc3RhdGUuaXNDaGVja2VkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGlucHV0IGluICB0aGUgRE9NLlxyXG4gICAgKiBAcmV0dXJucyBUaGUgRE9NIG5vZGUgdmFsdWUuXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNDaGVja2VkO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIENoZWNrYm94IEhUTUwuXHJcbiAgICAqIEByZXR1cm4ge1ZpcnR1YWxET019IC0gVGhlIHZpcnR1YWwgRE9NIG9mIHRoZSBjaGVja2JveC5cclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2lzQ2hlY2tlZH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrZWRQcm9wcyA9IGlzQ2hlY2tlZCA/IHtjaGVja2VkOiAnY2hlY2tlZCd9IDoge307XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHsuLi57Y2xhc3NOYW1lOiAnbWRsLWNoZWNrYm94X19pbnB1dCcsIG9uQ2hhbmdlOiB0aGlzLl9vbkNoYW5nZSwgdHlwZTogJ2NoZWNrYm94J30sIC4uLmNoZWNrZWRQcm9wc307XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cIm1kbC1jaGVja2JveCBtZGwtanMtY2hlY2tib3ggbWRsLWpzLXJpcHBsZS1lZmZlY3RcIiBkYXRhLWZvY3VzPVwiaW5wdXQtY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB7Li4uaW5wdXRQcm9wc30gLz5cclxuICAgICAgICAgICAgICAgIHtsYWJlbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1kbC1jaGVja2JveF9fbGFiZWxcIj57dGhpcy5pMThuKGxhYmVsKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihjaGVja0JveE1peGluKTtcclxuIl19