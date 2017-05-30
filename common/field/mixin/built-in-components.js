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
            isEdit = _props.isEdit,
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
                isEdit: isEdit,
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
        var finalBuildedProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(FieldComponent, buildedProps, _isReactClassComponent.INPUT);
        return _react2.default.createElement(FieldComponent, finalBuildedProps);
    }
};

exports.default = fieldBuiltInComponentsMixin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJmaWVsZEJ1aWx0SW5Db21wb25lbnRzTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJoYXNMYWJlbCIsIkZpZWxkQ29tcG9uZW50IiwidW5kZWZpbmVkIiwiSW5wdXRMYWJlbENvbXBvbmVudCIsIklucHV0Q29tcG9uZW50IiwiQXV0b2NvbXBsZXRlQ29tcG9uZW50IiwiQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50IiwiQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCIsIlNlbGVjdENvbXBvbmVudCIsIkRpc3BsYXlDb21wb25lbnQiLCJMYWJlbENvbXBvbmVudCIsInByb3BUeXBlcyIsImZ1bmMiLCJib29sIiwibGFiZWxTaXplIiwibnVtYmVyIiwiX2J1aWxkU3R5bGUiLCJzdHlsZSIsInByb3BzIiwiY2xhc3NOYW1lIiwibGFiZWwiLCJuYW1lIiwiZG9tYWluIiwiaXNFZGl0IiwiaXNSZXF1aXJlZCIsIl9nZXRMYWJlbEdyaWRDbGFzc05hbWUiLCJpbnB1dCIsImlkIiwicGxhY2Vob2xkZXIiLCJzdGF0ZSIsInZhbHVlIiwiZXJyb3IiLCJvbkNoYW5nZSIsIm9uSW5wdXRDaGFuZ2UiLCJpbnB1dEJ1aWxkZWRQcm9wcyIsImZpbmFsSW5wdXRQcm9wcyIsImF1dG9jb21wbGV0ZSIsImF1dG9jb21wbGV0ZVNlbGVjdCIsInBsYWNlSG9sZGVyIiwiYXV0b2NvbXBsZXRlVGV4dCIsInNlbGVjdCIsImJ1aWxkZWRTZWxlY3RQcm9wcyIsImZpbmFsU2VsZWN0UHJvcHMiLCJkaXNwbGF5IiwidmFsdWVLZXkiLCJsYWJlbEtleSIsInZhbHVlcyIsIl9wcm9jZXNzVmFsdWUiLCJidWlsZGVkRGlzbHBsYXlQcm9wcyIsImZpbmFsRGlzcGxheVByb3BzIiwiaGVscCIsIl9yZW5kZXJGaWVsZENvbXBvbmVudCIsImJ1aWxkZWRQcm9wcyIsImZpbmFsQnVpbGRlZFByb3BzIl0sIm1h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WUFBTWxELGlCQUFpQixLQUFLaUIsS0FBTCxDQUFXakIsY0FBWCxJQUE2QixLQUFLaUIsS0FBTCxDQUFXZixtQkFBL0Q7QUFEb0Isc0JBRUcsS0FBSzBCLEtBRlI7QUFBQSxZQUViQyxLQUZhLFdBRWJBLEtBRmE7QUFBQSxZQUVOQyxLQUZNLFdBRU5BLEtBRk07O0FBR3BCLFlBQU1xQiw0QkFDQyxLQUFLbEMsS0FETjtBQUVGUyxnQkFBSSxLQUFLVCxLQUFMLENBQVdHLElBRmI7QUFHRlMsbUJBQU9BLEtBSEw7QUFJRkMsbUJBQU9BLEtBSkw7QUFLRkMsc0JBQVUsS0FBS0M7QUFMYixVQUFOO0FBT0EsWUFBTW9CLG9CQUFvQixtREFBdUJwRCxjQUF2QixFQUF1Q21ELFlBQXZDLCtCQUExQjtBQUNBLGVBQU8sOEJBQUMsY0FBRCxFQUFvQkMsaUJBQXBCLENBQVA7QUFDSDtBQTVPK0IsQ0FBcEM7O2tCQStPZXhELDJCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBmaW5kIGZyb20gJ2xvZGFzaC9jb2xsZWN0aW9uL2ZpbmQnO1xyXG5pbXBvcnQgcmVzdWx0IGZyb20gJ2xvZGFzaC9vYmplY3QvcmVzdWx0JztcclxuaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcclxuaW1wb3J0IHthZGRSZWZUb1Byb3BzSWZOb3RQdXJlLCBJTlBVVCwgRElTUExBWX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50JztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuaW1wb3J0IEF1dG9jb21wbGV0ZVNlbGVjdENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2lucHV0L2F1dG9jb21wbGV0ZS1zZWxlY3QvZmllbGQnO1xyXG5pbXBvcnQgQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2lucHV0L2F1dG9jb21wbGV0ZS10ZXh0L2ZpZWxkJztcclxuaW1wb3J0IElucHV0VGV4dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2lucHV0L3RleHQnO1xyXG5pbXBvcnQgRGlzcGxheVRleHQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kaXNwbGF5L3RleHQnO1xyXG5pbXBvcnQgU2VsZWN0Q2xhc3NpYyBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2lucHV0L3NlbGVjdCc7XHJcbmltcG9ydCBMYWJlbCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2xhYmVsJztcclxuaW1wb3J0IHtjb21wb25lbnQgYXMgQXV0b2NvbXBsZXRlfSBmcm9tICcuLi8uLi9hdXRvY29tcGxldGUvZmllbGQnO1xyXG5cclxuXHJcbi8vIE1peGluc1xyXG5pbXBvcnQgZmllbGRHcmlkQmVoYXZpb3VyTWl4aW4gZnJvbSAnLi4vLi4vbWl4aW4vZmllbGQtZ3JpZC1iZWhhdmlvdXInO1xyXG5cclxuY29uc3QgZmllbGRCdWlsdEluQ29tcG9uZW50c01peGluID0ge1xyXG4gICAgbWl4aW5zOiBbZmllbGRHcmlkQmVoYXZpb3VyTWl4aW5dLFxyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIERvZXMgdGhlIGNvbXBvbmVudCBoYXMgYSBMYWJlbC5cclxuICAgICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaGFzTGFiZWw6IHRydWUsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIFJlZGVmaW5lIGNvbXBsZXR5IHRoZSBjb21wb25lbnQuXHJcbiAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgRmllbGRDb21wb25lbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogUmVkZWZpbmUgb25seSB0aGUgaW5wdXQgYW5kIGxhYmVsIGNvbXBvbmVudC5cclxuICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBJbnB1dExhYmVsQ29tcG9uZW50OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIENvbXBvbmVudCBmb3IgdGhlIGlucHV0LlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIElucHV0Q29tcG9uZW50OiBJbnB1dFRleHQsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBdXRvY29tcGxldGUgY29tcG9uZW50XHJcbiAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBBdXRvY29tcGxldGVDb21wb25lbnQ6IEF1dG9jb21wbGV0ZSxcclxuICAgICAgICAgICAgQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICBBdXRvY29tcGxldGVUZXh0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBDb21wb25lbnQgZm9yIHRoZSBzZWxlY3QuXHJcbiAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgU2VsZWN0Q29tcG9uZW50OiBTZWxlY3RDbGFzc2ljLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBDb21wb25lbnQgZm9yIHRoZSBkaXNwbGF5LlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIERpc3BsYXlDb21wb25lbnQ6IERpc3BsYXlUZXh0LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBDb21wb25lbnQgZm9yIHRoZSBsYWJlbC5cclxuICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBMYWJlbENvbXBvbmVudDogTGFiZWxcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVEb2MgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIEF1dG9jb21wbGV0ZUNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBEaXNwbGF5Q29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBGaWVsZENvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgSW5wdXRDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIElucHV0TGFiZWxDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIExhYmVsQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBTZWxlY3RDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIGhhc0xhYmVsOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBsYWJlbFNpemU6IFByb3BUeXBlcy5udW1iZXJcclxuICAgIH0sXHJcbiAgICBfYnVpbGRTdHlsZSgpIHtcclxuICAgICAgICBsZXQge3N0eWxlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgc3R5bGUgPSBzdHlsZSB8fCB7fTtcclxuICAgICAgICBzdHlsZS5jbGFzc05hbWUgPSBzdHlsZSAmJiBzdHlsZS5jbGFzc05hbWUgPyBzdHlsZS5jbGFzc05hbWUgOiAnJztcclxuICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgbGFiZWwgcGFydCBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fSAtIFRoZSBidWlsZGVkIGxhYmVsIGNvbXBvbmVudC5cclxuICAgICovXHJcbiAgICBsYWJlbCgpIHtcclxuICAgICAgICBjb25zdCB7bmFtZSwgbGFiZWwsIExhYmVsQ29tcG9uZW50LCBkb21haW4sIGlzRWRpdCwgaXNSZXF1aXJlZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9e2Ake3RoaXMuX2dldExhYmVsR3JpZENsYXNzTmFtZSgpfWB9XHJcbiAgICAgICAgICAgICAgICBkYXRhLWZvY3VzPSdmaWVsZC1sYWJlbC1jb250YWluZXInXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxMYWJlbENvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbj17ZG9tYWlufVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e25hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dD17bGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFZGl0PXtpc0VkaXR9XHJcbiAgICAgICAgICAgICAgICAgICAgaXNSZXF1aXJlZD17aXNSZXF1aXJlZH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRldCB0aGUgaW5wdXQgcGFydCBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGNvbnN0cnVjdGVkIGlucHV0IGNvbXBvbmVudC5cclxuICAgICovXHJcbiAgICBpbnB1dCgpIHtcclxuICAgICAgICBjb25zdCB7bmFtZTogaWQsIHBsYWNlaG9sZGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbklucHV0Q2hhbmdlOiBvbkNoYW5nZX0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGlucHV0QnVpbGRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsSW5wdXRQcm9wcyA9IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUodGhpcy5wcm9wcy5JbnB1dENvbXBvbmVudCwgaW5wdXRCdWlsZGVkUHJvcHMsIElOUFVUKVxyXG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5JbnB1dENvbXBvbmVudCB7Li4uZmluYWxJbnB1dFByb3BzfS8+O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQXV0b2NvbXBsZXRlIHJlbmRlclxyXG4gICAgICogQHJldHVybiB7SlNYfSByZW5kZXJlZCBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYXV0b2NvbXBsZXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHtuYW1lOiBpZCwgcGxhY2Vob2xkZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmFsdWUsIGVycm9yfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge29uSW5wdXRDaGFuZ2U6IG9uQ2hhbmdlfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRCdWlsZGVkUHJvcHMgPSB7XHJcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBvbkNoYW5nZSxcclxuICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgIGVycm9yLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlclxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZmluYWxJbnB1dFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZSh0aGlzLnByb3BzLkF1dG9jb21wbGV0ZUNvbXBvbmVudCwgaW5wdXRCdWlsZGVkUHJvcHMsIElOUFVUKTtcclxuICAgICAgICByZXR1cm4gPHRoaXMucHJvcHMuQXV0b2NvbXBsZXRlQ29tcG9uZW50IHsuLi5maW5hbElucHV0UHJvcHN9Lz47XHJcbiAgICB9LFxyXG4gICAgYXV0b2NvbXBsZXRlU2VsZWN0KCkge1xyXG4gICAgICAgIGNvbnN0IHtuYW1lOiBpZCwgbGFiZWw6IHBsYWNlSG9sZGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbklucHV0Q2hhbmdlOiBvbkNoYW5nZX0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGlucHV0QnVpbGRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgcGxhY2VIb2xkZXJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsSW5wdXRQcm9wcyA9IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUodGhpcy5wcm9wcy5BdXRvY29tcGxldGVTZWxlY3RDb21wb25lbnQsIGlucHV0QnVpbGRlZFByb3BzLCBJTlBVVClcclxuICAgICAgICByZXR1cm4gPHRoaXMucHJvcHMuQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50IHsuLi5maW5hbElucHV0UHJvcHN9Lz47XHJcbiAgICB9LFxyXG4gICAgYXV0b2NvbXBsZXRlVGV4dCgpIHtcclxuICAgICAgICBjb25zdCB7bmFtZTogaWQsIGxhYmVsOiBwbGFjZUhvbGRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZSwgZXJyb3J9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7b25JbnB1dENoYW5nZTogb25DaGFuZ2V9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBpbnB1dEJ1aWxkZWRQcm9wcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlLFxyXG4gICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICAgIHBsYWNlSG9sZGVyXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBmaW5hbElucHV0UHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKHRoaXMucHJvcHMuQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCwgaW5wdXRCdWlsZGVkUHJvcHMsIElOUFVUKVxyXG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5BdXRvY29tcGxldGVUZXh0Q29tcG9uZW50IHsuLi5maW5hbElucHV0UHJvcHN9Lz47XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZCBhIHNlbGVjdCBjb21wb25lbnQgZGVwZW5kaW5nIG9uIHRoZSBkb21haW4sIGRlZmluaXRpb24gYW5kIHByb3BzLlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRoZSBidWlsZGVkIHNlbGVjdCBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdCgpIHtcclxuICAgICAgICBjb25zdCB7ZXJyb3IsIHZhbHVlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgYnVpbGRlZFNlbGVjdFByb3BzID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxyXG4gICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgc3R5bGU6IHRoaXMuX2J1aWxkU3R5bGUoKSxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25JbnB1dENoYW5nZSxcclxuICAgICAgICAgICAgZXJyb3JcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsU2VsZWN0UHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKHRoaXMucHJvcHMuU2VsZWN0Q29tcG9uZW50LCBidWlsZGVkU2VsZWN0UHJvcHMsIElOUFVUKTtcclxuICAgICAgICByZXR1cm4gPHRoaXMucHJvcHMuU2VsZWN0Q29tcG9uZW50IHsuLi5maW5hbFNlbGVjdFByb3BzfSAvPjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBkaXNwbGF5IHBhcnQgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBkaXNwbGF5IHBhcnQgb2YgdGhlIGNvbXBvZW5udCBpZiB0aGUgbW9kZSBpcyBub3QgZWRpdC5cclxuICAgICovXHJcbiAgICBkaXNwbGF5KCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtuYW1lLCB2YWx1ZUtleSwgbGFiZWxLZXksIHZhbHVlc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IF9wcm9jZXNzVmFsdWUgPSB2YWx1ZXMgPyByZXN1bHQoZmluZCh2YWx1ZXMsIHtbdmFsdWVLZXkgfHwgJ2NvZGUnXTogdmFsdWV9KSwgbGFiZWxLZXkgfHwgJ2xhYmVsJykgOiB2YWx1ZTtcclxuICAgICAgICBjb25zdCBidWlsZGVkRGlzbHBsYXlQcm9wcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcclxuICAgICAgICAgICAgaWQ6IG5hbWUsXHJcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLl9idWlsZFN0eWxlKCksXHJcbiAgICAgICAgICAgIHZhbHVlOiBfcHJvY2Vzc1ZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBmaW5hbERpc3BsYXlQcm9wcyA9IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUodGhpcy5wcm9wcy5EaXNwbGF5Q29tcG9uZW50LCBidWlsZGVkRGlzbHBsYXlQcm9wcywgRElTUExBWSk7XHJcbiAgICAgICAgcmV0dXJuIDx0aGlzLnByb3BzLkRpc3BsYXlDb21wb25lbnQgey4uLmZpbmFsRGlzcGxheVByb3BzfS8+O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGVycm9yIHBhcnQgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBlcnJvciBwYXJ0IG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqL1xyXG4gICAgZXJyb3IoKSB7XHJcbiAgICAgICAgbGV0IHtlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19lcnJvcic+XHJcbiAgICAgICAgICAgICAgICAgICAge2Vycm9yfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBoZWxwIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBoZWxwIHBhcnQgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICovXHJcbiAgICBoZWxwKCkge1xyXG4gICAgICAgIGxldCB7aGVscCwgbmFtZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChoZWxwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8bGFiZWxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2xhYmVsJ1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bUZvcj17YCR7bmFtZX1gfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtoZWxwfVxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGZpZWxkIGNvbXBvbmVudCBpZiBpdCBpcyBvdmVycmlkZW4gaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRoZSBidWlsZGVkIGZpZWxkIGNvbXBvbmVudC5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlckZpZWxkQ29tcG9uZW50KCkge1xyXG4gICAgICAgIGNvbnN0IEZpZWxkQ29tcG9uZW50ID0gdGhpcy5wcm9wcy5GaWVsZENvbXBvbmVudCB8fCB0aGlzLnByb3BzLklucHV0TGFiZWxDb21wb25lbnQ7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkZWRQcm9wcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcclxuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uSW5wdXRDaGFuZ2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsQnVpbGRlZFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZShGaWVsZENvbXBvbmVudCwgYnVpbGRlZFByb3BzLCBJTlBVVCk7XHJcbiAgICAgICAgcmV0dXJuIDxGaWVsZENvbXBvbmVudCB7Li4uZmluYWxCdWlsZGVkUHJvcHN9IC8+O1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmllbGRCdWlsdEluQ29tcG9uZW50c01peGluO1xyXG4iXX0=