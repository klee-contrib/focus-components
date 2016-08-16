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

var mdlBehaviour = require('../../../../common/mixin/mdl-behaviour');
var i18nBehaviour = require('../../../../common/i18n/mixin');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBSkE7QUFDQSxJQUFNLFFBQVEsUUFBUSxPQUFSLENBQWQ7QUFDQSxJQUFNLFdBQVcsUUFBUSxXQUFSLENBQWpCOztBQUdBLElBQU0sU0FBUyxRQUFRLGVBQVIsQ0FBZjs7QUFFQSxJQUFNLGVBQWUsUUFBUSx3Q0FBUixDQUFyQjtBQUNBLElBQU0sZ0JBQWdCLFFBQVEsK0JBQVIsQ0FBdEI7O0FBRUE7Ozs7QUFJQSxJQUFNLFdBQVcsU0FBWCxRQUFXO0FBQUEsV0FBSyxDQUFMO0FBQUEsQ0FBakI7O0FBRUE7Ozs7QUFJQSxJQUFNLHFCQUFxQjtBQUN2QixZQUFRLENBQUMsWUFBRCxFQUFlLGFBQWYsQ0FEZTs7QUFHdkI7QUFDQSxtQkFKdUIsNkJBSUw7QUFDZCxlQUFPO0FBQ0gsa0JBQU0sTUFESDtBQUVIOzs7OztBQUtBLHVCQUFXLFFBUFI7QUFRSDs7Ozs7QUFLQSx5QkFBYTtBQWJWLFNBQVA7QUFlSCxLQXBCc0I7O0FBcUJ2QjtBQUNBLGVBQVc7QUFDUCxrQkFBVSxxQkFBTSxNQUFOLENBREg7QUFFUCxvQkFBWSxxQkFBTSxNQUFOLENBRkw7QUFHUCxlQUFPLHFCQUFNLFFBQU4sQ0FIQTtBQUlQLGNBQU0scUJBQU0sUUFBTixDQUpDO0FBS1AsZUFBTyxxQkFBTSxDQUFDLFFBQUQsRUFBVyxRQUFYLENBQU4sQ0FMQTtBQU1QLGNBQU0scUJBQU0sUUFBTixDQU5DO0FBT1AscUJBQWEscUJBQU0sUUFBTjtBQVBOLEtBdEJZO0FBK0J2QjtBQUNBLG1CQWhDdUIsNkJBZ0NMO0FBQUEscUJBQ2EsS0FBSyxLQURsQjtBQUFBLFlBQ1AsU0FETyxVQUNQLFNBRE87QUFBQSxZQUNJLEtBREosVUFDSSxLQURKOztBQUVkLGVBQU87QUFDSCxtQkFBTyxVQUFVLEtBQVY7QUFESixTQUFQO0FBR0gsS0FyQ3NCO0FBc0N2QixzQkF0Q3VCLGdDQXNDRjtBQUNqQixnQkFBUSxJQUFSLENBQWEsdUdBQWI7QUFDSCxLQXhDc0I7O0FBeUN2Qjs7OztBQUlBLDZCQTdDdUIscUNBNkNHLFFBN0NILEVBNkNhO0FBQ2hDLGFBQUssUUFBTCxDQUFjLEVBQUMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLFNBQVMsS0FBOUIsQ0FBUixFQUFkO0FBQ0gsS0EvQ3NCOztBQWdEdkI7Ozs7QUFJQSxZQXBEdUIsc0JBb0RaO0FBQ1AsZUFBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQVMsV0FBVCxDQUFxQixLQUFLLElBQUwsQ0FBVSxTQUEvQixFQUEwQyxLQUFqRSxDQUFQO0FBQ0gsS0F0RHNCOztBQXVEdkI7Ozs7QUFJQSxzQkEzRHVCLDhCQTJESixLQTNESSxFQTJERztBQUN0QjtBQURzQixZQUVmLFFBRmUsR0FFSCxLQUFLLEtBRkYsQ0FFZixRQUZlOztBQUd0QixZQUFHLFFBQUgsRUFBYTtBQUNULG1CQUFPLFNBQVMsS0FBVCxDQUFQO0FBQ0gsU0FGRCxNQUVPO0FBQ0g7QUFDQSxpQkFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLE1BQU0sTUFBTixDQUFhLEtBQXJCLEVBQWQ7QUFDSDtBQUNKLEtBcEVzQjs7QUFxRXZCOzs7O0FBSUEsd0JBekV1QixnQ0F5RUYsS0F6RUUsRUF5RUs7QUFBQSxZQUNqQixVQURpQixHQUNILEtBQUssS0FERixDQUNqQixVQURpQjs7QUFFeEIsWUFBRyxVQUFILEVBQWU7QUFDWCx1QkFBVyxLQUFYO0FBQ0g7QUFDSixLQTlFc0I7O0FBK0V2Qjs7OztBQUlBLFVBbkZ1QixvQkFtRmQ7QUFBQSxZQUNFLEtBREYsR0FDVyxLQUFLLEtBRGhCLENBQ0UsS0FERjtBQUFBLHNCQUVxQyxLQUFLLEtBRjFDO0FBQUEsWUFFRSxLQUZGLFdBRUUsS0FGRjtBQUFBLFlBRVMsSUFGVCxXQUVTLElBRlQ7QUFBQSxZQUVlLFdBRmYsV0FFZSxXQUZmO0FBQUEsWUFFNEIsS0FGNUIsV0FFNEIsS0FGNUI7O0FBR0wsWUFBTSxhQUFhLE9BQU8sRUFBUCxFQUFXLEtBQUssS0FBaEIsRUFBdUIsRUFBQyxZQUFELEVBQXZCLEVBQWdDLEVBQUMsSUFBSSxJQUFMLEVBQVcsVUFBVSxLQUFLLGtCQUExQixFQUE4QyxZQUFZLEtBQUssb0JBQS9ELEVBQWhDLENBQW5CO0FBQ0EsWUFBTSxVQUFVLFFBQVEsVUFBUixHQUFxQixJQUFyQyxDQUpLLENBSXNDO0FBQzNDLFlBQU0sZ0RBQTZDLFFBQVEsWUFBUixHQUF1QixFQUFwRSxDQUFOO0FBQ0EsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFXLFFBQWhCLEVBQTBCLGNBQVcsWUFBckMsRUFBa0QsT0FBTyxLQUF6RDtBQUNJLG9EQUFPLFdBQVUsc0JBQWpCLEVBQXdDLEtBQUksV0FBNUMsSUFBNEQsVUFBNUQsSUFBd0UsU0FBUyxPQUFqRixJQURKO0FBRUk7QUFBQTtBQUFBLGtCQUFPLFdBQVUsc0JBQWpCLEVBQXdDLFNBQVMsSUFBakQ7QUFBd0Qsd0JBQVEsRUFBUixHQUFhLEtBQUssSUFBTCxDQUFVLFdBQVY7QUFBckUsYUFGSjtBQUdLLHFCQUNHO0FBQUE7QUFBQSxrQkFBTSxXQUFVLHNCQUFoQjtBQUF3QztBQUF4QztBQUpSLFNBREo7QUFTSDtBQWxHc0IsQ0FBM0I7O0FBc0dBLE9BQU8sT0FBUCxHQUFpQix1QkFBUSxrQkFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXMuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxuXHJcbmNvbnN0IG1kbEJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2NvbW1vbi9taXhpbi9tZGwtYmVoYXZpb3VyJyk7XHJcbmNvbnN0IGkxOG5CZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9jb21tb24vaTE4bi9taXhpbicpO1xyXG5cclxuLyoqXHJcbiogSWRlbnRpdHkgZnVuY3Rpb24uXHJcbiogQHBhcmFtICB7b2JqZWN0fSBkIC0gVGhlIGRhdGEuXHJcbiovXHJcbmNvbnN0IGlkZW50aXR5ID0gZCA9PiBkO1xyXG5cclxuLyoqXHJcbiogSW5wdXQgdGV4dCBtaXhpbi5cclxuKiBAdHlwZSB7T2JqZWN0fVxyXG4qL1xyXG5jb25zdCBpbnB1dFRleHRDb21wb25lbnQgPSB7XHJcbiAgICBtaXhpbnM6IFttZGxCZWhhdmlvdXIsIGkxOG5CZWhhdmlvdXJdLFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogRGVmYXVsdCBmb3JtYXR0ZXIuXHJcbiAgICAgICAgICAgICogQHBhcmFtICB7b2JqZWN0fSBkIC0gRGF0YSB0byBmb3JtYXQuXHJcbiAgICAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSAgIC0gVGhlIGZvcm1hdHRlZCBkYXRhLlxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGlkZW50aXR5LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBEZWZhdWx0IHVuZm9ybWF0dGVyLlxyXG4gICAgICAgICAgICAqIEBwYXJhbSAge29iamVjdH0gZCAtIERhdGEgdG8gdW5mb3JtYXQuXHJcbiAgICAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSAgIC0gVGhlIHVuZm9ybWF0dGVkIGRhdGEuXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHVuZm9ybWF0dGVyOiBpZGVudGl0eVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBvbkNoYW5nZTogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBvbktleVByZXNzOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGVycm9yOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgdHlwZTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHZhbHVlOiB0eXBlcyhbJ3N0cmluZycsICdudW1iZXInXSksXHJcbiAgICAgICAgbmFtZTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0eXBlcygnc3RyaW5nJylcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB7Zm9ybWF0dGVyLCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBmb3JtYXR0ZXIodmFsdWUpXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdGb2N1c0NvbXBvbmVudHMgMC43LjA6IHRoaXMgY29tcG9uZW50IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgRm9jdXNDb21wb25lbnRzLmNvbXBvbmVudHMuaW5wdXQuVGV4dCcpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBVcGRhdGUgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHBhcmFtIHtvYmplY3R9IG5ld1Byb3BzIC0gVGhlIG5ldyBwcm9wcyB0byB1cGRhdGUuXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB0aGlzLnByb3BzLmZvcm1hdHRlcihuZXdQcm9wcy52YWx1ZSl9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBpbnB1dCBpbiB0aGUgRE9NLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIHZhbHVlIG9mIHRoZSBmb3JtYXR0ZXIuXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudW5mb3JtYXR0ZXIoUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmlucHV0VGV4dCkudmFsdWUpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgdGhlIGNoYW5nZSB2YWx1ZSBvZiB0aGUgaW5wdXQuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBzYW5pdGl6ZSBldmVudCBvZiBpbnB1dC5cclxuICAgICovXHJcbiAgICBfaGFuZGxlSW5wdXRDaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAvL09uIGNoYW5nZSBoYW5kbGVyLlxyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKG9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvbkNoYW5nZShldmVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9TZXQgdGhlIHN0YXRlIHRoZW4gY2FsbCB0aGUgY2hhbmdlIGhhbmRsZXIuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBldmVudC50YXJnZXQudmFsdWV9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnB1dCBrZXkgcHJlc3MgaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXZlbnQgICBldmVudCByYWlzZWQgYnkgdGhlIGtleSBwcmVzc1xyXG4gICAgICovXHJcbiAgICBfaGFuZGxlSW5wdXRLZXlQcmVzcyhldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHtvbktleVByZXNzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYob25LZXlQcmVzcykge1xyXG4gICAgICAgICAgICBvbktleVByZXNzKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBhbiBpbnB1dC5cclxuICAgICogQHJldHVybiB7RE9NfSAtIFRoZSBkb20gb2YgYW4gaW5wdXQuXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtlcnJvciwgbmFtZSwgcGxhY2Vob2xkZXIsIHN0eWxlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IGFzc2lnbih7fSwgdGhpcy5wcm9wcywge3ZhbHVlfSwge2lkOiBuYW1lLCBvbkNoYW5nZTogdGhpcy5faGFuZGxlSW5wdXRDaGFuZ2UsIG9uS2V5UHJlc3M6IHRoaXMuX2hhbmRsZUlucHV0S2V5UHJlc3N9KTtcclxuICAgICAgICBjb25zdCBwYXR0ZXJuID0gZXJyb3IgPyAnaGFzRXJyb3InIDogbnVsbDsgLy9hZGQgcGF0dGVybiB0byBvdmVyaWRlIG1kbCBlcnJvciBzdHlsZSB3aGVuIGRpc3BsYXlpbmcgYW4gZm9jdXMgZXJyb3IuXHJcbiAgICAgICAgY29uc3QgY3NzQ2xhc3MgPSBgbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkICR7ZXJyb3IgPyAnaXMtaW52YWxpZCcgOiAnJ31gO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3NDbGFzc30gZGF0YS1mb2N1cz0naW5wdXQtdGV4dCcgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2lucHV0JyByZWY9J2lucHV0VGV4dCcgey4uLmlucHV0UHJvcHN9IHBhdHRlcm49e3BhdHRlcm59IC8+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCcgaHRtbEZvcj17bmFtZX0+e3ZhbHVlID8gJycgOiB0aGlzLmkxOG4ocGxhY2Vob2xkZXIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICB7ZXJyb3IgJiZcclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtZGwtdGV4dGZpZWxkX19lcnJvclwiPntlcnJvcn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGlucHV0VGV4dENvbXBvbmVudCk7XHJcbiJdfQ==