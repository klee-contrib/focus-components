'use strict';

var _validate = require('focus-core/definition/validator/validate');

var _validate2 = _interopRequireDefault(_validate);

var _lang = require('lodash/lang');

var _i18n = require('../../i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validationMixin = {
    mixins: [_i18n.mixin],
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
        var shouldComponentHandleValidation = this.refs && this.refs.input && (0, _lang.isFunction)(this.refs.input.validate);
        var value = this.getValue();
        var _props = this.props,
            isRequired = _props.isRequired,
            validator = _props.validator,
            label = _props.label;

        var isEmptyValue = (0, _lang.isUndefined)(value) || (0, _lang.isNull)(value) || ((0, _lang.isArray)(value) || (0, _lang.isObject)(value) || (0, _lang.isString)(value)) && (0, _lang.isEmpty)(value);

        if (isRequired && isEmptyValue) {
            return this.i18n('field.required', { name: this.i18n(label) });
        }
        //The validation is performed only when the field has a value, otherwise, only the required validation is performed.
        if (validator && !isEmptyValue) {
            var validStat = this._computeValidationStatus((0, _validate2.default)({ value: value, name: this.i18n(label) }, validator));
            if (true !== validStat) {
                validStat = this.i18n(validStat);
            }
            return validStat;
        }
        return shouldComponentHandleValidation ? this._customValidate(this.refs.input) : true;
    },
    _customValidate: function _customValidate(_ref) {
        var componentValidation = _ref.validate;

        var _componentValidation = componentValidation(),
            isValid = _componentValidation.isValid,
            message = _componentValidation.message;

        return isValid ? true : this.i18n(message);
    },

    /**
    * Validate the field.
    * @return {object} - undefined if valid, {name: "errors"} if not valid.
    */
    validate: function validate() {
        var isValid = this.validateInput();
        if (true !== isValid) {
            this.setError(isValid);
            return isValid;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ2YWxpZGF0aW9uTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJpc1JlcXVpcmVkIiwidmFsaWRhdG9yIiwidW5kZWZpbmVkIiwiX2NvbXB1dGVWYWxpZGF0aW9uU3RhdHVzIiwidmFsaWRhdGlvblN0YXR1cyIsImlzVmFsaWQiLCJlcnJvcnMiLCJqb2luIiwidmFsaWRhdGVJbnB1dCIsInZhbGlkYXRlSW5wdXRUZXh0Iiwic2hvdWxkQ29tcG9uZW50SGFuZGxlVmFsaWRhdGlvbiIsInJlZnMiLCJpbnB1dCIsInZhbGlkYXRlIiwidmFsdWUiLCJnZXRWYWx1ZSIsInByb3BzIiwibGFiZWwiLCJpc0VtcHR5VmFsdWUiLCJpMThuIiwibmFtZSIsInZhbGlkU3RhdCIsIl9jdXN0b21WYWxpZGF0ZSIsImNvbXBvbmVudFZhbGlkYXRpb24iLCJtZXNzYWdlIiwic2V0RXJyb3IiLCJzZXRFcnJvck9uRmllbGQiLCJlcnJvciIsInNldFN0YXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBRUEsSUFBSUEsa0JBQWlCO0FBQ2pCQyxZQUFRLGFBRFM7QUFFakI7QUFDQUMscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDeEMsZUFBTztBQUNIQyx3QkFBWSxLQURUO0FBRUhDLHVCQUFXQztBQUZSLFNBQVA7QUFJSCxLQVJnQjtBQVNqQjs7Ozs7QUFLQUMsNEJBZGlCLG9DQWNRQyxnQkFkUixFQWMwQjtBQUN2QyxZQUFJQSxpQkFBaUJDLE9BQXJCLEVBQThCO0FBQzFCLG1CQUFPLElBQVA7QUFDSDtBQUNELGVBQU9ELGlCQUFpQkUsTUFBakIsQ0FBd0JDLElBQXhCLENBQTZCLElBQTdCLENBQVA7QUFDSCxLQW5CZ0I7O0FBb0JqQjs7OztBQUlBQyxtQkFBZSxTQUFTQyxpQkFBVCxHQUE2QjtBQUN4QyxZQUFNQyxrQ0FBa0MsS0FBS0MsSUFBTCxJQUFhLEtBQUtBLElBQUwsQ0FBVUMsS0FBdkIsSUFBZ0Msc0JBQVcsS0FBS0QsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyxRQUEzQixDQUF4RTtBQUNBLFlBQUlDLFFBQVEsS0FBS0MsUUFBTCxFQUFaO0FBRndDLHFCQUdILEtBQUtDLEtBSEY7QUFBQSxZQUduQ2hCLFVBSG1DLFVBR25DQSxVQUhtQztBQUFBLFlBR3ZCQyxTQUh1QixVQUd2QkEsU0FIdUI7QUFBQSxZQUdaZ0IsS0FIWSxVQUdaQSxLQUhZOztBQUl4QyxZQUFJQyxlQUFlLHVCQUFZSixLQUFaLEtBQXNCLGtCQUFPQSxLQUFQLENBQXRCLElBQXdDLENBQUMsbUJBQVFBLEtBQVIsS0FBa0Isb0JBQVNBLEtBQVQsQ0FBbEIsSUFBcUMsb0JBQVNBLEtBQVQsQ0FBdEMsS0FBMEQsbUJBQVFBLEtBQVIsQ0FBckg7O0FBRUEsWUFBSWQsY0FBY2tCLFlBQWxCLEVBQWdDO0FBQzVCLG1CQUFPLEtBQUtDLElBQUwsQ0FBVSxnQkFBVixFQUE0QixFQUFDQyxNQUFNLEtBQUtELElBQUwsQ0FBVUYsS0FBVixDQUFQLEVBQTVCLENBQVA7QUFDSDtBQUNEO0FBQ0EsWUFBSWhCLGFBQWEsQ0FBQ2lCLFlBQWxCLEVBQWdDO0FBQzVCLGdCQUFJRyxZQUFZLEtBQUtsQix3QkFBTCxDQUNaLHdCQUNJLEVBQUNXLE9BQU9BLEtBQVIsRUFBZU0sTUFBTSxLQUFLRCxJQUFMLENBQVVGLEtBQVYsQ0FBckIsRUFESixFQUVJaEIsU0FGSixDQURZLENBQWhCO0FBTUEsZ0JBQUksU0FBU29CLFNBQWIsRUFBd0I7QUFDcEJBLDRCQUFZLEtBQUtGLElBQUwsQ0FBVUUsU0FBVixDQUFaO0FBQ0g7QUFDRCxtQkFBT0EsU0FBUDtBQUNIO0FBQ0QsZUFBT1gsa0NBQWtDLEtBQUtZLGVBQUwsQ0FBcUIsS0FBS1gsSUFBTCxDQUFVQyxLQUEvQixDQUFsQyxHQUEwRSxJQUFqRjtBQUNILEtBL0NnQjtBQWdEakJVLG1CQWhEaUIsaUNBZ0RnQztBQUFBLFlBQXRCQyxtQkFBc0IsUUFBaENWLFFBQWdDOztBQUFBLG1DQUNsQlUscUJBRGtCO0FBQUEsWUFDdENsQixPQURzQyx3QkFDdENBLE9BRHNDO0FBQUEsWUFDN0JtQixPQUQ2Qix3QkFDN0JBLE9BRDZCOztBQUU3QyxlQUFPbkIsVUFBVSxJQUFWLEdBQWlCLEtBQUtjLElBQUwsQ0FBVUssT0FBVixDQUF4QjtBQUNILEtBbkRnQjs7QUFvRGpCOzs7O0FBSUFYLFlBeERpQixzQkF3RE47QUFDUCxZQUFNUixVQUFVLEtBQUtHLGFBQUwsRUFBaEI7QUFDQSxZQUFJLFNBQVNILE9BQWIsRUFBc0I7QUFDbEIsaUJBQUtvQixRQUFMLENBQWNwQixPQUFkO0FBQ0EsbUJBQU9BLE9BQVA7QUFDSDtBQUNKLEtBOURnQjs7QUErRGpCOzs7O0FBSUFvQixjQUFVLFNBQVNDLGVBQVQsQ0FBeUJDLEtBQXpCLEVBQWdDO0FBQ3RDLGFBQUtDLFFBQUwsQ0FBYyxFQUFFRCxPQUFPQSxLQUFULEVBQWQ7QUFDSDtBQXJFZ0IsQ0FBckI7QUF1RUFFLE9BQU9DLE9BQVAsR0FBaUJqQyxlQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHZhbGlkYXRlIGZyb20gJ2ZvY3VzLWNvcmUvZGVmaW5pdGlvbi92YWxpZGF0b3IvdmFsaWRhdGUnO1xyXG5pbXBvcnQge2lzTnVsbCwgaXNVbmRlZmluZWQsIGlzRnVuY3Rpb24sIGlzRW1wdHksIGlzQXJyYXksIGlzT2JqZWN0LCBpc1N0cmluZ30gZnJvbSAnbG9kYXNoL2xhbmcnO1xyXG5cclxuaW1wb3J0IHttaXhpbiBhcyBpMThuTWl4aW59IGZyb20gJy4uLy4uL2kxOG4nO1xyXG5cclxubGV0IHZhbGlkYXRpb25NaXhpbiA9e1xyXG4gICAgbWl4aW5zOiBbaTE4bk1peGluXSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXNSZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbGlkYXRvcjogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ29tcHV0ZSB0aGUgdmFsaWRhdGlvbiBzdGF0dXMgYW5kIG1lcmdlIGFsbCBlcnJvcnMgaW50byBvbmUuXHJcbiAgICAqIEBwYXJhbSAge29iamVjdH0gdmFsaWRhdGlvblN0YXR1cyAtIFRoZSByZXN1bHQgZnJvbSB0aGUgdmFsaWRhdGlvbi5cclxuICAgICogQHJldHVybiB7dHJ1ZSB8IHN0cmluZ30gLSB0cnVlIGlmIHRoZSB2YWxpZGF0aW9uIGlzIG9rIGFuZCBhIG1lc3NhZ2UgaWYgaXQgaXMgbm90IHRoZSBjYXNlLlxyXG4gICAgKi9cclxuICAgIF9jb21wdXRlVmFsaWRhdGlvblN0YXR1cyh2YWxpZGF0aW9uU3RhdHVzKSB7XHJcbiAgICAgICAgaWYgKHZhbGlkYXRpb25TdGF0dXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25TdGF0dXMuZXJyb3JzLmpvaW4oJywgJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFZhbGlkYXRlIHRoZSBpbnB1dC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgKi9cclxuICAgIHZhbGlkYXRlSW5wdXQ6IGZ1bmN0aW9uIHZhbGlkYXRlSW5wdXRUZXh0KCkge1xyXG4gICAgICAgIGNvbnN0IHNob3VsZENvbXBvbmVudEhhbmRsZVZhbGlkYXRpb24gPSB0aGlzLnJlZnMgJiYgdGhpcy5yZWZzLmlucHV0ICYmIGlzRnVuY3Rpb24odGhpcy5yZWZzLmlucHV0LnZhbGlkYXRlKTtcclxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XHJcbiAgICAgICAgbGV0IHtpc1JlcXVpcmVkLCB2YWxpZGF0b3IsIGxhYmVsfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgbGV0IGlzRW1wdHlWYWx1ZSA9IGlzVW5kZWZpbmVkKHZhbHVlKSB8fCBpc051bGwodmFsdWUpIHx8ICgoaXNBcnJheSh2YWx1ZSkgfHwgaXNPYmplY3QodmFsdWUpIHx8IGlzU3RyaW5nKHZhbHVlKSkgJiYgaXNFbXB0eSh2YWx1ZSkpO1xyXG5cclxuICAgICAgICBpZiAoaXNSZXF1aXJlZCAmJiBpc0VtcHR5VmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4bignZmllbGQucmVxdWlyZWQnLCB7bmFtZTogdGhpcy5pMThuKGxhYmVsKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1RoZSB2YWxpZGF0aW9uIGlzIHBlcmZvcm1lZCBvbmx5IHdoZW4gdGhlIGZpZWxkIGhhcyBhIHZhbHVlLCBvdGhlcndpc2UsIG9ubHkgdGhlIHJlcXVpcmVkIHZhbGlkYXRpb24gaXMgcGVyZm9ybWVkLlxyXG4gICAgICAgIGlmICh2YWxpZGF0b3IgJiYgIWlzRW1wdHlWYWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdmFsaWRTdGF0ID0gdGhpcy5fY29tcHV0ZVZhbGlkYXRpb25TdGF0dXMoXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZShcclxuICAgICAgICAgICAgICAgICAgICB7dmFsdWU6IHZhbHVlLCBuYW1lOiB0aGlzLmkxOG4obGFiZWwpfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHRydWUgIT09IHZhbGlkU3RhdCkge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRTdGF0ID0gdGhpcy5pMThuKHZhbGlkU3RhdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkU3RhdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNob3VsZENvbXBvbmVudEhhbmRsZVZhbGlkYXRpb24gPyB0aGlzLl9jdXN0b21WYWxpZGF0ZSh0aGlzLnJlZnMuaW5wdXQpIDogdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBfY3VzdG9tVmFsaWRhdGUoe3ZhbGlkYXRlOiBjb21wb25lbnRWYWxpZGF0aW9ufSkge1xyXG4gICAgICAgIGNvbnN0IHtpc1ZhbGlkLCBtZXNzYWdlfSA9IGNvbXBvbmVudFZhbGlkYXRpb24oKTtcclxuICAgICAgICByZXR1cm4gaXNWYWxpZCA/IHRydWUgOiB0aGlzLmkxOG4obWVzc2FnZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFZhbGlkYXRlIHRoZSBmaWVsZC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIHVuZGVmaW5lZCBpZiB2YWxpZCwge25hbWU6IFwiZXJyb3JzXCJ9IGlmIG5vdCB2YWxpZC5cclxuICAgICovXHJcbiAgICB2YWxpZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy52YWxpZGF0ZUlucHV0KCk7XHJcbiAgICAgICAgaWYgKHRydWUgIT09IGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFcnJvcihpc1ZhbGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBTZXQgdGhlIGVycm9yIG9uIHRoZSBmaWVsZC5cclxuICAgICogQHBhcmFtIGVycm9yIEVycm9yIHRvIHNldC5cclxuICAgICovXHJcbiAgICBzZXRFcnJvcjogZnVuY3Rpb24gc2V0RXJyb3JPbkZpZWxkKGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiBlcnJvciB9KTtcclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0aW9uTWl4aW47XHJcbiJdfQ==