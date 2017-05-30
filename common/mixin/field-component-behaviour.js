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
        var propsContainer = {
            name: name,
            label: def.label || options.label || name,
            ref: name,
            value: value,
            domain: options.domain || def.domain,
            error: context.state.error ? context.state.error[name] : undefined,
            locale: def.locale,
            format: def.format,
            onChange: function onChange(value) {
                return _this._wrappedOnChange(options.onChange, baseName, value);
            },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpZGVudGl0eSIsImQiLCJmaWVsZEJlaGF2aW91ck1peGluIiwiX21vZGlmaWVkRmllbGRzIiwiX2RlZmF1bHRPbkNoYW5nZSIsImZpZWxkbmFtZSIsInZhbHVlIiwic2V0U3RhdGUiLCJfYnVpbGRSZXNldFN0YXRlIiwiYnVpbGRSZXNldFN0YXRlIiwicmVkdWNlIiwiYWNjIiwiX3dyYXBwZWRPbkNoYW5nZSIsIm9uQ2hhbmdlIiwiaW5kZXhPZiIsInB1c2giLCJfYnVpbGRGaWVsZFByb3BzIiwibmFtZSIsIm9wdGlvbnMiLCJjb250ZXh0IiwiaXNFZGl0IiwidW5kZWZpbmVkIiwic3RhdGUiLCJkZWYiLCJkZWZpbml0aW9uIiwibGlzdE5hbWUiLCJoYXNMYWJlbCIsImJhc2VOYW1lIiwiZGVmaW5pdGlvblBhdGgiLCJwcm9wc0NvbnRhaW5lciIsImxhYmVsIiwicmVmIiwiZG9tYWluIiwiZXJyb3IiLCJsb2NhbGUiLCJmb3JtYXQiLCJpc1JlcXVpcmVkIiwicmVxdWlyZWQiLCJzdHlsZSIsInR5cGUiLCJ2YWxpZGF0b3IiLCJmb3JtYXR0ZXIiLCJ1bmZvcm1hdHRlciIsIkZpZWxkQ29tcG9uZW50IiwiSW5wdXRMYWJlbENvbXBvbmVudCIsIklucHV0Q29tcG9uZW50IiwiU2VsZWN0Q29tcG9uZW50IiwiVGV4dENvbXBvbmVudCIsIkRpc3BsYXlDb21wb25lbnQiLCJMYWJlbENvbXBvbmVudCIsIkF1dG9jb21wbGV0ZVNlbGVjdENvbXBvbmVudCIsIkF1dG9jb21wbGV0ZVRleHRDb21wb25lbnQiLCJmaWVsZFByb3BzIiwicmVmQ29udGFpbmVyIiwicmVmZXJlbmNlIiwiaGFzT3duUHJvcGVydHkiLCJ2YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUNBOzs7OztBQUtBLFNBQVNBLFFBQVQsQ0FBa0JDLENBQWxCLEVBQXFCO0FBQ2pCLFdBQU9BLENB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UixJQUF3QjlCLElBQUk4QixZQUE1QixJQUE0Q2xDLFFBQVFHLEtBQVIsQ0FBY2dDLFNBQS9FOztBQUVBO0FBQ0EsWUFBSSxDQUFFcEMsUUFBUXFDLGNBQVIsQ0FBdUIsUUFBdkIsQ0FBRixJQUF1QyxzQkFBU0YsWUFBVCxDQUF2QyxJQUFpRUEsYUFBYUUsY0FBYixDQUE0QjlCLFFBQTVCLENBQXJFLEVBQTRHO0FBQ3hHLHdDQUFPMkIsVUFBUCxFQUFtQixFQUFFSSxRQUFRSCxhQUFhNUIsUUFBYixLQUEwQixFQUFwQyxFQUFuQjtBQUNIO0FBQ0QsZUFBTzJCLFVBQVA7QUFDSDtBQWhHdUIsQ0FBNUI7O2tCQW9HZWxELG1CIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XHJcbmltcG9ydCB7aXNVbmRlZmluZWQsIGlzT2JqZWN0fSBmcm9tICdsb2Rhc2gnO1xyXG4vKipcclxuKiBJZGVudGl0eSBmdW5jdGlvblxyXG4qIEBwYXJhbSAge29iamVjdH0gZCAtIGRhdGEgdG8gdHJlYXQuXHJcbiogQHJldHVybiB7b2JqZWN0fSAgLSBUaGUgc2FtZSBvYmplY3QuXHJcbiovXHJcbmZ1bmN0aW9uIGlkZW50aXR5KGQpIHtcclxuICAgIHJldHVybiBkO1xyXG59XHJcblxyXG5jb25zdCBmaWVsZEJlaGF2aW91ck1peGluID0ge1xyXG4gICAgX21vZGlmaWVkRmllbGRzOiBbXSxcclxuICAgIF9kZWZhdWx0T25DaGFuZ2UoZmllbGRuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBbZmllbGRuYW1lXTogdmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIF9idWlsZFJlc2V0U3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYnVpbGRSZXNldFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUmVzZXRTdGF0ZSh0aGlzLl9tb2RpZmllZEZpZWxkcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RpZmllZEZpZWxkcy5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgYWNjW3ZhbHVlXSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuICAgIF93cmFwcGVkT25DaGFuZ2Uob25DaGFuZ2UsIGZpZWxkbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fbW9kaWZpZWRGaWVsZHMuaW5kZXhPZihmaWVsZG5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb2RpZmllZEZpZWxkcy5wdXNoKGZpZWxkbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvbkNoYW5nZSkge1xyXG4gICAgICAgICAgICBvbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdE9uQ2hhbmdlKGZpZWxkbmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQnVpbGQgdGhlIGZpZWxkIHByb3BlcnRpZXMuXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gcHJvcGVydHkgbmFtZS5cclxuICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBBbiBvYmplY3Qgd2hpY2ggY29udGFpbnMgYWxsIG9wdGlvbnMgZm9yIHRoZSBidWlsdCBvZiB0aGUgZmllbGRcclxuICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgLSBGdW5jdGlvbiBjb250ZXh0LCB0aGlzIGJ5IGRlZmF1bHQuXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIGNvbnN0cnVjdGVkIHByb3BzIGZvciB0aGUgZmllbGQuXHJcbiAgICAqL1xyXG4gICAgX2J1aWxkRmllbGRQcm9wcyhuYW1lLCBvcHRpb25zID0ge30sIGNvbnRleHQpIHtcclxuICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCB0aGlzO1xyXG4gICAgICAgIC8vUHJvcGVydGllcy5cclxuICAgICAgICBjb25zdCBpc0VkaXQgPSBvcHRpb25zLmlzRWRpdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5pc0VkaXQgOiBjb250ZXh0LnN0YXRlLmlzRWRpdDtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnMudmFsdWUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMudmFsdWUgOiBjb250ZXh0LnN0YXRlW25hbWVdO1xyXG4gICAgICAgIGNvbnN0IGRlZiA9IChjb250ZXh0LmRlZmluaXRpb24gJiYgY29udGV4dC5kZWZpbml0aW9uW25hbWVdKSA/IGNvbnRleHQuZGVmaW5pdGlvbltuYW1lXSA6IHt9O1xyXG4gICAgICAgIGNvbnN0IGxpc3ROYW1lID0gb3B0aW9ucy5saXN0TmFtZSB8fCBkZWYubGlzdE5hbWU7XHJcbiAgICAgICAgLy9oYXNMYWJlbFxyXG4gICAgICAgIGNvbnN0IGhhc0xhYmVsID0gKGZ1bmN0aW9uIGhhc0xhYmVsKCkge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5oYXNMYWJlbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5oYXNMYWJlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGVmLmhhc0xhYmVsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmhhc0xhYmVsO1xyXG4gICAgICAgICAgICB9IHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gKCkpO1xyXG4gICAgICAgIC8vQnVpbGQgYSBjb250YWluZXIgZm9yIHRoZSBwcm9wcy5cclxuICAgICAgICBjb25zdCBiYXNlTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgbmFtZSA9IG9wdGlvbnMubmFtZSB8fCBgJHt0aGlzLmRlZmluaXRpb25QYXRofS4ke25hbWV9YDtcclxuICAgICAgICBjb25zdCBwcm9wc0NvbnRhaW5lciA9IHtcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgbGFiZWw6IGRlZi5sYWJlbCB8fCBvcHRpb25zLmxhYmVsIHx8IG5hbWUsXHJcbiAgICAgICAgICAgIHJlZjogbmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICBkb21haW46IG9wdGlvbnMuZG9tYWluIHx8IGRlZi5kb21haW4sXHJcbiAgICAgICAgICAgIGVycm9yOiBjb250ZXh0LnN0YXRlLmVycm9yID8gY29udGV4dC5zdGF0ZS5lcnJvcltuYW1lXSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbG9jYWxlOiBkZWYubG9jYWxlLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IGRlZi5mb3JtYXQsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiAodmFsdWUpID0+IHRoaXMuX3dyYXBwZWRPbkNoYW5nZShvcHRpb25zLm9uQ2hhbmdlLCBiYXNlTmFtZSwgdmFsdWUpLFxyXG4gICAgICAgICAgICAvL01vZGVcclxuICAgICAgICAgICAgaXNFZGl0OiBpc0VkaXQsXHJcbiAgICAgICAgICAgIGhhc0xhYmVsOiBoYXNMYWJlbCxcclxuICAgICAgICAgICAgaXNSZXF1aXJlZDogKCFpc1VuZGVmaW5lZChvcHRpb25zLmlzUmVxdWlyZWQpICYmIG9wdGlvbnMuaXNSZXF1aXJlZCkgfHwgZGVmLmlzUmVxdWlyZWQgfHwgZGVmLnJlcXVpcmVkLCAvL2xlZ2FjeSBvbiByZXF1aXJlZCBvbiBtb2RlbCBnZW5lcmF0aW9uLlxyXG4gICAgICAgICAgICAvL1N0eWxlXHJcbiAgICAgICAgICAgIHN0eWxlOiBvcHRpb25zLnN0eWxlLFxyXG4gICAgICAgICAgICAvLyBUeXBlXHJcbiAgICAgICAgICAgIHR5cGU6IGRlZi50eXBlLFxyXG4gICAgICAgICAgICAvL01ldGhvZHNcclxuICAgICAgICAgICAgdmFsaWRhdG9yOiBkZWYudmFsaWRhdG9yLFxyXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGRlZi5mb3JtYXR0ZXIgfHwgaWRlbnRpdHksXHJcbiAgICAgICAgICAgIHVuZm9ybWF0dGVyOiBkZWYudW5mb3JtYXR0ZXIgfHwgaWRlbnRpdHksXHJcbiAgICAgICAgICAgIC8vQ29tcG9uZW50XHJcbiAgICAgICAgICAgIEZpZWxkQ29tcG9uZW50OiBkZWYuRmllbGRDb21wb25lbnQsXHJcbiAgICAgICAgICAgIElucHV0TGFiZWxDb21wb25lbnQ6IGRlZi5JbnB1dExhYmVsQ29tcG9uZW50LFxyXG4gICAgICAgICAgICBJbnB1dENvbXBvbmVudDogZGVmLklucHV0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICBTZWxlY3RDb21wb25lbnQ6IGRlZi5TZWxlY3RDb21wb25lbnQsXHJcbiAgICAgICAgICAgIFRleHRDb21wb25lbnQ6IGRlZi5UZXh0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICBEaXNwbGF5Q29tcG9uZW50OiBkZWYuRGlzcGxheUNvbXBvbmVudCxcclxuICAgICAgICAgICAgTGFiZWxDb21wb25lbnQ6IGRlZi5MYWJlbENvbXBvbmVudCxcclxuICAgICAgICAgICAgQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50OiBkZWYuQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICBBdXRvY29tcGxldGVUZXh0Q29tcG9uZW50OiBkZWYuQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCxcclxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucy5vcHRpb25zIHx8IGRlZi5vcHRpb25zIC8vQWRkIG9wdGlvbnMgdG8gdGhlIGZpZWxkc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9FeHRlbmQgdGhlIG9wdGlvbnMgb2JqZWN0IGluIG9yZGVyIHRvIGJlIGFibGUgdG8gc3BlY2lmeSBtb3JlIG9wdGlvbnMgdG8gdGhpZSBzb24ncyBjb21wb25lbnQuXHJcbiAgICAgICAgbGV0IGZpZWxkUHJvcHMgPSBhc3NpZ24ocHJvcHNDb250YWluZXIsIG9wdGlvbnMsIG9wdGlvbnMub3B0aW9ucyB8fCBkZWYub3B0aW9ucyk7XHJcbiAgICAgICAgLy8gVmFsdWVzIGxpc3QuXHJcbiAgICAgICAgY29uc3QgcmVmQ29udGFpbmVyID0gb3B0aW9ucy5yZWZDb250YWluZXIgfHwgZGVmLnJlZkNvbnRhaW5lciB8fCBjb250ZXh0LnN0YXRlLnJlZmVyZW5jZTtcclxuXHJcbiAgICAgICAgLy8gY2FzZSBubyBwcm9wcy52YWx1ZXMgYW5kIHRoZW5cclxuICAgICAgICBpZiAoIShvcHRpb25zLmhhc093blByb3BlcnR5KCd2YWx1ZXMnKSkgJiYgaXNPYmplY3QocmVmQ29udGFpbmVyKSAmJiByZWZDb250YWluZXIuaGFzT3duUHJvcGVydHkobGlzdE5hbWUpKSB7XHJcbiAgICAgICAgICAgIGFzc2lnbihmaWVsZFByb3BzLCB7IHZhbHVlczogcmVmQ29udGFpbmVyW2xpc3ROYW1lXSB8fCBbXSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpZWxkUHJvcHM7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmllbGRCZWhhdmlvdXJNaXhpbjtcclxuIl19