//dependencies
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ComponentBaseBehaviour from '../../../behaviours/component-base';
import {InputBehaviour} from '../../../behaviours/input-component';
import {isUndefined, isNull, isNumber} from 'lodash/lang';
import {union} from 'lodash/array';
const UNSELECTED_KEY = 'UNSELECTED_KEY';
/**
* Parse the value.
* @param  {string | number} propsValue - The value given as props to read the type.
* @param  {string} rawValue   - The raw string value.
* @return {strint | number}  - The parsed value.
*/
function _valueParser(propsValue, rawValue) {
    if(UNSELECTED_KEY === rawValue) {
        return undefined;
    }
    const {type} = this.props;
    return type === 'number' ? +rawValue : rawValue;
}
const propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    hasUndefined: PropTypes.bool,
    isActiveProperty: PropTypes.string,
    isRequired: PropTypes.bool,
    labelKey: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    unSelectedLabel: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    valueKey: PropTypes.string,
    values: PropTypes.array.isRequired
};

const defaultProps = {
    disabled: false,
    hasUndefined: true,
    isActiveProperty: 'isActive',
    isRequired: false,
    labelKey: 'label',
    multiple: false,
    unSelectedLabel: 'select.unSelected',
    values: [],
    valueKey: 'code',
    valueParser: _valueParser
};

/**
* Component standing for an HTML input.
*/
@ComponentBaseBehaviour
@InputBehaviour
class Select extends Component {

    /**
    * Get the dom value of the component.
    * @return {object} - The unformated dom value.
    */
    getValue = () => {
        const {type, value} = this.props;
        if (isNull(value) || isUndefined(value) || UNSELECTED_KEY === value) return null;
        return type === 'number' ? +value : value;
    };

    /**
    * Handle the change on the select, it only propagates the value.
    * @param  {object} evt - The react DOM event.
    * @return {object} - The function onChange from the props, called.
    */
    _handleSelectChange = (evt) => {
        const {onChange, valueParser, value: propsValue} = this.props;
        const {value} = evt.target;
        return onChange(valueParser.call(this, propsValue, value));
    };

    /** inheritdoc */
    _renderOptions({hasUndefined, labelKey, isRequired, value, values = [], valueKey, isActiveProperty, unSelectedLabel}) {
        const isRequiredAndNoValue = isRequired && (isUndefined(value) || isNull(value));
        if(hasUndefined || isRequiredAndNoValue) {
            values = union(
                [{[labelKey]: this.i18n(unSelectedLabel), [valueKey]: UNSELECTED_KEY}],
                values
            );
        }
        return values
        .filter(v => isUndefined(v[isActiveProperty]) || v[isActiveProperty] === true) // Filter on the
        .map((val, idx) => {
            const optVal = `${val[valueKey]}`;
            const elementValue = val[labelKey];
            const optLabel = isUndefined(elementValue) || isNull(elementValue) ? this.i18n('select.noLabel') : elementValue;
            return (<option key={idx} value={optVal}>{optLabel}</option>);
        });
    }

    /**
    * @inheritdoc
    * @override
    */
    render() {
        const managedProps = this._checkProps(this.props);
        const validInputProps = managedProps[0];
        const invalidInputProps = managedProps[1];

        const {error} = invalidInputProps;
        const {style} = validInputProps;

        validInputProps.onChange = this._handleSelectChange;
        const inputProps = {...validInputProps};

        return (
            <div data-focus='select' ref='select' data-valid={!error} style={style}>
                <select ref='htmlSelect' {...inputProps}>
                    {this._renderOptions(this.props)}
                </select>
                {error && <div className='label-error' ref='error'>{error}</div>}
            </div>
        );
    }
}

//Static props.
Select.displayName = 'Select';
Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

export default Select;
