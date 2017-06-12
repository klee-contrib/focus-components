'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
* Identity function
* @param  {object} d - data to treat.
* @return {object}  - The same object.
*/
function identity(d) {
    return d;
}

var fieldBehaviourMixin = {
    _modifiedFields: [],
    _defaultOnChange: function _defaultOnChange(fieldname, value) {
        this.setState(_defineProperty({}, fieldname, value));
    },
    _buildResetState: function _buildResetState() {
        if (this.buildResetState) {
            return this.buildResetState(this._modifiedFields);
        }
        return this._modifiedFields.reduce(function (acc, value) {
            acc[value] = null;
            return acc;
        }, {});
    },
    _wrappedOnChange: function _wrappedOnChange(onChange, fieldname, value) {
        if (this._modifiedFields.indexOf(fieldname) === -1) {
            this._modifiedFields.push(fieldname);
        }
        if (onChange) {
            onChange(value);
        } else {
            this._defaultOnChange(fieldname, value);
        }
    },

    /**
    * Build the field properties.
    * @param {string} name - property name.
    * @param {object} options - An object which contains all options for the built of the field
    * @param {object} context - Function context, this by default.
    * @returns {object} - The constructed props for the field.
    */
    _buildFieldProps: function _buildFieldProps(name) {
        var _this = this;

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
        var baseName = name;
        name = options.name || this.definitionPath + '.' + name;
        var onChange = function onChange(value) {
            return _this._wrappedOnChange(options.onChange || (options.options || {}).onChange || def.onChange, baseName, value);
        };

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
            isRequired: !(0, _lodash.isUndefined)(options.isRequired) && options.isRequired || def.isRequired || def.required, //legacy on required on model generation.
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
            LabelComponent: def.LabelComponent,
            AutocompleteSelectComponent: def.AutocompleteSelectComponent,
            AutocompleteTextComponent: def.AutocompleteTextComponent,
            options: options.options || def.options //Add options to the fields
        };
        //Extend the options object in order to be able to specify more options to thie son's component.
        var fieldProps = (0, _objectAssign2.default)(propsContainer, options, options.options || def.options);
        // Forcing the use of the wrapper for onChange
        fieldProps.onChange = onChange;

        // Values list.
        var refContainer = options.refContainer || def.refContainer || context.state.reference;
        // case no props.values and then
        if (!options.hasOwnProperty('values') && (0, _lodash.isObject)(refContainer) && refContainer.hasOwnProperty(listName)) {
            (0, _objectAssign2.default)(fieldProps, { values: refContainer[listName] || [] });
        }
        return fieldProps;
    }
};

