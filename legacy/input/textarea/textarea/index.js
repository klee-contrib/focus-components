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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUNBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU0sV0FBVyxRQUFRLFdBQVIsQ0FBakI7QUFDQSxJQUFNLGdCQUFnQixRQUFRLGtCQUFSLENBQXRCO0FBQ0EsSUFBTSxlQUFlLFFBQVEsMkJBQVIsQ0FBckI7Ozs7OztBQU1BLElBQU0sZ0JBQWdCO0FBQ2xCLFlBQVEsQ0FBQyxhQUFELEVBQWdCLFlBQWhCLENBRFU7Ozs7O0FBTWxCLG1CQU5rQiw2QkFNQTtBQUNkLGVBQU87QUFDSCx1QkFBVyxDQURSO0FBRUgsa0JBQU0sTUFGSDtBQUdILHNCQUFVLEtBSFA7QUFJSCxrQkFBTSxDQUpIO0FBS0gsa0JBQU07QUFMSCxTQUFQO0FBT0gsS0FkaUI7Ozs7OztBQW1CbEIsZUFBVztBQUNQLG1CQUFXLHFCQUFNLFFBQU4sQ0FESjtBQUVQLG1CQUFXLHFCQUFNLFFBQU4sQ0FGSjtBQUdQLGNBQU0scUJBQU0sUUFBTixDQUhDO0FBSVAsa0JBQVUscUJBQU0sTUFBTixDQUpIO0FBS1AsZUFBTyxxQkFBTSxRQUFOLENBTEE7QUFNUCxlQUFPLHFCQUFNLFFBQU4sQ0FOQTtBQU9QLGNBQU0scUJBQU0sUUFBTixDQVBDO0FBUVAsY0FBTSxxQkFBTSxRQUFOO0FBUkMsS0FuQk87O0FBOEJsQixtQkE5QmtCLDZCQThCQTtBQUNkLGVBQU87QUFDSCxtQkFBTyxLQUFLLEtBQUwsQ0FBVztBQURmLFNBQVA7QUFHSCxLQWxDaUI7Ozs7OztBQXVDbEIsZUFBVyxTQUFTLFFBQVQsQ0FBa0IsS0FBbEIsRUFBeUI7QUFDaEMsYUFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLE1BQU0sTUFBTixDQUFhLEtBQXJCLEVBQWQ7QUFDQSxZQUFJLEtBQUssS0FBTCxDQUFXLFFBQWYsRUFBeUI7QUFDckIsaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBcEI7QUFDSDtBQUNKLEtBNUNpQjs7OztBQWdEbEIsY0FBVSxTQUFTLGdCQUFULEdBQTRCO0FBQ2xDLGVBQU8sU0FBUyxXQUFULENBQXFCLElBQXJCLEVBQTJCLEtBQWxDO0FBQ0gsS0FsRGlCOzs7OztBQXVEbEIsWUFBUSxTQUFTLGNBQVQsR0FBMEI7QUFBQSxxQkFDb0IsS0FBSyxLQUR6QjtBQUFBLFlBQ3ZCLElBRHVCLFVBQ3ZCLElBRHVCO0FBQUEsWUFDakIsS0FEaUIsVUFDakIsS0FEaUI7QUFBQSxZQUNWLFNBRFUsVUFDVixTQURVO0FBQUEsWUFDQyxTQURELFVBQ0MsU0FERDtBQUFBLFlBQ1ksSUFEWixVQUNZLElBRFo7QUFBQSxZQUV2QixLQUZ1QixHQUVkLEtBQUssS0FGUyxDQUV2QixLQUZ1Qjs7QUFHOUIsZUFDSTtBQUFBO1lBQUEsRUFBSyxXQUFVLGdDQUFmLEVBQWdELGNBQVcsZ0JBQTNEO1lBQ0k7QUFBQTtnQkFBQSxFQUFVLFdBQVUsc0JBQXBCLEVBQTJDLE1BQU0sSUFBakQsRUFBdUQsV0FBVyxTQUFsRSxFQUE2RSxXQUFXLFNBQXhGLEVBQW1HLFVBQVUsS0FBSyxTQUFsSCxFQUE2SCxLQUFJLFVBQWpJLEVBQTRJLE1BQU0sSUFBbEosRUFBd0osTUFBSyxNQUE3SjtnQkFBcUs7QUFBckssYUFESjtZQUVJO0FBQUE7Z0JBQUEsRUFBTyxXQUFVLHNCQUFqQjtnQkFBeUMsUUFBUSxFQUFSLEdBQWEsS0FBSyxJQUFMLENBQVUsS0FBVjtBQUF0RDtBQUZKLFNBREo7QUFNSDtBQWhFaUIsQ0FBdEI7O0FBbUVBLE9BQU8sT0FBUCxHQUFpQix1QkFBUSxhQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XHJcbmNvbnN0IGkxOG5CZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi9pMThuL21peGluJyk7XHJcbmNvbnN0IG1kbEJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL21peGluL21kbC1iZWhhdmlvdXInKTtcclxuXHJcbi8qKlxyXG4qXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxuY29uc3QgdGV4dEFyZWFNaXhpbiA9IHtcclxuICAgIG1peGluczogW2kxOG5CZWhhdmlvdXIsIG1kbEJlaGF2aW91cl0sXHJcbiAgICAvKipcclxuICAgICogR2V0cyB0aGUgZGVmYXVsdCBwcm9wcy5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSBkZWZhdWx0IHByb3BzXHJcbiAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbmxlbmd0aDogMCxcclxuICAgICAgICAgICAgd3JhcDogJ3NvZnQnLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJvd3M6IDUsXHJcbiAgICAgICAgICAgIGNvbHM6IDUwXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUHJvcGVydGllcyB2YWxpZGF0aW9uLlxyXG4gICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG1pbmxlbmd0aDogdHlwZXMoJ251bWJlcicpLFxyXG4gICAgICAgIG1heGxlbmd0aDogdHlwZXMoJ251bWJlcicpLFxyXG4gICAgICAgIHdyYXA6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICByZXF1aXJlZDogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICB2YWx1ZTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIGxhYmVsOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgcm93czogdHlwZXMoJ251bWJlcicpLFxyXG4gICAgICAgIGNvbHM6IHR5cGVzKCdudW1iZXInKVxyXG4gICAgfSxcclxuICAgIC8qKiBpbmhlcml0ZWREb2MgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIE9uIGNoYW5nZSBoYW5kbGVyLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBTYW5pdGl6ZSBldmVudC5cclxuICAgICovXHJcbiAgICBfb25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbiB0aGUgRE9NLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiBnZXRUZXh0QXJlYVZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS52YWx1ZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBDaGVja2JveCBIVE1MLlxyXG4gICAgKiBAcmV0dXJuIHtWaXJ0dWFsRE9NfSAtIFRoZSB2aXJ0dWFsIERPTSBvZiB0aGUgY2hlY2tib3guXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXJUZXh0QXJlYSgpIHtcclxuICAgICAgICBjb25zdCB7Y29scywgbGFiZWwsIG1heGxlbmd0aCwgbWlubGVuZ3RoLCByb3dzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGRcIiBkYXRhLWZvY3VzPVwiaW5wdXQtdGV4dGFyZWFcIj5cclxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJtZGwtdGV4dGZpZWxkX19pbnB1dFwiIGNvbHM9e2NvbHN9IG1heExlbmd0aD17bWF4bGVuZ3RofSBtaW5MZW5ndGg9e21pbmxlbmd0aH0gb25DaGFuZ2U9e3RoaXMuX29uQ2hhbmdlfSByZWY9J3RleHRhcmVhJyByb3dzPXtyb3dzfSB0eXBlPVwidGV4dFwiPnt2YWx1ZX08L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cIm1kbC10ZXh0ZmllbGRfX2xhYmVsXCI+e3ZhbHVlID8gJycgOiB0aGlzLmkxOG4obGFiZWwpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIodGV4dEFyZWFNaXhpbik7XHJcbiJdfQ==