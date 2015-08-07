
let i18nMixin = require('../../i18n').mixin;
let validate = require('focus').definition.validator.validate;
let validationMixin ={
    mixins: [i18nMixin],

  /** @inheritdoc */
  getDefaultProps: function getDefaultProps(){
    return {
      isRequired: false,
      validator: undefined
    };
  },
  _computeValidationStatus(validationStatus){
    if(validationStatus.isValid){
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
    if (this.props.isRequired && (value === undefined || value === '')) {
      return this.i18n('field.required', {name: this.i18n(this.props.label)});
    }
    if (this.props.validator) {
      var validStat = this._computeValidationStatus(validate({
          value: value,
          name: this.i18n(this.props.label)
        },
        this.props.validator
      ));
      if(validStat !== true){
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
    if(validationStatus !== true){
      this.setError(validationStatus);
      return validationStatus;
    }
    return;
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
