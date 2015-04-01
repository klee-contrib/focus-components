var validationMixin ={
  /** @inheritdoc */
  getDefaultProps: function getDefaultProps(){
    return {
      isRequired: false,
      validator: undefined
    };
  },
  /**
   * Validate the input.
   * @return {object}
   */
  validateInput: function validateInputText() {
    var value = this.getValue();
    if (this.props.isRequired && (value === undefined || value === "")) {
      return `Le champ ${this.props.name} est requis`;
    }
    if (this.props.validator) {
      return this.props.validator(value);
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
      this.setState({error: validationStatus});
      return validationStatus;
    }
    return;
  }
};
module.exports = validationMixin;
