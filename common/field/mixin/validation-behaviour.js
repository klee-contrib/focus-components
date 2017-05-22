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

        if (isRequired && ((0, _lang.isUndefined)(value) || (0, _lang.isNull)(value) || (0, _lang.isEmpty)(value))) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ2YWxpZGF0aW9uTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJpc1JlcXVpcmVkIiwidmFsaWRhdG9yIiwidW5kZWZpbmVkIiwiX2NvbXB1dGVWYWxpZGF0aW9uU3RhdHVzIiwidmFsaWRhdGlvblN0YXR1cyIsImlzVmFsaWQiLCJlcnJvcnMiLCJqb2luIiwidmFsaWRhdGVJbnB1dCIsInZhbGlkYXRlSW5wdXRUZXh0Iiwic2hvdWxkQ29tcG9uZW50SGFuZGxlVmFsaWRhdGlvbiIsInJlZnMiLCJpbnB1dCIsInZhbGlkYXRlIiwidmFsdWUiLCJnZXRWYWx1ZSIsInByb3BzIiwibGFiZWwiLCJpMThuIiwibmFtZSIsInZhbGlkU3RhdCIsIl9jdXN0b21WYWxpZGF0ZSIsImNvbXBvbmVudFZhbGlkYXRpb24iLCJtZXNzYWdlIiwic2V0RXJyb3IiLCJzZXRFcnJvck9uRmllbGQiLCJlcnJvciIsInNldFN0YXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBRUEsSUFBSUEsa0JBQWlCO0FBQ2pCQyxZQUFRLGFBRFM7QUFFakI7QUFDQUMscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDeEMsZUFBTztBQUNIQyx3QkFBWSxLQURUO0FBRUhDLHVCQUFXQztBQUZSLFNBQVA7QUFJSCxLQVJnQjtBQVNqQjs7Ozs7QUFLQUMsNEJBZGlCLG9DQWNRQyxnQkFkUixFQWMwQjtBQUN2QyxZQUFJQSxpQkFBaUJDLE9BQXJCLEVBQThCO0FBQzFCLG1CQUFPLElBQVA7QUFDSDtBQUNELGVBQU9ELGlCQUFpQkUsTUFBakIsQ0FBd0JDLElBQXhCLENBQTZCLElBQTdCLENBQVA7QUFDSCxLQW5CZ0I7O0FBb0JqQjs7OztBQUlBQyxtQkFBZSxTQUFTQyxpQkFBVCxHQUE2QjtBQUN4QyxZQUFNQyxrQ0FBa0MsS0FBS0MsSUFBTCxJQUFhLEtBQUtBLElBQUwsQ0FBVUMsS0FBdkIsSUFBZ0Msc0JBQVcsS0FBS0QsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyxRQUEzQixDQUF4RTtBQUNBLFlBQUlDLFFBQVEsS0FBS0MsUUFBTCxFQUFaO0FBRndDLHFCQUdILEtBQUtDLEtBSEY7QUFBQSxZQUduQ2hCLFVBSG1DLFVBR25DQSxVQUhtQztBQUFBLFlBR3ZCQyxTQUh1QixVQUd2QkEsU0FIdUI7QUFBQSxZQUdaZ0IsS0FIWSxVQUdaQSxLQUhZOztBQUl4QyxZQUFJakIsZUFBZSx1QkFBWWMsS0FBWixLQUFzQixrQkFBT0EsS0FBUCxDQUF0QixJQUF1QyxtQkFBUUEsS0FBUixDQUF0RCxDQUFKLEVBQTJFO0FBQ3ZFLG1CQUFPLEtBQUtJLElBQUwsQ0FBVSxnQkFBVixFQUE0QixFQUFDQyxNQUFNLEtBQUtELElBQUwsQ0FBVUQsS0FBVixDQUFQLEVBQTVCLENBQVA7QUFDSDtBQUNEO0FBQ0EsWUFBSWhCLGFBQWEsQ0FBQyx1QkFBWWEsS0FBWixDQUFkLElBQW9DLENBQUMsa0JBQU9BLEtBQVAsQ0FBckMsSUFBc0QsQ0FBQyxtQkFBUUEsS0FBUixDQUEzRCxFQUEyRTtBQUN2RSxnQkFBSU0sWUFBWSxLQUFLakIsd0JBQUwsQ0FDWix3QkFDSSxFQUFDVyxPQUFPQSxLQUFSLEVBQWVLLE1BQU0sS0FBS0QsSUFBTCxDQUFVRCxLQUFWLENBQXJCLEVBREosRUFFSWhCLFNBRkosQ0FEWSxDQUFoQjtBQU1BLGdCQUFJLFNBQVNtQixTQUFiLEVBQXdCO0FBQ3BCQSw0QkFBWSxLQUFLRixJQUFMLENBQVVFLFNBQVYsQ0FBWjtBQUNIO0FBQ0QsbUJBQU9BLFNBQVA7QUFDSDtBQUNELGVBQU9WLGtDQUFrQyxLQUFLVyxlQUFMLENBQXFCLEtBQUtWLElBQUwsQ0FBVUMsS0FBL0IsQ0FBbEMsR0FBMEUsSUFBakY7QUFDSCxLQTdDZ0I7QUE4Q2pCUyxtQkE5Q2lCLGlDQThDZ0M7QUFBQSxZQUF0QkMsbUJBQXNCLFFBQWhDVCxRQUFnQzs7QUFBQSxtQ0FDbEJTLHFCQURrQjtBQUFBLFlBQ3RDakIsT0FEc0Msd0JBQ3RDQSxPQURzQztBQUFBLFlBQzdCa0IsT0FENkIsd0JBQzdCQSxPQUQ2Qjs7QUFFN0MsZUFBT2xCLFVBQVUsSUFBVixHQUFpQixLQUFLYSxJQUFMLENBQVVLLE9BQVYsQ0FBeEI7QUFDSCxLQWpEZ0I7O0FBa0RqQjs7OztBQUlBVixZQXREaUIsc0JBc0ROO0FBQ1AsWUFBTVIsVUFBVSxLQUFLRyxhQUFMLEVBQWhCO0FBQ0EsWUFBSSxTQUFTSCxPQUFiLEVBQXNCO0FBQ2xCLGlCQUFLbUIsUUFBTCxDQUFjbkIsT0FBZDtBQUNBLG1CQUFPQSxPQUFQO0FBQ0g7QUFDSixLQTVEZ0I7O0FBNkRqQjs7OztBQUlBbUIsY0FBVSxTQUFTQyxlQUFULENBQXlCQyxLQUF6QixFQUFnQztBQUN0QyxhQUFLQyxRQUFMLENBQWMsRUFBRUQsT0FBT0EsS0FBVCxFQUFkO0FBQ0g7QUFuRWdCLENBQXJCO0FBcUVBRSxPQUFPQyxPQUFQLEdBQWlCaEMsZUFBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB2YWxpZGF0ZSBmcm9tICdmb2N1cy1jb3JlL2RlZmluaXRpb24vdmFsaWRhdG9yL3ZhbGlkYXRlJztcclxuaW1wb3J0IHtpc051bGwsIGlzVW5kZWZpbmVkLCBpc0Z1bmN0aW9uLCBpc0VtcHR5fSBmcm9tICdsb2Rhc2gvbGFuZyc7XHJcblxyXG5pbXBvcnQge21peGluIGFzIGkxOG5NaXhpbn0gZnJvbSAnLi4vLi4vaTE4bic7XHJcblxyXG5sZXQgdmFsaWRhdGlvbk1peGluID17XHJcbiAgICBtaXhpbnM6IFtpMThuTWl4aW5dLFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc1JlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsaWRhdG9yOiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDb21wdXRlIHRoZSB2YWxpZGF0aW9uIHN0YXR1cyBhbmQgbWVyZ2UgYWxsIGVycm9ycyBpbnRvIG9uZS5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSB2YWxpZGF0aW9uU3RhdHVzIC0gVGhlIHJlc3VsdCBmcm9tIHRoZSB2YWxpZGF0aW9uLlxyXG4gICAgKiBAcmV0dXJuIHt0cnVlIHwgc3RyaW5nfSAtIHRydWUgaWYgdGhlIHZhbGlkYXRpb24gaXMgb2sgYW5kIGEgbWVzc2FnZSBpZiBpdCBpcyBub3QgdGhlIGNhc2UuXHJcbiAgICAqL1xyXG4gICAgX2NvbXB1dGVWYWxpZGF0aW9uU3RhdHVzKHZhbGlkYXRpb25TdGF0dXMpIHtcclxuICAgICAgICBpZiAodmFsaWRhdGlvblN0YXR1cy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsaWRhdGlvblN0YXR1cy5lcnJvcnMuam9pbignLCAnKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogVmFsaWRhdGUgdGhlIGlucHV0LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9XHJcbiAgICAqL1xyXG4gICAgdmFsaWRhdGVJbnB1dDogZnVuY3Rpb24gdmFsaWRhdGVJbnB1dFRleHQoKSB7XHJcbiAgICAgICAgY29uc3Qgc2hvdWxkQ29tcG9uZW50SGFuZGxlVmFsaWRhdGlvbiA9IHRoaXMucmVmcyAmJiB0aGlzLnJlZnMuaW5wdXQgJiYgaXNGdW5jdGlvbih0aGlzLnJlZnMuaW5wdXQudmFsaWRhdGUpO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcclxuICAgICAgICBsZXQge2lzUmVxdWlyZWQsIHZhbGlkYXRvciwgbGFiZWx9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoaXNSZXF1aXJlZCAmJiAoaXNVbmRlZmluZWQodmFsdWUpIHx8IGlzTnVsbCh2YWx1ZSkgfHwgaXNFbXB0eSh2YWx1ZSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmkxOG4oJ2ZpZWxkLnJlcXVpcmVkJywge25hbWU6IHRoaXMuaTE4bihsYWJlbCl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9UaGUgdmFsaWRhdGlvbiBpcyBwZXJmb3JtZWQgb25seSB3aGVuIHRoZSBmaWVsZCBoYXMgYSB2YWx1ZSwgb3RoZXJ3aXNlLCBvbmx5IHRoZSByZXF1aXJlZCB2YWxpZGF0aW9uIGlzIHBlcmZvcm1lZC5cclxuICAgICAgICBpZiAodmFsaWRhdG9yICYmICFpc1VuZGVmaW5lZCh2YWx1ZSkgJiYgIWlzTnVsbCh2YWx1ZSkgJiYgIWlzRW1wdHkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWxpZFN0YXQgPSB0aGlzLl9jb21wdXRlVmFsaWRhdGlvblN0YXR1cyhcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHt2YWx1ZTogdmFsdWUsIG5hbWU6IHRoaXMuaTE4bihsYWJlbCl9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvclxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAodHJ1ZSAhPT0gdmFsaWRTdGF0KSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZFN0YXQgPSB0aGlzLmkxOG4odmFsaWRTdGF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRTdGF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hvdWxkQ29tcG9uZW50SGFuZGxlVmFsaWRhdGlvbiA/IHRoaXMuX2N1c3RvbVZhbGlkYXRlKHRoaXMucmVmcy5pbnB1dCkgOiB0cnVlO1xyXG4gICAgfSxcclxuICAgIF9jdXN0b21WYWxpZGF0ZSh7dmFsaWRhdGU6IGNvbXBvbmVudFZhbGlkYXRpb259KSB7XHJcbiAgICAgICAgY29uc3Qge2lzVmFsaWQsIG1lc3NhZ2V9ID0gY29tcG9uZW50VmFsaWRhdGlvbigpO1xyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkID8gdHJ1ZSA6IHRoaXMuaTE4bihtZXNzYWdlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogVmFsaWRhdGUgdGhlIGZpZWxkLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gdW5kZWZpbmVkIGlmIHZhbGlkLCB7bmFtZTogXCJlcnJvcnNcIn0gaWYgbm90IHZhbGlkLlxyXG4gICAgKi9cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLnZhbGlkYXRlSW5wdXQoKTtcclxuICAgICAgICBpZiAodHJ1ZSAhPT0gaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEVycm9yKGlzVmFsaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFNldCB0aGUgZXJyb3Igb24gdGhlIGZpZWxkLlxyXG4gICAgKiBAcGFyYW0gZXJyb3IgRXJyb3IgdG8gc2V0LlxyXG4gICAgKi9cclxuICAgIHNldEVycm9yOiBmdW5jdGlvbiBzZXRFcnJvck9uRmllbGQoZXJyb3IpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3I6IGVycm9yIH0pO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRpb25NaXhpbjtcclxuIl19