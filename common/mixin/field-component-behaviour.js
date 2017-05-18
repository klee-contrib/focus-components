'use strict';

var assign = require('object-assign');

var _require = require('lodash/lang'),
    isUndefined = _require.isUndefined,
    isObject = _require.isObject;
/**
 * Identity function
 * @param  {object} d - data to treat.
 * @return {object}  - The same object.
 */


function identity(d) {
    return d;
}

var fieldBehaviourMixin = {
    /**
    * Build the field properties.
    * @param {string} name - property name.
    * @param {object} options - An object which contains all options for the built of the field
    * @param {object} context - Function context, this by default.
    * @returns {object} - The constructed props for the field.
    */
    _buildFieldProps: function _buildFieldProps(name) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var context = arguments[2];

        context = context || this;
        //Properties.
        var isEdit = options.isEdit !== undefined ? options.isEdit : context.state.isEdit;
        var value = options.value !== undefined ? options.value : context.state[name];
        var def = context.definition && context.definition[name] ? context.definition[name] : {};
        var listName = options.listName || def.listName;
        //hasLabel
        var hasLabel = function hasLabel() {
            if (options.hasLabel !== undefined) {
                return options.hasLabel;
            }
            if (def.hasLabel !== undefined) {
                return options.hasLabel;
            }return true;
        }();
        //Build a container for the props.
        name = options.name || this.definitionPath + '.' + name;
        var propsContainer = {
            name: name,
            label: def.label || options.label || name,
            ref: name,
            value: value,
            domain: options.domain || def.domain,
            error: context.state.error ? context.state.error[name] : undefined,
            locale: def.locale,
            format: def.format,
            //Mode
            isEdit: isEdit,
            hasLabel: hasLabel,
            isRequired: !isUndefined(options.isRequired) && options.isRequired || def.isRequired || def.required, //legacy on required on model generation.
            //Style
            style: options.style,
            // Type
            type: def.type,
            //Methods
            validator: def.validator,
            formatter: def.formatter || identity,
            unformatter: def.unformatter || identity,
            //Component
            FieldComponent: def.FieldComponent,
            InputLabelComponent: def.InputLabelComponent,
            InputComponent: def.InputComponent,
            SelectComponent: def.SelectComponent,
            TextComponent: def.TextComponent,
            DisplayComponent: def.DisplayComponent,
            options: options.options || def.options //Add options to the fields
        };
        //Extend the options object in order to be able to specify more options to thie son's component.
        var fieldProps = assign(propsContainer, options, options.options || def.options);
        // Values list.
        var refContainer = options.refContainer || def.refContainer || context.state.reference;

        // case no props.values and then
        if (!options.hasOwnProperty('values') && isObject(refContainer) && refContainer.hasOwnProperty(listName)) {
            assign(fieldProps, { values: refContainer[listName] || [] });
        }
        return fieldProps;
    }
};

