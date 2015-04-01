var InputText = require('../../input/text').component;
var DisplayText = require('../../display/text').component;
var SelectClassic = require('../../select/classic').component;
var Label = require('../../label').component;

var fieldBuiltInComponentsMixin = {
  /** @inheriteDoc */
  getDefaultProps: function getDefaultPropsBuiltInComponents(){
    return {
      /**
       * Does the component has a Label.
       * @type {Boolean}
       */
      hasLabel: true,
      /**
       * Redefine complety the component.
       * @type {Object}
       */
      FieldComponent: undefined,
      /**
       * Redefine only the input and label component.
       * @type {Object}
       */
      InputLabelComponent: undefined,
      /**
       * Component for the input.
       * @type {Object}
       */
      InputComponent: InputText,
      /**
       * Component for the select.
       * @type {Object}
       */
      SelectComponent: SelectClassic,
      /**
       * Component for the display.
       * @type {Object}
       */
      DisplayComponent: DisplayText
    };
  },
  /**
   * Render the label part of the component.
   * @return {[type]} [description]
   */
  label: function fieldLabel() {
    if(this.props.FieldComponent || this.props.InputLabelComponent){
      return;
    }
    if (this.props.hasLabel) {
      var labelClassName = `control-label col-sm-${this.props.labelSize}`;
      return (
        <Label
          style={{className: labelClassName }}
          name={this.props.name}
          key={this.props.name}
        />
    );
  }
},
  /**
   * Rendet the input part of the component.
   * @return {[type]} [description]
   */
  input: function renderInput() {
    if(this.props.FieldComponent || this.props.InputLabelComponent){
      return this.renderFieldComponent();
    }
    var inputClassName = `form-control col-sm-${(12 - this.props.labelSize)}`;
    return (
      <div className = "input-group" >
        <this.props.InputComponent
          style={{class: inputClassName}}
          id={this.props.name}
          name={this.props.name}
          value={this.state.value}
          type={this.props.type}
          onChange={this.onInputChange}
          ref="input"
        />
      </div>
    );
  },
  /**
   * [select description]
   * @return {[type]} [description]
   */
  select: function renderSelect(){
    if(this.props.FieldComponent || this.props.InputLabelComponent){
      return this.renderFieldComponent();
    }
    var selectClassName = `form-control col-sm-${(12 - this.props.labelSize)}`;
    return (
      <div className = "input-group" >
        <this.props.SelectComponent
          style={{class: selectClassName}}
          id={this.props.name}
          name={this.props.name}
          value={this.state.value}
          values={this.state.values}
          type={this.props.type}
          onChange={this.onInputChange}
          ref="input"
      />
      < /div>
    );
  },
  /**
   * Render the display part of the component.
   * @return {object} - The display part of the compoennt if the mode is not edit.
   */
  display: function renderDisplay(){
    if(this.props.FieldComponent || this.props.InputLabelComponent){
      return this.renderFieldComponent();
    }
    var selectClassName = `form-control col-sm-${(12 - this.props.labelSize)}`;
    return (
      <div className = "input-group" >
        <this.props.DisplayComponent
          style={{class: selectClassName}}
          id={this.props.name}
          name={this.props.name}
          value={this.state.value}
          type={this.props.type}
          ref="display"
          formatter={this.props.formatter}
      />
      < /div>
    );
  },
  /**
   * Render the error part of the component.
   * @return {object} - The error part of the component.
   */
  error: function renderError() {
    if (this.state.error) {
      if(this.props.FieldComponent){
        return;
      }
      return (
        /*<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>*/
        <span className="help-block">
          {this.state.error}
        </span>
      )
    }
  },
  /**
   * Render the help component.
   * @return {object} - The help part of the component.
   */
  help: function renderHelp() {
    if (this.props.help) {
      if(this.props.FieldComponent){
        return;
      }
      return (
        <span className="help-block">
          {this.props.help}
        </span>
      );
    }
  },
  /**
   * Render the field component if it is overriden in the component definition.
   */
  renderFieldComponent: function renderFieldComponent(){
    var Component = this.props.FieldComponent || this.props.InputLabelComponent;
    return React.createElement(Component, {
      id: this.props.name,
      name: this.props.name,
      label: this.props.name,
      value: this.state.value,
      type: this.props.type,
      style: this.props.style.input,
      error: this.state.error,
      help: this.props.help,
      onChange: this.onInputChange,
      ref: 'input'
      });
  }
};

module.exports = fieldBuiltInComponentsMixin;
