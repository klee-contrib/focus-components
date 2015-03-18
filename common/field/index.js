var builder = require('focus').component.builder;
var React = require('react');
var Input = require('../input/text').component;
var Label = require('../label').component;
var FieldMixin = {
  /**
  * Get field default properties.
  */
  getDefaultProps: function getFieldDefaultProps() {
    return {
      hasLabel: true,
      labelSize: 3,
      type: 'text',
      value: undefined,
      name: undefined
    };
  },
  getInitialState: function(){
    return {
      error: this.props.error,
      value: this.props.value
    };
  },
  componentWillReceiveProps: function fieldWillReceiveProps(newProps){
    this.setState({value: newProps.value});
  },
  /**
  * Get the css class of the field component.
  */
  _className: function() {
  var stateClass = this.state.error ? "has-feedback has-error" : "";
  return "form-group " + stateClass;
  },
  label: function() {
  if (this.props.hasLabel) {
    var labelClassName = "control-label col-sm-" + this.props.labelSize;
    return (
      <label
        className={labelClassName}
        name={this.props.name}
        key={this.props.name}
      >
        {this.props.name}
      < /label>
    );
  }
  },
  /**
  * Validate the field.
  * @return {object} - undefined if valid, {name: "errors"} if not valid.
  */
  validate: function validateField() {
    var validationStatus = this.refs['input'].validate();
    if(validationStatus !== true){
      this.setState({error: validationStatus});
      return validationStatus;
    }
    return;
  },
  /**
  * Get the value from the field.
  */
  getValue: function() {
    return this.refs['input'].getValue();
  },
  onInputChange: function(event){
    this.setState({error: undefined, value: event.target.value});
  },
  input: function() {
    var inputClassName = "form-control col-sm-" + (12 - this.props.labelSize);
    return ( < div className = "input-group" >
      <Input
        style={{class: inputClassName}}
        id={this.props.name}
        name={this.props.name}
        value={this.state.value}
        type={this.props.type}
        validator={this.props.validator}
        onChange={this.onInputChange}
        ref="input"
      />
      < /div>
  );
  },
  error: function() {
  if (this.state.error) {
    return (
      /*<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>*/
      <span className="help-block">
        {this.state.error}
      </span>
    )
  }
  },
  help: function() {
  if (this.props.help) {
    return (
      <span className="help-block">
        {this.props.help}
      </span>
    );
  }
  },
  render: function renderField() {
    return (
      <div className={this._className()}>
       {this.label()}
       {this.input()}
       {this.help()}
       {this.error()}
      </div>);
    }
  };
  module.exports = builder(FieldMixin);
