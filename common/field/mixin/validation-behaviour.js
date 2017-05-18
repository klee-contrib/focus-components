'use strict';

var _validate = require('focus-core/definition/validator/validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var i18nMixin = require('../../i18n').mixin;

var _require = require('lodash/lang'),
    isNull = _require.isNull,
    isUndefined = _require.isUndefined,
    isFunction = _require.isFunction;

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
        var shouldComponentHandleValidation = this.refs && this.refs.input && isFunction(this.refs.input.validate);
        var value = this.getValue();
        var _props = this.props,
            isRequired = _props.isRequired,
            validator = _props.validator,
            label = _props.label;

        if (isRequired && (undefined === value || null === value)) {
            return this.i18n('field.required', { name: this.i18n(label) });
        }
        //The validation is performed only when the field has a value, otherwise, only the required validation is performed.
        if (validator && !isUndefined(value) && !isNull(value)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpMThuTWl4aW4iLCJyZXF1aXJlIiwibWl4aW4iLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImlzRnVuY3Rpb24iLCJ2YWxpZGF0aW9uTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJpc1JlcXVpcmVkIiwidmFsaWRhdG9yIiwidW5kZWZpbmVkIiwiX2NvbXB1dGVWYWxpZGF0aW9uU3RhdHVzIiwidmFsaWRhdGlvblN0YXR1cyIsImlzVmFsaWQiLCJlcnJvcnMiLCJqb2luIiwidmFsaWRhdGVJbnB1dCIsInZhbGlkYXRlSW5wdXRUZXh0Iiwic2hvdWxkQ29tcG9uZW50SGFuZGxlVmFsaWRhdGlvbiIsInJlZnMiLCJpbnB1dCIsInZhbGlkYXRlIiwidmFsdWUiLCJnZXRWYWx1ZSIsInByb3BzIiwibGFiZWwiLCJpMThuIiwibmFtZSIsInZhbGlkU3RhdCIsIl9jdXN0b21WYWxpZGF0ZSIsImNvbXBvbmVudFZhbGlkYXRpb24iLCJtZXNzYWdlIiwic2V0RXJyb3IiLCJzZXRFcnJvck9uRmllbGQiLCJlcnJvciIsInNldFN0YXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7O0FBREEsSUFBSUEsWUFBWUMsUUFBUSxZQUFSLEVBQXNCQyxLQUF0Qzs7ZUFFd0NELFFBQVEsYUFBUixDO0lBQW5DRSxNLFlBQUFBLE07SUFBUUMsVyxZQUFBQSxXO0lBQWFDLFUsWUFBQUEsVTs7QUFDMUIsSUFBSUMsa0JBQWlCO0FBQ2pCQyxZQUFRLENBQUNQLFNBQUQsQ0FEUztBQUVqQjtBQUNBUSxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUN4QyxlQUFPO0FBQ0hDLHdCQUFZLEtBRFQ7QUFFSEMsdUJBQVdDO0FBRlIsU0FBUDtBQUlILEtBUmdCO0FBU2pCOzs7OztBQUtBQyw0QkFkaUIsb0NBY1FDLGdCQWRSLEVBYzBCO0FBQ3ZDLFlBQUdBLGlCQUFpQkMsT0FBcEIsRUFBNkI7QUFDekIsbUJBQU8sSUFBUDtBQUNIO0FBQ0QsZUFBT0QsaUJBQWlCRSxNQUFqQixDQUF3QkMsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBUDtBQUNILEtBbkJnQjs7QUFvQmpCOzs7O0FBSUFDLG1CQUFlLFNBQVNDLGlCQUFULEdBQTZCO0FBQ3hDLFlBQU1DLGtDQUFrQyxLQUFLQyxJQUFMLElBQWEsS0FBS0EsSUFBTCxDQUFVQyxLQUF2QixJQUFnQ2hCLFdBQVcsS0FBS2UsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyxRQUEzQixDQUF4RTtBQUNBLFlBQUlDLFFBQVEsS0FBS0MsUUFBTCxFQUFaO0FBRndDLHFCQUdILEtBQUtDLEtBSEY7QUFBQSxZQUduQ2hCLFVBSG1DLFVBR25DQSxVQUhtQztBQUFBLFlBR3ZCQyxTQUh1QixVQUd2QkEsU0FIdUI7QUFBQSxZQUdaZ0IsS0FIWSxVQUdaQSxLQUhZOztBQUl4QyxZQUFJakIsZUFBZUUsY0FBY1ksS0FBZCxJQUF1QixTQUFTQSxLQUEvQyxDQUFKLEVBQTJEO0FBQ3ZELG1CQUFPLEtBQUtJLElBQUwsQ0FBVSxnQkFBVixFQUE0QixFQUFDQyxNQUFNLEtBQUtELElBQUwsQ0FBVUQsS0FBVixDQUFQLEVBQTVCLENBQVA7QUFDSDtBQUNEO0FBQ0EsWUFBSWhCLGFBQWEsQ0FBQ04sWUFBWW1CLEtBQVosQ0FBZCxJQUFvQyxDQUFDcEIsT0FBT29CLEtBQVAsQ0FBekMsRUFBd0Q7QUFDcEQsZ0JBQUlNLFlBQVksS0FBS2pCLHdCQUFMLENBQ1osd0JBQ0ksRUFBQ1csT0FBT0EsS0FBUixFQUFlSyxNQUFNLEtBQUtELElBQUwsQ0FBVUQsS0FBVixDQUFyQixFQURKLEVBRUloQixTQUZKLENBRFksQ0FBaEI7QUFNQSxnQkFBRyxTQUFTbUIsU0FBWixFQUF1QjtBQUNuQkEsNEJBQVksS0FBS0YsSUFBTCxDQUFVRSxTQUFWLENBQVo7QUFDSDtBQUNELG1CQUFPQSxTQUFQO0FBQ0g7QUFDRCxlQUFPVixrQ0FBa0MsS0FBS1csZUFBTCxDQUFxQixLQUFLVixJQUFMLENBQVVDLEtBQS9CLENBQWxDLEdBQTBFLElBQWpGO0FBQ0gsS0E3Q2dCO0FBOENqQlMsbUJBOUNpQixpQ0E4Q2dDO0FBQUEsWUFBdEJDLG1CQUFzQixRQUFoQ1QsUUFBZ0M7O0FBQUEsbUNBQ2xCUyxxQkFEa0I7QUFBQSxZQUN0Q2pCLE9BRHNDLHdCQUN0Q0EsT0FEc0M7QUFBQSxZQUM3QmtCLE9BRDZCLHdCQUM3QkEsT0FENkI7O0FBRTdDLGVBQU9sQixVQUFVLElBQVYsR0FBaUIsS0FBS2EsSUFBTCxDQUFVSyxPQUFWLENBQXhCO0FBQ0gsS0FqRGdCOztBQWtEakI7Ozs7QUFJQVYsWUF0RGlCLHNCQXNETjtBQUNQLFlBQU1SLFVBQVUsS0FBS0csYUFBTCxFQUFoQjtBQUNBLFlBQUcsU0FBU0gsT0FBWixFQUFxQjtBQUNqQixpQkFBS21CLFFBQUwsQ0FBY25CLE9BQWQ7QUFDQSxtQkFBT0EsT0FBUDtBQUNIO0FBQ0osS0E1RGdCOztBQTZEakI7Ozs7QUFJQW1CLGNBQVUsU0FBU0MsZUFBVCxDQUF5QkMsS0FBekIsRUFBZ0M7QUFDdEMsYUFBS0MsUUFBTCxDQUFjLEVBQUVELE9BQU9BLEtBQVQsRUFBZDtBQUNIO0FBbkVnQixDQUFyQjtBQXFFQUUsT0FBT0MsT0FBUCxHQUFpQmhDLGVBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5sZXQgaTE4bk1peGluID0gcmVxdWlyZSgnLi4vLi4vaTE4bicpLm1peGluO1xyXG5pbXBvcnQgdmFsaWRhdGUgZnJvbSAnZm9jdXMtY29yZS9kZWZpbml0aW9uL3ZhbGlkYXRvci92YWxpZGF0ZSc7XHJcbmxldCB7aXNOdWxsLCBpc1VuZGVmaW5lZCwgaXNGdW5jdGlvbn0gPSByZXF1aXJlKCdsb2Rhc2gvbGFuZycpO1xyXG5sZXQgdmFsaWRhdGlvbk1peGluID17XHJcbiAgICBtaXhpbnM6IFtpMThuTWl4aW5dLFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc1JlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsaWRhdG9yOiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDb21wdXRlIHRoZSB2YWxpZGF0aW9uIHN0YXR1cyBhbmQgbWVyZ2UgYWxsIGVycm9ycyBpbnRvIG9uZS5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSB2YWxpZGF0aW9uU3RhdHVzIC0gVGhlIHJlc3VsdCBmcm9tIHRoZSB2YWxpZGF0aW9uLlxyXG4gICAgKiBAcmV0dXJuIHt0cnVlIHwgc3RyaW5nfSAtIHRydWUgaWYgdGhlIHZhbGlkYXRpb24gaXMgb2sgYW5kIGEgbWVzc2FnZSBpZiBpdCBpcyBub3QgdGhlIGNhc2UuXHJcbiAgICAqL1xyXG4gICAgX2NvbXB1dGVWYWxpZGF0aW9uU3RhdHVzKHZhbGlkYXRpb25TdGF0dXMpIHtcclxuICAgICAgICBpZih2YWxpZGF0aW9uU3RhdHVzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uU3RhdHVzLmVycm9ycy5qb2luKCcsICcpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBWYWxpZGF0ZSB0aGUgaW5wdXQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH1cclxuICAgICovXHJcbiAgICB2YWxpZGF0ZUlucHV0OiBmdW5jdGlvbiB2YWxpZGF0ZUlucHV0VGV4dCgpIHtcclxuICAgICAgICBjb25zdCBzaG91bGRDb21wb25lbnRIYW5kbGVWYWxpZGF0aW9uID0gdGhpcy5yZWZzICYmIHRoaXMucmVmcy5pbnB1dCAmJiBpc0Z1bmN0aW9uKHRoaXMucmVmcy5pbnB1dC52YWxpZGF0ZSk7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIGxldCB7aXNSZXF1aXJlZCwgdmFsaWRhdG9yLCBsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc1JlcXVpcmVkICYmICh1bmRlZmluZWQgPT09IHZhbHVlIHx8IG51bGwgPT09IHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuKCdmaWVsZC5yZXF1aXJlZCcsIHtuYW1lOiB0aGlzLmkxOG4obGFiZWwpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vVGhlIHZhbGlkYXRpb24gaXMgcGVyZm9ybWVkIG9ubHkgd2hlbiB0aGUgZmllbGQgaGFzIGEgdmFsdWUsIG90aGVyd2lzZSwgb25seSB0aGUgcmVxdWlyZWQgdmFsaWRhdGlvbiBpcyBwZXJmb3JtZWQuXHJcbiAgICAgICAgaWYgKHZhbGlkYXRvciAmJiAhaXNVbmRlZmluZWQodmFsdWUpICYmICFpc051bGwodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWxpZFN0YXQgPSB0aGlzLl9jb21wdXRlVmFsaWRhdGlvblN0YXR1cyhcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHt2YWx1ZTogdmFsdWUsIG5hbWU6IHRoaXMuaTE4bihsYWJlbCl9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvclxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZih0cnVlICE9PSB2YWxpZFN0YXQpIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkU3RhdCA9IHRoaXMuaTE4bih2YWxpZFN0YXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZFN0YXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaG91bGRDb21wb25lbnRIYW5kbGVWYWxpZGF0aW9uID8gdGhpcy5fY3VzdG9tVmFsaWRhdGUodGhpcy5yZWZzLmlucHV0KSA6IHRydWU7XHJcbiAgICB9LFxyXG4gICAgX2N1c3RvbVZhbGlkYXRlKHt2YWxpZGF0ZTogY29tcG9uZW50VmFsaWRhdGlvbn0pIHtcclxuICAgICAgICBjb25zdCB7aXNWYWxpZCwgbWVzc2FnZX0gPSBjb21wb25lbnRWYWxpZGF0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQgPyB0cnVlIDogdGhpcy5pMThuKG1lc3NhZ2UpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBWYWxpZGF0ZSB0aGUgZmllbGQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSB1bmRlZmluZWQgaWYgdmFsaWQsIHtuYW1lOiBcImVycm9yc1wifSBpZiBub3QgdmFsaWQuXHJcbiAgICAqL1xyXG4gICAgdmFsaWRhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IHRoaXMudmFsaWRhdGVJbnB1dCgpO1xyXG4gICAgICAgIGlmKHRydWUgIT09IGlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFcnJvcihpc1ZhbGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBTZXQgdGhlIGVycm9yIG9uIHRoZSBmaWVsZC5cclxuICAgICogQHBhcmFtIGVycm9yIEVycm9yIHRvIHNldC5cclxuICAgICovXHJcbiAgICBzZXRFcnJvcjogZnVuY3Rpb24gc2V0RXJyb3JPbkZpZWxkKGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yOiBlcnJvciB9KTtcclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0aW9uTWl4aW47XHJcbiJdfQ==