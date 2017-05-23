'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Dependencies

// Components


// Mixins


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _find2 = require('lodash/collection/find');

var _find3 = _interopRequireDefault(_find2);

var _result = require('lodash/object/result');

var _result2 = _interopRequireDefault(_result);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _isReactClassComponent = require('../../../utils/is-react-class-component');

var _field = require('../../../components/input/autocomplete-select/field');

var _field2 = _interopRequireDefault(_field);

var _field3 = require('../../../components/input/autocomplete-text/field');

var _field4 = _interopRequireDefault(_field3);

var _text = require('../../../components/input/text');

var _text2 = _interopRequireDefault(_text);

var _text3 = require('../../../components/display/text');

var _text4 = _interopRequireDefault(_text3);

var _select = require('../../../components/input/select');

var _select2 = _interopRequireDefault(_select);

var _label = require('../../../components/label');

var _label2 = _interopRequireDefault(_label);

var _field5 = require('../../autocomplete/field');

var _fieldGridBehaviour = require('../../mixin/field-grid-behaviour');

var _fieldGridBehaviour2 = _interopRequireDefault(_fieldGridBehaviour);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fieldBuiltInComponentsMixin = {
    mixins: [_fieldGridBehaviour2.default],
    getDefaultProps: function getDefaultProps() {
        return {
            /**
            * Does the component has a Label.
            * @type {Boolean}
            */
            hasLabel: true,
            /**
            * Redefine complety the component.
            * @type {Object}
            */
            FieldComponent: undefined,
            /**
            * Redefine only the input and label component.
            * @type {Object}
            */
            InputLabelComponent: undefined,
            /**
            * Component for the input.
            * @type {Object}
            */
            InputComponent: _text2.default,
            /**
             * Autocomplete component
             * @type {Object}
             */
            AutocompleteComponent: _field5.component,
            AutocompleteSelectComponent: _field2.default,
            AutocompleteTextComponent: _field4.default,
            /**
            * Component for the select.
            * @type {Object}
            */
            SelectComponent: _select2.default,
            /**
            * Component for the display.
            * @type {Object}
            */
            DisplayComponent: _text4.default,
            /**
            * Component for the label.
            * @type {Object}
            */
            LabelComponent: _label2.default
        };
    },

    /** @inheriteDoc */
    propTypes: {
        AutocompleteComponent: _react.PropTypes.func,
        AutocompleteSelectComponent: _react.PropTypes.func,
        DisplayComponent: _react.PropTypes.func,
        FieldComponent: _react.PropTypes.func,
        InputComponent: _react.PropTypes.func,
        InputLabelComponent: _react.PropTypes.func,
        LabelComponent: _react.PropTypes.func,
        SelectComponent: _react.PropTypes.func,
        hasLabel: _react.PropTypes.bool,
        labelSize: _react.PropTypes.number
    },
    _buildStyle: function _buildStyle() {
        var style = this.props.style;

        style = style || {};
        style.className = style && style.className ? style.className : '';
        return style;
    },

    /**
    * Render the label part of the component.
    * @returns {Component} - The builded label component.
    */
    label: function label() {
        var _props = this.props,
            name = _props.name,
            label = _props.label,
            LabelComponent = _props.LabelComponent,
            domain = _props.domain,
            isRequired = _props.isRequired;

        return _react2.default.createElement(
            'div',
            {
                className: '' + this._getLabelGridClassName(),
                'data-focus': 'field-label-container'
            },
            _react2.default.createElement(LabelComponent, {
                domain: domain,
                name: name,
                text: label,
                isRequired: isRequired
            })
        );
    },

    /**
    * Rendet the input part of the component.
    * @return {Component} - The constructed input component.
    */
    input: function input() {
        var _props2 = this.props,
            id = _props2.name,
            placeholder = _props2.placeholder;
        var _state = this.state,
            value = _state.value,
            error = _state.error;
        var onChange = this.onInputChange;

        var inputBuildedProps = _extends({}, this.props, {
            id: id,
            onChange: onChange,
            value: value,
            error: error,
            placeholder: placeholder
        });
        var finalInputProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(this.props.InputComponent, inputBuildedProps, _isReactClassComponent.INPUT);
        return _react2.default.createElement(this.props.InputComponent, finalInputProps);
    },

    /**
     * Autocomplete render
     * @return {JSX} rendered component
     */
    autocomplete: function autocomplete() {
        var _props3 = this.props,
            id = _props3.name,
            placeholder = _props3.placeholder;
        var _state2 = this.state,
            value = _state2.value,
            error = _state2.error;
        var onChange = this.onInputChange;

        var inputBuildedProps = _extends({}, this.props, {
            id: id,
            onChange: onChange,
            value: value,
            error: error,
            placeholder: placeholder
        });
        var finalInputProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(this.props.AutocompleteComponent, inputBuildedProps, _isReactClassComponent.INPUT);
        return _react2.default.createElement(this.props.AutocompleteComponent, finalInputProps);
    },
    autocompleteSelect: function autocompleteSelect() {
        var _props4 = this.props,
            id = _props4.name,
            placeHolder = _props4.label;
        var _state3 = this.state,
            value = _state3.value,
            error = _state3.error;
        var onChange = this.onInputChange;

        var inputBuildedProps = _extends({}, this.props, {
            id: id,
            onChange: onChange,
            value: value,
            error: error,
            placeHolder: placeHolder
        });
        var finalInputProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(this.props.AutocompleteSelectComponent, inputBuildedProps, _isReactClassComponent.INPUT);
        return _react2.default.createElement(this.props.AutocompleteSelectComponent, finalInputProps);
    },
    autocompleteText: function autocompleteText() {
        var _props5 = this.props,
            id = _props5.name,
            placeHolder = _props5.label;
        var _state4 = this.state,
            value = _state4.value,
            error = _state4.error;
        var onChange = this.onInputChange;

        var inputBuildedProps = _extends({}, this.props, {
            id: id,
            onChange: onChange,
            value: value,
            error: error,
            placeHolder: placeHolder
        });
        var finalInputProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(this.props.AutocompleteTextComponent, inputBuildedProps, _isReactClassComponent.INPUT);
        return _react2.default.createElement(this.props.AutocompleteTextComponent, finalInputProps);
    },

    /**
     * Build a select component depending on the domain, definition and props.
     * @return {Component} - The builded select component.
     */
    select: function select() {
        var _state5 = this.state,
            error = _state5.error,
            value = _state5.value;

        var buildedSelectProps = _extends({}, this.props, {
            value: value,
            style: this._buildStyle(),
            onChange: this.onInputChange,
            error: error
        });
        var finalSelectProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(this.props.SelectComponent, buildedSelectProps, _isReactClassComponent.INPUT);
        return _react2.default.createElement(this.props.SelectComponent, finalSelectProps);
    },

    /**
    * Render the display part of the component.
    * @return {object} - The display part of the compoennt if the mode is not edit.
    */
    display: function display() {
        var value = this.state.value;
        var _props6 = this.props,
            name = _props6.name,
            valueKey = _props6.valueKey,
            labelKey = _props6.labelKey,
            values = _props6.values;

        var _processValue = values ? (0, _result2.default)((0, _find3.default)(values, _defineProperty({}, valueKey || 'code', value)), labelKey || 'label') : value;
        var buildedDislplayProps = _extends({}, this.props, {
            id: name,
            style: this._buildStyle(),
            value: _processValue
        });
        var finalDisplayProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(this.props.DisplayComponent, buildedDislplayProps, _isReactClassComponent.DISPLAY);
        return _react2.default.createElement(this.props.DisplayComponent, finalDisplayProps);
    },

    /**
    * Render the error part of the component.
    * @return {object} - The error part of the component.
    */
    error: function error() {
        var error = this.state.error;

        if (error) {
            return _react2.default.createElement(
                'span',
                { className: 'mdl-textfield__error' },
                error
            );
        }
    },

    /**
    * Render the help component.
    * @return {object} - The help part of the component.
    */
    help: function help() {
        var _props7 = this.props,
            help = _props7.help,
            name = _props7.name;

        if (help) {
            return _react2.default.createElement(
                'label',
                {
                    className: 'mdl-textfield__label',
                    htmFor: '' + name
                },
                help
            );
        }
    },

    /**
     * Render the field component if it is overriden in the component definition.
     * @return {Component} - The builded field component.
     */
    _renderFieldComponent: function _renderFieldComponent() {
        var FieldComponent = this.props.FieldComponent || this.props.InputLabelComponent;
        var _state6 = this.state,
            value = _state6.value,
            error = _state6.error;

        var buildedProps = _extends({}, this.props, {
            id: this.props.name,
            value: value,
            error: error,
            onChange: this.onInputChange
        });
        var finalBuildedProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(this.props.FieldComponent, buildedProps, _isReactClassComponent.INPUT);
        return _react2.default.createElement(FieldComponent, finalBuildedProps);
    }
};