module.exports = fieldBehaviourMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJhc3NpZ24iLCJyZXF1aXJlIiwiaXNVbmRlZmluZWQiLCJpc09iamVjdCIsImlkZW50aXR5IiwiZCIsImZpZWxkQmVoYXZpb3VyTWl4aW4iLCJfYnVpbGRGaWVsZFByb3BzIiwibmFtZSIsIm9wdGlvbnMiLCJjb250ZXh0IiwiaXNFZGl0IiwidW5kZWZpbmVkIiwic3RhdGUiLCJ2YWx1ZSIsImRlZiIsImRlZmluaXRpb24iLCJsaXN0TmFtZSIsImhhc0xhYmVsIiwiZGVmaW5pdGlvblBhdGgiLCJwcm9wc0NvbnRhaW5lciIsImxhYmVsIiwicmVmIiwiZG9tYWluIiwiZXJyb3IiLCJsb2NhbGUiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwicmVxdWlyZWQiLCJzdHlsZSIsInR5cGUiLCJ2YWxpZGF0b3IiLCJmb3JtYXR0ZXIiLCJ1bmZvcm1hdHRlciIsIkZpZWxkQ29tcG9uZW50IiwiSW5wdXRMYWJlbENvbXBvbmVudCIsIklucHV0Q29tcG9uZW50IiwiU2VsZWN0Q29tcG9uZW50IiwiVGV4dENvbXBvbmVudCIsIkRpc3BsYXlDb21wb25lbnQiLCJmaWVsZFByb3BzIiwicmVmQ29udGFpbmVyIiwicmVmZXJlbmNlIiwiaGFzT3duUHJvcGVydHkiLCJ2YWx1ZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFNBQVNDLFFBQVEsZUFBUixDQUFmOztlQUNnQ0EsUUFBUSxhQUFSLEM7SUFBekJDLFcsWUFBQUEsVztJQUFhQyxRLFlBQUFBLFE7QUFDcEI7Ozs7Ozs7QUFLQSxTQUFTQyxRQUFULENBQWtCQyxDQUFsQixFQUFxQjtBQUNqQixXQUFPQSxDQUFQO0FBQ0g7O0FBRUQsSUFBTUMsc0JBQXNCO0FBQ3hCOzs7Ozs7O0FBT0FDLG9CQVJ3Qiw0QkFRUEMsSUFSTyxFQVFzQjtBQUFBLFlBQXZCQyxPQUF1Qix1RUFBYixFQUFhO0FBQUEsWUFBVEMsT0FBUzs7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LFNBQVNzQyxZQUFULENBQXZDLElBQWlFQSxhQUFhRSxjQUFiLENBQTRCMUIsUUFBNUIsQ0FBcEUsRUFBMkc7QUFDdkdqQixtQkFBT3dDLFVBQVAsRUFBbUIsRUFBQ0ksUUFBUUgsYUFBYXhCLFFBQWIsS0FBMEIsRUFBbkMsRUFBbkI7QUFDSDtBQUNELGVBQU91QixVQUFQO0FBQ0g7QUFsRXVCLENBQTVCOztBQXNFQUssT0FBT0MsT0FBUCxHQUFpQnhDLG1CQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XHJcbmNvbnN0IHtpc1VuZGVmaW5lZCwgaXNPYmplY3R9ID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcnKTtcclxuLyoqXHJcbiAqIElkZW50aXR5IGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSAge29iamVjdH0gZCAtIGRhdGEgdG8gdHJlYXQuXHJcbiAqIEByZXR1cm4ge29iamVjdH0gIC0gVGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuZnVuY3Rpb24gaWRlbnRpdHkoZCkge1xyXG4gICAgcmV0dXJuIGQ7XHJcbn1cclxuXHJcbmNvbnN0IGZpZWxkQmVoYXZpb3VyTWl4aW4gPSB7XHJcbiAgICAvKipcclxuICAgICogQnVpbGQgdGhlIGZpZWxkIHByb3BlcnRpZXMuXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gcHJvcGVydHkgbmFtZS5cclxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBBbiBvYmplY3Qgd2hpY2ggY29udGFpbnMgYWxsIG9wdGlvbnMgZm9yIHRoZSBidWlsdCBvZiB0aGUgZmllbGRcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgLSBGdW5jdGlvbiBjb250ZXh0LCB0aGlzIGJ5IGRlZmF1bHQuXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIGNvbnN0cnVjdGVkIHByb3BzIGZvciB0aGUgZmllbGQuXHJcbiAgICAqL1xyXG4gICAgX2J1aWxkRmllbGRQcm9wcyhuYW1lLCBvcHRpb25zID0ge30sIGNvbnRleHQpIHtcclxuICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCB0aGlzO1xyXG4gICAgICAgIC8vUHJvcGVydGllcy5cclxuICAgICAgICBjb25zdCBpc0VkaXQgPSBvcHRpb25zLmlzRWRpdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5pc0VkaXQgOiBjb250ZXh0LnN0YXRlLmlzRWRpdDtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnMudmFsdWUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMudmFsdWUgOiBjb250ZXh0LnN0YXRlW25hbWVdO1xyXG4gICAgICAgIGNvbnN0IGRlZiA9IChjb250ZXh0LmRlZmluaXRpb24gJiYgY29udGV4dC5kZWZpbml0aW9uW25hbWVdKSA/IGNvbnRleHQuZGVmaW5pdGlvbltuYW1lXSA6IHt9O1xyXG4gICAgICAgIGNvbnN0IGxpc3ROYW1lID0gb3B0aW9ucy5saXN0TmFtZSB8fCBkZWYubGlzdE5hbWU7XHJcbiAgICAgICAgLy9oYXNMYWJlbFxyXG4gICAgICAgIGNvbnN0IGhhc0xhYmVsID0gKGZ1bmN0aW9uIGhhc0xhYmVsKCkge1xyXG4gICAgICAgICAgICBpZihvcHRpb25zLmhhc0xhYmVsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmhhc0xhYmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGRlZi5oYXNMYWJlbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5oYXNMYWJlbDtcclxuICAgICAgICAgICAgfSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KCkpO1xyXG4gICAgICAgIC8vQnVpbGQgYSBjb250YWluZXIgZm9yIHRoZSBwcm9wcy5cclxuICAgICAgICBuYW1lID0gb3B0aW9ucy5uYW1lIHx8IGAke3RoaXMuZGVmaW5pdGlvblBhdGh9LiR7bmFtZX1gO1xyXG4gICAgICAgIGNvbnN0IHByb3BzQ29udGFpbmVyID0ge1xyXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICBsYWJlbDogZGVmLmxhYmVsIHx8IG9wdGlvbnMubGFiZWwgfHwgbmFtZSxcclxuICAgICAgICAgICAgcmVmOiBuYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgIGRvbWFpbjogb3B0aW9ucy5kb21haW4gfHwgZGVmLmRvbWFpbixcclxuICAgICAgICAgICAgZXJyb3I6IGNvbnRleHQuc3RhdGUuZXJyb3IgPyBjb250ZXh0LnN0YXRlLmVycm9yW25hbWVdIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBsb2NhbGU6IGRlZi5sb2NhbGUsXHJcbiAgICAgICAgICAgIGZvcm1hdDogZGVmLmZvcm1hdCxcclxuICAgICAgICAgICAgLy9Nb2RlXHJcbiAgICAgICAgICAgIGlzRWRpdDogaXNFZGl0LFxyXG4gICAgICAgICAgICBoYXNMYWJlbDogaGFzTGFiZWwsXHJcbiAgICAgICAgICAgIGlzUmVxdWlyZWQ6ICghaXNVbmRlZmluZWQob3B0aW9ucy5pc1JlcXVpcmVkKSAmJiBvcHRpb25zLmlzUmVxdWlyZWQpIHx8IGRlZi5pc1JlcXVpcmVkIHx8IGRlZi5yZXF1aXJlZCwgLy9sZWdhY3kgb24gcmVxdWlyZWQgb24gbW9kZWwgZ2VuZXJhdGlvbi5cclxuICAgICAgICAgICAgLy9TdHlsZVxyXG4gICAgICAgICAgICBzdHlsZTogb3B0aW9ucy5zdHlsZSxcclxuXHRcdFx0Ly8gVHlwZVxyXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBkZWYudHlwZSxcclxuICAgICAgICAgICAgLy9NZXRob2RzXHJcbiAgICAgICAgICAgIHZhbGlkYXRvcjogZGVmLnZhbGlkYXRvcixcclxuICAgICAgICAgICAgZm9ybWF0dGVyOiBkZWYuZm9ybWF0dGVyIHx8IGlkZW50aXR5LFxyXG4gICAgICAgICAgICB1bmZvcm1hdHRlcjogZGVmLnVuZm9ybWF0dGVyIHx8IGlkZW50aXR5LFxyXG4gICAgICAgICAgICAvL0NvbXBvbmVudFxyXG4gICAgICAgICAgICBGaWVsZENvbXBvbmVudDogZGVmLkZpZWxkQ29tcG9uZW50LFxyXG4gICAgICAgICAgICBJbnB1dExhYmVsQ29tcG9uZW50OiBkZWYuSW5wdXRMYWJlbENvbXBvbmVudCxcclxuICAgICAgICAgICAgSW5wdXRDb21wb25lbnQ6IGRlZi5JbnB1dENvbXBvbmVudCxcclxuICAgICAgICAgICAgU2VsZWN0Q29tcG9uZW50OiBkZWYuU2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICBUZXh0Q29tcG9uZW50OiBkZWYuVGV4dENvbXBvbmVudCxcclxuICAgICAgICAgICAgRGlzcGxheUNvbXBvbmVudDogZGVmLkRpc3BsYXlDb21wb25lbnQsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMub3B0aW9ucyB8fCBkZWYub3B0aW9ucyAvL0FkZCBvcHRpb25zIHRvIHRoZSBmaWVsZHNcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vRXh0ZW5kIHRoZSBvcHRpb25zIG9iamVjdCBpbiBvcmRlciB0byBiZSBhYmxlIHRvIHNwZWNpZnkgbW9yZSBvcHRpb25zIHRvIHRoaWUgc29uJ3MgY29tcG9uZW50LlxyXG4gICAgICAgIGxldCBmaWVsZFByb3BzID0gYXNzaWduKHByb3BzQ29udGFpbmVyLCBvcHRpb25zLCBvcHRpb25zLm9wdGlvbnMgfHwgZGVmLm9wdGlvbnMpO1xyXG4gICAgICAgIC8vIFZhbHVlcyBsaXN0LlxyXG4gICAgICAgIGNvbnN0IHJlZkNvbnRhaW5lciA9IG9wdGlvbnMucmVmQ29udGFpbmVyIHx8IGRlZi5yZWZDb250YWluZXIgfHwgY29udGV4dC5zdGF0ZS5yZWZlcmVuY2U7XHJcblxyXG4gICAgICAgIC8vIGNhc2Ugbm8gcHJvcHMudmFsdWVzIGFuZCB0aGVuXHJcbiAgICAgICAgaWYoIShvcHRpb25zLmhhc093blByb3BlcnR5KCd2YWx1ZXMnKSkgJiYgaXNPYmplY3QocmVmQ29udGFpbmVyKSAmJiByZWZDb250YWluZXIuaGFzT3duUHJvcGVydHkobGlzdE5hbWUpKSB7XHJcbiAgICAgICAgICAgIGFzc2lnbihmaWVsZFByb3BzLCB7dmFsdWVzOiByZWZDb250YWluZXJbbGlzdE5hbWVdIHx8IFtdIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmllbGRQcm9wcztcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZpZWxkQmVoYXZpb3VyTWl4aW47XHJcbiJdfQ==