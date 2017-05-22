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

        if (isRequired && ((0, _lang.isUndefined)(value) || (0, _lang.isNull)(null) || (0, _lang.isEmpty)(value))) {
            return this.i18n('field.required', { name: this.i18n(label) });
        }
        //The validation is performed only when the field has a value, otherwise, only the required validation is performed.
        if (validator && !(0, _lang.isUndefined)(value) && !(0, _lang.isNull)(value) && !(0, _lang.isEmpty)(value)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ2YWxpZGF0aW9uTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJpc1JlcXVpcmVkIiwidmFsaWRhdG9yIiwidW5kZWZpbmVkIiwiX2NvbXB1dGVWYWxpZGF0aW9uU3RhdHVzIiwidmFsaWRhdGlvblN0YXR1cyIsImlzVmFsaWQiLCJlcnJvcnMiLCJqb2luIiwidmFsaWRhdGVJbnB1dCIsInZhbGlkYXRlSW5wdXRUZXh0Iiwic2hvdWxkQ29tcG9uZW50SGFuZGxlVmFsaWRhdGlvbiIsInJlZnMiLCJpbnB1dCIsInZhbGlkYXRlIiwidmFsdWUiLCJnZXRWYWx1ZSIsInByb3BzIiwibGFiZWwiLCJpMThuIiwibmFtZSIsInZhbGlkU3RhdCIsIl9jdXN0b21WYWxpZGF0ZSIsImNvbXBvbmVudFZhbGlkYXRpb24iLCJtZXNzYWdlIiwic2V0RXJyb3IiLCJzZXRFcnJvck9uRmllbGQiLCJlcnJvciIsInNldFN0YXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBRUEsSUFBSUEsa0JBQWlCO0FBQ2pCQyxZQUFRLGFBRFM7QUFFakI7QUFDQUMscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDeEMsZUFBTztBQUNIQyx3QkFBWSxLQURUO0FBRUhDLHVCQUFXQztBQUZSLFNBQVA7QUFJSCxLQVJnQjtBQVNqQjs7Ozs7QUFLQUMsNEJBZGlCLG9DQWNRQyxnQkFkUixFQWMwQjtBQUN2QyxZQUFJQSxpQkFBaUJDLE9BQXJCLEVBQThCO0FBQzFCLG1CQUFPLElBQVA7QUFDSDtBQUNELGVBQU9ELGlCQUFpQkUsTUFBakIsQ0FBd0JDLElBQXhCLENBQTZCLElBQTdCLENBQVA7QUFDSCxLQW5CZ0I7O0FBb0JqQjs7OztBQUlBQyxtQkFBZSxTQUFTQyxpQkFBVCxHQUE2QjtBQUN4QyxZQUFNQyxrQ0FBa0MsS0FBS0MsSUFBTCxJQUFhLEtBQUtBLElBQUwsQ0FBVUMsS0FBdkIsSUFBZ0Msc0JBQVcsS0FBS0QsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyxRQUEzQixDQUF4RTtBQUNBLFlBQUlDLFFBQVEsS0FBS0MsUUFBTCxFQUFaO0FBRndDLHFCQUdILEtBQUtDLEtBSEY7QUFBQSxZQUduQ2hCLFVBSG1DLFVBR25DQSxVQUhtQztBQUFBLFlBR3ZCQyxTQUh1QixVQUd2QkEsU0FIdUI7QUFBQSxZQUdaZ0IsS0FIWSxVQUdaQSxLQUhZOztBQUl4QyxZQUFJakIsZUFBZSx1QkFBWWMsS0FBWixLQUFzQixrQkFBTyxJQUFQLENBQXRCLElBQXNDLG1CQUFRQSxLQUFSLENBQXJELENBQUosRUFBMEU7QUFDdEUsbUJBQU8sS0FBS0ksSUFBTCxDQUFVLGdCQUFWLEVBQTRCLEVBQUNDLE1BQU0sS0FBS0QsSUFBTCxDQUFVRCxLQUFWLENBQVAsRUFBNUIsQ0FBUDtBQUNIO0FBQ0Q7QUFDQSxZQUFJaEIsYUFBYSxDQUFDLHVCQUFZYSxLQUFaLENBQWQsSUFBb0MsQ0FBQyxrQkFBT0EsS0FBUCxDQUFyQyxJQUFzRCxDQUFDLG1CQUFRQSxLQUFSLENBQTNELEVBQTJFO0FBQ3ZFLGdCQUFJTSxZQUFZLEtBQUtqQix3QkFBTCxDQUNaLHdCQUNJLEVBQUNXLE9BQU9BLEtBQVIsRUFBZUssTUFBTSxLQUFLRCxJQUFMLENBQVVELEtBQVYsQ0FBckIsRUFESixFQUVJaEIsU0FGSixDQURZLENBQWhCO0FBTUEsZ0JBQUksU0FBU21CLFNBQWIsRUFBd0I7QUFDcEJBLDRCQUFZLEtBQUtGLElBQUwsQ0FBVUUsU0FBVixDQUFaO0FBQ0g7QUFDRCxtQkFBT0EsU0FBUDtBQUNIO0FBQ0QsZUFBT1Ysa0NBQWtDLEtBQUtXLGVBQUwsQ0FBcUIsS0FBS1YsSUFBTCxDQUFVQyxLQUEvQixDQUFsQyxHQUEwRSxJQUFqRjtBQUNILEtBN0NnQjtBQThDakJTLG1CQTlDaUIsaUNBOENnQztBQUFBLFlBQXRCQyxtQkFBc0IsUUFBaENULFFBQWdDOztBQUFBLG1DQUNsQlMscUJBRGtCO0FBQUEsWUFDdENqQixPQURzQyx3QkFDdENBLE9BRHNDO0FBQUEsWUFDN0JrQixPQUQ2Qix3QkFDN0JBLE9BRDZCOztBQUU3QyxlQUFPbEIsVUFBVSxJQUFWLEdBQWlCLEtBQUthLElBQUwsQ0FBVUssT0FBVixDQUF4QjtBQUNILEtBakRnQjs7QUFrRGpCOzs7O0FBSUFWLFlBdERpQixzQkFzRE47QUFDUCxZQUFNUixVQUFVLEtBQUtHLGFBQUwsRUFBaEI7QUFDQSxZQUFJLFNBQVNILE9BQWIsRUFBc0I7QUFDbEIsaUJBQUttQixRQUFMLENBQWNuQixPQUFkO0FBQ0EsbUJBQU9BLE9BQVA7QUFDSDtBQUNKLEtBNURnQjs7QUE2RGpCOzs7O0FBSUFtQixjQUFVLFNBQVNDLGVBQVQsQ0FBeUJDLEtBQXpCLEVBQWdDO0FBQ3RDLGFBQUtDLFFBQUwsQ0FBYyxFQUFFRCxPQUFPQSxLQUFULEVBQWQ7QUFDSDtBQW5FZ0IsQ0FBckI7QUFxRUFFLE9BQU9DLE9BQVAsR0FBaUJoQyxlQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHZhbGlkYXRlIGZyb20gJ2ZvY3VzLWNvcmUvZGVmaW5pdGlvbi92YWxpZGF0b3IvdmFsaWRhdGUnO1xyXG5pbXBvcnQge2lzTnVsbCwgaXNVbmRlZmluZWQsIGlzRnVuY3Rpb24sIGlzRW1wdHl9IGZyb20gJ2xvZGFzaC9sYW5nJztcclxuXHJcbmltcG9ydCB7bWl4aW4gYXMgaTE4bk1peGlufSBmcm9tICcuLi8uLi9pMThuJztcclxuXHJcbmxldCB2YWxpZGF0aW9uTWl4aW4gPXtcclxuICAgIG1peGluczogW2kxOG5NaXhpbl0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzUmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWxpZGF0b3I6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXB1dGUgdGhlIHZhbGlkYXRpb24gc3RhdHVzIGFuZCBtZXJnZSBhbGwgZXJyb3JzIGludG8gb25lLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IHZhbGlkYXRpb25TdGF0dXMgLSBUaGUgcmVzdWx0IGZyb20gdGhlIHZhbGlkYXRpb24uXHJcbiAgICAqIEByZXR1cm4ge3RydWUgfCBzdHJpbmd9IC0gdHJ1ZSBpZiB0aGUgdmFsaWRhdGlvbiBpcyBvayBhbmQgYSBtZXNzYWdlIGlmIGl0IGlzIG5vdCB0aGUgY2FzZS5cclxuICAgICovXHJcbiAgICBfY29tcHV0ZVZhbGlkYXRpb25TdGF0dXModmFsaWRhdGlvblN0YXR1cykge1xyXG4gICAgICAgIGlmICh2YWxpZGF0aW9uU3RhdHVzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdHVzLmVycm9ycy5qb2luKCcsICcpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBWYWxpZGF0ZSB0aGUgaW5wdXQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH1cclxuICAgICovXHJcbiAgICB2YWxpZGF0ZUlucHV0OiBmdW5jdGlvbiB2YWxpZGF0ZUlucHV0VGV4dCgpIHtcclxuICAgICAgICBjb25zdCBzaG91bGRDb21wb25lbnRIYW5kbGVWYWxpZGF0aW9uID0gdGhpcy5yZWZzICYmIHRoaXMucmVmcy5pbnB1dCAmJiBpc0Z1bmN0aW9uKHRoaXMucmVmcy5pbnB1dC52YWxpZGF0ZSk7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIGxldCB7aXNSZXF1aXJlZCwgdmFsaWRhdG9yLCBsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc1JlcXVpcmVkICYmIChpc1VuZGVmaW5lZCh2YWx1ZSkgfHwgaXNOdWxsKG51bGwpIHx8IGlzRW1wdHkodmFsdWUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuKCdmaWVsZC5yZXF1aXJlZCcsIHtuYW1lOiB0aGlzLmkxOG4obGFiZWwpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vVGhlIHZhbGlkYXRpb24gaXMgcGVyZm9ybWVkIG9ubHkgd2hlbiB0aGUgZmllbGQgaGFzIGEgdmFsdWUsIG90aGVyd2lzZSwgb25seSB0aGUgcmVxdWlyZWQgdmFsaWRhdGlvbiBpcyBwZXJmb3JtZWQuXHJcbiAgICAgICAgaWYgKHZhbGlkYXRvciAmJiAhaXNVbmRlZmluZWQodmFsdWUpICYmICFpc051bGwodmFsdWUpICYmICFpc0VtcHR5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICBsZXQgdmFsaWRTdGF0ID0gdGhpcy5fY29tcHV0ZVZhbGlkYXRpb25TdGF0dXMoXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZShcclxuICAgICAgICAgICAgICAgICAgICB7dmFsdWU6IHZhbHVlLCBuYW1lOiB0aGlzLmkxOG4obGFiZWwpfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKHRydWUgIT09IHZhbGlkU3RhdCkge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRTdGF0ID0gdGhpcy5pMThuKHZhbGlkU3RhdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbGlkU3RhdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNob3VsZENvbXBvbmVudEhhbmRsZVZhbGlkYXRpb24gPyB0aGlzLl9jdXN0b21WYWxpZGF0ZSh0aGlzLnJlZnMuaW5wdXQpIDogdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBfY3VzdG9tVmFsaWRhdGUoe3ZhbGlkYXRlOiBjb21wb25lbnRWYWxpZGF0aW9ufSkge1xyXG4gICAgICAgIGNvbnN0IHtpc1ZhbGlkLCBtZXNzYWdlfSA9IGNvbXBvbmVudFZhbGlkYXRpb24oKTtcclxuICAgICAgICByZXR1cm4gaXNWYWxpZCA/IHRydWUgOiB0aGlzLmkxOG4obWVzc2FnZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFZhbGlkYXRlIHRoZSBmaWVsZC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIHVuZGVmaW5lZCBpZiB2YWxpZCwge25hbWU6IFwiZXJyb3JzXCJ9IGlmIG5vdCB2YWxpZC5cclxuICAgICovXHJcbiAgICB2YWxpZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy52YWxpZGF0ZUlucHV0KCk7XHJcbiAgICAgICAgaWYgKHRydWUgIT09IGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFcnJvcihpc1ZhbGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBTZXQgdGhlIGVycm9yIG9uIHRoZSBmaWVsZC5cclxuICAgICogQHBhcmFtIGVycm9yIEVycm9yIHRvIHNldC5cclxuICAgICovXHJcbiAgICBzZXRFcnJvcjogZnVuY3Rpb24gc2V0RXJyb3JPbkZpZWxkKGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiBlcnJvciB9KTtcclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0aW9uTWl4aW47XHJcbiJdfQ==