exports.default = fieldBehaviourMixin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpZGVudGl0eSIsImQiLCJmaWVsZEJlaGF2aW91ck1peGluIiwiX21vZGlmaWVkRmllbGRzIiwiX2RlZmF1bHRPbkNoYW5nZSIsImZpZWxkbmFtZSIsInZhbHVlIiwic2V0U3RhdGUiLCJfYnVpbGRSZXNldFN0YXRlIiwiYnVpbGRSZXNldFN0YXRlIiwicmVkdWNlIiwiYWNjIiwiX3dyYXBwZWRPbkNoYW5nZSIsIm9uQ2hhbmdlIiwiaW5kZXhPZiIsInB1c2giLCJfYnVpbGRGaWVsZFByb3BzIiwibmFtZSIsIm9wdGlvbnMiLCJjb250ZXh0IiwiaXNFZGl0IiwidW5kZWZpbmVkIiwic3RhdGUiLCJkZWYiLCJkZWZpbml0aW9uIiwibGlzdE5hbWUiLCJoYXNMYWJlbCIsImJhc2VOYW1lIiwiZGVmaW5pdGlvblBhdGgiLCJwcm9wc0NvbnRhaW5lciIsImxhYmVsIiwicmVmIiwiZG9tYWluIiwiZXJyb3IiLCJsb2NhbGUiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwicmVxdWlyZWQiLCJzdHlsZSIsInR5cGUiLCJ2YWxpZGF0b3IiLCJmb3JtYXR0ZXIiLCJ1bmZvcm1hdHRlciIsIkZpZWxkQ29tcG9uZW50IiwiSW5wdXRMYWJlbENvbXBvbmVudCIsIklucHV0Q29tcG9uZW50IiwiU2VsZWN0Q29tcG9uZW50IiwiVGV4dENvbXBvbmVudCIsIkRpc3BsYXlDb21wb25lbnQiLCJMYWJlbENvbXBvbmVudCIsIkF1dG9jb21wbGV0ZVNlbGVjdENvbXBvbmVudCIsIkF1dG9jb21wbGV0ZVRleHRDb21wb25lbnQiLCJmaWVsZFByb3BzIiwicmVmQ29udGFpbmVyIiwicmVmZXJlbmNlIiwiaGFzT3duUHJvcGVydHkiLCJ2YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUNBOzs7OztBQUtBLFNBQVNBLFFBQVQsQ0FBa0JDLENBQWxCLEVBQXFCO0FBQ2pCLFdBQU9BLENB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dkIsRUFBZ0NBLFFBQVFBLE9BQVIsSUFBbUJLLElBQUlMLE9BQXZELENBQWpCO0FBQ0E7QUFDQWtDLG1CQUFXdkMsUUFBWCxHQUFzQkEsUUFBdEI7O0FBRUE7QUFDQSxZQUFNd0MsZUFBZW5DLFFBQVFtQyxZQUFSLElBQXdCOUIsSUFBSThCLFlBQTVCLElBQTRDbEMsUUFBUUcsS0FBUixDQUFjZ0MsU0FBL0U7QUFDQTtBQUNBLFlBQUksQ0FBRXBDLFFBQVFxQyxjQUFSLENBQXVCLFFBQXZCLENBQUYsSUFBdUMsc0JBQVNGLFlBQVQsQ0FBdkMsSUFBaUVBLGFBQWFFLGNBQWIsQ0FBNEI5QixRQUE1QixDQUFyRSxFQUE0RztBQUN4Ryx3Q0FBTzJCLFVBQVAsRUFBbUIsRUFBRUksUUFBUUgsYUFBYTVCLFFBQWIsS0FBMEIsRUFBcEMsRUFBbkI7QUFDSDtBQUNELGVBQU8yQixVQUFQO0FBQ0g7QUFuR3VCLENBQTVCOztrQkF1R2VsRCxtQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkLCBpc09iamVjdH0gZnJvbSAnbG9kYXNoJztcclxuLyoqXHJcbiogSWRlbnRpdHkgZnVuY3Rpb25cclxuKiBAcGFyYW0gIHtvYmplY3R9IGQgLSBkYXRhIHRvIHRyZWF0LlxyXG4qIEByZXR1cm4ge29iamVjdH0gIC0gVGhlIHNhbWUgb2JqZWN0LlxyXG4qL1xyXG5mdW5jdGlvbiBpZGVudGl0eShkKSB7XHJcbiAgICByZXR1cm4gZDtcclxufVxyXG5cclxuY29uc3QgZmllbGRCZWhhdmlvdXJNaXhpbiA9IHtcclxuICAgIF9tb2RpZmllZEZpZWxkczogW10sXHJcbiAgICBfZGVmYXVsdE9uQ2hhbmdlKGZpZWxkbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgW2ZpZWxkbmFtZV06IHZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBfYnVpbGRSZXNldFN0YXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmJ1aWxkUmVzZXRTdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFJlc2V0U3RhdGUodGhpcy5fbW9kaWZpZWRGaWVsZHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kaWZpZWRGaWVsZHMucmVkdWNlKChhY2MsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGFjY1t2YWx1ZV0gPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH0sXHJcbiAgICBfd3JhcHBlZE9uQ2hhbmdlKG9uQ2hhbmdlLCBmaWVsZG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vZGlmaWVkRmllbGRzLmluZGV4T2YoZmllbGRuYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZWRGaWVsZHMucHVzaChmaWVsZG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgb25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRPbkNoYW5nZShmaWVsZG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEJ1aWxkIHRoZSBmaWVsZCBwcm9wZXJ0aWVzLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHByb3BlcnR5IG5hbWUuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQW4gb2JqZWN0IHdoaWNoIGNvbnRhaW5zIGFsbCBvcHRpb25zIGZvciB0aGUgYnVpbHQgb2YgdGhlIGZpZWxkXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IC0gRnVuY3Rpb24gY29udGV4dCwgdGhpcyBieSBkZWZhdWx0LlxyXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSBjb25zdHJ1Y3RlZCBwcm9wcyBmb3IgdGhlIGZpZWxkLlxyXG4gICAgKi9cclxuICAgIF9idWlsZEZpZWxkUHJvcHMobmFtZSwgb3B0aW9ucyA9IHt9LCBjb250ZXh0KSB7XHJcbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcztcclxuICAgICAgICAvL1Byb3BlcnRpZXMuXHJcbiAgICAgICAgY29uc3QgaXNFZGl0ID0gb3B0aW9ucy5pc0VkaXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuaXNFZGl0IDogY29udGV4dC5zdGF0ZS5pc0VkaXQ7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zLnZhbHVlICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnZhbHVlIDogY29udGV4dC5zdGF0ZVtuYW1lXTtcclxuICAgICAgICBjb25zdCBkZWYgPSAoY29udGV4dC5kZWZpbml0aW9uICYmIGNvbnRleHQuZGVmaW5pdGlvbltuYW1lXSkgPyBjb250ZXh0LmRlZmluaXRpb25bbmFtZV0gOiB7fTtcclxuICAgICAgICBjb25zdCBsaXN0TmFtZSA9IG9wdGlvbnMubGlzdE5hbWUgfHwgZGVmLmxpc3ROYW1lO1xyXG4gICAgICAgIC8vaGFzTGFiZWxcclxuICAgICAgICBjb25zdCBoYXNMYWJlbCA9IChmdW5jdGlvbiBoYXNMYWJlbCgpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGFzTGFiZWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuaGFzTGFiZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRlZi5oYXNMYWJlbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5oYXNMYWJlbDtcclxuICAgICAgICAgICAgfSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9ICgpKTtcclxuICAgICAgICAvL0J1aWxkIGEgY29udGFpbmVyIGZvciB0aGUgcHJvcHMuXHJcbiAgICAgICAgY29uc3QgYmFzZU5hbWUgPSBuYW1lO1xyXG4gICAgICAgIG5hbWUgPSBvcHRpb25zLm5hbWUgfHwgYCR7dGhpcy5kZWZpbml0aW9uUGF0aH0uJHtuYW1lfWA7XHJcbiAgICAgICAgY29uc3Qgb25DaGFuZ2UgPSAodmFsdWUpID0+IHRoaXMuX3dyYXBwZWRPbkNoYW5nZShvcHRpb25zLm9uQ2hhbmdlIHx8IChvcHRpb25zLm9wdGlvbnMgfHwge30pLm9uQ2hhbmdlIHx8IGRlZi5vbkNoYW5nZSwgYmFzZU5hbWUsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvcHNDb250YWluZXIgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIGxhYmVsOiBkZWYubGFiZWwgfHwgb3B0aW9ucy5sYWJlbCB8fCBuYW1lLFxyXG4gICAgICAgICAgICByZWY6IG5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgZG9tYWluOiBvcHRpb25zLmRvbWFpbiB8fCBkZWYuZG9tYWluLFxyXG4gICAgICAgICAgICBlcnJvcjogY29udGV4dC5zdGF0ZS5lcnJvciA/IGNvbnRleHQuc3RhdGUuZXJyb3JbbmFtZV0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGxvY2FsZTogZGVmLmxvY2FsZSxcclxuICAgICAgICAgICAgZm9ybWF0OiBkZWYuZm9ybWF0LFxyXG4gICAgICAgICAgICAvL01vZGVcclxuICAgICAgICAgICAgaXNFZGl0OiBpc0VkaXQsXHJcbiAgICAgICAgICAgIGhhc0xhYmVsOiBoYXNMYWJlbCxcclxuICAgICAgICAgICAgaXNSZXF1aXJlZDogKCFpc1VuZGVmaW5lZChvcHRpb25zLmlzUmVxdWlyZWQpICYmIG9wdGlvbnMuaXNSZXF1aXJlZCkgfHwgZGVmLmlzUmVxdWlyZWQgfHwgZGVmLnJlcXVpcmVkLCAvL2xlZ2FjeSBvbiByZXF1aXJlZCBvbiBtb2RlbCBnZW5lcmF0aW9uLlxyXG4gICAgICAgICAgICAvL1N0eWxlXHJcbiAgICAgICAgICAgIHN0eWxlOiBvcHRpb25zLnN0eWxlLFxyXG4gICAgICAgICAgICAvLyBUeXBlXHJcbiAgICAgICAgICAgIHR5cGU6IGRlZi50eXBlLFxyXG4gICAgICAgICAgICAvL01ldGhvZHNcclxuICAgICAgICAgICAgdmFsaWRhdG9yOiBkZWYudmFsaWRhdG9yLFxyXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGRlZi5mb3JtYXR0ZXIgfHwgaWRlbnRpdHksXHJcbiAgICAgICAgICAgIHVuZm9ybWF0dGVyOiBkZWYudW5mb3JtYXR0ZXIgfHwgaWRlbnRpdHksXHJcbiAgICAgICAgICAgIC8vQ29tcG9uZW50XHJcbiAgICAgICAgICAgIEZpZWxkQ29tcG9uZW50OiBkZWYuRmllbGRDb21wb25lbnQsXHJcbiAgICAgICAgICAgIElucHV0TGFiZWxDb21wb25lbnQ6IGRlZi5JbnB1dExhYmVsQ29tcG9uZW50LFxyXG4gICAgICAgICAgICBJbnB1dENvbXBvbmVudDogZGVmLklucHV0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICBTZWxlY3RDb21wb25lbnQ6IGRlZi5TZWxlY3RDb21wb25lbnQsXHJcbiAgICAgICAgICAgIFRleHRDb21wb25lbnQ6IGRlZi5UZXh0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICBEaXNwbGF5Q29tcG9uZW50OiBkZWYuRGlzcGxheUNvbXBvbmVudCxcclxuICAgICAgICAgICAgTGFiZWxDb21wb25lbnQ6IGRlZi5MYWJlbENvbXBvbmVudCxcclxuICAgICAgICAgICAgQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50OiBkZWYuQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICBBdXRvY29tcGxldGVUZXh0Q29tcG9uZW50OiBkZWYuQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCxcclxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucy5vcHRpb25zIHx8IGRlZi5vcHRpb25zIC8vQWRkIG9wdGlvbnMgdG8gdGhlIGZpZWxkc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9FeHRlbmQgdGhlIG9wdGlvbnMgb2JqZWN0IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gc3BlY2lmeSBtb3JlIG9wdGlvbnMgdG8gdGhpZSBzb24ncyBjb21wb25lbnQuXHJcbiAgICAgICAgbGV0IGZpZWxkUHJvcHMgPSBhc3NpZ24ocHJvcHNDb250YWluZXIsIG9wdGlvbnMsIG9wdGlvbnMub3B0aW9ucyB8fCBkZWYub3B0aW9ucyk7XHJcbiAgICAgICAgLy8gRm9yY2luZyB0aGUgdXNlIG9mIHRoZSB3cmFwcGVyIGZvciBvbkNoYW5nZVxyXG4gICAgICAgIGZpZWxkUHJvcHMub25DaGFuZ2UgPSBvbkNoYW5nZTtcclxuXHJcbiAgICAgICAgLy8gVmFsdWVzIGxpc3QuXHJcbiAgICAgICAgY29uc3QgcmVmQ29udGFpbmVyID0gb3B0aW9ucy5yZWZDb250YWluZXIgfHwgZGVmLnJlZkNvbnRhaW5lciB8fCBjb250ZXh0LnN0YXRlLnJlZmVyZW5jZTtcclxuICAgICAgICAvLyBjYXNlIG5vIHByb3BzLnZhbHVlcyBhbmQgdGhlblxyXG4gICAgICAgIGlmICghKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3ZhbHVlcycpKSAmJiBpc09iamVjdChyZWZDb250YWluZXIpICYmIHJlZkNvbnRhaW5lci5oYXNPd25Qcm9wZXJ0eShsaXN0TmFtZSkpIHtcclxuICAgICAgICAgICAgYXNzaWduKGZpZWxkUHJvcHMsIHsgdmFsdWVzOiByZWZDb250YWluZXJbbGlzdE5hbWVdIHx8IFtdIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmllbGRQcm9wcztcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWVsZEJlaGF2aW91ck1peGluO1xyXG4iXX0=