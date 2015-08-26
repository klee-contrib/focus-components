//Dependencies.
const builder = require('focus').component.builder;
const React = require('react');
const types = require('focus').component.types;
const assign = require('object-assign');
/**
 * Identity function.
 * @param  {object} data - The data.
 * @return {object}   The data to save.
 */
function identity(d){ return d; }
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
            formatter: identity,
            /**
             * Default unformatter.
             * @param  {object} d - Data to unformat.
             * @return {object}   - The unformatted data.
             */
            unformatter: identity
        };
    },
    /** @inheritdoc */
    propTypes: {
        type: types('string'),
        value: types(['string', 'number']),
        name: types('string'),
        style: types('object')
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
      componentWillReceiveProps(newProps){
          this.setState({value: this.props.formatter(newProps.value)});
      },
    /**
     * Get the value from the input in the DOM.
     * @return {object} - The value of the formatter.
     */
    getValue() {
        return this.props.unformatter(React.findDOMNode(this).value);
    },
  /**
   * Handle the change value of the input.
   * @param {object} event - The sanitize event of input.
   */
  _handleOnChange(event){
      //On change handler.
      const {onChange} = this.props;
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
      const {value} = this.state;
      const inputProps = assign({}, this.props, {value}, {id: name, onChange: this._handleOnChange});
      return <input {...inputProps}/>;
  }
};


module.exports = builder(inputTextMixin);
