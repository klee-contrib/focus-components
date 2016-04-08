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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUNBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBUjtBQUNOLElBQU0sV0FBVyxRQUFRLFdBQVIsQ0FBWDtBQUNOLElBQU0sZ0JBQWdCLFFBQVEsa0JBQVIsQ0FBaEI7QUFDTixJQUFNLGVBQWUsUUFBUSwyQkFBUixDQUFmOzs7Ozs7QUFNTixJQUFNLGdCQUFnQjtBQUNsQixZQUFRLENBQUMsYUFBRCxFQUFnQixZQUFoQixDQUFSOzs7OztBQUtBLGdEQUFrQjtBQUNkLGVBQU87QUFDSCx1QkFBVyxDQUFYO0FBQ0Esa0JBQU0sTUFBTjtBQUNBLHNCQUFVLEtBQVY7QUFDQSxrQkFBTSxDQUFOO0FBQ0Esa0JBQU0sRUFBTjtTQUxKLENBRGM7S0FOQTs7Ozs7O0FBbUJsQixlQUFXO0FBQ1AsbUJBQVcscUJBQU0sUUFBTixDQUFYO0FBQ0EsbUJBQVcscUJBQU0sUUFBTixDQUFYO0FBQ0EsY0FBTSxxQkFBTSxRQUFOLENBQU47QUFDQSxrQkFBVSxxQkFBTSxNQUFOLENBQVY7QUFDQSxlQUFPLHFCQUFNLFFBQU4sQ0FBUDtBQUNBLGVBQU8scUJBQU0sUUFBTixDQUFQO0FBQ0EsY0FBTSxxQkFBTSxRQUFOLENBQU47QUFDQSxjQUFNLHFCQUFNLFFBQU4sQ0FBTjtLQVJKOztBQVdBLGdEQUFrQjtBQUNkLGVBQU87QUFDSCxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYO1NBRFgsQ0FEYztLQTlCQTs7Ozs7O0FBdUNsQixlQUFXLFNBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUNoQyxhQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sTUFBTSxNQUFOLENBQWEsS0FBYixFQUF0QixFQURnQztBQUVoQyxZQUFJLEtBQUssS0FBTCxDQUFXLFFBQVgsRUFBcUI7QUFDckIsaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBcEIsRUFEcUI7U0FBekI7S0FGTzs7OztBQVNYLGNBQVUsU0FBUyxnQkFBVCxHQUE0QjtBQUNsQyxlQUFPLFNBQVMsV0FBVCxDQUFxQixJQUFyQixFQUEyQixLQUEzQixDQUQyQjtLQUE1Qjs7Ozs7QUFPVixZQUFRLFNBQVMsY0FBVCxHQUEwQjtxQkFDb0IsS0FBSyxLQUFMLENBRHBCO1lBQ3ZCLG1CQUR1QjtZQUNqQixxQkFEaUI7WUFDViw2QkFEVTtZQUNDLDZCQUREO1lBQ1ksbUJBRFo7WUFFdkIsUUFBUyxLQUFLLEtBQUwsQ0FBVCxNQUZ1Qjs7QUFHOUIsZUFDSTs7Y0FBSyxXQUFVLGdDQUFWLEVBQTJDLGNBQVcsZ0JBQVgsRUFBaEQ7WUFDSTs7a0JBQVUsV0FBVSxzQkFBVixFQUFpQyxNQUFNLElBQU4sRUFBWSxXQUFXLFNBQVgsRUFBc0IsV0FBVyxTQUFYLEVBQXNCLFVBQVUsS0FBSyxTQUFMLEVBQWdCLEtBQUksVUFBSixFQUFlLE1BQU0sSUFBTixFQUFZLE1BQUssTUFBTCxFQUF4SjtnQkFBcUssS0FBcks7YUFESjtZQUVJOztrQkFBTyxXQUFVLHNCQUFWLEVBQVA7Z0JBQXlDLFFBQVEsRUFBUixHQUFhLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBYjthQUY3QztTQURKLENBSDhCO0tBQTFCO0NBdkROOztBQW1FTixPQUFPLE9BQVAsR0FBaUIsdUJBQVEsYUFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xyXG5jb25zdCBpMThuQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vaTE4bi9taXhpbicpO1xyXG5jb25zdCBtZGxCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9tZGwtYmVoYXZpb3VyJyk7XHJcblxyXG4vKipcclxuKlxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmNvbnN0IHRleHRBcmVhTWl4aW4gPSB7XHJcbiAgICBtaXhpbnM6IFtpMThuQmVoYXZpb3VyLCBtZGxCZWhhdmlvdXJdLFxyXG4gICAgLyoqXHJcbiAgICAqIEdldHMgdGhlIGRlZmF1bHQgcHJvcHMuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gZGVmYXVsdCBwcm9wc1xyXG4gICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW5sZW5ndGg6IDAsXHJcbiAgICAgICAgICAgIHdyYXA6ICdzb2Z0JyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICByb3dzOiA1LFxyXG4gICAgICAgICAgICBjb2xzOiA1MFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFByb3BlcnRpZXMgdmFsaWRhdGlvbi5cclxuICAgICogQHR5cGUge09iamVjdH1cclxuICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBtaW5sZW5ndGg6IHR5cGVzKCdudW1iZXInKSxcclxuICAgICAgICBtYXhsZW5ndGg6IHR5cGVzKCdudW1iZXInKSxcclxuICAgICAgICB3cmFwOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgcmVxdWlyZWQ6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgdmFsdWU6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBsYWJlbDogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHJvd3M6IHR5cGVzKCdudW1iZXInKSxcclxuICAgICAgICBjb2xzOiB0eXBlcygnbnVtYmVyJylcclxuICAgIH0sXHJcbiAgICAvKiogaW5oZXJpdGVkRG9jICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBPbiBjaGFuZ2UgaGFuZGxlci5cclxuICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gU2FuaXRpemUgZXZlbnQuXHJcbiAgICAqL1xyXG4gICAgX29uQ2hhbmdlOiBmdW5jdGlvbiBvbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBldmVudC50YXJnZXQudmFsdWV9KTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgaW5wdXQgaW4gdGhlIERPTS5cclxuICAgICovXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gZ2V0VGV4dEFyZWFWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gUmVhY3RET00uZmluZERPTU5vZGUodGhpcykudmFsdWU7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgQ2hlY2tib3ggSFRNTC5cclxuICAgICogQHJldHVybiB7VmlydHVhbERPTX0gLSBUaGUgdmlydHVhbCBET00gb2YgdGhlIGNoZWNrYm94LlxyXG4gICAgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyVGV4dEFyZWEoKSB7XHJcbiAgICAgICAgY29uc3Qge2NvbHMsIGxhYmVsLCBtYXhsZW5ndGgsIG1pbmxlbmd0aCwgcm93c30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkXCIgZGF0YS1mb2N1cz1cImlucHV0LXRleHRhcmVhXCI+XHJcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3NOYW1lPVwibWRsLXRleHRmaWVsZF9faW5wdXRcIiBjb2xzPXtjb2xzfSBtYXhMZW5ndGg9e21heGxlbmd0aH0gbWluTGVuZ3RoPXttaW5sZW5ndGh9IG9uQ2hhbmdlPXt0aGlzLl9vbkNoYW5nZX0gcmVmPSd0ZXh0YXJlYScgcm93cz17cm93c30gdHlwZT1cInRleHRcIj57dmFsdWV9PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJtZGwtdGV4dGZpZWxkX19sYWJlbFwiPnt2YWx1ZSA/ICcnIDogdGhpcy5pMThuKGxhYmVsKX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKHRleHRBcmVhTWl4aW4pO1xyXG4iXX0=