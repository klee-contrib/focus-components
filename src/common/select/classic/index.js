//Dependencies.
const builder = require('focus').component.builder;
const React = require('react');
const types = require('focus').component.types;
const i18nMixin = require('../../i18n/mixin');
const stylableMixin = require('../../../mixin/stylable');
const union = require('lodash/array/union');
const {isUndefined, isNull, isNumber} = require('lodash/lang');
/**
* Input text mixin.
* @type {Object}
*/
const selectTextMixin = {
    /** @inheritdoc */
    displayName: 'Select',
    /** @inheritdoc */
    mixins: [i18nMixin, stylableMixin],
    /** @inheritdoc */
    getDefaultProps() {
        return {
            labelKey: 'label',
            multiple: false,
            values: [],
            valueKey: 'code',
            hasUndefined: true
        };
    },
    /** @inheritdoc */
    propTypes: {
        multiple: types('bool'),
        labelKey: types('string'),
        name: types('string'),
        isRequired: types('bool'),
        onChange: types('function'),
        value: types(['number', 'string', 'array']),
        values: types('array'),
        valueKey: types('string')
    },
    /** @inheritdoc */
    getInitialState() {
        const {hasUndefined, value, values, valueKey, isRequired} = this.props;
        const hasValue = !isUndefined(value) && !isNull(value);
        const isRequiredAndHasValue = true === isRequired && hasValue;
        return {
            value: value,
            hasUndefined: false === hasUndefined || isRequiredAndHasValue ? false : true, //!value
            isNumber: values && 0 < values.length && values[0] && values[0][valueKey] && isNumber(values[0][valueKey])
        };
    },
    /** @inheritdoc */
    componentWillReceiveProps(newProps){
        this.setState({value: newProps.value});
    },
    /**
     * Get the value of the component.
     * @return {object} - Return the value of the component.
     */
    getValue() {
        const domValue = React.findDOMNode(this).value;
        return this.state.isNumber ? +domValue : domValue;
    },
    /**
    * Handle the change value of the input.
    * @param {object} event - The sanitize event of input.
    */
    _handleOnChange(event){
        //On change handler.
        const {onChange, multiple} = this.props;
        if(onChange){
            onChange(event);
        }else {
            const domValue = event.target.value;
            const value = this.state.isNumber ? +domValue : domValue;
            //Set the state then call the change handler.
            if(multiple){
                let vals = this.state.value;
                vals.push(value);
                return this.setState({value: vals});
            }
            return this.setState({value: value});
        }
    },
    /** @inheritdoc */
    renderOptions(){
        let processValues;
        const {labelKey, valueKey, values} = this.props;
        const {hasUndefined} = this.state;
        if(hasUndefined){
            processValues = union(
                [{[labelKey]: 'select.unSelected', [valueKey]: null}],
                values
            );
        }else{
            processValues = values;
        }
        return processValues.map((val, idx)=>{
            const value = `${val[valueKey]}`;
            const label = val[labelKey] || 'select.noLabel';
            return <option key={idx} value={value}>{this.i18n(label)}</option>;
        });
    },
    /**
    * Render an input.
    * @return {DOM} - The dom of an input.
    */
    render() {
        const {props, state, _getStyleClassName, _handleOnChange} = this;
        const {multiple, name} = props;
        const {value} = state;
        const selectProps = {multiple, value: `${value}`, name, onChange: _handleOnChange, className: _getStyleClassName};
        return <select {...selectProps}>{this.renderOptions()}</select>;
    }
};

module.exports = builder(selectTextMixin);
