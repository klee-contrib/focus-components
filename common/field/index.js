'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mixins
var valueBehaviour = require('./mixin/value-behaviour');
var validationBehaviour = require('./mixin/validation-behaviour');
// Components
var builtInComponents = require('./mixin/built-in-components');

/**
 * Mixin for the field helper.
 * @type {Object}
 */
var FieldMixin = {
    /** @inheriteDoc */
    mixins: [valueBehaviour, validationBehaviour, builtInComponents],
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
        this.setState({ value: newProps.value, error: newProps.error, values: newProps.values });
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
module.exports = (0, _builder2.default)(FieldMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ2YWx1ZUJlaGF2aW91ciIsInJlcXVpcmUiLCJ2YWxpZGF0aW9uQmVoYXZpb3VyIiwiYnVpbHRJbkNvbXBvbmVudHMiLCJGaWVsZE1peGluIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwiaXNFZGl0IiwidHlwZSIsInByb3BUeXBlcyIsIm5hbWUiLCJ2YWx1ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXdQcm9wcyIsInNldFN0YXRlIiwiZXJyb3IiLCJ2YWx1ZXMiLCJfY2xhc3NOYW1lIiwic3RhdGVDbGFzcyIsInN0YXRlIiwicmVuZGVyIiwicHJvcHMiLCJGaWVsZENvbXBvbmVudCIsIklucHV0TGFiZWxDb21wb25lbnQiLCJkb21haW4iLCJjb2RlUmVzb2x2ZXIiLCJzZWFyY2hlciIsImtleVJlc29sdmVyIiwicXVlcnlTZWFyY2hlciIsImlzUmVxdWlyZWQiLCJoYXNMYWJlbCIsImlzQ3VzdG9tQ29tcG9uZW50IiwiYXV0b2NvbXBsZXRlIiwiYXV0b2NvbXBsZXRlU2VsZWN0IiwiYXV0b2NvbXBsZXRlVGV4dCIsImxhYmVsIiwiaW5wdXQiLCJzZWxlY3QiLCJkaXNwbGF5IiwiX3JlbmRlckZpZWxkQ29tcG9uZW50IiwiX2dldENvbnRlbnRHcmlkQ2xhc3NOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBO0FBQ0EsSUFBTUEsaUJBQWlCQyxRQUFRLHlCQUFSLENBQXZCO0FBQ0EsSUFBTUMsc0JBQXNCRCxRQUFRLDhCQUFSLENBQTVCO0FBQ0E7QUFDQSxJQUFNRSxvQkFBb0JGLFFBQVEsNkJBQVIsQ0FBMUI7O0FBRUE7Ozs7QUFJQSxJQUFNRyxhQUFhO0FBQ2Y7QUFDQUMsWUFBUSxDQUFDTCxjQUFELEVBQWlCRSxtQkFBakIsRUFBc0NDLGlCQUF0QyxDQUZPO0FBR2Y7QUFDQUcsbUJB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IiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbi8vIE1peGluc1xyXG5jb25zdCB2YWx1ZUJlaGF2aW91ciA9IHJlcXVpcmUoJy4vbWl4aW4vdmFsdWUtYmVoYXZpb3VyJyk7XHJcbmNvbnN0IHZhbGlkYXRpb25CZWhhdmlvdXIgPSByZXF1aXJlKCcuL21peGluL3ZhbGlkYXRpb24tYmVoYXZpb3VyJyk7XHJcbi8vIENvbXBvbmVudHNcclxuY29uc3QgYnVpbHRJbkNvbXBvbmVudHMgPSByZXF1aXJlKCcuL21peGluL2J1aWx0LWluLWNvbXBvbmVudHMnKTtcclxuXHJcbi8qKlxyXG4gKiBNaXhpbiBmb3IgdGhlIGZpZWxkIGhlbHBlci5cclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbmNvbnN0IEZpZWxkTWl4aW4gPSB7XHJcbiAgICAvKiogQGluaGVyaXRlRG9jICovXHJcbiAgICBtaXhpbnM6IFt2YWx1ZUJlaGF2aW91ciwgdmFsaWRhdGlvbkJlaGF2aW91ciwgYnVpbHRJbkNvbXBvbmVudHNdLFxyXG4gICAgLyoqIEBpbmhlcml0ZURvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzRWRpdDogdHJ1ZSxcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogRWRpdGlvbiBtb2RlIG9mIHRoZSBmaWVsZC5cclxuICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICovXHJcbiAgICAgICAgaXNFZGl0OiB0eXBlKCdib29sJyksXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBIVE1MIGlucHV0IHR5cGUuXHJcbiAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdHlwZTogdHlwZSgnc3RyaW5nJyksXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBGaWVsZCBuYW1lLlxyXG4gICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIG5hbWU6IHR5cGUoJ3N0cmluZycpLFxyXG4gICAgICAgIHZhbHVlOiB0eXBlKFsnc3RyaW5nJywgJ251bWJlciddKVxyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXdQcm9wcy52YWx1ZSwgZXJyb3I6IG5ld1Byb3BzLmVycm9yLCB2YWx1ZXM6IG5ld1Byb3BzLnZhbHVlc30pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGNzcyBjbGFzcyBvZiB0aGUgZmllbGQgY29tcG9uZW50LlxyXG4gICAgKi9cclxuICAgIF9jbGFzc05hbWUoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGVDbGFzcyA9IHRoaXMuc3RhdGUuZXJyb3IgPyAnaXMtaW52YWxpZCcgOiAnJztcclxuICAgICAgICByZXR1cm4gYG1kbC1ncmlkICR7c3RhdGVDbGFzc31gO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtGaWVsZENvbXBvbmVudCwgSW5wdXRMYWJlbENvbXBvbmVudCwgZG9tYWluLCBjb2RlUmVzb2x2ZXIsIHNlYXJjaGVyLCBrZXlSZXNvbHZlciwgcXVlcnlTZWFyY2hlciwgaXNSZXF1aXJlZCwgdmFsdWVzLCBoYXNMYWJlbCwgaXNFZGl0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgaXNDdXN0b21Db21wb25lbnQgPSBGaWVsZENvbXBvbmVudCB8fCBJbnB1dExhYmVsQ29tcG9uZW50O1xyXG4gICAgICAgIGNvbnN0IHthdXRvY29tcGxldGUsIGF1dG9jb21wbGV0ZVNlbGVjdCwgYXV0b2NvbXBsZXRlVGV4dCwgbGFiZWwsIGlucHV0LCBzZWxlY3QsIGRpc3BsYXl9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWdyaWQnIGRhdGEtZG9tYWluPXtkb21haW59IGRhdGEtZm9jdXM9J2ZpZWxkJyBkYXRhLW1vZGU9e2lzRWRpdCA/ICdlZGl0JyA6ICdjb25zdWx0J30gZGF0YS1yZXF1aXJlZD17aXNSZXF1aXJlZH0gZGF0YS12YWxpZD17IWVycm9yfT5cclxuICAgICAgICAgICAgICAgIHtpc0N1c3RvbUNvbXBvbmVudCAmJiB0aGlzLl9yZW5kZXJGaWVsZENvbXBvbmVudCgpfVxyXG4gICAgICAgICAgICAgICAgeyFpc0N1c3RvbUNvbXBvbmVudCAmJiBoYXNMYWJlbCAmJiBsYWJlbCgpfVxyXG4gICAgICAgICAgICAgICAgeyFpc0N1c3RvbUNvbXBvbmVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lID17YCR7dGhpcy5fZ2V0Q29udGVudEdyaWRDbGFzc05hbWUoKX1gfSBkYXRhLWZvY3VzPSdmaWVsZC12YWx1ZS1jb250YWluZXInPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29kZVJlc29sdmVyICYmIHNlYXJjaGVyID8gYXV0b2NvbXBsZXRlKCkgOiBrZXlSZXNvbHZlciAmJiBxdWVyeVNlYXJjaGVyID8gYXV0b2NvbXBsZXRlU2VsZWN0KCkgOiBxdWVyeVNlYXJjaGVyID8gYXV0b2NvbXBsZXRlVGV4dCgpIDogaXNFZGl0ID8gKHZhbHVlcyA/IHNlbGVjdCgpIDogaW5wdXQoKSkgOiBkaXNwbGF5KCl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihGaWVsZE1peGluKTtcclxuIl19