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
            isEdit = _props.isEdit;

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
                isEdit: isEdit
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJmaWVsZEJ1aWx0SW5Db21wb25lbnRzTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJoYXNMYWJlbCIsIkZpZWxkQ29tcG9uZW50IiwidW5kZWZpbmVkIiwiSW5wdXRMYWJlbENvbXBvbmVudCIsIklucHV0Q29tcG9uZW50IiwiQXV0b2NvbXBsZXRlQ29tcG9uZW50IiwiQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50IiwiQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCIsIlNlbGVjdENvbXBvbmVudCIsIkRpc3BsYXlDb21wb25lbnQiLCJMYWJlbENvbXBvbmVudCIsInByb3BUeXBlcyIsImZ1bmMiLCJib29sIiwibGFiZWxTaXplIiwibnVtYmVyIiwiX2J1aWxkU3R5bGUiLCJzdHlsZSIsInByb3BzIiwiY2xhc3NOYW1lIiwibGFiZWwiLCJuYW1lIiwiZG9tYWluIiwiaXNFZGl0IiwiX2dldExhYmVsR3JpZENsYXNzTmFtZSIsImlucHV0IiwiaWQiLCJwbGFjZWhvbGRlciIsInN0YXRlIiwidmFsdWUiLCJlcnJvciIsIm9uQ2hhbmdlIiwib25JbnB1dENoYW5nZSIsImlucHV0QnVpbGRlZFByb3BzIiwiZmluYWxJbnB1dFByb3BzIiwiYXV0b2NvbXBsZXRlIiwiYXV0b2NvbXBsZXRlU2VsZWN0IiwicGxhY2VIb2xkZXIiLCJhdXRvY29tcGxldGVUZXh0Iiwic2VsZWN0IiwiYnVpbGRlZFNlbGVjdFByb3BzIiwiZmluYWxTZWxlY3RQcm9wcyIsImRpc3BsYXkiLCJ2YWx1ZUtleSIsImxhYmVsS2V5IiwidmFsdWVzIiwiX3Byb2Nlc3NWYWx1ZSIsImJ1aWxkZWREaXNscGxheVByb3BzIiwiZmluYWxEaXNwbGF5UHJvcHMiLCJoZWxwIiwiX3JlbmRlckZpZWxkQ29tcG9uZW50IiwiYnVpbGRlZFByb3BzIiwiZmluYWxCdWlsZGVkUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7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RDtBQURvQixzQkFFRyxLQUFLeUIsS0FGUjtBQUFBLFlBRWJDLEtBRmEsV0FFYkEsS0FGYTtBQUFBLFlBRU5DLEtBRk0sV0FFTkEsS0FGTTs7QUFHcEIsWUFBTXFCLDRCQUNDLEtBQUtqQyxLQUROO0FBRUZRLGdCQUFJLEtBQUtSLEtBQUwsQ0FBV0csSUFGYjtBQUdGUSxtQkFBT0EsS0FITDtBQUlGQyxtQkFBT0EsS0FKTDtBQUtGQyxzQkFBVSxLQUFLQztBQUxiLFVBQU47QUFPQSxZQUFNb0Isb0JBQW9CLG1EQUF1Qm5ELGNBQXZCLEVBQXVDa0QsWUFBdkMsK0JBQTFCO0FBQ0EsZUFBTyw4QkFBQyxjQUFELEVBQW9CQyxpQkFBcEIsQ0FBUDtBQUNIO0FBM08rQixDQUFwQzs7a0JBOE9ldkQsMkIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGZpbmQgZnJvbSAnbG9kYXNoL2NvbGxlY3Rpb24vZmluZCc7XHJcbmltcG9ydCByZXN1bHQgZnJvbSAnbG9kYXNoL29iamVjdC9yZXN1bHQnO1xyXG5pbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xyXG5pbXBvcnQge2FkZFJlZlRvUHJvcHNJZk5vdFB1cmUsIElOUFVULCBESVNQTEFZfSBmcm9tICcuLi8uLi8uLi91dGlscy9pcy1yZWFjdC1jbGFzcy1jb21wb25lbnQnO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5pbXBvcnQgQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvYXV0b2NvbXBsZXRlLXNlbGVjdC9maWVsZCc7XHJcbmltcG9ydCBBdXRvY29tcGxldGVUZXh0Q29tcG9uZW50IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvYXV0b2NvbXBsZXRlLXRleHQvZmllbGQnO1xyXG5pbXBvcnQgSW5wdXRUZXh0IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvdGV4dCc7XHJcbmltcG9ydCBEaXNwbGF5VGV4dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2Rpc3BsYXkvdGV4dCc7XHJcbmltcG9ydCBTZWxlY3RDbGFzc2ljIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvc2VsZWN0JztcclxuaW1wb3J0IExhYmVsIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbGFiZWwnO1xyXG5pbXBvcnQge2NvbXBvbmVudCBhcyBBdXRvY29tcGxldGV9IGZyb20gJy4uLy4uL2F1dG9jb21wbGV0ZS9maWVsZCc7XHJcblxyXG5cclxuLy8gTWl4aW5zXHJcbmltcG9ydCBmaWVsZEdyaWRCZWhhdmlvdXJNaXhpbiBmcm9tICcuLi8uLi9taXhpbi9maWVsZC1ncmlkLWJlaGF2aW91cic7XHJcblxyXG5jb25zdCBmaWVsZEJ1aWx0SW5Db21wb25lbnRzTWl4aW4gPSB7XHJcbiAgICBtaXhpbnM6IFtmaWVsZEdyaWRCZWhhdmlvdXJNaXhpbl0sXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogRG9lcyB0aGUgY29tcG9uZW50IGhhcyBhIExhYmVsLlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBoYXNMYWJlbDogdHJ1ZSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogUmVkZWZpbmUgY29tcGxldHkgdGhlIGNvbXBvbmVudC5cclxuICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBGaWVsZENvbXBvbmVudDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBSZWRlZmluZSBvbmx5IHRoZSBpbnB1dCBhbmQgbGFiZWwgY29tcG9uZW50LlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIElucHV0TGFiZWxDb21wb25lbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogQ29tcG9uZW50IGZvciB0aGUgaW5wdXQuXHJcbiAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgSW5wdXRDb21wb25lbnQ6IElucHV0VGV4dCxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEF1dG9jb21wbGV0ZSBjb21wb25lbnRcclxuICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIEF1dG9jb21wbGV0ZUNvbXBvbmVudDogQXV0b2NvbXBsZXRlLFxyXG4gICAgICAgICAgICBBdXRvY29tcGxldGVTZWxlY3RDb21wb25lbnQsXHJcbiAgICAgICAgICAgIEF1dG9jb21wbGV0ZVRleHRDb21wb25lbnQsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIENvbXBvbmVudCBmb3IgdGhlIHNlbGVjdC5cclxuICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBTZWxlY3RDb21wb25lbnQ6IFNlbGVjdENsYXNzaWMsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIENvbXBvbmVudCBmb3IgdGhlIGRpc3BsYXkuXHJcbiAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgRGlzcGxheUNvbXBvbmVudDogRGlzcGxheVRleHQsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIENvbXBvbmVudCBmb3IgdGhlIGxhYmVsLlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIExhYmVsQ29tcG9uZW50OiBMYWJlbFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZURvYyAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgQXV0b2NvbXBsZXRlQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBBdXRvY29tcGxldGVTZWxlY3RDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIERpc3BsYXlDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIEZpZWxkQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBJbnB1dENvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgSW5wdXRMYWJlbENvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgTGFiZWxDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIFNlbGVjdENvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgaGFzTGFiZWw6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIGxhYmVsU2l6ZTogUHJvcFR5cGVzLm51bWJlclxyXG4gICAgfSxcclxuICAgIF9idWlsZFN0eWxlKCkge1xyXG4gICAgICAgIGxldCB7c3R5bGV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBzdHlsZSA9IHN0eWxlIHx8IHt9O1xyXG4gICAgICAgIHN0eWxlLmNsYXNzTmFtZSA9IHN0eWxlICYmIHN0eWxlLmNsYXNzTmFtZSA/IHN0eWxlLmNsYXNzTmFtZSA6ICcnO1xyXG4gICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBsYWJlbCBwYXJ0IG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9IC0gVGhlIGJ1aWxkZWQgbGFiZWwgY29tcG9uZW50LlxyXG4gICAgKi9cclxuICAgIGxhYmVsKCkge1xyXG4gICAgICAgIGNvbnN0IHtuYW1lLCBsYWJlbCwgTGFiZWxDb21wb25lbnQsIGRvbWFpbiwgaXNFZGl0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID17YCR7dGhpcy5fZ2V0TGFiZWxHcmlkQ2xhc3NOYW1lKCl9YH1cclxuICAgICAgICAgICAgICAgIGRhdGEtZm9jdXM9J2ZpZWxkLWxhYmVsLWNvbnRhaW5lcidcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPExhYmVsQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluPXtkb21haW59XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cclxuICAgICAgICAgICAgICAgICAgICB0ZXh0PXtsYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICBpc0VkaXQ9e2lzRWRpdH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRldCB0aGUgaW5wdXQgcGFydCBvZiB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGNvbnN0cnVjdGVkIGlucHV0IGNvbXBvbmVudC5cclxuICAgICovXHJcbiAgICBpbnB1dCgpIHtcclxuICAgICAgICBjb25zdCB7bmFtZTogaWQsIHBsYWNlaG9sZGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbklucHV0Q2hhbmdlOiBvbkNoYW5nZX0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGlucHV0QnVpbGRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsSW5wdXRQcm9wcyA9IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUodGhpcy5wcm9wcy5JbnB1dENvbXBvbmVudCwgaW5wdXRCdWlsZGVkUHJvcHMsIElOUFVUKVxyXG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5JbnB1dENvbXBvbmVudCB7Li4uZmluYWxJbnB1dFByb3BzfS8+O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQXV0b2NvbXBsZXRlIHJlbmRlclxyXG4gICAgICogQHJldHVybiB7SlNYfSByZW5kZXJlZCBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgYXV0b2NvbXBsZXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHtuYW1lOiBpZCwgcGxhY2Vob2xkZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dmFsdWUsIGVycm9yfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge29uSW5wdXRDaGFuZ2U6IG9uQ2hhbmdlfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRCdWlsZGVkUHJvcHMgPSB7XHJcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBvbkNoYW5nZSxcclxuICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgIGVycm9yLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlclxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZmluYWxJbnB1dFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZSh0aGlzLnByb3BzLkF1dG9jb21wbGV0ZUNvbXBvbmVudCwgaW5wdXRCdWlsZGVkUHJvcHMsIElOUFVUKTtcclxuICAgICAgICByZXR1cm4gPHRoaXMucHJvcHMuQXV0b2NvbXBsZXRlQ29tcG9uZW50IHsuLi5maW5hbElucHV0UHJvcHN9Lz47XHJcbiAgICB9LFxyXG4gICAgYXV0b2NvbXBsZXRlU2VsZWN0KCkge1xyXG4gICAgICAgIGNvbnN0IHtuYW1lOiBpZCwgbGFiZWw6IHBsYWNlSG9sZGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbklucHV0Q2hhbmdlOiBvbkNoYW5nZX0gPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGlucHV0QnVpbGRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgcGxhY2VIb2xkZXJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsSW5wdXRQcm9wcyA9IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUodGhpcy5wcm9wcy5BdXRvY29tcGxldGVTZWxlY3RDb21wb25lbnQsIGlucHV0QnVpbGRlZFByb3BzLCBJTlBVVClcclxuICAgICAgICByZXR1cm4gPHRoaXMucHJvcHMuQXV0b2NvbXBsZXRlU2VsZWN0Q29tcG9uZW50IHsuLi5maW5hbElucHV0UHJvcHN9Lz47XHJcbiAgICB9LFxyXG4gICAgYXV0b2NvbXBsZXRlVGV4dCgpIHtcclxuICAgICAgICBjb25zdCB7bmFtZTogaWQsIGxhYmVsOiBwbGFjZUhvbGRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZSwgZXJyb3J9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7b25JbnB1dENoYW5nZTogb25DaGFuZ2V9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBpbnB1dEJ1aWxkZWRQcm9wcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlLFxyXG4gICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgZXJyb3IsXHJcbiAgICAgICAgICAgIHBsYWNlSG9sZGVyXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBmaW5hbElucHV0UHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKHRoaXMucHJvcHMuQXV0b2NvbXBsZXRlVGV4dENvbXBvbmVudCwgaW5wdXRCdWlsZGVkUHJvcHMsIElOUFVUKVxyXG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5BdXRvY29tcGxldGVUZXh0Q29tcG9uZW50IHsuLi5maW5hbElucHV0UHJvcHN9Lz47XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZCBhIHNlbGVjdCBjb21wb25lbnQgZGVwZW5kaW5nIG9uIHRoZSBkb21haW4sIGRlZmluaXRpb24gYW5kIHByb3BzLlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRoZSBidWlsZGVkIHNlbGVjdCBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdCgpIHtcclxuICAgICAgICBjb25zdCB7ZXJyb3IsIHZhbHVlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgYnVpbGRlZFNlbGVjdFByb3BzID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLFxyXG4gICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgc3R5bGU6IHRoaXMuX2J1aWxkU3R5bGUoKSxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMub25JbnB1dENoYW5nZSxcclxuICAgICAgICAgICAgZXJyb3JcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsU2VsZWN0UHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKHRoaXMucHJvcHMuU2VsZWN0Q29tcG9uZW50LCBidWlsZGVkU2VsZWN0UHJvcHMsIElOUFVUKTtcclxuICAgICAgICByZXR1cm4gPHRoaXMucHJvcHMuU2VsZWN0Q29tcG9uZW50IHsuLi5maW5hbFNlbGVjdFByb3BzfSAvPjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBkaXNwbGF5IHBhcnQgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBkaXNwbGF5IHBhcnQgb2YgdGhlIGNvbXBvZW5udCBpZiB0aGUgbW9kZSBpcyBub3QgZWRpdC5cclxuICAgICovXHJcbiAgICBkaXNwbGF5KCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtuYW1lLCB2YWx1ZUtleSwgbGFiZWxLZXksIHZhbHVlc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IF9wcm9jZXNzVmFsdWUgPSB2YWx1ZXMgPyByZXN1bHQoZmluZCh2YWx1ZXMsIHtbdmFsdWVLZXkgfHwgJ2NvZGUnXTogdmFsdWV9KSwgbGFiZWxLZXkgfHwgJ2xhYmVsJykgOiB2YWx1ZTtcclxuICAgICAgICBjb25zdCBidWlsZGVkRGlzbHBsYXlQcm9wcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcclxuICAgICAgICAgICAgaWQ6IG5hbWUsXHJcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLl9idWlsZFN0eWxlKCksXHJcbiAgICAgICAgICAgIHZhbHVlOiBfcHJvY2Vzc1ZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBmaW5hbERpc3BsYXlQcm9wcyA9IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUodGhpcy5wcm9wcy5EaXNwbGF5Q29tcG9uZW50LCBidWlsZGVkRGlzbHBsYXlQcm9wcywgRElTUExBWSk7XHJcbiAgICAgICAgcmV0dXJuIDx0aGlzLnByb3BzLkRpc3BsYXlDb21wb25lbnQgey4uLmZpbmFsRGlzcGxheVByb3BzfS8+O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGVycm9yIHBhcnQgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBlcnJvciBwYXJ0IG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAqL1xyXG4gICAgZXJyb3IoKSB7XHJcbiAgICAgICAgbGV0IHtlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19lcnJvcic+XHJcbiAgICAgICAgICAgICAgICAgICAge2Vycm9yfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBoZWxwIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBoZWxwIHBhcnQgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICovXHJcbiAgICBoZWxwKCkge1xyXG4gICAgICAgIGxldCB7aGVscCwgbmFtZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChoZWxwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8bGFiZWxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2xhYmVsJ1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bUZvcj17YCR7bmFtZX1gfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtoZWxwfVxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGZpZWxkIGNvbXBvbmVudCBpZiBpdCBpcyBvdmVycmlkZW4gaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRoZSBidWlsZGVkIGZpZWxkIGNvbXBvbmVudC5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlckZpZWxkQ29tcG9uZW50KCkge1xyXG4gICAgICAgIGNvbnN0IEZpZWxkQ29tcG9uZW50ID0gdGhpcy5wcm9wcy5GaWVsZENvbXBvbmVudCB8fCB0aGlzLnByb3BzLklucHV0TGFiZWxDb21wb25lbnQ7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBlcnJvcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkZWRQcm9wcyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcyxcclxuICAgICAgICAgICAgaWQ6IHRoaXMucHJvcHMubmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IsXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uSW5wdXRDaGFuZ2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGZpbmFsQnVpbGRlZFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZShGaWVsZENvbXBvbmVudCwgYnVpbGRlZFByb3BzLCBJTlBVVCk7XHJcbiAgICAgICAgcmV0dXJuIDxGaWVsZENvbXBvbmVudCB7Li4uZmluYWxCdWlsZGVkUHJvcHN9IC8+O1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmllbGRCdWlsdEluQ29tcG9uZW50c01peGluO1xyXG4iXX0=