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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0E7Ozs7QUFDQTs7Ozs7OztBQUhBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU0sV0FBVyxRQUFRLFdBQVIsQ0FBakI7O0FBR0EsSUFBTSxTQUFTLFFBQVEsZUFBUixDQUFmO0FBQ0EsSUFBTSxlQUFlLFFBQVEsMkJBQVIsQ0FBckI7QUFDQSxJQUFNLGdCQUFnQixRQUFRLGtCQUFSLENBQXRCOzs7Ozs7QUFNQSxJQUFNLFdBQVcsU0FBWCxRQUFXO0FBQUEsV0FBSyxDQUFMO0FBQUEsQ0FBakI7Ozs7OztBQU1BLElBQU0scUJBQXFCO0FBQ3ZCLFlBQVEsQ0FBQyxZQUFELEVBQWUsYUFBZixDQURlOzs7QUFJdkIsbUJBSnVCLDZCQUlMO0FBQ2QsZUFBTztBQUNILGtCQUFNLE1BREg7Ozs7OztBQU9ILHVCQUFXLFFBUFI7Ozs7OztBQWFILHlCQUFhO0FBYlYsU0FBUDtBQWVILEtBcEJzQjs7O0FBc0J2QixlQUFXO0FBQ1Asa0JBQVUscUJBQU0sTUFBTixDQURIO0FBRVAsb0JBQVkscUJBQU0sTUFBTixDQUZMO0FBR1AsZUFBTyxxQkFBTSxRQUFOLENBSEE7QUFJUCxjQUFNLHFCQUFNLFFBQU4sQ0FKQztBQUtQLGVBQU8scUJBQU0sQ0FBQyxRQUFELEVBQVcsUUFBWCxDQUFOLENBTEE7QUFNUCxjQUFNLHFCQUFNLFFBQU4sQ0FOQztBQU9QLHFCQUFhLHFCQUFNLFFBQU47QUFQTixLQXRCWTs7QUFnQ3ZCLG1CQWhDdUIsNkJBZ0NMO0FBQUEscUJBQ2EsS0FBSyxLQURsQjtBQUFBLFlBQ1AsU0FETyxVQUNQLFNBRE87QUFBQSxZQUNJLEtBREosVUFDSSxLQURKOztBQUVkLGVBQU87QUFDSCxtQkFBTyxVQUFVLEtBQVY7QUFESixTQUFQO0FBR0gsS0FyQ3NCO0FBc0N2QixzQkF0Q3VCLGdDQXNDRjtBQUNqQixnQkFBUSxJQUFSLENBQWEsdUdBQWI7QUFDSCxLQXhDc0I7Ozs7OztBQTZDdkIsNkJBN0N1QixxQ0E2Q0csUUE3Q0gsRUE2Q2E7QUFDaEMsYUFBSyxRQUFMLENBQWMsRUFBQyxPQUFPLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsU0FBUyxLQUE5QixDQUFSLEVBQWQ7QUFDSCxLQS9Dc0I7Ozs7OztBQW9EdkIsWUFwRHVCLHNCQW9EWjtBQUNQLGVBQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUFTLFdBQVQsQ0FBcUIsS0FBSyxJQUFMLENBQVUsU0FBL0IsRUFBMEMsS0FBakUsQ0FBUDtBQUNILEtBdERzQjs7Ozs7O0FBMkR2QixzQkEzRHVCLDhCQTJESixLQTNESSxFQTJERzs7QUFBQSxZQUVmLFFBRmUsR0FFSCxLQUFLLEtBRkYsQ0FFZixRQUZlOztBQUd0QixZQUFHLFFBQUgsRUFBYTtBQUNULG1CQUFPLFNBQVMsS0FBVCxDQUFQO0FBQ0gsU0FGRCxNQUVPOztBQUVILGlCQUFLLFFBQUwsQ0FBYyxFQUFDLE9BQU8sTUFBTSxNQUFOLENBQWEsS0FBckIsRUFBZDtBQUNIO0FBQ0osS0FwRXNCOzs7Ozs7QUF5RXZCLHdCQXpFdUIsZ0NBeUVGLEtBekVFLEVBeUVLO0FBQUEsWUFDakIsVUFEaUIsR0FDSCxLQUFLLEtBREYsQ0FDakIsVUFEaUI7O0FBRXhCLFlBQUcsVUFBSCxFQUFlO0FBQ1gsdUJBQVcsS0FBWDtBQUNIO0FBQ0osS0E5RXNCOzs7Ozs7QUFtRnZCLFVBbkZ1QixvQkFtRmQ7QUFBQSxZQUNFLEtBREYsR0FDVyxLQUFLLEtBRGhCLENBQ0UsS0FERjtBQUFBLHNCQUVxQyxLQUFLLEtBRjFDO0FBQUEsWUFFRSxLQUZGLFdBRUUsS0FGRjtBQUFBLFlBRVMsSUFGVCxXQUVTLElBRlQ7QUFBQSxZQUVlLFdBRmYsV0FFZSxXQUZmO0FBQUEsWUFFNEIsS0FGNUIsV0FFNEIsS0FGNUI7O0FBR0wsWUFBTSxhQUFhLE9BQU8sRUFBUCxFQUFXLEtBQUssS0FBaEIsRUFBdUIsRUFBQyxZQUFELEVBQXZCLEVBQWdDLEVBQUMsSUFBSSxJQUFMLEVBQVcsVUFBVSxLQUFLLGtCQUExQixFQUE4QyxZQUFZLEtBQUssb0JBQS9ELEVBQWhDLENBQW5CO0FBQ0EsWUFBTSxVQUFVLFFBQVEsVUFBUixHQUFxQixJQUFyQyxDO0FBQ0EsWUFBTSxnREFBNkMsUUFBUSxZQUFSLEdBQXVCLEVBQXBFLENBQU47QUFDQSxlQUNJO0FBQUE7WUFBQSxFQUFLLFdBQVcsUUFBaEIsRUFBMEIsY0FBVyxZQUFyQyxFQUFrRCxPQUFPLEtBQXpEO1lBQ0ksd0NBQU8sV0FBVSxzQkFBakIsRUFBd0MsS0FBSSxXQUE1QyxJQUE0RCxVQUE1RCxJQUF3RSxTQUFTLE9BQWpGLElBREo7WUFFSTtBQUFBO2dCQUFBLEVBQU8sV0FBVSxzQkFBakIsRUFBd0MsU0FBUyxJQUFqRDtnQkFBd0QsUUFBUSxFQUFSLEdBQWEsS0FBSyxJQUFMLENBQVUsV0FBVjtBQUFyRSxhQUZKO1lBR0ssU0FDRztBQUFBO2dCQUFBLEVBQU0sV0FBVSxzQkFBaEI7Z0JBQXdDO0FBQXhDO0FBSlIsU0FESjtBQVNIO0FBbEdzQixDQUEzQjs7QUFzR0EsT0FBTyxPQUFQLEdBQWlCLHVCQUFRLGtCQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llcy5cclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xyXG5jb25zdCBtZGxCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9tZGwtYmVoYXZpb3VyJyk7XHJcbmNvbnN0IGkxOG5CZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi9pMThuL21peGluJyk7XHJcblxyXG4vKipcclxuKiBJZGVudGl0eSBmdW5jdGlvbi5cclxuKiBAcGFyYW0gIHtvYmplY3R9IGQgLSBUaGUgZGF0YS5cclxuKi9cclxuY29uc3QgaWRlbnRpdHkgPSBkID0+IGQ7XHJcblxyXG4vKipcclxuKiBJbnB1dCB0ZXh0IG1peGluLlxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmNvbnN0IGlucHV0VGV4dENvbXBvbmVudCA9IHtcclxuICAgIG1peGluczogW21kbEJlaGF2aW91ciwgaTE4bkJlaGF2aW91cl0sXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBEZWZhdWx0IGZvcm1hdHRlci5cclxuICAgICAgICAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGQgLSBEYXRhIHRvIGZvcm1hdC5cclxuICAgICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgLSBUaGUgZm9ybWF0dGVkIGRhdGEuXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZvcm1hdHRlcjogaWRlbnRpdHksXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIERlZmF1bHQgdW5mb3JtYXR0ZXIuXHJcbiAgICAgICAgICAgICogQHBhcmFtICB7b2JqZWN0fSBkIC0gRGF0YSB0byB1bmZvcm1hdC5cclxuICAgICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgLSBUaGUgdW5mb3JtYXR0ZWQgZGF0YS5cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdW5mb3JtYXR0ZXI6IGlkZW50aXR5XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG9uQ2hhbmdlOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIG9uS2V5UHJlc3M6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgZXJyb3I6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICB0eXBlOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgdmFsdWU6IHR5cGVzKFsnc3RyaW5nJywgJ251bWJlciddKSxcclxuICAgICAgICBuYW1lOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgcGxhY2Vob2xkZXI6IHR5cGVzKCdzdHJpbmcnKVxyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHtmb3JtYXR0ZXIsIHZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IGZvcm1hdHRlcih2YWx1ZSlcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0ZvY3VzQ29tcG9uZW50cyAwLjcuMDogdGhpcyBjb21wb25lbnQgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBGb2N1c0NvbXBvbmVudHMuY29tcG9uZW50cy5pbnB1dC5UZXh0Jyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFVwZGF0ZSB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gbmV3UHJvcHMgLSBUaGUgbmV3IHByb3BzIHRvIHVwZGF0ZS5cclxuICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHRoaXMucHJvcHMuZm9ybWF0dGVyKG5ld1Byb3BzLnZhbHVlKX0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGlucHV0IGluIHRoZSBET00uXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgdmFsdWUgb2YgdGhlIGZvcm1hdHRlci5cclxuICAgICovXHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy51bmZvcm1hdHRlcihSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuaW5wdXRUZXh0KS52YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSB0aGUgY2hhbmdlIHZhbHVlIG9mIHRoZSBpbnB1dC5cclxuICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIHNhbml0aXplIGV2ZW50IG9mIGlucHV0LlxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVJbnB1dENoYW5nZShldmVudCkge1xyXG4gICAgICAgIC8vT24gY2hhbmdlIGhhbmRsZXIuXHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYob25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9uQ2hhbmdlKGV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL1NldCB0aGUgc3RhdGUgdGhlbiBjYWxsIHRoZSBjaGFuZ2UgaGFuZGxlci5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIElucHV0IGtleSBwcmVzcyBoYW5kbGVyLlxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudCAgIGV2ZW50IHJhaXNlZCBieSB0aGUga2V5IHByZXNzXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVJbnB1dEtleVByZXNzKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qge29uS2V5UHJlc3N9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZihvbktleVByZXNzKSB7XHJcbiAgICAgICAgICAgIG9uS2V5UHJlc3MoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGFuIGlucHV0LlxyXG4gICAgKiBAcmV0dXJuIHtET019IC0gVGhlIGRvbSBvZiBhbiBpbnB1dC5cclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yLCBuYW1lLCBwbGFjZWhvbGRlciwgc3R5bGV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0gYXNzaWduKHt9LCB0aGlzLnByb3BzLCB7dmFsdWV9LCB7aWQ6IG5hbWUsIG9uQ2hhbmdlOiB0aGlzLl9oYW5kbGVJbnB1dENoYW5nZSwgb25LZXlQcmVzczogdGhpcy5faGFuZGxlSW5wdXRLZXlQcmVzc30pO1xyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSBlcnJvciA/ICdoYXNFcnJvcicgOiBudWxsOyAvL2FkZCBwYXR0ZXJuIHRvIG92ZXJpZGUgbWRsIGVycm9yIHN0eWxlIHdoZW4gZGlzcGxheWluZyBhbiBmb2N1cyBlcnJvci5cclxuICAgICAgICBjb25zdCBjc3NDbGFzcyA9IGBtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGQgJHtlcnJvciA/ICdpcy1pbnZhbGlkJyA6ICcnfWA7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzc0NsYXNzfSBkYXRhLWZvY3VzPSdpbnB1dC10ZXh0JyBzdHlsZT17c3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9faW5wdXQnIHJlZj0naW5wdXRUZXh0JyB7Li4uaW5wdXRQcm9wc30gcGF0dGVybj17cGF0dGVybn0gLz5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2xhYmVsJyBodG1sRm9yPXtuYW1lfT57dmFsdWUgPyAnJyA6IHRoaXMuaTE4bihwbGFjZWhvbGRlcil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIHtlcnJvciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1kbC10ZXh0ZmllbGRfX2Vycm9yXCI+e2Vycm9yfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoaW5wdXRUZXh0Q29tcG9uZW50KTtcclxuIl19