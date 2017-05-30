'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixin = exports.component = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _valueBehaviour = require('./mixin/value-behaviour');

var _valueBehaviour2 = _interopRequireDefault(_valueBehaviour);

var _validationBehaviour = require('./mixin/validation-behaviour');

var _validationBehaviour2 = _interopRequireDefault(_validationBehaviour);

var _builtInComponents = require('./mixin/built-in-components');

var _builtInComponents2 = _interopRequireDefault(_builtInComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mixin for the field helper.
 * @type {Object}
 */
var FieldMixin = {
    /** @inheriteDoc */
    mixins: [_valueBehaviour2.default, _validationBehaviour2.default, _builtInComponents2.default],
    /** @inheriteDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            isEdit: true,
            type: 'text'
        };
    },

    /** @inheritdoc */
    propTypes: {
        /**
        * Edition mode of the field.
        * @type {Boolean}
        */
        isEdit: (0, _types2.default)('bool'),
        /**
        * HTML input type.
        * @type {String}
        */
        type: (0, _types2.default)('string'),
        /**
        * Field name.
        * @type {string}
        */
        name: (0, _types2.default)('string'),
        value: (0, _types2.default)(['string', 'number'])
    },
    /** @inheritdoc */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        var _state = this.state,
            value = _state.value,
            values = _state.values;

        var newState = { value: newProps.value, values: newProps.values };
        if (value !== newProps.value || values !== newProps.values) {
            newState.error = null;
        }
        if (newProps.error) {
            newState.error = newProps.error;
        }
        this.setState(newState);
    },

    /**
    * Get the css class of the field component.
    */
    _className: function _className() {
        var stateClass = this.state.error ? 'is-invalid' : '';
        return 'mdl-grid ' + stateClass;
    },

    /** @inheritdoc */
    render: function render() {
        var error = this.state.error;
        var _props = this.props,
            FieldComponent = _props.FieldComponent,
            InputLabelComponent = _props.InputLabelComponent,
            domain = _props.domain,
            codeResolver = _props.codeResolver,
            searcher = _props.searcher,
            keyResolver = _props.keyResolver,
            querySearcher = _props.querySearcher,
            isRequired = _props.isRequired,
            values = _props.values,
            hasLabel = _props.hasLabel,
            isEdit = _props.isEdit;

        var isCustomComponent = FieldComponent || InputLabelComponent;
        var autocomplete = this.autocomplete,
            autocompleteSelect = this.autocompleteSelect,
            autocompleteText = this.autocompleteText,
            label = this.label,
            input = this.input,
            select = this.select,
            display = this.display;

        return _react2.default.createElement(
            'div',
            { className: 'mdl-grid', 'data-domain': domain, 'data-focus': 'field', 'data-mode': isEdit ? 'edit' : 'consult', 'data-required': isRequired, 'data-valid': !error },
            isCustomComponent && this._renderFieldComponent(),
            !isCustomComponent && hasLabel && label(),
            !isCustomComponent && _react2.default.createElement(
                'div',
                { className: '' + this._getContentGridClassName(), 'data-focus': 'field-value-container' },
                codeResolver && searcher ? autocomplete() : keyResolver && querySearcher ? autocompleteSelect() : querySearcher ? autocompleteText() : isEdit ? values ? select() : input() : display()
            )
        );
    }
};
// Components

// Mixins

var builtComp = (0, _builder2.default)(FieldMixin);
var component = builtComp.component,
    mixin = builtComp.mixin;
