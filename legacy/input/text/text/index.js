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
        var _props = this.props,
            formatter = _props.formatter,
            value = _props.value;

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
        var _props2 = this.props,
            error = _props2.error,
            name = _props2.name,
            placeholder = _props2.placeholder,
            style = _props2.style;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJSZWFjdERPTSIsImFzc2lnbiIsIm1kbEJlaGF2aW91ciIsImkxOG5CZWhhdmlvdXIiLCJpZGVudGl0eSIsImQiLCJpbnB1dFRleHRDb21wb25lbnQiLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJ0eXBlIiwiZm9ybWF0dGVyIiwidW5mb3JtYXR0ZXIiLCJwcm9wVHlwZXMiLCJvbkNoYW5nZSIsIm9uS2V5UHJlc3MiLCJlcnJvciIsInZhbHVlIiwibmFtZSIsInBsYWNlaG9sZGVyIiwiZ2V0SW5pdGlhbFN0YXRlIiwicHJvcHMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb25zb2xlIiwid2FybiIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXdQcm9wcyIsInNldFN0YXRlIiwiZ2V0VmFsdWUiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJpbnB1dFRleHQiLCJfaGFuZGxlSW5wdXRDaGFuZ2UiLCJldmVudCIsInRhcmdldCIsIl9oYW5kbGVJbnB1dEtleVByZXNzIiwicmVuZGVyIiwic3RhdGUiLCJzdHlsZSIsImlucHV0UHJvcHMiLCJpZCIsInBhdHRlcm4iLCJjc3NDbGFzcyIsImkxOG4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBSkE7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU1DLFdBQVdELFFBQVEsV0FBUixDQUFqQjs7QUFHQSxJQUFNRSxTQUFTRixRQUFRLGVBQVIsQ0FBZjs7QUFFQSxJQUFNRyxlQUFlSCxRQUFRLHdDQUFSLENBQXJCO0FBQ0EsSUFBTUksZ0JBQWdCSixRQUFRLCtCQUFSLENBQXRCOztBQUVBOzs7O0FBSUEsSUFBTUssV0FBVyxTQUFYQSxRQUFXO0FBQUEsV0FBS0MsQ0FBTDtBQUFBLENBQWpCOztBQUVBOzs7O0FBSUEsSUFB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ZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFXMEIsUUFBaEIsRUFBMEIsY0FBVyxZQUFyQyxFQUFrRCxPQUFPSixLQUF6RDtBQUNJLG9EQUFPLFdBQVUsc0JBQWpCLEVBQXdDLEtBQUksV0FBNUMsSUFBNERDLFVBQTVELElBQXdFLFNBQVNFLE9BQWpGLElBREo7QUFFSTtBQUFBO0FBQUEsa0JBQU8sV0FBVSxzQkFBakIsRUFBd0MsU0FBU3ZCLElBQWpEO0FBQXdERCx3QkFBUSxFQUFSLEdBQWEsS0FBSzBCLElBQUwsQ0FBVXhCLFdBQVY7QUFBckUsYUFGSjtBQUdLSCxxQkFDRztBQUFBO0FBQUEsa0JBQU0sV0FBVSxzQkFBaEI7QUFBd0NBO0FBQXhDO0FBSlIsU0FESjtBQVNIO0FBbEdzQixDQUEzQjs7QUFzR0E0QixPQUFPQyxPQUFQLEdBQWlCLHVCQUFRdEMsa0JBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzLlxyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XHJcblxyXG5jb25zdCBtZGxCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9jb21tb24vbWl4aW4vbWRsLWJlaGF2aW91cicpO1xyXG5jb25zdCBpMThuQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vY29tbW9uL2kxOG4vbWl4aW4nKTtcclxuXHJcbi8qKlxyXG4qIElkZW50aXR5IGZ1bmN0aW9uLlxyXG4qIEBwYXJhbSAge29iamVjdH0gZCAtIFRoZSBkYXRhLlxyXG4qL1xyXG5jb25zdCBpZGVudGl0eSA9IGQgPT4gZDtcclxuXHJcbi8qKlxyXG4qIElucHV0IHRleHQgbWl4aW4uXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxuY29uc3QgaW5wdXRUZXh0Q29tcG9uZW50ID0ge1xyXG4gICAgbWl4aW5zOiBbbWRsQmVoYXZpb3VyLCBpMThuQmVoYXZpb3VyXSxcclxuXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIERlZmF1bHQgZm9ybWF0dGVyLlxyXG4gICAgICAgICAgICAqIEBwYXJhbSAge29iamVjdH0gZCAtIERhdGEgdG8gZm9ybWF0LlxyXG4gICAgICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gICAtIFRoZSBmb3JtYXR0ZWQgZGF0YS5cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZm9ybWF0dGVyOiBpZGVudGl0eSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogRGVmYXVsdCB1bmZvcm1hdHRlci5cclxuICAgICAgICAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGQgLSBEYXRhIHRvIHVuZm9ybWF0LlxyXG4gICAgICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gICAtIFRoZSB1bmZvcm1hdHRlZCBkYXRhLlxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB1bmZvcm1hdHRlcjogaWRlbnRpdHlcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgb25DaGFuZ2U6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgb25LZXlQcmVzczogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBlcnJvcjogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHR5cGU6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICB2YWx1ZTogdHlwZXMoWydzdHJpbmcnLCAnbnVtYmVyJ10pLFxyXG4gICAgICAgIG5hbWU6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBwbGFjZWhvbGRlcjogdHlwZXMoJ3N0cmluZycpXHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge2Zvcm1hdHRlciwgdmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogZm9ybWF0dGVyKHZhbHVlKVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignRm9jdXNDb21wb25lbnRzIDAuNy4wOiB0aGlzIGNvbXBvbmVudCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIEZvY3VzQ29tcG9uZW50cy5jb21wb25lbnRzLmlucHV0LlRleHQnKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogVXBkYXRlIHRoZSBjb21wb25lbnQuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBuZXdQcm9wcyAtIFRoZSBuZXcgcHJvcHMgdG8gdXBkYXRlLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdGhpcy5wcm9wcy5mb3JtYXR0ZXIobmV3UHJvcHMudmFsdWUpfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgaW5wdXQgaW4gdGhlIERPTS5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSB2YWx1ZSBvZiB0aGUgZm9ybWF0dGVyLlxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnVuZm9ybWF0dGVyKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5pbnB1dFRleHQpLnZhbHVlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogSGFuZGxlIHRoZSBjaGFuZ2UgdmFsdWUgb2YgdGhlIGlucHV0LlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgc2FuaXRpemUgZXZlbnQgb2YgaW5wdXQuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgLy9PbiBjaGFuZ2UgaGFuZGxlci5cclxuICAgICAgICBjb25zdCB7b25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZihvbkNoYW5nZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25DaGFuZ2UoZXZlbnQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBzdGF0ZSB0aGVuIGNhbGwgdGhlIGNoYW5nZSBoYW5kbGVyLlxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogSW5wdXQga2V5IHByZXNzIGhhbmRsZXIuXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50ICAgZXZlbnQgcmFpc2VkIGJ5IHRoZSBrZXkgcHJlc3NcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZUlucHV0S2V5UHJlc3MoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCB7b25LZXlQcmVzc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKG9uS2V5UHJlc3MpIHtcclxuICAgICAgICAgICAgb25LZXlQcmVzcyhldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgYW4gaW5wdXQuXHJcbiAgICAqIEByZXR1cm4ge0RPTX0gLSBUaGUgZG9tIG9mIGFuIGlucHV0LlxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7ZXJyb3IsIG5hbWUsIHBsYWNlaG9sZGVyLCBzdHlsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSBhc3NpZ24oe30sIHRoaXMucHJvcHMsIHt2YWx1ZX0sIHtpZDogbmFtZSwgb25DaGFuZ2U6IHRoaXMuX2hhbmRsZUlucHV0Q2hhbmdlLCBvbktleVByZXNzOiB0aGlzLl9oYW5kbGVJbnB1dEtleVByZXNzfSk7XHJcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IGVycm9yID8gJ2hhc0Vycm9yJyA6IG51bGw7IC8vYWRkIHBhdHRlcm4gdG8gb3ZlcmlkZSBtZGwgZXJyb3Igc3R5bGUgd2hlbiBkaXNwbGF5aW5nIGFuIGZvY3VzIGVycm9yLlxyXG4gICAgICAgIGNvbnN0IGNzc0NsYXNzID0gYG1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZCAke2Vycm9yID8gJ2lzLWludmFsaWQnIDogJyd9YDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzQ2xhc3N9IGRhdGEtZm9jdXM9J2lucHV0LXRleHQnIHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19pbnB1dCcgcmVmPSdpbnB1dFRleHQnIHsuLi5pbnB1dFByb3BzfSBwYXR0ZXJuPXtwYXR0ZXJufSAvPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fbGFiZWwnIGh0bWxGb3I9e25hbWV9Pnt2YWx1ZSA/ICcnIDogdGhpcy5pMThuKHBsYWNlaG9sZGVyKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAge2Vycm9yICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWRsLXRleHRmaWVsZF9fZXJyb3JcIj57ZXJyb3J9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihpbnB1dFRleHRDb21wb25lbnQpO1xyXG4iXX0=