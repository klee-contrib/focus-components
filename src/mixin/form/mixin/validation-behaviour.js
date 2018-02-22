//Dependencies.
import isFunction from 'lodash/lang/isFunction';

/**
* Validate each field of the form.
* In case of errors the state is modified.
* @returns {boolean} - A boolean true if the validation is correct.
*/
function _fieldsValidation() {
    let validationMap = {};
    let isValid = true;
    for (let inptKey in this.refs) {
        const refElt = this.refs[inptKey];
        //validate only the reference elements which have valid function
        if (isFunction(refElt.validate) || isFunction(refElt._validate)) {
            let validationRes = isFunction(refElt.validate) ? refElt.validate() : refElt._validate();
            if (validationRes !== undefined && validationRes !== true) {
                isValid = false;
            }
        }
    }
    return isValid;
}
/**
 * Custom validation of the field.
 * @return {true} -  If the custom validation is defined.
 */
function _customValidation() {
    if (this.customValidation) {
        return this.customValidation();
    }
    return true;
}
/**
 * Validate .
 * @return {boolean} - True if the validation is ok.
 */
function _validate() {
    const fieldsValidation = this._fieldsValidation();
    const customValidation = this._customValidation();
    
    return fieldsValidation && customValidation;
}

export default {
    _fieldsValidation,
    _customValidation,
    _validate
};
