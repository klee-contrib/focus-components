'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _application = require('focus-core/application');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _lodash = require('lodash');

var _field = require('../field');

var _text = require('../../components/display/text');

var _text2 = _interopRequireDefault(_text);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

var _list = require('../list');

var _list2 = require('../../list/table/list');

var _list3 = require('../../list/selection/list');

var _fieldComponentBehaviour = require('./field-component-behaviour');

var _fieldComponentBehaviour2 = _interopRequireDefault(_fieldComponentBehaviour);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Dependencies

// Components

// Mixins

exports.default = {
    mixins: [_fieldComponentBehaviour2.default],
    /**
    * Create a field for the given property metadata.
    * @param {string} name - property name.
    * @param {object} options - An object which contains all options for the built of the field.
    * @returns {object} - A React Field.
    */
    fieldFor: function fieldFor(name, options) {
        options = (0, _objectAssign2.default)({}, options);
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    autocompleteSelectFor: function autocompleteSelectFor(name, _ref) {
        var keyResolver = _ref.keyResolver,
            querySearcher = _ref.querySearcher;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        options = (0, _objectAssign2.default)({}, options);
        options.keyResolver = keyResolver;
        options.querySearcher = querySearcher;
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    autocompleteTextFor: function autocompleteTextFor(name, _ref2) {
        var querySearcher = _ref2.querySearcher;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        options = (0, _objectAssign2.default)({}, options);
        options.querySearcher = querySearcher;
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },

    /**
    * Display two different fields, depending on wheter the user is editing the form or not
    * @param  {Object} config the configuration, with the structure {consultField: ..., editField: ...}
    * @return {Object} the rendered resulting field
    */
    dualFieldFor: function dualFieldFor(_ref3) {
        var consultField = _ref3.consultField,
            editField = _ref3.editField;

        return this.state.isEdit ? editField : consultField;
    },

    /**
    * Select component for the component.
    * @param {string} name - property name.
    * @param {string} listName - list name.
    * @param {object} options - options object.
    * @returns {object} - A React Field.
    */
    selectFor: function selectFor(name, listName, options) {
        options = options || {};
        options.listName = listName || options.listName;
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },

    /**
    * Display a field.
    * @param {string} name - property name.
    * @param {object} options - options object.
    * @returns {object} - A React Field.
    */
    displayFor: function displayFor(name, options) {
        options = options || {};
        options.isEdit = false;
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },

    /**
    * Display the text for a given property.
    * @param {string} name  - property name.
    * @param {object} options - Option object
    * @returns {object} - A React component.
    */
    textFor: function textFor(name, options) {
        options = options || {};
        var def = this.definition && this.definition[name] ? this.definition[name] : {};
        var fieldProps = this._buildFieldProps(name, options, this);
        var value = this.state[name];
        var valueKey = fieldProps.valueKey,
            labelKey = fieldProps.labelKey,
            values = fieldProps.values;

        var _processValue = values ? (0, _lodash.result)((0, _lodash.find)(values, _defineProperty({}, valueKey || 'code', value)), labelKey || 'label') : value;
        return _react2.default.createElement(_text2.default, {
            formatter: options.formatter || def.formatter,
            name: options.name || this.definitionPath + '.' + name,
            style: options.style,
            value: _processValue
        });
    },

    /**
    * Display a list component.
    * @param {string} name - Property name.
    * @param {object} options - Options object.
    * @returns {object} - The react component for the list.
    */
    listFor: function listFor(name, options) {
        options = options || {};
        options.reference = options.reference || this.state.reference;
        options.listComponent = options.listComponent || _list3.component;
        var listForProps = (0, _objectAssign2.default)({}, options, {
            data: this.state[name],
            LineComponent: options.lineComponent || options.LineComponent || this.props.LineComponent || this.LineComponent || this.lineComponent,
            perPage: options.perPage || 5,
            reference: options.reference,
            isEdit: options.isEdit !== undefined ? options.isEdit : false
        });
        return _react2.default.createElement(_list.component, _extends({ ref: 'list' }, listForProps));
    },


    /**
    * Display a table component.
    * @param {string} name - Property name.
    * @param {object} options - Options object.
    * @returns {object} - The react component for the list.
    */
    tableFor: function tableFor(name, options) {
        options.listComponent = options.listComponent || _list2.component;
        return this.listFor(name, options);
    },

    /**
    * Button delete generation.
    * @returns {object} - A Reacte button.
    */
    buttonDelete: function buttonDelete() {
        var _this = this;

        var handleOnClick = function handleOnClick() {
            _this.action.delete.call(_this, _this._getEntity());
        };
        return _react2.default.createElement(_button2.default, {
            handleOnClick: handleOnClick,
            icon: 'delete',
            label: 'button.delete',
            shape: null,
            type: 'button'
        });
    },

    /**
    * Edition button.
    * @returns {object} - The React component for the button.
    */
    buttonEdit: function buttonEdit() {
        var _this2 = this;

        var handleOnClick = function handleOnClick() {
            _this2.setState({ isEdit: !_this2.state.isEdit }, function () {
                (0, _application.changeMode)('edit', 'consult');
                _this2.clearError();
            });
        };
        return _react2.default.createElement(_button2.default, {
            handleOnClick: handleOnClick,
            icon: 'edit',
            label: 'button.edit',
            shape: null,
            type: 'button'
        });
    },

    /**
    * Cancel button.
    * @returns {object} - The React component for the button.
    */
    buttonCancel: function buttonCancel() {
        var _this3 = this;

        var handleOnClick = function handleOnClick() {
            _this3.clearError();
            // Change the mode.
            // Read the state from the stores, it should contain the last data from the server.
            _this3.setState((0, _lodash.defaultsDeep)({ isEdit: false }, _this3._getStateFromStores(), _this3._buildResetState()), function () {
                (0, _application.changeMode)('consult', 'edit');
            });
        };
        return _react2.default.createElement(_button2.default, { handleOnClick: handleOnClick, icon: 'undo', label: 'button.cancel', shape: null, type: 'button' });
    },

    /**
    * Button save generation.
    * @returns {object} - A React  save button.
    */
    buttonSave: function buttonSave() {
        var _this4 = this;

        var isLoading = this.state.isLoading;

        var handleOnClick = function handleOnClick() {
            if (_this4._validate()) {
                _this4.action.save.call(_this4, _this4._getEntity());
            }
        };
        return _react2.default.createElement(_button2.default, {
            handleOnClick: handleOnClick,
            icon: 'save',
            label: 'button.save',
            shape: null,
            type: 'button',
            isLoading: isLoading,
            processLabel: 'button.saving'
        });
    },

    /**
    * Render a field with the provided props.
    * @param  {object} fieldProps the props
    * @return {XML} rendered field
    */
    _renderField: function _renderField(fieldProps) {
        return _react2.default.createElement(_field.component, fieldProps);
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJtaXhpbnMiLCJmaWVsZEZvciIsIm5hbWUiLCJvcHRpb25zIiwiZmllbGRQcm9wcyIsIl9idWlsZEZpZWxkUHJvcHMiLCJfcmVuZGVyRmllbGQiLCJhdXRvY29tcGxldGVTZWxlY3RGb3IiLCJrZXlSZXNvbHZlciIsInF1ZXJ5U2VhcmNoZXIiLCJhdXRvY29tcGxldGVUZXh0Rm9yIiwiZHVhbEZpZWxkRm9yIiwiY29uc3VsdEZpZWxkIiwiZWRpdEZpZWxkIiwic3RhdGUiLCJpc0VkaXQiLCJzZWxlY3RGb3IiLCJsaXN0TmFtZSIsImRpc3BsYXlGb3IiLCJ0ZXh0Rm9yIiwiZGVmIiwiZGVmaW5pdGlvbiIsInZhbHVlIiwidmFsdWVLZXkiLCJsYWJlbEtleSIsInZhbHVlcyIsIl9wcm9jZXNzVmFsdWUiLCJmb3JtYXR0ZXIiLCJkZWZpbml0aW9uUGF0aCIsInN0eWxlIiwibGlzdEZvciIsInJlZmVyZW5jZSIsImxpc3RDb21wb25lbnQiLCJsaXN0Rm9yUHJvcHMiLCJkYXRhIiwiTGluZUNvbXBvbmVudCIsImxpbmVDb21wb25lbnQiLCJwcm9wcyIsInBlclBhZ2UiLCJ1bmRlZmluZWQiLCJ0YWJsZUZvciIsImJ1dHRvbkRlbGV0ZSIsImhhbmRsZU9uQ2xpY2siLCJhY3Rpb24iLCJkZWxldGUiLCJjYWxsIiwiX2dldEVudGl0eSIsImJ1dHRvbkVkaXQiLCJzZXRTdGF0ZSIsImNsZWFyRXJyb3IiLCJidXR0b25DYW5jZWwiLCJfZ2V0U3RhdGVGcm9tU3RvcmVzIiwiX2J1aWxkUmVzZXRTdGF0ZSIsImJ1dHRvblNhdmUiLCJpc0xvYWRpbmciLCJfdmFsaWRhdGUiLCJzYXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFHQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBSUE7Ozs7OztrTkFqQkE7O0FBTUE7O0FBU0E7O2tC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IERlcGVuZGVuY2llc1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtjaGFuZ2VNb2RlfSBmcm9tICdmb2N1cy1jb3JlL2FwcGxpY2F0aW9uJztcclxuaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcclxuaW1wb3J0IHtyZXN1bHQsIGZpbmQsIGRlZmF1bHRzRGVlcH0gZnJvbSAnbG9kYXNoJztcclxuLy8gQ29tcG9uZW50c1xyXG5cclxuaW1wb3J0IHtjb21wb25lbnQgYXMgRmllbGR9IGZyb20gJy4uL2ZpZWxkJztcclxuaW1wb3J0IFRleHQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaXNwbGF5L3RleHQnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuaW1wb3J0IHtjb21wb25lbnQgYXMgTWVtb3J5TGlzdH0gZnJvbSAnLi4vbGlzdCc7XHJcbmltcG9ydCB7Y29tcG9uZW50IGFzIFRhYmxlfSBmcm9tICcuLi8uLi9saXN0L3RhYmxlL2xpc3QnO1xyXG5pbXBvcnQge2NvbXBvbmVudCBhcyBMaXN0fSBmcm9tICcuLi8uLi9saXN0L3NlbGVjdGlvbi9saXN0JztcclxuXHJcbi8vIE1peGluc1xyXG5cclxuaW1wb3J0IGZpZWxkQ29tcG9uZW50QmVoYXZpb3VyIGZyb20gJy4vZmllbGQtY29tcG9uZW50LWJlaGF2aW91cic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBtaXhpbnM6IFtmaWVsZENvbXBvbmVudEJlaGF2aW91cl0sXHJcbiAgICAvKipcclxuICAgICogQ3JlYXRlIGEgZmllbGQgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eSBtZXRhZGF0YS5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBwcm9wZXJ0eSBuYW1lLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aGljaCBjb250YWlucyBhbGwgb3B0aW9ucyBmb3IgdGhlIGJ1aWx0IG9mIHRoZSBmaWVsZC5cclxuICAgICogQHJldHVybnMge29iamVjdH0gLSBBIFJlYWN0IEZpZWxkLlxyXG4gICAgKi9cclxuICAgIGZpZWxkRm9yKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gYXNzaWduKHt9LCBvcHRpb25zKTtcclxuICAgICAgICBjb25zdCBmaWVsZFByb3BzID0gdGhpcy5fYnVpbGRGaWVsZFByb3BzKG5hbWUsIG9wdGlvbnMsIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGaWVsZChmaWVsZFByb3BzKTtcclxuICAgIH0sXHJcbiAgICBhdXRvY29tcGxldGVTZWxlY3RGb3IobmFtZSwge2tleVJlc29sdmVyLCBxdWVyeVNlYXJjaGVyfSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IGFzc2lnbih7fSwgb3B0aW9ucyk7XHJcbiAgICAgICAgb3B0aW9ucy5rZXlSZXNvbHZlciA9IGtleVJlc29sdmVyO1xyXG4gICAgICAgIG9wdGlvbnMucXVlcnlTZWFyY2hlciA9IHF1ZXJ5U2VhcmNoZXI7XHJcbiAgICAgICAgY29uc3QgZmllbGRQcm9wcyA9IHRoaXMuX2J1aWxkRmllbGRQcm9wcyhuYW1lLCBvcHRpb25zLCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyRmllbGQoZmllbGRQcm9wcyk7XHJcbiAgICB9LFxyXG4gICAgYXV0b2NvbXBsZXRlVGV4dEZvcihuYW1lLCB7cXVlcnlTZWFyY2hlcn0sIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMpO1xyXG4gICAgICAgIG9wdGlvbnMucXVlcnlTZWFyY2hlciA9IHF1ZXJ5U2VhcmNoZXI7XHJcbiAgICAgICAgY29uc3QgZmllbGRQcm9wcyA9IHRoaXMuX2J1aWxkRmllbGRQcm9wcyhuYW1lLCBvcHRpb25zLCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyRmllbGQoZmllbGRQcm9wcyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIERpc3BsYXkgdHdvIGRpZmZlcmVudCBmaWVsZHMsIGRlcGVuZGluZyBvbiB3aGV0ZXIgdGhlIHVzZXIgaXMgZWRpdGluZyB0aGUgZm9ybSBvciBub3RcclxuICAgICogQHBhcmFtICB7T2JqZWN0fSBjb25maWcgdGhlIGNvbmZpZ3VyYXRpb24sIHdpdGggdGhlIHN0cnVjdHVyZSB7Y29uc3VsdEZpZWxkOiAuLi4sIGVkaXRGaWVsZDogLi4ufVxyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSByZW5kZXJlZCByZXN1bHRpbmcgZmllbGRcclxuICAgICovXHJcbiAgICBkdWFsRmllbGRGb3Ioe2NvbnN1bHRGaWVsZCwgZWRpdEZpZWxkfSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzRWRpdCA/IGVkaXRGaWVsZCA6IGNvbnN1bHRGaWVsZDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogU2VsZWN0IGNvbXBvbmVudCBmb3IgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBwcm9wZXJ0eSBuYW1lLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdE5hbWUgLSBsaXN0IG5hbWUuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBvYmplY3QuXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gQSBSZWFjdCBGaWVsZC5cclxuICAgICovXHJcbiAgICBzZWxlY3RGb3IobmFtZSwgbGlzdE5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBvcHRpb25zLmxpc3ROYW1lID0gbGlzdE5hbWUgfHwgb3B0aW9ucy5saXN0TmFtZTtcclxuICAgICAgICBjb25zdCBmaWVsZFByb3BzID0gdGhpcy5fYnVpbGRGaWVsZFByb3BzKG5hbWUsIG9wdGlvbnMsIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGaWVsZChmaWVsZFByb3BzKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRGlzcGxheSBhIGZpZWxkLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHByb3BlcnR5IG5hbWUuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBvYmplY3QuXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gQSBSZWFjdCBGaWVsZC5cclxuICAgICovXHJcbiAgICBkaXNwbGF5Rm9yKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBvcHRpb25zLmlzRWRpdCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkUHJvcHMgPSB0aGlzLl9idWlsZEZpZWxkUHJvcHMobmFtZSwgb3B0aW9ucywgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZpZWxkKGZpZWxkUHJvcHMpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBEaXNwbGF5IHRoZSB0ZXh0IGZvciBhIGdpdmVuIHByb3BlcnR5LlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAgLSBwcm9wZXJ0eSBuYW1lLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbiBvYmplY3RcclxuICAgICogQHJldHVybnMge29iamVjdH0gLSBBIFJlYWN0IGNvbXBvbmVudC5cclxuICAgICovXHJcbiAgICB0ZXh0Rm9yKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBjb25zdCBkZWYgPSAodGhpcy5kZWZpbml0aW9uICYmIHRoaXMuZGVmaW5pdGlvbltuYW1lXSkgPyB0aGlzLmRlZmluaXRpb25bbmFtZV0gOiB7fTtcclxuICAgICAgICBjb25zdCBmaWVsZFByb3BzID0gdGhpcy5fYnVpbGRGaWVsZFByb3BzKG5hbWUsIG9wdGlvbnMsIHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdGF0ZVtuYW1lXTtcclxuICAgICAgICBjb25zdCB7dmFsdWVLZXksIGxhYmVsS2V5LCB2YWx1ZXN9ID0gZmllbGRQcm9wcztcclxuICAgICAgICBjb25zdCBfcHJvY2Vzc1ZhbHVlID0gdmFsdWVzID8gcmVzdWx0KGZpbmQodmFsdWVzLCB7W3ZhbHVlS2V5IHx8ICdjb2RlJ106IHZhbHVlfSksIGxhYmVsS2V5IHx8ICdsYWJlbCcpIDogdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcj17b3B0aW9ucy5mb3JtYXR0ZXIgfHwgZGVmLmZvcm1hdHRlcn1cclxuICAgICAgICAgICAgICAgIG5hbWU9e29wdGlvbnMubmFtZSB8fCBgJHt0aGlzLmRlZmluaXRpb25QYXRofS4ke25hbWV9YH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXtvcHRpb25zLnN0eWxlfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e19wcm9jZXNzVmFsdWV9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRGlzcGxheSBhIGxpc3QgY29tcG9uZW50LlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFByb3BlcnR5IG5hbWUuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBvYmplY3QuXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIHJlYWN0IGNvbXBvbmVudCBmb3IgdGhlIGxpc3QuXHJcbiAgICAqL1xyXG4gICAgbGlzdEZvcihuYW1lLCBvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgb3B0aW9ucy5yZWZlcmVuY2UgPSBvcHRpb25zLnJlZmVyZW5jZSB8fCB0aGlzLnN0YXRlLnJlZmVyZW5jZTtcclxuICAgICAgICBvcHRpb25zLmxpc3RDb21wb25lbnQgPSBvcHRpb25zLmxpc3RDb21wb25lbnQgfHwgTGlzdDtcclxuICAgICAgICBjb25zdCBsaXN0Rm9yUHJvcHMgPSBhc3NpZ24oe30sIG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5zdGF0ZVtuYW1lXSxcclxuICAgICAgICAgICAgTGluZUNvbXBvbmVudDogb3B0aW9ucy5saW5lQ29tcG9uZW50IHx8IG9wdGlvbnMuTGluZUNvbXBvbmVudCB8fCB0aGlzLnByb3BzLkxpbmVDb21wb25lbnQgfHwgdGhpcy5MaW5lQ29tcG9uZW50IHx8IHRoaXMubGluZUNvbXBvbmVudCxcclxuICAgICAgICAgICAgcGVyUGFnZTogb3B0aW9ucy5wZXJQYWdlIHx8IDUsXHJcbiAgICAgICAgICAgIHJlZmVyZW5jZTogb3B0aW9ucy5yZWZlcmVuY2UsXHJcbiAgICAgICAgICAgIGlzRWRpdDogb3B0aW9ucy5pc0VkaXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuaXNFZGl0IDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TWVtb3J5TGlzdCByZWY9J2xpc3QnIHsuLi5saXN0Rm9yUHJvcHN9Lz5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogRGlzcGxheSBhIHRhYmxlIGNvbXBvbmVudC5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBQcm9wZXJ0eSBuYW1lLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgb2JqZWN0LlxyXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSByZWFjdCBjb21wb25lbnQgZm9yIHRoZSBsaXN0LlxyXG4gICAgKi9cclxuICAgIHRhYmxlRm9yKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zLmxpc3RDb21wb25lbnQgPSBvcHRpb25zLmxpc3RDb21wb25lbnQgfHwgVGFibGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdEZvcihuYW1lLCBvcHRpb25zKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQnV0dG9uIGRlbGV0ZSBnZW5lcmF0aW9uLlxyXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEEgUmVhY3RlIGJ1dHRvbi5cclxuICAgICovXHJcbiAgICBidXR0b25EZWxldGUoKSB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlT25DbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb24uZGVsZXRlLmNhbGwodGhpcywgdGhpcy5fZ2V0RW50aXR5KCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlT25DbGljaz17aGFuZGxlT25DbGlja31cclxuICAgICAgICAgICAgICAgIGljb249J2RlbGV0ZSdcclxuICAgICAgICAgICAgICAgIGxhYmVsPSdidXR0b24uZGVsZXRlJ1xyXG4gICAgICAgICAgICAgICAgc2hhcGU9e251bGx9XHJcbiAgICAgICAgICAgICAgICB0eXBlPSdidXR0b24nXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRWRpdGlvbiBidXR0b24uXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIFJlYWN0IGNvbXBvbmVudCBmb3IgdGhlIGJ1dHRvbi5cclxuICAgICovXHJcbiAgICBidXR0b25FZGl0KCkge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZU9uQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzRWRpdDogIXRoaXMuc3RhdGUuaXNFZGl0fSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlTW9kZSgnZWRpdCcsICdjb25zdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRXJyb3IoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVPbkNsaWNrPXtoYW5kbGVPbkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgaWNvbj0nZWRpdCdcclxuICAgICAgICAgICAgICAgIGxhYmVsPSdidXR0b24uZWRpdCdcclxuICAgICAgICAgICAgICAgIHNoYXBlPXtudWxsfVxyXG4gICAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENhbmNlbCBidXR0b24uXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIFJlYWN0IGNvbXBvbmVudCBmb3IgdGhlIGJ1dHRvbi5cclxuICAgICovXHJcbiAgICBidXR0b25DYW5jZWwoKSB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlT25DbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckVycm9yKCk7XHJcbiAgICAgICAgICAgIC8vIENoYW5nZSB0aGUgbW9kZS5cclxuICAgICAgICAgICAgLy8gUmVhZCB0aGUgc3RhdGUgZnJvbSB0aGUgc3RvcmVzLCBpdCBzaG91bGQgY29udGFpbiB0aGUgbGFzdCBkYXRhIGZyb20gdGhlIHNlcnZlci5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShkZWZhdWx0c0RlZXAoe2lzRWRpdDogZmFsc2V9LHRoaXMuX2dldFN0YXRlRnJvbVN0b3JlcygpLCB0aGlzLl9idWlsZFJlc2V0U3RhdGUoKSksICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZU1vZGUoJ2NvbnN1bHQnLCAnZWRpdCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxCdXR0b24gaGFuZGxlT25DbGljaz17aGFuZGxlT25DbGlja30gaWNvbj0ndW5kbycgbGFiZWw9J2J1dHRvbi5jYW5jZWwnIHNoYXBlPXtudWxsfSB0eXBlPSdidXR0b24nIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQnV0dG9uIHNhdmUgZ2VuZXJhdGlvbi5cclxuICAgICogQHJldHVybnMge29iamVjdH0gLSBBIFJlYWN0ICBzYXZlIGJ1dHRvbi5cclxuICAgICovXHJcbiAgICBidXR0b25TYXZlKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0xvYWRpbmd9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBoYW5kbGVPbkNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb24uc2F2ZS5jYWxsKHRoaXMsIHRoaXMuX2dldEVudGl0eSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlT25DbGljaz17aGFuZGxlT25DbGlja31cclxuICAgICAgICAgICAgICAgIGljb249J3NhdmUnXHJcbiAgICAgICAgICAgICAgICBsYWJlbD0nYnV0dG9uLnNhdmUnXHJcbiAgICAgICAgICAgICAgICBzaGFwZT17bnVsbH1cclxuICAgICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcclxuICAgICAgICAgICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0xhYmVsPSdidXR0b24uc2F2aW5nJ1xyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBhIGZpZWxkIHdpdGggdGhlIHByb3ZpZGVkIHByb3BzLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGZpZWxkUHJvcHMgdGhlIHByb3BzXHJcbiAgICAqIEByZXR1cm4ge1hNTH0gcmVuZGVyZWQgZmllbGRcclxuICAgICovXHJcbiAgICBfcmVuZGVyRmllbGQoZmllbGRQcm9wcykge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxGaWVsZCB7Li4uZmllbGRQcm9wc30vPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==