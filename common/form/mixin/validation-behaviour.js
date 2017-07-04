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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiaXNFbXB0eSIsImlzRnVuY3Rpb24iLCJhc3NpZ24iLCJfZmllbGRzVmFsaWRhdGlvbiIsInZhbGlkYXRpb25NYXAiLCJpc1ZhbGlkIiwiaW5wdEtleSIsInJlZnMiLCJyZWZFbHQiLCJ2YWxpZGF0ZSIsIl92YWxpZGF0ZSIsInZhbGlkYXRpb25SZXMiLCJ1bmRlZmluZWQiLCJfY3VzdG9tVmFsaWRhdGlvbiIsImN1c3RvbVZhbGlkYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO2VBQzRCQSxRQUFRLGFBQVIsQztJQUF2QkMsTyxZQUFBQSxPO0lBQVNDLFUsWUFBQUEsVTs7QUFDZCxJQUFJQyxTQUFTSCxRQUFRLGVBQVIsQ0FBYjs7QUFFQTs7Ozs7QUFLQSxTQUFTSSxpQkFBVCxHQUE2QjtBQUN6QixRQUFJQyxnQkFBZ0IsRUFBcEI7QUFDQSxRQUFJQyxVQUFVLElBQWQ7QUFDQSxTQUFLLElBQUlDLE9BQVQsSUFBb0IsS0FBS0MsSUFBekIsRUFBK0I7QUFDM0IsWUFBTUMsU0FBUyxLQUFLRCxJQUFMLENBQVVELE9BQVYsQ0FBZjtBQUNBO0FBQ0EsWUFBSUwsV0FBV08sT0FBT0MsUUFBbEIsS0FBK0JSLFdBQVdPLE9BQU9FLFNBQWxCLENBQW5DLEVBQWlFO0FBQzdELGdCQUFJQyxnQkFBZ0JWLFdBQVdPLE9BQU9DLFFBQWxCLElBQThCRCxPQUFPQyxRQUFQLEVBQTlCLEdBQWtERCxPQUFPRSxTQUFQLEVBQXRFO0FBQ0EsZ0JBQUlDLGtCQUFrQkMsU0FBbEIsSUFBK0JELGtCQUFrQixJQUFyRCxFQUEyRDtBQUN2RE4sMEJBQVUsS0FBVjtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU9BLE9BQVA7QUFDSDtBQUNEOzs7O0FBSUEsU0FBU1EsaUJBQVQsR0FBNkI7QUFDekIsUUFBSSxLQUFLQyxnQkFBVCxFQUEyQjtBQUN2QixlQUFPLEtBQUtBLGdCQUFMLEVBQVA7QUFDSDtBQUNELFdBQU8sSUFBUDtBQUNIO0FBQ0Q7Ozs7QUFJQSxTQUFTSixTQUFULEdBQXFCO0FBQ2pCLFdBQU8sS0FBS1AsaUJBQUwsTUFBNEIsS0FBS1UsaUJBQUwsRUFBbkM7QUFDSDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQjtBQUNiYix3Q0FEYTtBQUViVSx3Q0FGYTtBQUdiSDtBQUhhLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG5sZXQge2lzRW1wdHksIGlzRnVuY3Rpb259ID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcnKTtcclxubGV0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxuXHJcbi8qKlxyXG4qIFZhbGlkYXRlIGVhY2ggZmllbGQgb2YgdGhlIGZvcm0uXHJcbiogSW4gY2FzZSBvZiBlcnJvcnMgdGhlIHN0YXRlIGlzIG1vZGlmaWVkLlxyXG4qIEByZXR1cm5zIHtib29sZWFufSAtIEEgYm9vbGVhbiB0cnVlIGlmIHRoZSB2YWxpZGF0aW9uIGlzIGNvcnJlY3QuXHJcbiovXHJcbmZ1bmN0aW9uIF9maWVsZHNWYWxpZGF0aW9uKCkge1xyXG4gICAgbGV0IHZhbGlkYXRpb25NYXAgPSB7fTtcclxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgIGZvciAobGV0IGlucHRLZXkgaW4gdGhpcy5yZWZzKSB7XHJcbiAgICAgICAgY29uc3QgcmVmRWx0ID0gdGhpcy5yZWZzW2lucHRLZXldO1xyXG4gICAgICAgIC8vdmFsaWRhdGUgb25seSB0aGUgcmVmZXJlbmNlIGVsZW1lbnRzIHdoaWNoIGhhdmUgdmFsaWQgZnVuY3Rpb25cclxuICAgICAgICBpZiAoaXNGdW5jdGlvbihyZWZFbHQudmFsaWRhdGUpIHx8IGlzRnVuY3Rpb24ocmVmRWx0Ll92YWxpZGF0ZSkpIHtcclxuICAgICAgICAgICAgbGV0IHZhbGlkYXRpb25SZXMgPSBpc0Z1bmN0aW9uKHJlZkVsdC52YWxpZGF0ZSkgPyByZWZFbHQudmFsaWRhdGUoKSA6IHJlZkVsdC5fdmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb25SZXMgIT09IHVuZGVmaW5lZCAmJiB2YWxpZGF0aW9uUmVzICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG4vKipcclxuICogQ3VzdG9tIHZhbGlkYXRpb24gb2YgdGhlIGZpZWxkLlxyXG4gKiBAcmV0dXJuIHt0cnVlfSAtICBJZiB0aGUgY3VzdG9tIHZhbGlkYXRpb24gaXMgZGVmaW5lZC5cclxuICovXHJcbmZ1bmN0aW9uIF9jdXN0b21WYWxpZGF0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuY3VzdG9tVmFsaWRhdGlvbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbVZhbGlkYXRpb24oKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbi8qKlxyXG4gKiBWYWxpZGF0ZSAuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gVHJ1ZSBpZiB0aGUgdmFsaWRhdGlvbiBpcyBvay5cclxuICovXHJcbmZ1bmN0aW9uIF92YWxpZGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZHNWYWxpZGF0aW9uKCkgJiYgdGhpcy5fY3VzdG9tVmFsaWRhdGlvbigpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIF9maWVsZHNWYWxpZGF0aW9uLFxyXG4gICAgX2N1c3RvbVZhbGlkYXRpb24sXHJcbiAgICBfdmFsaWRhdGVcclxufTtcclxuIl19