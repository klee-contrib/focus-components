'use strict';

var i18nMixin = require('../../i18n').mixin;
var validate = require('focus').definition.validator.validate;

var _require = require('lodash/lang');

var isNull = _require.isNull;
var isUndefined = _require.isUndefined;

var validationMixin = {
    mixins: [i18nMixin],
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            isRequired: false,
            validator: undefined
        };
    },
    /**
    * Compute the validation status and merge all errors into one.
    * @param  {object} validationStatus - The result from the validation.
    * @return {true | string} - true if the validation is ok and a message if it is not the case.
    */
    _computeValidationStatus: function _computeValidationStatus(validationStatus) {
        if (validationStatus.isValid) {
            return true;
        }
        return validationStatus.errors.join(', ');
    },
    /**
    * Validate the input.
    * @return {object}
    */
    validateInput: function validateInputText() {
        var value = this.getValue();
        var _props = this.props;
        var isRequired = _props.isRequired;
        var validator = _props.validator;
        var label = _props.label;

        if (isRequired && (undefined === value || null === value)) {
            return this.i18n('field.required', { name: this.i18n(label) });
        }
        //console.log('validation', label, 'value', value, 'validator', validator);
        //The validation is performed only when the field has a value, otherwise, only the required validation is performed.
        if (validator && !isUndefined(value) && !isNull(value)) {
            var validStat = this._computeValidationStatus(validate({ value: value, name: this.i18n(label) }, validator));
            if (true !== validStat) {
                validStat = this.i18n(validStat);
            }
            return validStat;
        }
        return true;
    },
    /**
    * Validate the field.
    * @return {object} - undefined if valid, {name: "errors"} if not valid.
    */
    validate: function validateField() {
        var validationStatus = this.validateInput();
        if (true !== validationStatus) {
            this.setError(validationStatus);
            return validationStatus;
        }
    },
    /**
    * Set the error on the field.
    * @param error Error to set.
    */
    setError: function setErrorOnField(error) {
        this.setState({ error: error });
    }
};
module.exports = validationMixin;