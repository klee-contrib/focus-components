'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies.
var React = require('react');
var ReactDOM = require('react-dom');

var assign = require('object-assign');
var mdlBehaviour = require('../../mixin/mdl-behaviour');
var i18nBehaviour = require('../../i18n/mixin');

/**
* Identity function.
* @param  {object} d - The data.
*/
var identity = function identity(d) {
    return d;
};

/**
* Input text mixin.
* @type {Object}
*/
var inputTextComponent = {
    mixins: [mdlBehaviour, i18nBehaviour],

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text',
            /**
            * Default formatter.
            * @param  {object} d - Data to format.
            * @return {object}   - The formatted data.
            */
            formatter: identity,
            /**
            * Default unformatter.
            * @param  {object} d - Data to unformat.
            * @return {object}   - The unformatted data.
            */
            unformatter: identity
        };
    },

    /** @inheritdoc */
    propTypes: {
        onChange: (0, _types2.default)('func'),
        onKeyPress: (0, _types2.default)('func'),
        error: (0, _types2.default)('string'),
        type: (0, _types2.default)('string'),
        value: (0, _types2.default)(['string', 'number']),
        name: (0, _types2.default)('string'),
        placeholder: (0, _types2.default)('string')
    },
    /** @inheritdoc */
    getInitialState: function getInitialState() {
        var _props = this.props;
        var formatter = _props.formatter;
        var value = _props.value;

        return {
            value: formatter(value)
        };
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents 0.7.0: this component is deprecated, please use FocusComponents.components.input.Text');
    },

    /**
    * Update the component.
    * @param {object} newProps - The new props to update.
    */
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ value: this.props.formatter(newProps.value) });
    },

    /**
    * Get the value from the input in the DOM.
    * @return {object} - The value of the formatter.
    */
    getValue: function getValue() {
        return this.props.unformatter(ReactDOM.findDOMNode(this.refs.inputText).value);
    },

    /**
    * Handle the change value of the input.
    * @param {object} event - The sanitize event of input.
    */
    _handleInputChange: function _handleInputChange(event) {
        //On change handler.
        var onChange = this.props.onChange;

        if (onChange) {
            return onChange(event);
        } else {
            //Set the state then call the change handler.
            this.setState({ value: event.target.value });
        }
    },

    /**
     * Input key press handler.
     * @param  {Object} event   event raised by the key press
     */
    _handleInputKeyPress: function _handleInputKeyPress(event) {
        var onKeyPress = this.props.onKeyPress;

        if (onKeyPress) {
            onKeyPress(event);
        }
    },

    /**
    * Render an input.
    * @return {DOM} - The dom of an input.
    */
    render: function render() {
        var value = this.state.value;
        var _props2 = this.props;
        var error = _props2.error;
        var name = _props2.name;
        var placeholder = _props2.placeholder;
        var style = _props2.style;

        var inputProps = assign({}, this.props, { value: value }, { id: name, onChange: this._handleInputChange, onKeyPress: this._handleInputKeyPress });
        var pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        var cssClass = 'mdl-textfield mdl-js-textfield ' + (error ? 'is-invalid' : '');
        return React.createElement(
            'div',
            { className: cssClass, 'data-focus': 'input-text', style: style },
            React.createElement('input', _extends({ className: 'mdl-textfield__input', ref: 'inputText' }, inputProps, { pattern: pattern })),
            React.createElement(
                'label',
                { className: 'mdl-textfield__label', htmlFor: name },
                value ? '' : this.i18n(placeholder)
            ),
            error && React.createElement(
                'span',
                { className: 'mdl-textfield__error' },
                error
            )
        );
    }
};

module.exports = (0, _builder2.default)(inputTextComponent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0E7Ozs7QUFDQTs7Ozs7OztBQUhBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBUjtBQUNOLElBQU0sV0FBVyxRQUFRLFdBQVIsQ0FBWDs7QUFHTixJQUFNLFNBQVMsUUFBUSxlQUFSLENBQVQ7QUFDTixJQUFNLGVBQWUsUUFBUSwyQkFBUixDQUFmO0FBQ04sSUFBTSxnQkFBZ0IsUUFBUSxrQkFBUixDQUFoQjs7Ozs7O0FBTU4sSUFBTSxXQUFXLFNBQVgsUUFBVztXQUFLO0NBQUw7Ozs7OztBQU1qQixJQUFNLHFCQUFxQjtBQUN2QixZQUFRLENBQUMsWUFBRCxFQUFlLGFBQWYsQ0FBUjs7O0FBR0EsZ0RBQWtCO0FBQ2QsZUFBTztBQUNILGtCQUFNLE1BQU47Ozs7OztBQU1BLHVCQUFXLFFBQVg7Ozs7OztBQU1BLHlCQUFhLFFBQWI7U0FiSixDQURjO0tBSks7OztBQXNCdkIsZUFBVztBQUNQLGtCQUFVLHFCQUFNLE1BQU4sQ0FBVjtBQUNBLG9CQUFZLHFCQUFNLE1BQU4sQ0FBWjtBQUNBLGVBQU8scUJBQU0sUUFBTixDQUFQO0FBQ0EsY0FBTSxxQkFBTSxRQUFOLENBQU47QUFDQSxlQUFPLHFCQUFNLENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FBTixDQUFQO0FBQ0EsY0FBTSxxQkFBTSxRQUFOLENBQU47QUFDQSxxQkFBYSxxQkFBTSxRQUFOLENBQWI7S0FQSjs7QUFVQSxnREFBa0I7cUJBQ2EsS0FBSyxLQUFMLENBRGI7WUFDUCw2QkFETztZQUNJLHFCQURKOztBQUVkLGVBQU87QUFDSCxtQkFBTyxVQUFVLEtBQVYsQ0FBUDtTQURKLENBRmM7S0FoQ0s7QUFzQ3ZCLHNEQUFxQjtBQUNqQixnQkFBUSxJQUFSLENBQWEsdUdBQWIsRUFEaUI7S0F0Q0U7Ozs7OztBQTZDdkIsa0VBQTBCLFVBQVU7QUFDaEMsYUFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsU0FBUyxLQUFULENBQTVCLEVBQWYsRUFEZ0M7S0E3Q2I7Ozs7OztBQW9EdkIsa0NBQVc7QUFDUCxlQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBUyxXQUFULENBQXFCLEtBQUssSUFBTCxDQUFVLFNBQVYsQ0FBckIsQ0FBMEMsS0FBMUMsQ0FBOUIsQ0FETztLQXBEWTs7Ozs7O0FBMkR2QixvREFBbUIsT0FBTzs7WUFFZixXQUFZLEtBQUssS0FBTCxDQUFaLFNBRmU7O0FBR3RCLFlBQUcsUUFBSCxFQUFhO0FBQ1QsbUJBQU8sU0FBUyxLQUFULENBQVAsQ0FEUztTQUFiLE1BRU87O0FBRUgsaUJBQUssUUFBTCxDQUFjLEVBQUMsT0FBTyxNQUFNLE1BQU4sQ0FBYSxLQUFiLEVBQXRCLEVBRkc7U0FGUDtLQTlEbUI7Ozs7OztBQXlFdkIsd0RBQXFCLE9BQU87WUFDakIsYUFBYyxLQUFLLEtBQUwsQ0FBZCxXQURpQjs7QUFFeEIsWUFBRyxVQUFILEVBQWU7QUFDWCx1QkFBVyxLQUFYLEVBRFc7U0FBZjtLQTNFbUI7Ozs7OztBQW1GdkIsOEJBQVM7WUFDRSxRQUFTLEtBQUssS0FBTCxDQUFULE1BREY7c0JBRXFDLEtBQUssS0FBTCxDQUZyQztZQUVFLHNCQUZGO1lBRVMsb0JBRlQ7WUFFZSxrQ0FGZjtZQUU0QixzQkFGNUI7O0FBR0wsWUFBTSxhQUFhLE9BQU8sRUFBUCxFQUFXLEtBQUssS0FBTCxFQUFZLEVBQUMsWUFBRCxFQUF2QixFQUFnQyxFQUFDLElBQUksSUFBSixFQUFVLFVBQVUsS0FBSyxrQkFBTCxFQUF5QixZQUFZLEtBQUssb0JBQUwsRUFBMUYsQ0FBYixDQUhEO0FBSUwsWUFBTSxVQUFVLFFBQVEsVUFBUixHQUFxQixJQUFyQjtBQUpYLFlBS0MsZ0RBQTZDLFFBQVEsWUFBUixHQUF1QixFQUF2QixDQUE3QyxDQUxEO0FBTUwsZUFDSTs7Y0FBSyxXQUFXLFFBQVgsRUFBcUIsY0FBVyxZQUFYLEVBQXdCLE9BQU8sS0FBUCxFQUFsRDtZQUNJLHdDQUFPLFdBQVUsc0JBQVYsRUFBaUMsS0FBSSxXQUFKLElBQW9CLGNBQVksU0FBUyxPQUFULEdBQXhFLENBREo7WUFFSTs7a0JBQU8sV0FBVSxzQkFBVixFQUFpQyxTQUFTLElBQVQsRUFBeEM7Z0JBQXdELFFBQVEsRUFBUixHQUFhLEtBQUssSUFBTCxDQUFVLFdBQVYsQ0FBYjthQUY1RDtZQUdLLFNBQ0c7O2tCQUFNLFdBQVUsc0JBQVYsRUFBTjtnQkFBd0MsS0FBeEM7YUFESDtTQUpULENBTks7S0FuRmM7Q0FBckI7O0FBc0dOLE9BQU8sT0FBUCxHQUFpQix1QkFBUSxrQkFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXMuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxuY29uc3QgbWRsQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vbWRsLWJlaGF2aW91cicpO1xyXG5jb25zdCBpMThuQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vaTE4bi9taXhpbicpO1xyXG5cclxuLyoqXHJcbiogSWRlbnRpdHkgZnVuY3Rpb24uXHJcbiogQHBhcmFtICB7b2JqZWN0fSBkIC0gVGhlIGRhdGEuXHJcbiovXHJcbmNvbnN0IGlkZW50aXR5ID0gZCA9PiBkO1xyXG5cclxuLyoqXHJcbiogSW5wdXQgdGV4dCBtaXhpbi5cclxuKiBAdHlwZSB7T2JqZWN0fVxyXG4qL1xyXG5jb25zdCBpbnB1dFRleHRDb21wb25lbnQgPSB7XHJcbiAgICBtaXhpbnM6IFttZGxCZWhhdmlvdXIsIGkxOG5CZWhhdmlvdXJdLFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogRGVmYXVsdCBmb3JtYXR0ZXIuXHJcbiAgICAgICAgICAgICogQHBhcmFtICB7b2JqZWN0fSBkIC0gRGF0YSB0byBmb3JtYXQuXHJcbiAgICAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSAgIC0gVGhlIGZvcm1hdHRlZCBkYXRhLlxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBEZWZhdWx0IHVuZm9ybWF0dGVyLlxyXG4gICAgICAgICAgICAqIEBwYXJhbSAge29iamVjdH0gZCAtIERhdGEgdG8gdW5mb3JtYXQuXHJcbiAgICAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSAgIC0gVGhlIHVuZm9ybWF0dGVkIGRhdGEuXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHVuZm9ybWF0dGVyOiBpZGVudGl0eVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBvbkNoYW5nZTogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBvbktleVByZXNzOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGVycm9yOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgdHlwZTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHZhbHVlOiB0eXBlcyhbJ3N0cmluZycsICdudW1iZXInXSksXHJcbiAgICAgICAgbmFtZTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0eXBlcygnc3RyaW5nJylcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB7Zm9ybWF0dGVyLCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBmb3JtYXR0ZXIodmFsdWUpXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdGb2N1c0NvbXBvbmVudHMgMC43LjA6IHRoaXMgY29tcG9uZW50IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgRm9jdXNDb21wb25lbnRzLmNvbXBvbmVudHMuaW5wdXQuVGV4dCcpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBVcGRhdGUgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHBhcmFtIHtvYmplY3R9IG5ld1Byb3BzIC0gVGhlIG5ldyBwcm9wcyB0byB1cGRhdGUuXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB0aGlzLnByb3BzLmZvcm1hdHRlcihuZXdQcm9wcy52YWx1ZSl9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbiB0aGUgRE9NLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHZhbHVlIG9mIHRoZSBmb3JtYXR0ZXIuXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudW5mb3JtYXR0ZXIoUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmlucHV0VGV4dCkudmFsdWUpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgdGhlIGNoYW5nZSB2YWx1ZSBvZiB0aGUgaW5wdXQuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBzYW5pdGl6ZSBldmVudCBvZiBpbnB1dC5cclxuICAgICovXHJcbiAgICBfaGFuZGxlSW5wdXRDaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAvL09uIGNoYW5nZSBoYW5kbGVyLlxyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKG9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkNoYW5nZShldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9TZXQgdGhlIHN0YXRlIHRoZW4gY2FsbCB0aGUgY2hhbmdlIGhhbmRsZXIuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBldmVudC50YXJnZXQudmFsdWV9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnB1dCBrZXkgcHJlc3MgaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXZlbnQgICBldmVudCByYWlzZWQgYnkgdGhlIGtleSBwcmVzc1xyXG4gICAgICovXHJcbiAgICBfaGFuZGxlSW5wdXRLZXlQcmVzcyhldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHtvbktleVByZXNzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYob25LZXlQcmVzcykge1xyXG4gICAgICAgICAgICBvbktleVByZXNzKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBhbiBpbnB1dC5cclxuICAgICogQHJldHVybiB7RE9NfSAtIFRoZSBkb20gb2YgYW4gaW5wdXQuXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtlcnJvciwgbmFtZSwgcGxhY2Vob2xkZXIsIHN0eWxlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IGFzc2lnbih7fSwgdGhpcy5wcm9wcywge3ZhbHVlfSwge2lkOiBuYW1lLCBvbkNoYW5nZTogdGhpcy5faGFuZGxlSW5wdXRDaGFuZ2UsIG9uS2V5UHJlc3M6IHRoaXMuX2hhbmRsZUlucHV0S2V5UHJlc3N9KTtcclxuICAgICAgICBjb25zdCBwYXR0ZXJuID0gZXJyb3IgPyAnaGFzRXJyb3InIDogbnVsbDsgLy9hZGQgcGF0dGVybiB0byBvdmVyaWRlIG1kbCBlcnJvciBzdHlsZSB3aGVuIGRpc3BsYXlpbmcgYW4gZm9jdXMgZXJyb3IuXHJcbiAgICAgICAgY29uc3QgY3NzQ2xhc3MgPSBgbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkICR7ZXJyb3IgPyAnaXMtaW52YWxpZCcgOiAnJ31gO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3NDbGFzc30gZGF0YS1mb2N1cz0naW5wdXQtdGV4dCcgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2lucHV0JyByZWY9J2lucHV0VGV4dCcgey4uLmlucHV0UHJvcHN9IHBhdHRlcm49e3BhdHRlcm59IC8+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCcgaHRtbEZvcj17bmFtZX0+e3ZhbHVlID8gJycgOiB0aGlzLmkxOG4ocGxhY2Vob2xkZXIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICB7ZXJyb3IgJiZcclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtZGwtdGV4dGZpZWxkX19lcnJvclwiPntlcnJvcn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGlucHV0VGV4dENvbXBvbmVudCk7XHJcbiJdfQ==