exports.component = component;
exports.mixin = mixin;
exports.default = builtComp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJGaWVsZE1peGluIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwiaXNFZGl0IiwidHlwZSIsInByb3BUeXBlcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXdQcm9wcyIsInN0YXRlIiwidmFsdWVzIiwibmV3U3RhdGUiLCJlcnJvciIsInNldFN0YXRlIiwiX2NsYXNzTmFtZSIsInN0YXRlQ2xhc3MiLCJyZW5kZXIiLCJwcm9wcyIsIkZpZWxkQ29tcG9uZW50IiwiSW5wdXRMYWJlbENvbXBvbmVudCIsImRvbWFpbiIsImNvZGVSZXNvbHZlciIsInNlYXJjaGVyIiwia2V5UmVzb2x2ZXIiLCJxdWVyeVNlYXJjaGVyIiwiaXNSZXF1aXJlZCIsImhhc0xhYmVsIiwiaXNDdXN0b21Db21wb25lbnQiLCJhdXRvY29tcGxldGUiLCJhdXRvY29tcGxldGVTZWxlY3QiLCJhdXRvY29tcGxldGVUZXh0IiwibGFiZWwiLCJpbnB1dCIsInNlbGVjdCIsImRpc3BsYXkiLCJfcmVuZGVyRmllbGRDb21wb25lbnQiLCJfZ2V0Q29udGVudEdyaWRDbGFzc05hbWUiLCJidWlsdENvbXAiLCJjb21wb25lbnQiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUE7Ozs7QUFJQSxJQUFNQSxhQUFhO0FBQ2Y7QUFDQUMsWUFBUSxzRkFGTztBQUdmO0FBQ0FDLG1CQUplLDZCQUlHO0FBQ2QsZUFBTztBQUNIQyxvQkFBUSxJQURMO0FBRUhDLGtCQUFNO0FBRkgsU0FBUDtBQUlILEtBVGM7O0FBVWY7QUFDQUMsZUFBVztBQUNQOzs7O0FBSUFGLGdCQUFRLHFCQUFLLE1BQUwsQ0FMRDtBQU1QOzs7O0FBSUFDLGNBQU0scUJBQUssUUFBTCxDQVZDO0FBV1A7Ozs7QUFJQUUsY0FB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RTtBQURyTDtBQUpSLFNBREo7QUFXSDtBQWpFYyxDQUFuQjtBQVBBOztBQUhBOztBQTZFQSxJQUFNRyxZQUFZLHVCQUFRdEMsVUFBUixDQUFsQjtJQUNPdUMsUyxHQUFvQkQsUyxDQUFwQkMsUztJQUFXQyxLLEdBQVNGLFMsQ0FBVEUsSztRQUdkRCxTLEdBQUFBLFM7UUFDQUMsSyxHQUFBQSxLO2tCQUVXRixTIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbi8vIE1peGluc1xyXG5pbXBvcnQgdmFsdWVCZWhhdmlvdXIgZnJvbSAnLi9taXhpbi92YWx1ZS1iZWhhdmlvdXInO1xyXG5pbXBvcnQgdmFsaWRhdGlvbkJlaGF2aW91ciBmcm9tICcuL21peGluL3ZhbGlkYXRpb24tYmVoYXZpb3VyJztcclxuLy8gQ29tcG9uZW50c1xyXG5pbXBvcnQgYnVpbHRJbkNvbXBvbmVudHMgZnJvbSAnLi9taXhpbi9idWlsdC1pbi1jb21wb25lbnRzJztcclxuXHJcbi8qKlxyXG4gKiBNaXhpbiBmb3IgdGhlIGZpZWxkIGhlbHBlci5cclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbmNvbnN0IEZpZWxkTWl4aW4gPSB7XHJcbiAgICAvKiogQGluaGVyaXRlRG9jICovXHJcbiAgICBtaXhpbnM6IFt2YWx1ZUJlaGF2aW91ciwgdmFsaWRhdGlvbkJlaGF2aW91ciwgYnVpbHRJbkNvbXBvbmVudHNdLFxyXG4gICAgLyoqIEBpbmhlcml0ZURvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzRWRpdDogdHJ1ZSxcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogRWRpdGlvbiBtb2RlIG9mIHRoZSBmaWVsZC5cclxuICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICovXHJcbiAgICAgICAgaXNFZGl0OiB0eXBlKCdib29sJyksXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBIVE1MIGlucHV0IHR5cGUuXHJcbiAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdHlwZTogdHlwZSgnc3RyaW5nJyksXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBGaWVsZCBuYW1lLlxyXG4gICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIG5hbWU6IHR5cGUoJ3N0cmluZycpLFxyXG4gICAgICAgIHZhbHVlOiB0eXBlKFsnc3RyaW5nJywgJ251bWJlciddKVxyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZSwgdmFsdWVzfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB7IHZhbHVlOiBuZXdQcm9wcy52YWx1ZSwgdmFsdWVzOiBuZXdQcm9wcy52YWx1ZXMgfTtcclxuICAgICAgICBpZiAodmFsdWUgIT09IG5ld1Byb3BzLnZhbHVlIHx8IHZhbHVlcyAhPT0gbmV3UHJvcHMudmFsdWVzKSB7XHJcbiAgICAgICAgICAgIG5ld1N0YXRlLmVycm9yID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5ld1Byb3BzLmVycm9yKSB7XHJcbiAgICAgICAgICAgIG5ld1N0YXRlLmVycm9yID0gbmV3UHJvcHMuZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGNzcyBjbGFzcyBvZiB0aGUgZmllbGQgY29tcG9uZW50LlxyXG4gICAgKi9cclxuICAgIF9jbGFzc05hbWUoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGVDbGFzcyA9IHRoaXMuc3RhdGUuZXJyb3IgPyAnaXMtaW52YWxpZCcgOiAnJztcclxuICAgICAgICByZXR1cm4gYG1kbC1ncmlkICR7c3RhdGVDbGFzc31gO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtGaWVsZENvbXBvbmVudCwgSW5wdXRMYWJlbENvbXBvbmVudCwgZG9tYWluLCBjb2RlUmVzb2x2ZXIsIHNlYXJjaGVyLCBrZXlSZXNvbHZlciwgcXVlcnlTZWFyY2hlciwgaXNSZXF1aXJlZCwgdmFsdWVzLCBoYXNMYWJlbCwgaXNFZGl0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgaXNDdXN0b21Db21wb25lbnQgPSBGaWVsZENvbXBvbmVudCB8fCBJbnB1dExhYmVsQ29tcG9uZW50O1xyXG4gICAgICAgIGNvbnN0IHthdXRvY29tcGxldGUsIGF1dG9jb21wbGV0ZVNlbGVjdCwgYXV0b2NvbXBsZXRlVGV4dCwgbGFiZWwsIGlucHV0LCBzZWxlY3QsIGRpc3BsYXl9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWdyaWQnIGRhdGEtZG9tYWluPXtkb21haW59IGRhdGEtZm9jdXM9J2ZpZWxkJyBkYXRhLW1vZGU9e2lzRWRpdCA/ICdlZGl0JyA6ICdjb25zdWx0J30gZGF0YS1yZXF1aXJlZD17aXNSZXF1aXJlZH0gZGF0YS12YWxpZD17IWVycm9yfT5cclxuICAgICAgICAgICAgICAgIHtpc0N1c3RvbUNvbXBvbmVudCAmJiB0aGlzLl9yZW5kZXJGaWVsZENvbXBvbmVudCgpfVxyXG4gICAgICAgICAgICAgICAgeyFpc0N1c3RvbUNvbXBvbmVudCAmJiBoYXNMYWJlbCAmJiBsYWJlbCgpfVxyXG4gICAgICAgICAgICAgICAgeyFpc0N1c3RvbUNvbXBvbmVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHt0aGlzLl9nZXRDb250ZW50R3JpZENsYXNzTmFtZSgpfWB9IGRhdGEtZm9jdXM9J2ZpZWxkLXZhbHVlLWNvbnRhaW5lcic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb2RlUmVzb2x2ZXIgJiYgc2VhcmNoZXIgPyBhdXRvY29tcGxldGUoKSA6IGtleVJlc29sdmVyICYmIHF1ZXJ5U2VhcmNoZXIgPyBhdXRvY29tcGxldGVTZWxlY3QoKSA6IHF1ZXJ5U2VhcmNoZXIgPyBhdXRvY29tcGxldGVUZXh0KCkgOiBpc0VkaXQgPyAodmFsdWVzID8gc2VsZWN0KCkgOiBpbnB1dCgpKSA6IGRpc3BsYXkoKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuY29uc3QgYnVpbHRDb21wID0gYnVpbGRlcihGaWVsZE1peGluKTtcclxuY29uc3Qge2NvbXBvbmVudCwgbWl4aW59ID0gYnVpbHRDb21wO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGNvbXBvbmVudCxcclxuICAgIG1peGluXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYnVpbHRDb21wOyJdfQ==