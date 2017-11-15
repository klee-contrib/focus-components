import isUndefined from 'lodash/lang/isUndefined';
import isObject from 'lodash/lang/isObject';
import isFunction from 'lodash/lang/isFunction';

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
        if (isObject(this.refs) && isObject(this.refs.input) && isFunction(this.refs.input.getValue)) {
            value = this.refs.input.getValue();
        } else if (this.state && this.state.value !== undefined) {
            value = this.state.value;
        } else if (this.props && this.props.value !== undefined) {
            value = this.props.value;
        }
        if (isUndefined(value) || EMPTY === value) {
            value = null;
        }
        return value;
    },
    /**
    * Handler called when the input Change its value.
    * @param {any} newValue - The value to set.
    */
    onInputChange(newValue) {
        if (this.props.onChange) {
            return this.props.onChange(newValue);
        }
        this.setState({ error: null, value: newValue });
    }
};

export default valueBehaviourMixin;
