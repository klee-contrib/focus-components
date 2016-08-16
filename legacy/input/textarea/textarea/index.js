'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactDOM = require('react-dom');
var i18nBehaviour = require('../../i18n/mixin');
var mdlBehaviour = require('../../mixin/mdl-behaviour');

/**
*
* @type {Object}
*/
var textAreaMixin = {
    mixins: [i18nBehaviour, mdlBehaviour],
    /**
    * Gets the default props.
    * @return {object} default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            minlength: 0,
            wrap: 'soft',
            required: false,
            rows: 5,
            cols: 50
        };
    },

    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        minlength: (0, _types2.default)('number'),
        maxlength: (0, _types2.default)('number'),
        wrap: (0, _types2.default)('string'),
        required: (0, _types2.default)('bool'),
        value: (0, _types2.default)('string'),
        label: (0, _types2.default)('string'),
        rows: (0, _types2.default)('number'),
        cols: (0, _types2.default)('number')
    },
    /** inheritedDoc */
    getInitialState: function getInitialState() {
        return {
            value: this.props.value
        };
    },

    /**
    * On change handler.
    * @param {object} event - Sanitize event.
    */
    _onChange: function onChange(event) {
        this.setState({ value: event.target.value });
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    /**
    * Get the value from the input in the DOM.
    */
    getValue: function getTextAreaValue() {
        return ReactDOM.findDOMNode(this).value;
    },
    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render: function renderTextArea() {
        var _props = this.props;
        var cols = _props.cols;
        var label = _props.label;
        var maxlength = _props.maxlength;
        var minlength = _props.minlength;
        var rows = _props.rows;
        var value = this.state.value;

        return React.createElement(
            'div',
            { className: 'mdl-textfield mdl-js-textfield', 'data-focus': 'input-textarea' },
            React.createElement(
                'textarea',
                { className: 'mdl-textfield__input', cols: cols, maxLength: maxlength, minLength: minlength, onChange: this._onChange, ref: 'textarea', rows: rows, type: 'text' },
                value
            ),
            React.createElement(
                'label',
                { className: 'mdl-textfield__label' },
                value ? '' : this.i18n(label)
            )
        );
    }
};

module.exports = (0, _builder2.default)(textAreaMixin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUNBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU0sV0FBVyxRQUFRLFdBQVIsQ0FBakI7QUFDQSxJQUFNLGdCQUFnQixRQUFRLGtCQUFSLENBQXRCO0FBQ0EsSUFBTSxlQUFlLFFBQVEsMkJBQVIsQ0FBckI7O0FBRUE7Ozs7QUFJQSxJQUFNLGdCQUFnQjtBQUNsQixZQUFRLENBQUMsYUFBRCxFQUFnQixZQUFoQixDQURVO0FBRWxCOzs7O0FBSUEsbUJBTmtCLDZCQU1BO0FBQ2QsZUFBTztBQUNILHVCQUFXLENBRFI7QUFFSCxrQkFBTSxNQUZIO0FBR0gsc0JBQVUsS0FIUDtBQUlILGtCQUFNLENBSkg7QUFLSCxrQkFBTTtBQUxILFNBQVA7QUFPSCxLQWRpQjs7QUFlbEI7Ozs7QUFJQSxlQUFXO0FBQ1AsbUJBQVcscUJBQU0sUUFBTixDQURKO0FBRVAsbUJBQVcscUJBQU0sUUFBTixDQUZKO0FBR1AsY0FBTSxxQkFBTSxRQUFOLENBSEM7QUFJUCxrQkFBVSxxQkFBTSxNQUFOLENBSkg7QUFLUCxlQUFPLHFCQUFNLFFBQU4sQ0FMQTtBQU1QLGVBQU8scUJBQU0sUUFBTixDQU5BO0FBT1AsY0FBTSxxQkFBTSxRQUFOLENBUEM7QUFRUCxjQUFNLHFCQUFNLFFBQU47QUFSQyxLQW5CTztBQTZCbEI7QUFDQSxtQkE5QmtCLDZCQThCQTtBQUNkLGVBQU87QUFDSCxtQkFBTyxLQUFLLEtBQUwsQ0FBVztBQURmLFNBQVA7QUFHSCxLQWxDaUI7O0FBbUNsQjs7OztBQUlBLGVBQVcsU0FBUyxRQUFULENBQWtCLEtBQWxCLEVBQXlCO0FBQ2hDLGFBQUssUUFBTCxDQUFjLEVBQUMsT0FBTyxNQUFNLE1BQU4sQ0FBYSxLQUFyQixFQUFkO0FBQ0EsWUFBSSxLQUFLLEtBQUwsQ0FBVyxRQUFmLEVBQXlCO0FBQ3JCLGlCQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCO0FBQ0g7QUFDSixLQTVDaUI7QUE2Q2xCOzs7QUFHQSxjQUFVLFNBQVMsZ0JBQVQsR0FBNEI7QUFDbEMsZUFBTyxTQUFTLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkIsS0FBbEM7QUFDSCxLQWxEaUI7QUFtRGxCOzs7O0FBSUEsWUFBUSxTQUFTLGNBQVQsR0FBMEI7QUFBQSxxQkFDb0IsS0FBSyxLQUR6QjtBQUFBLFlBQ3ZCLElBRHVCLFVBQ3ZCLElBRHVCO0FBQUEsWUFDakIsS0FEaUIsVUFDakIsS0FEaUI7QUFBQSxZQUNWLFNBRFUsVUFDVixTQURVO0FBQUEsWUFDQyxTQURELFVBQ0MsU0FERDtBQUFBLFlBQ1ksSUFEWixVQUNZLElBRFo7QUFBQSxZQUV2QixLQUZ1QixHQUVkLEtBQUssS0FGUyxDQUV2QixLQUZ1Qjs7QUFHOUIsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFVLGdDQUFmLEVBQWdELGNBQVcsZ0JBQTNEO0FBQ0k7QUFBQTtBQUFBLGtCQUFVLFdBQVUsc0JBQXBCLEVBQTJDLE1BQU0sSUFBakQsRUFBdUQsV0FBVyxTQUFsRSxFQUE2RSxXQUFXLFNBQXhGLEVBQW1HLFVBQVUsS0FBSyxTQUFsSCxFQUE2SCxLQUFJLFVBQWpJLEVBQTRJLE1BQU0sSUFBbEosRUFBd0osTUFBSyxNQUE3SjtBQUFxSztBQUFySyxhQURKO0FBRUk7QUFBQTtBQUFBLGtCQUFPLFdBQVUsc0JBQWpCO0FBQXlDLHdCQUFRLEVBQVIsR0FBYSxLQUFLLElBQUwsQ0FBVSxLQUFWO0FBQXREO0FBRkosU0FESjtBQU1IO0FBaEVpQixDQUF0Qjs7QUFtRUEsT0FBTyxPQUFQLEdBQWlCLHVCQUFRLGFBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxuY29uc3QgaTE4bkJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL2kxOG4vbWl4aW4nKTtcclxuY29uc3QgbWRsQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vbWRsLWJlaGF2aW91cicpO1xyXG5cclxuLyoqXHJcbipcclxuKiBAdHlwZSB7T2JqZWN0fVxyXG4qL1xyXG5jb25zdCB0ZXh0QXJlYU1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbaTE4bkJlaGF2aW91ciwgbWRsQmVoYXZpb3VyXSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXRzIHRoZSBkZWZhdWx0IHByb3BzLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IGRlZmF1bHQgcHJvcHNcclxuICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWlubGVuZ3RoOiAwLFxyXG4gICAgICAgICAgICB3cmFwOiAnc29mdCcsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcm93czogNSxcclxuICAgICAgICAgICAgY29sczogNTBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBQcm9wZXJ0aWVzIHZhbGlkYXRpb24uXHJcbiAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbWlubGVuZ3RoOiB0eXBlcygnbnVtYmVyJyksXHJcbiAgICAgICAgbWF4bGVuZ3RoOiB0eXBlcygnbnVtYmVyJyksXHJcbiAgICAgICAgd3JhcDogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIHZhbHVlOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgbGFiZWw6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICByb3dzOiB0eXBlcygnbnVtYmVyJyksXHJcbiAgICAgICAgY29sczogdHlwZXMoJ251bWJlcicpXHJcbiAgICB9LFxyXG4gICAgLyoqIGluaGVyaXRlZERvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogT24gY2hhbmdlIGhhbmRsZXIuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFNhbml0aXplIGV2ZW50LlxyXG4gICAgKi9cclxuICAgIF9vbkNoYW5nZTogZnVuY3Rpb24gb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGlucHV0IGluIHRoZSBET00uXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIGdldFRleHRBcmVhVmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLnZhbHVlO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIENoZWNrYm94IEhUTUwuXHJcbiAgICAqIEByZXR1cm4ge1ZpcnR1YWxET019IC0gVGhlIHZpcnR1YWwgRE9NIG9mIHRoZSBjaGVja2JveC5cclxuICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlclRleHRBcmVhKCkge1xyXG4gICAgICAgIGNvbnN0IHtjb2xzLCBsYWJlbCwgbWF4bGVuZ3RoLCBtaW5sZW5ndGgsIHJvd3N9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZFwiIGRhdGEtZm9jdXM9XCJpbnB1dC10ZXh0YXJlYVwiPlxyXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT1cIm1kbC10ZXh0ZmllbGRfX2lucHV0XCIgY29scz17Y29sc30gbWF4TGVuZ3RoPXttYXhsZW5ndGh9IG1pbkxlbmd0aD17bWlubGVuZ3RofSBvbkNoYW5nZT17dGhpcy5fb25DaGFuZ2V9IHJlZj0ndGV4dGFyZWEnIHJvd3M9e3Jvd3N9IHR5cGU9XCJ0ZXh0XCI+e3ZhbHVlfTwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibWRsLXRleHRmaWVsZF9fbGFiZWxcIj57dmFsdWUgPyAnJyA6IHRoaXMuaTE4bihsYWJlbCl9PC9sYWJlbD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcih0ZXh0QXJlYU1peGluKTtcclxuIl19