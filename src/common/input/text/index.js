// Dependencies.
const React = require('react');
const ReactDOM = require('react-dom');
const {builder, types} = require('focus-core').component;
const assign = require('object-assign');
const mdlBehaviour = require('../../mixin/mdl-behaviour');
const i18nBehaviour = require('../../i18n/mixin');

/**
* Identity function.
* @param  {object} d - The data.
*/
const identity = d => d;

/**
* Input text mixin.
* @type {Object}
*/
const inputTextComponent = {
    mixins: [mdlBehaviour, i18nBehaviour],

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
        onChange: types('func'),
        onKeyPress: types('func'),
        error: types('string'),
        type: types('string'),
        value: types(['string', 'number']),
        name: types('string'),
        placeHolder: types('string')
    },
    /** @inheritdoc */
    getInitialState() {
        const {formatter, value} = this.props;
        return {
            value: formatter(value)
        };
    },
    componentWillMount(){
        console.warn('FocusComponents 0.7.0: this component is deprecated, please use FocusComponents.components.input.Text');
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
        return this.props.unformatter(ReactDOM.findDOMNode(this.refs.inputText).value);
    },
    /**
    * Handle the change value of the input.
    * @param {object} event - The sanitize event of input.
    */
    _handleInputChange(event){
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
     * Input key press handler.
     * @param  {Object} event   event raised by the key press
     */
    _handleInputKeyPress(event) {
        const {onKeyPress} = this.props;
        if(onKeyPress) {
            onKeyPress(event);
        }
    },
    /**
    * Render an input.
    * @return {DOM} - The dom of an input.
    */
    render() {
        const {value} = this.state;
        const {error, name, placeHolder, style} = this.props;
        const inputProps = assign({}, this.props, {value}, {id: name, onChange: this._handleInputChange, onKeyPress: this._handleInputKeyPress});
        const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        const cssClass = `mdl-textfield mdl-js-textfield ${error ? 'is-invalid' : ''}`;
        return (
            <div className={cssClass} data-focus='input-text' style={style}>
                <input className='mdl-textfield__input' ref='inputText' {...inputProps} pattern={pattern} />
                <label className='mdl-textfield__label' htmlFor={name}>{value ? '' : this.i18n(placeHolder)}</label>
                {error &&
                    <span className="mdl-textfield__error">{error}</span>
                }
            </div>
        );
    }
};


module.exports = builder(inputTextComponent);
