'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _application = require('focus-core/application');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Dependencies

var React = require('react');

var assign = require('object-assign');
var result = require('lodash/object/result');
var find = require('lodash/collection/find');
// Components

var Field = require('../field').component;
var Text = require('../../components/display/text');
var Button = require('../../components/button');
var MemoryList = require('../list').component;
var Table = require('../../list/table').list.component;
var List = require('../../list/selection').list.component;

// Mixins

var fieldComponentBehaviour = require('./field-component-behaviour');

module.exports = {
    mixins: [fieldComponentBehaviour],
    /**
    * Create a field for the given property metadata.
    * @param {string} name - property name.
    * @param {object} options - An object which contains all options for the built of the field.
    * @returns {object} - A React Field.
    */
    fieldFor: function fieldFor(name, options) {
        options = assign({}, options);
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    autocompleteFor: function autocompleteFor() {
        throw new Error('Form\'s autocompleteFor method is deprecated, in order to use the deprecated component, please use this.deprecatedAutocompleteFor. You must migrate all the autocompleteFor to autocompleteSelectFor or autocompleteTextFor in order to follow the library evolutions.');
    },
    deprecatedAutocompleteFor: function deprecatedAutocompleteFor(name, _ref) {
        var codeResolver = _ref.codeResolver,
            searcher = _ref.searcher;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        options = assign({}, options);
        options.codeResolver = codeResolver;
        options.searcher = searcher;
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    autocompleteSelectFor: function autocompleteSelectFor(name, _ref2) {
        var keyResolver = _ref2.keyResolver,
            querySearcher = _ref2.querySearcher;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        options = assign({}, options);
        options.keyResolver = keyResolver;
        options.querySearcher = querySearcher;
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },
    autocompleteTextFor: function autocompleteTextFor(name, _ref3) {
        var querySearcher = _ref3.querySearcher;
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        options = assign({}, options);
        options.querySearcher = querySearcher;
        var fieldProps = this._buildFieldProps(name, options, this);
        return this._renderField(fieldProps);
    },

    /**
    * Display two different fields, depending on wheter the user is editing the form or not
    * @param  {Object} config the configuration, with the structure {consultField: ..., editField: ...}
    * @return {Object} the rendered resulting field
    */
    dualFieldFor: function dualFieldFor(_ref4) {
        var consultField = _ref4.consultField,
            editField = _ref4.editField;

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

        var _processValue = values ? result(find(values, _defineProperty({}, valueKey || 'code', value)), labelKey || 'label') : value;
        return React.createElement(Text, {
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
        options.listComponent = options.listComponent || List;
        var listForProps = assign({}, options, {
            data: this.state[name],
            LineComponent: options.lineComponent || options.LineComponent || this.props.LineComponent || this.LineComponent || this.lineComponent,
            perPage: options.perPage || 5,
            reference: options.reference,
            isEdit: options.isEdit !== undefined ? options.isEdit : false
        });
        return React.createElement(MemoryList, _extends({ ref: 'list' }, listForProps));
    },


    /**
    * Display a table component.
    * @param {string} name - Property name.
    * @param {object} options - Options object.
    * @returns {object} - The react component for the list.
    */
    tableFor: function tableFor(name, options) {
        options.listComponent = options.listComponent || Table;
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
        return React.createElement(Button, {
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
        return React.createElement(Button, {
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
            _this3.setState(_extends({
                // Change the mode.
                isEdit: !_this3.state.isEdit
            }, _this3._getStateFromStores()), function () {
                (0, _application.changeMode)('consult', 'edit');
            });
        };
        return React.createElement(Button, { handleOnClick: handleOnClick, icon: 'undo', label: 'button.cancel', shape: null, type: 'button' });
    },

    /**
    * Button save generation.
    * @returns {object} - A React  save button.
    */
    buttonSave: function buttonSave() {
        var _this4 = this;

        var handleOnClick = function handleOnClick() {
            if (_this4._validate()) {
                _this4.action.save.call(_this4, _this4._getEntity());
            }
        };
        return React.createElement(Button, {
            handleOnClick: handleOnClick,
            icon: 'save',
            label: 'button.save',
            shape: null,
            type: 'button'
        });
    },

    /**
    * Render a field with the provided props.
    * @param  {object} fieldProps the props
    * @return {XML} rendered field
    */
    _renderField: function _renderField(fieldProps) {
        return React.createElement(Field, fieldProps);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJhc3NpZ24iLCJyZXN1bHQiLCJmaW5kIiwiRmllbGQiLCJjb21wb25lbnQiLCJUZXh0IiwiQnV0dG9uIiwiTWVtb3J5TGlzdCIsIlRhYmxlIiwibGlzdCIsIkxpc3QiLCJmaWVsZENvbXBvbmVudEJlaGF2aW91ciIsIm1vZHVsZSIsImV4cG9ydHMiLCJtaXhpbnMiLCJmaWVsZEZvciIsIm5hbWUiLCJvcHRpb25zIiwiZmllbGRQcm9wcyIsIl9idWlsZEZpZWxkUHJvcHMiLCJfcmVuZGVyRmllbGQiLCJhdXRvY29tcGxldGVGb3IiLCJFcnJvciIsImRlcHJlY2F0ZWRBdXRvY29tcGxldGVGb3IiLCJjb2RlUmVzb2x2ZXIiLCJzZWFyY2hlciIsImF1dG9jb21wbGV0ZVNlbGVjdEZvciIsImtleVJlc29sdmVyIiwicXVlcnlTZWFyY2hlciIsImF1dG9jb21wbGV0ZVRleHRGb3IiLCJkdWFsRmllbGRGb3IiLCJjb25zdWx0RmllbGQiLCJlZGl0RmllbGQiLCJzdGF0ZSIsImlzRWRpdCIsInNlbGVjdEZvciIsImxpc3ROYW1lIiwiZGlzcGxheUZvciIsInRleHRGb3IiLCJkZWYiLCJkZWZpbml0aW9uIiwidmFsdWUiLCJ2YWx1ZUtleSIsImxhYmVsS2V5IiwidmFsdWVzIiwiX3Byb2Nlc3NWYWx1ZSIsImZvcm1hdHRlciIsImRlZmluaXRpb25QYXRoIiwic3R5bGUiLCJsaXN0Rm9yIiwicmVmZXJlbmNlIiwibGlzdENvbXBvbmVudCIsImxpc3RGb3JQcm9wcyIsImRhdGEiLCJMaW5lQ29tcG9uZW50IiwibGluZUNvbXBvbmVudCIsInByb3BzIiwicGVyUGFnZSIsInVuZGVmaW5lZCIsInRhYmxlRm9yIiwiYnV0dG9uRGVsZXRlIiwiaGFuZGxlT25DbGljayIsImFjdGlvbiIsImRlbGV0ZSIsImNhbGwiLCJfZ2V0RW50aXR5IiwiYnV0dG9uRWRpdCIsInNldFN0YXRlIiwiY2xlYXJFcnJvciIsImJ1dHRvbkNhbmNlbCIsIl9nZXRTdGF0ZUZyb21TdG9yZXMiLCJidXR0b25TYXZlIiwiX3ZhbGlkYXRlIiwic2F2ZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUdBOzs7O0FBSEE7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7O0FBRUEsSUFBTUMsU0FBU0QsUUFBUSxlQUFSLENBQWY7QUFDQSxJQUFNRSxTQUFTRixRQUFRLHNCQUFSLENBQWY7QUFDQSxJQUFNRyxPQUFPSCxRQUFRLHdCQUFSLENBQWI7QUFDQTs7QUFFQSxJQUFNSSxRQUFRSixRQUFRLFVBQVIsRUFBb0JLLFNBQWxDO0FBQ0EsSUFBTUMsT0FBT04sUUFBUSwrQkFBUixDQUFiO0FBQ0EsSUFBTU8sU0FBU1AsUUFBUSx5QkFBUixDQUFmO0FBQ0EsSUFBTVEsYUFBYVIsUUFBUSxTQUFSLEVBQW1CSyxTQUF0QztBQUNBLElBQU1JLFFBQVFULFFBQVEsa0JBQVIsRUFBNEJVLElBQTVCLENBQWlDTCxTQUEvQztBQUNBLElBQU1NLE9BQU9YLFFBQVEsc0JBQVIsRUFBZ0NVLElBQWhDLENBQXFDTCxTQUFsRDs7QUFHQTs7QUFFQSxJQUFNTywwQkFBMEJaLFFBQVEsNkJBQVIsQ0FBaEM7O0FBRUFhLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsWUFBUSxDQUFDSCx1QkFBRCxDQURLO0FBRWI7Ozs7OztBQU1BSSxZQVJhLG9CQVFKQyxJQVJJLEVBUUVDLE9BUkYsRUFRVztBQUNwQkEsa0JBQVVqQixPQUFPLEVBQVAsRUFBV2lCLE9BQVgsQ0FBVjtBQUNBLFlBQU1DLGFBQWEsS0FBS0MsZ0JBQUwsQ0FBc0JILElBQXRCLEVBQTRCQyxPQUE1QixFQUFxQyxJQUFyQyxDQUFuQjtBQUNBLGVBQU8sS0FBS0csWUFBTCxDQUFrQkYsVUFBbEIsQ0FBUDtBQUNILEtBWlk7QUFhYkcsbUJBYmEsNkJBYUs7QUFDZCxjQUFNLElBQUlDLEtBQUosQ0FBVSx3UUFBVixDQUFOO0FBQ0gsS0FmWTtBQWdCYkMsNkJBaEJhLHFDQWdC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LGVBQ0ksb0JBQUMsS0FBRCxFQUFXQSxVQUFYLENBREo7QUFHSDtBQW5OWSxDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IHtjaGFuZ2VNb2RlfSBmcm9tICdmb2N1cy1jb3JlL2FwcGxpY2F0aW9uJztcclxuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xyXG5jb25zdCByZXN1bHQgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L3Jlc3VsdCcpO1xyXG5jb25zdCBmaW5kID0gcmVxdWlyZSgnbG9kYXNoL2NvbGxlY3Rpb24vZmluZCcpO1xyXG4vLyBDb21wb25lbnRzXHJcblxyXG5jb25zdCBGaWVsZCA9IHJlcXVpcmUoJy4uL2ZpZWxkJykuY29tcG9uZW50O1xyXG5jb25zdCBUZXh0ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kaXNwbGF5L3RleHQnKTtcclxuY29uc3QgQnV0dG9uID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9idXR0b24nKTtcclxuY29uc3QgTWVtb3J5TGlzdCA9IHJlcXVpcmUoJy4uL2xpc3QnKS5jb21wb25lbnQ7XHJcbmNvbnN0IFRhYmxlID0gcmVxdWlyZSgnLi4vLi4vbGlzdC90YWJsZScpLmxpc3QuY29tcG9uZW50O1xyXG5jb25zdCBMaXN0ID0gcmVxdWlyZSgnLi4vLi4vbGlzdC9zZWxlY3Rpb24nKS5saXN0LmNvbXBvbmVudDtcclxuXHJcblxyXG4vLyBNaXhpbnNcclxuXHJcbmNvbnN0IGZpZWxkQ29tcG9uZW50QmVoYXZpb3VyID0gcmVxdWlyZSgnLi9maWVsZC1jb21wb25lbnQtYmVoYXZpb3VyJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1peGluczogW2ZpZWxkQ29tcG9uZW50QmVoYXZpb3VyXSxcclxuICAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBmaWVsZCBmb3IgdGhlIGdpdmVuIHByb3BlcnR5IG1ldGFkYXRhLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHByb3BlcnR5IG5hbWUuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQW4gb2JqZWN0IHdoaWNoIGNvbnRhaW5zIGFsbCBvcHRpb25zIGZvciB0aGUgYnVpbHQgb2YgdGhlIGZpZWxkLlxyXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEEgUmVhY3QgRmllbGQuXHJcbiAgICAqL1xyXG4gICAgZmllbGRGb3IobmFtZSwgb3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkUHJvcHMgPSB0aGlzLl9idWlsZEZpZWxkUHJvcHMobmFtZSwgb3B0aW9ucywgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZpZWxkKGZpZWxkUHJvcHMpO1xyXG4gICAgfSxcclxuICAgIGF1dG9jb21wbGV0ZUZvcigpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm1cXCdzIGF1dG9jb21wbGV0ZUZvciBtZXRob2QgaXMgZGVwcmVjYXRlZCwgaW4gb3JkZXIgdG8gdXNlIHRoZSBkZXByZWNhdGVkIGNvbXBvbmVudCwgcGxlYXNlIHVzZSB0aGlzLmRlcHJlY2F0ZWRBdXRvY29tcGxldGVGb3IuIFlvdSBtdXN0IG1pZ3JhdGUgYWxsIHRoZSBhdXRvY29tcGxldGVGb3IgdG8gYXV0b2NvbXBsZXRlU2VsZWN0Rm9yIG9yIGF1dG9jb21wbGV0ZVRleHRGb3IgaW4gb3JkZXIgdG8gZm9sbG93IHRoZSBsaWJyYXJ5IGV2b2x1dGlvbnMuJyk7XHJcbiAgICB9LFxyXG4gICAgZGVwcmVjYXRlZEF1dG9jb21wbGV0ZUZvcihuYW1lLCB7Y29kZVJlc29sdmVyLCBzZWFyY2hlcn0sIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMpO1xyXG4gICAgICAgIG9wdGlvbnMuY29kZVJlc29sdmVyID0gY29kZVJlc29sdmVyO1xyXG4gICAgICAgIG9wdGlvbnMuc2VhcmNoZXIgPSBzZWFyY2hlcjtcclxuICAgICAgICBjb25zdCBmaWVsZFByb3BzID0gdGhpcy5fYnVpbGRGaWVsZFByb3BzKG5hbWUsIG9wdGlvbnMsIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGaWVsZChmaWVsZFByb3BzKTtcclxuICAgIH0sXHJcbiAgICBhdXRvY29tcGxldGVTZWxlY3RGb3IobmFtZSwge2tleVJlc29sdmVyLCBxdWVyeVNlYXJjaGVyfSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IGFzc2lnbih7fSwgb3B0aW9ucyk7XHJcbiAgICAgICAgb3B0aW9ucy5rZXlSZXNvbHZlciA9IGtleVJlc29sdmVyO1xyXG4gICAgICAgIG9wdGlvbnMucXVlcnlTZWFyY2hlciA9IHF1ZXJ5U2VhcmNoZXI7XHJcbiAgICAgICAgY29uc3QgZmllbGRQcm9wcyA9IHRoaXMuX2J1aWxkRmllbGRQcm9wcyhuYW1lLCBvcHRpb25zLCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyRmllbGQoZmllbGRQcm9wcyk7XHJcbiAgICB9LFxyXG4gICAgYXV0b2NvbXBsZXRlVGV4dEZvcihuYW1lLCB7cXVlcnlTZWFyY2hlcn0sIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMpO1xyXG4gICAgICAgIG9wdGlvbnMucXVlcnlTZWFyY2hlciA9IHF1ZXJ5U2VhcmNoZXI7XHJcbiAgICAgICAgY29uc3QgZmllbGRQcm9wcyA9IHRoaXMuX2J1aWxkRmllbGRQcm9wcyhuYW1lLCBvcHRpb25zLCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyRmllbGQoZmllbGRQcm9wcyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIERpc3BsYXkgdHdvIGRpZmZlcmVudCBmaWVsZHMsIGRlcGVuZGluZyBvbiB3aGV0ZXIgdGhlIHVzZXIgaXMgZWRpdGluZyB0aGUgZm9ybSBvciBub3RcclxuICAgICogQHBhcmFtICB7T2JqZWN0fSBjb25maWcgdGhlIGNvbmZpZ3VyYXRpb24sIHdpdGggdGhlIHN0cnVjdHVyZSB7Y29uc3VsdEZpZWxkOiAuLi4sIGVkaXRGaWVsZDogLi4ufVxyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSByZW5kZXJlZCByZXN1bHRpbmcgZmllbGRcclxuICAgICovXHJcbiAgICBkdWFsRmllbGRGb3Ioe2NvbnN1bHRGaWVsZCwgZWRpdEZpZWxkfSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmlzRWRpdCA/IGVkaXRGaWVsZCA6IGNvbnN1bHRGaWVsZDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogU2VsZWN0IGNvbXBvbmVudCBmb3IgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBwcm9wZXJ0eSBuYW1lLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdE5hbWUgLSBsaXN0IG5hbWUuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBvYmplY3QuXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gQSBSZWFjdCBGaWVsZC5cclxuICAgICovXHJcbiAgICBzZWxlY3RGb3IobmFtZSwgbGlzdE5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBvcHRpb25zLmxpc3ROYW1lID0gbGlzdE5hbWUgfHwgb3B0aW9ucy5saXN0TmFtZTtcclxuICAgICAgICBjb25zdCBmaWVsZFByb3BzID0gdGhpcy5fYnVpbGRGaWVsZFByb3BzKG5hbWUsIG9wdGlvbnMsIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGaWVsZChmaWVsZFByb3BzKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRGlzcGxheSBhIGZpZWxkLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHByb3BlcnR5IG5hbWUuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBvYmplY3QuXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gQSBSZWFjdCBGaWVsZC5cclxuICAgICovXHJcbiAgICBkaXNwbGF5Rm9yKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBvcHRpb25zLmlzRWRpdCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkUHJvcHMgPSB0aGlzLl9idWlsZEZpZWxkUHJvcHMobmFtZSwgb3B0aW9ucywgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZpZWxkKGZpZWxkUHJvcHMpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBEaXNwbGF5IHRoZSB0ZXh0IGZvciBhIGdpdmVuIHByb3BlcnR5LlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAgLSBwcm9wZXJ0eSBuYW1lLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbiBvYmplY3RcclxuICAgICogQHJldHVybnMge29iamVjdH0gLSBBIFJlYWN0IGNvbXBvbmVudC5cclxuICAgICovXHJcbiAgICB0ZXh0Rm9yKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBjb25zdCBkZWYgPSAodGhpcy5kZWZpbml0aW9uICYmIHRoaXMuZGVmaW5pdGlvbltuYW1lXSkgPyB0aGlzLmRlZmluaXRpb25bbmFtZV0gOiB7fTtcclxuICAgICAgICBjb25zdCBmaWVsZFByb3BzID0gdGhpcy5fYnVpbGRGaWVsZFByb3BzKG5hbWUsIG9wdGlvbnMsIHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdGF0ZVtuYW1lXTtcclxuICAgICAgICBjb25zdCB7dmFsdWVLZXksIGxhYmVsS2V5LCB2YWx1ZXN9ID0gZmllbGRQcm9wcztcclxuICAgICAgICBjb25zdCBfcHJvY2Vzc1ZhbHVlID0gdmFsdWVzID8gcmVzdWx0KGZpbmQodmFsdWVzLCB7W3ZhbHVlS2V5IHx8ICdjb2RlJ106IHZhbHVlfSksIGxhYmVsS2V5IHx8ICdsYWJlbCcpIDogdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcj17b3B0aW9ucy5mb3JtYXR0ZXIgfHwgZGVmLmZvcm1hdHRlcn1cclxuICAgICAgICAgICAgICAgIG5hbWU9e29wdGlvbnMubmFtZSB8fCBgJHt0aGlzLmRlZmluaXRpb25QYXRofS4ke25hbWV9YH1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXtvcHRpb25zLnN0eWxlfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e19wcm9jZXNzVmFsdWV9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRGlzcGxheSBhIGxpc3QgY29tcG9uZW50LlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFByb3BlcnR5IG5hbWUuXHJcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBvYmplY3QuXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIHJlYWN0IGNvbXBvbmVudCBmb3IgdGhlIGxpc3QuXHJcbiAgICAqL1xyXG4gICAgbGlzdEZvcihuYW1lLCBvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgb3B0aW9ucy5yZWZlcmVuY2UgPSBvcHRpb25zLnJlZmVyZW5jZSB8fCB0aGlzLnN0YXRlLnJlZmVyZW5jZTtcclxuICAgICAgICBvcHRpb25zLmxpc3RDb21wb25lbnQgPSBvcHRpb25zLmxpc3RDb21wb25lbnQgfHwgTGlzdDtcclxuICAgICAgICBjb25zdCBsaXN0Rm9yUHJvcHMgPSBhc3NpZ24oe30sIG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5zdGF0ZVtuYW1lXSxcclxuICAgICAgICAgICAgTGluZUNvbXBvbmVudDogb3B0aW9ucy5saW5lQ29tcG9uZW50IHx8IG9wdGlvbnMuTGluZUNvbXBvbmVudCB8fCB0aGlzLnByb3BzLkxpbmVDb21wb25lbnQgfHwgdGhpcy5MaW5lQ29tcG9uZW50IHx8IHRoaXMubGluZUNvbXBvbmVudCxcclxuICAgICAgICAgICAgcGVyUGFnZTogb3B0aW9ucy5wZXJQYWdlIHx8IDUsXHJcbiAgICAgICAgICAgIHJlZmVyZW5jZTogb3B0aW9ucy5yZWZlcmVuY2UsXHJcbiAgICAgICAgICAgIGlzRWRpdDogb3B0aW9ucy5pc0VkaXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuaXNFZGl0IDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TWVtb3J5TGlzdCByZWY9J2xpc3QnIHsuLi5saXN0Rm9yUHJvcHN9Lz5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogRGlzcGxheSBhIHRhYmxlIGNvbXBvbmVudC5cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBQcm9wZXJ0eSBuYW1lLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgb2JqZWN0LlxyXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSByZWFjdCBjb21wb25lbnQgZm9yIHRoZSBsaXN0LlxyXG4gICAgKi9cclxuICAgIHRhYmxlRm9yKG5hbWUsIG9wdGlvbnMpIHtcclxuICAgICAgICBvcHRpb25zLmxpc3RDb21wb25lbnQgPSBvcHRpb25zLmxpc3RDb21wb25lbnQgfHwgVGFibGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdEZvcihuYW1lLCBvcHRpb25zKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQnV0dG9uIGRlbGV0ZSBnZW5lcmF0aW9uLlxyXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIEEgUmVhY3RlIGJ1dHRvbi5cclxuICAgICovXHJcbiAgICBidXR0b25EZWxldGUoKSB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlT25DbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb24uZGVsZXRlLmNhbGwodGhpcywgdGhpcy5fZ2V0RW50aXR5KCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICBoYW5kbGVPbkNsaWNrPXtoYW5kbGVPbkNsaWNrfVxyXG4gICAgICAgICAgICBpY29uPSdkZWxldGUnXHJcbiAgICAgICAgICAgIGxhYmVsPSdidXR0b24uZGVsZXRlJ1xyXG4gICAgICAgICAgICBzaGFwZT17bnVsbH1cclxuICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEVkaXRpb24gYnV0dG9uLlxyXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSBSZWFjdCBjb21wb25lbnQgZm9yIHRoZSBidXR0b24uXHJcbiAgICAqL1xyXG4gICAgYnV0dG9uRWRpdCgpIHtcclxuICAgICAgICBjb25zdCBoYW5kbGVPbkNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0VkaXQ6ICF0aGlzLnN0YXRlLmlzRWRpdH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZU1vZGUoJ2VkaXQnLCAnY29uc3VsdCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckVycm9yKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICBoYW5kbGVPbkNsaWNrPXtoYW5kbGVPbkNsaWNrfVxyXG4gICAgICAgICAgICBpY29uPSdlZGl0J1xyXG4gICAgICAgICAgICBsYWJlbD0nYnV0dG9uLmVkaXQnXHJcbiAgICAgICAgICAgIHNoYXBlPXtudWxsfVxyXG4gICAgICAgICAgICB0eXBlPSdidXR0b24nXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ2FuY2VsIGJ1dHRvbi5cclxuICAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUgUmVhY3QgY29tcG9uZW50IGZvciB0aGUgYnV0dG9uLlxyXG4gICAgKi9cclxuICAgIGJ1dHRvbkNhbmNlbCgpIHtcclxuICAgICAgICBjb25zdCBoYW5kbGVPbkNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRXJyb3IoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgdGhlIG1vZGUuXHJcbiAgICAgICAgICAgICAgICBpc0VkaXQ6ICF0aGlzLnN0YXRlLmlzRWRpdCxcclxuICAgICAgICAgICAgICAgIC8vIFJlYWQgdGhlIHN0YXRlIGZyb20gdGhlIHN0b3JlcywgaXQgc2hvdWxkIGNvbnRhaW4gdGhlIGxhc3QgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIuXHJcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9nZXRTdGF0ZUZyb21TdG9yZXMoKVxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VNb2RlKCdjb25zdWx0JywgJ2VkaXQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QnV0dG9uIGhhbmRsZU9uQ2xpY2s9e2hhbmRsZU9uQ2xpY2t9IGljb249J3VuZG8nIGxhYmVsPSdidXR0b24uY2FuY2VsJyBzaGFwZT17bnVsbH0gdHlwZT0nYnV0dG9uJyAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEJ1dHRvbiBzYXZlIGdlbmVyYXRpb24uXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gQSBSZWFjdCAgc2F2ZSBidXR0b24uXHJcbiAgICAqL1xyXG4gICAgYnV0dG9uU2F2ZSgpIHtcclxuICAgICAgICBjb25zdCBoYW5kbGVPbkNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsaWRhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb24uc2F2ZS5jYWxsKHRoaXMsIHRoaXMuX2dldEVudGl0eSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICBoYW5kbGVPbkNsaWNrPXtoYW5kbGVPbkNsaWNrfVxyXG4gICAgICAgICAgICBpY29uPSdzYXZlJ1xyXG4gICAgICAgICAgICBsYWJlbD0nYnV0dG9uLnNhdmUnXHJcbiAgICAgICAgICAgIHNoYXBlPXtudWxsfVxyXG4gICAgICAgICAgICB0eXBlPSdidXR0b24nXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGEgZmllbGQgd2l0aCB0aGUgcHJvdmlkZWQgcHJvcHMuXHJcbiAgICAqIEBwYXJhbSAge29iamVjdH0gZmllbGRQcm9wcyB0aGUgcHJvcHNcclxuICAgICogQHJldHVybiB7WE1MfSByZW5kZXJlZCBmaWVsZFxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJGaWVsZChmaWVsZFByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEZpZWxkIHsuLi5maWVsZFByb3BzfS8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuIl19