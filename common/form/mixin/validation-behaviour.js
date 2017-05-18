'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    for (var inptKey in this.refs) {
        //validate only the reference elements which have valide function
        if (isFunction(this.refs[inptKey].validate)) {
            var validationRes = this.refs[inptKey].validate();
            if (validationRes !== undefined) {
                assign(validationMap, _defineProperty({}, inptKey, validationRes));
            }
        }
    }
    if (isEmpty(validationMap)) {
        return true;
    }
    return false;
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

/**
 * Validate the form
 * @deprecated
 * @return {object} - The validation  result.
 */
function validate() {
    console.warn('This function will be deprecated in the version 0.6.0 the validate function should be custom for the project, instead call this._validate');
    return this._validate();
}

module.exports = {
    _fieldsValidation: _fieldsValidation,
    _customValidation: _customValidation,
    _validate: _validate,
    validate: validate
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiaXNFbXB0eSIsImlzRnVuY3Rpb24iLCJhc3NpZ24iLCJfZmllbGRzVmFsaWRhdGlvbiIsInZhbGlkYXRpb25NYXAiLCJpbnB0S2V5IiwicmVmcyIsInZhbGlkYXRlIiwidmFsaWRhdGlvblJlcyIsInVuZGVmaW5lZCIsIl9jdXN0b21WYWxpZGF0aW9uIiwiY3VzdG9tVmFsaWRhdGlvbiIsIl92YWxpZGF0ZSIsImNvbnNvbGUiLCJ3YXJuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO2VBQzRCQSxRQUFRLGFBQVIsQztJQUF2QkMsTyxZQUFBQSxPO0lBQVNDLFUsWUFBQUEsVTs7QUFDZCxJQUFJQyxTQUFTSCxRQUFRLGVBQVIsQ0FBYjs7QUFFQTs7Ozs7QUFLQSxTQUFTSSxpQkFBVCxHQUE2QjtBQUN6QixRQUFJQyxnQkFBZ0IsRUFBcEI7QUFDQSxTQUFLLElBQUlDLE9BQVQsSUFBb0IsS0FBS0MsSUFBekIsRUFBK0I7QUFDM0I7QUFDQSxZQUFHTCxXQUFXLEtBQUtLLElBQUwsQ0FBVUQsT0FBVixFQUFtQkUsUUFBOUIsQ0FBSCxFQUE0QztBQUN4QyxnQkFBSUMsZ0JBQWdCLEtBQUtGLElBQUwsQ0FBVUQsT0FBVixFQUFtQkUsUUFBbkIsRUFBcEI7QUFDQSxnQkFBR0Msa0JBQWtCQyxTQUFyQixFQUFnQztBQUM1QlAsdUJBQU9FLGFBQVAsc0JBQ0tDLE9BREwsRUFDZUcsYUFEZjtBQUdIO0FBQ0o7QUFDSjtBQUNELFFBQUdSLFFBQVFJLGFBQVIsQ0FBSCxFQUEyQjtBQUN2QixlQUFPLElBQVA7QUFDSDtBQUNELFdBQU8sS0FBUDtBQUNIO0FBQ0Q7Ozs7QUFJQSxTQUFTTSxpQkFBVCxHQUE2QjtBQUN6QixRQUFHLEtBQUtDLGdCQUFSLEVBQTBCO0FBQ3RCLGVBQU8sS0FBS0EsZ0JBQUwsRUFBUDtBQUNIO0FBQ0QsV0FBTyxJQUFQO0FBQ0g7QUFDRDs7OztBQUlBLFNBQVNDLFNBQVQsR0FBcUI7QUFDakIsV0FBTyxLQUFLVCxpQkFBTCxNQUE0QixLQUFLTyxpQkFBTCxFQUFuQztBQUNIOztBQUVEOzs7OztBQUtBLFNBQVNILFFBQVQsR0FBb0I7QUFDaEJNLFlBQVFDLElBQVIsQ0FBYSwySUFBYjtBQUNBLFdBQU8sS0FBS0YsU0FBTCxFQUFQO0FBQ0g7O0FBRURHLE9BQU9DLE9BQVAsR0FBaUI7QUFDYmIsd0NBRGE7QUFFYk8sd0NBRmE7QUFHYkUsd0JBSGE7QUFJYkw7QUFKYSxDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY2llcy5cclxubGV0IHtpc0VtcHR5LCBpc0Z1bmN0aW9ufSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nJyk7XHJcbmxldCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XHJcblxyXG4vKipcclxuKiBWYWxpZGF0ZSBlYWNoIGZpZWxkIG9mIHRoZSBmb3JtLlxyXG4qIEluIGNhc2Ugb2YgZXJyb3JzIHRoZSBzdGF0ZSBpcyBtb2RpZmllZC5cclxuKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBBIGJvb2xlYW4gdHJ1ZSBpZiB0aGUgdmFsaWRhdGlvbiBpcyBjb3JyZWN0LlxyXG4qL1xyXG5mdW5jdGlvbiBfZmllbGRzVmFsaWRhdGlvbigpIHtcclxuICAgIGxldCB2YWxpZGF0aW9uTWFwID0ge307XHJcbiAgICBmb3IgKGxldCBpbnB0S2V5IGluIHRoaXMucmVmcykge1xyXG4gICAgICAgIC8vdmFsaWRhdGUgb25seSB0aGUgcmVmZXJlbmNlIGVsZW1lbnRzIHdoaWNoIGhhdmUgdmFsaWRlIGZ1bmN0aW9uXHJcbiAgICAgICAgaWYoaXNGdW5jdGlvbih0aGlzLnJlZnNbaW5wdEtleV0udmFsaWRhdGUpKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWxpZGF0aW9uUmVzID0gdGhpcy5yZWZzW2lucHRLZXldLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmKHZhbGlkYXRpb25SZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYXNzaWduKHZhbGlkYXRpb25NYXAsIHtcclxuICAgICAgICAgICAgICAgICAgICBbaW5wdEtleV06IHZhbGlkYXRpb25SZXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoaXNFbXB0eSh2YWxpZGF0aW9uTWFwKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbi8qKlxyXG4gKiBDdXN0b20gdmFsaWRhdGlvbiBvZiB0aGUgZmllbGQuXHJcbiAqIEByZXR1cm4ge3RydWV9IC0gIElmIHRoZSBjdXN0b20gdmFsaWRhdGlvbiBpcyBkZWZpbmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gX2N1c3RvbVZhbGlkYXRpb24oKSB7XHJcbiAgICBpZih0aGlzLmN1c3RvbVZhbGlkYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXN0b21WYWxpZGF0aW9uKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG4vKipcclxuICogVmFsaWRhdGUgLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSAtIFRydWUgaWYgdGhlIHZhbGlkYXRpb24gaXMgb2suXHJcbiAqL1xyXG5mdW5jdGlvbiBfdmFsaWRhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRzVmFsaWRhdGlvbigpICYmIHRoaXMuX2N1c3RvbVZhbGlkYXRpb24oKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlIHRoZSBmb3JtXHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqIEByZXR1cm4ge29iamVjdH0gLSBUaGUgdmFsaWRhdGlvbiAgcmVzdWx0LlxyXG4gKi9cclxuZnVuY3Rpb24gdmFsaWRhdGUoKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ1RoaXMgZnVuY3Rpb24gd2lsbCBiZSBkZXByZWNhdGVkIGluIHRoZSB2ZXJzaW9uIDAuNi4wIHRoZSB2YWxpZGF0ZSBmdW5jdGlvbiBzaG91bGQgYmUgY3VzdG9tIGZvciB0aGUgcHJvamVjdCwgaW5zdGVhZCBjYWxsIHRoaXMuX3ZhbGlkYXRlJyk7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGUoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBfZmllbGRzVmFsaWRhdGlvbixcclxuICAgIF9jdXN0b21WYWxpZGF0aW9uLFxyXG4gICAgX3ZhbGlkYXRlLFxyXG4gICAgdmFsaWRhdGVcclxufTtcclxuIl19