const {isObject, isFunction, isUndefined} = require('lodash/lang');
const EMPTY = '';
const valueBehaviourMixin = {
    /** @inheritdoc */
    getDefaultProps() {
        return {
            error: undefined,
            value: undefined
        };
    },
    /** @inheritdoc */
    getInitialState() {
        return {
            error: this.props.error,
            value: this.props.value
        };
    },
    /**
    * Gte the value from the field, it will look into the refs for the value, then into the state and then into the props.
    * If the value is null or empty string the value will be changed to undefined.
    * @return {object} - The value of the field.
    */
    getValue() {
        let value;
        if(isObject(this.refs) && isObject(this.refs.input) && isFunction(this.refs.input.getValue)) {
            value = this.refs.input.getValue();
        } else if(this.state && this.state.value !== undefined ) {
            value = this.state.value;
        } else if(this.props && this.props.value !== undefined) {
            value = this.props.value;
        }
        if( isUndefined(value) || EMPTY === value) {
            value = null;
        }
        return value;
    },
    /**
    * Handler called when the input Change its value.
    * @param {event} event - The event to set.
    * @deprecated
    */
    onInputChange(newValue) {
        if(this.props.onChange) {
            console.warn(`
                FOCUS 0.7.0
                The onChange props signature has changed, instead of providing the DOM event with an object event: {target: 'The new value'},
                the new value is directly passed to the onChange function 'The new Value'.
                Don't forget that in your code you have to change the way you read the new value and you have to update the state of the component with
                this.setState({error: null, value: newValue});
            `);
            return this.props.onChange(newValue);
        }
        this.setState({error: null, value: newValue});
    }
};
module.exports = valueBehaviourMixin;
