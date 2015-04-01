var valueBehaviourMixin = {
  /** @inheritdoc */
  getDefaultProps: function getDefaultValueBehaviourProps(){
    return {
      error: undefined,
      value: undefined
    };
  },
  /** @inheritdoc */
  getInitialState: function getFieldInitialState(){
    return {
      error: this.props.error,
      value: this.props.value
    };
  },
  /**
  * Get the value from the field.
  */
  getValue: function() {
    return this.refs.input.getValue();
  },
  /**
   * Handler called when the input Change its value.
   * @param {event} event - The event to set.
   */
  onInputChange: function fieldOnInputChanges(event){
    this.setState({error: undefined, value: this.getValue()});
  }
};

module.exports = valueBehaviourMixin;
