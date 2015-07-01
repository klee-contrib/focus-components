var {isObject, isFunction} = require('lodash/lang');

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
    if(isObject(this.refs) && isObject(this.refs.input) && isFunction(this.refs.input.getValue)){
      return this.refs.input.getValue();
    }
    else if(this.state && this.state.value !== undefined ){
      return this.state.value;
    }
    else if(this.props && this.props.value !== undefined ){
      return this.props.value;
    }

  },
  /**
   * Handler called when the input Change its value.
   * @param {event} event - The event to set.
   */
  onInputChange: function fieldOnInputChanges(event){
    if(this.props.onChange){
      return this.props.onChange(event);
    }
    this.setState({error: undefined, value: this.getValue()});
  }
};

module.exports = valueBehaviourMixin;
