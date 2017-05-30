'use strict';

//Dependencies.
var _require = require('lodash/lang'),
    isEmpty = _require.isEmpty,
    isFunction = _require.isFunction;

var assign = require('object-assign');

/**
* Validate each field of the form.
* In case of errors the state is modified.
* @returns {boolean} - A boolean true if the validation is correct.
*/
function _fieldsValidation() {
    var validationMap = {};
    var isValid = true;
    for (var inptKey in this.refs) {
        var refElt = this.refs[inptKey];
        //validate only the reference elements which have valid function
        if (isFunction(refElt.validate) || isFunction(refElt._validate)) {
            var validationRes = isFunction(refElt.validate) ? refElt.validate() : refElt._validate();
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
    return this._fieldsValidation() && this._customValidation();
}

module.exports = {
    _fieldsValidation: _fieldsValidation,
    _customValidation: _customValidation,
    _validate: _validate
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiaXNFbXB0eSIsImlzRnVuY3Rpb24iLCJhc3NpZ24iLCJfZmllbGRzVmFsaWRhdGlvbiIsInZhbGlkYXRpb25NYXAiLCJpc1ZhbGlkIiwiaW5wdEtleSIsInJlZnMiLCJyZWZFbHQiLCJ2YWxpZGF0ZSIsIl92YWxpZGF0ZSIsInZhbGlkYXRpb25SZXMiLCJ1bmRlZmluZWQiLCJfY3VzdG9tVmFsaWRhdGlvbiIsImN1c3RvbVZhbGlkYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO2VBQzRCQSxRQUFRLGFBQVIsQztJQUF2QkMsTyxZQUFBQSxPO0lBQVNDLFUsWUFBQUEsVTs7QUFDZCxJQUFJQyxTQUFTSCxRQUFRLGVBQVIsQ0FBYjs7QUFFQTs7Ozs7QUFLQSxTQUFTSSxpQkFBVCxHQUE2QjtBQUN6QixRQUFJQyxnQkFBZ0IsRUFBcEI7QUFDQSxRQUFJQyxVQUFVLElBQWQ7QUFDQSxTQUFLLElBQUlDLE9BQVQsSUFBb0IsS0FBS0MsSUFBekIsRUFBK0I7QUFDM0IsWUFBTUMsU0FBUyxLQUFLRCxJQUFMLENBQVVELE9BQVYsQ0FBZjtBQUNBO0FBQ0EsWUFBSUwsV0FBV08sT0FBT0MsUUFBbEIsS0FBK0JSLFdBQVdPLE9BQU9FLFNBQWxCLENBQW5DLEVBQWlFO0FBQzdELGdCQUFJQyxnQkFBZ0JWLFdBQVdPLE9BQU9DLFFBQWxCLElBQThCRCxPQUFPQyxRQUFQLEVBQTlCLEdBQWtERCxPQUFPRSxTQUFQLEVBQXRFO0FBQ0EsZ0JBQUlDLGtCQUFrQkMsU0FBbEIsSUFBK0JELGtCQUFrQixJQUFyRCxFQUEyRDtBQUN2RE4sMEJBQVUsS0FBVjtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU9BLE9BQVA7QUFDSDtBQUNEOzs7O0FBSUEsU0FBU1EsaUJBQVQsR0FBNkI7QUFDekIsUUFBSSxLQUFLQyxnQkFBVCxFQUEyQjtBQUN2QixlQUFPLEtBQUtBLGdCQUFMLEVBQVA7QUFDSDtBQUNELFdBQU8sSUFBUDtBQUNIO0FBQ0Q7Ozs7QUFJQSxTQUFTSixTQUFULEdBQXFCO0FBQ2pCLFdBQU8sS0FBS1AsaUJBQUwsTUFBNEIsS0FBS1UsaUJBQUwsRUFBbkM7QUFDSDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQjtBQUNiYix3Q0FEYTtBQUViVSx3Q0FGYTtBQUdiSDtBQUhhLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxubGV0IHtpc0VtcHR5LCBpc0Z1bmN0aW9ufSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nJyk7XG5sZXQgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG4vKipcbiogVmFsaWRhdGUgZWFjaCBmaWVsZCBvZiB0aGUgZm9ybS5cbiogSW4gY2FzZSBvZiBlcnJvcnMgdGhlIHN0YXRlIGlzIG1vZGlmaWVkLlxuKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBBIGJvb2xlYW4gdHJ1ZSBpZiB0aGUgdmFsaWRhdGlvbiBpcyBjb3JyZWN0LlxuKi9cbmZ1bmN0aW9uIF9maWVsZHNWYWxpZGF0aW9uKCkge1xuICAgIGxldCB2YWxpZGF0aW9uTWFwID0ge307XG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICAgIGZvciAobGV0IGlucHRLZXkgaW4gdGhpcy5yZWZzKSB7XG4gICAgICAgIGNvbnN0IHJlZkVsdCA9IHRoaXMucmVmc1tpbnB0S2V5XTtcbiAgICAgICAgLy92YWxpZGF0ZSBvbmx5IHRoZSByZWZlcmVuY2UgZWxlbWVudHMgd2hpY2ggaGF2ZSB2YWxpZCBmdW5jdGlvblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihyZWZFbHQudmFsaWRhdGUpIHx8IGlzRnVuY3Rpb24ocmVmRWx0Ll92YWxpZGF0ZSkpIHtcbiAgICAgICAgICAgIGxldCB2YWxpZGF0aW9uUmVzID0gaXNGdW5jdGlvbihyZWZFbHQudmFsaWRhdGUpID8gcmVmRWx0LnZhbGlkYXRlKCkgOiByZWZFbHQuX3ZhbGlkYXRlKCk7XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvblJlcyAhPT0gdW5kZWZpbmVkICYmIHZhbGlkYXRpb25SZXMgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzVmFsaWQ7XG59XG4vKipcbiAqIEN1c3RvbSB2YWxpZGF0aW9uIG9mIHRoZSBmaWVsZC5cbiAqIEByZXR1cm4ge3RydWV9IC0gIElmIHRoZSBjdXN0b20gdmFsaWRhdGlvbiBpcyBkZWZpbmVkLlxuICovXG5mdW5jdGlvbiBfY3VzdG9tVmFsaWRhdGlvbigpIHtcbiAgICBpZiAodGhpcy5jdXN0b21WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbVZhbGlkYXRpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4vKipcbiAqIFZhbGlkYXRlIC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gVHJ1ZSBpZiB0aGUgdmFsaWRhdGlvbiBpcyBvay5cbiAqL1xuZnVuY3Rpb24gX3ZhbGlkYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9maWVsZHNWYWxpZGF0aW9uKCkgJiYgdGhpcy5fY3VzdG9tVmFsaWRhdGlvbigpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBfZmllbGRzVmFsaWRhdGlvbixcbiAgICBfY3VzdG9tVmFsaWRhdGlvbixcbiAgICBfdmFsaWRhdGVcbn07XG4iXX0=