//Dependencies.
let builder = require('focus').component.builder;
let React = require('react');
let type = require('focus').component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
let inputTextMixin = {
    /** @inheritdoc */
    getDefaultProps() {
        return {
            type: 'text',
            value: undefined,
            name: undefined,
            style: {},
            /**
             * Default formatter.
             * @param  {object} d - Data to format.
             * @return {object}   - The formatted data.
             */
            formatter(d){
                return d;
            },
            /**
             * Default unformatter.
             * @param  {object} d - Data to unformat.
             * @return {object}   - The unformatted data.
             */
            unformatter(d){
                return d;
            }
        };
    },
    /** @inheritdoc */
    propTypes: {
        type: type('string'),
        value: type(['string', 'number']),
        name: type('string'),
        style: type('object')
    },
    /** @inheritdoc */
    getInitialState() {
        let {formatter, value} = this.props;
        return {
            value: formatter(value)
        };
    },
    /**
     * Update the component.
     * @param {object} newProps - The new props to update.
     */
      componentWillReceiveProps: function inputWillReceiveProps(newProps){
          this.setState({value: this.props.formatter(newProps.value)});
      },
  /**
   * Get the value from the input in the DOM.
   */
    getValue: function getInputTextValue() {
        return this.props.unformatter(React.findDOMNode(this).value);
    },
  /**
   * Handle the change value of the input.
   * @param {object} event - The sanitize event of input.
   */
  _handleOnChange: function inputOnChange(event){
      //On change handler.
      let {onChange} = this.props;
      if(onChange){
          return onChange(event);
      }else {
          //Set the state then call the change handler.
          this.setState({value: event.target.value});
      }
  },
  /**
   * Render an input.
   * @return {DOM} - The dom of an input.
   */
  render: function renderInput() {
      let {name, style} = this.props;
      let htmlType = this.props.type;
      let {value} = this.state;
      return (
        <input
          id={name}
          name={name}
          onChange={this._handleOnChange}
          style={style}
          type={htmlType}
          value={value}
        />
    );
  }
};


module.exports = builder(inputTextMixin);
