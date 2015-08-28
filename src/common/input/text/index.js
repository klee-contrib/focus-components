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
const inputTextMixin = {
    /** @inheritdoc */
    getDefaultProps() {
        return {
            type: 'text',
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
        error: types('string'),
        type: types('string'),
        value: types(['string', 'number']),
        name: types('string'),
        placeHolder: types('string'),
    },
    /** @inheritdoc */
    getInitialState() {
        const {formatter, value} = this.props;
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
        return this.props.unformatter(React.findDOMNode(this.refs.inputText).value);
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
        } else {
            //Set the state then call the change handler.
            this.setState({value: event.target.value});
        }
    },
    /**
    * Render an input.
    * @return {DOM} - The dom of an input.
    */
    render() {
        const {value} = this.state;
        const {error, name, placeHolder} = this.props;
        const inputProps = assign({}, this.props, {value}, {id: name, onChange: this._handleOnChange});
        const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        return (
            <div className='mdl-textfield mdl-js-textfield'>
                <input className='mdl-textfield__input' ref='inputText' {...inputProps} pattern={pattern} />
                <label className='mdl-textfield__label' htmlFor={name}>{placeHolder}</label>
                {error &&
                    <span className="mdl-textfield__error">{error}</span>
                }
        </div>);
    }
};


module.exports = builder(inputTextMixin);
