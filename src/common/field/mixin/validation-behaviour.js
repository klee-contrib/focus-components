
import validate from 'focus-core/definition/validator/validate';

import isNull from 'lodash/lang/isNull';
import isUndefined from 'lodash/lang/isUndefined';
import isArray from 'lodash/lang/isArray';
import isString from 'lodash/lang/isString';
import isObject from 'lodash/lang/isObject';
import isFunction from 'lodash/lang/isFunction';
import isEmpty from 'lodash/lang/isEmpty';

import { mixin as i18nMixin } from '../../i18n';

let validationMixin = {
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
    _computeValidationStatus(validationStatus) {
        if (validationStatus.isValid) {
            return true;
        }
        return validationStatus.errors.join(', ');
    },
    /**
    * Validate the input.
    * @return {object}
    */
    validateInput() {
        const shouldComponentHandleValidation = this.refs && this.refs.input && isFunction(this.refs.input.validate);
        let value = this.getValue();
        let { isRequired, validator, label } = this.props;
        let isEmptyValue = isUndefined(value) || isNull(value) || ((isArray(value) || isObject(value) || isString(value)) && isEmpty(value));

        if (isRequired && isEmptyValue) {
            return this.i18n('field.required', { name: this.i18n(label) });
        }
        //The validation is performed only when the field has a value, otherwise, only the required validation is performed.
        if (validator && !isEmptyValue) {
            let validStat = this._computeValidationStatus(
                validate(
                    { value: value, name: this.i18n(label) },
                    validator
                )
            );
            if (true !== validStat) {
                validStat = this.i18n(validStat);
            }
            return validStat;
        }
        return shouldComponentHandleValidation ? this._customValidate(this.refs.input) : true;
    },
    _customValidate({ validate: componentValidation }) {
        const { isValid, message } = componentValidation();
        return isValid ? true : this.i18n(message);
    },
    /**
    * Validate the field.
    * @return {object} - undefined if valid, {name: "errors"} if not valid.
    */
    validate() {
        const isValid = this.validateInput();
        if (true !== isValid) {
            this.setError(isValid);
            return isValid;
        }
    },
    /**
    * Set the error on the field.
    * @param error Error to set.
    */
    setError(error) {
        this.setState({ error: error });
    }
};

export default validationMixin;