exports.default = fieldBuiltInComponentsMixin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJmaWVsZEJ1aWx0SW5Db21wb25lbnRzTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJoYXNMYWJlbCIsIkZpZWxkQ29tcG9uZW50IiwidW5kZWZpbmVkIiwiSW5wdXRMYWJlbENvbXBvbmVudCIsIklucHV0Q29tcG9uZW50IiwiQXV0b2NvbXBsZXRlQ29tcG9uZW50IiwiQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50IiwiQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCIsIlNlbGVjdENvbXBvbmVudCIsIkRpc3BsYXlDb21wb25lbnQiLCJMYWJlbENvbXBvbmVudCIsInByb3BUeXBlcyIsImZ1bmMiLCJib29sIiwibGFiZWxTaXplIiwibnVtYmVyIiwiX2J1aWxkU3R5bGUiLCJzdHlsZSIsInByb3BzIiwiY2xhc3NOYW1lIiwibGFiZWwiLCJuYW1lIiwiZG9tYWluIiwiaXNSZXF1aXJlZCIsIl9nZXRMYWJlbEdyaWRDbGFzc05hbWUiLCJpbnB1dCIsImlkIiwicGxhY2Vob2xkZXIiLCJzdGF0ZSIsInZhbHVlIiwiZXJyb3IiLCJvbkNoYW5nZSIsIm9uSW5wdXRDaGFuZ2UiLCJpbnB1dEJ1aWxkZWRQcm9wcyIsImZpbmFsSW5wdXRQcm9wcyIsImF1dG9jb21wbGV0ZSIsImF1dG9jb21wbGV0ZVNlbGVjdCIsInBsYWNlSG9sZGVyIiwiYXV0b2NvbXBsZXRlVGV4dCIsInNlbGVjdCIsImJ1aWxkZWRTZWxlY3RQcm9wcyIsImZpbmFsU2VsZWN0UHJvcHMiLCJkaXNwbGF5IiwidmFsdWVLZXkiLCJsYWJlbEtleSIsInZhbHVlcyIsIl9wcm9jZXNzVmFsdWUiLCJidWlsZGVkRGlzbHBsYXlQcm9wcyIsImZpbmFsRGlzcGxheVByb3BzIiwiaGVscCIsIl9yZW5kZXJGaWVsZENvbXBvbmVudCIsImJ1aWxkZWRQcm9wcyIsImZpbmFsQnVpbGRlZFByb3BzIl0sIm1hcHBpbmdzIjoi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LG1CQUEvRDtBQURvQixzQkFFRyxLQUFLeUIsS0FGUjtBQUFBLFlBRWJDLEtBRmEsV0FFYkEsS0FGYTtBQUFBLFlBRU5DLEtBRk0sV0FFTkEsS0FGTTs7QUFHcEIsWUFBTXFCLDRCQUNDLEtBQUtqQyxLQUROO0FBRUZRLGdCQUFJLEtBQUtSLEtBQUwsQ0FBV0csSUFGYjtBQUdGUSxtQkFBT0EsS0FITDtBQUlGQyxtQkFBT0EsS0FKTDtBQUtGQyxzQkFBVSxLQUFLQztBQUxiLFVBQU47QUFPQSxZQUFNb0Isb0JBQW9CLG1EQUF1QixLQUFLbEMsS0FBTCxDQUFXakIsY0FBbEMsRUFBa0RrRCxZQUFsRCwrQkFBMUI7QUFDQSxlQUFPLDhCQUFDLGNBQUQsRUFBb0JDLGlCQUFwQixDQUFQO0FBQ0g7QUEzTytCLENBQXBDOztrQkE4T2V2RCwyQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBmaW5kIGZyb20gJ2xvZGFzaC9jb2xsZWN0aW9uL2ZpbmQnO1xyXG5pbXBvcnQgcmVzdWx0IGZyb20gJ2xvZGFzaC9vYmplY3QvcmVzdWx0JztcclxuaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcclxuaW1wb3J0IHsgYWRkUmVmVG9Qcm9wc0lmTm90UHVyZSwgSU5QVVQsIERJU1BMQVkgfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcy1yZWFjdC1jbGFzcy1jb21wb25lbnQnO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5pbXBvcnQgQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvYXV0b2NvbXBsZXRlLXNlbGVjdC9maWVsZCc7XHJcbmltcG9ydCBBdXRvY29tcGxldGVUZXh0Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvYXV0b2NvbXBsZXRlLXRleHQvZmllbGQnO1xyXG5pbXBvcnQgSW5wdXRUZXh0IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvdGV4dCc7XHJcbmltcG9ydCBEaXNwbGF5VGV4dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2Rpc3BsYXkvdGV4dCc7XHJcbmltcG9ydCBTZWxlY3RDbGFzc2ljIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvc2VsZWN0JztcclxuaW1wb3J0IExhYmVsIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbGFiZWwnO1xyXG5pbXBvcnQgeyBjb21wb25lbnQgYXMgQXV0b2NvbXBsZXRlIH0gZnJvbSAnLi4vLi4vYXV0b2NvbXBsZXRlL2ZpZWxkJztcclxuXHJcblxyXG4vLyBNaXhpbnNcclxuaW1wb3J0IGZpZWxkR3JpZEJlaGF2aW91ck1peGluIGZyb20gJy4uLy4uL21peGluL2ZpZWxkLWdyaWQtYmVoYXZpb3VyJztcclxuXHJcbmNvbnN0IGZpZWxkQnVpbHRJbkNvbXBvbmVudHNNaXhpbiA9IHtcclxuICAgIG1peGluczogW2ZpZWxkR3JpZEJlaGF2aW91ck1peGluXSxcclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBEb2VzIHRoZSBjb21wb25lbnQgaGFzIGEgTGFiZWwuXHJcbiAgICAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGhhc0xhYmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBSZWRlZmluZSBjb21wbGV0eSB0aGUgY29tcG9uZW50LlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIEZpZWxkQ29tcG9uZW50OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIFJlZGVmaW5lIG9ubHkgdGhlIGlucHV0IGFuZCBsYWJlbCBjb21wb25lbnQuXHJcbiAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgSW5wdXRMYWJlbENvbXBvbmVudDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBDb21wb25lbnQgZm9yIHRoZSBpbnB1dC5cclxuICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBJbnB1dENvbXBvbmVudDogSW5wdXRUZXh0LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQXV0b2NvbXBsZXRlIGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgQXV0b2NvbXBsZXRlQ29tcG9uZW50OiBBdXRvY29tcGxldGUsXHJcbiAgICAgICAgICAgIEF1dG9jb21wbGV0ZVNlbGVjdENvbXBvbmVudCxcclxuICAgICAgICAgICAgQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogQ29tcG9uZW50IGZvciB0aGUgc2VsZWN0LlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIFNlbGVjdENvbXBvbmVudDogU2VsZWN0Q2xhc3NpYyxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogQ29tcG9uZW50IGZvciB0aGUgZGlzcGxheS5cclxuICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBEaXNwbGF5Q29tcG9uZW50OiBEaXNwbGF5VGV4dCxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogQ29tcG9uZW50IGZvciB0aGUgbGFiZWwuXHJcbiAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgTGFiZWxDb21wb25lbnQ6IExhYmVsXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRlRG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBBdXRvY29tcGxldGVDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIEF1dG9jb21wbGV0ZVNlbGVjdENvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgRGlzcGxheUNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgRmllbGRDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIElucHV0Q29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBJbnB1dExhYmVsQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBMYWJlbENvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgU2VsZWN0Q29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBoYXNMYWJlbDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgbGFiZWxTaXplOiBQcm9wVHlwZXMubnVtYmVyXHJcbiAgICB9LFxyXG4gICAgX2J1aWxkU3R5bGUoKSB7XHJcbiAgICAgICAgbGV0IHtzdHlsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHN0eWxlID0gc3R5bGUgfHwge307XHJcbiAgICAgICAgc3R5bGUuY2xhc3NOYW1lID0gc3R5bGUgJiYgc3R5bGUuY2xhc3NOYW1lID8gc3R5bGUuY2xhc3NOYW1lIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGxhYmVsIHBhcnQgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybnMge0NvbXBvbmVudH0gLSBUaGUgYnVpbGRlZCBsYWJlbCBjb21wb25lbnQuXHJcbiAgICAqL1xyXG4gICAgbGFiZWwoKSB7XHJcbiAgICAgICAgY29uc3Qge25hbWUsIGxhYmVsLCBMYWJlbENvbXBvbmVudCwgZG9tYWluLCBpc1JlcXVpcmVkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHt0aGlzLl9nZXRMYWJlbEdyaWRDbGFzc05hbWUoKX1gfVxyXG4gICAgICAgICAgICAgICAgZGF0YS1mb2N1cz0nZmllbGQtbGFiZWwtY29udGFpbmVyJ1xyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPExhYmVsQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluPXtkb21haW59XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cclxuICAgICAgICAgICAgICAgICAgICB0ZXh0PXtsYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICBpc1JlcXVpcmVkPXtpc1JlcXVpcmVkfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRldCB0aGUgaW5wdXQgcGFydCBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGNvbnN0cnVjdGVkIGlucHV0IGNvbXBvbmVudC5cclxuICAgICovXHJcbiAgICBpbnB1dCgpIHtcclxuICAgICAgICBjb25zdCB7bmFtZTogaWQsIHBsYWNlaG9sZGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbklucHV0Q2hhbmdlOiBvbkNoYW5nZX0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGlucHV0QnVpbGRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsSW5wdXRQcm9wcyA9IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUodGhpcy5wcm9wcy5JbnB1dENvbXBvbmVudCwgaW5wdXRCdWlsZGVkUHJvcHMsIElOUFVUKVxyXG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5JbnB1dENvbXBvbmVudCB7Li4uZmluYWxJbnB1dFByb3BzfSAvPjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEF1dG9jb21wbGV0ZSByZW5kZXJcclxuICAgICAqIEByZXR1cm4ge0pTWH0gcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGF1dG9jb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zdCB7bmFtZTogaWQsIHBsYWNlaG9sZGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbklucHV0Q2hhbmdlOiBvbkNoYW5nZX0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGlucHV0QnVpbGRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsSW5wdXRQcm9wcyA9IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUodGhpcy5wcm9wcy5BdXRvY29tcGxldGVDb21wb25lbnQsIGlucHV0QnVpbGRlZFByb3BzLCBJTlBVVCk7XHJcbiAgICAgICAgcmV0dXJuIDx0aGlzLnByb3BzLkF1dG9jb21wbGV0ZUNvbXBvbmVudCB7Li4uZmluYWxJbnB1dFByb3BzfSAvPjtcclxuICAgIH0sXHJcbiAgICBhdXRvY29tcGxldGVTZWxlY3QoKSB7XHJcbiAgICAgICAgY29uc3Qge25hbWU6IGlkLCBsYWJlbDogcGxhY2VIb2xkZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmFsdWUsIGVycm9yfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge29uSW5wdXRDaGFuZ2U6IG9uQ2hhbmdlfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRCdWlsZGVkUHJvcHMgPSB7XHJcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBvbkNoYW5nZSxcclxuICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgIGVycm9yLFxyXG4gICAgICAgICAgICBwbGFjZUhvbGRlclxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZmluYWxJbnB1dFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZSh0aGlzLnByb3BzLkF1dG9jb21wbGV0ZVNlbGVjdENvbXBvbmVudCwgaW5wdXRCdWlsZGVkUHJvcHMsIElOUFVUKVxyXG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5BdXRvY29tcGxldGVTZWxlY3RDb21wb25lbnQgey4uLmZpbmFsSW5wdXRQcm9wc30gLz47XHJcbiAgICB9LFxyXG4gICAgYXV0b2NvbXBsZXRlVGV4dCgpIHtcclxuICAgICAgICBjb25zdCB7bmFtZTogaWQsIGxhYmVsOiBwbGFjZUhvbGRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZSwgZXJyb3J9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7b25JbnB1dENoYW5nZTogb25DaGFuZ2V9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBpbnB1dEJ1aWxkZWRQcm9wcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlLFxyXG4gICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICAgIHBsYWNlSG9sZGVyXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBmaW5hbElucHV0UHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKHRoaXMucHJvcHMuQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCwgaW5wdXRCdWlsZGVkUHJvcHMsIElOUFVUKVxyXG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5BdXRvY29tcGxldGVUZXh0Q29tcG9uZW50IHsuLi5maW5hbElucHV0UHJvcHN9IC8+O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQnVpbGQgYSBzZWxlY3QgY29tcG9uZW50IGRlcGVuZGluZyBvbiB0aGUgZG9tYWluLCBkZWZpbml0aW9uIGFuZCBwcm9wcy5cclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgYnVpbGRlZCBzZWxlY3QgY29tcG9uZW50LlxyXG4gICAgICovXHJcbiAgICBzZWxlY3QoKSB7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yLCB2YWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkZWRTZWxlY3RQcm9wcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcclxuICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLl9idWlsZFN0eWxlKCksXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uSW5wdXRDaGFuZ2UsXHJcbiAgICAgICAgICAgIGVycm9yXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBmaW5hbFNlbGVjdFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZSh0aGlzLnByb3BzLlNlbGVjdENvbXBvbmVudCwgYnVpbGRlZFNlbGVjdFByb3BzLCBJTlBVVCk7XHJcbiAgICAgICAgcmV0dXJuIDx0aGlzLnByb3BzLlNlbGVjdENvbXBvbmVudCB7Li4uZmluYWxTZWxlY3RQcm9wc30gLz47XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgZGlzcGxheSBwYXJ0IG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZGlzcGxheSBwYXJ0IG9mIHRoZSBjb21wb2VubnQgaWYgdGhlIG1vZGUgaXMgbm90IGVkaXQuXHJcbiAgICAqL1xyXG4gICAgZGlzcGxheSgpIHtcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7bmFtZSwgdmFsdWVLZXksIGxhYmVsS2V5LCB2YWx1ZXN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBfcHJvY2Vzc1ZhbHVlID0gdmFsdWVzID8gcmVzdWx0KGZpbmQodmFsdWVzLCB7IFt2YWx1ZUtleSB8fCAnY29kZSddOiB2YWx1ZSB9KSwgbGFiZWxLZXkgfHwgJ2xhYmVsJykgOiB2YWx1ZTtcclxuICAgICAgICBjb25zdCBidWlsZGVkRGlzbHBsYXlQcm9wcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcclxuICAgICAgICAgICAgaWQ6IG5hbWUsXHJcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLl9idWlsZFN0eWxlKCksXHJcbiAgICAgICAgICAgIHZhbHVlOiBfcHJvY2Vzc1ZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBmaW5hbERpc3BsYXlQcm9wcyA9IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUodGhpcy5wcm9wcy5EaXNwbGF5Q29tcG9uZW50LCBidWlsZGVkRGlzbHBsYXlQcm9wcywgRElTUExBWSk7XHJcbiAgICAgICAgcmV0dXJuIDx0aGlzLnByb3BzLkRpc3BsYXlDb21wb25lbnQgey4uLmZpbmFsRGlzcGxheVByb3BzfSAvPjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBlcnJvciBwYXJ0IG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgZXJyb3IgcGFydCBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKi9cclxuICAgIGVycm9yKCkge1xyXG4gICAgICAgIGxldCB7ZXJyb3J9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fZXJyb3InPlxyXG4gICAgICAgICAgICAgICAgICAgIHtlcnJvcn1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgaGVscCBjb21wb25lbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgaGVscCBwYXJ0IG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqL1xyXG4gICAgaGVscCgpIHtcclxuICAgICAgICBsZXQge2hlbHAsIG5hbWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoaGVscCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCdcclxuICAgICAgICAgICAgICAgICAgICBodG1Gb3I9e2Ake25hbWV9YH1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge2hlbHB9XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgZmllbGQgY29tcG9uZW50IGlmIGl0IGlzIG92ZXJyaWRlbiBpbiB0aGUgY29tcG9uZW50IGRlZmluaXRpb24uXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGJ1aWxkZWQgZmllbGQgY29tcG9uZW50LlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyRmllbGRDb21wb25lbnQoKSB7XHJcbiAgICAgICAgY29uc3QgRmllbGRDb21wb25lbnQgPSB0aGlzLnByb3BzLkZpZWxkQ29tcG9uZW50IHx8IHRoaXMucHJvcHMuSW5wdXRMYWJlbENvbXBvbmVudDtcclxuICAgICAgICBjb25zdCB7dmFsdWUsIGVycm9yfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgYnVpbGRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxyXG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5uYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcixcclxuICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25JbnB1dENoYW5nZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZmluYWxCdWlsZGVkUHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKHRoaXMucHJvcHMuRmllbGRDb21wb25lbnQsIGJ1aWxkZWRQcm9wcywgSU5QVVQpO1xyXG4gICAgICAgIHJldHVybiA8RmllbGRDb21wb25lbnQgey4uLmZpbmFsQnVpbGRlZFByb3BzfSAvPjtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZpZWxkQnVpbHRJbkNvbXBvbmVudHNNaXhpbjtcclxuIl19